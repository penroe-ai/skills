# Repository instructions for agents

This repository is public. Anyone can read every file, commit, branch name, pull request, review and comment in it, and that text stays readable after it is edited. Treat everything you write here as published.

The skills describe Penroe from the outside: what a connection exposes in `tools.json` and in each tool's description. Write commits, pull requests and reviews the same way.

## Never write these anywhere in this repository

This covers files, commit messages and trailers, branch names, pull request titles and bodies, review comments and issue comments.

- Issue tracker IDs or links, such as `ABC-123` or a link to the tracker. This includes branch names: name a branch for the change, not the ticket.
- Links to private repositories, their pull requests or their files, and paths or module names from private code.
- Release identifiers that only exist internally, such as image tags, commit SHAs of private repositories or deploy names.
- Agent session links (claude.ai/code session URLs, or links to any other agent's run) and session trailers such as `Claude-Session:` in commit messages. Remove them from generated text before you commit or post.
- Links to private documents, recordings, videos, dashboards or meeting notes, including unlisted ones.
- Server internals: table, column or queue names, infrastructure and environment names, error text that is not shown to users.
- Customer, prospect or workspace names and any data taken from a real workspace. Use made-up examples, like the ones in `evals/files/`.
- Names, emails or chat handles of people, beyond the commit author and the reviewers you request.
- Secrets of any kind, even ones you think are expired.

## Say why without the private context

Explain a change by what it changes for someone using the skills, and back it with something a reader of this repository can check: a tool name and its description, a skill file, an eval. "save_account now needs a project, so create-project creates the project first" is enough. If the reason lives in a private ticket or code, state the reason in plain words and leave the reference out.

## Before you push or post

Read back the full text you are about to send, including the commit message trailers, the branch name and any generated footer, and check it against the list above. Do this for review comments too: a review that quotes a ticket ID or a private file path leaks it.

If something from the list is already pushed, stop and tell a person. Editing a pull request body or comment hides the text but GitHub keeps its edit history, and a commit trailer or branch name can only be removed by rewriting history, which needs a person's approval.
