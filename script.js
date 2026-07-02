document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger the reveal of items inside the section
                const items = entry.target.querySelectorAll(
                    ".experience-item, .education-item, .project-item, .skill-item"
                );
                items.forEach((el, i) => {
                    el.style.transitionDelay = `${Math.min(i, 12) * 0.06}s`;
                });
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => {
        observer.observe(section);
    });
});

class ImageSlider {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return; // no slider markup on the page — skip
        this.slides = this.container.querySelectorAll('.slide');
        this.dots = this.container.querySelectorAll('.nav-dot');
        this.currentSlide = 0;
        this.autoplayInterval = null;

        // Initialize controls
        this.container.querySelector('.prev-btn').addEventListener('click', () => this.showSlide(this.currentSlide - 1));
        this.container.querySelector('.next-btn').addEventListener('click', () => this.showSlide(this.currentSlide + 1));
        
        // Initialize dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });

        // Start autoplay
        // this.startAutoplay();

        // Pause autoplay on hover
        // this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        // this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }

    showSlide(n) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    // startAutoplay() {
    //     this.autoplayInterval = setInterval(() => this.showSlide(this.currentSlide + 1), 5000);
    // }

    // stopAutoplay() {
    //     if (this.autoplayInterval) {
    //         clearInterval(this.autoplayInterval);
    //         this.autoplayInterval = null;
    //     }
    // }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', function() {
    new ImageSlider('project1-slider');
    new ImageSlider('project2-slider');
    new ImageSlider('project3-slider');
});

// Lightbox: click any slider image to enlarge it
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox__close" aria-label="Close">&times;</button>
        <img alt="Enlarged preview">
    `;
    document.body.appendChild(lightbox);
    const lightboxImg = lightbox.querySelector('img');

    const open = (src, alt) => {
        lightboxImg.src = src;
        lightboxImg.alt = alt || 'Enlarged preview';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    };
    const close = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.slide img').forEach(img => {
        img.addEventListener('click', () => open(img.src, img.alt));
    });

    // Close on backdrop click, close button, or Escape
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) close();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
});