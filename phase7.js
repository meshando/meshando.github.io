const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/mesha/OneDrive - University of North Florida/RENAMING PROPERLY/WEBSITE';

const htmlFiles = [
    'index.html',
    'environmental/index.html',
    'gallery/index.html',
    'geotech/index.html',
    'news/index.html',
    'research/index.html',
    'water-resources/index.html'
];

// 1. Update HTML Files
htmlFiles.forEach(file => {
    const fullPath = path.join(baseDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Rename Menu -> Explore
    content = content.replace(/>Menu<\/button>/g, '>Explore</button>');
    
    // Replace back-to-top with toc-sidebar
    const backToTopRegex = /<a href="#" class="back-to-top magnetic">[\s\S]*?<\/a>/g;
    content = content.replace(backToTopRegex, '<div class="toc-sidebar"></div>');
    
    fs.writeFileSync(fullPath, content);
});

console.log('HTML files updated.');

// 2. Update CSS
const cssPath = path.join(baseDir, 'assets/css/style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Append new Phase 7 CSS overrides
const phase7CSS = `
/* --- PHASE 7 UX POLISH --- */

/* Enhanced Menu Overlay */
.menu-overlay {
    backdrop-filter: blur(40px) !important;
    -webkit-backdrop-filter: blur(40px) !important;
    background-color: rgba(0,0,0,0.7) !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}
.menu-links {
    margin-top: 0 !important;
    padding-top: 0 !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
}
.menu-links a {
    font-size: 3.5rem !important;
    margin-bottom: 2rem !important;
    text-align: center;
    width: 100%;
}

/* Minimalist ToC Sidebar */
.toc-sidebar {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 999;
}
.toc-dot {
    width: 6px;
    height: 6px;
    background-color: var(--text-secondary);
    border-radius: 50%;
    opacity: 0.3;
    transition: all 0.3s ease;
    cursor: pointer;
}
.toc-dot.active {
    opacity: 1;
    transform: scale(1.5);
    background-color: var(--accent-color);
}
.toc-dot:hover {
    opacity: 0.8;
    transform: scale(1.5);
}

/* Fix Cursor Disappearance */
.cursor-ring, .cursor-dot {
    mix-blend-mode: normal !important;
    z-index: 2147483647 !important;
}
body.page-transitioning .cursor-ring,
body.curtain-active .cursor-ring {
    opacity: 1 !important; /* Force visible */
}
`;

fs.appendFileSync(cssPath, phase7CSS);
console.log('CSS updated.');

// 3. Update JS
const jsPath = path.join(baseDir, 'assets/js/main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Disable scroll inversion
jsContent = jsContent.replace(
    /if\(stackGrid && window\.IntersectionObserver\) {[\s\S]*?observer\.observe\(stackGrid\);\s*}/,
    '// Scroll inversion removed for Phase 7'
);

// Append ToC logic
const tocJS = `

document.addEventListener('DOMContentLoaded', () => {
    // Phase 7: ToC Scroll Spy
    const sections = document.querySelectorAll('section, main');
    const tocContainer = document.querySelector('.toc-sidebar');
    
    if(tocContainer && sections.length > 0) {
        sections.forEach((sec, idx) => {
            sec.id = sec.id || 'section-' + idx;
            const dot = document.createElement('div');
            dot.className = 'toc-dot';
            dot.dataset.target = sec.id;
            
            dot.addEventListener('click', () => {
                sec.scrollIntoView({ behavior: 'smooth' });
            });
            tocContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.toc-dot');
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
        
        const tocObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    dots.forEach(d => d.classList.remove('active'));
                    const activeDot = document.querySelector(\`.toc-dot[data-target="\${entry.target.id}"]\`);
                    if(activeDot) activeDot.classList.add('active');
                }
            });
        }, observerOptions);

        sections.forEach(sec => tocObserver.observe(sec));
    }
    
    // Ensure mouse doesn't get stuck hidden
    document.addEventListener('mouseenter', () => {
        document.querySelector('.cursor-dot').style.opacity = '1';
        document.querySelector('.cursor-ring').style.opacity = '1';
    });
});
`;

fs.appendFileSync(jsPath, tocJS);
console.log('JS updated.');
