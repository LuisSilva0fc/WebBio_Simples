// CONFIGURAÇÃO DOS LINKS DAS REDES SOCIAIS
const socialLinks = {
    facebook: "https://www.facebook.com/luis.silva.ofc",
    instagram: "https://instagram.com/luis.silva.ofc",
    telegram: "http://t.me/LuisSilvaOFC",
    threads: "https://www.threads.net/@luis.silva.ofc",
    spotify: "https://open.spotify.com/user/31lyet2y7msxs6ea4fz3plet43di",
    youtube: "https://www.youtube.com/@Lunix.L.0fc",
    steam: "https://steamcommunity.com/id/luissilva0fc/",
    web: "https://luissilva0fc.bio.link/"
};

// Textos para o efeito de digitação
const typingTexts = [
    "Estudante de ADS",
    "Desenvolvedor em Formação",
    "Apaixonado por Tecnologia",
    "Sempre Aprendendo",
    "Porque não um Hello World?",
    "Curiosidade é o que me move...",
    "Explorando o Mundo do Código"
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Função de efeito de digitação
function typeEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const currentText = typingTexts[typingIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pausa antes de deletar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingTexts.length;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Função para abrir links das redes sociais
function openSocialLink(platform) {
    const url = socialLinks[platform];

    if (url && url.trim() !== "") {
        window.open(url, "_blank");

        // Adicionar efeito visual de clique
        if (window.event) {
            const button = window.event.target.closest('.social-button');
            if (button) {
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
            }
        }
    } else {
        showNotification(`Link do ${platform} ainda não configurado!`, 'warning');
    }
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Estilos inline para a notificação
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });

    // Cores baseadas no tipo
    const colors = {
        info: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
    };

    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Cursor personalizado que segue o mouse
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';

    Object.assign(cursor.style, {
        position: 'fixed',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
        pointerEvents: 'none',
        zIndex: '9999',
        opacity: '0',
        transition: 'opacity 0.3s ease, transform 0.1s ease',
        transform: 'translate(-50%, -50%)'
    });

    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '0.6';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.6';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
}

// Partículas flutuantes de fundo
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';

    Object.assign(particlesContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '-1',
        opacity: '0.1'
    });

    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');

        Object.assign(particle.style, {
            position: 'absolute',
            width: Math.random() * 5 + 2 + 'px',
            height: Math.random() * 5 + 2 + 'px',
            background: '#3b82f6',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s infinite linear`
        });

        particlesContainer.appendChild(particle);
    }
}

// Função para alternar tema com ícone animado
function toggleTheme() {
    document.body.classList.toggle('dark-theme');

    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Atualizar ícone
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }

        // Efeito de rotação
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    }

    showNotification(`Tema ${isDark ? 'escuro' : 'claro'} ativado!`, 'success');
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        setTimeout(() => {
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'sun');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            }
        }, 100);
    }

    // Configurar botão de tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Iniciar efeito de digitação
    setTimeout(typeEffect, 1000);

    // Criar recursos visuais
    createCustomCursor();
    createParticles();
    initVisitorCounter();

    // Animações de entrada para as seções
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observar seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });

    // Efeitos nos botões sociais
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });

        // Efeito de clique
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Mensagem de boas-vindas
    setTimeout(() => {
        showNotification('Bem-vindo ao meu Site! 🌐', 'success');
    }, 2000);

    console.log("Site do Luis Silva carregado com funcionalidades avançadas!");
});

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + D para alternar tema
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }

    // ESC para fechar notificações
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
});

// Adicionar CSS para animações via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }

    .typing-text::after {
        content: '|';
        animation: blink 1s infinite;
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }

    .custom-cursor {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    }

    .visitor-counter {
        backdrop-filter: blur(10px);
        transition: transform 0.3s ease;
    }

    .visitor-counter:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);