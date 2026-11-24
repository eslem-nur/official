/* =========================================================
   Ayat-i Kelim — Ortak Uygulama Mantığı
   ========================================================= */

// Dil bazlı metinler: sayfa tanımlamadıysa İngilizce varsayılan
const APP_TEXT = window.APP_TEXT || {
    randomStoryName: "Random Stories",
    randomStoryText: "You are learning mixed words from all stories.",
    confirmReset: "Are you sure you want to reset progress?",
    resetDone: "Progress reset."
};

// Durum değişkenleri
let currentStoryKey = 'eyyub';
let currentWordIndex = 0;
let currentWords = [];
let isRandomMode = false;
let learnedWords = new Set();

/* ---------- Rastgele mod hazırlığı ---------- */
function initRandomMode() {
    const allWords = [];
    let idCounter = 1;
    ['eyyub', 'musas', 'yusuf'].forEach(key => {
        stories[key].words.forEach(word => {
            allWords.push({ ...word, id: idCounter++ });
        });
    });

    for (let i = allWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }
    stories.random.words = allWords;
}

/* ---------- Başlangıç ---------- */
function initApp() {
    initRandomMode();
    loadTheme();
    loadProgress();
    updateYear();
}

/* ---------- İlerleme Yükleme ---------- */
function loadProgress() {
    let lastStory = localStorage.getItem('kelimLastStory');
    if (lastStory && !stories[lastStory]) lastStory = null;
    selectStory(lastStory || 'eyyub');
}

function loadLearnedForStory(storyKey) {
    try {
        const saved = JSON.parse(localStorage.getItem('kelimProgress_' + storyKey) || '{}');
        learnedWords = new Set(saved.learned || []);
        if (!isRandomMode && typeof saved.index === 'number' && saved.index < currentWords.length) {
            currentWordIndex = saved.index;
        }
        renderWord();
        updateProgress();
    } catch (e) {}
}

/* ---------- İlerleme Kaydetme ---------- */
function saveProgress() {
    const key = 'kelimProgress_' + currentStoryKey;
    localStorage.setItem(key, JSON.stringify({
        index: currentWordIndex,
        learned: [...learnedWords]
    }));
}

/* ---------- Tema Yönetimi ---------- */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    const btn = document.querySelector('#themeToggle');
    if (!icon || !btn) return;
    if (theme === 'light') {
        icon.className = 'fas fa-moon';
        btn.setAttribute('aria-label', 'Switch to Dark Theme');
    } else {
        icon.className = 'fas fa-sun';
        btn.setAttribute('aria-label', 'Switch to Light Theme');
    }
}

document.getElementById('themeToggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

/* ---------- Menü Yönetimi ---------- */
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

/* ---------- Hikaye Seçimi ---------- */
window.selectStory = function(storyKey) {
    currentStoryKey = storyKey;
    isRandomMode = (storyKey === 'random');

    if (isRandomMode) {
        currentWords = stories.random.words;
        document.getElementById('currentStoryName').textContent = APP_TEXT.randomStoryName;
        document.getElementById('storyProgressText').textContent = APP_TEXT.randomStoryText;
    } else {
        currentWords = stories[storyKey].words;
        const storyName = stories[storyKey].name.split('(')[0].trim();
        document.getElementById('currentStoryName').textContent = storyName;
        document.getElementById('storyProgressText').textContent = stories[storyKey].description;
    }

    currentWordIndex = 0;

    // Buton aktiflik durumu
    document.querySelectorAll('.story-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.story === storyKey);
    });

    // Son hikâyeyi hatırla + bu hikâyenin ilerlemesini yükle
    localStorage.setItem('kelimLastStory', storyKey);
    loadLearnedForStory(storyKey);
};

/* ---------- İlerleme Çubuğu ---------- */
function updateProgress() {
    if (currentWords.length === 0) return;

    const progress = (learnedWords.size / currentWords.length) * 100;
    const progressFill = document.getElementById('progressFill');
    const learnedCount = document.getElementById('learnedCount');
    const totalWords = document.getElementById('totalWords');

    progressFill.style.width = `${progress}%`;
    learnedCount.textContent = learnedWords.size;
    totalWords.textContent = currentWords.length;
}

/* ---------- Kelimeyi Ekrana Bas ---------- */
function renderWord() {
    if (currentWords.length === 0) return;

    const wordData = currentWords[currentWordIndex];
    const wordCard = document.getElementById('wordCard');

    // Highlight mantığı
    const contextParts = wordData.contextArabic.split(' ');
    let highlightedContext = '';
    contextParts.forEach((part, index) => {
        if (index === wordData.highlightIndex) {
            highlightedContext += `<span class="highlight-word">${part}</span> `;
        } else {
            highlightedContext += `${part} `;
        }
    });

    wordCard.innerHTML = `
        <div class="arabic-word">${wordData.word}</div>
        <div class="pronunciation">${wordData.pronunciation}</div>
        <div class="meaning">${wordData.meaning}</div>

        <div class="root-badge">${APP_TEXT.rootLabel}: ${wordData.root}</div>

        <div class="context-card">
            <span class="context-label">${APP_TEXT.contextLabel}</span>
            <div class="context-arabic">${highlightedContext.trim()}</div>
            <div class="context-translation">${wordData.contextTranslation}</div>
        </div>
    `;
}

/* ---------- Navigasyon ---------- */
window.previousWord = function() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        renderWord();
        updateProgress();
        saveProgress();
    }
};

window.nextWord = function() {
    if (currentWordIndex < currentWords.length - 1) {
        currentWordIndex++;
        learnedWords.add(currentWords[currentWordIndex].id);
        renderWord();
        updateProgress();
        saveProgress();
    }
};

/* ---------- Ses Çalma (simülasyon) ---------- */
window.playAudio = function() {
    const btn = document.querySelector('.audio-btn');
    if (!btn || btn.classList.contains('playing')) return;

    btn.classList.add('playing');
    console.log(`[AUDIO] "${currentWords[currentWordIndex].pronunciation}" ...`);

    setTimeout(() => {
        btn.classList.remove('playing');
    }, 1500);
};

/* ---------- Sıfırlama ---------- */
window.resetProgress = function() {
    if (confirm(APP_TEXT.confirmReset)) {
        localStorage.removeItem('kelimProgress_' + currentStoryKey);
        learnedWords.clear();
        currentWordIndex = 0;
        renderWord();
        updateProgress();
        alert(APP_TEXT.resetDone);
    }
};
/* ---------- Rastgele Atlama ---------- */
window.jumpRandom = function() {
    if (currentWords.length === 0) return;
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * currentWords.length);
    } while (newIndex === currentWordIndex && currentWords.length > 1);

    currentWordIndex = newIndex;
    renderWord();
    updateProgress();
    saveProgress();
};

/* ---------- Yıl ---------- */
function updateYear() {
    const year = new Date().getFullYear();
    document.getElementById('current-year').textContent = year;
}

/* ---------- Klavye Kısayolları ---------- */
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') nextWord();
    if (e.key === 'ArrowLeft') previousWord();
    if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        jumpRandom();
    }
});

/* ---------- Uygulamayı Başlat ---------- */
document.addEventListener('DOMContentLoaded', initApp);
