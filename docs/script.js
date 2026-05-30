// ============================================
// EMAIL COPY
// ============================================
function setupEmailCopy() {
    const copyBtn = document.querySelector(".copy-email-btn");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", () => {
        const email = copyBtn.getAttribute("data-email");
        const emailTextEl = copyBtn.querySelector(".email-text");
        const originalText = emailTextEl ? emailTextEl.innerText : email;

        // Clipboard API with fallback
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(() => {
                showCopiedState(copyBtn, emailTextEl, originalText);
            }).catch(() => {
                fallbackCopy(email, copyBtn, emailTextEl, originalText);
            });
        } else {
            fallbackCopy(email, copyBtn, emailTextEl, originalText);
        }
    });
}

function fallbackCopy(text, btn, emailTextEl, originalText) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand("copy");
        showCopiedState(btn, emailTextEl, originalText);
    } catch (e) {
        // Silently fail — button stays unchanged
    }
    document.body.removeChild(textarea);
}

function showCopiedState(btn, emailTextEl, originalText) {
    btn.classList.add("copied");
    if (emailTextEl) emailTextEl.innerText = "";

    setTimeout(() => {
        btn.classList.remove("copied");
        if (emailTextEl) emailTextEl.innerText = originalText;
    }, 2000);
}

// ============================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================
function setupReveal() {
    const reveals = document.querySelectorAll(".reveal");

    const observerOptions = {
        root: null,
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
}

// ============================================
// THEME TOGGLE
// ============================================
const SUN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const MOON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

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
            toggleIcon.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
            toggleIcon.style.transform = "rotate(360deg)";
            setTimeout(() => {
                toggleIcon.style.transform = "none";
            }, 500);
        }
    });
}

// ============================================
// CERTIFICATE MODAL
// ============================================
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

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    
    function openModal(title, src, type) {
        modalTitle.innerText = title;
        modalBody.innerHTML = "";
        
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        // Trap focus inside modal
        closeBtn.focus();
        
        if (type === "pdf") {
            if (isMobile()) {
                const safeTitle = escapeHtml(title);
                modalBody.innerHTML = `
                    <div class="mobile-fallback-view">
                        <div class="mobile-fallback-title">${safeTitle}</div>
                        <div class="mobile-fallback-meta">PDF Certificate Document</div>
                        <a href="${encodeURI(src)}" class="mobile-view-btn" target="_blank" rel="noopener">Open Certificate</a>
                    </div>
                `;
            } else {
                const iframe = document.createElement("iframe");
                iframe.src = src;
                iframe.title = title;
                modalBody.appendChild(iframe);
            }
        } else if (type === "json") {
            modalBody.innerHTML = `
                <div class="json-container">
                    <div class="json-header">
                        <button class="copy-json-btn">Copy JSON</button>
                    </div>
                    <pre class="json-code-block">Loading credential data...</pre>
                </div>
            `;
            
            fetch(src)
                .then(response => {
                    if (!response.ok) throw new Error("Network response was not ok");
                    return response.json();
                })
                .then(data => {
                    const jsonString = JSON.stringify(data, null, 2);
                    const codeBlock = modalBody.querySelector(".json-code-block");
                    if (codeBlock) codeBlock.textContent = jsonString;
                    
                    const copyJsonBtn = modalBody.querySelector(".copy-json-btn");
                    if (copyJsonBtn) {
                        copyJsonBtn.addEventListener("click", () => {
                            if (navigator.clipboard && navigator.clipboard.writeText) {
                                navigator.clipboard.writeText(jsonString).then(() => {
                                    copyJsonBtn.innerText = "Copied! ✓";
                                    copyJsonBtn.classList.add("copied");
                                    setTimeout(() => {
                                        copyJsonBtn.innerText = "Copy JSON";
                                        copyJsonBtn.classList.remove("copied");
                                    }, 2000);
                                });
                            }
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
        document.body.style.overflow = "";
        setTimeout(() => {
            if (!modal.classList.contains("active")) {
                modalBody.innerHTML = "";
            }
        }, 350);
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
    
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}

// ============================================
// BACK TO TOP
// ============================================
function setupBackToTop() {
    const backToTopBtn = document.getElementById("back-to-top");
    if (!backToTopBtn) return;
    
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 400) {
                    backToTopBtn.classList.add("visible");
                } else {
                    backToTopBtn.classList.remove("visible");
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ============================================
// INTERACTIVE BACKGROUND GRID CANVAS
// ============================================
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
        // Reset transform before applying new scale to prevent compounding
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 100);
    });
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

    // Particle system (monochrome pollen and dust)
    const particles = [];
    const particleCount = 85;
    let lastScrollY = window.scrollY;
    
    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            const isPollen = Math.random() > 0.65;
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: isPollen ? (2 + Math.random() * 4) : (0.8 + Math.random() * 1.2), // pollen: 2-6px, dust: 0.8-1.2px
                alpha: isPollen ? (0.2 + Math.random() * 0.3) : (0.1 + Math.random() * 0.2),
                isPollen: isPollen
            });
        }
    }
    initParticles();

    function animate() {
        const scrollY = window.scrollY;
        const deltaScrollY = scrollY - lastScrollY;
        lastScrollY = scrollY;

        // Subtle drift in background pattern
        driftX += 0.12;
        driftY += 0.06;

        // Smoothly interpolate spotlight position to mouse position
        if (mouseX === -1000 && targetMouseX !== -1000) {
            mouseX = targetMouseX;
            mouseY = targetMouseY;
        } else if (targetMouseX !== -1000) {
            mouseX += (targetMouseX - mouseX) * 0.08;
            mouseY += (targetMouseY - mouseY) * 0.08;
        } else {
            mouseX += (-1000 - mouseX) * 0.08;
            mouseY += (-1000 - mouseY) * 0.08;
        }

        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains("dark-theme");
        const baseLineColor = isDark ? "rgba(255, 255, 255, 0.025)" : "rgba(0, 0, 0, 0.025)";
        const activeLineColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

        const scrollY = window.scrollY;
        const scrollX = window.scrollX || 0;

        const offsetX = (driftX - scrollX) % gridSpacing;
        const offsetY = (driftY - scrollY) % gridSpacing;

        const startX = offsetX - gridSpacing;
        const startY = offsetY - gridSpacing;

        // 1. Draw base sparse dashed grid
        ctx.beginPath();
        ctx.strokeStyle = baseLineColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 14]);

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
            ctx.setLineDash([]);

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

        // Update and draw particles (pollen & dust) with fade on scroll
        const scrollFade = Math.max(0, 1 - (scrollY / (height * 0.8)));
        if (scrollFade > 0) {
            particles.forEach(p => {
                // Update physics: Friction
                p.vx *= 0.94;
                p.vy *= 0.94;
                
                const inertia = p.isPollen ? (p.size / 2) : 1;
                
                // Scroll drift (opposing scroll)
                if (Math.abs(deltaScrollY) > 0.1) {
                    p.vy -= (deltaScrollY * 0.12) / inertia;
                }
                
                // Random float drift
                p.vx += (Math.random() - 0.5) * 0.12;
                p.vy += (Math.random() - 0.5) * 0.08;
                
                // Settle gravity
                p.vy += 0.015 * inertia;
                
                // Mouse attraction
                if (mouseX > -500 && mouseY > -500) {
                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 220) {
                        const force = (220 - dist) / 220;
                        p.vx += (dx / dist) * force * 0.08 / inertia;
                        p.vy += (dy / dist) * force * 0.08 / inertia;
                    }
                }
                
                // Apply velocities
                p.x += p.vx;
                p.y += p.vy;
                
                // Boundary wrapping
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) {
                    p.y = height;
                    p.x = Math.random() * width;
                }
                if (p.y > height) {
                    p.y = 0;
                    p.x = Math.random() * width;
                }
                
                // Draw particle
                ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${p.alpha * scrollFade})` : `rgba(0, 0, 0, ${p.alpha * scrollFade})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================
function setupActiveNavLinks() {
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main > section[id]");
    
    if (!navLinks.length || !sections.length) return;

    // Track intersection status of all sections
    const intersectionStates = {};
    sections.forEach(section => {
        intersectionStates[section.id] = false;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            intersectionStates[entry.target.id] = entry.isIntersecting;
        });

        // Find the first section that is currently intersecting from the top
        let activeSectionId = null;
        for (const section of sections) {
            if (intersectionStates[section.id]) {
                activeSectionId = section.id;
                break;
            }
        }

        // Update links based on active section
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (activeSectionId && href === `#${activeSectionId}`) {
                link.style.color = "var(--text-color)";
                link.style.background = "var(--accent-red-light)";
            } else {
                link.style.color = "";
                link.style.background = "";
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Lower threshold to trigger earlier
        rootMargin: "-70px 0px -40% 0px" // Avoid clashing exactly with 80px scroll-padding-top
    });

    sections.forEach(section => observer.observe(section));

    // Failsafe: clear highlights when scrolled to the very top (Hero section)
    window.addEventListener("scroll", () => {
        if (window.scrollY < 50) {
            navLinks.forEach(link => {
                link.style.color = "";
                link.style.background = "";
            });
        }
    }, { passive: true });
}

// ============================================
// PUBLICATION TOGGLES
// ============================================
function setupPublicationToggles() {
    const toggleBtns = document.querySelectorAll(".toggle-details-btn");
    
    toggleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const article = btn.closest(".publication");
            if (!article) return;
            
            const collapseDiv = article.querySelector(".pub-details-collapse");
            if (!collapseDiv) return;
            
            const isExpanded = collapseDiv.classList.toggle("expanded");
            btn.setAttribute("aria-expanded", isExpanded ? "true" : "false");
            
            if (isExpanded) {
                btn.innerHTML = `Hide Summary &uarr;`;
                collapseDiv.style.maxHeight = collapseDiv.scrollHeight + "px";
            } else {
                btn.innerHTML = `View Summary &darr;`;
                collapseDiv.style.maxHeight = "0px";
            }
        });
    });
}

// ============================================
// INIT
// ============================================
window.addEventListener("DOMContentLoaded", () => {
    setupReveal();
    setupEmailCopy();
    setupThemeToggle();
    setupCertificateModal();
    setupBackToTop();
    setupGridCanvas();
    setupActiveNavLinks();
    setupPublicationToggles();
});
