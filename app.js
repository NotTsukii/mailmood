/* ================================
   MAILMOOD — app.js
   PARTIE 3/4 — JavaScript complet
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
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute(`data-${lang}`) || el.getAttribute('data-fr');
            } else {
                el.textContent = el.getAttribute(`data-${lang}`) || el.getAttribute('data-fr');
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
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        lastScroll = scrollY;
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
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));

    // ========== DEMO INTERACTIVE ==========
    const emails = document.querySelectorAll('.demo-email');
    const views = document.querySelectorAll('.detail-view');
    const detailEmpty = document.querySelector('.detail-empty');
    const demoSplit = document.querySelector('.demo-split');
    const demoBack = document.querySelector('.demo-back');
    const isMobile = () => window.innerWidth <= 768;

    // Reply data
    const replies = {
        fr: {
            1: "Bonjour Marc,\n\nMerci pour votre message. Je suis disponible demain entre 14h et 17h pour organiser cet appel.\n\nN'hésitez pas à me proposer un créneau qui vous convient.\n\nCordialement,\n[Votre nom]",
            2: "Bonjour Léa,\n\nMerci pour l'envoi du brief. Je vais le consulter dans la journée et vous ferai un retour détaillé d'ici demain matin.\n\nBonne journée,\n[Votre nom]",
            3: "Bonjour Julien,\n\nJe prends note de cette deadline. La V2 sera prête pour vendredi soir au plus tard.\n\nJe vous tiens informé de l'avancement.\n\nCordialement,\n[Votre nom]",
            4: null,
            5: null,
            6: null
        },
        en: {
            1: "Hi Marc,\n\nThank you for your message. I'm available tomorrow between 2pm and 5pm to schedule this call.\n\nFeel free to suggest a time that works for you.\n\nBest regards,\n[Your name]",
            2: "Hi Léa,\n\nThank you for sending the brief. I'll review it today and send you detailed feedback by tomorrow morning.\n\nBest,\n[Your name]",
            3: "Hi Julien,\n\nNoted regarding the deadline. V2 will be ready by Friday evening at the latest.\n\nI'll keep you posted on progress.\n\nBest regards,\n[Your name]",
            4: null,
            5: null,
            6: null
        }
    };

    function selectEmail(id) {
        // Update active state
        emails.forEach(e => e.classList.remove('active'));
        const activeEmail = document.querySelector(`.demo-email[data-id="${id}"]`);
        if (activeEmail) activeEmail.classList.add('active');

        // Show detail
        views.forEach(v => v.classList.remove('active'));
        const activeView = document.querySelector(`.detail-view[data-view="${id}"]`);
        if (activeView) activeView.classList.add('active');
        if (detailEmpty) detailEmpty.style.display = 'none';

        // Mobile: show detail panel
        if (isMobile() && demoSplit) {
            demoSplit.classList.add('detail-open');
        }
    }

    emails.forEach(email => {
        email.addEventListener('click', () => {
            selectEmail(email.dataset.id);
        });
    });

    // Back button (mobile)
    if (demoBack) {
        demoBack.addEventListener('click', () => {
            if (demoSplit) demoSplit.classList.remove('detail-open');
            emails.forEach(e => e.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));
            if (detailEmpty) detailEmpty.style.display = 'flex';
        });
    }

    // Typing effect for replies
    function typeReply(replyEl, text, speed = 18) {
        let i = 0;
        replyEl.textContent = '';
        replyEl.classList.add('typing');
        replyEl.style.display = 'block';

        function type() {
            if (i < text.length) {
                replyEl.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                replyEl.classList.remove('typing');
            }
        }
        type();
    }

    // Reply buttons
    document.querySelectorAll('.mm-btn').forEach(btn => {
        if (btn.disabled) return;
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const lang = html.getAttribute('data-lang') || 'fr';
            const replyText = replies[lang]?.[id];
            const replyEl = document.querySelector(`.mm-reply[data-reply="${id}"]`);

            if (replyText && replyEl && !replyEl.textContent.trim()) {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.textContent = lang === 'fr' ? '⏳ Génération...' : '⏳ Generating...';

                setTimeout(() => {
                    btn.textContent = lang === 'fr' ? '✅ Réponse générée' : '✅ Reply generated';
                    typeReply(replyEl, replyText);
                }, 800);
            }
        });
    });

    // ========== FAQ ACCORDION ==========
    document.querySelectorAll('.faq-q').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

            // Toggle current
            if (!isOpen) item.classList.add('open');
        });
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
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

    // Trigger counters when pricing section visible
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
    if (!isMobile() && emails.length > 0) {
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
