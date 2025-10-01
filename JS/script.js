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
        typingSpeed = 2000;
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
        // Usar redirecionamento seguro
        location.href = url;
    } else {
        showNotification(`Link do ${platform} ainda não configurado!`, 'warning');
    }
}

// Função de notificação simplificada
function showNotification(message, type = 'info') {
    console.log(`${type}: ${message}`);
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

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }

        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    }

    showNotification(`Tema ${isDark ? 'escuro' : 'claro'} ativado!`, 'success');
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
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

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    setTimeout(typeEffect, 1000);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
    });

    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });

        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});
