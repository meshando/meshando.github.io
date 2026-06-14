const fs = require('fs');
const jsPath = 'c:/Users/mesha/OneDrive - University of North Florida/RENAMING PROPERLY/WEBSITE/assets/js/main.js';
let content = fs.readFileSync(jsPath, 'utf8');

// Cut off the bad part
const cutPoint = content.indexOf('// --- PHASE 5 JS FEATURES ---');
if(cutPoint > -1) {
    content = content.substring(0, cutPoint);
}

// Correct Phase 5 features string
const phase5 = `
// --- PHASE 5 JS FEATURES ---

document.addEventListener('DOMContentLoaded', () => {

    const logToDOM = (msg) => {
        const consoleEl = document.getElementById('dom-console');
        if(consoleEl) consoleEl.innerText = \`> \${msg}\`;
    };

    // 4. Live X,Y Coordinate Tracker
    const coordTracker = document.getElementById('coord-tracker');
    document.addEventListener('mousemove', (e) => {
        if(coordTracker) coordTracker.innerText = \`X: \${e.clientX.toString().padStart(4, '0')} | Y: \${e.clientY.toString().padStart(4, '0')}\`;
    });

    // 3. Dynamic Noise Scaling
    let lastMouseX = 0, lastMouseY = 0;
    let noiseOpacity = 0.04;
    document.body.style.setProperty('--noise-opacity', '0.04');
    
    document.addEventListener('mousemove', (e) => {
        const speed = Math.sqrt(Math.pow(e.clientX - lastMouseX, 2) + Math.pow(e.clientY - lastMouseY, 2));
        lastMouseX = e.clientX; lastMouseY = e.clientY;
        
        let targetOpacity = 0.04 + Math.min(speed / 1000, 0.1);
        noiseOpacity = lerp(noiseOpacity, targetOpacity, 0.1);
        
        if(Math.random() < 0.05) logToDOM(\`Mouse velocity: \${speed.toFixed(2)}\`);
    });

    // 1. Cursor Reading Progress Ring
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.innerHTML = \`<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15"></circle></svg>\`;
    document.body.appendChild(ring);
    const circle = ring.querySelector('circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = \`\${circumference} \${circumference}\`;
    circle.style.strokeDashoffset = circumference;

    let rX = window.innerWidth / 2, rY = window.innerHeight / 2;
    function renderRing() {
        if(typeof mouseX !== 'undefined' && typeof mouseY !== 'undefined') {
            rX = lerp(rX, mouseX, 0.2);
            rY = lerp(rY, mouseY, 0.2);
            ring.style.left = rX + 'px';
            ring.style.top = rY + 'px';
        }
        requestAnimationFrame(renderRing);
    }
    renderRing();

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY) / (document.body.scrollHeight - window.innerHeight || 1);
        const offset = circumference - scrollPercent * circumference;
        circle.style.strokeDashoffset = offset;
        logToDOM(\`Scroll Progress: \${Math.round(scrollPercent * 100)}%\`);
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
        
        const skewAmount = Math.max(Math.min(scrollVelocity * 0.05, 5), -5);
        
        skewTargets.forEach(el => {
            el.style.transform = \`skewY(\${skewAmount}deg)\`;
        });
        
        clearTimeout(window.skewTimeout);
        window.skewTimeout = setTimeout(() => {
            skewTargets.forEach(el => { el.style.transform = \`skewY(0deg)\`; });
            scrollVelocity = 0;
        }, 150);
    });

    // 15. Secret "Red Alert" Theme
    let clickCount = 0;
    document.addEventListener('click', (e) => {
        if(e.target.tagName.toLowerCase() === 'div' || e.target.tagName.toLowerCase() === 'main' || e.target.tagName.toLowerCase() === 'section' || e.target.tagName.toLowerCase() === 'body') {
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
                batteryStr = \`BAT: \${Math.round(bat.level * 100)}%\`;
            }
            telemetryEl.innerText = \`NET: \${connType} | \${batteryStr}\`;
        };
        updateTelemetry();
        setInterval(updateTelemetry, 60000);
    }

    // 10. Magnetized Brand Typography
    const brand = document.querySelector('.brand-name');
    if(brand) {
        const text = brand.innerText;
        brand.innerText = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\\u00A0' : char;
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
                    span.style.transform = \`translate(\${Math.cos(angle)*push}px, \${Math.sin(angle)*push}px)\`;
                } else {
                    span.style.transform = \`translate(0,0)\`;
                }
            });
        });
        brand.addEventListener('mouseleave', () => {
            brand.querySelectorAll('span').forEach(span => span.style.transform = \`translate(0,0)\`);
        });
    }

    // 14. Staggered RGB Glitch
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', function(e) {
            if(!this.href || this.href.includes('mailto:') || this.target === '_blank') return;
            this.classList.add('rgb-glitch');
            logToDOM(\`Glitch initializing for routing...\`);
            setTimeout(() => this.classList.remove('rgb-glitch'), 300);
        });
    });

    // 5. Interactive Pseudo-Code Swap
    document.querySelectorAll('.stack-item').forEach(item => {
        const p = item.querySelector('p');
        if(p) {
            const originalHTML = p.innerHTML;
            let titleEl = item.querySelector('h3');
            const title = titleEl ? titleEl.innerText.toLowerCase().replace(/ /g, '_') : 'skill';
            
            item.addEventListener('mouseenter', () => {
                logToDOM(\`Decompiling \${title} stack...\`);
                p.innerHTML = \`<span class="pseudo-code-text">def execute_\${title}():\\n  while True:\\n    optimize()\\n    return True</span>\`;
            });
            item.addEventListener('mouseleave', () => {
                p.innerHTML = originalHTML;
            });
        }
    });

    // 7. Hold-to-Copy Email Interaction
    const emailBtn = document.querySelector('a[href^="mailto:"]');
    if(emailBtn) {
        const progress = document.createElement('div');
        progress.className = 'hold-progress';
        emailBtn.appendChild(progress);
        emailBtn.classList.add('hold-to-copy');
        
        let holdTimer;
        let fillWidth = 0;
        let isHolding = false;
        
        const startHold = (e) => {
            if (e.button !== 0) return; // Only left click
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
                        emailBtn.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12.713l11.985-8.71C23.575 2.276 21.91 1 20 1H4C2.09 1 .425 2.276.015 4.003L12 12.713zM24 5.922l-12 8.715L0 5.922V20c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3V5.922z"/></svg> Email<div class="hold-progress"></div>\`;
                        progress.style.width = '0%';
                        fillWidth = 0;
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
            if(fillWidth >= 100) e.preventDefault();
        });
    }

    // 13. Page Slice "Curtain" Transition
    const curtain = document.createElement('div');
    curtain.className = 'curtain';
    curtain.innerHTML = '<div class="curtain-slice"></div><div class="curtain-slice"></div><div class="curtain-slice"></div>';
    document.body.appendChild(curtain);

    const oldLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="mailto:"]):not([href^="#"])');
    oldLinks.forEach(link => {
        link.addEventListener('click', e => {
            if(link.href.includes(window.location.hostname) || !link.href.startsWith('http')) {
                document.body.classList.add('curtain-active');
                logToDOM('Initiating spatial routing protocol...');
            }
        });
    });
});
`;

fs.writeFileSync(jsPath, content + phase5);
console.log('Fixed main.js');
