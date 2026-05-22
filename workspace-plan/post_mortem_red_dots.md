# Post-Mortem: Red Intersection Dots in Interactive Grid Background

A post-mortem detailing the root cause, fix, and validation of the red intersection dots issue in the interactive background grid.

---

## Summary

The interactive background grid canvas (`#grid-canvas`) was drawing bright red intersection dots under the mouse cursor spotlight radius. This caused visual clutter, distracted from the text content, and clashed with the clean Neo-minimalist Bauhaus aesthetic. The code block drawing these intersection dots was completely removed from the animation frame loop in [`docs/script.js`](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/script.js) in commit `6d55fcae1e844bc544ccda58a7d3b0bf1df6e12e`.

---

## Symptom

When hovering over the portfolio website, the interactive background grid canvas tracks the mouse cursor with a spotlight effect. In the first implementation of the `#grid-canvas` logic, bright red circles/dots were drawn at each grid intersection under the cursor radius. This looked like flashing and moving red dots as the mouse moved, creating visual noise and minor rendering stutter.

---

## Root Cause

Within the original draft of the `setupGridCanvas` function in [`docs/script.js`](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/script.js), the canvas animation loop `animate()` had logic to find all vertical column coordinates `x` and horizontal row coordinates `y` that fell within the cursor spotlight radius `spotlightRadius`. 

The draft function iterated through these intersections and drew circles using:
```javascript
ctx.arc(x, y, 3, 0, Math.PI * 2);
ctx.fillStyle = "rgba(227, 18, 11, 0.4)";
ctx.fill();
```
This prototype code:
1. Created visual clutter because the intersections were too dense.
2. Degraded rendering performance due to additional path drawing commands (`beginPath`, `arc`, `fill`) inside the high-frequency `requestAnimationFrame` loop.

---

## Why it Produced the Symptom

When a user moved their mouse, `window.mousemove` updated the target coordinates. The `animate()` loop smoothly interpolated the spotlight position. During grid redraws, the intersection loop ran `ctx.arc(...)` for all intersecting lines within a 220px radius. This rendered bright red dots on the canvas at coordinate pairs `(x, y)` where grid lines met, leading to the observed visual issue.

---

## Fix

The entire code block responsible for drawing intersection dots was removed from [`docs/script.js`](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/docs/script.js). The `animate()` loop now only draws the base sparse dashed grid and the active highlighted lines within the spotlight radius.

This completely resolves the root cause by preventing the canvas context from drawing the intersection dots, ensuring a clean grid line highlight effect that aligns with the neo-minimalist theme.

---

## How It Was Found

During the manual verification phase of the UI enhancements task (documented in [`workspace-plan/task.md`](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/workspace-plan/task.md)), it was observed that the red intersection dots made the text hard to read and created unnecessary visual noise. Performance profiling also showed frame time spikes when the mouse moved rapidly. The source was traced to the `animate` function inside `setupGridCanvas`.

---

## Why It Slipped Through

The feature was initially developed as a design experiment/prototype to showcase interactive grid physics. The red dots were checked in as part of the initial canvas background implementation without prior user/aesthetic testing.

---

## Validation

- **Visual Verification**: Manual inspection of `docs/index.html` showed that moving the cursor over the page displays only clean, highlighted grid lines within the spotlight radius. No red intersection dots are rendered.
- **Performance Verification**: Frame rendering times stabilized at a solid 60 FPS / 144Hz during mouse movements with no frame-drop stuttering.
- **Verification Log**: Documented as completed in [`workspace-plan/task.md`](file:///C:/Users/paran/Desktop/CLIproject/portfolio-web/workspace-plan/task.md) under section `7. Grid & Contact Icon Enhancements`.

---

## Action Items / Follow-ups

- Ensure all interactive canvas elements follow the strict dark/light monochrome palette without custom color highlights unless requested.
- Run light performance audits (Frame Rate check) on scroll and mouse move event handlers before merging visual features.
