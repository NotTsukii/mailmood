
document.addEventListener('DOMContentLoaded', () => {

    // ========== MOBILE MENU ==========
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========== LANGUAGE TOGGLE ==========
    const currentLang = { value: 'fr' };

    function setLang(lang) {
        currentLang.value = lang;

        // Update all lang buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update all translatable elements
        document.querySelectorAll('[data-fr][data-en]').forEach(el => {
            el.textContent = el.dataset[lang];
        });

        // Store preference
        localStorage.setItem('mailmood-lang', lang);
    }

    // Init lang from localStorage
    const savedLang = localStorage.getItem('mailmood-lang') || 'fr';
    setLang(savedLang);

    // Bind lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            if (current > 100) {
                navbar.style.borderBottomColor = 'var(--border-light)';
            } else {
                navbar.style.borderBottomColor = 'var(--border)';
            }
            lastScroll = current;
        }, { passive: true });
    }

    // ========== SCROLL REVEAL ==========
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Close all
                faqItems.forEach(i => i.classList.remove('open'));

                // Open clicked if it was closed
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        }
    });

    // ========== PRICING TOGGLE (monthly/yearly) ==========
    const toggleSwitch = document.querySelector('.toggle-switch');
    const monthlyLabel = document.querySelector('.toggle-monthly');
    const yearlyLabel = document.querySelector('.toggle-yearly');

    if (toggleSwitch) {
        toggleSwitch.addEventListener('click', () => {
            toggleSwitch.classList.toggle('active');
            const isYearly = toggleSwitch.classList.contains('active');

            if (monthlyLabel) monthlyLabel.classList.toggle('active', !isYearly);
            if (yearlyLabel) yearlyLabel.classList.toggle('active', isYearly);

            // Update prices
            document.querySelectorAll('[data-monthly][data-yearly]').forEach(el => {
                el.textContent = isYearly ? el.dataset.yearly : el.dataset.monthly;
            });
        });
    }

    // ========== DEMO PAGE — EMAIL SELECTION ==========
    const emailRows = document.querySelectorAll('.demo-email-row');
    const detailSections = document.querySelectorAll('.demo-detail-view');
    const detailEmpty = document.querySelector('.demo-detail-empty');

    if (emailRows.length > 0) {
        emailRows.forEach(row => {
            row.addEventListener('click', () => {
                const emailId = row.dataset.email;

                // Active state on rows
                emailRows.forEach(r => r.classList.remove('active'));
                row.classList.add('active');

                // Show correct detail
                if (detailSections.length > 0) {
                    detailSections.forEach(d => d.style.display = 'none');
                    const target = document.querySelector(`.demo-detail-view[data-email="${emailId}"]`);
                    if (target) {
                        target.style.display = 'block';
                        if (detailEmpty) detailEmpty.style.display = 'none';
                    }
                }
            });
        });

        // Auto-select first email
        if (emailRows[0]) {
            emailRows[0].click();
        }
    }

    // ========== DEMO SIDEBAR NAVIGATION ==========
    const sidebarItems = document.querySelectorAll('.demo-sidebar-item');

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // ========== COUNTER ANIMATION (stats) ==========
    const statValues = document.querySelectorAll('.stat-value[data-count]');

    if (statValues.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    const suffix = el.dataset.suffix || '';
                    const prefix = el.dataset.prefix || '';
                    const duration = 1500;
                    const start = performance.now();

                    function animate(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.round(eased * target);
                        el.textContent = prefix + current.toLocaleString('fr-FR') + suffix;
                        if (progress < 1) requestAnimationFrame(animate);
                    }

                    requestAnimationFrame(animate);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statValues.forEach(el => counterObserver.observe(el));
    }

    // ========== SCORE RING ANIMATION (bento) ==========
    const scoreCircle = document.querySelector('.score-circle-fill');

    if (scoreCircle) {
        const scoreObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseFloat(scoreCircle.dataset.score) || 78;
                    const circumference = 2 * Math.PI * 42;
                    const offset = circumference - (target / 100) * circumference;
                    scoreCircle.style.strokeDasharray = circumference;
                    scoreCircle.style.strokeDashoffset = circumference;

                    requestAnimationFrame(() => {
                        scoreCircle.style.transition = 'stroke-dashoffset 1.2s ease-out';
                        scoreCircle.style.strokeDashoffset = offset;
                    });

                    scoreObserver.unobserve(scoreCircle);
                }
            });
        }, { threshold: 0.5 });

        scoreObserver.observe(scoreCircle);
    }

    // ========== TYPING EFFECT (AI reply in demo) ==========
    function typeText(element, text, speed = 20) {
        return new Promise(resolve => {
            element.textContent = '';
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    // Apply typing effect to AI replies when they become visible
    const aiReplies = document.querySelectorAll('.demo-ai-reply[data-typed]');

    if (aiReplies.length > 0) {
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.dataset.typed;
                    if (text) {
                        typeText(el, text, 15);
                    }
                    typingObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        aiReplies.forEach(el => typingObserver.observe(el));
    }

    // ========== BENTO HOVER TILT EFFECT ==========
    const bentoCards = document.querySelectorAll('.bento-card');

    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.4s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // ========== KEYBOARD NAVIGATION ==========
    document.addEventListener('keydown', (e) => {
        // Escape closes mobile menu
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            mobileBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Arrow keys for demo email navigation
        if (emailRows.length > 0) {
            const activeRow = document.querySelector('.demo-email-row.active');
            if (!activeRow) return;

            let nextRow;
            if (e.key === 'ArrowDown') {
                nextRow = activeRow.nextElementSibling;
            } else if (e.key === 'ArrowUp') {
                nextRow = activeRow.previousElementSibling;
            }

            if (nextRow && nextRow.classList.contains('demo-email-row')) {
                e.preventDefault();
                nextRow.click();
                nextRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });

});
