document.addEventListener('DOMContentLoaded', function() {
    // Full-Page 3D Paint Drops System
    function createPaintDropsSystem() {
        const paintContainer = document.createElement('div');
        paintContainer.id = 'paint-drops-container';
        document.body.appendChild(paintContainer);

        const colors = [
            'rgba(142, 68, 173, 0.6)', 'rgba(52, 152, 219, 0.6)',
            'rgba(243, 208, 70, 0.6)', 'rgba(231, 76, 60, 0.6)',
            'rgba(46, 204, 113, 0.6)','rgba(46, 75, 204, 0.6)',
            'rgba(190, 210, 42, 0.6)','rgba(217, 47, 232, 0.6)'
        ];

        // Create drops at random positions throughout the page
        function createPaintDropsBatch() {
            const batchSize = Math.floor(Math.random() * 3) + 3; // 3-5 drops
            
            for (let i = 0; i < batchSize; i++) {
                setTimeout(() => {
                    if (!document.hidden) createPaintDrop();
                }, i * 500);
            }
        }
        
        function createPaintDrop() {
            const drop = document.createElement('div');
            drop.className = 'paint-drop';
            
            // Random position throughout the viewport
            const size = Math.random() * 30 + 10;
            const left = Math.random() * 100;
            const top = Math.random() * 100; // Random vertical position
            const color = colors[Math.floor(Math.random() * colors.length)];
            const animationDuration = Math.random() * 2 + 1;
            const burstDelay = Math.random() * 5000 + 3000;
            const zDepth = Math.random() * 100 - 50;
            
            // Start position varies based on where they'll appear
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
                boxShadow: `0 0 ${size/5}px ${color}`
            });
            
            paintContainer.appendChild(drop);
            
            requestAnimationFrame(() => {
                drop.style.transition = `transform ${animationDuration}s cubic-bezier(0.65, 0, 0.35, 1), opacity ${animationDuration}s ease`;
                drop.style.transform = `translate3d(0, 0, ${zDepth}px) scale(1)`;
                drop.style.opacity = '0.8';
                
                setTimeout(() => {
                    burstPaintDrop(drop);
                }, burstDelay);
            });
        }
        
        function burstPaintDrop(drop) {
            const color = drop.style.backgroundColor;
            const left = drop.offsetLeft;
            const top = drop.offsetTop;
            const size = parseInt(drop.style.width);
            const zDepth = parseInt(drop.style.transform.split(',')[2]?.replace('px)', '') || 0);
            
            drop.remove();
            
            const particleCount = Math.floor(Math.random() * 5) + 8;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'paint-particle';
                
                const particleSize = Math.random() * size/2 + size/4;
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * size * 2 + size;
                const duration = Math.random() * 0.5 + 0.5;
                const delay = Math.random() * 0.2;
                const particleZ = zDepth + (Math.random() * 60 - 30);
                
                Object.assign(particle.style, {
                    width: `${particleSize}px`,
                    height: `${particleSize}px`,
                    left: `${left}px`,
                    top: `${top}px`,
                    backgroundColor: color,
                    borderRadius: '50%',
                    opacity: '0.7',
                    transform: `translate3d(0, 0, ${particleZ}px) scale(1)`,
                    transition: `transform ${duration}s ease-out ${delay}s, opacity ${duration}s ease-out ${delay}s`,
                    filter: 'blur(0.5px)',
                    boxShadow: `0 0 ${particleSize/3}px ${color}`
                });
                
                paintContainer.appendChild(particle);
                
                requestAnimationFrame(() => {
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;
                    particle.style.transform = `translate3d(${x}px, ${y}px, ${particleZ}px) scale(0)`;
                    particle.style.opacity = '0';
                    
                    setTimeout(() => {
                        particle.remove();
                    }, (duration + delay) * 1000);
                });
            }
        }
        
        function startPaintDrops() {
            // Initial drops distributed throughout the page
            for (let i = 0; i < 8; i++) {
                setTimeout(createPaintDropsBatch, i * 800);
            }
            
            const dropInterval = setInterval(() => {
                if (!document.hidden) {
                    createPaintDropsBatch();
                }
            }, 500);
            
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) clearInterval(dropInterval);
            });
        }
        
        startPaintDrops();
    }

    createPaintDropsSystem();
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.eagle-nav');
    const logo = document.querySelector('.logo');

    // Initialize Font Awesome icons if not already present
    function initMenuIcons() {
        if (!navToggle.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-bars';
            navToggle.appendChild(icon);
        }
    }

    // Enhanced Mobile Navigation Toggle
    navToggle.addEventListener('click', function() {
        // Toggle active class on nav links
        navLinks.classList.toggle('active');
        
        // Toggle hamburger icon
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
        
        // Add animation class
        this.classList.add('animate');
        setTimeout(() => {
            this.classList.remove('animate');
        }, 300);
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = '';
            }
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Scroll Down Button
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Carousel Functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;
    let carouselInterval;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function startCarousel() {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    }

    if (prevBtn && nextBtn && carouselItems.length > 1) {
        prevBtn.addEventListener('click', function() {
            clearInterval(carouselInterval);
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
            updateCarousel();
            startCarousel();
        });

        nextBtn.addEventListener('click', function() {
            clearInterval(carouselInterval);
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
            startCarousel();
        });

        startCarousel();
    }

    // Scroll Animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.team-card, .course-card, .about-image, .about-text, .info-item, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Dynamic Paint Splashes
    function createPaintSplashes() {
        const splashContainer = document.querySelector('.splash-container');
        const colors = ['#ff5252', '#4caf50', '#2196f3', '#ffeb3b', '#9c27b0'];
        
        // Clear existing splashes except the initial ones
        const existingSplashes = document.querySelectorAll('.splash:not(:first-child):not(:nth-child(2)):not(:nth-child(3)):not(:nth-child(4)):not(:nth-child(5))');
        existingSplashes.forEach(splash => splash.remove());
        
        // Create additional random splashes
        for (let i = 0; i < 5; i++) {
            const splash = document.createElement('div');
            splash.classList.add('splash');
            
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 10;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            splash.style.setProperty('--color', color);
            splash.style.setProperty('--size', `${size}vw`);
            splash.style.setProperty('--left', `${left}%`);
            splash.style.setProperty('--top', `${top}%`);
            splash.style.setProperty('--delay', `${delay}s`);
            
            splashContainer.appendChild(splash);
        }
    }

    createPaintSplashes();
    setInterval(createPaintSplashes, 15000); // Change splashes every 15 seconds

    // Feather Animation on Team Cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const feather = this.querySelector('.card-feather');
            if (feather) {
                feather.style.opacity = '1';
                feather.style.transform = 'scale(1) rotate(360deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const feather = this.querySelector('.card-feather');
            if (feather) {
                feather.style.opacity = '0';
                feather.style.transform = 'scale(0.5) rotate(0deg)';
            }
        });
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Logo hover effect
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Window resize handler
    window.addEventListener('resize', function() {
        // Close mobile menu if window is resized to desktop size
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
        }
    });

    // Initialize menu icons
    initMenuIcons();
});