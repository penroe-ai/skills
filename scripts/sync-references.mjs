#!/usr/bin/env node
// Copies each skill's shared references from shared/ into skills/<name>/references/.
// Each skill must be self-contained once installed, and installers copy one skill
// folder at a time and drop symlinks, so the copies are committed as real files.
// With --check, writes nothing and exits 1 when a copy has drifted from its source.

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const manifest = JSON.parse(readFileSync(join(root, "shared", "manifest.json"), "utf8"));
const sharedFiles = readdirSync(join(root, "shared")).filter((f) => f.endsWith(".md"));

const header = (file) =>
  `<!-- Copied from shared/${file}. Edit that file, then run: node scripts/sync-references.mjs -->\n\n`;

const problems = [];

for (const [skill, files] of Object.entries(manifest.skills)) {
  const skillDir = join(root, "skills", skill);
  if (!existsSync(join(skillDir, "SKILL.md"))) {
    problems.push(`${skill}: listed in shared/manifest.json but skills/${skill}/SKILL.md doesn't exist`);
    continue;
  }
  const refDir = join(skillDir, "references");
  for (const file of files) {
    if (!sharedFiles.includes(file)) {
      problems.push(`${skill}: shared/${file} doesn't exist`);
      continue;
    }
    const want = header(file) + readFileSync(join(root, "shared", file), "utf8");
    const target = join(refDir, file);
    const have = existsSync(target) ? readFileSync(target, "utf8") : null;
    if (have === want) continue;
    if (check) problems.push(`skills/${skill}/references/${file} is out of date`);
    else {
      mkdirSync(refDir, { recursive: true });
      writeFileSync(target, want);
    }
  }
  // A shared file the skill no longer lists is removed, so stale copies don't linger.
  if (existsSync(refDir)) {
    for (const file of readdirSync(refDir)) {
      if (sharedFiles.includes(file) && !files.includes(file)) {
        if (check) problems.push(`skills/${skill}/references/${file} is no longer listed for this skill`);
        else rmSync(join(refDir, file));
      }
    }
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  if (check) console.error("\nRun: node scripts/sync-references.mjs");
  process.exit(1);
}
console.log(check ? "References are in sync." : "References synced.");
