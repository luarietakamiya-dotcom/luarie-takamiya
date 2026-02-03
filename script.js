document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Connect only once
            }
        });
    }, observerOptions);

    // Observe all elements with .fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    const body = document.body;

    // Check LocalStorage on load
    const savedLang = localStorage.getItem('site-lang');
    if (savedLang === 'en') {
        body.classList.add('en');
        if (langToggle) langToggle.textContent = 'JP';
    }

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            body.classList.toggle('en');

            if (body.classList.contains('en')) {
                langToggle.textContent = 'JP';
                localStorage.setItem('site-lang', 'en');
            } else {
                langToggle.textContent = 'EN';
                localStorage.setItem('site-lang', 'ja');
            }
        });
    }

    console.log("System initialized. Visuals loaded.");
});
