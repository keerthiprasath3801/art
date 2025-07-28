document.addEventListener('DOMContentLoaded', () => {
    initPaintDropsSystem();
    initMobileNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initCarousel();
    initPaintSplashes();
    initTeamCardFeathers();
    initContactForm();
    initStickyNav();
    initLogoHover();
    initWindowResize();
});

/* -------------------------------
   1. Full-Page 3D Paint Drops
---------------------------------- */
function initPaintDropsSystem() {
    const container = document.createElement('div');
    container.id = 'paint-drops-container';
    document.body.appendChild(container);

    const colors = [
        'rgba(142, 68, 173, 0.6)', 'rgba(52, 152, 219, 0.6)',
        'rgba(243, 208, 70, 0.6)', 'rgba(231, 76, 60, 0.6)',
        'rgba(46, 204, 113, 0.6)', 'rgba(46, 75, 204, 0.6)',
        'rgba(190, 210, 42, 0.6)', 'rgba(217, 47, 232, 0.6)'
    ];

    const createDrop = () => {
        const drop = document.createElement('div');
        drop.className = 'paint-drop';

        const size = Math.random() * 30 + 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const zDepth = Math.random() * 100 - 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startY = top > 50 ? `calc(${top}% + 100px)` : `calc(${top}% - 100px)`;

        Object.assign(drop.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: startY,
            backgroundColor: color,
            borderRadius: '50%',
            transform: `translate3d(0, 0, ${zDepth}px) scale(0)`,
            opacity: '0',
            filter: 'blur(1px)',
            boxShadow: `0 0 ${size / 5}px ${color}`,
            position: 'absolute',
        });

        container.appendChild(drop);

        requestAnimationFrame(() => {
            const duration = Math.random() * 2 + 1;
            drop.style.transition = `transform ${duration}s cubic-bezier(0.65,0,0.35,1), opacity ${duration}s ease`;
            drop.style.transform = `translate3d(0, 0, ${zDepth}px) scale(1)`;
            drop.style.opacity = '0.8';

            setTimeout(() => burst(drop, size, color, zDepth), Math.random() * 5000 + 3000);
        });
    };

    const burst = (drop, size, color, z) => {
        const left = drop.offsetLeft;
        const top = drop.offsetTop;
        drop.remove();

        const count = Math.floor(Math.random() * 5) + 8;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'paint-particle';

            const particleSize = Math.random() * size / 2 + size / 4;
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * size * 2 + size;
            const duration = Math.random() * 0.5 + 0.5;
            const delay = Math.random() * 0.2;
            const particleZ = z + (Math.random() * 60 - 30);

            Object.assign(p.style, {
                width: `${particleSize}px`,
                height: `${particleSize}px`,
                left: `${left}px`,
                top: `${top}px`,
                backgroundColor: color,
                borderRadius: '50%',
                opacity: '0.7',
                position: 'absolute',
                transform: `translate3d(0, 0, ${particleZ}px) scale(1)`,
                transition: `transform ${duration}s ease-out ${delay}s, opacity ${duration}s ease-out ${delay}s`,
                filter: 'blur(0.5px)',
                boxShadow: `0 0 ${particleSize / 3}px ${color}`,
            });

            container.appendChild(p);

            requestAnimationFrame(() => {
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                p.style.transform = `translate3d(${x}px, ${y}px, ${particleZ}px) scale(0)`;
                p.style.opacity = '0';
                setTimeout(() => p.remove(), (duration + delay) * 1000);
            });
        }
    };

    const generateBatch = () => {
        const count = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < count; i++) {
            setTimeout(() => !document.hidden && createDrop(), i * 500);
        }
    };

    for (let i = 0; i < 8; i++) {
        setTimeout(generateBatch, i * 800);
    }

    const dropInterval = setInterval(() => !document.hidden && generateBatch(), 500);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearInterval(dropInterval);
    });
}

/* -------------------------------
   2. Navigation + Menu
---------------------------------- */
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const icon = navToggle.querySelector('i') || navToggle.appendChild(document.createElement('i'));

    icon.className = 'fas fa-bars';

    navToggle.addEventListener('click', () => {
        const active = navLinks.classList.toggle('active');
        icon.className = active ? 'fas fa-times' : 'fas fa-bars';
        document.body.style.overflow = active ? 'hidden' : '';
        navToggle.classList.add('animate');
        setTimeout(() => navToggle.classList.remove('animate'), 300);
    });

    document.querySelectorAll('.nav-links a').forEach(link =>
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        })
    );
}

/* -------------------------------
   3. Smooth Scrolling
---------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor =>
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        })
    );
}

/* -------------------------------
   4. Animate Elements on Scroll
---------------------------------- */
function initScrollAnimations() {
    const throttle = (fn, limit) => {
        let wait = false;
        return function () {
            if (!wait) {
                fn();
                wait = true;
                setTimeout(() => (wait = false), limit);
            }
        };
    };

    const reveal = () => {
        document.querySelectorAll('.team-card, .course-card, .about-image, .about-text, .info-item, .contact-form')
            .forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                    el.classList.add('animate');
                }
            });
    };

    window.addEventListener('scroll', throttle(reveal, 200));
    reveal();
}

/* -------------------------------
   5. Carousel
---------------------------------- */
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prev = document.querySelector('.carousel-btn.prev');
    const next = document.querySelector('.carousel-btn.next');
    let index = 0;
    let interval;

    const update = () => {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    };

    const start = () => {
        interval = setInterval(() => {
            index = (index + 1) % items.length;
            update();
        }, 5000);
    };

    if (prev && next && items.length > 1) {
        prev.addEventListener('click', () => {
            clearInterval(interval);
            index = (index - 1 + items.length) % items.length;
            update();
            start();
        });

        next.addEventListener('click', () => {
            clearInterval(interval);
            index = (index + 1) % items.length;
            update();
            start();
        });

        start();
    }
}

/* -------------------------------
   6. Dynamic Paint Splashes
---------------------------------- */
function initPaintSplashes() {
    const container = document.querySelector('.splash-container');
    const colors = ['#ff5252', '#4caf50', '#2196f3', '#ffeb3b', '#9c27b0'];

    const create = () => {
        document.querySelectorAll('.splash:not(:nth-child(-n+5))').forEach(s => s.remove());

        for (let i = 0; i < 5; i++) {
            const splash = document.createElement('div');
            splash.classList.add('splash');
            splash.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
            splash.style.setProperty('--size', `${Math.random() * 10 + 5}vw`);
            splash.style.setProperty('--left', `${Math.random() * 100}%`);
            splash.style.setProperty('--top', `${Math.random() * 100}%`);
            splash.style.setProperty('--delay', `${Math.random() * 10}s`);
            container.appendChild(splash);
        }
    };

    create();
    setInterval(create, 15000);
}

/* -------------------------------
   7. Team Card Hover Feather
---------------------------------- */
function initTeamCardFeathers() {
    document.querySelectorAll('.team-card').forEach(card => {
        const feather = card.querySelector('.card-feather');
        if (!feather) return;

        card.addEventListener('mouseenter', () => {
            feather.style.opacity = '1';
            feather.style.transform = 'scale(1) rotate(360deg)';
        });

        card.addEventListener('mouseleave', () => {
            feather.style.opacity = '0';
            feather.style.transform = 'scale(0.5) rotate(0deg)';
        });
    });
}

/* -------------------------------
   8. Contact Form Submission
---------------------------------- */
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });
}

/* -------------------------------
   9. Sticky Navigation
---------------------------------- */
function initStickyNav() {
    const nav = document.querySelector('.eagle-nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 100);
    });
}

/* -------------------------------
   10. Logo Hover Effect
---------------------------------- */
function initLogoHover() {
    const logo = document.querySelector('.logo');
    if (!logo) return;
    logo.addEventListener('mouseenter', () => logo.style.transform = 'scale(1.05)');
    logo.addEventListener('mouseleave', () => logo.style.transform = 'scale(1)');
}

/* -------------------------------
   11. Window Resize Cleanup
---------------------------------- */
function initWindowResize() {
    const navLinks = document.querySelector('.nav-links');
    const icon = document.querySelector('.nav-toggle i');
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    });
}
