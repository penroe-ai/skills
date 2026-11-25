<!-- Copied from shared/sharing-rules.md. Edit that file, then run: node scripts/sync-references.mjs -->

# Sharing rules

A project's sharing rules decide which emails and meetings from the team's own mailboxes and calendars come into the project on their own, without anyone sharing them one at a time. Penroe checks a project's rules in order, and the first rule that matches an item decides it. Read them with `list_sharing_rules`, add or change one with `save_sharing_rule`, and turn one off with `delete_sharing_rule`.

Rules work forward. A rule acts on mail and meetings from the time it is saved, and settles what is already waiting for review that it covers. It never changes an item someone already shared, held or declined.

## The two rules most projects need

Most projects are well served by two rules, and need nothing more.

### Keep the parity rule

Every project starts with the parity rule (marked `is_parity_rule: true` in `list_sharing_rules`). It brings in email and meetings that every member of the project can already open where they live, such as a meeting the whole team is invited to. Because it only adds what everyone could already see, it asks nobody for approval.

Keep it. It is the project's default, and almost every project depends on it. Don't turn it off to "start clean" or to tidy the list.

- If the person asks to remove it, explain what it does and recommend keeping it. Turn it off only after they clearly confirm, and only then call `delete_sharing_rule` with `confirm_parity_deletion: true`.
- If a project is missing it, offer to put it back: `save_sharing_rule` with `condition: source_system_parity`. This is safe to call when it is already there.

### Add one rule for the client account

For a project with a client account, add one rule that brings in mail and meetings with anyone at that account: `save_sharing_rule` with `condition: participants_at_least` and the account as the only subject. Penroe matches the account by its email domain, so this one rule covers the client's whole team, including people who join later. It brings in most of what a client project needs, so recommend it whenever the project has an account.

- Name the account, not its people one by one. A list of contacts misses anyone new and needs updating.
- Leave the audience as self, the default. The rule then reads only the mail of the person who saves it.
- The account must already be on the project, with its real email domain. If the rule is refused because the account has no domain, fix the account first.
- An internal project, with no account, doesn't need this rule.

## Whose mail a rule reads

- **self** reads only the mail of the person who saved the rule. This is the default, and the right start.
- **team** asks every project member to approve. It reads a member's mail only after that member approves it in Penroe, so for now it covers only the people who have. The result of `save_sharing_rule` lists who is still pending; tell the person, so a rule that seems to do little isn't mistaken for a broken one.

Suggest team only when the person asks for the whole team's mail. Each teammate decides for their own mailbox, and you can't approve for them.

## Earlier mail

When a rule that brings items in is saved, `save_sharing_rule` also adds the person's own matching email and meetings from the last 90 days, where their workspace offers it. These start private to the person and are shared through the same checks a new item goes through. The result says how many were added and how many are still waiting. Tell the person both numbers. Pass `backfill_days: 0` when they'd rather start from today.

## Before you add or change a rule

- Call `list_sharing_rules` first. Don't add a rule the project already has; `save_sharing_rule` refuses one that says the same thing as another.
- A rule changes what the whole project team sees, so it needs its own clear yes. Show the rule in plain words ("Bring in email and meetings with anyone at Fernhill Coffee, from your mailbox, including the last 90 days") and wait for the person to agree.
- Keep-out rules (nobody outside these people, exactly these people, or one sender) are for a specific problem the person names, such as one-to-ones they want kept private or an automated sender. Don't add them by default.
- To turn a rule off, call `delete_sharing_rule` with `preview: true` first. It says which contacts would leave the project because only that rule added them. Explain that before you delete.
