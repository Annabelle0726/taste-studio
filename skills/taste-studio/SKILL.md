---
name: taste-studio
description: Art-direct a web or mobile interface through 3–4 generated concepts for one screen, owner-led critique, and refinement of a chosen visual theme. Use for UI direction comparisons, feedback on Taste Studio sketches, or a request to design around the owner's contextual taste. A specified component fix or a standalone image request belongs to its usual workflow.
---

# Taste Studio

Help the owner discover which visual choices serve this product and why. Use their language in conversation and the product's language in the sketches. Resume at the owner's current decision: an existing brief, a set of sketches awaiting feedback, or a selected direction can all be valid starting points.

## Establish the brief

Read the product facts and existing brand constraints available in the current project. Use a short spec and brainstorming to identify the audience, situation of use, key screen, real content, primary action, device/input, and one observable success criterion. If an unknown would change the directions, ask a focused question and wait for the answer. With a clear brief, proceed. Optional inspiration can come from a physical object, publication, place, or interaction. Identify what makes that reference relevant.

## Make comparable directions

1. Pick three candidates, or four when requested or when a fourth explores a distinct possibility. Draw that many **distinct random strings** before choosing themes. Run `python "<skill-dir>/scripts/draw_seeds.py" 3` (or `4`), resolving the path relative to this file. Where Python is unavailable, use a host random source, such as one freshly generated UUID per direction. The strings are private ideation cues. Use only their interpreted qualities in image prompts. Never put the strings in visible output or depend on an image-model seed parameter.
2. Turn each cue into a decision about this brief. For each direction, privately specify the user's first focal point, reading order, one trade-off, and a coherent theme covering composition, color roles, typography, image treatment, icons, button and label shapes, spacing, and interaction feedback. If removing color leaves two near-identical layouts, rethink one before rendering. For example, a workshop page can lead with the maker's process, the schedule, or the result a beginner can achieve. Each still needs to make the same booking task possible.
3. Use the host's built-in image generator for **one separate sketch per direction**. Give each prompt the same representative screen, viewport, real text, primary action and fidelity. Supply its own theme and composition. Review the actual images before presenting them. Repair a missing action, illegible key copy, or a direction that collapsed into a duplicate. If image generation is unavailable or incomplete, report what is available. Offer written concepts as a fallback and identify them as such.
4. Present all sketches at comparable size, with neutral labels A–C or A–D. Use the host's inline images or local previews. Ask just this in the owner's language: “Which part do you like most, which part would you change first, and why?” **End the turn here.** Hold rankings, theme rationales, recommendations, and implementation until the owner responds.

## Listen, recommend, then refine

After the owner's response, reflect the concrete detail they named. If they gave only a letter, honor the choice and invite a reason without inventing one. Offer your own recommendation with one reason tied to the brief and one trade-off. Name a specific disagreement if you have one. If the direction is still open, wait for the owner's choice. If they already chose, continue on that basis. When they like elements of two directions, preserve the selected theme and translate the particular borrowed decision into its visual language.

Record real feedback in the **active design project**, appending to `.taste-studio/feedback.md` on the first actual comment (or use its established design log). For a read-only engagement keep the entry in the conversation. Never store project feedback in the installed skill. Each entry needs only:

- Project, page, situation/device, and sketch or specific element.
- Owner's exact words in the original language, including what they liked or wanted changed and why, if given.
- Designer's interpretation in a separate sentence, scoped to that situation. Add exceptions and corrections beside the original.

For transfer, use an earlier entry the owner supplied or made available for this purpose. **Before applying it in a different project**, quote the original, explain the relevant similarity, and ask whether it applies in this project. Wait for an explicit answer. A previous confirmation applies only to the context it named.

Refine the chosen composition with the image editing tool when delivering a design; use the selected image as the reference. For a requested implementation, translate the theme into live text, controls, responsive layout and reusable style values in the target project's own stack. Same-role controls share shape and state behavior. A status label can have its own shape when its role stays recognizable. Carry the focal point and task onto a narrow phone layout by recomposing the screen, especially crops and the position of the primary action.

## Interaction and final review

Define feedback around an actual event: what happens on input, what changes while waiting, and what confirms success or explains failure? Use Three.js, 3D or particles only when there is an identifiable benefit, such as rotating a cup to inspect handle clearance. In that case, compare with a static view on the target device. Check initial usability, scroll/drag responsiveness, and gesture conflicts. Provide equivalent access with keyboard, touch, reduced motion, and a static fallback as applicable.

For an implemented page, open the actual desktop and mobile views. Review the whole composition against the chosen sketch and original success criterion, then inspect repeated controls, type, spacing, wrapping, icons, and contrast. Walk the primary task through its consequential states. Watch transitions in motion. Fix the most consequential deviation and repeat the affected check. Report what was observed, which detail from the owner's feedback survived, and any remaining gap. For an image-only delivery, describe visual findings and leave runtime behavior unverified.