/**
 * ALAMURI RUSHIL MURARI - PORTFOLIO INTERACTIVITY SCRIPT
 * Handles theme toggle, scrollspy navigation,
 * project category filtering, mobile menu drawer, and contact handling.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DYNAMIC YEAR ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- 2. THEME SWITCHER (Dark / Light) ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('rm_portfolio_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('rm_portfolio_theme', newTheme);
        });
    }

    // --- 3. MOBILE MENU TOGGLE ---
    const menuToggleBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggleBtn && navMenu) {
        menuToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggleBtn.classList.toggle('active');
        });

        // Close mobile menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggleBtn.classList.remove('active');
            });
        });
    }

    // --- 4. SCROLLSPY / ACTIVE NAV INDICATOR ---
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset + 120;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- 5. BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 6. CONTACT FORM HANDLER ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill out all required fields.';
                return;
            }

            // Create mailto link as direct fallback
            const mailtoUri = `mailto:2300030023cseh2@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

            // Visual feedback
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Preparing Email...';
            }

            setTimeout(() => {
                window.location.href = mailtoUri;
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your email client has been opened to send the message.';
                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
                }
            }, 600);
        });
    }
});
