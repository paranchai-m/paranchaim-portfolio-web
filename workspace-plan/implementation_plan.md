# Embed Certificates, Academic Profile, & UI Polishing

Implement an interactive Neo-minimalist portfolio website displaying professional credentials, education, scientific experience, and publication records.

---

## User Review Required

> [!NOTE]
> During the design review, the following design decisions were finalized:
> 1. **Pill Buttons:** Convert existing certification text links to uniform Bauhaus-themed pill buttons labeled simply `View`.
> 2. **No JSON Button:** Remove the `View JSON` button to keep actions simple.
> 3. **Desktop Modal Dimensions:** The modal overlay will render at an immersive size (85% viewport width and height) to make certificate text readable directly.
> 4. **Mobile Adaptability:** On mobile devices, the modal will display certificate info and a clean button to open in a new tab to bypass bad iframe scroll support on mobile.
> 5. **Light/Dark Mode Toggle:** A high-contrast theme toggle will be integrated into the sticky top navigation.
> 6. **Two-column Grid Layout:** Combine 'AI & Education' & 'Data Science & Analysis' into a single column named 'AI & Data Science'. The columns display with mixed casing (e.g. 'Business & Essentials' and 'AI & Data Science') instead of forcing all-caps.
> 7. **Academic Sections:** Add Education and Scientific Experience sections loaded from the user's CV behind the Certifications section.
> 8. **View CV Action:** Add a prominent "View CV" button in the Hero section linking to the CV PDF.
> 9. **Stark Bauhaus Timeline:** Build a timeline with circular indicators (black in light theme, adjusting in dark theme) and a vertical divider for Scientific Experience.
> 10. **Timeline Compactness:** Inline the year and role inside the Scientific Experience section to reduce vertical layout space.
> 11. **Floating Back to Top Button:** Create a fixed, high-contrast, Bauhaus-styled back-to-top button that fades in when scrolled past 300px and smoothly scrolls back to the top when clicked.
> 12. **Footer Spacing:** Increase footer vertical padding and top margins to ensure a balanced, professional bottom spacing.

---

## Open Questions

No outstanding open questions.

---

## Proposed Changes

### 1. File Reorganization

We will move the recovered certificate files into the proper directory inside `docs/` so they can be hosted and read by GitHub Pages.

#### [NEW] [docs/my_profile/certificate](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/my_profile/certificate)
- Move all files from `my-profile/certificate/` to `docs/my_profile/certificate/`.

#### [DELETE] [my-profile](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/my-profile)
- Remove the temporary `my-profile/` root directory to keep the workspace clean.

---

### 2. Website Structure & Styling (`docs/` component)

#### [MODIFY] [index.html](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/index.html)
- Add a hidden modal overlay element structure (`#cert-modal`) to the body.
- Update the certification columns: combine `AI & Education` and `Data Science & Analysis` under the new column header `AI & Data Science`. Keep the other column under `Business & Essentials`.
- Update certification buttons: use a single `View` pill button for each certificate.
- Add basic SEO and Open Graph metadata inside the `<head>` section.
- Add a Dark Mode toggle button inside the `.nav-wrapper` in the sticky top navigation.
- Add "View CV" link inside the `.hero` section.
- Add `<section id="education">` and `<section id="scientific-experience">` at the end of the `<main>` tag, behind Certifications.
- Add floating `<button id="back-to-top">` structure at the end of the body.

#### [MODIFY] [style.css](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/style.css)
- Update `.cert-types-container` to grid-template-columns: 2fr 1fr for the main layout, and define `.cert-sub-grid` as grid-template-columns: repeat(2, 1fr) to render 'AI & Data Science' certificates in two balanced columns.
- Update `.cert-type-column h4` text-transform from uppercase to none to display mixed-case headers.
- Implement CSS classes for the modal container (`.modal-overlay`, `.modal-container`, `.modal-header`, `.modal-body`, `.modal-close`).
- Apply the **Neo-minimalist Bauhaus** theme to the modal: stark black border, sharp shadow, glassmorphism background blur, and smooth fade-in animations.
- Define theme variables (`--bg-color`, `--text-color`, `--card-bg`, etc.) and support a `.dark-theme` modifier on the `body` for Light/Dark mode.
- Style the Light/Dark mode toggle switch in the navigation bar.
- Add timeline CSS rules for Scientific Experience: inline the year and role using inline styling on `.exp-year` and `.exp-content` and `.exp-role`, with bullet separator `::after` on `.exp-year`.
- Style `.experience-box` with padding (`3rem` on desktop, `1.5rem` on mobile) to wrap the timeline inside a clean Neo-minimal card.
- Change `.experience-item::before` timeline indicators to circular dots (`border-radius: 50%`) styled with the theme text color (black in light mode).
- Fix `.greeting-badge` color to `#FFFFFF` so the "Welcome!" text is readable.
- Add `.back-to-top-btn` fixed position button styling with Bauhaus 3D offset shadow and hover transition.
- Increase footer vertical padding to `5rem` and add a `margin-top` of `6rem` to create spacing.
- Style `#grid-canvas` as fixed background (`position: fixed; z-index: -1; pointer-events: none;`) supporting color stroke transitions.
- Apply high-contrast z-index layering to ensure canvas transparency and visibility over section backgrounds.

#### [MODIFY] [script.js](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/script.js)
- Add event listeners to the certificate trigger buttons.
- Implement JavaScript logic to open the modal, dynamically load the PDF in an `<iframe>`, and close the modal.
- Include mobile viewport detection to display a simple "Open Certificate" fallback button instead of the iframe inside the modal.
- Implement Light/Dark mode persistence using `localStorage` and swap monochrome SVG path outlines (`SUN_SVG` and `MOON_SVG`) inside `.innerHTML` rather than text emojis.
- Implement `setupBackToTop()` function to detect scroll position, toggle button visibility, and perform scroll-to-top behavior.
- Implement `setupGridCanvas()` animation loop to render the drift, page scroll-offset, and spotlight cursor tracking.

---

## Verification Plan

### Automated Tests
- None.

### Manual Verification
- **Verification steps:**
  1. Open `docs/index.html` in the web browser.
  2. Verify the certifications section has exactly two columns: "AI & Data Science" and "Business & Essentials".
  3. Verify the column headers use proper upper and lower cases.
  4. Verify all certification cards have a single action button labeled "View".
  5. Verify "Welcome!" badge has white text on a red background.
  6. Verify "View CV" button renders properly and opens the CV PDF in a new tab.
  7. Verify the "Education" and "Scientific Experience" sections appear in order below Certifications.
  8. Verify Scientific Experience is compact with circular indicators, displaying the year and role inline separated by a bullet.
  9. Verify the footer is separated by a nice margin/padding from the content.
  10. Scroll down and verify that the "Back to Top" button fades in after 300px.
  11. Click the "Back to Top" button and verify that the page scrolls smoothly to the top and the button disappears.
  12. Check dark mode toggle and verify the back-to-top button and timeline circles adapt to themes.
  13. Verify the grid background has no red dots on line intersections, and check that the email copy button uses a clean monochrome SVG envelope icon.
