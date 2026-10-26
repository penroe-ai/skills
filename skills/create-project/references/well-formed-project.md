<!-- Copied from shared/well-formed-project.md. Edit that file, then run: node scripts/sync-references.mjs -->

# A well-formed Penroe project

Use this when you build a project or change its structure. A well-formed project is one the team can run from and the client would recognize. It says only what the sources say, and it shows the gaps instead of hiding them.

## Cite it or leave it out

- Every item you propose comes from the source. Keep a short quote, or a pointer to where it came from, so the person can check it.
- Mark anything the source doesn't cover as "not in the source". Don't fill it in.
- A one-paragraph source gives a small project. That's correct. Don't add a "Phase 3: Launch" the source never mentions.
- Work that good practice expects but the source doesn't state (project management, integration and testing, client reviews) is a separate, clearly labeled suggestion. Never mix it into what the source says.

## Structure

- Break the work down by what gets handed over (deliverables), not by activity. Deliverables stay stable while methods change.
- The plan should cover all the scope the source describes, and nothing outside it. Put explicit exclusions in the description.
- Size tasks so someone can finish one and report it done: roughly a day to two weeks of work. Group smaller steps into one task.
- Phases need a start and an end date. Milestones need a target date. If the source doesn't give them, the item can't be a phase or milestone yet. Keep it as a deliverable or task, or ask for the dates.
- Attach gating work to a milestone only when the source says what has to be done to reach it.
- Add a phase dependency only for explicit causal language ("design can't start until research is signed off"). Order, adjacency or overlapping dates don't create one.
- A task's phase must match its deliverable's phase.

## Dates

- Use only dates the source states. Leave the rest empty, and list them for the person: "These have no dates yet: …".
- Don't estimate durations and don't spread dates across a phase.
- Set a Committed date only for a date the source presents as promised to the client, and only after the person confirms it. This connection can set Committed end, target and due dates; Committed start dates are set in the app.

## People

- Assign an owner only when the source names one, and only someone on the project team as an admin or member (a viewer can't own work). List the unowned items for the person instead of guessing.
- "The team will handle it" names nobody.
- A job title isn't a project role and doesn't make someone a decision-maker. "VP Operations" tells you a title. "Sam will approve all deliverables" tells you a role.
- Match a role to an existing one by meaning. "Project Mgr" is "Project Manager"; "Product Manager" is not. When nothing matches, leave it unset rather than picking the closest name.
- Place a person on the client side or ours only on structural evidence: a signature block, a client heading, or an email domain.

## The client

- An account needs the client's real email domain. Use a domain only when it appears in an email address in the source. Never guess one from the company name, and never use a free email domain (gmail.com, outlook.com).
- Search for the account and its contacts before creating them. A contact with the same email address is the same person. If creating the account fails because another account already owns the domain, the account exists; ask the person to add it to the project in the app.
- Name the sponsor and the single client approver as contacts when the source identifies them.

## Risks

- A statement of work's assumptions, dependencies on the client and exclusions are the usual source of a project's first risks. Propose them; don't add them without a yes.
- Each risk is one concrete thing on this project, with the quote it came from.

## When a template is involved

- The documents win on the engagement's facts: names, dates, scope.
- The template supplies the process: the shape of the phases, standard deliverables and review steps.
- When the two disagree, show both and let the person choose.

## What the person still sets in Penroe

Tell the person what's left for them to do in the Penroe app:

- activity rules beyond the defaults (which email and meetings come into the project automatically)
- Committed start dates
- linking an account that already exists in the workspace
- a Slack channel for the project
- groups that should be able to see the project, when the connection can't set them
