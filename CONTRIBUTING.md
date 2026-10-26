# Contributing

Penroe's team maintains this repository. We welcome issues with feedback, bugs and ideas. We don't merge outside pull requests to skills or manifests, because each change is checked against the Penroe connection before it ships.

## How the repository is put together

```
skills/<name>/SKILL.md        one skill per folder; the folder name is the skill name
skills/<name>/references/     files the skill reads when it needs them
shared/                       references used by more than one skill (the source)
shared/manifest.json          which shared references each skill ships with
tools.json                    the Penroe tools a skill may name
.claude-plugin/               Claude plugin and marketplace manifests
plugin.json, mcp.json         the portable plugin manifest (ChatGPT, Codex and others)
.mcp.json                     the Penroe connection for Claude
evals/<name>/evals.json       test prompts for each skill
scripts/                      sync and validation
```

## Shared references

Each skill has to work on its own once installed, and installers copy one skill folder at a time, so a skill can't point outside its folder. A reference used by two or more skills is written once in `shared/` and copied into each skill's `references/` folder:

```
node scripts/sync-references.mjs
```

Edit the file in `shared/`, never the copy. CI fails when a copy drifts from its source.

## Before you open a pull request

```
node scripts/sync-references.mjs --check
node scripts/validate.mjs
claude plugin validate . --profile directory
```

## Writing a skill

- The description says what the skill does and when to use it, in about 250 to 600 characters.
- Keep SKILL.md under 500 lines. Put detail in `references/` and say when to read each file.
- In skill text, backticks are for Penroe tool names only.
- Write plainly: short sentences, no em dashes, and Penroe's own product words.
- Add test prompts to `evals/<name>/evals.json`, including requests that should not trigger the skill.

## Releasing

Bump the version in `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` and `plugin.json` together. The validator checks that they match.
