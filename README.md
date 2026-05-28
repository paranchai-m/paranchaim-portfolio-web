# Paranchai Malaikanok Portfolio

## Palynologist (Southeast Asia)

A professional, interactive portfolio website for **Paranchai Malaikanok**, showcasing research highlights, publications, academic credentials, and professional certifications. 

The site features a **Neo-minimalist Bauhaus** aesthetic—fusing authoritative modernism, stark contrast, and geometric shapes with smooth, interactive digital layers.

---

## 🎨 Key Features & Aesthetics

### 1. Neo-minimalist Bauhaus Design
* **Typography:** Bold geometric headings in **Space Grotesk** paired with highly readable **Inter** body text.
* **Palette:** High-contrast color scheme utilizing Bauhaus Red (`#E3120B`), Stark Black (`#000000`), and Crisp White.
* **Interactive Background Grid:** A custom-built `#grid-canvas` rendering an infinitely scrolling, slowly drifting, 75% sparse dotted grid. It responds dynamically to cursor movements with a smooth lerped spotlight reveal effect.
* **Light / Dark Mode Toggle:** Persistent high-contrast mode switch seamlessly swapping colors and utilizing custom monochrome vector SVGs that coordinate automatically with the text theme.

### 2. Interactive Credential Viewer (Modals)
* Pill-style buttons labeled `View` trigger an overlay modal containing interactive embeds.
* **PDF Certificates:** Embedded directly inside a styled iframe viewer for desktop viewports.
* **JSON Credentials:** Formatted dynamically as syntax-highlighted code blocks with an integrated "Copy" clipboard button.
* **Responsive Fallback:** On mobile screens, the modal displays credentials with direct download/tab actions to circumvent mobile iframe scrolling issues.

### 3. Compact Academic & Experience Sections
* **Education:** Dedicated section showing academic credentials and university details.
* **Scientific Experience:** Wrapped in a boxed card layout featuring a stark timeline, circular node indicators, and inline year/role formatting separated by custom bullets.

### 4. Usability Touches
* **Monochrome Emojis:** Replaced traditional system emojis with high-fidelity vector inline SVGs (moon, sun, and email envelope) matching the typographic color state.
* **Floating Back to Top:** A custom Bauhaus-styled button that fades in once the page is scrolled past 300px, smoothly scrolling the view back to the top.
* **Copy-to-Clipboard Email Button:** A button in the navigation bar displaying the email address. Clicking copies the email address instantly, dynamically updating the icon to a green checkmark and "Copied!" notification.

---

## 🛠️ Tech Stack

* **Structure:** Semantic HTML5
* **Styling:** CSS3 Custom Properties (variables), CSS Grid & Flexbox, Intersection Observer API for scroll reveals, and transition-based micro-animations.
* **Scripting:** Vanilla JavaScript (ES6+) utilizing HTML5 Canvas 2D Context for grid rendering.
* **Fonts:** Space Grotesk & Inter (loaded via Google Fonts)

---

## 📁 Repository Directory Structure

```text
├── CONTEXT.md               # Architecture details, design tokens, and domain vocabulary
├── README.md                # Project overview and local development instructions
├── docs/                    # Production deployment folder hosted on GitHub Pages
│   ├── index.html           # Main landing page markup
│   ├── style.css            # Custom CSS styles, themes, layouts, and animations
│   ├── script.js            # JavaScript functionality and canvas grid animation loop
│   └── my_profile/          # Profile assets
│       ├── CV_Paranchai Malaikanok.pdf
│       └── certificate/     # PDF and JSON certification credentials
├── workspace-plan/          # Local development checklists and walkthroughs
│   ├── implementation_plan.md
│   ├── research_notes.md
│   ├── task.md
│   └── walkthrough.md
```

---

## 🚀 Local Development & Deployment

### 1. Run Locally
To run the portfolio on your local machine:
1. Clone the repository:
   ```bash
   git clone https://github.com/paranchai-m/paranchaim-portfolio-web.git
   ```
2. Open `docs/index.html` directly in any modern web browser or serve it using a local HTTP server (such as Live Server in VS Code).

### 2. GitHub Pages Deployment
The site is structured to deploy automatically via GitHub Pages using the `/docs` folder source.
To configure this:
1. Go to your repository settings on GitHub.
2. Select **Pages** from the sidebar.
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Set the branch to `master` (or your default branch) and choose the folder `/docs`.
5. Save the settings.

---
© 2026 Paranchai Malaikanok. Designed with geometric precision.
