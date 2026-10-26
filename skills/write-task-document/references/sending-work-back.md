<!-- Copied from shared/sending-work-back.md. Edit that file, then run: node scripts/sync-references.mjs -->

# Making changes and sending work back

## Before you change anything

- Read first. Know the current state of everything you plan to change.
- Show the person what you'll change, grouped so they can approve it in one go. Your assistant may not show its own approval prompt for Penroe's tools, so ask in words.
- Removals, sharing and changes to the project team each need their own clear yes. Never remove things in bulk on one request.
- When the project, item, date or title is missing, ask. When a lookup finds several candidates, list them and let the person pick.
- Before creating something, check that it doesn't already exist under another name (`search`).
- Propose only the changes your source supports. Leave alone the items the source doesn't mention.

## While you change it

- Record why. When the tool takes a reason, say where the change came from (the email subject, the meeting and its date) and who approved it. When it doesn't, add a short comment on the item (`add_comment`).

## After

- Say a change is done only once the tool confirms it.
- Tell the person what changed, by name and item key, and anything that didn't go through.
- If the person turns a proposal down, don't propose it again.

## Sending a document back

`add_project_document` attaches a finished document to a project.

- Send a Google Drive or OneDrive link if the document lives there. Penroe opens it with the person's own account, so it must be a file they can open. Otherwise send the finished text as markdown.
- Pass the task when the document was written for one.
- The document lands on the project visible only to the person. They share it from Penroe when they're ready. Tell them so.

## Corrections the person made

When the person said a fact from Penroe was missing or wrong, list it as a short statement in their words when you send the document back. Penroe remembers it for them.

When the person says a correction should apply beyond this document ("always lead client updates with the decision"), send it as a reusable correction. It goes to whoever manages the firm's plays for approval and changes nothing until then. Write it as:

- **When it applies:** the situation, in general terms.
- **What to do:** one instruction, in the firm's voice.

Leave out people's names, client names and project names. Personal taste isn't firm practice. Send only corrections the person asked to reuse, and don't quote their private wording word for word.
