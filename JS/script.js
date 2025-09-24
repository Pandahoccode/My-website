// script.js - Enhanced functionality for all pages

// Smooth page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Add page transition class to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }
    
    // Initialize all functionality
    initNavigation();
    initScrollReveal();
    initCardHoverEffects();
    
    // Page-specific initializations
    if (document.querySelector('.projects-grid')) {
        initProjectModals();
    }
    
    if (document.querySelector('.contact-form')) {
        initContactForm();
    }
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Set active navigation link
    setActiveNavLink();
    
    // Add smooth transition for navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) return;
            
            e.preventDefault();
            const targetPage = this.getAttribute('href');
            
            // Add fade-out animation
            if (document.querySelector('main')) {
                document.querySelector('main').style.opacity = '0';
                document.querySelector('main').style.transform = 'translateY(-20px)';
            }
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = targetPage;
            }, 300);
        });
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === './')) {
            link.classList.add('active');
        }
    });
}


// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => observer.observe(el));
}

// Enhanced hover effects for cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .preview-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Project modal functionality
function initProjectModals() {
    // Sample project data (replace with your actual projects)
    const projects = [
        {
            id: 1,
            title: "Helmet Detection AI",
            description: "Trained a YOLOv5 model with self-labeled dataset to detect helmets in real-time.",
            fullDescription: "This project involved training a YOLOv5 model from scratch using a custom dataset of helmet images. The system can detect helmets in real-time video streams with high accuracy and low latency, making it suitable for safety monitoring applications.",
            image: "assets/images/project1.png",
            tags: ["Python", "OpenCV", "YOLOv5", "Computer Vision", "PyTorch"],
            demoLink: "#",
            codeLink: "#",
            features: [
                "Real-time object detection",
                "Custom dataset training",
                "High accuracy model",
                "Real-time video processing",
                "Safety monitoring application"
            ]
        },
        {
            id: 2,
            title: "SQL Dashboard",
            description: "Built an interactive dashboard analyzing 10,000+ records using SQL & PowerBI.",
            fullDescription: "Developed a comprehensive business intelligence dashboard that analyzes over 10,000 records from multiple databases. The dashboard provides actionable insights through interactive visualizations and real-time data updates.",
            image: "assets/images/project2.png",
            tags: ["SQL", "PowerBI", "Data Analysis", "Dashboard", "Business Intelligence"],
            demoLink: "#",
            codeLink: "#",
            features: [
                "Interactive data visualizations",
                "Real-time data updates",
                "Multi-database integration",
                "Custom metrics calculation",
                "Export functionality"
            ]
        }
    ];
    
    // Render projects grid dynamically
    renderProjectsGrid(projects);
    
    // Initialize modal functionality
    setupProjectModals(projects);
}

function renderProjectsGrid(projects) {
    const gridContainer = document.querySelector('.projects-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card reveal-on-scroll';
        projectCard.setAttribute('data-project-id', project.id);
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="#" class="project-link view-details" data-project-id="${project.id}">View Details</a>
                    <a href="${project.demoLink}" class="project-link">Live Demo</a>
                    <a href="${project.codeLink}" class="project-link">Source Code</a>
                </div>
            </div>
        `;
        
        gridContainer.appendChild(projectCard);
    });
}

function setupProjectModals(projects) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-project-content');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modal) return;
    
    // Close modal when clicking X or outside
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Open modal when clicking project cards or "View Details"
    document.addEventListener('click', function(e) {
        let projectId;
        
        if (e.target.classList.contains('view-details')) {
            e.preventDefault();
            projectId = parseInt(e.target.getAttribute('data-project-id'));
        } else if (e.target.closest('.project-card')) {
            projectId = parseInt(e.target.closest('.project-card').getAttribute('data-project-id'));
        }
        
        if (projectId) {
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                modalContent.innerHTML = `
                    <h2>${project.title}</h2>
                    <img src="${project.image}" alt="${project.title}" class="modal-project-image">
                    <p>${project.fullDescription}</p>
                    
                    <h3>Technologies Used</h3>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    
                    <h3>Key Features</h3>
                    <ul class="modal-features">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    
                    <div class="project-links" style="margin-top:2rem;">
                        <a href="${project.demoLink}" class="project-link">Live Demo</a>
                        <a href="${project.codeLink}" class="project-link">Source Code</a>
                    </div>
                `;
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }
    });
}


