/* ==========================================================================
   MODERN PORTFOLIO INTERACTIVE JAVASCRIPT
   
   Description: Interactive functionality for personal portfolio website
   Author: Mueez Mejbah
   Features: Mobile navigation, smooth scrolling, reveal animations,
             contact form validation, modal management, scroll-to-top button
   Performance: Debounced scroll events, IntersectionObserver for animations,
                optimized event listeners
   Accessibility: ARIA attributes, keyboard navigation, focus management
   ========================================================================== */

'use strict';

/* ==========================================================================
   MOBILE NAVIGATION TOGGLE
   ========================================================================== */

/**
 * Handles mobile hamburger menu toggle functionality
 */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('active');
        
        // Toggle classes
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Update ARIA for accessibility
        hamburger.setAttribute('aria-expanded', !isOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

/* ==========================================================================
   SMOOTH SCROLLING WITH OFFSET
   ========================================================================== */

/**
 * Implements smooth scrolling for anchor links with navbar offset
 */
function initSmoothScrolling() {
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

/* ==========================================================================
   ACTIVE NAVIGATION LINK ON SCROLL
   ========================================================================== */

/**
 * Highlights the current section in navigation based on scroll position
 * Uses debouncing for better performance
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
    
    // Debounce utility function for performance optimization
    function debounce(func, wait) {
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
    
    // Function to update active navigation
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(current)) {
                link.classList.add('active');
            }
        });
    }
    
    // Debounced scroll event listener (fires every 100ms instead of continuously)
    window.addEventListener('scroll', debounce(updateActiveNav, 100));
    
    // Initial call
    updateActiveNav();
}

/* ==========================================================================
   INTERSECTION OBSERVER - REVEAL ANIMATIONS
   ========================================================================== */

/**
 * Adds reveal animations when elements enter viewport
 */
function initRevealAnimations() {
    // Add CSS for reveal animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .reveal-element.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .reveal-element.reveal-left {
            transform: translateX(-50px);
        }
        
        .reveal-element.reveal-left.revealed {
            transform: translateX(0);
        }
        
        .reveal-element.reveal-right {
            transform: translateX(50px);
        }
        
        .reveal-element.reveal-right.revealed {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);

    // Select elements to reveal
    const revealElements = document.querySelectorAll(`
        .skill-card,
        .project-card,
        .education-card,
        .experience-card,
        .research-card,
        .about-text,
        .contact-item
    `);

    revealElements.forEach((el, index) => {
        el.classList.add('reveal-element');
        
        // Add variation to animation direction
        if (index % 3 === 1) el.classList.add('reveal-left');
        else if (index % 3 === 2) el.classList.add('reveal-right');
    });

    // Intersection Observer options
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve after reveal for performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   CONTACT FORM VALIDATION & HANDLING
   ========================================================================== */

/**
 * Validates and handles contact form submission
 * Enhanced with better error handling and user feedback
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        
        // Enhanced validation with specific error messages
        let isValid = true;
        let errorMessage = '';
        
        if (!name || name.length < 2) {
            isValid = false;
            errorMessage = 'Please enter a valid name (at least 2 characters).';
        }
        
        // Email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
        
        if (!message || message.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a message (at least 10 characters).';
        }
        
        if (!isValid) {
            showAlert(errorMessage, 'error');
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );
        const mailtoLink = `mailto:mueezmejbah284@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showAlert('Thank you for your message! Your email client should open shortly.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

/**
 * Shows a temporary alert message with enhanced accessibility
 * @param {string} message - The message to display
 * @param {string} type - The type of alert ('success' or 'error')
 */
function showAlert(message, type = 'success') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) existingAlert.remove();
    
    // Create alert element with ARIA attributes
    const alert = document.createElement('div');
    alert.className = `custom-alert custom-alert-${type}`;
    alert.textContent = message;
    alert.setAttribute('role', 'alert');
    alert.setAttribute('aria-live', 'assertive');
    alert.setAttribute('aria-atomic', 'true');
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: ${type === 'success' ? 'linear-gradient(135deg, #00f0ff, #00ff88)' : 'linear-gradient(135deg, #ff4444, #ff6b6b)'};
        color: ${type === 'success' ? '#07070a' : '#ffffff'};
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        z-index: 9999;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        max-width: 90%;
        text-align: center;
        animation: slideDown 0.3s ease forwards;
    `;
    
    document.body.appendChild(alert);
    
    // Add animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideDown {
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'slideUp 0.3s ease forwards';
        alert.style.opacity = '0';
        alert.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

/* ==========================================================================
   SCROLL TO TOP BUTTON
   ========================================================================== */

/**
 * Creates and manages scroll-to-top button with debouncing
 */
function initScrollToTop() {
    // Create button element
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top of page');
    
    document.body.appendChild(scrollButton);
    
    // Debounce scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 300) {
                scrollButton.style.display = 'flex';
                scrollButton.setAttribute('aria-hidden', 'false');
            } else {
                scrollButton.style.display = 'none';
                scrollButton.setAttribute('aria-hidden', 'true');
            }
        }, 100);
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   PROJECT MODAL HANDLING
   ========================================================================== */

// Store active modal reference
let activeModal = null;
let lastFocusedElement = null;

/**
 * Handles project detail modals
 */
function initProjectModals() {
    // Get all modal trigger buttons
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    const modals = document.querySelectorAll('.project-modal');
    
    // Add click handlers to trigger buttons
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModalById(modalId);
        });
    });
    
    // Add click handlers to close buttons and overlay
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeCurrentModal();
        });
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModal) {
            closeCurrentModal();
        }
    });
    
    // Add keyboard accessibility to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const detailsBtn = card.querySelector('.project-details-btn');
        
        if (detailsBtn) {
            // Make card keyboard accessible
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.target === card) {
                    e.preventDefault();
                    detailsBtn.click();
                }
            });
        }
    });
}

/**
 * Opens a modal by its ID
 * @param {string} modalId - The ID of the modal to open
 */
function openModalById(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        openModal(modal);
    }
}

/**
 * Opens a modal with full accessibility support
 * @param {HTMLElement} modal - The modal element to open
 */
function openModal(modal) {
    if (!modal) return;
    
    // Store the last focused element to return focus later
    lastFocusedElement = document.activeElement;
    
    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Store active modal reference
    activeModal = modal;
    
    // Focus the close button
    setTimeout(() => {
        const closeButton = modal.querySelector('.modal-close');
        closeButton?.focus();
    }, 100);
    
    // Trap focus within modal
    trapFocus(modal);
}

/**
 * Closes the currently active modal
 */
function closeCurrentModal() {
    if (activeModal) {
        closeModal(activeModal);
    }
}

/**
 * Closes a specific modal
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
    if (!modal) return;
    
    // Hide modal
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Clear active modal reference
    activeModal = null;
    
    // Return focus to the element that opened the modal
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

/**
 * Traps focus within a modal for accessibility
 * @param {HTMLElement} element - The modal element to trap focus within
 */
function trapFocus(element) {
    const focusableSelectors = [
        'button:not([disabled])',
        '[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    
    const focusableElements = element.querySelectorAll(focusableSelectors);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    // Remove existing listener if any
    element.removeEventListener('keydown', handleFocusTrap);
    
    // Add new listener
    function handleFocusTrap(e) {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable?.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable?.focus();
            }
        }
    }
    
    element.addEventListener('keydown', handleFocusTrap);
}

/* ==========================================================================
   THEME PERSISTENCE (Dark Mode)
   ========================================================================== */

/**
 * Manages theme preference in localStorage
 */
function initThemePersistence() {
    const THEME_KEY = 'portfolio-theme';
    
    // Get saved theme or default to 'dark'
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Optional: Create theme toggle button (uncomment if you add a toggle button)
    /*
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
            
            // Update button icon/text
            updateThemeToggleIcon(themeToggle, newTheme);
        });
    }
    */
}

/**
 * Get current theme
 * @returns {string} Current theme ('dark' or 'light')
 */
function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
}

/**
 * Set theme
 * @param {string} theme - Theme to set ('dark' or 'light')
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
}

/* ==========================================================================
   TYPING EFFECT (Optional Enhancement)
   ========================================================================== */

/**
 * Creates a typing effect for the hero title
 * @param {HTMLElement} element - Element to apply typing effect
 * @param {number} speed - Typing speed in milliseconds
 */
function typeWriter(element, speed = 50) {
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.visibility = 'visible';
    
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* ==========================================================================
   UTILITY FUNCTIONS
   ========================================================================== */

/**
 * Debounce function to limit function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
function debounce(func, wait = 300) {
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

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ==========================================================================
   PERFORMANCE OPTIMIZATION
   ========================================================================== */

/**
 * Lazy load images when they enter viewport
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* ==========================================================================
   INITIALIZATION - RUNS WHEN DOM IS READY
   ========================================================================== */

/**
 * Initialize all functionality
 */
function init() {
    console.log('🚀 Portfolio initialized!');
    
    // Core functionality
    initMobileNav();
    initSmoothScrolling();
    initActiveNavigation();
    initRevealAnimations();
    initContactForm();
    initScrollToTop();
    initProjectModals();
    initThemePersistence();
    initLazyLoading();
    
    // Optional: Typing effect for hero (uncomment to enable)
    // const heroHighlight = document.querySelector('.hero-title .highlight');
    // if (heroHighlight) typeWriter(heroHighlight, 100);
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/* ==========================================================================
   EXPORT FUNCTIONS (for use in other scripts if needed)
   ========================================================================== */

// If using modules, export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openModal,
        closeModal,
        showAlert,
        getCurrentTheme,
        setTheme,
        debounce,
        isInViewport
    };
}

/**
 * Initialize certificate modal functionality
 * Handles opening and closing certificate image popups
 */
function initCertificateModal() {
    const certificateModal = document.getElementById('certificate-modal');
    const certificateImage = document.getElementById('certificate-image');
    const viewCertificateBtns = document.querySelectorAll('.view-certificate-btn');
    const closeButtons = document.querySelectorAll('[data-close-certificate]');
    
    // Certificate image mapping
    const certificates = {
        'matlab-certificate': 'Edge Course.jpg',
        'research-certificate': 'Certificate of Appreciation.png'
    };
    
    // Open certificate modal
    viewCertificateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const certificateId = btn.getAttribute('data-certificate');
            const certificateSrc = certificates[certificateId];
            
            if (certificateSrc) {
                certificateImage.src = certificateSrc;
                certificateImage.alt = `${certificateId} certificate`;
                certificateModal.classList.add('active');
                certificateModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close certificate modal
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            certificateModal.classList.remove('active');
            certificateModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            certificateImage.src = '';
        });
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
            certificateModal.classList.remove('active');
            certificateModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            certificateImage.src = '';
        }
    });
}

// Console message
console.log('%c✨ Mueez Mejbah Portfolio ✨', 'color: #00f0ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion for technology and innovation 🚀', 'color: #00ff88; font-size: 14px;');

// Initialize certificate modal
initCertificateModal();
