# 🎨 Landing Page Profissional - Felipe Morais

Uma landing page moderna, responsiva e profissional criada com HTML5, CSS3 e JavaScript puro. Inclui suporte a múltiplos idiomas (PT, EN, ES), dark mode e efeitos visuais bonitos.

## ✨ Características

### 🌐 Multidioma
- ✅ Português (PT)
- ✅ Inglês (EN)
- ✅ Espanhol (ES)
- Seletor de idioma na navbar
- Persistência de idioma (localStorage)

### 🌙 Dark Mode
- Toggle theme claro/escuro
- Transições suaves
- Preferência do sistema respeitada
- Persistência de tema (localStorage)

### 🎨 Design & Cores
- **Cores Principais**: Azul Marinho (#001a4d) e Branco Gelo (#f0f7ff)
- **Gradientes Modernos**: Transições suaves entre cores
- **Responsivo**: Mobile-first, funciona em todos os dispositivos
- **Animações**: Efeitos visuais suaves e performance otimizada

### 📱 Responsividade
- ✅ Desktop (1920px+)
- ✅ Tablet (768px)
- ✅ Mobile (480px)
- ✅ Very Small Mobile (320px)
- ✅ Landscape Mode

### 🎯 Seções

1. **Hero Section**
   - Apresentação principal com animações
   - Botões CTA (Call to Action)
   - Card flutuante animado
   - Scroll indicator

2. **About Section**
   - Descrição profissional
   - Estatísticas (projetos, clientes, experiência)
   - Formas geométricas animadas

3. **Skills Section**
   - Frontend (HTML5, CSS3, JavaScript, React, Vue.js)
   - Backend (Node.js, Python, Express, MongoDB, PostgreSQL)
   - Ferramentas (Git, Docker, Figma, AWS, Webpack)
   - Barras de progresso animadas

4. **Projects Section**
   - Cards de projetos com hover effect
   - Descrição e tecnologias utilizadas
   - Links para mais informações

5. **Contact Section**
   - Links para redes sociais
   - Formulário de contato funcional
   - Validação de campos

6. **Footer**
   - Copyright e crédito

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Semântica e estrutura
- **CSS3**: Layouts, animações, gradientes
- **JavaScript**: Funcionalidades interativas
  - DOM Manipulation
  - Local Storage
  - Intersection Observer API
  - Event Listeners

## 📁 Estrutura de Arquivos

```
www/
├── index.html          # Arquivo principal HTML
├── css/
│   ├── style.css       # Estilos principais com dark mode
│   └── responsive.css  # Media queries para responsividade
├── js/
│   └── main.js         # JavaScript com multidioma, dark mode e interatividades
└── assets/
    ├── fonts/
    │   └── Roboto/
    ├── images/
    │   └── icons/
```

## 🚀 Como Usar

### 1. Abrir o Arquivo
Simplesmente abra o arquivo `index.html` em um navegador web.

### 2. Funcionalidades

#### Trocar Idioma
- Use o seletor de idioma na navbar
- Selecione PT (Português), EN (Inglês) ou ES (Espanhol)
- A preferência é salva automaticamente

#### Ativar Dark Mode
- Clique no botão de toggle (lua/sol) na navbar
- O tema é alterado instantaneamente
- A preferência é salva e persistida

#### Navegar
- Clique nos links da navbar para navegar suavemente
- Use o menu hamburger em dispositivos móveis
- Os links ficam destacados conforme você navega

#### Formulário de Contato
- Preencha todos os campos
- Clique em "Enviar Mensagem"
- Receba um feedback visual

## 🎨 Paleta de Cores

| Cor | Código | Uso |
|-----|--------|-----|
| Azul Marinho | #001a4d | Cor primária (light) |
| Azul Marinho 2 | #002d7a | Cor primária (nav) |
| Azul Escuro | #0047ab | Destaque/hover |
| Branco Gelo | #f0f7ff | Fundo claro |
| Cinza | #333333 | Texto |

## 🔧 Personalizações

### Editar Cores
Abra `css/style.css` e modifique as variáveis CSS:

```css
:root {
    --primary-dark: #001a4d;
    --primary-navy: #002d7a;
    --primary-light: #0047ab;
    --accent-ice-white: #f0f7ff;
    /* ... */
}
```

### Adicionar Novo Idioma
1. Abra `js/main.js`
2. Adicione a entrada no objeto `translations`:
```javascript
const translations = {
    // ... idiomas existentes
    fr: {
        'Home': 'Accueil',
        'About': 'À Propos',
        // ...
    }
};
```
3. Adicione a opção no seletor HTML

### Modificar Textos
Use os atributos `data-pt`, `data-en`, `data-es` nos elementos HTML:

```html
<h1 data-pt="Olá" data-en="Hello" data-es="Hola">Olá</h1>
```

## ⚡ Performance

- ✅ CSS otimizado com variáveis CSS
- ✅ JavaScript sem dependências externas
- ✅ Lazy loading de imagens
- ✅ Animações GPU-accelerated
- ✅ Intersection Observer para scroll animations

## 🌍 Compatibilidade

- ✅ Chrome/Chromium (88+)
- ✅ Firefox (78+)
- ✅ Safari (12+)
- ✅ Edge (88+)
- ✅ Mobile Browsers

## 📱 Breakpoints

- **1920px+**: Desktop XL
- **1200px**: Desktop
- **768px**: Tablet
- **480px**: Mobile
- **320px**: Very Small Mobile

## 🎭 Animações

- Fade In/Slide In ao carregar
- Float animation nos cards
- Rotate animation nos ícones
- Pulse animation nos indicadores
- Smooth transitions em hover
- Counter animation nos stats

## 🔐 Segurança

- Sem dependências externas (seguro)
- Validação de formulário
- XSS protection através de textContent
- CORS-friendly

## 📝 Notas

- O formulário de contato não envia emails por padrão. Para funcionalidade completa, integre com um backend
- Os links de redes sociais precisam ser atualizados com seus perfis reais
- As imagens dos projetos podem ser substituídas por imagens reais

## 🚀 Deployment

A landing page pode ser deployada em qualquer hosting estático:

- GitHub Pages
- Vercel
- Netlify
- AWS S3
- Google Firebase Hosting
- Heroku (com servidor estático)

## 📄 Licença

Este projeto é livre para uso e modificação.

## 👨‍💻 Autor

**Felipe Morais**
- Desenvolvedor Full Stack
- Criador de Experiências Digitais

---

**Última atualização**: 23 de janeiro de 2026
