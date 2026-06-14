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

// --- PHASE 5 JS FEATURES ---

document.addEventListener('DOMContentLoaded', () => {

    const logToDOM = (msg) => {
        const consoleEl = document.getElementById('dom-console');
        if(consoleEl) consoleEl.innerText = > $msg;
    };

    // 4. Live X,Y Coordinate Tracker
    const coordTracker = document.getElementById('coord-tracker');
    document.addEventListener('mousemove', (e) => {
        if(coordTracker) coordTracker.innerText = X:  + e.clientX.toString().padStart(4, '0') +  | Y:  + e.clientY.toString().padStart(4, '0');
    });

    // 3. Dynamic Noise Scaling
    let lastMouseX = 0, lastMouseY = 0;
    let noiseOpacity = 0.04;
    const noiseFilter = document.querySelector('body::after'); // Hard to access pseudo element directly via JS for opacity, so we'll manipulate a custom property if we had one.
    // Instead, we can dynamically add/remove a style tag, or inject a real div for noise.
    // Since we used pseudo-element, we'll skip direct opacity manipulation and manipulate the filter frequency via a new SVG element if needed.
    // Actually, CSS custom properties are better. Let's set a CSS var on body.
    document.body.style.setProperty('--noise-opacity', '0.04');
    
    document.addEventListener('mousemove', (e) => {
        const speed = Math.sqrt(Math.pow(e.clientX - lastMouseX, 2) + Math.pow(e.clientY - lastMouseY, 2));
        lastMouseX = e.clientX; lastMouseY = e.clientY;
        
        let targetOpacity = 0.04 + Math.min(speed / 1000, 0.1);
        noiseOpacity = lerp(noiseOpacity, targetOpacity, 0.1);
        
        // Only log significantly to console to avoid spam
        if(Math.random() < 0.05) logToDOM(Mouse velocity: $speed.toFixed(2));
    });

    // 1. Cursor Reading Progress Ring
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.innerHTML = <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15"></circle></svg>;
    document.body.appendChild(ring);
    const circle = ring.querySelector('circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = ${circumference} ;
    circle.style.strokeDashoffset = circumference;

    let rX = window.innerWidth / 2, rY = window.innerHeight / 2;
    function renderRing() {
        rX = lerp(rX, mouseX, 0.2);
        rY = lerp(rY, mouseY, 0.2);
        ring.style.left = rX + 'px';
        ring.style.top = rY + 'px';
        requestAnimationFrame(renderRing);
    }
    renderRing();

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY) / (document.body.scrollHeight - window.innerHeight);
        const offset = circumference - scrollPercent * circumference;
        circle.style.strokeDashoffset = offset;
        logToDOM(Scroll Progress:  + Math.round(scrollPercent * 100) + %);
    });

    // 2. Scroll Velocity Element Skewing
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const skewTargets = document.querySelectorAll('.project-card, .stack-item, img');
    skewTargets.forEach(el => el.classList.add('skew-target'));

    window.addEventListener('scroll', () => {
        const delta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        scrollVelocity = lerp(scrollVelocity, delta, 0.5);
        
        const skewAmount = Math.max(Math.min(scrollVelocity * 0.05, 5), -5); // clamp between -5 and 5 deg
        
        skewTargets.forEach(el => {
            el.style.transform = skewY($skewAmountdeg);
        });
        
        // Reset skew when scrolling stops
        clearTimeout(window.skewTimeout);
        window.skewTimeout = setTimeout(() => {
            skewTargets.forEach(el => { el.style.transform = skewY(0deg); });
            scrollVelocity = 0;
        }, 150);
    });

    // 15. Secret "Red Alert" Theme
    let clickCount = 0;
    document.addEventListener('click', (e) => {
        // Only trigger on empty space (body or container)
        if(e.target.tagName.toLowerCase() === 'div' || e.target.tagName.toLowerCase() === 'main' || e.target.tagName.toLowerCase() === 'section') {
            clickCount++;
            if(clickCount === 2) {
                document.body.classList.toggle('red-alert-theme');
                logToDOM(document.body.classList.contains('red-alert-theme') ? 'CRITICAL: RED ALERT THEME ACTIVATED' : 'System nominal. Theme restored.');
                clickCount = 0;
            }
            setTimeout(() => clickCount = 0, 500);
        }
    });

    // 11. Offline Mode UI
    window.addEventListener('offline', () => {
        document.body.classList.add('offline-mode');
        logToDOM('ERR: CONNECTION LOST. CACHE MODE ACTIVE.');
    });
    window.addEventListener('online', () => {
        document.body.classList.remove('offline-mode');
        logToDOM('SYS: CONNECTION RESTORED.');
    });

    // 8. Dynamic State Favicon
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const link = document.querySelector("link[rel~='icon']");
    
    function updateFavicon(direction) {
        ctx.clearRect(0,0,32,32);
        ctx.fillStyle = '#b91c1c';
        if(direction === 'up') {
            ctx.beginPath(); ctx.moveTo(16,4); ctx.lineTo(28,24); ctx.lineTo(4,24); ctx.fill();
        } else if(direction === 'down') {
            ctx.beginPath(); ctx.moveTo(4,8); ctx.lineTo(28,8); ctx.lineTo(16,28); ctx.fill();
        } else {
            ctx.fillRect(8,8,16,16);
        }
        if(link) link.href = canvas.toDataURL();
    }
    
    let isScrolling;
    window.addEventListener('scroll', () => {
        updateFavicon(scrollVelocity > 0 ? 'down' : 'up');
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => { updateFavicon('stop'); }, 200);
    }, false);

    // 9. Device Telemetry
    const telemetryEl = document.getElementById('telemetry');
    if(telemetryEl) {
        const updateTelemetry = async () => {
            let connType = 'UNKNOWN';
            if(navigator.connection) connType = navigator.connection.effectiveType.toUpperCase();
            
            let batteryStr = 'PWR: AC';
            if(navigator.getBattery) {
                const bat = await navigator.getBattery();
                batteryStr = BAT:  + Math.round(bat.level * 100) + %;
            }
            telemetryEl.innerText = NET: $connType | $batteryStr;
        };
        updateTelemetry();
        setInterval(updateTelemetry, 60000); // Check every minute
    }

    // 10. Magnetized Brand Typography
    const brand = document.querySelector('.brand-name');
    if(brand) {
        const text = brand.innerText;
        brand.innerText = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.transition = 'transform 0.1s linear';
            brand.appendChild(span);
        });
        
        brand.addEventListener('mousemove', (e) => {
            const spans = brand.querySelectorAll('span');
            spans.forEach(span => {
                const rect = span.getBoundingClientRect();
                const center = { x: rect.left + rect.width/2, y: rect.top + rect.height/2 };
                const dist = Math.sqrt(Math.pow(e.clientX - center.x, 2) + Math.pow(e.clientY - center.y, 2));
                if(dist < 50) {
                    const angle = Math.atan2(center.y - e.clientY, center.x - e.clientX);
                    const push = (50 - dist) * 0.2;
                    span.style.transform = 	ranslate( + Math.cos(angle)*push + px,  + Math.sin(angle)*push + px);
                } else {
                    span.style.transform = 	ranslate(0,0);
                }
            });
        });
        brand.addEventListener('mouseleave', () => {
            brand.querySelectorAll('span').forEach(span => span.style.transform = 	ranslate(0,0));
        });
    }

    // 14. Staggered RGB Glitch
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', function(e) {
            // Only glitch if it's not a mailto or external link
            if(!this.href || this.href.includes('mailto:') || this.target === '_blank') return;
            const targetText = this.innerText;
            this.classList.add('rgb-glitch');
            logToDOM(Glitch initializing for routing...);
            setTimeout(() => this.classList.remove('rgb-glitch'), 300);
        });
    });

    // 5. Interactive Pseudo-Code Swap
    document.querySelectorAll('.stack-item').forEach(item => {
        const p = item.querySelector('p');
        if(p) {
            const originalText = p.innerText;
            const originalHTML = p.innerHTML;
            const title = item.querySelector('h3').innerText.toLowerCase().replace(/ /g, '_');
            
            item.addEventListener('mouseenter', () => {
                logToDOM(Decompiling $title stack...);
                p.innerHTML = <span class="pseudo-code-text">def execute_$title():\n  while True:\n    optimize()\n    return True</span>;
            });
            item.addEventListener('mouseleave', () => {
                p.innerHTML = originalHTML;
            });
        }
    });

    // 7. Hold-to-Copy Email Interaction
    const emailBtn = document.querySelector('a[href^="mailto:"]');
    if(emailBtn) {
        // Prevent default mailto action for this demo feature, or combine it.
        // Let's combine: Click to mail, HOLD to copy.
        const progress = document.createElement('div');
        progress.className = 'hold-progress';
        emailBtn.appendChild(progress);
        emailBtn.classList.add('hold-to-copy');
        
        let holdTimer;
        let fillWidth = 0;
        let isHolding = false;
        
        const startHold = (e) => {
            isHolding = true;
            fillWidth = 0;
            logToDOM('Extracting email payload...');
            holdTimer = setInterval(() => {
                fillWidth += 5;
                progress.style.width = fillWidth + '%';
                if(fillWidth >= 100) {
                    clearInterval(holdTimer);
                    navigator.clipboard.writeText('meshachando.apply@gmail.com');
                    emailBtn.classList.add('copied');
                    emailBtn.innerHTML = 'COPIED TO CLIPBOARD';
                    logToDOM('Email payload successfully copied to clipboard.');
                    setTimeout(() => {
                        emailBtn.classList.remove('copied');
                        emailBtn.innerHTML = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12.713l11.985-8.71C23.575 2.276 21.91 1 20 1H4C2.09 1 .425 2.276.015 4.003L12 12.713zM24 5.922l-12 8.715L0 5.922V20c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3V5.922z"/></svg> Email<div class="hold-progress"></div>;
                        progress.style.width = '0%';
                    }, 2000);
                }
            }, 50);
        };
        
        const stopHold = () => {
            isHolding = false;
            clearInterval(holdTimer);
            if(fillWidth < 100) {
                fillWidth = 0;
                progress.style.width = '0%';
            }
        };
        
        emailBtn.addEventListener('mousedown', startHold);
        emailBtn.addEventListener('mouseup', stopHold);
        emailBtn.addEventListener('mouseleave', stopHold);
        emailBtn.addEventListener('click', (e) => {
            if(fillWidth >= 100) e.preventDefault(); // prevent mailto if they copied
        });
    }

    // 13. Page Slice "Curtain" Transition
    // Override the previous smooth transition
    const curtain = document.createElement('div');
    curtain.className = 'curtain';
    curtain.innerHTML = '<div class="curtain-slice"></div><div class="curtain-slice"></div><div class="curtain-slice"></div>';
    document.body.appendChild(curtain);

    const oldLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="mailto:"]):not([href^="#"])');
    // We already added a listener earlier, but we can intercept here by adding the curtain-active class
    oldLinks.forEach(link => {
        // Remove old listener if possible, but easier to just let it run and add our class which will cover it
        link.addEventListener('click', e => {
            if(link.href.includes(window.location.hostname) || !link.href.startsWith('http')) {
                document.body.classList.add('curtain-active');
                logToDOM('Initiating spatial routing protocol...');
            }
        });
    });
});
