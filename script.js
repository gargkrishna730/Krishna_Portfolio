// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Add offline/online status handling
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
});

document.addEventListener('DOMContentLoaded', () => {
    // Check initial online status
    if (!navigator.onLine) {
        document.body.classList.add('offline');
    }

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change menu icon
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
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

    // Skills Animation
    const observeSkills = () => {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        skillCategories.forEach(category => {
            observer.observe(category);
        });
    };

    // Initialize animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    typeEffect(); // Start typing effect
    observeSkills();

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
        contactForm.addEventListener('submit', handleSubmit);
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

    // Theme switcher
    const themeSwitch = document.querySelector('.theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Always set dark theme as default
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme switch handler
    themeSwitch.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // Update theme icon
    function updateThemeIcon(theme) {
        const icon = themeSwitch.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Particle Background Effect
    initParticles();
    initTypingEffect();
    initScrollProgress();
    initSkillProgress();
});

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    
    // Disable the submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Send the form data to your email (using formsubmit.co service)
    fetch('https://formsubmit.co/ajax/gargkrishna730@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => response.json())
    .then(data => {
        // Redirect to thank you page
        window.location.href = 'thankyou.html';
    })
    .catch(error => {
        console.error('Error:', error);
        // Re-enable the submit button if there's an error
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        alert('There was an error sending your message. Please try again.');
    });

    return false;
}

// Particle Background Effect
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particlesContainer.appendChild(particle);
    }
}

// Typing Effect for Home Section
function initTypingEffect() {
    const texts = ["Cloud and DevOps Engineer", "Infrastructure Automation Expert", "CI/CD Specialist"];
    const typingElement = document.querySelector('.home-content h2');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalScroll) * 100;
        progressBar.style.transform = `scaleX(${progress / 100})`;
    });
}

// Skill Progress Animation
function initSkillProgress() {
    const skillItems = document.querySelectorAll('.skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    skillItems.forEach(item => observer.observe(item));
} 