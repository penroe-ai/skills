#!/usr/bin/env node
// Builds the ZIP uploaded to OpenAI's plugin directory (ChatGPT and Codex).
// Writes dist/penroe-<version>.zip with plugin.json at the ZIP root. Refuses to
// build from uncommitted changes, so an uploaded ZIP always matches a commit.

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dirty = execFileSync("git", ["status", "--porcelain"], { cwd: root, encoding: "utf8" }).trim();
if (dirty) {
  console.error(`Commit your changes first:\n${dirty}`);
  process.exit(1);
}

const { version } = JSON.parse(readFileSync(join(root, "plugin.json"), "utf8"));
const out = join(root, "dist", `penroe-${version}.zip`);
mkdirSync(dirname(out), { recursive: true });
rmSync(out, { force: true });

// Only what the OpenAI package needs: no Claude manifests, scripts, evals or shared sources.
const include = ["plugin.json", "mcp.json", "LICENSE", "assets", "skills"];
execFileSync("zip", ["-r", "-X", out, ...include, "-x", "*.DS_Store"], { cwd: root, stdio: "inherit" });
console.log(`Wrote ${out}`);
