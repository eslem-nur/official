/* ============================================
   ESLEM NUR | İLİM VE KOD - GLOBAL JAVASCRIPT (v2.1)
   LocalStorage Safe + Init Sırası Düzeltildi
   ============================================ */

// --- GÜVENLİ LOCALSPACE YARDIMCI ---
function safeGet(key) {
    try { 
        return localStorage.getItem(key); 
    } catch(e) { 
        console.warn('LocalStorage kullanılamadı:', e); 
        return null; 
    }
}

function safeSet(key, value) {
    try { 
        localStorage.setItem(key, value); 
    } catch(e) { 
        console.warn('LocalStorage yazılamadı:', e); 
    }
}

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

// --- ARAYÜZ METİNLERİ ---
const uiMessages = {
    tr: {
        backToTopLabel: 'Yukarı çık',
        cvOpening: '📄 CV açılıyor...',
        formSubmitting: 'Gönderiliyor...',
        formSuccess: '✅ Mesajınız başarıyla gönderildi! Teşekkür ederim.',
        formError: '❌ Bir hata oluştu. Lütfen tekrar deneyin.'
    },
    en: {
        backToTopLabel: 'Back to top',
        cvOpening: '📄 Opening CV...',
        formSubmitting: 'Sending...',
        formSuccess: '✅ Your message was sent successfully! Thank you.',
        formError: '❌ Something went wrong. Please try again.'
    },
    de: {
        backToTopLabel: 'Nach oben',
        cvOpening: '📄 Lebenslauf wird geöffnet...',
        formSubmitting: 'Wird gesendet...',
        formSuccess: '✅ Ihre Nachricht wurde erfolgreich gesendet! Vielen Dank.',
        formError: '❌ Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
    },
    fr: {
        backToTopLabel: 'Retour en haut',
        cvOpening: '📄 Ouverture du CV...',
        formSubmitting: 'Envoi en cours...',
        formSuccess: '✅ Votre message a bien été envoyé ! Merci.',
        formError: '❌ Une erreur est survenue. Veuillez réessayer.'
    },
    ar: {
        backToTopLabel: 'العودة إلى الأعلى',
        cvOpening: '📄 جارٍ فتح السيرة الذاتية...',
        formSubmitting: 'جارٍ الإرسال...',
        formSuccess: '✅ تم إرسال رسالتك بنجاح! شكرًا لك.',
        formError: '❌ حدث خطأ. يرجى المحاولة مرة أخرى.'
    }
};

function getUiMessages() {
    const lang = getCurrentLanguage();
    return uiMessages[lang] || uiMessages.tr;
}

// --- MEVCUT DİLİ TESPİT ET ---
function getCurrentLanguage() {
    const htmlLang = document.documentElement.getAttribute('lang');
    
    if (htmlLang === 'tr') return 'tr';
    if (htmlLang === 'en') return 'en';
    if (htmlLang === 'de') return 'de';
    if (htmlLang === 'fr') return 'fr';
    if (htmlLang === 'ar') return 'ar';
    
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/en.html') || path.endsWith('en.html')) return 'en';
    if (path.includes('/de.html') || path.endsWith('de.html')) return 'de';
    if (path.includes('/fr.html') || path.endsWith('fr.html')) return 'fr';
    if (path.includes('/ar.html') || path.endsWith('ar.html')) return 'ar';
    
    return 'tr';
}

// --- TOAST NOTIFICATION ---
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: ${type === 'success' ? '#388E3C' : type === 'error' ? '#D32F2F' : 'var(--primary-color)'};
        color: #fff;
        padding: 16px 24px;
        border-radius: 25px;
        font-size: 0.95rem;
        font-weight: 600;
        box-shadow: var(--shadow-lg);
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 90%;
    `;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// --- BACK TO TOP BUTONU ---
let backToTopInitialized = false;

function initBackToTop() {
    if (backToTopInitialized) return;
    
    const ui = getUiMessages();
    
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', ui.backToTopLabel);
    backToTopBtn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    
    backToTopInitialized = true;
}

// --- SCROLL PROGRESS BAR ---
let progressBarInitialized = false;

function initProgressBar() {
    if (progressBarInitialized) return;
    
    const progressBar = document.createElement('div');
    progressBar.id = 'progressBar';
    progressBar.style.cssText = 'width: 0%; height: 3px; background: var(--primary-color); position: fixed; top: 0; left: 0; z-index: 9999; transition: width 0.1s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
    document.body.insertBefore(progressBar, document.body.firstChild);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    progressBarInitialized = true;
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
        safeSet('userRating_' + lang, value);
    }
    
    function loadRating() {
        const saved = safeGet('userRating_' + lang);
        if (saved) {
            const value = parseInt(saved);
            if (!isNaN(value)) {
                activateStars(value);
            }
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
    
    const savedTheme = safeGet('theme') || 'light';
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

// --- EMAIL KOPYALAMA ---
function copyEmail() {
    const email = 'eslemnur-official@proton.me';
    const feedback = document.getElementById('copyFeedback');
    
    if (!feedback) return;
    
    navigator.clipboard.writeText(email).then(() => {
        feedback.style.opacity = '1';
        
        const lang = document.documentElement.lang || 'tr';
        
        const feedbackMessages = {
            en: 'Copied!',
            de: 'Kopiert!',
            fr: 'Copié!',
            ar: 'نُسِخَ!'
        };
        
        feedback.textContent = feedbackMessages[lang] || 'Kopyalandı!';
        
        setTimeout(() => {
            feedback.style.opacity = '0';
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
        const tempInput = document.createElement('textarea');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        feedback.style.opacity = '1';
        setTimeout(() => {
            feedback.style.opacity = '0';
        }, 2000);
    });
}

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

// --- SEKMELER ---
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
        safeSet('lastProjectTab', tabName);
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
        safeSet('lastShopTab', tabName);
    }
}

// --- DİL MENÜSÜ TOGGLE ---
function toggleLangMenu() {
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown) {
        langDropdown.classList.toggle('active');
    }
}

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
            safeSet('theme', newTheme);
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

// --- CONTACT FORM SUBMIT ---
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const ui = getUiMessages();
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = ui.formSubmitting;
        
        try {
            await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });
            
            showToast(ui.formSuccess, 'success');
            contactForm.reset();
        } catch (error) {
            showToast(ui.formError, 'error');
            console.error('Form error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// --- DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
    const savedProjectTab = safeGet('lastProjectTab');
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

    // Skill tabs
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
    const savedShopTab = safeGet('lastShopTab');
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
    initBackToTop();
    initProgressBar();
    initContactForm();
    
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

// --- CV Download Notification ---
document.addEventListener('DOMContentLoaded', () => {
    const cvBtn = document.querySelector('.btn-cv');
    
    if (cvBtn) {
        cvBtn.addEventListener('click', (e) => {
            showToast(getUiMessages().cvOpening, 'info');
        });
    }
});