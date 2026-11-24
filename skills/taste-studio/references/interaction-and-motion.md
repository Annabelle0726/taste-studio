# Interaction and motion

Use this reference in the brief, at the sketch's consequential transition, during implementation, and during browser acceptance. Define a usable task first; use motion to explain its changes. Keep the contract and evidence in the active project. Apply only the patterns the task needs.

## Contents

- [Map the task before drawing the screen](#map-the-task-before-drawing-the-screen)
- [Refine one shared interaction contract](#refine-one-shared-interaction-contract)
- [Choose what moves before choosing duration](#choose-what-moves-before-choosing-duration)
- [Compose the transition](#compose-the-transition)
- [Design the response for the event](#design-the-response-for-the-event)
- [Establish a rhythm, then adjust it in the page](#establish-a-rhythm,-then-adjust-it-in-the-page)
- [Choose the simplest mechanism that preserves the task](#choose-the-simplest-mechanism-that-preserves-the-task)
- [Acceptance: test more than one successful click](#acceptance-test-more-than-one-successful-click)
- [Technical references](#technical-references)

## Map the task before drawing the screen

Write one short route with the owner: **entry and context → decision/action → feedback and result → continue or return**. Name what must survive a return: selection, entered values, filters, list position, or another relevant context. Identify waiting, failure, cancellation, and empty/unavailable states only when they can affect this route. Resolve an unknown before sketching if its answer would change the task or directions; otherwise record the assumption.

For example: a visitor enters a flower list → chooses a bouquet → sees its image, name, description, and pickup information → closes the information and continues with the same bouquet selected. This is an example, not a prescribed flow for every page.

Choose the transition with the most uncertainty or consequence. In the sketch stage, show its starting view, trigger, and resulting view, including the way back. When judging navigation or state changes, build the smallest operable prototype permitted by the task; do not wait for a polished full page. Keep the task and representative states comparable across directions. If code is outside the authorized scope or a runtime is unavailable, supply a labeled state sequence or motion study and mark interaction acceptance pending. A static image cannot establish timing, latency, focus transfer, or scroll behavior.

## Refine one shared interaction contract

Carry the brief's route into implementation rather than choosing a new isolated interaction. Record these decisions for each consequential transition; omit irrelevant rows with a reason instead of expanding every small component into a specification.

| Decision | Record |
| --- | --- |
| Entry and starting state | Where the visitor arrives from, current selection/data, visible controls, and what counts as success. |
| Trigger and acknowledgement | Control, pointer/touch/keyboard input, and immediate pressed, selected, or pending feedback. |
| Result and consistency | Every dependent image, label, description, count, and onward action; the coherent state they must show together. |
| Continue, return, and focus | Next destination; focus and scroll placement; retained input/selection/context on Back, close, and reopen. |
| Waiting, failure, and recovery | Reserved space, previous content or placeholder, error explanation, retry entry, retained input, and cancellation when supported. |
| Layers and choreography | Stable elements, changing content, continuity anchors; exit/entry overlap, simultaneous updates, and any justified staggering. |
| Timing and interruption | Motion's purpose, duration/easing role, response to a second input or reversal, and how stale completion is prevented. |
| Access and fallback | Native scrolling and gestures, semantic controls, visible keyboard focus, reduced motion, and behavior without optional animation APIs. |

## Choose what moves before choosing duration

For each major transition, name the actual elements in three roles before implementing motion:

| Role | Specify |
| --- | --- |
| Stable elements | The surrounding frame, persistent heading, navigation, or action area that should retain its visual position and availability during this change. |
| Changing content | The image, explanation, result, or local selection mark whose state actually changes; animate at this level first. |
| Continuity anchors | A persistent number, image, label, or selection indicator that helps the eye connect the old focus to the new one. State how it remains recognizable; do not invent decoration just to fill this role. |

Prefer transitions on the content that actually changes. Move a whole container only when the complete view meaningfully enters or exits as one spatial unit, such as a drawer arriving from its edge; record that reason. A short, interruptible 240ms section animation can still be visually heavy. Do not apply transform/opacity to a whole section just because it is a convenient wrapper. Stable does not mean making everything position:fixed: ordinary document scrolling still moves content naturally; avoid adding a second container animation to that journey.

For a case selector, keep the frame and selector available, let the selected marker connect the states, and transition only the changing image/caption. If the caption is unchanged, leave it alone. This is a local example, not a universal layout or effect.

## Compose the transition

Write one compact sequence per major transition: **trigger/acknowledgement → old content exit and new content entry → settled focus**. Name what overlaps, what updates simultaneously, and what remains visible throughout. Keep this beside the layer map in the existing project specification, not in a separate animation checklist for every control.

Avoid a whole block exiting, an empty beat, then a whole block entering. Keep a useful visual anchor while replacement content arrives, and retain the previous complete view during loading when appropriate. Coordinate dependent image, title, copy, and action state; do not reveal a mismatched old/new combination. Never make the visitor wait through a title → paragraph → button queue to read or act. Use slight staggering only when it clarifies this task's reading order, and explain that benefit; do not make it a default page template.

Specify reversal while both states are visible: continue from their current presentation rather than removing layers and restarting from an opaque intermediate state. Keep outgoing layers out of input and accessibility navigation, and preserve the same task without motion.

## Design the response for the event

| Event | Required experience |
| --- | --- |
| Button press | Acknowledge the press immediately and release naturally. For async work, expose pending state while keeping the button's footprint stable. Prevent duplicate consequential submissions without silently blocking unrelated controls. Do not add a scale or bounce effect to every button. |
| Tab or local content change | Coordinate the selected indicator and content. Update dependent fields from one state source; retain the previous complete view or show a coherent pending view until the new one is ready. For selection changes, the latest intent wins; stale responses and animation callbacks must not restore old state. Keep focus on the selector unless the task requires moving it. |
| In-page jump | Land on a recognizable heading clear of fixed navigation. Choose an appropriate focus destination for keyboard navigation. Preserve native scrolling where possible; allow a visitor's own scroll to interrupt the journey and do not force them back to the target afterward. Tab changes normally stay in place. |
| Cross-page navigation | Keep useful visual continuity and define the new page's focus and scroll position. Preserve normal links and browser history; Back should restore relevant selection, inputs, filters, and reading position rather than reset to the top by default. Do not delay navigation to finish decorative motion. |
| Dialog or drawer | Relate its appearance to the triggering location or the platform convention. Make close and reopen responsive, keep modal focus within the dialog, and return focus to the trigger on close or a logical successor if it no longer exists. Match visual closure and cleanup so an old timer cannot close a newly reopened view. |
| Loading or failure | Reserve image/content space and avoid sudden layout shifts. Explain what is pending; keep usable actions available. On failure preserve entered values and relevant choices, show a direct retry, and recover without starting the whole task over. Distinguish a stopped animation from a cancelled request or an undone operation. |

Treat selection and submission differently. A latest-selection-wins policy suits tabs and previews; it must not silently cancel, repeat, or reorder bookings, payments, or other writes. Define duplicate prevention, supported cancellation, and the confirmed result for consequential operations.

Keep outgoing content from intercepting input or remaining in the focus/accessibility order. Announce concise results when appropriate without turning the entire changing region into a noisy live announcement.

## Establish a rhythm, then adjust it in the page

Use these as adjustable starting ranges, not accessibility standards, performance guarantees, or pass/fail thresholds. Prefer existing project tokens when they serve the task; give interactions with the same role a consistent rhythm.

| Motion role | Starting duration |
| --- | --- |
| Press/release or small state/color feedback | About 80–140 ms |
| Selection indicator or local content transition | About 160–240 ms |
| Drawer or more substantial view transition | About 220–320 ms |

Apply the state change or pending acknowledgement immediately; let animation follow it. Never add an artificial wait just to complete a reveal. An entrance can respond promptly and settle softly; an exit can be more direct where that fits the spatial relationship. Test easing and distance together. Keep text and actions anchored during ambient movement, and keep the final onward action usable throughout a staged reveal.

When input arrives before an animation finishes, retarget, cancel, or reverse from the current presentation as appropriate. Avoid queued decorative animations, a frozen control, or snapping back to an old starting pose. Do not attach the only path to usable content or cleanup to an animation-completion event: reduced motion, cancellation, or unsupported enhancement must still leave the correct state and focus.

## Choose the simplest mechanism that preserves the task

Prefer existing CSS transitions for small state feedback. Use an interruptible animation mechanism when coordination or reversal requires it. Prefer `transform` and `opacity` when they express the intended change; reserve layout space and measure any necessary layout/paint-heavy transition on the target device. Do not add blanket `will-change` or an animation library as a default optimization.

Consider the View Transition API only as progressive enhancement for an appropriate view change. Check current support for the specific SPA or cross-document feature, feature-detect where applicable, and preserve ordinary state updates/navigation plus a reduced-motion path. An API does not establish history restoration, focus, or task continuity by itself.

Use Three.js, 3D, or particles only for a named product benefit. Compare with a static version on a representative phone; simplify or remove an effect that harms initial usability, scroll/drag responsiveness, or gesture ownership. Honor reduced motion without losing feedback, content, or the task. Keep controls operable without hover and preserve native scrolling and zoom.

## Acceptance: test more than one successful click

Use the running page at the agreed desktop and phone sizes. Repeat the important route with normal input, rapid input, reversal, and the applicable recovery paths. Observe the transition, not only its final screenshot.

| Probe | Observable pass condition |
| --- | --- |
| Interrupt and change direction | While a transition/load is unfinished, choose A → B → C, then return to A. The latest intended selection and all dependent content agree; no queued replay, frozen control, or late old response wins. Check duplicate submission separately for write operations. |
| Watch layout during change | Titles, images, buttons, and page position do not unexpectedly jump when data or media arrives. Planned movement makes the state change understandable. |
| Advance, Back, close, reopen | Complete the forward route and reverse it, including closing and reopening before exit finishes when possible. Focus, scroll, retained input/selection, and modal state remain sensible; a stale exit cannot close the reopened view. |
| Interrupt a page jump | Start the in-page navigation, then scroll intentionally. The page respects that input instead of resuming a forced scroll; the normal destination remains reachable and clear of fixed navigation. |
| Use touch and keyboard | Observe pressed/selected feedback without hover; tap, scroll, and use keyboard activation/focus order. Verify gestures do not compete with page navigation. A narrow mouse-driven viewport is not a touch-device test. |
| Slow or fail the relevant request | With supported throttling or a controlled failure, confirm a comprehensible pending state, stable space, retained input, direct retry, and recovery. Unrelated controls remain usable. Do not infer this from a happy-path request. |
| Reduce motion or omit enhancement | Enable reduced motion and repeat the task. Where an optional API is used, also exercise the ordinary fallback. Correct final state, feedback, focus, and navigation remain available without the animated journey. |

Record browser/device, viewport, input mode, starting state, steps (including when the second input occurred), expected/observed outcome, and pass/fail/untested status. Keep a screenshot for spatial/focus evidence and a short recording or timed observation when judging motion. State whether evidence came from a real phone, touch emulation, a narrow desktop viewport, source inspection, or screenshots. Mark unavailable failure injection or device checks untested; do not call an interaction smooth solely because its duration matches a range. After a fix, repeat the failing sequence with the same conditions.

After the functional probes, assess visual weight separately: can the eye follow the new focus; did a large amount of unchanged content move; did a local change shake the surrounding page? Cite the named elements, trigger, viewport, and observed moment/recording. Explain the effect on attention and propose the smallest adjustment. Follow [Independent review](independent-review.md) to keep these evidence-based design judgments separate from reproducible defects. A passing timing/state check does not establish visual lightness, and text/source review alone cannot establish the felt quality of a running transition.

## Technical references

- [web.dev: high-performance CSS animations](https://web.dev/articles/animations-guide) — rendering costs and choosing animation properties.
- [MDN: View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) — capabilities, feature-specific support, and current API guidance.

The duration ranges above are design starting points supplied for this skill, not claims made by these sources.
