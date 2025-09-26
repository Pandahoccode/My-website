// effects.js - All animations and UI effects

/**
 * SCROLL REVEAL ANIMATIONS
 * Animates elements when they come into view during scrolling
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

/**
 * CARD HOVER EFFECTS
 * Adds interactive hover animations to cards
 */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .preview-card, .journey-card, .interest-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(139, 92, 246, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

/**
 * SKILL PROGRESS ANIMATIONS
 * Animates skill progress bars when they come into view
 */
function initSkillAnimations() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const level = progressBar.getAttribute('data-level');
                progressBar.style.width = level + '%';
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillProgressBars.forEach(bar => observer.observe(bar));
}

/**
 * TYPING ANIMATION
 * Creates typing effect for text elements
 */
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid white';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                element.style.borderRight = 'none';
            }
        }, 100);
    });
}

/**
 * PARALLAX SCROLL EFFECT
 * Creates parallax effect for background elements
 */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

/**
 * SMOOTH SCROLLING
 * Enables smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * LAZY LOADING FOR IMAGES
 * Improves performance by lazy loading images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

/**
 * PAGE TRANSITION EFFECTS
 * Adds fade-in effects when page loads
 */
function initPageTransitions() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }
}

/**
 * INITIALIZE ALL EFFECTS
 * Main function to initialize all animations
 */
function initializeEffects() {
    initScrollReveal();
    initCardHoverEffects();
    initSmoothScroll();
    initPageTransitions();
    
    // Initialize specific effects based on page content
    if (document.querySelector('.skill-progress')) {
        initSkillAnimations();
    }
    
    if (document.querySelector('.typing-animation')) {
        initTypingAnimation();
    }
    
    if (document.querySelector('.parallax')) {
        initParallaxEffect();
    }
    
    if (document.querySelector('img[data-src]')) {
        initLazyLoading();
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeEffects,
        initScrollReveal,
        initCardHoverEffects,
        initSkillAnimations
    };
}