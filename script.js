// ===== ANIME PORTFOLIO JAVASCRIPT ===== 
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    console.log('🌸 Anime Portfolio Loading... アニメポートフォリオ読み込み中... 🌸');
    
    // ===== KAWAII THEME TOGGLE =====
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('anime-theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }
    
    // Theme toggle with kawaii effects
    themeToggle.addEventListener('click', function() {
        const isDark = body.classList.contains('dark-theme');
        
        if (isDark) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('anime-theme', 'light');
            showKawaiiNotification('☀️ Light mode activated! ライトモード！');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('anime-theme', 'dark');
            showKawaiiNotification('🌙 Dark mode activated! ダークモード！');
        }
        
        // Kawaii animation
        themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 500);
    });
    
    // ===== KAWAII SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add kawaii entrance effect
                entry.target.style.animation = 'kawaiiBounce 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.hero-section, .social-section, .quick-links, .anime-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // ===== KAWAII CARD INTERACTIONS =====
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            const icon = this.querySelector('.link-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(15deg)';
                icon.style.animation = 'kawaiiBounce 0.5s ease';
            }
            
            const arrow = this.querySelector('.link-arrow');
            if (arrow) {
                arrow.style.transform = 'translate(8px, -8px) rotate(20deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            const icon = this.querySelector('.link-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.animation = '';
            }
            
            const arrow = this.querySelector('.link-arrow');
            if (arrow) {
                arrow.style.transform = '';
            }
        });
        
        // Add click animation
        card.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showKawaiiNotification('✨ Coming soon! もうすぐ来ます！ ✨');
            }
        });
    });
    
    // ===== SOCIAL CARD INTERACTIONS =====
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.social-icon');
            if (icon) {
                icon.style.animation = 'kawaiiBounce 0.5s ease';
            }
        });
        
        card.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const platform = this.querySelector('h3').textContent;
                showKawaiiNotification(`💖 ${platform} link coming soon! リンクはもうすぐ！`);
            }
        });
    });
    
    // ===== ANIME CARD INTERACTIONS =====
    const animeCards = document.querySelectorAll('.anime-card');
    animeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ===== ANIMATED STATS COUNTER =====
    function animateKawaiiStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach((stat, index) => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            const suffix = finalValue.replace(/\d/g, '');
            let currentValue = 0;
            const increment = numericValue / 60;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(counter);
                    // Add kawaii sparkle effect
                    stat.style.animation = 'kawaiiBounce 0.5s ease';
                } else {
                    stat.textContent = Math.floor(currentValue) + suffix;
                }
            }, 25);
        });
    }
    
    // Trigger stats animation when visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateKawaiiStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // ===== KAWAII PARALLAX EFFECT =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    const bgGradient = document.querySelector('.bg-gradient');
    const bgPattern = document.querySelector('.bg-pattern');
    
    const handleScroll = debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (bgGradient) {
            bgGradient.style.transform = `translateY(${rate}px)`;
        }
        if (bgPattern) {
            bgPattern.style.transform = `translateY(${rate * 0.5}px)`;
        }
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
    
    // ===== KAWAII LOADING ANIMATION =====
    const allCards = document.querySelectorAll('.profile-card, .bio-card, .link-card, .social-card, .anime-card');
    
    allCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.9)';
        card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 200 + (index * 100));
    });
    
    // ===== KAWAII NOTIFICATION SYSTEM =====
    function showKawaiiNotification(message) {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.2rem;">🌸</span>
                <span>${message}</span>
                <span style="font-size: 1.2rem;">🌸</span>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, #ffb6c1, #ffc0cb);
            border: 2px solid #ff69b4;
            padding: 1rem 2rem;
            border-radius: 25px;
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 60px rgba(255, 105, 180, 0.3);
            z-index: 10000;
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-size: 0.9rem;
            font-weight: 600;
            color: #2d1b3d;
            text-align: center;
            font-family: 'Noto Sans JP', sans-serif;
        `;
        
        document.body.appendChild(notification);
        
        // Kawaii entrance animation
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Add floating animation
        setTimeout(() => {
            notification.style.animation = 'kawaiiBounce 0.5s ease infinite';
        }, 500);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translate(-50%, -50%) scale(0) rotate(10deg)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }
    
    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Konami code easter egg for anime fans
        if (e.key === 'ArrowUp') {
            konamiSequence.push('up');
            checkKonamiCode();
        } else if (e.key === 'ArrowDown') {
            konamiSequence.push('down');
            checkKonamiCode();
        } else if (e.key === 'ArrowLeft') {
            konamiSequence.push('left');
            checkKonamiCode();
        } else if (e.key === 'ArrowRight') {
            konamiSequence.push('right');
            checkKonamiCode();
        } else {
            konamiSequence = [];
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // ===== KONAMI CODE EASTER EGG =====
    let konamiSequence = [];
    const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
    
    function checkKonamiCode() {
        if (konamiSequence.length > konamiCode.length) {
            konamiSequence = konamiSequence.slice(-konamiCode.length);
        }
        
        if (konamiSequence.length === konamiCode.length) {
            let match = true;
            for (let i = 0; i < konamiCode.length; i++) {
                if (konamiSequence[i] !== konamiCode[i]) {
                    match = false;
                    break;
                }
            }
            
            if (match) {
                triggerAnimeEasterEgg();
                konamiSequence = [];
            }
        }
    }
    
    function triggerAnimeEasterEgg() {
        showKawaiiNotification('🎉 KONAMI CODE ACTIVATED! コナミコード発動！ 🎮');
        
        // Make everything kawaii for 5 seconds
        document.body.style.animation = 'rainbow 0.5s ease infinite';
        
        // Add floating emojis
        const emojis = ['🌸', '✨', '💖', '🌟', '🎀', '🦄', '🌈'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
            }, i * 100);
        }
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
    
    function createFloatingEmoji(emoji) {
        const emojiElement = document.createElement('div');
        emojiElement.textContent = emoji;
        emojiElement.style.cssText = `
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: floatUp 3s ease-out forwards;
        `;
        
        document.body.appendChild(emojiElement);
        
        setTimeout(() => {
            if (document.body.contains(emojiElement)) {
                document.body.removeChild(emojiElement);
            }
        }, 3000);
    }
    
    // ===== ADD CUSTOM ANIMATIONS =====
    const customStyles = document.createElement('style');
    customStyles.textContent = `
        @keyframes kawaiiBounce {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.05); }
            50% { transform: scale(0.95); }
            75% { transform: scale(1.02); }
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid #ff69b4 !important;
            outline-offset: 2px;
            border-radius: 8px;
        }
    `;
    document.head.appendChild(customStyles);
    
    // ===== SMOOTH SCROLLING =====
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
    
    console.log('🎉 Anime Portfolio Ready! アニメポートフォリオ準備完了！ ✨');
    
    // Show welcome message
    setTimeout(() => {
        showKawaiiNotification('🌸 Welcome to my kawaii portfolio! ようこそ！ 🌸');
    }, 1000);
});
