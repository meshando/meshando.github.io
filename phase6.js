const fs = require('fs');

const cssPath = 'c:/Users/mesha/OneDrive - University of North Florida/RENAMING PROPERLY/WEBSITE/assets/css/style.css';
const jsPath = 'c:/Users/mesha/OneDrive - University of North Florida/RENAMING PROPERLY/WEBSITE/assets/js/main.js';

const phase6CSS = `
/* --- PHASE 6 FEATURES --- */

/* 5. Wireframe Protocol */
body.wireframe-mode * {
  background: transparent !important;
  color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: none !important;
  text-shadow: none !important;
}
body.wireframe-mode {
  background-color: #000 !important;
}
body.wireframe-mode img, body.wireframe-mode svg {
  opacity: 0.1 !important;
}

/* 6. Scroll-Triggered Section Inversion */
body.inverted-section {
  --bg-color: #ffffff;
  --text-primary: #000000;
  --text-secondary: rgba(0,0,0,0.7);
  --accent-color: #b91c1c;
}
body {
  transition: background-color 0.8s ease, color 0.8s ease;
}

/* 7. Magnetic Grid Dot */
#grid-dot {
  position: fixed;
  top: 0; left: 0;
  width: 4px; height: 4px;
  background-color: #fff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.2;
  transition: transform 0.1s linear;
}

/* 8. Energy Build-Up Hover */
.btn.energy-hover {
  transition: letter-spacing 3s cubic-bezier(0.25, 1, 0.5, 1), filter 3s ease, text-shadow 3s ease;
}
.btn.energy-hover.building {
  letter-spacing: 0.3em;
  filter: blur(1px);
  text-shadow: 0 0 10px rgba(185, 28, 28, 0.8);
}

/* 9. Idle Screensaver Geometry */
#idle-screensaver {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0,0,0,0.9);
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s ease;
}
#idle-screensaver.active {
  opacity: 1;
  pointer-events: all;
}
.wire-cube {
  width: 100px; height: 100px;
  border: 1px solid rgba(255,255,255,0.5);
  animation: rotateCube 10s linear infinite;
  transform-style: preserve-3d;
}
@keyframes rotateCube {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

/* 10. Base64 Clipboard Encryption */
.base64-text {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  word-break: break-all;
}
`;

const phase6JS = `

// --- PHASE 6 JS FEATURES ---
document.addEventListener('DOMContentLoaded', () => {

    // Helper for DOM console
    const logToDOM = (msg) => {
        const consoleEl = document.getElementById('dom-console');
        if(consoleEl) consoleEl.innerText = \`> \${msg}\`;
    };

    // 1. Scramble-Decode Text Reveal
    const scrambleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    document.querySelectorAll('.split-text, h1, h2, h3').forEach(el => {
        const originalText = el.innerText;
        el.addEventListener('mouseenter', () => {
            if(el.isScrambling) return;
            el.isScrambling = true;
            let iterations = 0;
            const maxIterations = 10;
            const interval = setInterval(() => {
                el.innerText = originalText.split('').map((char, index) => {
                    if(char === ' ' || char === '\\n') return char;
                    if(index < iterations / maxIterations * originalText.length) return originalText[index];
                    return scrambleLetters[Math.floor(Math.random() * scrambleLetters.length)];
                }).join('');
                iterations++;
                if(iterations > maxIterations) {
                    clearInterval(interval);
                    el.innerText = originalText;
                    el.isScrambling = false;
                }
            }, 30);
        });
    });

    // 2. Device Gyroscope Parallax
    if(window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
            const tiltX = Math.round(event.gamma || 0); // Left-to-right
            const tiltY = Math.round(event.beta || 0);  // Front-to-back
            const maxTilt = 20;
            const x = Math.max(Math.min(tiltX / maxTilt, 1), -1) * 10;
            const y = Math.max(Math.min((tiltY - 45) / maxTilt, 1), -1) * 10;
            document.body.style.transform = \`translate3d(\${x}px, \${y}px, 0)\`;
        });
    }

    // 3. Synthesized Sonar Ping (Web Audio API)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx;
    const menuBtn = document.querySelector('.menu-toggle');
    if(menuBtn) {
        menuBtn.addEventListener('mouseenter', () => {
            if(!audioCtx) audioCtx = new AudioContext();
            if(audioCtx.state === 'suspended') audioCtx.resume();
            
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.5);
            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.5);
        });
    }

    // 4. Dynamic Proximity Letter-Spacing
    const headers = document.querySelectorAll('.section-title');
    document.addEventListener('mousemove', (e) => {
        headers.forEach(header => {
            const rect = header.getBoundingClientRect();
            const center = { x: rect.left + rect.width/2, y: rect.top + rect.height/2 };
            const dist = Math.sqrt(Math.pow(e.clientX - center.x, 2) + Math.pow(e.clientY - center.y, 2));
            if(dist < 200) {
                const space = 0 + ((200 - dist) / 200) * 0.2; // max 0.2em
                header.style.letterSpacing = \`\${space}em\`;
            } else {
                header.style.letterSpacing = '0em';
            }
        });
    });

    // 5. Wireframe Protocol (Easter Egg 2)
    let keys2 = '';
    const secretCode2 = 'wire';
    document.addEventListener('keydown', (e) => {
        keys2 += e.key.toLowerCase();
        if(keys2.length > secretCode2.length) keys2 = keys2.substr(1);
        if(keys2 === secretCode2) {
            document.body.classList.toggle('wireframe-mode');
            logToDOM(document.body.classList.contains('wireframe-mode') ? 'SYS: WIREFRAME ARCHITECTURE LOADED.' : 'SYS: STANDARD RENDER RESTORED.');
        }
    });

    // 6. Scroll-Triggered Section Inversion
    const stackGrid = document.querySelector('.stack-grid-creative');
    if(stackGrid && window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    document.body.classList.add('inverted-section');
                    logToDOM('Visual inversion threshold reached.');
                } else {
                    document.body.classList.remove('inverted-section');
                }
            });
        }, { threshold: 0.5 });
        observer.observe(stackGrid);
    }

    // 7. Magnetic Grid Snapping
    const gridDot = document.createElement('div');
    gridDot.id = 'grid-dot';
    document.body.appendChild(gridDot);
    document.addEventListener('mousemove', (e) => {
        const snap = 50; // 50px grid
        const x = Math.round(e.clientX / snap) * snap;
        const y = Math.round(e.clientY / snap) * snap;
        gridDot.style.transform = \`translate3d(\${x}px, \${y}px, 0)\`;
    });

    // 8. Energy Build-Up Hover
    const resumeBtn = document.querySelector('.btn[target="_blank"]');
    if(resumeBtn) {
        resumeBtn.classList.add('energy-hover');
        resumeBtn.addEventListener('mouseenter', () => {
            resumeBtn.classList.add('building');
        });
        resumeBtn.addEventListener('mouseleave', () => {
            resumeBtn.classList.remove('building');
        });
    }

    // 9. Idle Screensaver Geometry
    const screensaver = document.createElement('div');
    screensaver.id = 'idle-screensaver';
    screensaver.innerHTML = '<div class="wire-cube"></div>';
    document.body.appendChild(screensaver);
    let idleTimer;
    const resetIdle = () => {
        screensaver.classList.remove('active');
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            screensaver.classList.add('active');
            logToDOM('SYS: IDLE TIMEOUT. SCREENSAVER ENGAGED.');
        }, 30000); // 30 seconds
    };
    document.addEventListener('mousemove', resetIdle);
    document.addEventListener('keydown', resetIdle);
    resetIdle();

    // 10. Base64 Clipboard Encryption Override
    // Find the hold progress from Phase 5 and modify it slightly.
    const mailBtn = document.querySelector('a[href^="mailto:"]');
    if(mailBtn) {
        // We will intercept the Phase 5 logic by adding a MutationObserver on the button's class,
        // or just re-binding the event if possible. Since Phase 5 logic is tightly coupled, 
        // we'll listen for the 'copied' class being added.
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && mailBtn.classList.contains('copied')) {
                    if(!mailBtn.isDecrypting) {
                        mailBtn.isDecrypting = true;
                        const email = 'meshachando.apply@gmail.com';
                        const b64 = btoa(email);
                        mailBtn.innerHTML = \`<span class="base64-text">\${b64}</span>\`;
                        setTimeout(() => {
                            mailBtn.innerHTML = 'COPIED TO CLIPBOARD';
                        }, 500);
                        setTimeout(() => { mailBtn.isDecrypting = false; }, 2000); // Reset lock
                    }
                }
            });
        });
        observer.observe(mailBtn, { attributes: true });
    }
});
`;

fs.appendFileSync(cssPath, phase6CSS);
fs.appendFileSync(jsPath, phase6JS);
console.log('Phase 6 injected successfully.');
