document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
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

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
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
}); 