# Walkthrough: Certificate Embeds, Academic Profile, & UI Polishing

Successfully implemented interactive credential embedding, academic sections from the CV, a Light/Dark theme toggle, compact scientific timeline layout with circle indicators, a Bauhaus-themed Floating Back to Top Button, and enhanced footer spacing.

---

## 🚀 Key Achievements

1.  **Interactive Infinite Background Grid:** Created `#grid-canvas` rendering a slowly drifting, scrolling-responsive, 75% sparse dotted grid. Implemented smooth lerped mouse spotlight tracking that highlights active grid cells without drawing any red intersection dots.
2.  **Two-Column Certifications Grid:** Re-designed the certifications grid layout to use a `2fr 1fr` ratio, placing the 5 "AI & Data Science" certificates in a nested two-column grid (`.cert-sub-grid`) to balance them perfectly against the 2 "Business & Essentials" certificates.
3.  **Monochrome Dark Mode & Email Icons:** Replaced the colored emojis with clean monochrome SVG vectors. The email copy button features a monochrome envelope vector, and the dark mode toggle features a monochrome moon/sun vector, both of which adapt dynamically to theme colors.
4.  **Boxed Scientific Experience Timeline:** Unified the visual layout by wrapping the Scientific Experience timeline inside a card-like Neo-minimalist box (`.publication.experience-box`), complete with custom padding and mobile compatibility.
5.  **Grammar & Description Audit:** Polished Ericales, Fagaceae, and Gnetum summaries (e.g. changing to "pollen grains" to match plural pronouns) and corrected roles/descriptions in the Scientific Experience timeline to use consistent parallel phrasing.

---

## 📁 File Changes

### System & Infrastructure
*   **[NEW]** [docs/my_profile/certificate/](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/my_profile/certificate) - Holds all PDF and JSON credentials.
*   **[DELETE]** `my-profile/` - Cleaned up the redundant temporary directory at the repository root.
*   **[NEW]** [CONTEXT.md](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/CONTEXT.md) - Documented domain terminology (palynology/Bauhaus) and architecture logic.

### Website Assets
*   **[MODIFY]** [docs/index.html](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/index.html) - Injected grid canvas markup, dark mode SVG toggle nodes, modal templates, academic profile markup, and polished the experience descriptions.
*   **[MODIFY]** [docs/style.css](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/style.css) - Established grid canvas styles, certification sub-grid ratios, experience card boxes, and dark mode SVG transitions.
*   **[MODIFY]** [docs/script.js](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/script.js) - Added inline SVG toggle constants, updated theme switcher logic, and coded the interactive canvas rendering loop.

---

## 🧪 Verification Results

*   **Interactive Background Grid:** Canvas scales correctly to any device scale/DPR. The pattern drifts slowly, scrolls with the page, and reacts to the cursor by highlighting lines under the cursor radius without any red intersection dots.
*   **Certifications Alignment:** The cards under "AI & Data Science" render in two columns on desktop, aligning perfectly in width with the single column of "Business & Essentials".
*   **Monochrome Icons:** Checked the header email copying button and the dark/light mode toggle. The icons use vector SVGs styling with currentColor, responding perfectly to light/dark themes and styling states.
*   **Boxed Experience:** The timeline fits neatly inside a bordered, shadow-elevated `.publication` container.
*   **Grammar Alignment:** Publications and experience items use parallel, grammatically correct terms and flow naturally.

