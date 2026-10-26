#!/usr/bin/env node
// Checks the plugin before it ships: skill frontmatter, links inside each skill,
// tool names against tools.json, and one version across every manifest.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));

const tools = readJson("tools.json");
const knownTools = new Set([...tools.core, ...Object.values(tools.options).flat()]);
// Paging fields every list tool returns; skills name them, but they aren't tools.
const notTools = new Set(["has_more", "next_cursor"]);

const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^([a-z-]+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].replace(/^"(.*)"$/, "$1");
  }
  return fields;
}

function markdownFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.name.endsWith(".md") ? [path] : [];
  });
}

for (const skill of readdirSync(join(root, "skills"))) {
  const dir = join(root, "skills", skill);
  const skillFile = join(dir, "SKILL.md");
  if (!existsSync(skillFile)) {
    problems.push(`skills/${skill}: no SKILL.md`);
    continue;
  }
  const text = readFileSync(skillFile, "utf8");
  const fields = frontmatter(text);
  if (!fields) {
    problems.push(`skills/${skill}/SKILL.md: no frontmatter`);
    continue;
  }
  const extra = Object.keys(fields).filter((k) => k !== "name" && k !== "description");
  if (extra.length) problems.push(`skills/${skill}/SKILL.md: only name and description are allowed, found ${extra.join(", ")}`);
  if (fields.name !== skill) problems.push(`skills/${skill}/SKILL.md: name must be "${skill}"`);
  if (!NAME.test(skill) || skill.length > 64) problems.push(`skills/${skill}: name must be lowercase words joined by single hyphens, at most 64 characters`);
  const description = fields.description ?? "";
  if (description.length < 1 || description.length > 1024) problems.push(`skills/${skill}/SKILL.md: description must be 1-1024 characters (is ${description.length})`);
  if (text.split("\n").length > 500) problems.push(`skills/${skill}/SKILL.md: keep the body under 500 lines`);

  let namesATool = false;
  for (const file of markdownFiles(dir)) {
    const rel = file.slice(root.length + 1);
    const body = readFileSync(file, "utf8");
    // Backticked lowercase identifiers are tool names by convention.
    for (const [, token] of body.matchAll(/`([a-z][a-z0-9_]*)`/g)) {
      if (notTools.has(token)) continue;
      if (knownTools.has(token)) namesATool = true;
      else problems.push(`${rel}: \`${token}\` isn't a Penroe tool (backticks are for tool names only)`);
    }
    // Relative links must resolve inside the skill folder, because that's all that gets installed.
    for (const [, target] of body.matchAll(/\]\(([^)#\s]+)\)/g)) {
      if (/^[a-z]+:/i.test(target)) continue;
      const resolved = resolve(dirname(file), target);
      if (!resolved.startsWith(dir + "/")) problems.push(`${rel}: link ${target} points outside the skill folder`);
      else if (!existsSync(resolved)) problems.push(`${rel}: link ${target} doesn't exist`);
    }
    // Penroe's writing style: no em dashes in body copy.
    if (body.includes("—")) problems.push(`${rel}: use parentheses or two sentences instead of an em dash`);
  }
  if (!namesATool) problems.push(`skills/${skill}: names no Penroe tool`);
}

// One version across every manifest.
const versions = {
  ".claude-plugin/plugin.json": readJson(".claude-plugin/plugin.json").version,
  ".claude-plugin/marketplace.json": readJson(".claude-plugin/marketplace.json").plugins[0].version,
  "plugin.json": readJson("plugin.json").version,
};
if (new Set(Object.values(versions)).size !== 1) {
  problems.push(`versions differ: ${Object.entries(versions).map(([f, v]) => `${f} ${v}`).join(", ")}`);
}

// Both MCP files point at the same server.
const claudeMcp = readJson(".mcp.json").mcpServers.penroe?.url;
const portableMcp = readJson("mcp.json").mcpServers.penroe?.url;
if (!claudeMcp || claudeMcp !== portableMcp) problems.push(`.mcp.json and mcp.json must point at the same Penroe URL`);

// OpenAI's directory limits ("Upload and submit your plugin"). The dashboard enforces
// these at upload; checking here catches a too-long field before submission.
checkOpenAiManifest(readJson("plugin.json"));

function checkOpenAiManifest(manifest) {
  const at = (field) => `plugin.json: ${field}`;
  const allowedTop = ["$schema", "name", "version", "description", "author", "homepage", "license", "keywords", "extensions"];
  for (const key of Object.keys(manifest)) if (!allowedTop.includes(key)) problems.push(at(`unexpected field ${key}`));
  if (manifest.$schema !== "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json") problems.push(at("$schema"));
  if (!NAME.test(manifest.name ?? "") || manifest.name.length > 64) problems.push(at("name"));
  if (!/^\d+\.\d+\.\d+$/.test(manifest.version ?? "")) problems.push(at("version must be x.y.z"));
  const openai = manifest.extensions?.["com.openai"];
  if (!openai) return problems.push(at("extensions.com.openai is missing"));
  const ui = openai.interface ?? {};
  const maxLen = { displayName: 30, shortDescription: 30, longDescription: 4000, developerName: 80 };
  for (const [field, max] of Object.entries(maxLen)) {
    if (!ui[field] || ui[field].length > max) problems.push(at(`interface.${field} must be 1-${max} characters`));
  }
  if (!Array.isArray(ui.capabilities) || ui.capabilities.length > 20 || ui.capabilities.some((c) => c.length > 120)) {
    problems.push(at("interface.capabilities: at most 20, each at most 120 characters"));
  }
  if (!Array.isArray(ui.defaultPrompt) || ui.defaultPrompt.length > 3 || ui.defaultPrompt.some((p) => p.length > 128)) {
    problems.push(at("interface.defaultPrompt: at most 3, each at most 128 characters"));
  }
  for (const field of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
    if (!/^https:\/\//.test(ui[field] ?? "")) problems.push(at(`interface.${field} must be https`));
  }
  for (const field of ["brandColor", "brandColorDark"]) {
    if (!/^#[0-9A-F]{6}$/i.test(ui[field] ?? "")) problems.push(at(`interface.${field} must be a hex color`));
  }
  // Every image is a square PNG between 48 and 4096 pixels, at most 5 MB.
  for (const field of ["logo", "logoDark", "composerIcon", "composerIconDark"]) {
    const path = ui[field] ?? "";
    const file = join(root, path);
    if (!path.startsWith("./") || !existsSync(file)) {
      problems.push(at(`interface.${field} must be a ./ path to a file`));
      continue;
    }
    const bytes = readFileSync(file);
    const width = bytes.readUInt32BE(16);
    const height = bytes.readUInt32BE(20);
    if (bytes.subarray(1, 4).toString("latin1") !== "PNG" || width !== height || width < 48 || width > 4096 || bytes.length > 5 * 1024 * 1024) {
      problems.push(at(`${path} must be a square PNG, 48-4096 px, at most 5 MB`));
    }
  }
  if (!openai.onboardingSkill || !existsSync(join(root, openai.onboardingSkill))) {
    problems.push(at(`onboardingSkill ${openai.onboardingSkill} doesn't exist`));
  }
  // The importer refuses reviewer credentials in the file; reviewer access goes in the dashboard.
  const review = openai.review ?? {};
  for (const key of Object.keys(review)) {
    if (!["test_cases", "demo_recording_url"].includes(key)) problems.push(at(`review.${key} isn't allowed`));
  }
  const { positive = [], negative = [] } = review.test_cases ?? {};
  if (positive.length !== 5 || negative.length !== 3) problems.push(at("review needs exactly 5 positive and 3 negative test cases"));
  // A fresh install has no options turned on, so a positive case may trigger only core tools.
  const core = new Set(tools.core);
  for (const testCase of positive) {
    for (const name of (testCase.tools_triggered ?? "").split(",").map((s) => s.trim()).filter(Boolean)) {
      if (!core.has(name)) problems.push(at(`test case triggers ${name}, which a default connection doesn't list`));
    }
  }
  for (const testCase of [...positive, ...negative]) {
    for (const [token] of (testCase.expected_behavior ?? "").matchAll(/\b[a-z]+(?:_[a-z]+)+\b/g)) {
      if (!knownTools.has(token) && !notTools.has(token)) problems.push(at(`test case names ${token}, which isn't a Penroe tool`));
    }
  }
  if (!openai.publication?.release_notes) problems.push(at("publication.release_notes is required"));
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("Plugin is valid.");
