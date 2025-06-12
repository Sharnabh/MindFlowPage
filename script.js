// Smooth scrolling functions
function scrollToForm() {
    document.getElementById('form').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const submitBtn = document.querySelector('.btn-submit');
    
    // Add animation to form elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    document.querySelectorAll('.section, .feature-card, .audience-card').forEach(el => {
        observer.observe(el);
    });
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';
        
        // For Netlify Forms - encode form data properly
        const formData = new FormData(form);
        
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                "form-name": "feedback",
                ...Object.fromEntries(formData)
            })
        })
        .then(response => {
            if (response.ok) {
                showSuccessMessage();
                form.reset();
                updateProgress(); // Reset progress bar
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
        })
        .finally(() => {
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Feedback';
        });
    });
    
    // Helper function to encode form data for Netlify
    function encode(data) {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }
    
    function showSuccessMessage() {
        // Create success notification
        const successDiv = document.createElement('div');
        successDiv.className = 'success-notification';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h4>Thank you for your feedback!</h4>
                <p>Your insights will help shape MindFlow into something amazing.</p>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(successDiv);
        
        // Animate in
        setTimeout(() => {
            successDiv.classList.add('show');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(successDiv);
            }, 300);
        }, 5000);
    }
    
    function showErrorMessage() {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <h4>Oops! Something went wrong</h4>
                <p>Please try again or email your feedback directly.</p>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(errorDiv);
        
        // Animate in
        setTimeout(() => {
            errorDiv.classList.add('show');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(errorDiv);
            }, 300);
        }, 5000);
    }
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px) scale(1)';
        });
    });
    
    // Add interactive logo animation
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
            this.parentElement.style.animation = 'float 3s ease-in-out infinite';
        }, 10);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    
    function typeWriter(element, text, speed = 50) {
        element.textContent = '';
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
    
    // Start typing effect after page loads
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 30);
    }, 1000);
    
    // Add progress indicator for form
    const formGroups = document.querySelectorAll('.form-group');
    const progressBar = document.createElement('div');
    progressBar.className = 'form-progress';
    progressBar.innerHTML = '<div class="progress-bar"></div>';
    
    form.insertBefore(progressBar, form.firstChild);
    
    function updateProgress() {
        const totalRequiredFields = 5; // currentTool, frequency, frustrations, wishFeature, aiFeatures, payWillingness
        let filledFields = 0;
        
        // Check text areas and required fields
        const currentTool = document.getElementById('currentTool');
        const frustrations = document.getElementById('frustrations');
        const wishFeature = document.getElementById('wishFeature');
        
        if (currentTool && currentTool.value.trim() !== '') filledFields++;
        if (frustrations && frustrations.value.trim() !== '') filledFields++;
        if (wishFeature && wishFeature.value.trim() !== '') filledFields++;
        
        // Check radio button groups
        const frequencyChecked = document.querySelector('input[name="frequency"]:checked');
        const aiChecked = document.querySelector('input[name="aiFeatures"]:checked');
        const payChecked = document.querySelector('input[name="payWillingness"]:checked');
        
        if (frequencyChecked) filledFields++;
        if (aiChecked) filledFields++;
        if (payChecked) filledFields++;
        
        const progress = (filledFields / 6) * 100; // 6 total required fields
        const progressBarFill = document.querySelector('.progress-bar');
        progressBarFill.style.width = `${progress}%`;
    }
    
    // Add event listeners to form inputs for progress tracking
    formGroups.forEach(group => {
        const inputs = group.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', updateProgress);
            input.addEventListener('change', updateProgress);
        });
    });
    
    // Handle AI features conditional explanation
    const aiRadios = document.querySelectorAll('input[name="aiFeatures"]');
    const aiExplanation = document.getElementById('aiExplanation');
    
    aiRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                aiExplanation.style.display = 'block';
                aiExplanation.required = true;
                aiExplanation.placeholder = this.value === 'yes' 
                    ? 'How would you use voice-to-diagram or AI suggestions in your workflow?'
                    : 'What concerns do you have about AI-powered features?';
            }
        });
    });
});
