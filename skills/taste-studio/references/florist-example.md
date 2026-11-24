# Florist: worked implementation and acceptance example

Use this as a concrete application of [Sketch to page](sketch-to-page.md), not a universal layout or interaction. The exercise defines a visitor-facing flower-shop homepage. It does not turn the Taste Studio design-comparison demo into the flower shop or prescribe changes to that demo.

## Inputs and evidence boundaries

In the Taste Studio source repository, inspect `assets/sketch-bloom.png`, `assets/sketch-list.png`, and `assets/sketch-pickup.png` as the existing direction examples. The bloom sketch is a small phone composition with a centered red bouquet and simplified copy marks. It does not establish a desktop branch entering from an edge. `assets/wordmark-flourish.svg` is an independent gold line used by the Taste Studio masthead; it is not embedded in that florist sketch.

In `assets/florist-bouquets.webp`, a flowering branch enters from the upper-left edge above three vases; warm daylight comes from the right, and the upper-middle wall provides a calm area. Use these observed qualities as a material/composition reference. Other available assets include `assets/florist-petals.webp`, `assets/florist-storefront.webp`, and `assets/flower-pink.png`, `assets/flower-purple.png`, `assets/flower-white.png`. The flower PNGs are 74 by 48 pixel preview images with backgrounds, not transparent high-resolution product cutouts. These paths refer to the source repository, not files bundled inside an installed copy of this skill. Resolve assets in the active project; if absent, obtain appropriate source images rather than assuming these paths exist.

For the exercise below, explicitly treat the following desktop arrangement and sample bouquet records as proposed fixtures. Replace them with the actual chosen sketch and verified product facts in a real implementation. Do not attribute the proposal to prior owner approval or record it as learned taste.

## Decisions to preserve in this exercise

| Detail | Role and concrete implementation proposal |
| --- | --- |
| Flower entry and visual weight | Adapt the scene's branch into a light decorative layer entering from the hero's upper-left edge toward the center, above the title's protected text zone. Place the selected bouquet on the desktop right as the dominant subject. The branch frames the scene and draws the eye inward; it must not compete with the product or cross the title. This desktop arrangement is an exercise adaptation, not a claim about the small source sketch. |
| Space beside the title | Reserve the left text column and the gap before the flowers. This makes the title legible, gives the eye a resting area, and connects the introduction to bouquet selection. Implement it with grid, a bounded line length, and real spacing; do not bake the title into an image. |
| Gold tail | Reuse the existing SVG as a small accent at the end of the brand wordmark, with its color controlled by the theme. It gives the lettering a finishing gesture without competing with flowers or looking like a button. Keep it decorative and outside the reading/tap area. Adapt the motif to a different brand only with the current brief's support. |
| Material and light | Use a warm cream surface, deep red type/action accents, restrained gold, and natural petal texture. Carry the scene's soft right-side window light into the independent subject plate and its shadow. Match every replacement bouquet to that treatment; do not mix a hard flash cutout with a softly lit scene. |

Reuse existing adequate images first. For this layered adaptation, prepare the branch and selected bouquet independently if suitable source layers are absent. Use the chosen reference for color, material, and right-side light; request transparency for the cutout layers. Keep any background plate free of lettering. Inspect each result before implementation. Small preview assets remain acceptable as thumbnails, not stretched hero images.

## Page and responsive rules

Use the active project's stack. Build a real heading, introduction, labeled bouquet selector, selected name and description, and an onward action. For this exercise the action opens a visible details section for the current bouquet. In a real store, use the agreed product/reservation destination and verified availability rather than inventing checkout success or business facts.

- **Desktop target: 1440 by 900 CSS pixels.** Use a two-column hero with title, short introduction, selector, and action on the left, and the active bouquet on the right. Preserve the protected text space, upper-left branch entry, and small gold wordmark accent. Keep the selected name/description close to the selector and action.
- **Phone target: 390 by 844 CSS pixels.** Stack the brand/title, product image, selector, selected name/description, and action. Keep the flowers recognizable in a reserved image region without covering text. Reduce the crop and gold accent as needed; retain the accent's role. Fit or wrap all three controls with at least 44 by 44 CSS pixel targets, visible labels, and no horizontal page overflow. Keep the description and action reachable by natural scrolling.
- **Stacking boundary:** choose it from the actual content, then inspect just above and below it. Do not claim the desktop edge-entry geometry must survive unchanged on a phone.

## Complete interaction contract

Use these invented records only as exercise fixtures, not verified inventory:

| ID | Display name | Short description | Image slot |
| --- | --- | --- | --- |
| pink | Pink bouquet | Soft pink flowers with fresh green foliage. | Verified or newly prepared pink bouquet plate |
| purple | Purple bouquet | Purple flowers with a cool, quiet palette. | Matching purple bouquet plate |
| white | White bouquet | White flowers with a light, airy arrangement. | Matching white bouquet plate |

Translate fixture copy into the page's agreed language. Use one selected bouquet ID to derive the hero image and alt text, displayed name, introduction, selected control, and details content/action target.

| Stage | Required behavior |
| --- | --- |
| Initial | Pink is selected. Its hero image, alt text, name, and description agree. All three choices and the details action are available. |
| Trigger | Tap/click the labeled Purple button, or reach it with Tab and activate with Enter/Space. Use native buttons with `aria-pressed`; only the committed choice is pressed. |
| Immediate feedback | Show a press response and keep keyboard focus on the activated button. For an unloaded image, show a pending indication while retaining the previous complete bouquet view and committed selection; do not mark the pending choice as committed yet. |
| Updated content | When the image is ready, commit Purple's image, alt text, name, description, pressed state, and details content together. A brief opacity transition may acknowledge the choice; keep text/controls anchored. Announce the new bouquet name concisely. |
| Rapid change/failure | If White is requested before Purple finishes loading, keep White as the latest requested choice; a late Purple load must not overwrite it. On load failure, keep the previous complete view and selected state, show a readable retry message, and allow another choice. |
| Reduced motion | With `prefers-reduced-motion: reduce`, remove the crossfade and any decorative motion. Commit the same synchronized content immediately when ready; keep the selected indicator and focus ring. |
| Next action | Activate View bouquet details. Reveal the current bouquet's details and move focus to the revealed heading when needed for the new context. If details remain open while selecting another bouquet, update them with the same selection. |

This is a product-choice interaction for a visitor, not an A/B/C sketch comparison. For another project, derive a different interaction from that visitor's task.

## Browser acceptance rehearsal

Run the page and record its actual URL. The following are expected checks, not claims that the page has been implemented or tested:

| Check | Action and expected result | Evidence to retain |
| --- | --- | --- |
| Desktop | Open 1440 by 900; compare the agreed reference/adaptation with the page. Check upper-left branch entry, title space, material/light, gold tail, and action hierarchy. | `desktop-1440-initial.png` |
| Phone | Open 390 by 844 and scroll; inspect order, image crop, title wraps, touch targets, and absence of horizontal overflow. | `phone-390-initial.png` |
| Selection | At both sizes choose Purple, then White, then Pink; for each compare image, alt text, name, description, pressed state, and details against that record. | `desktop-1440-purple.png`, `phone-390-white.png`; state observations in the report |
| Keyboard | Tab to Purple and activate with Enter, then select White with Space. Confirm focus remains visible on the activated button, selection updates, and details can be opened. | `keyboard-focus.png` and recorded focus order |
| Touch | In a touch-capable browser/device, tap a choice and the details action; check there is no hover dependency and scrolling still works. | Device/emulation and observed outcome; mark untested if only mouse/narrow-width checks were possible |
| Reduced motion | Enable reduced motion and repeat selection/details at both sizes. Content and controls work with no crossfade or decorative motion. | Preference setting and observed result in the report |
| Pending/failure | Delay an image, select Purple then White, and confirm the final view is White. Fail a load, verify the coherent prior view and retry, then recover. | Observed state sequence and result |

Save these in the active project's review directory. Report each check as pass, fail, or untested with viewport, action, outcome, and evidence path. A Skill-only rehearsal produces this specification and leaves all runtime checks pending; it must not fabricate screenshots or mark them passed.

## Example invocation

> Use Taste Studio to implement the already selected flower-shop direction. Use the existing sketches and assets in this project, and use the worked example's explicitly proposed desktop arrangement where the small phone sketch has no detail. Preserve the title's breathing space and small gold wordmark tail. Let visitors choose a bouquet and read its details. Deliver the working page, design/asset decisions, desktop and phone screenshots, and the browser verification report. Keep fixture bouquet information labeled as sample content until actual product data is supplied.

For a Skill-only instruction rehearsal, ask for the implementation and acceptance specification without changing the site. It should identify assumptions, layers and assets, desktop/phone rules, the state contract, and the pending browser evidence above.
