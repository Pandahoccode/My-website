// navigation.js - Scroll effects for navigation

class NavigationManager {
    constructor() {
        this.lastScrollY = window.scrollY;
        this.nav = document.querySelector('header');
        this.scrolling = false;
        this.init();
    }
    
    init() {
        this.addScrollListener();
        this.addHoverEffects();
    }
    
    addScrollListener() {
        window.addEventListener('scroll', () => {
            if (!this.scrolling) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    this.scrolling = false;
                });
                this.scrolling = true;
            }
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        
        // Only trigger if scrolled more than 50px to prevent flickering
        if (Math.abs(currentScrollY - this.lastScrollY) > 50) {
            if (scrollDirection === 'down' && currentScrollY > 100) {
                this.hideNav();
            } else {
                this.showNav();
            }
            this.lastScrollY = currentScrollY;
        }
    }
    
    hideNav() {
        this.nav.classList.add('nav-scroll-down');
        this.nav.classList.remove('nav-scroll-up');
    }
    
    showNav() {
        this.nav.classList.add('nav-scroll-up');
        this.nav.classList.remove('nav-scroll-down');
    }
    
    addHoverEffects() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.showNav(); // Force show nav on hover
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});