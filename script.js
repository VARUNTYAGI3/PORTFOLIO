// ==================== THEME TOGGLE ==================== 
class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.init();
    }

    init() {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark-mode';
        document.body.classList.add(savedTheme);
        this.updateIcon(savedTheme);

        // Add listener
        this.themeToggle.addEventListener('click', () => this.toggle());
    }

    toggle() {
        const isDark = document.body.classList.contains('dark-mode');
        
        if (isDark) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            this.updateIcon('light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            this.updateIcon('dark-mode');
        }
    }

    updateIcon(theme) {
        this.themeIcon.textContent = theme === 'dark-mode' ? '☀️' : '🌙';
    }
}

// ==================== SMOOTH SCROLL ==================== 
class SmoothScroll {
    constructor() {
        this.setupSmoothScroll();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ==================== ACTIVE NAV LINK ==================== 
class ActiveNavLink {
    constructor() {
        this.setupActiveLinks();
    }

    setupActiveLinks() {
        const navLinks = document.querySelectorAll('.navbar-links a');
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.scrollY >= sectionTop - 100) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === currentSection) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ==================== CONTACT FORM ==================== 
class ContactFormHandler {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        // Show success message
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Message Sent ✓';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
            this.form.reset();
        }, 3000);
    }
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 
class ScrollReveal {
    constructor() {
        this.setupObserver();
        this.setupCountUpObserver();
    }

    setupObserver() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = Number(entry.target.dataset.delay || 0);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }, delay);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-from-left, .reveal-card').forEach(element => {
            observer.observe(element);
        });
    }

    setupCountUpObserver() {
        const countElements = document.querySelectorAll('.count');

        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCount(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        countElements.forEach(el => countObserver.observe(el));
    }

    animateCount(el) {
        const target = Number(el.dataset.target) || 0;
        const duration = 1000;
        let current = 0;
        const stepTime = 25;
        const stepAmount = Math.max(1, Math.round(target / (duration / stepTime)));

        const interval = setInterval(() => {
            current += stepAmount;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            el.textContent = current.toLocaleString();
        }, stepTime);
    }
}

// ==================== INITIALIZE ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    new ThemeToggle();
    new SmoothScroll();
    new ActiveNavLink();
    new ContactFormHandler('#contact-form');
    new ScrollReveal();

    console.log('✨ Portfolio loaded successfully! ✨');
});

// ==================== PREVENT LAYOUT SHIFT ==================== 
window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach(img => {
        if (!img.width) {
            img.style.width = '100%';
            img.style.height = 'auto';
        }
    });
});

// ==================== ACCESSIBILITY ==================== 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('button:focus, a:focus').forEach(el => el.blur());
    }
});
