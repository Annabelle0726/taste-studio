# Independent review of sketches and pages

Use a reviewer distinct from the agent that made the artifact. Review the result against the agreed task and the owner's actual choices. Keep project review notes in the active project's review location, not in the installed skill.

## Start a real reviewer

Inspect the current host's available delegation tools. Invoke its subagent-creation tool (for example, `spawn_agent` when exposed) with a bounded read-only task. For the implemented-page checkpoint, start a new subagent that has not participated in this round's design or implementation. Retain the returned agent identifier for the correction recheck. Supply task-local artifacts rather than the maker's rationale or expected verdict; use a fresh context when supported. Instruct the reviewer not to edit files, start other reviewers, or contact the owner.

Use the current model unless the owner or an applicable instruction specifies otherwise. Do not assume that a skill file or `agents/openai.yaml` provisions an agent, a model, image access, or browser tools. Confirm what the reviewer can access. If it cannot see an image, pass an accessible copy using the host's supported mechanism; if that remains impossible, mark visual review pending. For a page, give the running URL and working directory along with screenshots and the browser evidence. Coordinate access if the maker and reviewer share a browser; do not navigate the same tab concurrently.

If delegation is unavailable or fails, continue with explicitly labeled self-review and record that independent review was unavailable. If the reviewer cannot open an operable preview, label its actual work as screenshot review or recorded-evidence review; identify runtime checks it did not independently repeat. Do not describe either fallback as an independent interactive review. The main agent remains responsible for the required browser checks.

## Choose the checkpoint

| Checkpoint | Inputs | Review question |
| --- | --- | --- |
| Candidate set, before presentation | Brief, required copy/action, target viewport, all actual candidates with neutral identifiers | Does each meet the same brief and allow the same task? Are key words/actions legible and the layouts meaningfully different? Do not rank, name a winner, or anticipate the owner's preferences. |
| Refined selected sketch | Brief, original selected image, revised image, exact owner comments, agreed changes | Did the revision preserve the specific detail the owner cared about while resolving the requested change? Identify remaining prototype questions; still images do not verify behavior. |
| Implemented page, once the first version runs and before delivery | Original selected sketch, visitor task, operable preview URL, desktop/phone screenshots with viewport sizes, task route and interaction contract, design specification, exact owner comments and agreed adaptations | First perform the visitor task at both sizes; then compare the sketch and page for composition, visual hierarchy, mobile layout, and interaction feedback. |

Apply only the checkpoint reached by the task. An already selected direction does not require another candidate set. An implementation from a refined sketch needs the page review; do not create an extra image revision just to trigger a checkpoint.

For page review, first approach the preview as a visitor, find the task entry point, and operate the primary interaction at the target desktop and phone sizes without the maker's walkthrough. In the florist example, find the bouquet selector, switch to another bouquet, and observe whether the main image, name, and description update together. Then compare the page to the original selected sketch and agreed adaptations. Inspect whole composition and section transitions before local alignment: focal point, crop, text space, material/light, defining details, hierarchy, mobile reading order, controls, and interaction feedback. After this unassisted task attempt, run the applicable acceptance probes in [Interaction and motion](interaction-and-motion.md): unfinished transitions with new input, reverse/Back/close/reopen, layout stability, scroll interruption, touch/keyboard, reduced motion, and slow/failing requests with recovery. Use the agreed contract to judge expected behavior, not the duration ranges as hard pass/fail limits. Distinguish observed behavior from source inspection and screenshot evidence.

## Handoff template

Adapt this to the checkpoint and actual host tools:

> Independently review the attached artifacts for this agreed brief: [visitor task and success criterion]. Stage: [candidate set / selected refinement / implemented page]. Target sizes and inputs: [sizes, devices, input modes]. Artifacts: [original selected sketch or candidate images, operable preview URL, desktop/phone screenshots, design specification, task route and interaction contract]. Owner feedback and agreed changes, if any: [verbatim comments with context]. For an implemented page, first find and complete the visitor task at both sizes; then compare composition, visual hierarchy, mobile layout, and interaction feedback with the sketch and run the applicable interaction acceptance probes. Report reproducible defects and evidence-based design judgments in separate records as described below. For each defect, state page location, device or screen width, starting conditions and steps, expected and actual behavior, visitor impact, and supporting evidence. Put unavailable access and untested checks in a separate limitations record. Do not edit, delegate further, or contact the owner. For candidates, assess compliance and distinctness without ranking them. For a chosen direction, preserve the owner's choice and identify any correction that would change it. If you cannot operate the preview, state which screenshot or evidence review you actually completed; do not claim independent interaction verification.

## Resolve findings and recheck

Keep the defect list limited to issues the reviewer can reproduce from the supplied artifact or operable preview. Keep speculative concerns, personal stylistic preferences, and untested checks out of that list. Record supported design judgments separately below; they are not automatically functional failures or owner preferences. A visual issue can be reproduced by opening a named screenshot or page at the specified size; a claimed interaction failure requires operating the page. Use this record for every issue:

| Field | Record |
| --- | --- |
| Page location | Page, section, and control or element affected. |
| Device or screen width | Actual device/browser or viewport dimensions in CSS pixels; record input mode when relevant. |
| Reproduction steps | Starting state, data/loading conditions when relevant, and numbered actions that reproduce the issue. |
| Expected behavior | Observable result required by the brief, sketch, agreed adaptation, or interaction specification. |
| Actual behavior and evidence | What actually happened; attach the relevant screenshot path or recorded browser observation. |
| Visitor impact | Which task, information, or owner-valued detail is obstructed and how. |
| Correction | Smallest change that addresses the consequence without erasing the selected direction. |
| Resolution and recheck | The implementing agent's fix, reasoned disagreement, explicitly accepted deviation, or pending check; result observed after repeating the same reproduction steps at the same size and starting state. |

### Separate design judgments about motion

After task correctness, ask: **Can the eye follow the new focus? Did substantial unchanged content move unnecessarily? Did a local change make the surrounding page shake?** Compare the observed transition to the project's stable/changing/continuity map and choreography in [Interaction and motion](interaction-and-motion.md).

For each supported judgment, record the page/element, viewport and input, trigger, observed sequence (with recording timestamp or live observation), effect on attention/readability, and a proportionate proposed adjustment. Label the conclusion as a design judgment, with uncertainty where appropriate; use disposition such as adjusted, retained with rationale, or awaiting observation rather than pretending it is a reproducible state bug. An actual violation of the agreed brief may instead belong in the defect list with its reproduction evidence; avoid duplicate entries.

Do not infer felt pacing from screenshots, durations, or source code alone. With only static/text evidence, record the layer/choreography concern as a hypothesis and leave the motion judgment pending. Do not turn the reviewer's taste into an owner preference. The original maker resolves judgments against the brief and owner's chosen direction; after an adjustment, reobserve the same transition and record whether attention is easier to follow.

Repair concrete brief failures before showing candidates, without making all directions look alike. Keep any internal critique out of the initial presentation; show neutral identifiers and wait for the owner's response before recommendations.

For a selected design, do not treat a reviewer's stylistic preference as owner feedback. Resolve a proposed change that would overturn the owner's choice with the owner before implementing it. Have the original implementing agent make routine corrections within the agreed direction and repeat each issue's exact reproduction steps at the same size and starting state. Record the observed results, then have the same reviewer perform the focused recheck when access permits; do not close a finding solely because source code changed.

Use one initial pass and one focused recheck as the default. Further work needs an unresolved criterion or observed problem, not a wish for endless polish. Finish when consequential findings are resolved or explicitly accepted and the selected detail survives. At delivery, identify each fixed issue and its recheck result, unresolved issues, who reviewed, what they actually inspected (interactive review, screenshot review, or self-review), and remaining limitations. Keep runtime acceptance pending for consequential untested paths.
