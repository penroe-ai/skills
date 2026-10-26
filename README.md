# Penroe skills

Run your client projects in Penroe from the AI assistant you already use. These skills teach Claude, ChatGPT and other assistants how to do the jobs a delivery lead does every week: create a project from a statement of work, keep it current, prepare for meetings, draft status updates, run a retrospective, and write the documents tasks call for.

[Penroe](https://penroe.ai) · [Privacy](https://penroe.ai/privacy-policy) · [Support](https://penroe.ai/support)

## What this is

This repository is the Penroe plugin. It bundles two things:

- **The Penroe connection.** It links your assistant to your Penroe workspace (`https://mcp.penroe.app/mcp`). You sign in with your own Penroe account, and the assistant can see and change only what you already can.
- **Skills.** Each skill is a short set of instructions for one job. Your assistant reads a skill when your request matches it, so it follows the same steps an experienced project lead would, using Penroe's own read of each project.

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

Install Penroe from the ChatGPT plugin directory. See [penroe.ai/integrations/openai](https://penroe.ai/integrations/openai).

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
