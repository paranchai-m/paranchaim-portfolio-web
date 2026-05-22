# Implementation Plan - Academic Experience Section Redesign

We will rename the "Scientific Experience" section to "Academic Experience", update the Research Assistant duration to 2021 – 2025, place the years to the left of the vertical timeline line, and update role positions to fit an academic context.

## User Review Required

> [!NOTE]
> On desktop displays, the timeline vertical line will be indented further to the right (`margin-left: 11.5rem`) to provide clean spacing (`10rem` width) for the year numbers on the left of the timeline line. On mobile devices, the timeline will collapse to a stacked layout where the year numbers are shown above their respective roles, maintaining readability and avoiding narrow text columns.

## Proposed Changes

### Portfolio Web Application

---

#### [MODIFY] [index.html](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/index.html)
- Rename the section ID/class/heading from "Scientific Experience" to "Academic Experience".
- Update the Research Assistant duration from `2021 – 2024` to `2021 – 2025` and move it to the first timeline position to highlight the primary long-term academic role.
- Revise all roles (`.exp-role`) to academic terminology:
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

#### [MODIFY] [style.css](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/style.css)
- Increase `.experience-timeline` margin on desktop to `11.5rem` and padding-left to `2.5rem` to create space for the left-aligned years.
- Reposition `.exp-year` to be absolute-positioned to the left of the vertical line on desktop (`left: -13.5rem`, `width: 10rem`).
- Remove the inline bullet point (`::after` content) from `.exp-year`.
- Make `.exp-content` and `.exp-role` display block level.
- Add responsive overrides to restore standard vertical layout on mobile devices (max-width: 768px) so that the text does not overflow or become too narrow.

## Verification Plan

### Manual Verification
- We will inspect the generated layout visually in the browser to ensure:
  1. The year appears on the left of the vertical line on desktop viewports.
  2. The timeline bullet dots align correctly with the rows.
  3. The titles and descriptions sit to the right of the vertical line.
  4. On mobile/tablet widths (<= 768px), the layout falls back gracefully to a vertical stack.
  5. The section title is updated to "Academic Experience".
  6. The Research Assistant's year range is "2021 – 2025" and is at the top of the timeline.
  7. All revised role titles are correctly formatted.
