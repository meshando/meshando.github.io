const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/mesha/OneDrive - University of North Florida/RENAMING PROPERLY/WEBSITE';

const cssPath = path.join(baseDir, 'assets/css/style.css');
const phase9CSS = `
/* --- PHASE 9 AESTHETICS --- */

/* 1. Fluid Typography */
html { font-size: 16px; }
h1.split-text { font-size: clamp(3rem, 8vw, 6rem) !important; letter-spacing: -0.05em; line-height: 1.1; }
h2.section-title { font-size: clamp(2rem, 5vw, 4rem) !important; letter-spacing: -0.03em; }

/* 2. Cinematic Vignette Mask */
.vignette-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 9999;
    box-shadow: inset 0 0 150px rgba(0,0,0,0.9);
}

/* 4 & 5. AutoCAD Grid + Topographic Contours */
body::after {
    content: ""; position: fixed; inset: 0; z-index: -2; pointer-events: none; opacity: 0.15;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
}
body::before {
    content: ""; position: fixed; inset: 0; z-index: -3; pointer-events: none; opacity: 0.05;
    /* Faint topo map SVG inline */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cpath d='M0 100 Q 100 50, 200 150 T 400 100' fill='none' stroke='white' stroke-width='1'/%3E%3Cpath d='M0 120 Q 100 70, 200 170 T 400 120' fill='none' stroke='white' stroke-width='1'/%3E%3Cpath d='M0 140 Q 100 90, 200 190 T 400 140' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E");
    background-size: cover;
}

/* 6. Scroll-Driven Image Masks (Applied via JS IntersectionObserver) */
.project-card .project-title[data-image]::before {
    content: ""; position: absolute; inset: 0; background: var(--bg-color);
    transform-origin: top; transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1); z-index: 2;
}
.project-card.reveal.active .project-title[data-image]::before {
    transform: scaleY(0);
}

/* 7. Monochrome ASCII Pre-Loaders */
.ascii-fallback {
    position: relative; overflow: hidden; background: #050505; color: rgba(255,255,255,0.2);
    font-family: var(--font-mono); font-size: 8px; line-height: 8px; white-space: pre;
}

/* 8. Command-K Search Modal */
#cmd-k-modal {
    position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(20px);
    z-index: 10000; display: flex; flex-direction: column; align-items: center; padding-top: 15vh;
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
}
#cmd-k-modal.active { opacity: 1; pointer-events: all; }
#cmd-k-input {
    width: 60%; max-width: 600px; padding: 20px; font-size: 2rem; background: transparent;
    border: none; border-bottom: 2px solid var(--accent-color); color: white; outline: none; font-family: var(--font-mono);
}
.cmd-k-results {
    width: 60%; max-width: 600px; margin-top: 2rem; display: flex; flex-direction: column; gap: 10px;
}
.cmd-k-result {
    padding: 15px; background: rgba(255,255,255,0.05); color: white; text-decoration: none; font-family: var(--font-sans);
    display: flex; justify-content: space-between; border-left: 2px solid transparent; transition: all 0.2s;
}
.cmd-k-result:hover { border-left-color: var(--accent-color); background: rgba(255,255,255,0.1); }

/* 9. Hardware Smooth Scrolling */
html { scroll-behavior: smooth; }

/* 10. Contextual Engineering Tooltips */
.eng-tooltip {
    position: relative; border-bottom: 1px dotted var(--accent-color); cursor: help; color: var(--accent-color);
}
.eng-tooltip::after {
    content: attr(data-tooltip); position: absolute; bottom: 120%; left: 50%; transform: translateX(-50%);
    background: rgba(10,10,10,0.9); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);
    padding: 8px 12px; border-radius: 4px; font-size: 0.8rem; font-family: var(--font-sans);
    color: white; white-space: nowrap; opacity: 0; pointer-events: none; transition: all 0.2s; z-index: 100;
}
.eng-tooltip:hover::after { opacity: 1; bottom: 140%; }

/* 12. Hover-Activated Blueprints */
.project-card { transition: background 0.3s, border-color 0.3s; position: relative; overflow: hidden; }
.project-card:hover {
    background: rgba(10, 30, 80, 0.1); border-color: rgba(100, 150, 255, 0.3);
}
.project-card:hover::after {
    content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0.2; pointer-events: none;
    background-image: linear-gradient(rgba(100, 150, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 150, 255, 0.5) 1px, transparent 1px);
    background-size: 20px 20px;
}

/* 13. Code Snippet Toggles */
.logic-toggle-btn {
    background: none; border: 1px solid rgba(255,255,255,0.2); color: var(--text-secondary);
    padding: 4px 8px; font-size: 0.7rem; font-family: var(--font-mono); text-transform: uppercase;
    cursor: pointer; transition: all 0.2s; margin-top: 10px; border-radius: 2px;
}
.logic-toggle-btn:hover { background: white; color: black; }
pre.logic-snippet {
    display: none; background: #111; padding: 15px; font-size: 0.85rem; color: #0f0;
    overflow-x: auto; margin-top: 10px; border-left: 2px solid var(--accent-color); font-family: var(--font-mono);
}
.stack-item.show-logic p { display: none; }
.stack-item.show-logic pre.logic-snippet { display: block; }

/* 14. Kinetic Split-Flap Reveals */
.split-flap-word {
    display: inline-block; overflow: hidden; vertical-align: top;
}
.split-flap-word span {
    display: inline-block; transform: translateY(110%); transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
}
.reveal.active .split-flap-word span { transform: translateY(0); }

/* 15. Magnetic Snap Typography (Applied via JS inline transform) */
h1, h2 { transition: transform 0.1s ease-out; display: inline-block; }
`;
fs.appendFileSync(cssPath, phase9CSS);

const jsPath = path.join(baseDir, 'assets/js/main.js');
const phase9JS = `

document.addEventListener('DOMContentLoaded', () => {
    // 3. Time-Aware Structural Lighting
    const updateLighting = () => {
        const hour = new Date().getHours();
        // Midnight (0 or 24) is pure black (0%). Noon (12) is 5% lightness.
        const lightness = 5 - Math.abs(12 - hour) * (5 / 12);
        document.documentElement.style.setProperty('--bg-color', \`hsl(0, 0%, \${lightness}%)\`);
    };
    updateLighting();
    setInterval(updateLighting, 60000);

    // 7. Dynamic Favicon Progress
    const drawFavicon = (progress) => {
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000000'; ctx.fillRect(0,0,32,32);
        ctx.beginPath();
        ctx.moveTo(16,16);
        ctx.arc(16,16,12, -Math.PI/2, (progress * 2 * Math.PI) - Math.PI/2);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link);
        }
        link.href = canvas.toDataURL();
    };
    window.addEventListener('scroll', () => {
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
        drawFavicon(progress || 0);
    });

    // 8. Command-K Search
    const cmdKModal = document.getElementById('cmd-k-modal');
    const cmdKInput = document.getElementById('cmd-k-input');
    if(cmdKModal && cmdKInput) {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                cmdKModal.classList.toggle('active');
                if(cmdKModal.classList.contains('active')) cmdKInput.focus();
            }
            if (e.key === 'Escape' && cmdKModal.classList.contains('active')) {
                cmdKModal.classList.remove('active');
            }
        });
        cmdKModal.addEventListener('click', (e) => {
            if(e.target === cmdKModal) cmdKModal.classList.remove('active');
        });
    }

    // 13. Code Snippet Toggles
    document.querySelectorAll('.logic-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = e.target.closest('.stack-item');
            parent.classList.toggle('show-logic');
            e.target.innerText = parent.classList.contains('show-logic') ? 'View Plain Text' : 'View Logic';
        });
    });

    // 14. Split-Flap Text Setup
    document.querySelectorAll('.split-text').forEach(el => {
        const text = el.innerText;
        el.innerText = '';
        text.split(' ').forEach((word, i) => {
            const wordWrap = document.createElement('span');
            wordWrap.className = 'split-flap-word';
            wordWrap.style.marginRight = '0.25em';
            const innerSpan = document.createElement('span');
            innerSpan.innerText = word;
            innerSpan.style.transitionDelay = \`\${i * 0.05}s\`;
            wordWrap.appendChild(innerSpan);
            el.appendChild(wordWrap);
        });
    });

    // 15. Magnetic Snap Typography
    document.querySelectorAll('.split-text').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            el.style.transform = \`translate(\${x * 0.1}px, \${y * 0.2}px) rotate(\${x * 0.02}deg)\`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = \`translate(0px, 0px) rotate(0deg)\`;
        });
    });
});
`;
fs.appendFileSync(jsPath, phase9JS);

// Update HTML files
const htmlFiles = [
    'index.html',
    'environmental/index.html',
    'gallery/index.html',
    'geotech/index.html',
    'news/index.html',
    'research/index.html',
    'water-resources/index.html'
];

const cmdKHtml = `
    <!-- Feature 8: Command-K Modal -->
    <div id="cmd-k-modal">
        <input type="text" id="cmd-k-input" placeholder="Type a command or search... (Esc to close)">
        <div class="cmd-k-results">
            <a href="/" class="cmd-k-result"><span>Home</span> <span>&#8629;</span></a>
            <a href="/water-resources/" class="cmd-k-result"><span>Water Resources</span> <span>&#8629;</span></a>
            <a href="/environmental/" class="cmd-k-result"><span>Environmental Modeling</span> <span>&#8629;</span></a>
            <a href="/geotech/" class="cmd-k-result"><span>Geotechnical</span> <span>&#8629;</span></a>
            <a href="/research/" class="cmd-k-result"><span>Academic Research</span> <span>&#8629;</span></a>
            <a href="/news/" class="cmd-k-result"><span>News & Milestones</span> <span>&#8629;</span></a>
        </div>
    </div>
    <div class="vignette-overlay"></div>
`;

htmlFiles.forEach(file => {
    const fullPath = path.join(baseDir, file);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Inject overlays before </body>
    if(!content.includes('cmd-k-modal')) {
        content = content.replace('</body>', cmdKHtml + '\\n</body>');
    }

    // Inject Contextual Tooltips
    content = content.replace(/HEC-RAS/g, '<span class="eng-tooltip" data-tooltip="Hydrologic Engineering Center\'s River Analysis System">HEC-RAS</span>');
    content = content.replace(/EPA SWMM/g, '<span class="eng-tooltip" data-tooltip="Storm Water Management Model">EPA SWMM</span>');
    content = content.replace(/AERMOD/g, '<span class="eng-tooltip" data-tooltip="AMS/EPA Regulatory Model">AERMOD</span>');
    content = content.replace(/LPILE/g, '<span class="eng-tooltip" data-tooltip="Deep Foundation Lateral Load Analysis">LPILE</span>');
    content = content.replace(/ArcGIS Pro/g, '<span class="eng-tooltip" data-tooltip="Advanced Geographic Information System">ArcGIS Pro</span>');

    // Inject View Logic toggles and code snippets in stack-item
    // Only in sections that have stack-item
    content = content.replace(/<div class="stack-item">([\s\S]*?)<\/div>/g, (match, p1) => {
        if(p1.includes('logic-toggle-btn')) return match; // Already injected
        const codeSnippet = `\\n<button class="logic-toggle-btn">View Logic</button>\\n<pre class="logic-snippet"><code>def compute_model(data):\\n    return optimize_structure(data)\\n# Pure mathematical execution.</code></pre>`;
        return `<div class="stack-item">${p1}${codeSnippet}</div>`;
    });

    fs.writeFileSync(fullPath, content);
});

console.log('Phase 9 injection complete.');
