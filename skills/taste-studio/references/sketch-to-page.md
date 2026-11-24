# From selected sketch to working page

Use this procedure after the owner has chosen a direction and requested implementation. Preserve the agreed brief and design workflow. Keep project decisions and evidence in the active project, outside the installed skill.

## Extract the decisions before choosing the technique

Open the selected image at its intended size alongside the real content and owner's feedback. Record a compact decision map in the existing design specification or implementation notes:

| Read from the sketch | Record and map to implementation |
| --- | --- |
| Composition | Major masses, relative scale, alignments, overlap, entry/exit edges, and reading order; assign layout relationships rather than tracing every pixel. |
| Visual focus | What draws the eye first and how it leads to the visitor's next action; preserve this hierarchy in live content. |
| Text clear space | The area reserved around the title, supporting copy, and action; map it to column widths, padding, and a protected image crop. |
| Material and light | Surface texture, saturation, transparency, light direction, and shadow softness; decide what belongs in imagery and what CSS can express faithfully. |
| Defining details | Name the exact crop, line, flourish, or material effect that gives this direction character and the role it plays; record what must survive at each size. |

For each row, distinguish **observed in the image**, **owner feedback**, and **implementation proposal**. Do not invent a reason for the owner's choice. If a tiny sketch cannot establish the branch origin or light direction, say so and label the proposed interpretation. Resolve ambiguity with the owner only when it would change the selected direction or task.

## Split layout, content, and visual assets

Inventory the actual files before generating replacements. Record each proposed layer's source, role, dimensions/quality, crop or anchor, and desktop/phone treatment. Separate only what needs independent positioning, cropping, or state changes; a single suitable photograph can remain intact.

- **Background:** express simple color and gradients in CSS. Reuse or generate a clean texture/image plate when material or light cannot be reproduced convincingly in CSS. Keep it free of baked-in UI text.
- **Decoration:** isolate branches, petals, flourishes, or foreground elements only when the composition needs it. Use SVG for a suitable existing line motif, transparent imagery for photographic cutouts, and correct stacking. Decorative layers must not intercept taps or focus, obscure copy, or be announced as product content.
- **Subject:** preserve the focal crop and aspect ratio of the product or person. Keep meaningful imagery available to assistive technology. Reserve image space to avoid layout jumps as assets load or change.
- **Content and controls:** implement headings, descriptions, navigation, selectors, and calls to action as semantic HTML. A flattened mockup with invisible hotspots is not the implemented page. Keep candidate labels, critique notes, seed strings, and design-comparison controls out of the visitor interface.

For a missing asset, use the host's image generation/editing tool with the chosen sketch as a visual reference. Request the specific layer and preserve its palette, material, lighting, and crop; request transparency where needed. Inspect it before integrating. Do not replace the whole composition to solve one missing element. If a required tool or adequate asset is unavailable, record the placeholder and the resulting visual gap.

## Specify desktop and phone relationships

Define target sizes and a short layout rule for each before coding. On desktop, preserve the focal balance, text clear space, important overlaps, and the relationship between product information and its action. Use normal document flow or grid for content; reserve positioned layers for intentional art direction.

On phones, explicitly decide content order, focal crop, heading wraps, selector arrangement, action position, and decoration scale/removal. Recompose instead of shrinking the desktop canvas. Use readable type and comfortably tappable controls; for the florist exercise, use at least 44 by 44 CSS pixels for selection targets. Check long real labels, image changes, and the boundary where columns stack. Avoid horizontal page overflow and controls that require hover. Keep essential facts and the next action available even when decoration is reduced.

## Implement the brief's task route

Refine and implement the entry → decision → feedback → continue/return route already established in the brief. Use the shared contract in [Interaction and motion](interaction-and-motion.md); record concrete states, retained context, stable/changing/continuity elements, exit/entry choreography, timing roles, interruption, and applicable recovery behavior before coding. Resolve missing decisions here without replacing the task with a convenient isolated demo. Bouquet switching is one example, not a requirement for other pages.

Map the contract onto semantic controls and live data in the project's stack. Keep ordinary state updates and navigation working without the optional animation mechanism. The interaction reference owns the event patterns, continuity rules, and motion acceptance probes; do not maintain a second competing state table here.

## Verify the running page and keep evidence

Start the project using its normal development command and open its actual URL in a browser. Use the selected sketch as the desktop composition reference and the agreed phone rules as the mobile reference. If only a phone sketch exists, identify the desktop composition as an adaptation rather than claiming a pixel match.

| Check | Browser action and acceptance evidence |
| --- | --- |
| Desktop composition | Open the agreed desktop viewport; compare focal point, crop/entry edges, text space, material/light, defining detail, and action placement. Save an initial screenshot. |
| Phone layout | Open the agreed phone viewport; inspect wrapping, cropping, controls, and section boundaries by scrolling. Check the stacking breakpoint too. Save an initial phone screenshot. |
| Interaction and access | Run the applicable acceptance probes in [Interaction and motion](interaction-and-motion.md), including normal/rapid/reverse input, synchronized state, return/focus/history, touch/keyboard, reduced motion, and loading/recovery. Record the inputs and observations; capture changed and focused states. |

Use the project's review location, or `.taste-studio/review/<page>/`. Name files with viewport and state, for example `desktop-1440-initial.png`, `phone-390-selected.png`, and `keyboard-focus.png`. Capture actual browser output rather than regenerating an image of the intended result. Retain evidence of the corrected state after a fix.

Deliver the working page and a concise report containing:

- Selected reference, owner-valued detail, decision map, reused/new assets, and responsive adaptations.
- How to run/open the result, tested URL, browser, and viewport dimensions.
- Checks performed, actions, expected and observed outcomes, pass/fail/untested status, and screenshot paths.
- Remaining deviations, unavailable tools, or untested behavior. Do not claim browser or touch verification from source inspection or a written plan.

Complete runtime acceptance only when the primary task works at both sizes, dependent state stays consistent, applicable continuity/recovery and keyboard/reduced-motion paths work, and consequential visual findings are fixed or explicitly accepted. Return to the owner's original feedback when reporting what survived.

When revising an existing site, identify the checkout served by the owner's preview and inspect its working tree first. Apply the selected changes there while preserving ongoing edits. For a content-led ending, test short and tall windows as well as narrow screens: keep the full subject, final question, and signature reachable as text wraps.
