/* ============================================
   ESLEM NUR | İLİM VE KOD - GLOBAL JAVASCRIPT (v2.0)
   Class-Based Tab System - Optimize & Clean
   ============================================ */

// --- DİL MESAJLARI (STAR RATING) ---
const ratingMessages = {
    tr: {
        0: 'Henüz değerlendirmediniz',
        1: 'Çok kötü 😞',
        2: 'Kötü',
        3: 'Ortalama ✿',
        4: 'İyi',
        5: 'Mükemmel! ⭐'
    },
    en: {
        0: 'You haven\'t rated yet',
        1: 'Very poor 😞',
        2: 'Poor',
        3: 'Average ✿',
        4: 'Good',
        5: 'Excellent! ⭐'
    },
    de: {
        0: 'Noch nicht bewertet',
        1: 'Sehr schlecht 😞',
        2: 'Schlecht',
        3: 'Durchschnittlich ✿',
        4: 'Gut',
        5: 'Ausgezeichnet! ⭐'
    },
    fr: {
        0: 'Vous n\'avez pas encore noté',
        1: 'Très mauvais 😞',
        2: 'Mauvais',
        3: 'Moyen ✿',
        4: 'Bon',
        5: 'Excellente! ⭐'
    },
    ar: {
        0: 'لم يتم تقييم بعد',
        1: 'سيء جداً 😞',
        2: 'سيء',
        3: 'متوسط ✿',
        4: 'جيد',
        5: 'ممتاز! ⭐'
    }
};

// --- MEVCUT DİLİ TESPİT ET ---
function getCurrentLanguage() {
    const htmlLang = document.documentElement.getAttribute('lang');
    
    if (htmlLang === 'tr') return 'tr';
    if (htmlLang === 'en') return 'en';
    if (htmlLang === 'de') return 'de';
    if (htmlLang === 'fr') return 'fr';
    if (htmlLang === 'ar') return 'ar';
    
    // URL'den tahmin et (fallback)
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/en.html') || path.endsWith('en.html')) return 'en';
    if (path.includes('/de.html') || path.endsWith('de.html')) return 'de';
    if (path.includes('/fr.html') || path.endsWith('fr.html')) return 'fr';
    if (path.includes('/ar.html') || path.endsWith('ar.html')) return 'ar';
    
    return 'tr'; // Varsayılan
}

// --- STAR RATING BAŞLAT ---
let ratingInitialized = false;

function initStarRating() {
    if (ratingInitialized) return;
    
    const stars = document.querySelectorAll('.star');
    const ratingValue = document.getElementById('ratingValue');
    const ratingText = document.getElementById('ratingText');
    
    if (stars.length === 0 || !ratingValue || !ratingText) return;
    
    const lang = getCurrentLanguage();
    const messages = ratingMessages[lang] || ratingMessages.tr;
    
    function updateRatingText(value) {
        ratingText.textContent = messages[value] || messages[0];
    }
    
    function highlightStars(value) {
        stars.forEach((star, index) => {
            const starValue = parseInt(star.getAttribute('data-value'));
            if (starValue <= value) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    function activateStars(value) {
        ratingValue.value = value;
        highlightStars(value);
        updateRatingText(value);
        saveRating(value);
    }
    
    function saveRating(value) {
        try {
            localStorage.setItem('userRating_' + lang, value);
        } catch(e) {
            console.warn('LocalStorage kullanılamıyor:', e);
        }
    }
    
    function loadRating() {
        try {
            const saved = localStorage.getItem('userRating_' + lang);
            if (saved) {
                const value = parseInt(saved);
                if (!isNaN(value)) {
                    activateStars(value);
                }
            }
        } catch(e) {
            console.warn('LocalStorage okunamıyor:', e);
        }
    }
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            if (!isNaN(value)) {
                activateStars(value);
            }
        });
        
        star.addEventListener('mouseenter', function() {
            const tempValue = parseInt(this.getAttribute('data-value'));
            if (!isNaN(tempValue)) {
                highlightStars(tempValue);
            }
        });
    });
    
    const starRatingContainer = document.getElementById('starRating');
    if (starRatingContainer) {
        starRatingContainer.addEventListener('mouseleave', function() {
            const selected = parseInt(ratingValue.value);
            if (!isNaN(selected)) {
                highlightStars(selected);
            }
        });
    }
    
    loadRating();
    ratingInitialized = true;
}

// --- TEMA YÖNETİMİ ---
let themeInitialized = false;

function initTheme() {
    if (themeInitialized) return;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    themeInitialized = true;
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    const btn = document.querySelector('#themeToggle');
    const lang = getCurrentLanguage();
    
    const labels = {
        tr: { light: 'Koyu Temaya Geç', dark: 'Aydınlık Temaya Geç' },
        en: { light: 'Switch to Dark Mode', dark: 'Switch to Light Mode' },
        de: { light: 'Zum Dunklen Modus wechseln', dark: 'Zum Hellen Modus wechseln' },
        fr: { light: 'Passer en Mode Sombre', dark: 'Passer en Mode Clair' },
        ar: { light: 'التحول للوضع الداكن', dark: 'التحول للوضع الفاتح' }
    };
    
    if (icon && btn) {
        if (theme === 'light') {
            icon.className = 'fas fa-moon';
            btn.setAttribute('aria-label', labels[lang]?.light || labels.tr.light);
        } else {
            icon.className = 'fas fa-sun';
            btn.setAttribute('aria-label', labels[lang]?.dark || labels.tr.dark);
        }
    }
}

// --- MOBİL MENÜ ---
let menuInitialized = false;

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

function initMobileMenu() {
    if (menuInitialized) return;
    
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    menuInitialized = true;
}

// ============================================
// EMAIL KOPYALAMA FONKSİYONU
// ============================================

function copyEmail() {
    const email = 'eslemnur-official@proton.me';
    const feedback = document.getElementById('copyFeedback');
    
    if (!feedback) return;
    
    // Email'ı clipboard'a kopyala
    navigator.clipboard.writeText(email).then(() => {
        // Feedback göstergesini göster
        feedback.style.opacity = '1';
        feedback.textContent = 'Copied!';
        
        // İngilizce olmayan diller için mesajları ayarla
        const lang = document.documentElement.lang || 'tr';
        
        switch(lang) {
            case 'de':
                feedback.textContent = 'Kopiert!';
                break;
            case 'fr':
                feedback.textContent = 'Copié!';
                break;
            case 'ar':
                feedback.textContent = 'نُسِخَ!';
                break;
            default:
                feedback.textContent = 'Kopyalandı!';
        }
        
        // 2 saniye sonra gizle
        setTimeout(() => {
            feedback.style.opacity = '0';
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
        // Fallback: manuel seçim
        const tempInput = document.createElement('textarea');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Feedback göster
        feedback.style.opacity = '1';
        setTimeout(() => {
            feedback.style.opacity = '0';
        }, 2000);
    });
}

// Enter tuşu ile de kopyalanabilsin
document.addEventListener('DOMContentLoaded', () => {
    const emailWrapper = document.querySelector('.email-copy-wrapper');
    if (emailWrapper) {
        emailWrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyEmail();
            }
        });
    }
});

// --- SEKMELER (Class-Based Management) ---
function switchSkillTab(tabName) {
    const buttons = document.querySelectorAll('#skills .skill-tab-btn');
    const groups = document.querySelectorAll('#skills .skill-group');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    groups.forEach(group => {
        group.classList.add('hidden');
        group.style.display = 'none';
    });

    const targetGroup = document.getElementById('group-' + tabName);
    const targetBtn = Array.from(buttons).find(b => 
        b.getAttribute('onclick')?.includes(`'${tabName}'`)
    );
    
    if (targetGroup && targetBtn) {
        targetGroup.classList.remove('hidden');
        targetGroup.style.display = 'grid';
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
    }
}

function switchProjectTab(tabName) {
    const buttons = document.querySelectorAll('#projects .project-tab-btn');
    const groups = document.querySelectorAll('#projects .project-group');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    groups.forEach(group => {
        group.classList.add('hidden');
        group.style.display = 'none';
    });

    const targetGroup = document.getElementById('group-' + tabName);
    const targetBtn = Array.from(buttons).find(b => 
        b.getAttribute('onclick')?.includes(`'${tabName}'`)
    );
    
    if (targetGroup && targetBtn) {
        targetGroup.classList.remove('hidden');
        targetGroup.style.display = 'grid';
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
        localStorage.setItem('lastProjectTab', tabName);
    }
}

function switchShopTab(tabName) {
    const buttons = document.querySelectorAll('#shop .shop-tab-btn');
    const groups = document.querySelectorAll('#shop .shop-group');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    groups.forEach(group => {
        group.classList.add('hidden');
        group.style.display = 'none';
    });

    const targetGroup = document.getElementById('group-' + tabName);
    const targetBtn = Array.from(buttons).find(b => 
        b.getAttribute('onclick')?.includes(`'${tabName}'`)
    );
    
    if (targetGroup && targetBtn) {
        targetGroup.classList.remove('hidden');
        targetGroup.style.display = 'grid';
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
        localStorage.setItem('lastShopTab', tabName);
    }
}

// --- DİL MENÜSÜ TOGGLE ---
function toggleLangMenu() {
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown) {
        langDropdown.classList.toggle('active');
    }
}

// Menü dışına tıklanınca kapat
document.addEventListener('click', function(e) {
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// --- YIL OTOMATİK GÜNCELLEME ---
function updateYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

// --- TEMA TOGGLE EVENT LISTENER ---
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

// --- SCROLL REVEAL ANIMATION ---
let scrollRevealInitialized = false;

function initScrollReveal() {
    if (scrollRevealInitialized) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.project-card, .shop-card, .skill-card').forEach(card => {
        revealObserver.observe(card);
    });
    
    scrollRevealInitialized = true;
}

// --- NAVBAR SCROLL EFFECT ---
let navbarScrolled = false;

function handleNavbarScroll() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        if (!navbarScrolled) {
            header.classList.add('scrolled');
            navbarScrolled = true;
        }
    } else {
        if (navbarScrolled) {
            header.classList.remove('scrolled');
            navbarScrolled = false;
        }
    }
}

// --- DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
    // Sekmelerin varsayılan durumunu geri yükle
    const savedProjectTab = localStorage.getItem('lastProjectTab');
    const projectBtns = document.querySelectorAll('#projects .project-tab-btn');
    const projectGroups = document.querySelectorAll('#projects .project-group');

    if (projectGroups.length > 0) {
        projectGroups.forEach(g => {
            g.classList.add('hidden');
            g.style.display = 'none';
        });
        projectBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });

        if (savedProjectTab) {
            const btn = Array.from(projectBtns).find(b => 
                b.getAttribute('onclick')?.includes(`'${savedProjectTab}'`)
            );
            const grp = document.getElementById('group-' + savedProjectTab);
            if (btn && grp) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                grp.classList.remove('hidden');
                grp.style.display = 'grid';
            }
        } else {
            const defBtn = Array.from(projectBtns).find(b => 
                b.getAttribute('onclick')?.includes("'pdf'")
            );
            const defGrp = document.getElementById('group-pdf');
            if (defBtn && defGrp) {
                defBtn.classList.add('active');
                defBtn.setAttribute('aria-selected', 'true');
                defGrp.classList.remove('hidden');
                defGrp.style.display = 'grid';
            }
        }
    }

    // Skill tabs - varsayılan dil
    const skillBtns = document.querySelectorAll('#skills .skill-tab-btn');
    const skillGroups = document.querySelectorAll('#skills .skill-group');
    const defaultTabs = {
        tr: 'yetenekler',
        en: 'yetenekler',
        de: 'yetenekler',
        fr: 'competences',
        ar: 'yetenekler'
    };

    const lang = getCurrentLanguage();
    const defTab = defaultTabs[lang] || 'yetenekler';
    const defSkillBtn = Array.from(skillBtns).find(b => 
        b.getAttribute('onclick')?.includes(`'${defTab}'`)
    );
    const defSkillGrp = document.getElementById('group-' + defTab);

    if (skillGroups.length > 0) {
        skillGroups.forEach(g => {
            g.classList.add('hidden');
            g.style.display = 'none';
        });
        skillBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });

        if (defSkillBtn && defSkillGrp) {
            defSkillBtn.classList.add('active');
            defSkillBtn.setAttribute('aria-selected', 'true');
            defSkillGrp.classList.remove('hidden');
            defSkillGrp.style.display = 'grid';
        }
    }

    // Shop tabs
    const savedShopTab = localStorage.getItem('lastShopTab');
    const shopBtns = document.querySelectorAll('#shop .shop-tab-btn');
    const shopGroups = document.querySelectorAll('#shop .shop-group');

    if (shopGroups.length > 0) {
        shopGroups.forEach(g => {
            g.classList.add('hidden');
            g.style.display = 'none';
        });
        shopBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });

        if (savedShopTab) {
            const btn = Array.from(shopBtns).find(b => 
                b.getAttribute('onclick')?.includes(`'${savedShopTab}'`)
            );
            const grp = document.getElementById('group-' + savedShopTab);
            if (btn && grp) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                grp.classList.remove('hidden');
                grp.style.display = 'grid';
            }
        } else {
            const defBtn = Array.from(shopBtns).find(b => 
                b.getAttribute('onclick')?.includes("'PDF'")
            );
            const defGrp = document.getElementById('group-PDF');
            if (defBtn && defGrp) {
                defBtn.classList.add('active');
                defBtn.setAttribute('aria-selected', 'true');
                defGrp.classList.remove('hidden');
                defGrp.style.display = 'grid';
            }
        }
    }

    // Initialize everything
    initTheme();
    initThemeToggle();
    initMobileMenu();
    initStarRating();
    updateYear();
    initScrollReveal();
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('✨ İlim ve Kod - Portal initialized successfully');
});

// --- WINDOW LOAD ---
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// --- ERROR HANDLING ---
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// --- PERFORMANCE MONITORING ---
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    });
}