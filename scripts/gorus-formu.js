  // TEMALAR YÖNETİMİ
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
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
})();

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (!icon) return;
    
    if (theme === 'light') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// Sayfa yenilendiğinde icon güncelle
document.addEventListener('DOMContentLoaded', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    updateThemeIcon(theme);
}); 
    
    // --- FORM GÖNDERİMİ (WEB3FORMS) ---
const surveyForm = document.getElementById('survey-form');

if (surveyForm) {
    surveyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const feedback  = document.getElementById('formFeedback');
        const submitBtn = document.getElementById('submit');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Gönderiliyor...';

        try {
            const formData = new FormData(surveyForm);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
                // NOT: Content-Type elle ayarlanmaz, tarayıcı multipart boundary'yi kendi ekler
            });

            const result = await response.json();

            if (result.success) {
                feedback.className = 'form-feedback success';
                feedback.style.display = 'block';
                feedback.textContent = '✅ Mesajınız alındı! Teşekkür ederim.';
                surveyForm.reset();
            } else {
                throw new Error(result.message || 'Gönderim başarısız');
            }

        } catch (error) {
            console.error('Form hatası:', error);
            feedback.className = 'form-feedback error';
            feedback.style.display = 'block';
            feedback.textContent = '❌ Mesaj gönderilemedi. Lütfen tekrar deneyin.';

        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            setTimeout(() => {
                feedback.style.display = 'none';
            }, 6000);
        }
    });
}
