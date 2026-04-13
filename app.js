/* ================================
   MAILMOOD — app.js
   VERSION CORRIGÉE
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== THEME TOGGLE ==========
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleM = document.getElementById('themeToggleM');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    function toggleTheme() {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        if (themeToggleM) {
            themeToggleM.textContent = next === 'dark' ? '☀️ Light' : '🌙 Dark';
        }
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleM) {
        themeToggleM.textContent = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
        themeToggleM.addEventListener('click', toggleTheme);
    }

    // ========== LANGUAGE TOGGLE ==========
    const langToggle = document.getElementById('langToggle');
    const langToggleM = document.getElementById('langToggleM');
    const savedLang = localStorage.getItem('lang') || 'fr';
    html.setAttribute('data-lang', savedLang);

    function applyLang(lang) {
        document.querySelectorAll('[data-fr]').forEach(el => {
            const value = el.getAttribute(`data-${lang}`) || el.getAttribute('data-fr');
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = value;
            } else if (value.includes('<')) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        });
        if (langToggle) langToggle.textContent = lang === 'fr' ? 'EN' : 'FR';
        if (langToggleM) langToggleM.textContent = lang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR';
    }

    function toggleLang() {
        const current = html.getAttribute('data-lang');
        const next = current === 'fr' ? 'en' : 'fr';
        html.setAttribute('data-lang', next);
        localStorage.setItem('lang', next);
        applyLang(next);
    }

    applyLang(savedLang);
    if (langToggle) langToggle.addEventListener('click', toggleLang);
    if (langToggleM) langToggleM.addEventListener('click', toggleLang);

    // ========== BURGER MENU ==========
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');

    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ========== NAVBAR SCROLL ==========
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });

    // ========== REVEAL ON SCROLL ==========
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));

    // ========== DEMO INTERACTIVE ==========
    const emailItems = document.querySelectorAll('.email-item');
    const detailPanel = document.querySelector('.demo-detail');
    const detailCards = document.querySelectorAll('.detail-card');
    const backBtn = document.querySelector('.back-btn');

    function isMobile() {
        return window.innerWidth < 768;
    }

    function selectEmail(id) {
        // Highlight email dans la liste
        emailItems.forEach(item => item.classList.remove('active'));
        const activeItem = document.querySelector(`.email-item[data-id="${id}"]`);
        if (activeItem) activeItem.classList.add('active');

        // Afficher le bon detail card
        detailCards.forEach(card => {
            card.classList.remove('active');
            card.style.display = 'none';
        });
        const activeCard = document.querySelector(`.detail-card[data-id="${id}"]`);
        if (activeCard) {
            activeCard.style.display = 'block';
            setTimeout(() => activeCard.classList.add('active'), 10);
        }

        // Sur mobile, afficher le panneau détail
        if (isMobile() && detailPanel) {
            detailPanel.classList.add('mobile-open');
        }

        // Effet typing sur le résumé IA
        if (activeCard) {
            const typingEl = activeCard.querySelector('.ai-summary');
            if (typingEl) {
                const fullText = typingEl.getAttribute('data-full') || typingEl.textContent;
                if (!typingEl.getAttribute('data-full')) {
                    typingEl.setAttribute('data-full', typingEl.textContent);
                }
                typingEl.textContent = '';
                let i = 0;
                function typeChar() {
                    if (i < fullText.length) {
                        typingEl.textContent += fullText[i];
                        i++;
                        setTimeout(typeChar, 12);
                    }
                }
                typeChar();
            }
        }
    }

    // Click sur chaque email
    emailItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            selectEmail(id);
        });
    });

    // Bouton retour mobile
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (detailPanel) detailPanel.classList.remove('mobile-open');
        });
    }

    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Fermer tous les autres
                faqItems.forEach(other => other.classList.remove('open'));

                // Toggle celui-ci
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        }
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== COUNTER ANIMATION (Pricing) ==========
    function animateCounters() {
        document.querySelectorAll('[data-count]').forEach(el => {
            const target = parseInt(el.dataset.count);
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;

            function update() {
                current += step;
                if (current < target) {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            }
            update();
        });
    }

    const pricingSection = document.querySelector('.pricing');
    if (pricingSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        counterObserver.observe(pricingSection);
    }

    // ========== AUTO SELECT FIRST EMAIL ON DESKTOP ==========
    if (!isMobile() && emailItems.length > 0) {
        setTimeout(() => selectEmail('1'), 600);
    }

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            const linkM = document.querySelector(`.mobile-nav a[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                } 
            }
            if (linkM) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.mobile-nav a').forEach(a => a.classList.remove('active'));
                    linkM.classList.add('active');
                }
            }
        });
    }, { passive: true });

    // ========== TILT EFFECT ON CARDS (desktop) ==========
    if (window.matchMedia('(min-width: 1024px)').matches) {
        document.querySelectorAll('.card, .plan, .testimonial').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ========== KEYBOARD: ESC CLOSE MOBILE NAV ==========
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
            burger.classList.remove('active');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ========== PAGE LOADED CLASS ==========
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

});
