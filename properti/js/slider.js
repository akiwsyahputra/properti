document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider
    const testimonialWrapper = document.getElementById('testimonialWrapper');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    const dots = document.querySelectorAll('#testimonialDots button');
    
    if (!testimonialWrapper || !prevButton || !nextButton) return;
    
    let currentSlide = 0;
    const slideCount = document.querySelectorAll('.testimonial-item').length;
    const slideWidth = 100; // percentage
    let slideInterval;
    
    // Initialize slider
    updateSlider();
    startAutoSlide();
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
        resetAutoSlide();
    });
    
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
        resetAutoSlide();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
            resetAutoSlide();
        });
    });
    
    // Functions
    function updateSlider() {
        // Calculate translation based on viewport
        let translateValue;
        if (window.innerWidth >= 1024) { // lg breakpoint
            translateValue = -currentSlide * (slideWidth / 3);
        } else if (window.innerWidth >= 768) { // md breakpoint
            translateValue = -currentSlide * (slideWidth / 2);
        } else {
            translateValue = -currentSlide * slideWidth;
        }
        
        testimonialWrapper.style.transform = `translateX(${translateValue}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('bg-primary');
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.add('bg-gray-300');
                dot.classList.remove('bg-primary');
            }
        });
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Responsive handling
    window.addEventListener('resize', updateSlider);
    
    // Property Image Gallery
    const propertyImages = document.querySelectorAll('.property-gallery-thumbnail');
    const mainPropertyImage = document.getElementById('main-property-image');
    
    if (propertyImages.length > 0 && mainPropertyImage) {
        propertyImages.forEach(image => {
            image.addEventListener('click', function() {
                // Update main image
                mainPropertyImage.src = this.src;
                
                // Update active state
                propertyImages.forEach(img => img.classList.remove('border-primary'));
                this.classList.add('border-primary');
            });
        });
    }
});