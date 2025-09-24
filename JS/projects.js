// Projects.js

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
    initProjectModals();
    initScrollAnimations();
    initProjectCardHoverEffects();
});

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }

                setTimeout(() => {
                    card.style.opacity = card.style.display === 'none' ? '0' : '1';
                    card.style.transform = card.style.display === 'none' ? 'scale(0.9)' : 'scale(1)';
                }, 100);
            });
        });
    });
}

// Project modal functionality
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-project-content');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal) return;

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.project-card') || e.target.classList.contains('view-details')) {
            e.preventDefault();
            const projectCard = e.target.closest('.project-card');
            openProjectModal(projectCard);
        }
    });

    function openProjectModal(projectCard) {
        const projectTitle = projectCard.querySelector('h3').textContent;
        const projectDescription = projectCard.querySelector('.project-description').textContent;
        const projectImage = projectCard.querySelector('img').src;
        const projectTech = projectCard.querySelector('.project-tech').innerHTML;
        const projectFeatures = projectCard.querySelector('.project-features').innerHTML;

        modalContent.innerHTML = `
            <div class="modal-project">
                <img src="${projectImage}" alt="${projectTitle}" class="modal-project-image">
                <h2>${projectTitle}</h2>
                <p class="modal-description">${projectDescription}</p>

                <div class="modal-tech">
                    <h3>Technologies Used</h3>
                    ${projectTech}
                </div>

                <div class="modal-features">
                    ${projectFeatures}
                </div>

                <div class="modal-links">
                    ${projectCard.querySelector('.project-links').innerHTML}
                </div>
            </div>
        `;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Scroll animations
function initScrollAnimations() {
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

// Hover effects for project cards (different from general card hover)
function initProjectCardHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}
