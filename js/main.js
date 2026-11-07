// ============================================
// SISTEMA DE TRADUÇÃO (PT, EN, ES)
// ============================================

const translations = {
    pt: {
        'Sobre': 'Sobre',
        'Habilidades': 'Habilidades',
        'Contato': 'Contato',
        'Home': 'Home',
    },
    en: {
        'Sobre': 'About',
        'Habilidades': 'Skills',
        'Contato': 'Contact',
        'Home': 'Home',
    },
    es: {
        'Sobre': 'Acerca',
        'Habilidades': 'Habilidades',
        'Contacto': 'Contacto',
        'Home': 'Inicio',
    }
};

let currentLanguage = localStorage.getItem('language') || 'pt';

// Função para atualizar todos os textos traduzíveis
function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Atualizar todos os elementos com atributo data-{lang}
    document.querySelectorAll('[data-pt]').forEach(element => {
        if (element.getAttribute(`data-${lang}`)) {
            element.textContent = element.getAttribute(`data-${lang}`);
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute(`data-${lang}`);
            }
        }
    });

    // Atualizar atributo lang do HTML
    document.documentElement.lang = lang;
}

// Event Listener para seletor de idioma
document.getElementById('languageSelect').addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

// Inicializar com idioma salvo
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('languageSelect').value = currentLanguage;
    updateLanguage(currentLanguage);
});

// ============================================
// DARK MODE TOGGLE
// ============================================

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkMode = localStorage.getItem('darkMode') === 'true' ||
                           (!localStorage.getItem('darkMode') && 
                            window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Aplicar tema salvo ou preferência do sistema
    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    // Toggle do dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    });

    // Detect mudança de preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('darkMode')) {
            document.body.classList.toggle('dark-mode', e.matches);
            darkModeToggle.textContent = e.matches ? '☀️' : '🌙';
        }
    });
}

// ============================================
// NAVEGAÇÃO ATIVA
// ============================================

function highlightActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('nav-active');
            }
        });
    });

    // Scroll suave ao clicar em links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                closeMenu();
            }
        });
    });
}

// ============================================
// HAMBURGER MENU (MOBILE)
// ============================================

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target)) {
        closeMenu();
    }
});

// ============================================
// FORM DE CONTATO
// ============================================

// Validação de email
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim().toLowerCase());
}

// Mostrar mensagem de feedback
function showFormMessage(message, isSuccess) {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Remover mensagem anterior
    const existingMsg = contactForm.parentElement.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    // Criar nova mensagem
    const msgEl = document.createElement('div');
    msgEl.className = `form-message ${isSuccess ? 'success' : 'error'}`;
    msgEl.textContent = message;
    
    contactForm.parentElement.insertBefore(msgEl, contactForm);
    
    // Auto-remover após 5 segundos
    setTimeout(() => msgEl.remove(), 5000);
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm?.querySelector('button[type="submit"]');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Desabilitar botão
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
        }

        try {
            // Pegar valores
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value.trim();
            const message = contactForm.querySelector('textarea').value.trim();

            // Validação
            if (!name || !email || !subject || !message) {
                const msg = currentLanguage === 'pt' ? 'Por favor, preencha todos os campos.' : 
                           currentLanguage === 'en' ? 'Please fill all fields.' : 
                           'Por favor, rellena todos los campos.';
                showFormMessage(msg, false);
                return;
            }

            if (!validateEmail(email)) {
                const msg = currentLanguage === 'pt' ? 'Email inválido.' : 
                           currentLanguage === 'en' ? 'Invalid email.' : 
                           'Email inválido.';
                showFormMessage(msg, false);
                return;
            }

            // Enviar para backend
            const response = await fetch('/php/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message
                })
            });

            const data = await response.json();

            if (data.success) {
                const msg = currentLanguage === 'pt' ? 'Mensagem enviada com sucesso! Entraremos em contato em breve.' : 
                           currentLanguage === 'en' ? 'Message sent successfully! We\'ll get back to you soon.' : 
                           '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
                showFormMessage(msg, true);
                contactForm.reset();
            } else {
                showFormMessage(data.message || 'Erro ao enviar', false);
            }

        } catch (error) {
            console.error('Erro:', error);
            const msg = currentLanguage === 'pt' ? 'Erro de conexão. Tente novamente.' : 
                       currentLanguage === 'en' ? 'Connection error. Try again.' : 
                       'Error de conexión.';
            showFormMessage(msg, false);
        } finally {
            // Reabilitar botão
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        }
    });
}

// ============================================
// ANIMAÇÕES AO SCROLL (INTERSECTION OBSERVER)
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar cards e elementos
    document.querySelectorAll('.credential-card, .skill-category, .stat, .about-text').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ============================================
// RIPPLE EFFECT NOS BOTÕES
// ============================================

function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Remover classe ripple anterior se houver
            const ripples = this.querySelectorAll('.ripple');
            if (ripples.length > 0) {
                ripples[0].remove();
            }

            this.appendChild(ripple);
        });
    });
}

// Estilo do ripple
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SUAVIDADE NA NAVEGAÇÃO
// ============================================

function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// CONTADOR ANIMADO (stats)
// ============================================

function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat h3');
    let animated = false;

    const animateCounter = () => {
        if (animated) return;

        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 30;
            let current = 0;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = stat.textContent;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.ceil(current) + '+';
                }
            }, 30);
        });

        animated = true;
    };

    // Ativar quando a seção About entra em view
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter();
                observer.unobserve(aboutSection);
            }
        });
        observer.observe(aboutSection);
    }
}

function initWinterSnow() {
    const scene = document.querySelector('.night-coder-scene');
    const canvas = scene?.querySelector('.winter-snow');
    const context = canvas?.getContext('2d');

    if (!scene || !canvas || !context) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: -1000, y: -1000, active: false };
    const flakes = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    let reducedMotion = motionPreference.matches;

    const createFlake = () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 2.1,
        fallSpeed: 0.35 + Math.random() * 1.15,
        horizontalSpeed: (Math.random() - 0.5) * 0.35,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.35 + Math.random() * 0.6
    });

    const draw = () => {
        context.clearRect(0, 0, width, height);

        flakes.forEach(flake => {
            let drawX = flake.x;
            let drawY = flake.y;

            if (reducedMotion && pointer.active) {
                const deltaX = drawX - pointer.x;
                const deltaY = drawY - pointer.y;
                const distance = Math.hypot(deltaX, deltaY);
                const radius = 78;

                if (distance < radius && distance > 0) {
                    const push = (radius - distance) * 0.45;
                    drawX += deltaX / distance * push;
                    drawY += deltaY / distance * push;
                }
            }

            context.beginPath();
            context.arc(drawX, drawY, flake.radius, 0, Math.PI * 2);
            context.fillStyle = `rgba(235, 248, 255, ${flake.opacity})`;
            context.shadowColor = 'rgba(177, 225, 255, 0.7)';
            context.shadowBlur = flake.radius * 2.5;
            context.fill();
        });

        context.shadowBlur = 0;
    };

    const animate = () => {
        frameId = 0;

        flakes.forEach(flake => {
            if (pointer.active) {
                const deltaX = flake.x - pointer.x;
                const deltaY = flake.y - pointer.y;
                const distance = Math.hypot(deltaX, deltaY);
                const radius = 78;

                if (distance < radius && distance > 0) {
                    const force = (radius - distance) / radius;
                    flake.x += deltaX / distance * force * 1.4;
                    flake.y += deltaY / distance * force * 1.4;
                    flake.horizontalSpeed += deltaX / distance * force * 0.035;
                }
            }

            flake.phase += 0.018;
            flake.x += flake.horizontalSpeed + Math.sin(flake.phase) * 0.18;
            flake.y += flake.fallSpeed;
            flake.horizontalSpeed *= 0.985;

            if (flake.y > height + 5) {
                flake.y = -5;
                flake.x = Math.random() * width;
            }
            if (flake.x < -5) flake.x = width + 5;
            if (flake.x > width + 5) flake.x = -5;
        });

        draw();
        if (!reducedMotion) frameId = requestAnimationFrame(animate);
    };

    const resize = () => {
        const bounds = scene.getBoundingClientRect();
        const previousWidth = width;
        const previousHeight = height;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        width = bounds.width;
        height = bounds.height;
        if (!width || !height) return;

        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        if (previousWidth && previousHeight) {
            flakes.forEach(flake => {
                flake.x *= width / previousWidth;
                flake.y *= height / previousHeight;
            });
        }

        const flakeCount = Math.max(34, Math.min(82, Math.round(width * height / 4400)));
        while (flakes.length < flakeCount) flakes.push(createFlake());
        flakes.length = flakeCount;

        if (reducedMotion) draw();
        else if (!frameId) frameId = requestAnimationFrame(animate);
    };

    scene.addEventListener('pointermove', event => {
        const bounds = scene.getBoundingClientRect();
        pointer.x = event.clientX - bounds.left;
        pointer.y = event.clientY - bounds.top;
        pointer.active = true;
        if (reducedMotion) draw();
    }, { passive: true });

    scene.addEventListener('pointerleave', () => {
        pointer.active = false;
        if (reducedMotion) draw();
    }, { passive: true });

    if ('ResizeObserver' in window) {
        new ResizeObserver(resize).observe(scene);
    } else {
        window.addEventListener('resize', resize, { passive: true });
    }

    motionPreference.addEventListener?.('change', event => {
        reducedMotion = event.matches;
        if (reducedMotion) {
            cancelAnimationFrame(frameId);
            frameId = 0;
            draw();
        } else if (!frameId) {
            frameId = requestAnimationFrame(animate);
        }
    });

    resize();
}

// ============================================
// INICIALIZAÇÃO GERAL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos os recursos
    initDarkMode();
    highlightActiveNavLink();
    initHamburgerMenu();
    initContactForm();
    initScrollAnimations();
    initRippleEffect();
    smoothScroll();
    initCounterAnimation();
    initWinterSnow();

    // Adicionar classe ao botão de contato no hero
    const contactButton = document.querySelector('.btn-secondary');
    if (contactButton) {
        contactButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});

// ============================================
// PERFORMANCE - Lazy Loading Images
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// DETECTAR MODO OFFLINE/ONLINE
// ============================================

window.addEventListener('online', () => {
    console.log('✓ Conexão restaurada');
});

window.addEventListener('offline', () => {
    console.warn('✗ Sem conexão com internet');
});

// ============================================
// LOG DE INFORMAÇÕES
// ============================================

console.log('🚀 Portfolio carregado com sucesso!');
console.log(`🌍 Idioma atual: ${currentLanguage}`);
console.log(`🌙 Dark mode: ${document.body.classList.contains('dark-mode')}`);
