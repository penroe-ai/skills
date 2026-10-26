<!-- Copied from shared/when-a-tool-is-missing.md. Edit that file, then run: node scripts/sync-references.mjs -->

# When a tool is missing or a change is refused

Not every Penroe connection can do everything. Use only the tools you can see in your tool list. Never call one you can't see, and never work around a missing one.

## An option is off on this connection

When someone connects Penroe, the authorization screen offers three options under "Also enable (optional)": **Project templates**, **Groups and project roles**, and **Review queue**. When an option is off, its tools are not in your list, and Penroe's connection instructions say so.

Take the skill's fallback. When the option would have helped with what the person asked for, tell them once that they can add it by reconnecting Penroe and ticking it. Don't retry.

## The connection doesn't have enough access

Some connections are read-only. A write tool may be listed but refused because the connection lacks access. Some assistants then ask the person to approve more access.

If the person approves, try once more. If not, say what you needed and carry on with what you can read.

## A permission setting blocks it

The person or their workspace admin can block a kind of action (deleting, sharing) for AI assistants. Usually the blocked tools are simply missing from your list. Sometimes a call that does more than its tool usually does (sharing, for example) answers that the action is blocked by a permission setting.

Tell the person the change wasn't made and that it's controlled by a permission setting in Penroe, theirs or their admin's. Don't retry it another way.

## Penroe can't do it at all

Some things aren't possible through the connection, such as sending email or messages on the person's behalf. Say so in one line, and point to the closest thing Penroe can do (post a status update, attach a document, add a comment).
