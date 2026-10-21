// ============================================
//   NUR MEKTEBI - INTERACTIVITY
// ============================================

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll for Anchor Links
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

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question i').classList.remove('fa-chevron-up');
                otherItem.querySelector('.faq-question i').classList.add('fa-chevron-down');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        
        // Toggle icon
        const icon = item.querySelector('.faq-question i');
        if (item.classList.contains('active')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

/* ============================================
   TEMA DEĞİŞTİRİCİ
   ============================================ */

(function () {
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    var icon = toggle.querySelector('i');

    function sync(theme) {
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        toggle.setAttribute('aria-label',
            theme === 'dark' ? 'Açık moda geç' : 'Koyu moda geç');
    }

    // Sayfa açılışında ikonu doğru ayarla
    sync(document.documentElement.getAttribute('data-theme') || 'light');

    toggle.addEventListener('click', function () {
        var now = document.documentElement.getAttribute('data-theme');
        var next = now === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        sync(next);
    });
})();

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Scroll Reveal Animation — observer tanımlaması 
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

document.querySelectorAll('.feature-card, .step-item, .pricing-card, .testimonial-card, .example-card, .single-payment').forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
});

// Auto-update Year
const yearSpans = document.querySelectorAll('#current-year');
yearSpans.forEach(span => {
    span.textContent = new Date().getFullYear();
});

// Sipariş Formu Gönderimi (Web3Forms)
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    const feedbackDiv = document.getElementById('orderFeedback');

    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = orderForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';

        // Honeypot kontrolü
        const botCheck = orderForm.querySelector('input[name="botcheck"]');
        if (botCheck && botCheck.checked) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            return;
        }

        try {
            const formData = new FormData(orderForm);
            // Checkbox'ları tek satırda birleştir (Web3Forms ayrı satır gönderir)
            const sections = Array.from(orderForm.querySelectorAll('input[name="sections"]:checked'))
                .map(cb => cb.value).join(', ');
            formData.delete('sections');
            formData.append('sections', sections || 'Belirtilmedi');

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                feedbackDiv.className = 'form-feedback success';
                feedbackDiv.style.display = 'block';
                feedbackDiv.textContent = '✅ İsteğiniz alındı! 24 saat içinde size döneceğim.';
                orderForm.reset();
                setTimeout(() => feedbackDiv.style.display = 'none', 8000);
            } else {
                throw new Error(result.message || 'Gönderim başarısız');
            }
        } catch (error) {
            console.error('Form hatası:', error);
            feedbackDiv.className = 'form-feedback error';
            feedbackDiv.style.display = 'block';
            feedbackDiv.textContent = '❌ Bir hata oluştu. Lütfen direkt e-posta ile ulaşın.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}