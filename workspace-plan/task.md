# Checklist: Embed Certificates & UI Refinements

Track progress during implementation.

## Completed Tasks

- [x] **1. File Reorganization**
  - [x] Move `my-profile/certificate` folder to `docs/my_profile/certificate`
  - [x] Delete temporary `my-profile` root directory
- [x] **2. HTML Updates (`docs/index.html`)**
  - [x] Clean up layout placeholder comments
  - [x] Inject SEO meta tags and Open Graph tags in `<head>`
  - [x] Add Light/Dark Mode toggle element structure in `.nav-wrapper`
  - [x] Add `#cert-modal` structural nodes in `<body>`
  - [x] Replace certificate anchor links with styled pill buttons using data attributes
  - [x] Add floating `#back-to-top` button tag right before closing body
- [x] **3. CSS Styles (`docs/style.css`)**
  - [x] Define custom properties for Light/Dark themes and support `.dark-theme` modifier
  - [x] Style the sticky nav theme toggle switch
  - [x] Style certificate card action pill buttons
  - [x] Style the responsive modal overlay, container, header, body, and close button
  - [x] Style syntax-highlighted JSON rendering and copy button
  - [x] Redesign Scientific Experience: reduce timeline item margin to `1.25rem` for compactness
  - [x] Style timeline indicators (`.experience-item::before`) as circles (`border-radius: 50%`) utilizing theme text/border color
  - [x] Inline the timeline year and role layout with a bullet separator `::after` on `.exp-year`
  - [x] Style the Bauhaus-themed Floating Back to Top Button (`.back-to-top-btn`) with offset shadow and active pressed translations
  - [x] Increase footer padding to `5rem` and add a `6rem` top margin for proper breathing room
- [x] **4. JavaScript Functions (`docs/script.js`)**
  - [x] Implement Light/Dark mode toggle logic and save state to `localStorage`
  - [x] Implement mobile/tablet screen size check
  - [x] Implement modal trigger open event listeners for PDF/JSON data attributes
  - [x] Implement JSON formatting and clipboard copy functionality
  - [x] Implement modal closing triggers (button click, overlay click, escape key)
  - [x] Implement scroll-detection and click events in `setupBackToTop()` to handle Floating button display and smooth scroll
- [x] **5. Verification**
  - [x] Verify light/dark theme transition and persistence
  - [x] Verify PDF modal rendering on desktop
  - [x] Verify JSON modal formatting and copying behavior on desktop
  - [x] Verify modal closing mechanisms
  - [x] Verify mobile viewport layout and direct download/view behavior
  - [x] Verify timeline items display inline (year &middot; role) and fit in compact format
  - [x] Verify circle indicators scale correctly on hover in both desktop and mobile
  - [x] Verify Back to Top button shows after 300px scrolling, animates on hover/press, and performs smooth scroll
  - [x] Verify footer spacing is visually appealing and consistent
- [x] **6. Design & Background Refinements**
  - [x] Remove the "View CV" button from the hero section to simplify call-to-actions
  - [x] Box the Scientific Experience timeline inside a card-like layout (`.publication`) to unify styling with other sections
  - [x] Align the certificates grid: place "AI & Data Science" (5 items) inside a nested 2-column grid (`.cert-sub-grid`) and adjust main layout to a `2fr 1fr` split for balanced column widths
  - [x] Replace colorful "🌙" emoji in dark mode with a clean, monochrome inline SVG moon icon that adapts to theme stroke color
  - [x] Conduct full grammatical audit of all sections (e.g. refining Ericales objectives, Gnetum description, and experience descriptions for consistency and parallel structures)
  - [x] Implement the `#grid-canvas` background featuring an infinitely scrolling, slowly drifting, 75% sparse dotted grid that responds dynamically to mouse movement with a spotlight reveal effect
- [x] **7. Grid & Contact Icon Enhancements**
  - [x] Remove red intersection dots from interactive grid canvas rendering in `docs/script.js`
  - [x] Verify email envelope icon is monochrome and adapts to light/dark themes

