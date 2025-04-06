// Smooth scroll for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

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
    if (!button.hasAttribute('onclick')) {
        button.addEventListener('click', () => {
            scrollToSection('pricing');
        });
    }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    
    // Clone first cards and append to end for smooth infinite scroll
    const cardsToClone = 3; // Number of cards to show at once
    const clonedCards = Array.from(cards).slice(0, cardsToClone).map(card => card.cloneNode(true));
    clonedCards.forEach(card => track.appendChild(card));

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // Including gap
    const totalCards = cards.length;
    let isTransitioning = false;

    function updateTrackPosition(smooth = true) {
        if (smooth) {
            track.style.transition = 'transform 0.8s ease';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function moveNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateTrackPosition();

        // If we've reached the cloned cards
        if (currentIndex >= totalCards) {
            // Wait for transition to finish, then reset to start without animation
            setTimeout(() => {
                currentIndex = 0;
                updateTrackPosition(false);
                isTransitioning = false;
            }, 800);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 800);
        }
    }

    // Auto rotate every 4 seconds
    let autoRotate = setInterval(moveNext, 4000);

    // Pause rotation on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });

    track.addEventListener('mouseleave', () => {
        autoRotate = setInterval(moveNext, 4000);
    });

    // Handle transition end
    track.addEventListener('transitionend', () => {
        isTransitioning = false;
    });

    // Initialize position
    updateTrackPosition(false);

    // Update card width on window resize
    window.addEventListener('resize', () => {
        const newCardWidth = cards[0].offsetWidth + 32;
        if (newCardWidth !== cardWidth) {
            cardWidth = newCardWidth;
            updateTrackPosition(false);
        }
    });
}); 