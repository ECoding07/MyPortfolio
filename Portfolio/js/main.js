// Initialize EmailJS (You'll need to get your own keys from EmailJS)
emailjs.init("_Wyn3fiECc07gkNGW"); // Replace with your actual public key

// DOM Elements
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const downloadResume = document.getElementById('downloadResume');

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
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
        const response = await emailjs.send(
            'portolio', // Replace with your service ID
            'template_rdc8q4d', // Replace with your template ID
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

// Intersection Observer for animations
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
            
            // You can add more animations for other sections here
        }
    });
}, observerOptions);

// Observe sections
sections.forEach(section => {
    observer.observe(section);
});

// Smooth scrolling for anchor links
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

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    
    // Set current year in footer
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
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