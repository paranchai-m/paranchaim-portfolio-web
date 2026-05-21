function setupEmailCopy() {
    const copyBtn = document.querySelector(".copy-email-btn");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", () => {
        const email = copyBtn.getAttribute("data-email");
        navigator.clipboard.writeText(email).then(() => {
            const originalText = copyBtn.querySelector(".email-text").innerText;
            copyBtn.classList.add("copied");
            copyBtn.querySelector(".email-text").innerText = "";
            
            setTimeout(() => {
                copyBtn.classList.remove("copied");
                copyBtn.querySelector(".email-text").innerText = originalText;
            }, 2000);
        });
    });
}

function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
}

const SUN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const MOON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

// Theme Toggle Functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;
    
    const toggleIcon = themeToggle.querySelector(".toggle-icon");
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add("dark-theme");
        if (toggleIcon) toggleIcon.innerHTML = MOON_SVG;
    } else {
        document.body.classList.remove("dark-theme");
        if (toggleIcon) toggleIcon.innerHTML = SUN_SVG;
    }
    
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        if (toggleIcon) {
            toggleIcon.innerHTML = isDark ? MOON_SVG : SUN_SVG;
            // Micro-animation spin
            toggleIcon.style.transform = "rotate(360deg)";
            setTimeout(() => {
                toggleIcon.style.transform = "none";
            }, 500);
        }
    });
}

// Certificate Modal Functionality
function setupCertificateModal() {
    const modal = document.getElementById("cert-modal");
    const certBtns = document.querySelectorAll(".cert-btn");
    const closeBtn = document.querySelector(".modal-close");
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");
    
    if (!modal || !closeBtn || !modalTitle || !modalBody) return;
    
    function isMobile() {
        return window.innerWidth < 768;
    }
    
    function openModal(title, src, type) {
        modalTitle.innerText = title;
        modalBody.innerHTML = ""; // Clear existing content
        
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
        
        if (type === "pdf") {
            if (isMobile()) {
                // Mobile layout with a view button
                modalBody.innerHTML = `
                    <div class="mobile-fallback-view">
                        <div class="mobile-fallback-title">${title}</div>
                        <div class="mobile-fallback-meta">PDF Certificate Document</div>
                        <a href="${src}" class="mobile-view-btn" target="_blank">Open Certificate</a>
                    </div>
                `;
            } else {
                // Desktop inline PDF view
                modalBody.innerHTML = `<iframe src="${src}" title="${title}"></iframe>`;
            }
        } else if (type === "json") {
            // Render styled JSON credential block
            modalBody.innerHTML = `
                <div class="json-container">
                    <div class="json-header">
                        <button class="copy-json-btn">Copy JSON 📋</button>
                    </div>
                    <pre class="json-code-block">Loading credential data...</pre>
                </div>
            `;
            
            // Fetch and display JSON data
            fetch(src)
                .then(response => {
                    if (!response.ok) throw new Error("Network response was not ok");
                    return response.json();
                })
                .then(data => {
                    const jsonString = JSON.stringify(data, null, 2);
                    const codeBlock = modalBody.querySelector(".json-code-block");
                    if (codeBlock) codeBlock.textContent = jsonString;
                    
                    // Setup copy button
                    const copyJsonBtn = modalBody.querySelector(".copy-json-btn");
                    if (copyJsonBtn) {
                        copyJsonBtn.addEventListener("click", () => {
                            navigator.clipboard.writeText(jsonString).then(() => {
                                copyJsonBtn.innerText = "Copied! ✓";
                                copyJsonBtn.classList.add("copied");
                                setTimeout(() => {
                                    copyJsonBtn.innerText = "Copy JSON 📋";
                                    copyJsonBtn.classList.remove("copied");
                                }, 2000);
                            });
                        });
                    }
                })
                .catch(error => {
                    const codeBlock = modalBody.querySelector(".json-code-block");
                    if (codeBlock) codeBlock.textContent = `Error loading credential JSON: ${error.message}`;
                });
        }
    }
    
    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Restore scrolling
        // Wait for transition to complete before clearing body to prevent flashing
        setTimeout(() => {
            if (!modal.classList.contains("active")) {
                modalBody.innerHTML = "";
            }
        }, 400);
    }
    
    certBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const title = btn.getAttribute("data-cert-title");
            const src = btn.getAttribute("data-cert-src");
            const type = btn.getAttribute("data-cert-type");
            openModal(title, src, type);
        });
    });
    
    closeBtn.addEventListener("click", closeModal);
    
    // Close on overlay click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}

// Floating Back to Top Button Functionality
function setupBackToTop() {
    const backToTopBtn = document.getElementById("back-to-top");
    if (!backToTopBtn) return;
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });
    
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Setup Interactive Background Grid Canvas
function setupGridCanvas() {
    const canvas = document.getElementById("grid-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.scale(dpr, dpr);
    }
    window.addEventListener("resize", resize);
    resize();

    // Mouse positions (start off-screen)
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    window.addEventListener("mousemove", (e) => {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        targetMouseX = -1000;
        targetMouseY = -1000;
    });

    const gridSpacing = 80;
    let driftX = 0;
    let driftY = 0;
    const spotlightRadius = 220;

    function animate() {
        // Subtle drift in background pattern
        driftX += 0.15;
        driftY += 0.08;

        // Smoothly interpolate spotlight position to mouse position
        if (mouseX === -1000 && targetMouseX !== -1000) {
            mouseX = targetMouseX;
            mouseY = targetMouseY;
        } else if (targetMouseX !== -1000) {
            mouseX += (targetMouseX - mouseX) * 0.08;
            mouseY += (targetMouseY - mouseY) * 0.08;
        } else {
            // Smoothly ease spotlight off-screen if mouse left page
            mouseX += (-1000 - mouseX) * 0.08;
            mouseY += (-1000 - mouseY) * 0.08;
        }

        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains("dark-theme");
        const baseLineColor = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
        const activeLineColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";

        const scrollY = window.scrollY;
        const scrollX = window.scrollX || 0;

        // Base grid offset
        const offsetX = (driftX - scrollX) % gridSpacing;
        const offsetY = (driftY - scrollY) % gridSpacing;

        const startX = offsetX - gridSpacing;
        const startY = offsetY - gridSpacing;

        // 1. Draw base sparse dashed grid
        ctx.beginPath();
        ctx.strokeStyle = baseLineColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 14]); // 75%+ sparse dash pattern

        for (let x = startX; x < width + gridSpacing; x += gridSpacing) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = startY; y < height + gridSpacing; y += gridSpacing) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();

        // 2. Draw active reveal layer inside spotlight
        if (mouseX > -500 && mouseY > -500) {
            ctx.beginPath();
            ctx.strokeStyle = activeLineColor;
            ctx.lineWidth = 1;
            ctx.setLineDash([]); // Solid lines when active

            const minX = mouseX - spotlightRadius;
            const maxX = mouseX + spotlightRadius;
            const minY = mouseY - spotlightRadius;
            const maxY = mouseY + spotlightRadius;

            const firstCol = Math.floor((minX - offsetX) / gridSpacing) * gridSpacing + offsetX;
            const lastCol = Math.ceil((maxX - offsetX) / gridSpacing) * gridSpacing + offsetX;
            
            for (let x = firstCol; x <= lastCol; x += gridSpacing) {
                if (x < 0 || x > width) continue;
                const dx = x - mouseX;
                if (Math.abs(dx) < spotlightRadius) {
                    const dyHalf = Math.sqrt(spotlightRadius * spotlightRadius - dx * dx);
                    const y1 = Math.max(0, mouseY - dyHalf);
                    const y2 = Math.min(height, mouseY + dyHalf);
                    if (y1 < y2) {
                        ctx.moveTo(x, y1);
                        ctx.lineTo(x, y2);
                    }
                }
            }

            const firstRow = Math.floor((minY - offsetY) / gridSpacing) * gridSpacing + offsetY;
            const lastRow = Math.ceil((maxY - offsetY) / gridSpacing) * gridSpacing + offsetY;

            for (let y = firstRow; y <= lastRow; y += gridSpacing) {
                if (y < 0 || y > height) continue;
                const dy = y - mouseY;
                if (Math.abs(dy) < spotlightRadius) {
                    const dxHalf = Math.sqrt(spotlightRadius * spotlightRadius - dy * dy);
                    const x1 = Math.max(0, mouseX - dxHalf);
                    const x2 = Math.min(width, mouseX + dxHalf);
                    if (x1 < x2) {
                        ctx.moveTo(x1, y);
                        ctx.lineTo(x2, y);
                    }
                }
            }
            ctx.stroke();
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

window.addEventListener("DOMContentLoaded", () => {
    reveal();
    setupEmailCopy();
    setupThemeToggle();
    setupCertificateModal();
    setupBackToTop();
    setupGridCanvas();
});
console.log("Portfolio animations, utilities, and background grid initialized.");
