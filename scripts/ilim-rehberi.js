                    // Otomatik yıl güncelleme
        document.getElementById('copyright-year').textContent = new Date().getFullYear();

        // Copy Code Script
        function copyCode(btn) {
            const codeBlock = btn.closest('.code-example').querySelector('code');
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        }

        // Active Link Highlighting
        const sections = document.querySelectorAll('.main-section');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => {
            observer.observe(section);
        });

        // Smooth Scroll
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Search Functionality
        const searchInput = document.getElementById('search-input');

        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const sections = document.querySelectorAll('.main-section');
                
                sections.forEach(section => {
                    const text = section.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        }

                       // --- GÜNCELLENMİŞ İLERLEME TAKİP SİSTEMİ ---
        const progressItems = document.querySelectorAll('.progress-item');

        function saveProgress(id, status) {
            const normalizedId = id.toLowerCase().trim();
            localStorage.setItem(`progress_${normalizedId}`, status);
        }

        function loadProgress() {
            progressItems.forEach(item => {
                const id = item.getAttribute('data-id');
                if (!id) return;

                const normalizedId = id.toLowerCase().trim();
                const savedStatus = localStorage.getItem(`progress_${normalizedId}`);
                
                if (savedStatus) {
                    item.classList.remove('completed', 'in-progress', 'pending');
                    item.classList.add(savedStatus);
                    
                    const icon = item.querySelector('i');
                    if (icon) {
                        if (savedStatus === 'completed') {
                            icon.className = 'fas fa-check-circle';
                        } else if (savedStatus === 'in-progress') {
                            icon.className = 'fas fa-spinner fa-spin';
                        } else {
                            icon.className = 'far fa-circle';
                        }
                    }
                }
            });
        }

        // Bölüm göründüğünde kaydet (Threshold 0.1'e düşürüldü)
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            
            // Her bölüm için ayrı bir observer oluşturuyoruz
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // Ekrana girerse (en az %10'u görünürse)
                    if (entry.isIntersecting) {
                        console.log(`Bölüm tamamlandı: ${sectionId}`); // Hata ayıklama için
                        saveProgress(sectionId, 'completed');
                        
                        const normalizedId = sectionId.toLowerCase().trim();
                        const item = document.querySelector(`.progress-item[data-id="${normalizedId}"]`);
                        
                        if (item) {
                            item.classList.remove('in-progress', 'pending');
                            item.classList.add('completed');
                            const icon = item.querySelector('i');
                            if (icon) {
                                icon.className = 'fas fa-check-circle';
                            }
                        }
                    }
                });
            }, { 
                threshold: 0.1, // %10 görünürse tetikle (önceki 0.5 çok yüksekti)
                rootMargin: "0px 0px -50px 0px" // Alt kısmı biraz daha erken algılasın
            });
            
            sectionObserver.observe(section);
        });
// Sayfa yüklendiğinde kayıtlı durumu yükle
        loadProgress();
        
     
