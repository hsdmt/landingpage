// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.benefit-card, .module, .testimonial-card, .price-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
window.addEventListener('load', () => {
    document.querySelectorAll('.benefit-card, .module, .testimonial-card, .price-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Handle CTA button clicks
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        // Here you can add your form submission logic or redirect to payment page
        alert('Redirecionando para a página de pagamento...');
    });
}); 
