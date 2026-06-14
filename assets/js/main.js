document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Full-Screen Overlay Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            menuOverlay.classList.toggle('open');
            menuToggle.textContent = menuOverlay.classList.contains('open') ? 'Close' : 'Menu';
        });
    }

    // --- 3. Custom Inverted Cursor ---
    const cursor = document.querySelector('.cursor-dot');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const hoverElements = document.querySelectorAll('a, button, .menu-toggle, .pill-btn, .magnetic');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // --- 5. Scroll Progress Tracker ---
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // --- 11. Floating Back-to-Top Indicator ---
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Intersection Observer for Reveals ---
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => observer.observe(reveal));

    // --- 2. Magnetic Buttons ---
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- 14. Interactive Text Scramble (Easter Egg) ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
        brandName.addEventListener('mouseover', event => {
            let iterations = 0;
            const originalText = event.target.dataset.value || event.target.innerText;
            if (!event.target.dataset.value) event.target.dataset.value = originalText;
            
            clearInterval(event.target.interval);
            
            event.target.interval = setInterval(() => {
                event.target.innerText = originalText.split("")
                    .map((letter, index) => {
                        if(index < iterations) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                
                if(iterations >= originalText.length){ 
                    clearInterval(event.target.interval);
                }
                
                iterations += 1 / 3;
            }, 30);
        });
    }

    // --- 4. Smooth Page Transitions ---
    const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="mailto:"]):not([href^="#"])');
    links.forEach(link => {
        link.addEventListener('click', e => {
            if(link.href.includes(window.location.hostname)) {
                e.preventDefault();
                document.body.classList.add('page-transitioning');
                setTimeout(() => {
                    window.location.href = link.href;
                }, 400); // matches CSS transition time
            }
        });
    });

});
