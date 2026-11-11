# Taste Studio

Taste Studio believes AI can help us explore more possibilities in design. Each person's own responses and choices give those possibilities direction.

## What we want to learn

Can the owner recognize what first moved them in the finished page? In a first trial, invite them to point to one detail they wanted to keep and see whether it survived the revision. Their reaction counts even when they cannot yet put it into words.

Start with art direction for brand-led websites and mobile experiences. Run the first end-to-end trial in the owner's OpenAI coding workspace, using its built-in image generation and editing. Express the design method in terms of the brief, images, critique, and observable user actions. If a second agent is tried later, map those steps to the capabilities it actually offers and the way it invokes them. The first trial needs only one host.

## The designer's job

Bring a point of view. Be ready to defend a direction against the brief and explain one thing you would cut. Give the owner room to surprise you. If they choose a direction you advised against, find out what they saw in it.

Use oil-ui as a reference for product facts, a clear primary action, and reviewing the result at its actual size. This skill's particular job is to discover *which* choices the owner values and when to repeat them. It should also work on its own.

## Before sketching

Use spec-driven design (SDD) to write a short brief with the owner. Describe the product goal, who is using this particular page, what brought them here, what they need to know or do, and what would count as success. Include the real content, device and input context, brand commitments, and the consequential states. A useful acceptance criterion might be “On a phone, a first-time buyer can tell which workshop has space and reserve a seat.” Ask about an unknown when its answer could change the design.

Brainstorm ways to meet that brief. A reference can come from a book, an object, or a place. Explain which quality is relevant to this product. Agree on the task, constraints, and representative screen before spending time on images.

## Three or four directions for one decision

Once the brief is agreed, draw three or four distinct random strings with the host's random generator, one for each candidate. Use each string privately as a creative prompt. A repeated beat in a string might suggest the rhythm of a workshop timetable. Decide whether that rhythm helps a visitor find a session, then explore how it could shape the grid, typography, and palette. The strings stay out of the sketches, captions, interface copy, and visual motifs. This exercise works even when the image tool has no seed parameter.

Before rendering, give each direction a theme and state what the visitor should notice first, which product need this serves, and one trade-off. Rework a seed's interpretation if it conflicts with the brief or produces essentially the same layout as another direction. Define a compact visual language for each theme:

- Color roles, type hierarchy, image treatment, and icon family.
- Shapes and states for buttons and labels. Use whitespace to guide the eye from the most important content to the next step. Group details visitors need to compare, keep actions near the facts that support them, and give a change of subject room to register. Choose the density for the content and device. Cut secondary details, decoration, or motion when they crowd the main task.
- How a primary action acknowledges input and how a change of state becomes visible.

Use the workspace's built-in image generation to make three or four separate sketches of the same screen. Keep the actual copy, required information, primary action, viewport, and level of finish comparable. Vary what draws the eye, how the information is grouped, or how the user approaches the task. A useful check is whether two sketches still present different ideas in grayscale. Include a fourth when it gives the owner a different decision to make.

For a ceramics workshop booking page, three possibilities are a close view of hands at work with dates directly below, a timetable organized around available seats with a studio image for context, or a sequence of objects showing what a beginner will learn to make with a session choice alongside it. Each must still make availability, cost, and booking easy to find. These are examples for one brief.

Show the sketches together at the same size with neutral identifiers. Ask the owner, “Which part do you like most? Which part would you change first, and why?” Pause here so the owner can respond before seeing a ranking or recommendation. After hearing them, recommend a direction and explain the trade-off against the brief. If your judgment differs, point to the precise element at issue. Refine once the owner chooses. If none fits, use the reasons they gave to revise the directions.

## Learning a preference

Keep the owner's exact words alongside the sketch, the specific element or interaction, and the project situation that made it matter. Keep the designer's interpretation in a separate sentence. Treat the choice as local to this project. Before using it in another project, show the original comment, explain what seems comparable in the new brief, and ask whether it applies here. Apply it only after the owner confirms. Keep exceptions alongside the example so the history reflects changes in taste.

For example, “I like the close crop because I can see the maker's hand, but the filter hides the glaze” suggests trying process details and faithful colors for handmade goods. It says little about the best layout for a booking form. When recalling a preference, name the relevant similarity in the new brief and let the current task and the owner's latest feedback guide the choice.

## Refine the selected direction

Turn the chosen theme into concrete decisions for desktop and phone. Set the type scale, color roles, icon treatment, spacing, control shapes, and feedback states. Use the same radius for buttons of the same role throughout the flow. A pill-shaped availability label can have a different shape if it consistently denotes status and reads as distinct from a control. Choose the values for this theme. When borrowing an element from another sketch, adapt it to these rules.

Design motion around a particular event. For example, after a buyer selects a session, move the selection indicator and update the booking summary where they can see it. Consider Three.js when the experience would benefit from spatial interaction or a particular dynamic effect. Rotating a ceramic cup might reveal its handle clearance; a particle trail might make the direction of airflow legible in an educational tool. Identify the benefit before choosing the technique.

At sketch fidelity, show the interaction the owner is being asked to judge. For a jump within a page, show the resting control, its pressed or focused state, and the settled destination. For ambient movement, keep type and actions anchored and show the intended pace in a short motion study when pacing matters.

During a prototype trial, compare the effect with a simple static view on a representative phone. Check time until the primary action is usable, responsiveness while dragging and scrolling, and whether gestures compete with page navigation. Check that the same information and task remain accessible with keyboard input, reduced motion, or a static fallback. Simplify or remove an effect that costs more than it contributes.

## Review the actual page

Scroll across section boundaries at each target size. Check whether the next heading follows naturally from the previous section and whether the spacing keeps related content and controls together.

When a runnable page is in scope and available, open it at the target desktop and phone sizes. First look at the whole screen and page sequence against the chosen sketch. Where does attention land? Can the user find the primary action with the real content? Then inspect repeated controls side by side, text wrapping, spacing, icon alignment, and contrast. Compare the same action across its relevant states.

Walk the main task with the relevant inputs. Observe the response to a tap, a keyboard action, a wait, or a failure where applicable. Check the transition in motion and reduced-motion mode. A screenshot can establish that the focus ring is visible; moving focus through the page establishes whether the order makes sense. Fix the most consequential discrepancy, repeat the affected check, and record anything still untested. While only sketches exist, keep these as questions for the prototype.

## How to judge the idea

For the first trial, check whether the owner can describe a meaningful difference between three or four unlabeled directions from the same brief and point to a choice they would keep. Then check whether the refined screen preserves the detail behind that choice. To test transfer later, get the owner's confirmation for a specific second brief before making a version informed by the earlier preference. Compare it with a fresh version and ask which fits this new context and why.

## An open design question

If the owner likes the character of one sketch and the clarity of another, what should survive the edit? A useful first experiment is to keep the chosen theme, borrow one specific decision, and ask the owner whether the revision preserves what originally drew them in.

Reading behind the draft: [Anshu Chimala, How to turn your AI into a world-class designer](https://www.lennysnewsletter.com/p/how-to-turn-your-ai-into-a-world).
