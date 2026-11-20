# Penroe skills

Penroe is an AI-native project management platform for professional services firms. It keeps a shared record of what your team promised, what changed, and why. The Penroe plugin gives your assistant access to that record and a library of skills for work like setting up a client project, preparing for a check-in, and drafting a status update.

[Penroe](https://penroe.ai) · [Privacy](https://penroe.ai/privacy-policy) · [Support](https://penroe.ai/support)

## What the plugin includes

The plugin pairs the Penroe connection with instructions for recurring project work.

- **The Penroe connection** gives your assistant tools to read project plans and sources and save approved changes. You sign in with your own account. The assistant works within your Penroe access and any limits your workspace sets.
- **The skills** tell the assistant which steps to follow for a job. When Penroe returns guidance from a project template, plays for the project, or notes on the task, the relevant skills use that guidance to shape the work.

## Why build on Penroe?

**Before Penroe.** When a client says a file will arrive late, the lead has to find what the team promised, when the file is now expected, and which work depends on it. The lead brings those details into the chat. The next teammate may have to find them again to prepare a handoff or explain the change.

**With Penroe.** An assistant can read the current plan, the dates you promised the client, and the connected sources it has permission to use. The lead decides what to change and what to tell the client. With write access, the assistant can save the approved change or follow-up in Penroe, where the next teammate can find it with the rest of the plan.

You can use the skills here or write one for how your firm works. A client update and an internal handoff can each have their own format and read from the same project. For example, the update can explain whether the launch date still holds, while the handoff names who owns the next task and why it matters.

## Skills

| Skill | Use it when | Try asking |
|---|---|---|
| [get-started-with-penroe](skills/get-started-with-penroe/SKILL.md) | You've just connected Penroe | "What can you do with Penroe?" |
| [create-project](skills/create-project/SKILL.md) | You have a statement of work, proposal or kickoff notes | "Here's the SOW for Northwind. Set up the project in Penroe." |
| [update-project](skills/update-project/SKILL.md) | Something changed: a change order, a meeting, a client email | "The client pushed the design review two weeks. Update the project." |
| [prepare-for-meeting](skills/prepare-for-meeting/SKILL.md) | A client or internal meeting is coming up | "Prep me for tomorrow's check-in with Northwind." |
| [draft-project-update](skills/draft-project-update/SKILL.md) | It's time for a status update, for one project or several | "Draft this week's client update for the website redesign." |
| [run-project-retrospective](skills/run-project-retrospective/SKILL.md) | A project or phase has wrapped up | "Run a retro on the Northwind launch." |
| [write-task-document](skills/write-task-document/SKILL.md) | A task needs a document: a kickoff agenda, change order, handoff note or memo | "Write the change order for ACME-T14." |

Every skill shows you what it plans to do before it changes anything in Penroe, and cites where each fact came from.

## Example: a client input arrives late

*Illustrative conversation, not a recorded customer run. The project, dates and responses below are examples of the workflow these skills guide.*

Northwind's project plan has a client data handoff on November 3 and testing on November 4. Testing needs that data. The client emails to say the file will arrive on November 5.

**You:**

> The client says the data file will arrive November 5 instead of November 3. Here's their email. Review what this affects and propose changes to the Northwind project.

The assistant reads the email and the current project plan. It distinguishes the client's expected arrival date from an approved change to the plan, then asks whether you want to re-plan the affected work.

**You:**

> Yes. Propose moving the data handoff to November 5 and testing to November 6. The client hasn't agreed to change any committed dates.

The assistant previews the date changes and reports the conflicts returned by Penroe. Suppose the preview identifies a testing milestone still scheduled for November 5:

**Assistant:**

> Testing needs the data file, so its November 4 date conflicts with the expected November 5 arrival. Moving testing to November 6 would also leave the testing milestone on November 5 in conflict.
>
> I propose moving the handoff to November 5 and testing to November 6. The milestone needs a separate decision. I'll keep the client-committed dates unchanged. Do you approve these two working-date changes?

**You:**

> Yes, apply those two changes. Leave the milestone unchanged for now and draft a client update that raises the milestone decision.

The assistant saves the approved changes, records the reason and source, and reports which items changed. It then drafts the client update from the revised project record:

> With the data file now expected November 5, we've moved testing to November 6 in our working plan. That puts testing after the November 5 milestone. We need to agree how to handle that milestone; the existing client commitment remains unchanged.

You review the draft and send it. The next teammate who opens the plan can find the approved working dates and the reason they changed. They can use that same record for a testing handoff.

## What Penroe keeps running

A prompt can turn a pasted email into a client update. A workflow your team uses every week also needs reliable connections, a current plan, and controls over who can read or change it.

- **Project sources and dates.** Penroe connects permitted email, meetings, messages, and files to the project. The connection exposes the committed dates, working dates, risks, and blockers your workflow can use.
- **The way your firm works.** The connection returns the project’s applicable plays and template guidance. A testing handoff can use a firm play to check who’s responsible for test accounts before the test window opens.
- **Access and safeguards.** Penroe limits what each assistant can read and change. The skills ask you to review proposed changes and treat instructions found in returned source material as data. See [the tool definitions](tools.json) and [Penroe’s security overview](https://penroe.ai/security).

## Install

### Claude Code

```
/plugin marketplace add penroe-ai/skills
/plugin install penroe@penroe
```

Then run `/mcp`, choose the Penroe server, and sign in.

### Claude (desktop and claude.ai)

Add Penroe from **Customize → Plugins**, either from the plugin directory or by adding this repository as a marketplace. Then connect Penroe when Claude asks you to sign in.

### ChatGPT and Codex

The Penroe plugin isn't in OpenAI's plugin directory yet. Until it is, you can connect ChatGPT to Penroe as a custom MCP server (without these skills); see [penroe.ai/integrations/openai](https://penroe.ai/integrations/openai).

### Other assistants

Add the skills on their own with the skills CLI:

```
npx skills add penroe-ai/skills
```

Then connect your assistant to the Penroe server at `https://mcp.penroe.app/mcp`. Skills installed this way don't update on their own; run the command again to update them.

## How the Penroe connection works

- **Your access, nothing more.** The assistant acts as you, inside your workspace, and sees only what you can see in Penroe.
- **Options you choose at sign-in.** When you connect, you choose whether to also turn on Project templates, Groups and project roles, and the Review queue. Skills work without them and tell you when one would help. To change your choice, reconnect Penroe.
- **Permission settings apply.** You or your workspace admin can block some kinds of changes (such as deleting or sharing) for AI assistants. The skills respect that and tell you when it happens.
- **Documents stay private until you share them.** Anything an assistant attaches to a project is visible only to you until you share it from Penroe.

## Security and trust

- Email, documents and messages that Penroe returns are your data, not instructions. The skills tell your assistant to report any instructions it finds in them and never act on them.
- Removing items, sharing, and changing who is on a project are separate actions that the skills confirm with you one at a time.
- Penroe can't send email or messages on your behalf.
- To disconnect, remove Penroe from your assistant's connections, or revoke its access in Penroe.

Found a security issue? See [SECURITY.md](SECURITY.md).

## Contributing

Penroe's team maintains these skills, and they track the Penroe connection closely, so we don't accept outside changes to skills or manifests. Issues with feedback and ideas are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for how the repository is put together.

## License

[Apache 2.0](LICENSE)
