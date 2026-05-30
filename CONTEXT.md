# Project Context & Glossary

This document outlines the domain concepts, technical architecture, and term glossary for the Paranchai Malaikanok Portfolio website.

---

## 🔬 Domain Model & Glossary

### Academic Domain (Palynology)
*   **Palynology:** The scientific study of dust, specifically pollen grains and spores, in both living and fossil states.
*   **Fossil Pollen:** Pollen grains preserved in sedimentary rocks and coal deposits. By analyzing fossil pollen (palynological analysis), scientists can reconstruct ancient plant communities, climates, and environments (palaeoenvironments).
*   **Ericales:** A large and diverse order of dicotyledonous plants (e.g., heathers, tea, blueberries). The 2025 research showcases their historical diversity in northern Thailand to demonstrate stratified mountain forest structures.
*   **Fagaceae:** The beech and oak family. The 2023 research traces tropical oak forests in Thailand back to the Eocene epoch (approx. 34-56 million years ago).
*   **Gnetum:** A genus of gymnospermous flowering plants. The 2018 research investigates their pollen morphology and *harmomegathic* mechanisms (how pollen walls expand or contract to control moisture loss).

### Design Domain (Neo-minimalist Bauhaus)
*   **Bauhaus Red (`#E3120B`):** A vibrant, highly saturated primary red key to the Bauhaus movement, representing utility, modernism, and boldness.
*   **Neo-Minimalist Bauhaus:** A modern evolution of the classic Bauhaus layout. It combines strict grid geometry, stark typography, and primary color blocks with digital elements like soft drop shadows and fluid scroll-reveal animations.
*   **Neo-Minimal Cards:** Floating container units (`.publication`) characterized by rounded corners (`16px`), light borders (`1px solid #eee`), and micro-elevations (`transform: translateY(-8px)`) on hover.
*   **Pollen & Dust Particles:** A high-performance canvas particle system mimicking drifting pollen and microscopic dust. Designed in monochrome styles matching the theme, the particles float upwards when the page is scrolled and swarm dynamically around the cursor spotlight. They cluster in the Hero section to keep content pages readable.

---

## 📁 Repository Context & File Structure

```
/
├── docs/                     ← Main deployment folder (GitHub Pages source)
│   ├── index.html            ← Portfolio landing page
│   ├── style.css             ← Styling, themes, and animations
│   ├── script.js             ← Interactions, copying, and modal logic
│   └── my_profile/           ← Hosted profile resources
│       └── certificate/      ← PDF and JSON certificate credentials
├── project-plan/             ← Historic project planning documents
├── workspace-plan/           ← Agent plans and research notes (user-facing)
└── CONTEXT.md                ← This document (domain and glossary reference)
```

### Architectural Decisions

1.  **Deployment Directory (`/docs`):** To host the portfolio for free on GitHub Pages, the compiled web assets are stored in the `/docs` folder. The GitHub Pages settings must be configured to deploy from the `/docs` directory on the `main` branch.
2.  **Asset Location:** Since only files within the deployed directory are served, all certificate assets are moved from the root `my-profile/` directory to `docs/my_profile/` so they are accessible on the live website.
3.  **Credential Presentation (Modals):**
    *   **PDFs:** Opened inline within an immersive browser-based `<iframe>` overlay (85% size) on desktop/tablet, providing instant readability.
    *   **JSON Credentials:** Displayed as formatted code blocks inside the modal with a copy button.
    *   **Mobile Fallback:** Modals on mobile viewports show certificate details and a direct download/view button, circumventing poor mobile PDF rendering inside iframes.
4.  **Theming (Light/Dark Toggle):** System preferences are respected, but the user is provided a top-nav toggle to shift between classic white-paper Bauhaus and high-contrast dark-charcoal Bauhaus.
5.  **Academic Experience Timeline Structure:** To highlight the primary long-term research role, the '2021 – 2025 Research Assistant' position is pinned at the top of the timeline. Other shorter-term positions (including outreach roles updated to 'Temporary Academic Staff') are listed below in reverse chronological order.
6.  **Background Particle Simulation:** An interactive system displaying monochrome pollen and dust particles in the Hero section. This simulation is drawn directly on the background canvas for performance optimization. It tracks scrolling delta to shift particles upward dynamically and fades them out beyond the first viewport height to preserve text readability in the main content sections.
