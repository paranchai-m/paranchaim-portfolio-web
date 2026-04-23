# Project: Paranchai Malaikanok Portfolio (Neo-minimalist Bauhaus)

## Project Overview
This project is a professional portfolio website for **Paranchai Malaikanok**, a palynologist specializing in fossil pollen of Southeast Asia. The website follows a **Neo-minimalist Bauhaus** aesthetic, emphasizing high-contrast layouts, geometric precision, and authoritative modernism, combined with modern **Neo-Minimal floating cards**.

- **Technologies:** HTML5, CSS3 (Google Fonts: Space Grotesk, Inter), Vanilla JavaScript.
- **Style Archetype:** "Neo-minimalist Bauhaus" + "Neo-Minimal Cards" (Vibrant red accents, bold geometric sans-serif headings, sticky top navigation, and interactive floating boxes).
- **Theme Colors:** Bauhaus Red (`#E3120B`), Stark Black (`#000000`), Crisp White background, and Soft Shadows.

## Key Sections
- **Hero:** A high-impact masthead using **Space Grotesk** featuring a signature light-grey long dash (550px) aligned to the surname and a welcoming emoji (👋).
- **Top Nav:** A sticky navigation bar with a redesigned "Contact Me" pill button aligned to the right.
- **Selected Publications:** Detailed research summaries formatted with **justified text** and housed in interactive floating cards with pop-up animations.
- **Certifications:** A responsive grid grouped by issuer ("Google for Education" and "DataRockie School"), featuring professional credentials with completion years and direct links to local PDF and JSON certificates.

## Directory Structure
- `index.html`: Semantic structure including Publications and Certifications.
- `style.css`: Implements the hybrid Bauhaus-Minimal identity, grid layouts, and justified typography.
- `script.js`: Intersection Observer for reveal animations.
- `plan.md`: Historical development roadmap.
- `my_profile/`: Source documents (PDFs and images) for profile and publication updates.

## Research Highlights
1. **Fagaceae Community Assembly (2023):** Evidence of tropical oak forests in Thailand dating back to the Eocene.
2. **Ericales Diversity & Stratified Forests (2025):** Morphological analysis of fossil Ericales suggesting vertical vegetation zones in the late Oligocene.
3. **Gnetum Pollen Morphology (2018):** Study of harmomegathic characters in Thai Gnetum species.
4. **Kho Hong Hill Flora (2023):** Documentation of gymnosperm and monocot pollen diversity.

## Development Conventions
- **Typography:** Headings and labels use **Space Grotesk**. Body text uses **Inter** with `text-align: justify` for publication details.
- **Interactivity:** Content blocks use `.reveal` for scroll-triggered pop-up animations and `:hover` states for interactive lift.
- **Geometry:** Maintain high-contrast layouts with sticky nav combined with soft-shadowed white cards for content.
