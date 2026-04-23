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

window.addEventListener("DOMContentLoaded", () => {
    reveal();
    setupEmailCopy();
});
console.log("Portfolio animations and utilities initialized.");
