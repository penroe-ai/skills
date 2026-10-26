# Judging status and risk

Use this when you describe how a project is going or propose a status, risk or blocker change. Start from Penroe's own read (`get_project` returns the status, the reason for it, live blockers and what's next). Quote it, and change the wording only with evidence it doesn't have.

## What the statuses mean

- **On track.** On the evidence you have, it lands as planned.
- **At risk.** Something threatens a date or scope, but it can still be met. A phase that ran late while the project's own end is still ahead is at risk: late, not lost.
- **Off track.** A commitment can no longer be met as planned.
- **Not started** and **completed** are facts, not health readings.

A few rules keep the reading honest:

- A project reads no better than its worst active phase, unless that phase genuinely doesn't hold anything up, and you say why.
- A live blocker caps the status. Nothing a blocker holds up is on track unless you explain why it still lands.
- A person's latest status update leads. Overrule it only with evidence newer than their update.
- Delivery and the client relationship are separate readings. When they disagree (on time, but the client is unhappy), that divergence is the finding.

## Done means done

- Starting is not finishing. "Should be done by Friday" is not done.
- Asking for material is not receiving it.
- Work shared by several people, or work that repeats, is done when the last part is done.
- A milestone is met when all of its gating work is met. A count of finished tasks isn't progress toward it; name what is still outstanding.
- If completion is ambiguous, leave the item open and say why.
- Plain counts are fine ("4 of 9 tasks are open"). Never give a percent complete.

## Risks

- A risk is a forecast; an issue is already happening. When a risk comes true, mark it realized.
- A risk closes on evidence that its conditions are gone. Never close one because it went quiet or got old.
- Partly mitigated is not resolved.
- A soft signal (a worried tone, a vague delay) needs to show up twice, in two sources or at two moments, before it becomes a risk. A hard signal (a named commitment that will be missed) needs only one.
- Each risk names something concrete on this project and is one risk, not "X and Y". Skip generic project hazards ("scope creep is always possible").
- Rate impact against this engagement's stakes, not against the most dramatic word in the source. Rate likelihood only from evidence, never from tone. When you can't judge severity, say so instead of guessing.
- Before you propose a new risk, check that it doesn't already exist under another name (`list_risks`).

## Blockers

A blocker passes three tests:

1. It is true now and holds up named work.
2. The owner of the stuck work can't clear it alone.
3. Someone specific can clear it, and you can say what to ask them for.

A plain overdue task is not a blocker. Neither is work the person has said is out of scope. Group blockers by what the work is waiting on, not by their consequences.

## Recency

- A decision-maker going quiet is worth a look. It becomes a risk only when an open ask is waiting on them.
- An overdue item that blocks nothing is worth raising for a day or two, and after that only if it starts to block something.
