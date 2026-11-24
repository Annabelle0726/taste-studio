---
name: taste-studio
description: Art-direct web or mobile experiences through task flows, 3–4 comparable visual concepts, owner-led critique, and refinement of a chosen theme. Use for UI direction comparisons, feedback on Taste Studio sketches, design around the owner's contextual taste, or turning a selected sketch into a responsive page with coherent, interruptible interactions and browser verification. A specified component fix or a standalone image request belongs to its usual workflow.
---

# Taste Studio

Taste Studio believes AI can help us explore more possibilities in design. Each person's own responses and choices give those possibilities direction.

Help the owner discover which visual choices serve this product and why. Use their language in conversation and the product's language in the sketches. Resume at the owner's current decision: an existing brief, a set of sketches awaiting feedback, or a selected direction can all be valid starting points.

## Establish the brief

Read the product facts and existing brand constraints available in the current project. Use a short spec and brainstorming to identify the audience, situation of use, key screen, real content, primary action, device/input, and one observable success criterion. Map the short task route before drawing: entry/context → decision/action → feedback/result → continue or return. Name the context to retain on return and consequential waiting, failure, or cancellation states. Read [Interaction and motion](references/interaction-and-motion.md) here to choose the key transition and its acceptance questions; at prototype refinement, map stable elements, changing content, continuity anchors, and the exit/entry sequence before selecting durations. If an unknown would change the directions, ask a focused question and wait for the answer. With a clear brief, proceed. Optional inspiration can come from a physical object, publication, place, or interaction. Identify what makes that reference relevant.

## Make comparable directions

Check the source of claims before putting them in a sketch. Ask for missing facts or omit unsupported claims. Never invent customer counts, satisfaction rates, testimonials, or endorsements. Keep labels that help readers understand content or take action. Judge nested containers by whether they clarify grouping. A phone illustration inside a process card can explain a step.

When visual references would help, consult [Design references](references/design-references.md). Pick examples relevant to this brief and name the particular quality being borrowed, such as how product information stays near its action.

Choose fidelity around the owner's decision. Use generated images to compare composition and visual character. At sketch fidelity, make the brief's key transition reviewable: starting view, input, resulting view, and return route. When navigation, disclosure, scrolling, or responsive behavior is the decision, make the smallest operable prototype allowed by the task before polishing the whole page. If coding is excluded or a runtime is unavailable, show a labeled state sequence or motion study and leave interaction acceptance pending. Keep the same task route, representative states, content, viewport, and fidelity across candidates. Use the comparison and feedback sequence below for either format.

Plan whitespace around what the visitor needs to notice, understand, and do, in that order. Keep details people compare close together and place each action beside the information needed to take it. A timetable can use compact rows for scanning and a larger gap where the task shifts from choosing a session to booking it. Choose those intervals for the content and viewport. If a section feels crowded, trim secondary copy, decoration, or motion that competes with its main point.

1. Pick three candidates, or four when requested or when a fourth explores a distinct possibility. Draw that many **distinct random strings** before choosing themes. Run `python "<skill-dir>/scripts/draw_seeds.py" 3` (or `4`), resolving the path relative to this file. Where Python is unavailable, use a host random source, such as one freshly generated UUID per direction. The strings are private ideation cues. Use only their interpreted qualities in image prompts. Never put the strings in visible output or depend on an image-model seed parameter.
2. Turn each cue into a decision about this brief. For each direction, privately specify the user's first focal point, reading order, one trade-off, and a coherent theme covering composition, color roles, typography, image treatment, icons, button and label shapes, spacing, and interaction feedback. If removing color leaves two near-identical layouts, rethink one before rendering. For example, a workshop page can lead with the maker's process, the schedule, or the result a beginner can achieve. Each still needs to make the same booking task possible.
3. For image concepts, use the host's built-in image generator for **one separate sketch per direction**. Give each prompt the same representative screen, viewport, real text, primary action and fidelity. Supply its own theme and composition. Review the actual images before presenting them. For browser alternatives, open each at the agreed viewport and walk the task. Repair a missing action, illegible key copy, or a direction that collapsed into a duplicate. Run the sketch checkpoint in **Independent review** below before presenting the set. If a required capability is unavailable or incomplete, report what is available. Offer written concepts as a fallback and identify them as such.
4. Present all candidates at comparable size, with neutral labels A–C or A–D. Use the host's inline images or local previews, with runnable links when interaction is being judged. Ask just this in the owner's language: “Which part do you like most, which part would you change first, and why?” **End the turn here.** Hold rankings, theme rationales, recommendations, and refinement of a candidate until the owner responds.

## Listen, recommend, then refine

After the owner's response, reflect the concrete detail they named. If they gave only a letter, honor the choice and invite a reason without inventing one. Offer your own recommendation with one reason tied to the brief and one trade-off. Name a specific disagreement if you have one. If the direction is still open, wait for the owner's choice. If they already chose, continue on that basis. When they like elements of two directions, preserve the selected theme and translate the particular borrowed decision into its visual language.

A feeling is enough to guide the next edit. If the owner says "I keep coming back to B, but I can't explain why," take B as the starting point and leave the reason open. If none feels right, invite an impression, a reference, or something they wish they had seen, then explore a fresh direction. When showing the revision, return to their words and ask whether the quality they cared about is still there.

Record real feedback in the **active design project**, appending to `.taste-studio/feedback.md` on the first actual comment (or use its established design log). For a read-only engagement keep the entry in the conversation. Never store project feedback in the installed skill. Each entry needs only:

- Project, page, situation/device, and sketch or specific element.
- Owner's exact words in the original language, including what they liked or wanted changed and why, if given.
- Designer's interpretation in a separate sentence, scoped to that situation. Add exceptions and corrections beside the original.

For transfer, use an earlier entry the owner supplied or made available for this purpose. **Before applying it in a different project**, quote the original, explain the relevant similarity, and ask whether it applies in this project. Wait for an explicit answer. A previous confirmation applies only to the context it named.

Refine the chosen composition with the image editing tool when delivering a design; use the selected image as the reference. For a requested implementation, continue with **Build the selected sketch for visitors** below. Resume from an already selected direction without repeating the comparison or requiring another selection.

## Build the selected sketch for visitors

After a direction is chosen, record its concrete values in the project's existing design specification. For a multi-page or multi-component implementation without one, create a short `DESIGN.md`. Include the intended brand character, chosen reference, font families and type scale, color roles, content widths, spacing, control shapes and feedback states, the task route and retained context, motion roles and interruption rules, and the detail the owner wants preserved. Reuse existing project values where they fit. Update this record when an agreed design decision changes.

When implementation is in scope, read [Sketch to page](references/sketch-to-page.md) and refine the brief's contract using [Interaction and motion](references/interaction-and-motion.md) before coding. Use [Florist worked example](references/florist-example.md) when walking through the Taste Studio flower-shop case; its bouquet interaction and composition choices are local to that example.

1. Inspect the selected sketch and record its composition, visual focal point, text clear space, material, light, and defining details. Separate observed features, the owner's exact feedback, and proposed adaptations. Map each decision to layout, live content/control, or an independent visual asset before implementing it. The sketch is an internal design reference; the visitor receives a complete product page.
2. Inventory and reuse suitable assets. Separate background, decoration, and subject only where cropping, layering, or interaction requires it. Generate or edit missing assets from the chosen visual reference with matching palette, texture, and light. Build real text and controls in the project's stack. Specify which spatial relationships survive on desktop and how the phone layout recomposes them. Keep key copy and actions readable and operable. Same-role controls share shapes and states; status labels remain distinct from controls.
3. Implement the complete task route established in the brief, including its continue/return behavior and relevant recovery states. Follow the shared interaction contract, including its motion-layer map and choreography: animate the actual changing content, justify any whole-view movement, respond immediately, keep dependent state coherent, handle rapid/reverse input, and preserve keyboard, touch, native navigation, and reduced-motion access. Treat timing ranges as adjustable design starting points, not a reason to delay an action.
4. Run the first version and perform the visual/layout checks in Sketch to page and the applicable acceptance probes in Interaction and motion. Keep the preview operable and capture desktop and phone screenshots.
5. Once the first page runs and initial browser checks are complete, run the implemented-page checkpoint in **Independent review** below, before final delivery. Have the original implementing agent fix reproducible issues and repeat the same steps to verify each correction.
6. Deliver the implementation, asset/decision notes, desktop and phone screenshots, and an honest verification report stating which issues were fixed and the results of rechecking them. A written implementation plan or image-only revision leaves runtime acceptance pending.

## Verify the actual experience

Open the actual running URL at the target desktop and phone sizes. Use [Sketch to page](references/sketch-to-page.md) for composition, responsive layout, and evidence, and [Interaction and motion](references/interaction-and-motion.md) for the task route, rapid/reverse input, navigation continuity, loading/recovery, keyboard/touch, and reduced-motion probes. Observe transitions while operating the page; a successful single click or a still screenshot does not establish smoothness.

Scroll across section boundaries and inspect real content, repeated controls, wrapping, icons, and contrast. For a staged reveal, observe first appearance, pacing, layout stability, and access to the onward action. Keep distinctive effects tied to a product benefit; the interaction reference covers performance and static alternatives.

Fix the most consequential discrepancy and repeat the affected sequence. Keep desktop/phone evidence in the active project's review location. Report the URL, sizes/device/input, actions, expected versus observed results, preserved owner-valued detail, fixed issues and rechecks, and failed or untested paths. Distinguish real-device use, emulation, screenshot review, and source inspection. When runtime access is unavailable or the delivery is image-only, leave interaction acceptance pending.

## Independent review

Read [Independent review procedure](references/independent-review.md) at the checkpoint actually reached: comparable candidates before presentation, a refined selected sketch, or a first runnable implementation after initial checks and before delivery. Follow that reference for reviewer launch, artifacts, issue fields, correction, and the focused recheck; it is the canonical review procedure.

For the implemented-page checkpoint, start a new subagent that has not participated in this round's design or implementation. Supply the original sketch, visitor task/interaction contract, operable preview, desktop/phone screenshots, and owner's feedback. Have it first operate as a visitor, then compare composition, visual hierarchy, mobile layout, and interaction feedback. Include the applicable Interaction and motion acceptance probes after its unassisted task attempt. Record evidence-based judgments about visual weight and attention separately from reproducible defects, using the review procedure. The original maker fixes reproducible issues and repeats the same steps; default to one initial review and one focused recheck.

For candidates, keep review internal, check compliance and meaningful differences without ranking or inferring taste, and let the owner respond before recommendations. Do not fabricate a reviewer or interactive verification: if delegation or preview access fails, label the actual screenshot review or self-review and the remaining untested behavior.

When delegating implementation, include the chosen concept, design/interaction contract, feedback, and acceptance criteria, then review the actual result. Model selection is optional; if it is part of the task, compare available models on the same brief and criteria within the owner's budget.
