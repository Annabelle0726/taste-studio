---
name: taste-studio
description: Art-direct a web or mobile interface through 3–4 generated concepts for one screen, owner-led critique, and refinement of a chosen visual theme. Use for UI direction comparisons, feedback on Taste Studio sketches, or a request to design around the owner's contextual taste. A specified component fix or a standalone image request belongs to its usual workflow.
---

# Taste Studio

Taste Studio believes AI can help us explore more possibilities in design. Each person's own responses and choices give those possibilities direction.

Help the owner discover which visual choices serve this product and why. Use their language in conversation and the product's language in the sketches. Resume at the owner's current decision: an existing brief, a set of sketches awaiting feedback, or a selected direction can all be valid starting points.

## Establish the brief

Read the product facts and existing brand constraints available in the current project. Use a short spec and brainstorming to identify the audience, situation of use, key screen, real content, primary action, device/input, and one observable success criterion. If an unknown would change the directions, ask a focused question and wait for the answer. With a clear brief, proceed. Optional inspiration can come from a physical object, publication, place, or interaction. Identify what makes that reference relevant.

## Make comparable directions

Check the source of claims before putting them in a sketch. Ask for missing facts or omit unsupported claims. Never invent customer counts, satisfaction rates, testimonials, or endorsements. Keep labels that help readers understand content or take action. Judge nested containers by whether they clarify grouping. A phone illustration inside a process card can explain a step.

When visual references would help, consult [Design references](references/design-references.md). Pick examples relevant to this brief and name the particular quality being borrowed, such as how product information stays near its action.

Choose fidelity around the owner's decision. Use generated images to compare composition and visual character. When judging navigation, disclosure, scrolling, or responsive behavior requires interaction, make small browser-runnable alternatives if implementation is in scope. Keep the same content, viewport, primary task, and level of finish across candidates. Use the comparison and feedback sequence below for either format.

Plan whitespace around what the visitor needs to notice, understand, and do, in that order. Keep details people compare close together and place each action beside the information needed to take it. A timetable can use compact rows for scanning and a larger gap where the task shifts from choosing a session to booking it. Choose those intervals for the content and viewport. If a section feels crowded, trim secondary copy, decoration, or motion that competes with its main point.

1. Pick three candidates, or four when requested or when a fourth explores a distinct possibility. Draw that many **distinct random strings** before choosing themes. Run `python "<skill-dir>/scripts/draw_seeds.py" 3` (or `4`), resolving the path relative to this file. Where Python is unavailable, use a host random source, such as one freshly generated UUID per direction. The strings are private ideation cues. Use only their interpreted qualities in image prompts. Never put the strings in visible output or depend on an image-model seed parameter.
2. Turn each cue into a decision about this brief. For each direction, privately specify the user's first focal point, reading order, one trade-off, and a coherent theme covering composition, color roles, typography, image treatment, icons, button and label shapes, spacing, and interaction feedback. If removing color leaves two near-identical layouts, rethink one before rendering. For example, a workshop page can lead with the maker's process, the schedule, or the result a beginner can achieve. Each still needs to make the same booking task possible.
3. For image concepts, use the host's built-in image generator for **one separate sketch per direction**. Give each prompt the same representative screen, viewport, real text, primary action and fidelity. Supply its own theme and composition. Review the actual images before presenting them. For browser alternatives, open each at the agreed viewport and walk the task. Repair a missing action, illegible key copy, or a direction that collapsed into a duplicate. If a required capability is unavailable or incomplete, report what is available. Offer written concepts as a fallback and identify them as such.
4. Present all candidates at comparable size, with neutral labels A–C or A–D. Use the host's inline images or local previews, with runnable links when interaction is being judged. Ask just this in the owner's language: “Which part do you like most, which part would you change first, and why?” **End the turn here.** Hold rankings, theme rationales, recommendations, and refinement of a candidate until the owner responds.

## Listen, recommend, then refine

After the owner's response, reflect the concrete detail they named. If they gave only a letter, honor the choice and invite a reason without inventing one. Offer your own recommendation with one reason tied to the brief and one trade-off. Name a specific disagreement if you have one. If the direction is still open, wait for the owner's choice. If they already chose, continue on that basis. When they like elements of two directions, preserve the selected theme and translate the particular borrowed decision into its visual language.

A feeling is enough to guide the next edit. If the owner says "I keep coming back to B, but I can't explain why," take B as the starting point and leave the reason open. If none feels right, invite an impression, a reference, or something they wish they had seen, then explore a fresh direction. When showing the revision, return to their words and ask whether the quality they cared about is still there.

Record real feedback in the **active design project**, appending to `.taste-studio/feedback.md` on the first actual comment (or use its established design log). For a read-only engagement keep the entry in the conversation. Never store project feedback in the installed skill. Each entry needs only:

- Project, page, situation/device, and sketch or specific element.
- Owner's exact words in the original language, including what they liked or wanted changed and why, if given.
- Designer's interpretation in a separate sentence, scoped to that situation. Add exceptions and corrections beside the original.

For transfer, use an earlier entry the owner supplied or made available for this purpose. **Before applying it in a different project**, quote the original, explain the relevant similarity, and ask whether it applies in this project. Wait for an explicit answer. A previous confirmation applies only to the context it named.

Refine the chosen composition with the image editing tool when delivering a design; use the selected image as the reference. For a requested implementation, translate the theme into live text, controls, responsive layout and reusable style values in the target project's own stack. Same-role controls share shape and state behavior. A status label can have its own shape when its role stays recognizable. Carry the focal point and task onto a narrow phone layout by recomposing the screen, especially crops and the position of the primary action.

## Interaction and final review

After a direction is chosen, record its concrete values in the project's existing design specification. For a multi-page or multi-component implementation without one, create a short `DESIGN.md`. Include the intended brand character, chosen reference, font families and type scale, color roles, content widths, spacing, control shapes and feedback states, and the detail the owner wants preserved. Reuse existing project values where they fit. Update this record when an agreed design decision changes.

Concentrate distinctive work where it helps this brief. Reserve readable areas for copy when composing images and reuse established controls for familiar tasks. Preserve necessary action labels when removing redundant explanations.

Make interaction reviewable while the work is still a sketch. Pick a moment that matters to this brief. Show the starting view, the input or passage of time, and the resulting view. For an in-page jump, show the control under focus or press and the destination with its heading visible. A small strip of frames can answer where a tap leads; a short motion study can answer whether a material feels alive. Keep the controls and text spatially stable during ambient movement. On touch devices preserve native scrolling, and with reduced motion keep the destination and feedback available without the animated journey. Label what the study simulates; actual latency, focus transfer, and touch behavior need a runnable page.

Define feedback around an actual event: what happens on input, what changes while waiting, and what confirms success or explains failure? Use Three.js, 3D or particles only when there is an identifiable benefit, such as rotating a cup to inspect handle clearance. In that case, compare with a static view on the target device. Check initial usability, scroll/drag responsiveness, and gesture conflicts. Provide equivalent access with keyboard, touch, reduced motion, and a static fallback as applicable.

For an implemented page, open the actual desktop and mobile views. Review the whole composition against the chosen sketch and original success criterion, then inspect repeated controls, type, spacing, wrapping, icons, and contrast. Walk the primary task through its consequential states. Watch transitions in motion. Fix the most consequential deviation and repeat the affected check. Report what was observed, which detail from the owner's feedback survived, and any remaining gap. For an image-only delivery, describe visual findings and leave runtime behavior unverified.

Scroll through the transitions between sections at each target size. Can the reader tell where one thought ends and why the next follows? Adjust spacing or reading order where sections run together or a long gap separates a decision from its action.

For a staged reveal, observe the first appearance, time between steps, layout stability, and the final onward action. Verify the complete sequence in the runnable page.

When an independent review is warranted and authorized, give the reviewer the brief, chosen concept, owner's exact feedback, and current desktop and phone views. Ask for the location, user impact, and proposed correction of each finding. Include access to the runnable page for interaction findings. Start with one or two review rounds, then continue only for unresolved acceptance criteria or demonstrated problems. Finish when the primary task works, consequential findings have been resolved or explicitly accepted, and the owner's valued detail survives. Record any untested behavior.

If choosing between available models is part of the task, compare them on the same small brief and evaluation criteria. Allocate work according to demonstrated capability, available tools, and the owner's budget. When handing implementation to another worker, include the chosen concept, design specification, feedback, and acceptance criteria, then review the actual result. Model selection and independent review are optional workflow choices.
