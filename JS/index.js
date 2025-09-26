// index.js - Home page specific functionality

/**
 * HERO SECTION ANIMATIONS
 * Handles home page specific animations
 */
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    // Add staggered animation to hero elements
    const heroElements = heroContent.querySelectorAll('h1, p, .hero-buttons');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

/**
 * FLOATING CARDS ANIMATION
 * Animates the floating cards in hero section
 */
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
}

/**
 * SKILLS PREVIEW INTERACTION
 * Adds interactivity to skills preview section
 */
function initSkillsPreview() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'white';
        });
    });
}

/**
 * FEATURED PROJECTS CAROUSEL
 * Simple auto-advancing project showcase (optional)
 */
function initFeaturedProjects() {
    const projectCards = document.querySelectorAll('.project-card.preview');
    let currentIndex = 0;
    
    // Auto-rotate featured projects every 5 seconds
    setInterval(() => {
        projectCards.forEach(card => card.classList.remove('active'));
        currentIndex = (currentIndex + 1) % projectCards.length;
        projectCards[currentIndex].classList.add('active');
    }, 5000);
}

/**
 * CTA BUTTON ANIMATIONS
 * Special animations for call-to-action buttons
 */
function initCTAAnimations() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * SCROLL TO SECTIONS
 * Smooth scrolling for navigation within home page
 */
function initHomeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * INITIALIZE HOME PAGE
 * Main function for home page
 */
function initializeHomePage() {
    if (!document.querySelector('.hero')) return;
    
    initHeroAnimations();
    initFloatingCards();
    initSkillsPreview();
    initHomeNavigation();
    initCTAAnimations();
    
    // Optional: Initialize featured projects carousel
    if (document.querySelector('.project-card.preview')) {
        initFeaturedProjects();
    }
}

// Add CSS for ripple effect
const rippleStyles = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.btn {
    position: relative;
    overflow: hidden;
}

.floating-card {
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}
`;

// Inject styles if not already present
if (!document.getElementById('home-styles')) {
    const style = document.createElement('style');
    style.id = 'home-styles';
    style.textContent = rippleStyles;
    document.head.appendChild(style);
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeHomePage
    };
}