/* ============================================
   ESLEM NUR | İLİM VE KOD - GLOBAL JAVASCRIPT (v2.3 - FULL DİL DESTEKLİ)
   Web3Forms Entegrasyonu + Yıldız Değerlendirme + Çoklu Dil
   ============================================ */

// ============================================
// 1. GÜVENLİ LOCALSTORAGE YARDIMCILARI
// ============================================

function safeGet(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.warn('❌ LocalStorage okunamadı:', e);
        return null;
    }
}

function safeSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn('❌ LocalStorage yazılamadı:', e);
    }
}

// ============================================
// 2. DİL MESAJLARI - YILDIZ DEĞERLENDİRME
// ============================================

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
        0: 'لم يتم التقييم بعد',
        1: 'سيء جداً 😞',
        2: 'سيء',
        3: 'متوسط ✿',
        4: 'جيد',
        5: 'ممتاز! ⭐'
    }
};

// ============================================
// 3. ARAYÜZ METİNLERİ
// ============================================

const uiMessages = {
    tr: {
        backToTopLabel: 'Yukarı çık',
        cvOpening: '📄 CV açılıyor...',
        formSubmitting: 'Gönderiliyor...',
        formSuccess: 'Mesajınız başarıyla gönderildi! Teşekkür ederim.',
        formError: 'Bir hata oluştu. Lütfen tekrar deneyin.'
    },
    en: {
        backToTopLabel: 'Back to top',
        cvOpening: '📄 Opening CV...',
        formSubmitting: 'Sending...',
        formSuccess: 'Your message was sent successfully! Thank you.',
        formError: 'Something went wrong. Please try again.'
    },
    de: {
        backToTopLabel: 'Nach oben',
        cvOpening: '📄 Lebenslauf wird geöffnet...',
        formSubmitting: 'Wird gesendet...',
        formSuccess: 'Ihre Nachricht wurde erfolgreich gesendet! Vielen Dank.',
        formError: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
    },
    fr: {
        backToTopLabel: 'Retour en haut',
        cvOpening: '📄 Ouverture du CV...',
        formSubmitting: 'Envoi en cours...',
        formSuccess: 'Votre message a bien été envoyé ! Merci.',
        formError: 'Une erreur est survenue. Veuillez réessayer.'
    },
    ar: {
        backToTopLabel: 'العودة إلى الأعلى',
        cvOpening: '📄 جارٍ فتح السيرة الذاتية...',
        formSubmitting: 'جارٍ الإرسال...',
        formSuccess: 'تم إرسال رسالتك بنجاح! شكرًا لك.',
        formError: 'حدث خطأ. يرجى المحاولة مرة أخرى.'
    }
};

// ============================================
// 4. FORM ÇEVİRİLERİ - İLETİŞİM FORMU
// ============================================

const formTranslations = {
    contactForm: {
        tr: {
            title: 'İletişim',
            description: 'Bir sorunuz mu var? Aşağıdaki formlardan size uygun olanı seçebilirsiniz.',
            nameLabel: 'Adınız *',
            namePlaceholder: 'Adınız Soyadınız',
            emailLabel: 'E-posta *',
            emailPlaceholder: 'ornek@email.com',
            subjectLabel: 'Konu *',
            subjectPlaceholder: 'Mesajınızın konusu',
            messageLabel: 'Mesajınız *',
            messagePlaceholder: 'Mesajınızı buraya yazın...',
            ratingTitle: 'Web Sitemi Değerlendir',
            sendButton: 'Gönder'
        },
        en: {
            title: 'Contact',
            description: 'Have a question? You can choose the suitable form below.',
            nameLabel: 'Your Name *',
            namePlaceholder: 'First and Last Name',
            emailLabel: 'Email *',
            emailPlaceholder: 'example@email.com',
            subjectLabel: 'Subject *',
            subjectPlaceholder: 'Message subject',
            messageLabel: 'Your Message *',
            messagePlaceholder: 'Write your message here...',
            ratingTitle: 'Rate My Website',
            sendButton: 'Send'
        },
        de: {
            title: 'Kontakt',
            description: 'Haben Sie eine Frage? Wählen Sie das passende Formular aus.',
            nameLabel: 'Ihr Name *',
            namePlaceholder: 'Vor- und Nachname',
            emailLabel: 'E-Mail *',
            emailPlaceholder: 'beispiel@email.com',
            subjectLabel: 'Betreff *',
            subjectPlaceholder: 'Nachrichtenthema',
            messageLabel: 'Ihre Nachricht *',
            messagePlaceholder: 'Schreiben Sie Ihre Nachricht hier...',
            ratingTitle: 'Bewerten Sie meine Website',
            sendButton: 'Senden'
        },
        fr: {
            title: 'Contact',
            description: 'Vous avez une question ? Choisissez le formulaire approprié ci-dessous.',
            nameLabel: 'Votre nom *',
            namePlaceholder: 'Prénom et nom',
            emailLabel: 'E-mail *',
            emailPlaceholder: 'exemple@email.com',
            subjectLabel: 'Sujet *',
            subjectPlaceholder: 'Objet du message',
            messageLabel: 'Votre message *',
            messagePlaceholder: 'Écrivez votre message ici...',
            ratingTitle: 'Notez mon site web',
            sendButton: 'Envoyer'
        },
        ar: {
            title: 'تواصل',
            description: 'هل لديك سؤال؟ يمكنك اختيار النموذج المناسب أدناه.',
            nameLabel: 'اسمك *',
            namePlaceholder: 'الاسم الكامل',
            emailLabel: 'البريد الإلكتروني *',
            emailPlaceholder: 'example@email.com',
            subjectLabel: 'الموضوع *',
            subjectPlaceholder: 'موضوع الرسالة',
            messageLabel: 'رسالتك *',
            messagePlaceholder: 'اكتب رسالتك هنا...',
            ratingTitle: 'قيّم موقعي الإلكتروني',
            sendButton: 'إرسال'
        }
    },
    
    // ============================================
    // 5. FORM ÇEVİRİLERİ - ANKET FORMU
    // ============================================
    
    surveyForm: {
        tr: {
            title: 'Görüş & Öneri Formu',
            description: 'Siteyi geliştirmeme yardımcı olmak için birkaç dakikanızı ayırır mısınız?',
            nameLabel: 'Adınız',
            namePlaceholder: 'Adınız Soyadınız',
            emailLabel: 'E-posta',
            emailPlaceholder: 'ornek@email.com',
            ageLabel: 'Yaşınız (isteğe bağlı)',
            agePlaceholder: 'Yaş',
            roleLabel: 'Sizi en iyi tanımlayan nedir?',
            roleSelect: 'Seçiniz',
            roleIlimTalebesi: 'İlim Talebesi',
            roleOgrenci: 'Öğrenci',
            roleCalisan: 'Tam Zamanlı Çalışan',
            roleVeli: 'Veli',
            roleDiger: 'Diğer',
            recommendLegend: 'Siteyi bir yakınınıza tavsiye eder misiniz?',
            recommendKesinlikle: 'Kesinlikle',
            recommendBelki: 'Belki',
            recommendEminDegilim: 'Emin değilim',
            improveLegend: 'Neyi geliştirmemi istersiniz? (Birden fazla seçebilirsiniz)',
            improveNotlar: 'Dijital Notlar',
            improveUygulamalar: 'Web Uygulamaları',
            improveShop: 'Shop Ürünleri',
            improveTasarim: 'Tasarım ve Okunabilirlik',
            improveIcerik: 'Yeni İçerik',
            commentsLabel: 'Yorum ve önerileriniz',
            commentsPlaceholder: 'Düşüncelerinizi buraya yazabilirsiniz...',
            sendButton: 'Gönder'
        },
        en: {
            title: 'Feedback & Suggestions Form',
            description: 'Would you spare a few minutes to help me improve the site?',
            nameLabel: 'Your Name',
            namePlaceholder: 'First and Last Name',
            emailLabel: 'Email',
            emailPlaceholder: 'example@email.com',
            ageLabel: 'Age (optional)',
            agePlaceholder: 'Age',
            roleLabel: 'What best describes you?',
            roleSelect: 'Select',
            roleIlimTalebesi: 'Student of Knowledge',
            roleOgrenci: 'Student',
            roleCalisan: 'Full-time Worker',
            roleVeli: 'Parent',
            roleDiger: 'Other',
            recommendLegend: 'Would you recommend this site to someone?',
            recommendKesinlikle: 'Definitely',
            recommendBelki: 'Maybe',
            recommendEminDegilim: 'Not Sure',
            improveLegend: 'What would you like me to improve? (Multiple selection allowed)',
            improveNotlar: 'Digital Notes',
            improveUygulamalar: 'Web Applications',
            improveShop: 'Shop Products',
            improveTasarim: 'Design and Readability',
            improveIcerik: 'New Content',
            commentsLabel: 'Your comments and suggestions',
            commentsPlaceholder: 'You can write your thoughts here...',
            sendButton: 'Submit'
        },
        de: {
            title: 'Feedback & Vorschläge',
            description: 'Würden Sie ein paar Minuten opfern, um mir zu helfen, die Seite zu verbessern?',
            nameLabel: 'Ihr Name',
            namePlaceholder: 'Vor- und Nachname',
            emailLabel: 'E-Mail',
            emailPlaceholder: 'beispiel@email.com',
            ageLabel: 'Alter (freiwillig)',
            agePlaceholder: 'Alter',
            roleLabel: 'Was beschreibt Sie am besten?',
            roleSelect: 'Auswählen',
            roleIlimTalebesi: 'Ilm Schüler/in',
            roleOgrenci: 'Schüler/in oder Student/in', 
            roleCalisan: 'Vollzeitbeschäftigter',
            roleVeli: 'Elternteil',
            roleDiger: 'Andere',
            recommendLegend: 'Würden Sie diese Seite jemandem empfehlen?',
            recommendKesinlikle: 'Auf jeden Fall',
            recommendBelki: 'Vielleicht',
            recommendEminDegilim: 'Nicht sicher',
            improveLegend: 'Was möchten Sie, dass ich verbessere? (Mehrere Auswahl möglich)',
            improveNotlar: 'Digitale Notizen',
            improveUygulamalar: 'Web-Anwendungen',
            improveShop: 'Shop-Produkte',
            improveTasarim: 'Design und Lesbarkeit',
            improveIcerik: 'Neue Inhalte',
            commentsLabel: 'Ihre Kommentare und Vorschläge',
            commentsPlaceholder: 'Sie können hier Ihre Gedanken schreiben...',
            sendButton: 'Absenden'
        },
        fr: {
            title: 'Formulaire de commentaires et suggestions',
            description: 'Pourriez-vous consacrer quelques minutes à m\'aider à améliorer le site ?',
            nameLabel: 'Votre nom',
            namePlaceholder: 'Prénom et nom',
            emailLabel: 'E-mail',
            emailPlaceholder: 'exemple@email.com',
            ageLabel: 'Âge (facultatif)',
            agePlaceholder: 'Âge',
            roleLabel: 'Quelle description vous correspond le mieux ?',
            roleSelect: 'Sélectionner',
            roleIlimTalebesi: 'Étudiant en sciences islamiques',
            roleOgrenci: 'Étudiant',
            roleCalisan: 'Employé à temps plein',
            roleVeli: 'Parent',
            roleDiger: 'Autre',
            recommendLegend: 'Recommanderiez-vous ce site à quelqu\'un ?',
            recommendKesinlikle: 'Définitivement',
            recommendBelki: 'Peut-être',
            recommendEminDegilim: 'Pas sûr',
            improveLegend: 'Que voudriez-vous que j\'améliore ? (Choix multiples autorisés)',
            improveNotlar: 'Notes numériques',
            improveUygulamalar: 'Applications web',
            improveShop: 'Produits de la boutique',
            improveTasarim: 'Design et lisibilité',
            improveIcerik: 'Nouveau contenu',
            commentsLabel: 'Vos commentaires et suggestions',
            commentsPlaceholder: 'Vous pouvez écrire vos pensées ici...',
            sendButton: 'Soumettre'
        },
        ar: {
            title: 'استطلاع الآراء والاقتراحات',
            description: 'هل تود تخصيص بضع دقائق لمساعدتي في تحسين الموقع؟',
            nameLabel: 'اسمك',
            namePlaceholder: 'الاسم الكامل',
            emailLabel: 'البريد الإلكتروني',
            emailPlaceholder: 'example@email.com',
            ageLabel: 'العمر (اختياري)',
            agePlaceholder: 'العمر',
            roleLabel: 'ما الذي يصفك بشكل أفضل؟',
            roleSelect: 'اختر',
            roleIlimTalebesi: 'طالب علم',
            roleOgrenci: 'طالب',
            roleCalisan: 'عامل بدوام كامل',
            roleVeli: 'ولي أمر',
            roleDiger: 'آخر',
            recommendLegend: 'هل تنصح بهذا الموقع لشخص ما؟',
            recommendKesinlikle: 'بكل تأكيد',
            recommendBelki: 'ربما',
            recommendEminDegilim: 'غير متأكد',
            improveLegend: 'ماذا تود أن أتحسن؟ (يمكن اختيار أكثر من واحد)',
            improveNotlar: 'الملاحظات الرقمية',
            improveUygulamalar: 'التطبيقات الويب',
            improveShop: 'منتجات المتجر',
            improveTasarim: 'التصميم والقابلية للقراءة',
            improveIcerik: 'محتوى جديد',
            commentsLabel: 'تعليقاتك واقتراحاتك',
            commentsPlaceholder: 'يمكنك كتابة أفكارك هنا...',
            sendButton: 'إرسال'
        }
    },
    
    // ============================================
    // 6. TAB BUTON ETİKETLERİ - İLETİŞİM
    // ============================================
    
    tabLabels: {
        tr: {
            iletisim: 'İletişim Formu',
            oneri: 'Görüş & Öneri'
        },
        en: {
            iletisim: 'Contact Form',
            oneri: 'Feedback & Suggestions'
        },
        de: {
            iletisim: 'Kontakformular',
            oneri: 'Feedback & Vorschläge'
        },
        fr: {
            iletisim: 'Formulaire de Contact',
            oneri: 'Commentaires et Suggestions'
        },
        ar: {
            iletisim: 'نموذج التواصل',
            oneri: 'الآراء والاقتراحات'
        }
    }
};

// ============================================
// 7. UI MESAJLARINI ALICI
// ============================================

function getUiMessages() {
    const lang = getCurrentLanguage();
    return uiMessages[lang] || uiMessages.tr;
}

// ============================================
// 8. DİLİ TESPİT ET
// ============================================

function getCurrentLanguage() {
    const htmlLang = document.documentElement.getAttribute('lang');
    
    // HTML lang attribute'u kontrol et
    if (htmlLang === 'tr') return 'tr';
    if (htmlLang === 'en') return 'en';
    if (htmlLang === 'de') return 'de';
    if (htmlLang === 'fr') return 'fr';
    if (htmlLang === 'ar') return 'ar';
    
    // URL pathname kontrol et
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/en.html') || path.endsWith('en.html')) return 'en';
    if (path.includes('/de.html') || path.endsWith('de.html')) return 'de';
    if (path.includes('/fr.html') || path.endsWith('fr.html')) return 'fr';
    if (path.includes('/ar.html') || path.endsWith('ar.html')) return 'ar';
    
    // Varsayılan Türkçe
    return 'tr';
}

// ============================================
// 9. TOAST NOTİFİKASYON
// ============================================

function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    
    let bgColor = '#A06872'; // default
    if (type === 'success') bgColor = '#388E3C';
    if (type === 'error') bgColor = '#D32F2F';
    
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: ${bgColor};
        color: #fff;
        padding: 16px 24px;
        border-radius: 25px;
        font-size: 0.95rem;
        font-weight: 600;
        box-shadow: 0 8px 25px rgba(0,0,0,0.25);
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 90%;
        text-align: center;
    `;
    
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
    });
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================
// 10. BACK TO TOP BUTONU
// ============================================

let backToTopInitialized = false;

function initBackToTop() {
    if (backToTopInitialized) return;
    
    const ui = getUiMessages();
    
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', ui.backToTopLabel);
    backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    
    backToTopInitialized = true;
}

// ============================================
// 11. SCROLL PROGRESS BAR
// ============================================

let progressBarInitialized = false;

function initProgressBar() {
    if (progressBarInitialized) return;
    
    const progressBar = document.createElement('div');
    progressBar.id = 'progressBar';
    progressBar.style.cssText = 'width: 0%; height: 3px; background: #A06872; position: fixed; top: 0; left: 0; z-index: 9999; transition: width 0.1s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
    document.body.insertBefore(progressBar, document.body.firstChild);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    progressBarInitialized = true;
}

// ============================================
// 12. STAR RATING BAŞLAT
// ============================================

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
        stars.forEach((star) => {
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
        
        star.addEventListener('mouseleave', function() {
            const selected = parseInt(ratingValue.value);
            if (!isNaN(selected)) {
                highlightStars(selected);
            }
        });
        
        // Klavye erişilebilirliği
        star.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const value = parseInt(this.getAttribute('data-value'));
                if (!isNaN(value)) {
                    activateStars(value);
                }
            }
        });
    });
    
    loadRating();
    ratingInitialized = true;
}

// ============================================
// 13. TEMA YÖNETİMİ
// ============================================

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

// ============================================
// 14. MOBİL MENÜ
// ============================================

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
// 15. EMAIL KOPYALAMA
// ============================================

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
        console.error('❌ Kopyalama hatası:', err);
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

// ============================================
// 16. TAB YÖNETİMİ - YETENEKLER
// ============================================

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

// ============================================
// 17. TAB YÖNETİMİ - PROJELER
// ============================================

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

// ============================================
// 18. TAB YÖNETİMİ - SHOP
// ============================================

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

// ============================================
// 19. TAB YÖNETİMİ - İLETİŞİM
// ============================================

function switchContactTab(tabName) {
    const buttons = document.querySelectorAll('#contact-form-section .contact-tab-btn');
    const groups = document.querySelectorAll('#contact-form-section .contact-form-group');
    
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
        targetGroup.style.display = 'block';
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
        safeSet('lastContactTab', tabName);
    }
}

// ============================================
// 20. DİL MENÜSÜ TOGGLE
// ============================================

function toggleLangMenu() {
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown) {
        langDropdown.classList.toggle('active');
    }
}

// Dil değiştirildiğinde form çevirilerini güncelle
function triggerFormTranslationUpdate() {
    setTimeout(() => {
        updateFormTranslations();
    }, 200);
}

// Dil dropdown dışına tıklanınca kapat
document.addEventListener('click', function(e) {
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// ============================================
// 21. YIL OTOMATİK GÜNCELLEME
// ============================================

function updateYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

// ============================================
// 22. SCROLL REVEAL ANIMATION
// ============================================

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

// ============================================
// 23. NAVBAR SCROLL EFFECT
// ============================================

let navbarScrolled = false;

function handleNavbarScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
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

// ============================================
// 24. İLETİŞİM FORMU SUBMIT (WEB3FORMS)
// ============================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const ui = getUiMessages();
    const feedbackDiv = document.getElementById('formFeedback');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = ui.formSubmitting;
        
        // Honeypot spam kontrolü
        const botCheck = contactForm.querySelector('input[name="botcheck"]');
        if (botCheck && botCheck.checked) {
            console.warn('⚠️ Bot tespit edildi!');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }
        
        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                if (feedbackDiv) {
                    feedbackDiv.className = 'form-feedback success';
                    feedbackDiv.style.display = 'block';
                    feedbackDiv.textContent = '✅ ' + ui.formSuccess;
                }
                
                showToast(ui.formSuccess, 'success');
                contactForm.reset();
                
                // Yıldızları sıfırla
                const ratingValue = document.getElementById('ratingValue');
                const ratingText = document.getElementById('ratingText');
                const stars = document.querySelectorAll('.star');
                
                if (ratingValue) ratingValue.value = '0';
                stars.forEach(s => s.classList.remove('active'));
                
                if (ratingText) {
                    const lang = getCurrentLanguage();
                    const messages = ratingMessages[lang] || ratingMessages.tr;
                    ratingText.textContent = messages[0];
                }
                
                setTimeout(() => {
                    if (feedbackDiv) feedbackDiv.style.display = 'none';
                }, 8000);
            } else {
                throw new Error(result.message || 'Gönderim başarısız');
            }
            
        } catch (error) {
            console.error('❌ Form hatası:', error);
            
            if (feedbackDiv) {
                feedbackDiv.className = 'form-feedback error';
                feedbackDiv.style.display = 'block';
                feedbackDiv.textContent = '❌ ' + ui.formError;
            }
            
            showToast(ui.formError, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ============================================
// 25. ANKET FORMU SUBMIT (WEB3FORMS)
// ============================================

function initSurveyForm() {
    const surveyForm = document.getElementById('surveyForm');
    
    if (!surveyForm) return;
    
    const ui = getUiMessages();
    const feedbackDiv = document.getElementById('surveyFeedback');
    
    surveyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = surveyForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = ui.formSubmitting;
        
        // Honeypot spam kontrolü
        const botCheck = surveyForm.querySelector('input[name="botcheck"]');
        if (botCheck && botCheck.checked) {
            console.warn('⚠️ Bot tespit edildi!');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }
        
        try {
            const formData = new FormData(surveyForm);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                if (feedbackDiv) {
                    feedbackDiv.className = 'form-feedback success';
                    feedbackDiv.style.display = 'block';
                    feedbackDiv.textContent = '✅ ' + ui.formSuccess;
                }
                
                showToast(ui.formSuccess, 'success');
                surveyForm.reset();
                
                setTimeout(() => {
                    if (feedbackDiv) feedbackDiv.style.display = 'none';
                }, 8000);
            } else {
                throw new Error(result.message || 'Gönderim başarısız');
            }
            
        } catch (error) {
            console.error('❌ Form hatası:', error);
            
            if (feedbackDiv) {
                feedbackDiv.className = 'form-feedback error';
                feedbackDiv.style.display = 'block';
                feedbackDiv.textContent = '❌ ' + ui.formError;
            }
            
            showToast(ui.formError, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ============================================
// 26. FORM TRANSLATION UPDATER (KRITİK!)
// ============================================

function updateFormTranslations() {
    const lang = getCurrentLanguage();
    
    console.log('🔤 Form çevirisi - Tespit edilen dil:', lang);
    
    const contactTrans = formTranslations.contactForm[lang] || formTranslations.contactForm.tr;
    const surveyTrans = formTranslations.surveyForm[lang] || formTranslations.surveyForm.tr;
    const tabTrans = formTranslations.tabLabels[lang] || formTranslations.tabLabels.tr;
    
    // ===== İLETİŞİM FORMU SECTION =====
    const contactSectionTitle = document.querySelector('#contact-form-section .section-title');
    const contactDescription = document.querySelector('#contact-form-section .section-description');
    
    if (contactSectionTitle) contactSectionTitle.textContent = contactTrans.title;
    if (contactDescription) contactDescription.textContent = contactTrans.description;
    
    // ===== İLETİŞİM FORMU LABEL & PLACEHOLDER =====
    const contactNameLabel = document.getElementById('contactName')?.parentElement?.querySelector('label');
    const contactEmailLabel = document.getElementById('contactEmail')?.parentElement?.querySelector('label');
    const contactSubjectLabel = document.getElementById('contactSubject')?.parentElement?.querySelector('label');
    const contactMessageLabel = document.getElementById('contactMessage')?.parentElement?.querySelector('label');
    const ratingTitle = document.querySelector('.feedback-section h3');
    const contactSendBtn = document.querySelector('#group-iletisim button[type="submit"]');
    
    if (contactNameLabel) contactNameLabel.textContent = contactTrans.nameLabel;
    if (contactEmailLabel) contactEmailLabel.textContent = contactTrans.emailLabel;
    if (contactSubjectLabel) contactSubjectLabel.textContent = contactTrans.subjectLabel;
    if (contactMessageLabel) contactMessageLabel.textContent = contactTrans.messageLabel;
    if (ratingTitle) ratingTitle.textContent = contactTrans.ratingTitle;
    if (contactSendBtn) contactSendBtn.textContent = contactTrans.sendButton;
    
    // Placeholder'lar
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactSubject = document.getElementById('contactSubject');
    const contactMessage = document.getElementById('contactMessage');
    
    if (contactName) contactName.placeholder = contactTrans.namePlaceholder;
    if (contactEmail) contactEmail.placeholder = contactTrans.emailPlaceholder;
    if (contactSubject) contactSubject.placeholder = contactTrans.subjectPlaceholder;
    if (contactMessage) contactMessage.placeholder = contactTrans.messagePlaceholder;
    
    // ===== YILDIZ DEĞERLENDİRME TEXT =====
    const ratingText = document.getElementById('ratingText');
    const ratingValue = document.getElementById('ratingValue');
    if (ratingText && ratingValue) {
        const value = parseInt(ratingValue.value || '0');
        ratingText.textContent = ratingMessages[lang]?.[value] || ratingMessages.tr[value];
    }
    
    // ===== ANKET FORMU LABEL & PLACEHOLDER =====
    const surveyNameLabel = document.getElementById('surveyName')?.parentElement?.querySelector('label');
    const surveyEmailLabel = document.getElementById('surveyEmail')?.parentElement?.querySelector('label');
    const surveyAgeLabel = document.getElementById('surveyAge')?.parentElement?.querySelector('label');
    const surveyRoleLabel = document.getElementById('surveyRole')?.parentElement?.querySelector('label');
    const surveyCommentsLabel = document.getElementById('surveyComments')?.parentElement?.querySelector('label');
    const surveySendBtn = document.querySelector('#group-oneri button[type="submit"]');
    
    if (surveyNameLabel) surveyNameLabel.textContent = surveyTrans.nameLabel;
    if (surveyEmailLabel) surveyEmailLabel.textContent = surveyTrans.emailLabel;
    if (surveyAgeLabel) surveyAgeLabel.textContent = surveyTrans.ageLabel;
    if (surveyRoleLabel) surveyRoleLabel.textContent = surveyTrans.roleLabel;
    if (surveyCommentsLabel) surveyCommentsLabel.textContent = surveyTrans.commentsLabel;
    if (surveySendBtn) surveySendBtn.textContent = surveyTrans.sendButton;
    
    // Anket placeholder'lar
    const surveyName = document.getElementById('surveyName');
    const surveyEmail = document.getElementById('surveyEmail');
    const surveyAge = document.getElementById('surveyAge');
    const surveyComments = document.getElementById('surveyComments');
    
    if (surveyName) surveyName.placeholder = surveyTrans.namePlaceholder;
    if (surveyEmail) surveyEmail.placeholder = surveyTrans.emailPlaceholder;
    if (surveyAge) surveyAge.placeholder = surveyTrans.agePlaceholder;
    if (surveyComments) surveyComments.placeholder = surveyTrans.commentsPlaceholder;
    
    // ===== ANKET SELECT OPTIONS =====
    const roleSelect = document.getElementById('surveyRole');
    if (roleSelect) {
        const options = roleSelect.options;
        if (options[0]) options[0].textContent = surveyTrans.roleSelect;
        if (options[1]) options[1].textContent = surveyTrans.roleIlimTalebesi;
        if (options[2]) options[2].textContent = surveyTrans.roleOgrenci;
        if (options[3]) options[3].textContent = surveyTrans.roleCalisan;
        if (options[4]) options[4].textContent = surveyTrans.roleVeli;
        if (options[5]) options[5].textContent = surveyTrans.roleDiger;
    }
    
    // ===== FIELDSET LEGEND =====
    const recommendFieldset = document.querySelector('#group-oneri fieldset:nth-of-type(1)');
    const improveFieldset = document.querySelector('#group-oneri fieldset:nth-of-type(2)');
    
    if (recommendFieldset) {
        const legend = recommendFieldset.querySelector('legend');
        const choices = recommendFieldset.querySelectorAll('.choice span');
        if (legend) legend.textContent = surveyTrans.recommendLegend;
        if (choices[0]) choices[0].textContent = surveyTrans.recommendKesinlikle;
        if (choices[1]) choices[1].textContent = surveyTrans.recommendBelki;
        if (choices[2]) choices[2].textContent = surveyTrans.recommendEminDegilim;
    }
    
    if (improveFieldset) {
        const legend = improveFieldset.querySelector('legend');
        const choices = improveFieldset.querySelectorAll('.choice span');
        if (legend) legend.textContent = surveyTrans.improveLegend;
        if (choices[0]) choices[0].textContent = surveyTrans.improveNotlar;
        if (choices[1]) choices[1].textContent = surveyTrans.improveUygulamalar;
        if (choices[2]) choices[2].textContent = surveyTrans.improveShop;
        if (choices[3]) choices[3].textContent = surveyTrans.improveTasarim;
        if (choices[4]) choices[4].textContent = surveyTrans.improveIcerik;
    }
    
    // ===== TAB BUTON ETİKETLERİ =====
    const tabButtons = document.querySelectorAll('#contact-form-section .contact-tab-btn');
    if (tabButtons[0]) {
        tabButtons[0].innerHTML = `<i class="fas fa-envelope"></i> ${tabTrans.iletisim}`;
    }
    if (tabButtons[1]) {
        tabButtons[1].innerHTML = `<i class="fas fa-comment-dots"></i> ${tabTrans.oneri}`;
    }
    
    console.log('✅ Form çevirileri güncellendi:', lang);
}

// ============================================
// 27. DOM READY - BAŞLATICI
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 İlim ve Kod - Portal initialized');
    
    // ===== PROJE TAB'LARININ KAYDEDİLMİŞ DURUMU =====
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
    
    // ===== YETENEK TAB'LARI =====
    const skillBtns = document.querySelectorAll('#skills .skill-tab-btn');
    const skillGroups = document.querySelectorAll('#skills .skill-group');
    
    if (skillGroups.length > 0) {
        skillGroups.forEach(g => {
            g.classList.add('hidden');
            g.style.display = 'none';
        });
        skillBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        
        const defSkillBtn = Array.from(skillBtns).find(b =>
            b.getAttribute('onclick')?.includes("'yetenekler'")
        );
        const defSkillGrp = document.getElementById('group-yetenekler');
        if (defSkillBtn && defSkillGrp) {
            defSkillBtn.classList.add('active');
            defSkillBtn.setAttribute('aria-selected', 'true');
            defSkillGrp.classList.remove('hidden');
            defSkillGrp.style.display = 'grid';
        }
    }
    
    // ===== SHOP TAB'LARININ KAYDEDİLMİŞ DURUMU =====
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
    
    // ===== İLETİŞİM TAB'LARININ KAYDEDİLMİŞ DURUMU =====
    const savedContactTab = safeGet('lastContactTab');
    const contactBtns = document.querySelectorAll('#contact-form-section .contact-tab-btn');
    const contactGroups = document.querySelectorAll('#contact-form-section .contact-form-group');
    
    if (contactGroups.length > 0) {
        contactGroups.forEach(g => {
            g.classList.add('hidden');
            g.style.display = 'none';
        });
        contactBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        
        if (savedContactTab) {
            const btn = Array.from(contactBtns).find(b =>
                b.getAttribute('onclick')?.includes(`'${savedContactTab}'`)
            );
            const grp = document.getElementById('group-' + savedContactTab);
            if (btn && grp) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                grp.classList.remove('hidden');
                grp.style.display = 'block';
            }
        } else {
            const defBtn = Array.from(contactBtns).find(b =>
                b.getAttribute('onclick')?.includes("'iletisim'")
            );
            const defGrp = document.getElementById('group-iletisim');
            if (defBtn && defGrp) {
                defBtn.classList.add('active');
                defBtn.setAttribute('aria-selected', 'true');
                defGrp.classList.remove('hidden');
                defGrp.style.display = 'block';
            }
        }
    }
    
    // ===== TÜM FONKSİYONLARI BAŞLAT =====
    initTheme();
    initThemeToggle();
    initMobileMenu();
    initStarRating();
    updateYear();
    initScrollReveal();
    initBackToTop();
    initProgressBar();
    initContactForm();
    initSurveyForm();
    
    // 🔥 KRITIK: Form çevirilerini başlat
    updateFormTranslations();
    
    // ===== NAVBAR SCROLL EFFECT =====
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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
    
    console.log('✨ İlim ve Kod - Portal ready!');
});

// ============================================
// 28. WINDOW LOAD
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// 29. ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('❌ Global error:', e.error);
});

// ============================================
// 30. CV DOWNLOAD NOTIFICATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const cvBtn = document.querySelector('.btn-cv');
    
    if (cvBtn) {
        cvBtn.addEventListener('click', () => {
            showToast(getUiMessages().cvOpening, 'info');
        });
    }
});