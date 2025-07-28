document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
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
                    navToggle.querySelector('i').classList.remove('fa-times');
                    navToggle.querySelector('i').classList.add('fa-bars');
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

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
    }

    // Auto-rotate carousel
    if (carouselItems.length > 1) {
        setInterval(() => {
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
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
            feather.style.opacity = '1';
            feather.style.transform = 'scale(1) rotate(360deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const feather = this.querySelector('.card-feather');
            feather.style.opacity = '0';
            feather.style.transform = 'scale(0.5) rotate(0deg)';
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
        const nav = document.querySelector('.eagle-nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.9)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});
// Enhanced Navigation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.eagle-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Mobile Navigation Toggle with Enhanced Animation
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body overflow when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Sticky Navigation with Smooth Transition
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Add hover effect to logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});