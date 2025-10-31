// ========================================
// Theme Toggle Functionality
// ========================================

// Get theme from localStorage or default to 'dark'
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
console.log('Initial theme:', savedTheme);

// Update theme icon based on current theme
function updateThemeIcon() {
    const themeToggleIcon = document.querySelector('.theme-toggle i');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (themeToggleIcon) {
        if (currentTheme === 'dark') {
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        } else {
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        }
        console.log('Theme icon updated:', currentTheme);
    } else {
        console.log('Theme toggle icon not found');
    }
}

// Initialize theme icon
updateThemeIcon();

// Theme toggle button event
const themeToggleBtn = document.querySelector('.theme-toggle');
console.log('Theme toggle button found:', themeToggleBtn);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        console.log('Switching from', currentTheme, 'to', newTheme);
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });
}

// ========================================
// Certificate Modal Functionality
// ========================================

const certificateImages = {
    'matlab-certificate': 'Edge Course.jpg',
    'research-certificate': 'Certificate of Appreciation.png'
};

function openCertificateModal(certificateId) {
    const modal = document.getElementById('certificate-modal');
    const certificateImage = document.getElementById('certificate-image');
    
    const imagePath = certificateImages[certificateId];
    if (imagePath) {
        certificateImage.src = imagePath;
        certificateImage.alt = certificateId.replace('-', ' ').toUpperCase();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event delegation for certificate buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.view-certificate-btn')) {
        e.preventDefault();
        const button = e.target.closest('.view-certificate-btn');
        const certificateId = button.getAttribute('data-certificate');
        openCertificateModal(certificateId);
    }
    
    if (e.target.closest('[data-close-certificate]')) {
        closeCertificateModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertificateModal();
    }
});

// ========================================
// Mobile Menu Toggle
// ========================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarClose = document.querySelector('.sidebar-close');
const navbarNav = document.querySelector('.navbar-nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Toggle mobile menu
        if (window.innerWidth <= 992) {
            navbarNav.classList.toggle('active');
            sidebar.classList.toggle('active');
        } else {
            sidebar.classList.toggle('active');
        }
        
        // Change icon
        const icon = mobileMenuToggle.querySelector('i');
        if (navbarNav.classList.contains('active') || sidebar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close sidebar with X button
if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
        
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
        const navbar = document.querySelector('.top-navbar');
        if (!navbar.contains(e.target) && navbarNav.classList.contains('active')) {
            navbarNav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// ========================================
// Active Navigation Based on Scroll
// ========================================

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Debounce function for scroll performance
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScrollHandler = debounce(updateActiveNavOnScroll, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// ========================================
// Smooth Scroll for Navigation Links
// ========================================

document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Smooth scroll to section
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active nav immediately
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// ========================================
// Fade-in Animation on Scroll
// ========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(`
        .timeline-item,
        .skill-card,
        .project-card,
        .research-card,
        .experience-card
    `);
    
    animateElements.forEach(el => {
        fadeInObserver.observe(el);
    });
    
    // Set initial active nav on page load
    updateActiveNavOnScroll();
});

// ========================================
// Form Validation Enhancement
// ========================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all fields before submitting.');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return false;
        }
    });
}

// ========================================
// Sidebar Scroll Sync (Optional Enhancement)
// ========================================

// Make sidebar scroll position sync with content
let lastScrollTop = 0;
const sidebarContent = document.querySelector('.sidebar-content');

window.addEventListener('scroll', debounce(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Only apply on larger screens
    if (window.innerWidth > 992) {
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        // You can add subtle animations here if needed
    }
}, 20));

// ========================================
// Responsive Handling
// ========================================

let windowWidth = window.innerWidth;

window.addEventListener('resize', debounce(() => {
    const currentWidth = window.innerWidth;
    
    // If transitioning from mobile to desktop
    if (windowWidth <= 992 && currentWidth > 992) {
        sidebar.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    windowWidth = currentWidth;
}, 250));

// ========================================
// Console Welcome Message
// ========================================

console.log('%c👋 Welcome to Mueez Mejbah\'s Portfolio!', 
    'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/Mueez21', 
    'color: #10b981; font-size: 14px;');

// ========================================
// Scroll to Top Button
// ========================================

const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
