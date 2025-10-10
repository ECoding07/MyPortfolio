// Toggle Sidebar
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.main-content').classList.toggle('shifted');
});

// Close sidebar when clicking on a link (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('active');
            document.querySelector('.main-content').classList.remove('shifted');
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert(`Thank you for your message, ${formData.name}! I will get back to you soon.`);
    this.reset();
});

// Resume download simulation
document.getElementById('downloadResume').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Resume download would start here. In a real implementation, this would download your PDF resume.');
});

// Add hover effects to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 136, 0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });
});

// Resume download functionality
document.getElementById('downloadResume').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Replace with the actual path to your resume file
    const resumeUrl = 'resume/Resume.pdf';
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Edwin_Bacay_Resume.pdf'; // The filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});