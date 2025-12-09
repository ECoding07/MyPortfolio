// Initialize EmailJS with your public key
emailjs.init("_Wyn3fiECc07gkNGW");

// DOM Elements
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const downloadResume = document.getElementById('downloadResume');

// Project Filter Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Mobile Navigation Toggle
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
});

// Close sidebar when clicking overlay
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close sidebar when clicking nav links on mobile
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Active navigation on scroll
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Contact Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    
    try {
        // Prepare form data for EmailJS
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_email: 'edwinchristianedjanbacay143@gmail.com'
        };
        
        // Send email using EmailJS
        const response = await emailjs.send(
            'portolio', // Your service ID
            'template_rdc8q4d', // Your template ID
            formData
        );
        
        if (response.status === 200) {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }
    } catch (error) {
        console.error('Email sending failed:', error);
        showNotification('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline-flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Resume Download
downloadResume.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = downloadResume.getAttribute('href');
    link.download = 'Edwin_Bacay_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Resume download started!', 'success');
});

// Project Filter Functionality
function initializeProjectFilter() {
    if (!filterButtons.length || !projectCards.length) return;
    
    function filterProjects(filter) {
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.classList.add('show');
                // Add fade-in animation
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.classList.remove('show');
                card.style.animation = '';
            }
        });
    }
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter projects
            const filter = button.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
    
    // Show all projects initially
    filterProjects('all');
}

// Progress Bar Animation on Scroll
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Animate counters for project stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50; // Faster animation
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 20);
    });
}

// Intersection Observer for animations
function initializeIntersectionObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Add animation classes based on section
                if (section.id === 'skills') {
                    animateProgressBars();
                }
            }
        });
    }, observerOptions);

    // Observe sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe project stats for counter animation
    const projectStats = document.querySelector('.project-stats');
    if (projectStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(projectStats);
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add CSS for fade-in animation
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .project-card {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .project-card.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    
    // Initialize features
    initializeProjectFilter();
    initializeIntersectionObservers();
    initializeSmoothScrolling();
    addCustomStyles();
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = `&copy; ${currentYear} Edwin Christian E. Bacay. All Rights Reserved. | Built with ❤️ using HTML, CSS & JavaScript`;
    }
});

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNav);

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add click outside to close sidebar on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 && 
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) &&
        !overlay.contains(e.target)) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add touch events for better mobile experience
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    // Swipe left to close sidebar
    if (swipeDistance < -swipeThreshold && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Add loading state for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Fallback for already loaded images
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Add scroll progress indicator (optional)
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

// Uncomment to enable scroll progress bar
// addScrollProgress();

// Add after your existing code in main.js

// Fix for mobile viewport height
function fixMobileViewport() {
    // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update on resize
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

// Prevent zoom on input focus in iOS
function preventIOSZoom() {
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Smooth scroll for iOS
function smoothScrollForIOS() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// Fix for iOS 100vh issue in CSS
function addIOSViewportFix() {
    const style = document.createElement('style');
    style.textContent = `
        /* Fix for iOS 100vh issue */
        .section-home {
            min-height: 100vh; /* Fallback */
            min-height: calc(var(--vh, 1vh) * 100);
        }
        
        /* Fix for iOS input zoom */
        input, select, textarea {
            font-size: 16px;
        }
        
        @media screen and (max-width: 768px) {
            /* Disable pull-to-refresh on mobile */
            body {
                overscroll-behavior-y: contain;
            }
            
            /* Better touch targets */
            .btn, .nav-link, .project-link {
                min-height: 44px;
                min-width: 44px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Handle orientation change
function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        // After orientation change, reset the viewport
        setTimeout(fixMobileViewport, 100);
        // Reset scroll position
        window.scrollTo(0, 0);
    });
}

// Initialize all mobile fixes
function initializeMobileFixes() {
    fixMobileViewport();
    preventIOSZoom();
    smoothScrollForIOS();
    addIOSViewportFix();
    handleOrientationChange();
}

// Update your DOMContentLoaded event listener
window.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    
    // Initialize features
    initializeProjectFilter();
    initializeIntersectionObservers();
    initializeSmoothScrolling();
    addCustomStyles();
    initializeMobileFixes(); // Add this line
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = `&copy; ${currentYear} Edwin Christian E. Bacay. All Rights Reserved. | Built with ❤️ using HTML, CSS & JavaScript`;
    }
});