document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    // Optimize scroll performance on mobile
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Update scroll progress
                const scrollProgress = document.querySelector('.scroll-progress');
                const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (window.pageYOffset / totalHeight);
                scrollProgress.style.transform = `scaleX(${progress})`;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if(elementPosition < screenPosition - 100) {
                element.style.opacity = '1';
                element.classList.add('fade-in-up');
            }
        });
    }

    // Typing effect for name
    const nameElement = document.querySelector('.name');
    const nameText = nameElement.textContent;
    nameElement.textContent = '';
    let charIndex = 0;

    const typeEffect = () => {
        if(charIndex < nameText.length) {
            nameElement.textContent += nameText.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        }
    }

    // Add animation classes to elements
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.add('animate', 'slide-in');
    });

    document.querySelectorAll('.cert-item').forEach(item => {
        item.classList.add('animate', 'scale-in');
    });

    document.querySelectorAll('.skills li').forEach(item => {
        item.classList.add('animate', 'fade-in-up');
    });

    // Initialize animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    typeEffect(); // Start typing effect

    // Particle background effect for home section
    const homeSection = document.querySelector('#home');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    homeSection.insertBefore(particlesContainer, homeSection.firstChild);

    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particlesContainer.appendChild(particle);
    }

    // Optimize animations for mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Reduce particle count on mobile
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 25) { // Keep only 25 particles on mobile
                particle.remove();
            }
        });
    }

    // Handle form submission on mobile
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Prevent double submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
        });
    }

    // Smooth reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .cert-item, .skills li').forEach((el) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.submit-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            
            let ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}); 