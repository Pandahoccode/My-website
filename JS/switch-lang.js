// switch-lang.js - Main language switcher functionality
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getSavedLanguage() || 'en';
        this.translations = window.translations || {};
        this.init();
    }
    
    init() {
        this.applyLanguage(this.currentLang);
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            }
        });
    }
    
    switchLanguage(lang) {
        this.currentLang = lang;
        this.saveLanguage(lang);
        this.applyLanguage(lang);
        this.updateActiveButton(lang);
    }
    
    applyLanguage(lang) {
        // Store original text if not already stored
        document.querySelectorAll('[data-i18n]').forEach(element => {
            if (!element.hasAttribute('data-original')) {
                element.setAttribute('data-original', element.textContent);
            }
        });
        
        if (lang === 'en') {
            this.resetToEnglish();
        } else {
            const translation = this.translations[lang];
            if (translation) {
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (translation[key]) {
                        element.textContent = translation[key];
                    }
                });
                
                // Update page title
                if (translation['page-title']) {
                    document.title = translation['page-title'];
                }
            }
        }
    }
    
    resetToEnglish() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const originalText = element.getAttribute('data-original');
            if (originalText) {
                element.textContent = originalText;
            }
        });
        document.title = 'My Website';
    }
    
    updateActiveButton(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }
    
    getSavedLanguage() {
        return localStorage.getItem('preferred-language');
    }
    
    saveLanguage(lang) {
        localStorage.setItem('preferred-language', lang);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});