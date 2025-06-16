document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
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
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.padding = '15px 0';
        }
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize design slideshow
    initDesignSlideshow();
    
    // Initialize portfolio filtering
    initPortfolioFilter();
    
    // Animate skills on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const percent = bar.parentElement.parentElement.getAttribute('data-percent');
            bar.style.width = percent + '%';
        });
    }
    
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'js/particles.json', function() {
            console.log('Particles.js loaded');
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Special case for skills section
                if (entry.target.id === 'about') {
                    animateSkills();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(section => {
        observer.observe(section);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});

// Design Slideshow Functionality
function initDesignSlideshow() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const dotsContainer = document.querySelector('.dots-container');
    
    if (!slideshowContainer) return;
    
    // Sample design data - replace with your actual designs
    const designs = [
        {
            title: "Brand Identity Design",
            description: "Complete branding package including logo, color palette, and typography for a tech startup.",
            imageUrl: "images/designs/design1.jpg"
        },
         {
            title: "Brand Identity Design",
            description: "Complete branding package including logo, color palette, and typography for a tech startup.",
            imageUrl: "images/designs/design2.jpg"
        },
        {
            title: "Web Design and Development",
            description: "Modern redesign of a corporate website with improved user experience.",
            imageUrl: "images/designs/design5.png"
        },
        {
            title: "Marketing Materials",
            description: "Series of social media graphics and print materials for a marketing campaign.",
            imageUrl: "images/designs/design3.jpg"
        },
        {
            title: "Marketing Materials",
            description: "Series of social media graphics and print materials for a marketing campaign.",
            imageUrl: "images/designs/urban_threads1.jpg"
        },
        {
            title: "Marketing Materials",
            description: "Series of social media graphics and print materials for a marketing campaign.",
            imageUrl: "images/designs/farming1.jpg"
        }
        
        
    ];
    
    // Create slides and dots
    designs.forEach((design, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.dataset.index = index;
        
        slide.innerHTML = `
            <div class="slide-content">
                <div class="slide-image">
                    <img src="${design.imageUrl}" alt="${design.title}" loading="lazy">
                </div>
                <div class="slide-text">
                    <h3 class="slide-title">${design.title}</h3>
                    <p class="slide-description">${design.description}</p>
                    <a href="#" class="btn btn-primary">View Project</a>
                </div>
            </div>
        `;
        
        slideshowContainer.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
    
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Function to show slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        showSlide(currentIndex + 1);
        resetAutoSlide();
    }
    
    // Previous slide function
    function prevSlide() {
        showSlide(currentIndex - 1);
        resetAutoSlide();
    }
    
    // Auto slide function
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            showSlide(parseInt(this.dataset.index));
            resetAutoSlide();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slideshowContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slideshowContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance
        
        if (touchEndX < touchStartX - threshold) {
            // Swipe left - next slide
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right - previous slide
            prevSlide();
        }
    }
    
    // Start auto sliding
    startAutoSlide();
    
    // Pause on hover
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Portfolio Filtering
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}