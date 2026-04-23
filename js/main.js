document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcons(currentTheme);

    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });

    function updateThemeIcons(theme) {
        if(theme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }

    // --- Language Toggle ---
    const langToggleBtn = document.getElementById('lang-toggle');
    
    // Check local storage or set default EN
    const currentLang = localStorage.getItem('lang') || 'en';
    
    // The user requested that the first time it opens in English, 
    // BUT the ES translation uses the ES text from JS. So we manually apply that.
    langToggleBtn.checked = (currentLang === 'es');
    applyTranslations(currentLang);

    langToggleBtn.addEventListener('change', (e) => {
        const selectedLang = e.target.checked ? 'es' : 'en';
        localStorage.setItem('lang', selectedLang);
        applyTranslations(selectedLang);
    });

    function applyTranslations(lang) {
        const transTable = window.translations[lang];
        if(!transTable) return;

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(transTable[key]) {
                el.textContent = transTable[key];
            }
        });
    }

    // --- Mobile Menu ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if(window.scrollY > 50) {
            nav.style.padding = '0.5rem 0';
            nav.style.boxShadow = 'var(--shadow-sm)';
        } else {
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = 'none';
        }
    });

    // --- Basic Privacy / Anti-Inspect Measures ---
    document.addEventListener('contextmenu', (e) => e.preventDefault()); // Block right-click
    document.addEventListener('keydown', (e) => {
        // Block F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
        }
        // Block Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Inspect)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
            e.preventDefault();
        }
        // Block Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
        }
    });
});
