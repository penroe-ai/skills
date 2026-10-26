# How Penroe models a project

Read this before you change a project or judge how one is going. Penroe's words have specific meanings, and getting them wrong produces changes the person has to undo.

## The plan

A project's plan has four kinds of item. They are different things, not levels of the same thing.

- **Phase.** A span of time with a start and an end date. Both dates are required: an interval with one end is not a phase.
- **Deliverable.** Something the project hands over, such as a document, a build or a decision. It moves through review and acceptance. A deliverable sits in at most one phase, or directly under the project.
- **Milestone.** A single point in time the plan steers toward, with a target date. It is met when the work that gates it is done, not when a share of the work is done. Gating work can be a phase, a deliverable or a task.
- **Task.** A unit of work with one owner and one due date. A task can sit in a phase, a deliverable, both, or neither. When it sits in both, the task's phase must be the deliverable's phase.

Phase dependencies ("phase B can't start until phase A ends") are advisory links between phases. They exist only where a person or a document says one thing depends on another.

Removing a phase or deliverable can either move its contents up a level or remove them too. Ask which the person wants.

## Two dates

Phases, deliverables, milestones and projects carry two dates.

- **The working date** is when the work is now expected to happen. It is what the team works to.
- **The Committed date** is what was promised to the client. Only a person sets it, and late or on time is judged against it. Client-facing writing cites the Committed date when one is set.

Tasks have one date, their due date.

"It's running late" is not a date change. When there's a concrete new expected date, it's a forecast note on the item (`post_item_update`). When there isn't ("maybe a week"), it's a risk or a comment. Change a working date only when someone re-planned the work. Change a Committed date only when the person tells you the client agreed to a new one, and say plainly that this changes what the client was promised.

Through this connection, a Committed date can be set only for a project's or phase's end, a milestone's target or a deliverable's due date (`apply_bulk_change` with the Committed date basis), and not cleared. Committed start dates are set in the Penroe app.

## Lateness

Penroe works out whether an item is late: **overdue** (its own date has passed) or **behind** (it is expected to land after its own date, its Committed date, or the item it feeds). Read it from `get_project` (the snapshot detail gives it for every item), from an item's own get tool (`get_task`, `get_phase`, `get_milestone`, `get_deliverable`), or from `get_writing_context`. The list tools don't return it. Don't work lateness out from dates yourself, because the rules are subtler than comparing two dates. Due today isn't late.

## Risks and blockers

- A **risk** is something that could happen and would hurt the plan. An **issue** is something already happening. In Penroe, a risk that comes true is marked realized, not deleted.
- Risk statuses: open, accepted (we know and are living with it), resolved (the mitigation worked), dismissed (a false alarm, or no longer worth tracking) and realized (it happened). Change a risk's status, impact or likelihood with `update_risk_assessment`, and give the reason in its feedback.
- A **blocker** is a risk that is stopping named work right now, which the work's owner can't clear alone. A blocker names who can clear it and what is being asked of them (`set_blocker_call`).

## People

- **The project team** are the workspace members on the project. Their member type (admin, member or viewer) decides what they can see and change. An owner of work must be an admin or member, not a viewer.
- **A project role** (Project Manager, Designer, Executive Sponsor) is the part someone plays. It grants no access. Roles are optional and need the Groups and project roles option on the connection.
- **An account** is a client organization. It owns exactly one email domain, which is how Penroe matches email to it.
- **A contact** is a person the firm works with, usually on the client side. A contact belongs to at most one account and can hold a contact role on a project.

## Activity

Activity is the email, meetings, messages, recordings and files connected to a project. An item a person brings in starts out private to them, and becomes visible to the project team only when it is shared.

This matters when something seems to be missing. When Penroe has no record of an email or meeting, it may never have happened, or it may simply not be shared with the project yet. Say which you can't tell, and that sharing it would let you use it.

## What a person said comes first

- A status update a person posted is their call on the project. Quote it with their name and date. Disagree with it only on evidence newer than the update.
- A client sentiment reading a person set holds until a clearly worse signal arrives. Change it (`update_sentiment_level`) only when the person asks, with quoted evidence.

## Item keys

Items have short keys such as ACME-T14 (task), ACME-R3 (risk), ACME-M2 (milestone), ACME-D5 (deliverable) and ACME-PH1 (phase). When someone gives you a key, pass it straight to the matching get tool. Cite keys when you write about items so readers can find them.
