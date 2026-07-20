
/**
 * Learning English - Main JavaScript
 * Handles navigation, interactions, and dynamic content
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('show')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (navbar) {
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ============================================
    // ANIMATED COUNTERS (Stats Section)
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = current.toLocaleString();
            }
        }, 16);
    }

    // Use IntersectionObserver for counters
    if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => counterObserver.observe(stat));
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.feature-card, .testimonial-card, .module-card, .mission-card, ' +
            '.team-card, .gallery-item, .contact-info-card, .faq-item'
        );

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.animationDelay = `${index * 0.05}s`;
                observer.observe(el);
            });
        }
    }

    setupScrollAnimations();

    // ============================================
    // COURSE LEVEL TABS
    // ============================================
    const levelTabs = document.querySelectorAll('.level-tab');
    const levelContents = document.querySelectorAll('.level-content');

    levelTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetLevel = tab.getAttribute('data-level');

            // Update tabs
            levelTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update content
            levelContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetLevel) {
                    content.classList.add('active');
                }
            });

            // Re-trigger animations for new content
            const newCards = document.querySelector(`#${targetLevel}`).querySelectorAll('.module-card');
            newCards.forEach((card, i) => {
                card.style.opacity = '0';
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.5s ease ${i * 0.05}s forwards`;
                }, 10);
            });
        });
    });

    // ============================================
    // GALLERY FILTER
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    contactForm.style.display = 'none';
                    formSuccess.classList.add('show');
                }, 1500);
            }
        });

        // Reset border on input
        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherQuestion = otherItem.querySelector('.faq-question');
                otherQuestion.setAttribute('aria-expanded', 'false');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // ADD CSS KEYFRAME ANIMATIONS DYNAMICALLY
    // ============================================
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(styleSheet);
});
