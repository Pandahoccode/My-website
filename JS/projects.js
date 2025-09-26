// projects.js - Projects page specific functionality

/**
 * PROJECT DATA
 * Contains all project information
 */
const projectsData = [
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
        ],
        category: "computer-vision"
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
        ],
        category: "data-science"
    }
];

/**
 * PROJECT FILTERING SYSTEM
 * Handles filtering projects by category
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            filterProjects(filterValue, projectCards);
        });
    });
}

/**
 * Filter projects based on category
 */
function filterProjects(filterValue, projectCards) {
    projectCards.forEach(card => {
        if (filterValue === 'all') {
            card.style.display = 'block';
        } else {
            const categories = card.getAttribute('data-category');
            if (categories && categories.includes(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
        
        // Add fade animation
        setTimeout(() => {
            card.style.opacity = card.style.display === 'none' ? '0' : '1';
        }, 100);
    });
}

/**
 * PROJECT MODAL SYSTEM
 * Handles displaying project details in modals
 */
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-project-content');
    
    if (!modal) return;
    
    setupModalEvents(modal, modalContent);
    setupProjectClickHandlers(modal, modalContent);
}

/**
 * Set up modal event listeners
 */
function setupModalEvents(modal, modalContent) {
    const closeBtn = document.querySelector('.close-modal');
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal(modal);
        }
    });
}

/**
 * Set up project click handlers
 */
function setupProjectClickHandlers(modal, modalContent) {
    document.addEventListener('click', function(e) {
        const projectId = getClickedProjectId(e);
        
        if (projectId) {
            const project = projectsData.find(p => p.id === projectId);
            if (project) {
                openProjectModal(project, modal, modalContent);
            }
        }
    });
}

/**
 * Get project ID from click event
 */
function getClickedProjectId(e) {
    if (e.target.classList.contains('view-details')) {
        return parseInt(e.target.getAttribute('data-project-id'));
    } else if (e.target.closest('.project-card')) {
        return parseInt(e.target.closest('.project-card').getAttribute('data-project-id'));
    }
    return null;
}

/**
 * Open project modal with project data
 */
function openProjectModal(project, modal, modalContent) {
    modalContent.innerHTML = createModalContent(project);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Create modal content HTML
 */
function createModalContent(project) {
    return `
        <div class="modal-project">
            <h2>${project.title}</h2>
            <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            <p class="modal-description">${project.fullDescription}</p>
            
            <div class="modal-tech">
                <h3>Technologies Used</h3>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-features">
                <h3>Key Features</h3>
                <ul class="feature-list">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-links">
                <a href="${project.demoLink}" class="project-link">Live Demo</a>
                <a href="${project.codeLink}" class="project-link">Source Code</a>
            </div>
        </div>
    `;
}

/**
 * Close project modal
 */
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/**
 * RENDER PROJECTS GRID
 * Dynamically renders projects into the grid
 */
function renderProjectsGrid() {
    const gridContainer = document.querySelector('.projects-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';
    
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        gridContainer.appendChild(projectCard);
    });
}

/**
 * Create project card HTML element
 */
function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card reveal-on-scroll';
    projectCard.setAttribute('data-project-id', project.id);
    projectCard.setAttribute('data-category', project.category);
    
    projectCard.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-overlay">
                <span class="view-details" data-project-id="${project.id}">View Details</span>
            </div>
        </div>
        <div class="project-content">
            <div class="project-header">
                <h3>${project.title}</h3>
                <span class="project-date">2024</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tags.slice(0, 3).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="#" class="project-link view-details" data-project-id="${project.id}">View Details</a>
                <a href="${project.demoLink}" class="project-link">Live Demo</a>
                <a href="${project.codeLink}" class="project-link">Source Code</a>
            </div>
        </div>
    `;
    
    return projectCard;
}

/**
 * INITIALIZE PROJECTS PAGE
 * Main function for projects page
 */
function initializeProjectsPage() {
    if (!document.querySelector('.projects-grid')) return;
    
    renderProjectsGrid();
    initProjectFilters();
    initProjectModals();
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeProjectsPage,
        projectsData
    };
}