# Walkthrough - Academic Experience Timeline Redesign

I have completed the requested updates to transition "Scientific Experience" to "Academic Experience", adjust the vertical timeline layout, and revise the role titles to align with an academic context.

## Changes Made

### Content Revisions ([index.html](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/index.html))
- **Section Renaming**: Renamed section header, comment, and element ID to `academic-experience`.
- **Duration & Order Update**: Updated `Research Assistant` period to `2021 – 2025` and pinned this role at the very top of the experience timeline to highlight the primary long-term research activity.
- **Academic Role Titles**: Refined all timeline role positions to use academic terminology:
  1. `Research Assistant` &rarr; `Research Assistant`
  2. `Staff` (Fossil Festival) &rarr; `Temporary Academic Staff`
  3. `Staff` (Open House) &rarr; `Temporary Academic Staff`
  4. `Participant` (Geological Survey) &rarr; `Field Research Collaborator`
  5. `Presenter` (PastBioDivSEA21) &rarr; `Conference Presenter`
  6. `Presenter` (Taxonomy & Systematics) &rarr; `Conference Presenter`
  7. `Exchange Student` &rarr; `Exchange Research Scholar`
  8. `Participant` (Flora of Thailand) &rarr; `Conference Delegate`
  9. `Participant` (Botanical Conference) &rarr; `Conference Delegate`
  10. `Internship Student` &rarr; `Research Intern`

### Layout Redesign ([style.css](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/style.css))
- **Desktop Layout**:
  - Increased `.experience-timeline` left margin to `11.5rem` and padding to `2.5rem` to leave space on the left side of the vertical timeline line.
  - Positioned `.exp-year` absolutely at `left: -13.5rem` with a width of `10rem` and text aligned to the right. This positions the year number perfectly to the left of the vertical timeline line.
  - Removed the inline bullet separator (`::after` content) from `.exp-year`.
  - Adjusted the hover highlight bullet dot (`::before`) coordinate to `left: calc(-2.5rem - 5px)` to align exactly with the new padding of the vertical timeline line.
  - Modified `.exp-content` and `.exp-role` to be block-level for clean spacing.
- **Mobile Layout (max-width: 768px)**:
  - Kept `.experience-timeline` left margin compact.
  - Reset `.exp-year` positioning to `static` and block flow to stack it above the academic role title, ensuring perfect responsiveness without visual overflow.

## Verification & Validation Results

1. **Static Code Validation**: Checked the Git diff and verified that all changes compile, with zero remaining occurrences of `scientific` or `2021 – 2024` in the experience section.
2. **Layout Math Verification**:
   - On desktop, the vertical border of `.experience-timeline` is at `x = -2.5rem` relative to the item.
   - The year (`.exp-year`) spans from `-13.5rem` to `-3.5rem` (width: `10rem`), leaving a clean gap of `1.0rem` (minus the 2px border width) before the timeline border.
   - The bullet dot (`::before`) is centered at `-2.5rem - 1px`, aligning pixel-perfectly with the 2px left border.
   - On mobile, the layout stacks the year label above the role, preventing text wrapping or offscreen overflow.
