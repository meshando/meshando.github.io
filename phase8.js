const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/mesha/OneDrive - University of North Florida/RENAMING PROPERLY/WEBSITE';

// 1. Clean up HTML files (remove X/Y tracker)
const htmlFiles = [
    'index.html',
    'environmental/index.html',
    'gallery/index.html',
    'geotech/index.html',
    'news/index.html',
    'research/index.html',
    'water-resources/index.html'
];

htmlFiles.forEach(file => {
    const fullPath = path.join(baseDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove coord-tracker
    content = content.replace(/<div id="coord-tracker">.*?<\/div>\s*/g, '');
    
    // Replace Grab my resume with PDF Button
    const resumeRegex = /<a href="([^"]*?Resume[^"]*?)" target="_blank" class="btn">Grab my resume<\/a>/g;
    content = content.replace(resumeRegex, '<a href="$1" target="_blank" class="btn resume-btn"><svg viewBox="0 0 24 24"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg> View Resume (PDF)</a>');
    
    // Replace full CV text
    const cvRegex = /<a href="([^"]*?CV[^"]*?)" target="_blank" class="btn">Grab my full CV<\/a>/g;
    content = content.replace(cvRegex, '<a href="$1" target="_blank" class="btn resume-btn"><svg viewBox="0 0 24 24"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg> View Full CV (PDF)</a>');

    fs.writeFileSync(fullPath, content);
});

// 2. CSS Updates
const cssPath = path.join(baseDir, 'assets/css/style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Append CSS overrides for the resume button and fix the overlay properly
const phase8CSS = `
/* --- PHASE 8 UI FIXES --- */

/* Fix Menu Overlay completely to ensure full screen */
.menu-overlay {
    position: fixed !important;
    top: 0 !important; left: 0 !important;
    width: 100vw !important; height: 100vh !important;
    transform: none !important;
}

/* Resume/PDF Button Styling */
.btn.resume-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background-color: var(--accent-color);
    color: var(--bg-color);
    border: none;
    font-weight: 600;
    font-family: var(--font-sans);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: all 0.3s ease;
    border-radius: 4px;
}
.btn.resume-btn:hover {
    background-color: #fff;
    color: #000;
    transform: translateY(-2px);
}
.btn.resume-btn svg {
    width: 24px; height: 24px; fill: currentColor;
}

/* Hide annoying things */
.cursor-ring, #coord-tracker {
    display: none !important;
}
`;
fs.appendFileSync(cssPath, phase8CSS);

// 3. JS Updates (Purge Gyroscope and others)
const jsPath = path.join(baseDir, 'assets/js/main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Disable Gyroscope
jsContent = jsContent.replace(
    /if\(window\.DeviceOrientationEvent\)\s*{[\s\S]*?}\s*}\s*/,
    '// Gyroscope parallax removed for Phase 8 architecture fix\\n'
);

// Disable Cursor ring render loop
jsContent = jsContent.replace(
    /function renderRing\(\)\s*{[\s\S]*?}\s*renderRing\(\);/g,
    '// Render ring removed'
);

fs.writeFileSync(jsPath, jsContent);
console.log('Phase 8 scripts executed.');
