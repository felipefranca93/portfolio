<?php
/**
 * Backend para formulário de contato
 * Seguro e funcional
 */

// Headers de segurança
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

// CORS - aceita apenas POST
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Responder a preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Apenas POST é permitido
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

// Validações
function validarDados($dados) {
    $errors = [];

    // Nome
    if (empty($dados['name'])) {
        $errors[] = 'Nome é obrigatório';
    } elseif (strlen(trim($dados['name'])) < 2) {
        $errors[] = 'Nome deve ter pelo menos 2 caracteres';
    } elseif (strlen(trim($dados['name'])) > 100) {
        $errors[] = 'Nome muito longo (máximo 100 caracteres)';
    }

    // Email
    if (empty($dados['email'])) {
        $errors[] = 'Email é obrigatório';
    } elseif (!filter_var($dados['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email inválido';
    }

    // Assunto
    if (empty($dados['subject'])) {
        $errors[] = 'Assunto é obrigatório';
    } elseif (strlen(trim($dados['subject'])) < 3) {
        $errors[] = 'Assunto deve ter pelo menos 3 caracteres';
    } elseif (strlen(trim($dados['subject'])) > 200) {
        $errors[] = 'Assunto muito longo (máximo 200 caracteres)';
    }

    // Mensagem
    if (empty($dados['message'])) {
        $errors[] = 'Mensagem é obrigatória';
    } elseif (strlen(trim($dados['message'])) < 10) {
        $errors[] = 'Mensagem deve ter pelo menos 10 caracteres';
    } elseif (strlen(trim($dados['message'])) > 5000) {
        $errors[] = 'Mensagem muito longa (máximo 5000 caracteres)';
    }

    return $errors;
}

// Sanitizar dados
function sanitizarDados($dados) {
    return [
        'name' => htmlspecialchars(trim($dados['name'] ?? ''), ENT_QUOTES, 'UTF-8'),
        'email' => htmlspecialchars(trim(strtolower($dados['email'] ?? '')), ENT_QUOTES, 'UTF-8'),
        'subject' => htmlspecialchars(trim($dados['subject'] ?? ''), ENT_QUOTES, 'UTF-8'),
        'message' => htmlspecialchars(trim($dados['message'] ?? ''), ENT_QUOTES, 'UTF-8')
    ];
}

// Enviar email
function enviarEmail($name, $email, $subject, $message) {
    $to = getenv('EMAIL_RECIPIENT') ?: 'felipe@example.com';
    
    $emailSubject = '[Portfolio] ' . $subject;
    
    $emailBody = "
    <html>
        <body style='font-family: Arial, sans-serif; color: #333;'>
            <h2>Nova mensagem de contato</h2>
            <p><strong>Nome:</strong> {$name}</p>
            <p><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
            <p><strong>Assunto:</strong> {$subject}</p>
            <hr style='border: none; border-top: 1px solid #ddd; margin: 20px 0;'>
            <h3>Mensagem:</h3>
            <p>" . nl2br($message) . "</p>
            <hr style='border: none; border-top: 1px solid #ddd; margin: 20px 0;'>
            <p><em>Enviado em: " . date('d/m/Y H:i:s') . "</em></p>
            <p><em>IP do cliente: " . $_SERVER['REMOTE_ADDR'] . "</em></p>
        </body>
    </html>";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: noreply@portfolio.local\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    
    return mail($to, $emailSubject, $emailBody, $headers);
}

try {
    // Obter dados JSON
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
        exit;
    }

    // Validar
    $errors = validarDados($input);
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => $errors[0]]);
        exit;
    }

    // Sanitizar
    $dados = sanitizarDados($input);

    // Enviar email
    $emailEnviado = enviarEmail(
        $dados['name'],
        $dados['email'],
        $dados['subject'],
        $dados['message']
    );

    if ($emailEnviado) {
        // Log
        error_log("[CONTACT] Nova mensagem de: {$dados['email']} ({$dados['name']})");
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
        ]);
    } else {
        error_log("[CONTACT ERROR] Falha ao enviar email de: {$dados['email']}");
        
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao enviar mensagem. Tente novamente mais tarde.'
        ]);
    }

} catch (Exception $e) {
    error_log("[CONTACT ERROR] Exceção: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro interno do servidor'
    ]);
}
?>
