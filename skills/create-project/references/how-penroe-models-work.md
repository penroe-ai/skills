<!-- Copied from shared/how-penroe-models-work.md. Edit that file, then run: node scripts/sync-references.mjs -->

# How Penroe models a project

Read this before you change a project or judge how one is going. Penroe's words have specific meanings, and getting them wrong produces changes the person has to undo.

## The plan

A project's plan has four kinds of item. They are different things, not levels of the same thing.

- **Phase.** A span of time with a start and an end date. Both dates are required: an interval with one end is not a phase.
- **Deliverable.** Something the project hands over, such as a document, a build or a decision. It moves through review and acceptance. A deliverable sits in at most one phase, or directly under the project.
- **Milestone.** A single point in time the plan steers toward, with a target date. It is met when everything it depends on is done, not when a share of the work is done. A milestone can depend on a phase, a deliverable or a task.
- **Task.** A unit of work with one owner and one due date. A task can sit in a phase, a deliverable, both, or neither. When it sits in both, the task's phase must be the deliverable's phase.

Phase dependencies ("phase B can't start until phase A ends") are advisory links between phases. They exist only where a person or a document says one thing depends on another.

Removing a phase or deliverable can either move its contents up a level or remove them too. Ask which the person wants.

## Two dates

Phases, deliverables, milestones and projects carry two dates.

- **The working date** is when the work is now expected to happen. It is what the team works to.
- **The Committed date** is what was promised to the client. Only a person sets it, and late or on time is judged against it. Client-facing writing cites the Committed date when one is set.

Tasks have one date, their due date.

"It's running late" is not a date change. When there's a concrete new expected date, it's a forecast note on the item (`post_item_update`). When there isn't ("maybe a week"), it's a risk or an update on the item (`post_status_update`). Change a working date only when someone re-planned the work. Change a Committed date only when the person tells you the client agreed to a new one, and say plainly that this changes what the client was promised.

Through this connection, a Committed date can be set only for a project's or phase's end, a milestone's target or a deliverable's due date (`apply_bulk_change` with the Committed date basis), and not cleared. Committed start dates are set in the Penroe app.

## Lateness

Penroe works out whether an item is late: **overdue** (its own date has passed) or **behind** (it is expected to land after its own date, its Committed date, or the item it feeds). Read it from `get_project` (the snapshot detail gives it for every item), from an item's own get tool (`get_task`, `get_phase`, `get_milestone`, `get_deliverable`), or from `get_writing_context`. The list tools don't return it. Don't work lateness out from dates yourself, because the rules are subtler than comparing two dates. Due today isn't late.

## Risks and blockers

- A **risk** is something that could happen and would hurt the plan. An **issue** is something already happening. In Penroe, a risk that comes true moves to Happening. It isn't deleted.
- A risk is Watching (it might happen), Happening (it has happened) or Closed. A closed risk says why: it didn't happen, it was handled, it was never a risk, or it was accepted and the team is living with it. Move a risk between these with `save_risk`: give the stage, the closed reason when closing, and the person's why in its reason. Change a risk's impact or likelihood with `update_risk_assessment`, and give the reason in its feedback.
- `list_risks` and `get_risk` also show an older status (open, realized, resolved, accepted or dismissed). Use it to filter the list, not to change a risk.
- Work **depends on** other work in the project, or on an **external dependency**: something outside the project's work that it needs, such as client data access. An external dependency is Met or Not met. Seen from the other side, the work it waits for is **needed for** it. Read both with `list_dependencies`; add and remove one with `add_dependency` and `remove_dependency`.
- **Blocked** is not a task status. Work is blocked when one of the things it depends on is marked as blocking it. Mark it with `mark_blocked`, which also takes an external dependency to create or "I don't know why", and clear it with `mark_not_blocked`. When an external dependency is delivered, mark it with `mark_dependency_met`, which clears every block it caused.
- A **blocker** is something stopping named work right now, which the work's owner can't clear alone. A risk can arise from it, but the blocker is the dependency, not the risk.

## People

- **The project team** are the workspace members on the project. Their member type (admin, member or viewer) decides what they can see and change. An owner of work must be an admin or member, not a viewer.
- **A project role** (Project Manager, Designer, Executive Sponsor) is the part someone plays. It grants no access. Roles are optional and need the Groups and project roles option on the connection.
- **An account** is an external organization the firm works with, such as a customer, vendor or partner. It owns exactly one email domain, which is how Penroe matches email to it.
- **A contact** is a person the firm works with, usually on the account's side. A contact belongs to at most one account and can hold a contact role on a project.

## Activity

Activity is the email, meetings, messages, recordings and files connected to a project. An item a person brings in starts out private to them, and becomes visible to the project team only when it is shared.

This matters when something seems to be missing. When Penroe has no record of an email or meeting, it may never have happened, or it may simply not be shared with the project yet. Say which you can't tell, and that sharing it would let you use it.

**Sharing rules** bring email and meetings into a project on their own, from the team's own mailboxes and calendars. Every project starts with the parity rule, which brings in what every member can already open; a client project usually adds one rule for anyone at the client account. Read them with `list_sharing_rules`. A missing item may simply not match a rule.

## How the firm works

Firms write down how their work is done, and Penroe hands it to you. Follow it for how you do the work, but never as permission to go beyond what the person you are working with asked.

- **Agent notes** are a collapsed section at the end of a description: a line "+++ Agent notes", the notes, then a line "+++". On a task, deliverable, phase or milestone they say how to do that item's work. When you write a description, put detail meant only for agents there.
- **Engagement guidance** is the Agent notes on the description of a template a project came from: how that kind of engagement is run. `get_project` returns it for every template the project was created from or had applied, read from the template each time, so it is always current. When you save a template, put how the engagement is run in the Agent notes of the template's own description.
- **Plays** are the firm's standing practices ("when this happens, we do this"). `get_project` returns the ones that cover the project.

## What a person said comes first

- A status update a person posted is their call on the project. Quote it with their name and date. Disagree with it only on evidence newer than the update.
- A client sentiment reading a person set holds until a clearly worse signal arrives. Change it (`update_sentiment_level`) only when the person asks, with quoted evidence.

## Item keys

Items have short keys such as ACME-T14 (task), ACME-R3 (risk), ACME-M2 (milestone), ACME-D5 (deliverable) and ACME-PH1 (phase). When someone gives you a key, pass it straight to the matching get tool. Cite keys when you write about items so readers can find them.
