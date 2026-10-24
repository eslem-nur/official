
    /* ============================================
   KÜTÜPHANE ENVANTERİ — Etkileşim
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     1. COPYRIGHT YILI
     ------------------------------------------ */

  function initCopyrightYear() {
    const el = document.getElementById('copyright-year');
    if (el) {
      el.textContent = new Date().getFullYear();
    }
  }

  /* ------------------------------------------
     2. SATIRA TIKLAYINCA VURGULAMA
     ------------------------------------------ */

  function initRowHighlight() {
    const rows = document.querySelectorAll('tbody tr');
    if (!rows.length) return;

    rows.forEach(function (row) {
      row.setAttribute('tabindex', '0');

      row.addEventListener('click', function () {
        rows.forEach(function (r) {
          r.classList.remove('is-selected');
        });
        row.classList.add('is-selected');
      });

      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          row.click();
        }
      });
    });
  }

  /* ------------------------------------------
     3. BAŞLAT
     ------------------------------------------ */

  function init() {
    initCopyrightYear();
    initRowHighlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
