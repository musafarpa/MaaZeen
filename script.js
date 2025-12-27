/* ===================================
   MaaZeen Care - JavaScript
   Interactivity & Animations
   =================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // Navigation Toggle (Mobile)
    // ===================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // Active Navigation Link
    // ===================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Back to Top Button
    // ===================================
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // Scroll Animations (Intersection Observer)
    // ===================================
    const animateElements = document.querySelectorAll('.service-card, .benefit-card, .feature, .process-step, .testimonial-card, .contact-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // ===================================
    // Section Header Animations
    // ===================================
    const sectionHeaders = document.querySelectorAll('.section-header');

    const headerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        headerObserver.observe(header);
    });

    // ===================================
    // Counter Animation for Stats
    // ===================================
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        stats.forEach(stat => {
            const target = stat.innerText;
            const isPercentage = target.includes('%');
            const isPlus = target.includes('+');
            const number = parseInt(target.replace(/[^0-9]/g, ''));

            let current = 0;
            const increment = number / 50;
            const duration = 2000;
            const stepTime = duration / 50;

            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(counter);
                }

                let display = Math.floor(current);
                if (isPlus) display += '+';
                if (isPercentage) display += '%';

                stat.innerText = display;
            }, stepTime);
        });

        statsAnimated = true;
    }

    // Trigger stats animation when hero is visible
    const heroSection = document.querySelector('.hero');
    const statsObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
            setTimeout(animateStats, 500);
        }
    }, { threshold: 0.5 });

    if (heroSection) {
        statsObserver.observe(heroSection);
    }

    // ===================================
    // Form Handling
    // ===================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Simple validation
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, select, textarea');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#c94c4c';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                // Show success message (in real implementation, send to server)
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #4a7c23, #6b9b3a)';

                // Reset form
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });

        // Remove error styling on input
        contactForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '';
            });
        });
    }

    // ===================================
    // Newsletter Form
    // ===================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const button = this.querySelector('button');

            if (input.value.trim()) {
                button.innerHTML = '<i class="fas fa-check"></i>';
                input.value = '';

                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-arrow-right"></i>';
                }, 2000);
            }
        });
    }

    // ===================================
    // Parallax Effect for Hero
    // ===================================
    const heroImage = document.querySelector('.hero-image');

    window.addEventListener('scroll', function() {
        if (heroImage && window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // ===================================
    // Floating Leaves Random Animation
    // ===================================
    const leaves = document.querySelectorAll('.leaf');

    leaves.forEach(leaf => {
        // Random starting position
        leaf.style.top = `${Math.random() * -100}px`;

        // Random animation duration
        const duration = 15 + Math.random() * 15;
        leaf.style.animationDuration = `${duration}s`;

        // Random horizontal movement
        leaf.style.animationTimingFunction = 'ease-in-out';
    });

    // ===================================
    // Testimonial Slider (Optional Auto-scroll)
    // ===================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            if (window.innerWidth <= 768) {
                card.style.display = i === index ? 'block' : 'none';
            }
        });
    }

    // Auto-rotate testimonials on mobile
    if (window.innerWidth <= 768) {
        showTestimonial(0);
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // ===================================
    // Service Card Hover Effects
    // ===================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.service-icon').style.transform = 'rotateY(180deg) scale(1.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.service-icon').style.transform = 'rotateY(0) scale(1)';
        });
    });

    // ===================================
    // Typing Effect for Hero Title (Optional)
    // ===================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        element.style.visibility = 'visible';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // ===================================
    // Preloader (Optional)
    // ===================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Trigger initial animations
        const heroElements = document.querySelectorAll('.hero .animate-fade-in, .hero .animate-slide-up');
        heroElements.forEach(el => {
            el.style.opacity = '1';
        });
    });

    // ===================================
    // Resize Handler
    // ===================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset mobile menu on resize
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';

                // Show all testimonials on larger screens
                testimonialCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        }, 250);
    });

    // ===================================
    // Accessibility: Reduce Motion
    // ===================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0s';
            el.style.transitionDuration = '0s';
        });
    }

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🪷 MaaZeen Care', 'font-size: 24px; font-weight: bold; color: #1B4332;');
    console.log('%cNurturing New Mothers with Ancient Wisdom', 'font-size: 14px; color: #6b5b4f;');

    // ===================================
    // Enhanced Scroll Reveal Animations
    // ===================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    scrollRevealElements.forEach(el => revealObserver.observe(el));

    // ===================================
    // Magnetic Button Effect
    // ===================================
    const magneticButtons = document.querySelectorAll('.magnetic-btn, .btn-primary');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // ===================================
    // Parallax Elements on Scroll
    // ===================================
    const parallaxElements = document.querySelectorAll('.mandala, .corner-ornament');

    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
        });
    });

    // ===================================
    // Staggered Card Animations
    // ===================================
    const cardGroups = document.querySelectorAll('.services-grid, .benefits-grid, .gallery-grid');

    cardGroups.forEach(group => {
        const cards = group.children;
        Array.from(cards).forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // ===================================
    // Image Tilt Effect
    // ===================================
    const tiltElements = document.querySelectorAll('.visual-frame, .gallery-item');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;

            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });

        el.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ===================================
    // Ripple Effect on Buttons
    // ===================================
    const rippleButtons = document.querySelectorAll('.btn');

    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ===================================
    // Text Scramble Effect for Hero
    // ===================================
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];

            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;

            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];

                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }

            this.el.innerHTML = output;

            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
    }

    // ===================================
    // Floating Particles
    // ===================================
    function createParticles() {
        const container = document.querySelector('.floating-elements');
        if (!container) return;

        const particleCount = 8;
        const symbols = ['✧', '❋', '✦', '◆', '❀'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 20) + 's';
            particle.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
            particle.style.opacity = 0.1 + Math.random() * 0.2;
            container.appendChild(particle);
        }
    }

    createParticles();

    // ===================================
    // Smooth Counter Animation
    // ===================================
    function animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            element.textContent = Math.floor(easeProgress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ===================================
    // Hover Glow Effect for Cards
    // ===================================
    const glowCards = document.querySelectorAll('.service-card, .benefit-card, .testimonial-card');

    glowCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--glow-x', x + 'px');
            this.style.setProperty('--glow-y', y + 'px');
        });
    });

    // ===================================
    // Cursor Trail Effect (subtle)
    // ===================================
    let cursorTrails = [];
    const maxTrails = 5;

    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth < 768) return; // Disable on mobile

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);

        cursorTrails.push(trail);

        if (cursorTrails.length > maxTrails) {
            const oldTrail = cursorTrails.shift();
            oldTrail.remove();
        }

        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(2)';
        }, 10);

        setTimeout(() => trail.remove(), 500);
    });

});
