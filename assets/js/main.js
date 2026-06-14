// --- Math Lerp Function ---
const lerp = (start, end, factor) => start + (end - start) * factor;

document.addEventListener('DOMContentLoaded', () => {

    // --- 9. Persistent Session Memory & 2. Cinematic Preloader ---
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloader-count');
    const hasVisited = localStorage.getItem('meshach_visited');

    if (preloader && counter) {
        if (!hasVisited) {
            let count = 0;
            const interval = setInterval(() => {
                count += Math.floor(Math.random() * 10) + 1;
                if (count >= 100) {
                    count = 100;
                    clearInterval(interval);
                    counter.innerText = '100';
                    setTimeout(() => {
                        preloader.classList.add('done');
                        localStorage.setItem('meshach_visited', 'true');
                        initSplitText(); // trigger animations after load
                    }, 400);
                } else {
                    counter.innerText = count < 10 ? `0${count}` : count;
                }
            }, 30);
        } else {
            // Already visited, skip preloader immediately
            preloader.style.display = 'none';
            initSplitText();
        }
    } else {
        initSplitText();
    }

    // --- 5. Time-Aware Greeting ---
    const greetingEl = document.getElementById('dynamic-greeting');
    if (greetingEl) {
        const hour = new Date().getHours();
        let greeting = "Hey, I'm Meshach.";
        if (hasVisited) {
            greeting = "Welcome back.";
        } else {
            if (hour < 12) greeting = "Good morning.";
            else if (hour < 18) greeting = "Good afternoon.";
            else if (hour < 22) greeting = "Good evening.";
            else greeting = "Late night coding?";
        }
        greetingEl.innerText = greeting;
    }

    // --- 8. Split-Text Reveal Engine ---
    function initSplitText() {
        const splitTargets = document.querySelectorAll('.typewriter, .split-text');
        splitTargets.forEach(target => {
            const text = target.innerText;
            target.innerText = '';
            const words = text.split(' ');
            words.forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.classList.add('split-word');
                const charSpan = document.createElement('span');
                charSpan.classList.add('split-char');
                charSpan.innerText = word + '\u00A0';
                wordSpan.appendChild(charSpan);
                target.appendChild(wordSpan);
            });
            setTimeout(() => target.classList.add('active'), 100);
        });
    }

    // --- Intersection Observer for Standard Reveals ---
    const reveals = document.querySelectorAll('.reveal:not(.typewriter):not(.split-text)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(reveal => observer.observe(reveal));


    // --- 3. Cursor Spring Physics & 6. Global Mouse Glow ---
    const cursor = document.querySelector('.cursor-dot');
    const glow = document.querySelector('.mouse-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX, cursorY = mouseY;
    let glowX = mouseX, glowY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        resetInactivityTimer();
    });

    function renderPhysics() {
        // Lerp Cursor
        if (cursor) {
            cursorX = lerp(cursorX, mouseX, 0.2);
            cursorY = lerp(cursorY, mouseY, 0.2);
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        // Lerp Glow (Slower spring)
        if (glow) {
            glowX = lerp(glowX, mouseX, 0.05);
            glowY = lerp(glowY, mouseY, 0.05);
            glow.style.left = glowX + 'px';
            glow.style.top = glowY + 'px';
        }
        requestAnimationFrame(renderPhysics);
    }
    renderPhysics();

    // Cursor Hover States
    const hoverElements = document.querySelectorAll('a, button, .menu-toggle, .pill-btn, .magnetic');
    hoverElements.forEach(el => {
        if(cursor) {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
            el.addEventListener('mousedown', () => cursor.classList.add('active'));
            el.addEventListener('mouseup', () => cursor.classList.remove('active'));
        }
    });

    // --- 7. Magnetic Physics Upgrade (Spring-based) ---
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(btn => {
        let magX = 0, magY = 0;
        let targetMagX = 0, targetMagY = 0;
        let isHovering = false;

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            targetMagX = (e.clientX - rect.left - rect.width / 2) * 0.4;
            targetMagY = (e.clientY - rect.top - rect.height / 2) * 0.4;
        });

        btn.addEventListener('mouseenter', () => isHovering = true);
        btn.addEventListener('mouseleave', () => {
            isHovering = false;
            targetMagX = 0;
            targetMagY = 0;
        });

        function renderMagnet() {
            magX = lerp(magX, targetMagX, 0.15);
            magY = lerp(magY, targetMagY, 0.15);
            btn.style.transform = `translate(${magX}px, ${magY}px)`;
            requestAnimationFrame(renderMagnet);
        }
        renderMagnet();
    });

    // --- 1. Momentum Smooth Scrolling (Basic Implementation) ---
    // Instead of heavy hijacking, we use CSS scroll-behavior natively or minimal wheel interpolation.
    // For extreme minimalism, native CSS smooth scrolling combined with our visual Lerps is best.
    
    // --- 11. Inactivity Dimmer ---
    let inactivityTimer;
    function resetInactivityTimer() {
        document.body.classList.remove('inactive');
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            if(window.scrollY < 100) return; // Don't dim at the very top
            document.body.classList.add('inactive');
        }, 15000); // 15 seconds
    }
    window.addEventListener('scroll', resetInactivityTimer);

    // --- 12. Dynamic Tab Titles ---
    let originalTitle = document.title;
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            document.title = "Don't leave the site!";
        } else {
            document.title = originalTitle;
        }
    });

    // --- 13. Auto-Calculated Read Time ---
    const readTimeEl = document.getElementById('read-time');
    if (readTimeEl) {
        const text = document.body.innerText;
        const wordCount = text.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / 200); // 200 words per min
        readTimeEl.innerText = `${minutes} min read`;
    }

    // --- 14. Konami Code / Matrix Hack Mode ---
    let konamiCode = ['m', 'a', 't', 'r', 'i', 'x'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.classList.toggle('matrix-mode');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // --- Feature 3: Hover Image Reveal ---
    const projectTitles = document.querySelectorAll('.project-title[data-image]');
    const revealImg = document.createElement('img');
    revealImg.className = 'hover-reveal-img';
    document.body.appendChild(revealImg);

    projectTitles.forEach(title => {
        title.addEventListener('mouseenter', (e) => {
            revealImg.src = title.getAttribute('data-image');
            revealImg.classList.add('active');
        });
        title.addEventListener('mousemove', (e) => {
            revealImg.style.left = e.clientX + 'px';
            revealImg.style.top = e.clientY + 'px';
        });
        title.addEventListener('mouseleave', () => {
            revealImg.classList.remove('active');
        });
    });

    // --- Full-Screen Overlay Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            menuOverlay.classList.toggle('open');
            menuToggle.textContent = menuOverlay.classList.contains('open') ? 'Close' : 'Menu';
        });
    }

    // --- Scroll Progress Tracker ---
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = ((winScroll / height) * 100) + "%";
        });
    }

    // --- Contextual Back & Back-to-Top ---
    const backToTop = document.querySelector('.back-to-top');
    const contextBack = document.querySelector('.context-back');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            if(backToTop) backToTop.classList.add('visible');
            if(contextBack) contextBack.classList.add('visible');
        } else {
            if(backToTop) backToTop.classList.remove('visible');
            if(contextBack) contextBack.classList.remove('visible');
        }
    });

    if(backToTop) backToTop.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    if(contextBack) contextBack.addEventListener('click', (e) => { e.preventDefault(); window.history.back(); });

    // --- Smooth Page Transitions ---
    const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="mailto:"]):not([href^="#"])');
    links.forEach(link => {
        link.addEventListener('click', e => {
            if(link.href.includes(window.location.hostname)) {
                e.preventDefault();
                document.body.classList.add('page-transitioning');
                setTimeout(() => { window.location.href = link.href; }, 400);
            }
        });
    });
});
