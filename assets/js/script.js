// Enhanced JavaScript for Justin James Pulanco Portfolio

// Navigation functionality for multi-page structure
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default for same-page anchors (starting with #)
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        // Close mobile menu for all clicks
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        themeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
    });
}

// Hamburger menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Enhanced gallery modal (lightbox) with navigation for tour photos
let currentImageIndex = 0;
let currentGalleryImages = [];
let galleryModal = null;

function createGalleryModal() {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-container">
            <button class="gallery-close">&times;</button>
            <button class="gallery-prev">&#8249;</button>
            <img class="gallery-image" src="" alt="">
            <button class="gallery-next">&#8250;</button>
            <div class="gallery-counter">
                <span class="current-image">1</span> / <span class="total-images">1</span>
            </div>
        </div>
    `;
    return modal;
}

function showImage(index) {
    if (currentGalleryImages.length === 0) return;
    
    currentImageIndex = index;
    const img = galleryModal.querySelector('.gallery-image');
    const counter = galleryModal.querySelector('.current-image');
    const total = galleryModal.querySelector('.total-images');
    
    img.src = currentGalleryImages[currentImageIndex].src;
    img.alt = currentGalleryImages[currentImageIndex].alt;
    counter.textContent = currentImageIndex + 1;
    total.textContent = currentGalleryImages.length;
    
    // Update navigation buttons
    const prevBtn = galleryModal.querySelector('.gallery-prev');
    const nextBtn = galleryModal.querySelector('.gallery-next');
    
    prevBtn.style.display = currentGalleryImages.length > 1 ? 'block' : 'none';
    nextBtn.style.display = currentGalleryImages.length > 1 ? 'block' : 'none';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    showImage(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    showImage(currentImageIndex);
}

function closeGallery() {
    if (galleryModal) {
        galleryModal.remove();
        galleryModal = null;
        document.body.style.overflow = '';
    }
}

// Initialize gallery for tour photos
function initializeGallery() {
    const tourSections = document.querySelectorAll('.tour-photos');
    
    tourSections.forEach(section => {
        const images = section.querySelectorAll('img');
        
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentGalleryImages = Array.from(images);
                currentImageIndex = index;
                
                if (!galleryModal) {
                    galleryModal = createGalleryModal();
                    document.body.appendChild(galleryModal);
                    
                    // Add event listeners
                    galleryModal.querySelector('.gallery-close').addEventListener('click', closeGallery);
                    galleryModal.querySelector('.gallery-prev').addEventListener('click', prevImage);
                    galleryModal.querySelector('.gallery-next').addEventListener('click', nextImage);
                    
                    // Close on background click
                    galleryModal.addEventListener('click', (e) => {
                        if (e.target === galleryModal) closeGallery();
                    });
                    
                    // Keyboard navigation
                    document.addEventListener('keydown', (e) => {
                        if (!galleryModal) return;
                        
                        switch(e.key) {
                            case 'Escape':
                                closeGallery();
                                break;
                            case 'ArrowLeft':
                                prevImage();
                                break;
                            case 'ArrowRight':
                                nextImage();
                                break;
                        }
                    });
                }
                
                document.body.style.overflow = 'hidden';
                showImage(currentImageIndex);
            });
        });
    });
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', initializeGallery);

// Toggle tour details
function toggleTour(tourId) {
    const content = document.getElementById(tourId + '-content');
    content.classList.toggle('hidden');
}

// Loading Screen (only on home page)
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// Typing Animation (only on home page)
const typedTextElement = document.getElementById('typed-text');
if (typedTextElement) {
    const texts = ['IT Student', 'Web Developer', 'Tech Enthusiast', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeText, typingSpeed);
    }

    // Start typing animation after loading
    setTimeout(typeText, 2000);
}

// Skills Animation
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Animate skills when they come into view
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Back to Top Button functionality
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced scroll animations
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

// Apply enhanced animations to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.transform = 'translateY(50px)';
    card.style.opacity = '0';
    card.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    enhancedObserver.observe(card);
});