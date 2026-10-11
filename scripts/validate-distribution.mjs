#!/usr/bin/env node
// Checks the plugin manifests and skills. Generated; see README "Maintaining".
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const read = (file) => JSON.parse(readFileSync(file, "utf8"));
const fail = (message) => {
  console.error(message);
  process.exit(1);
};
const claude = read(".claude-plugin/marketplace.json");
const codex = read(".agents/plugins/marketplace.json");
const versions = new Set();
for (const listing of claude.plugins) {
  const dir = listing.source;
  const claudePlugin = read(path.join(dir, ".claude-plugin/plugin.json"));
  const codexPlugin = read(path.join(dir, ".codex-plugin/plugin.json"));
  if (claudePlugin.name !== listing.name || codexPlugin.name !== listing.name) {
    fail(`${dir}: plugin names disagree with the marketplace`);
  }
  if (!codex.plugins.some((p) => p.name === listing.name)) {
    fail(`${listing.name} is missing from the Codex marketplace`);
  }
  for (const v of [listing.version, claudePlugin.version, codexPlugin.version]) versions.add(v);
  const mcp = Object.keys(claudePlugin.mcpServers ?? {});
  if (listing.name !== "collaborate" && mcp.length > 0) fail(`The ${listing.name} plugin must not declare an MCP server`);
  if (listing.name === "collaborate" && mcp.join() !== "revise") {
    fail("collaborate must declare exactly the Revise MCP server");
  }
  for (const skill of readdirSync(path.join(dir, "skills"))) {
    const file = path.join(dir, "skills", skill, "SKILL.md");
    const text = existsSync(file) ? readFileSync(file, "utf8") : "";
    const name = /^---\n(?:.*\n)*?name: (.+)\n/.exec(text)?.[1];
    if (name !== skill) fail(`${file}: frontmatter name must be "${skill}"`);
    if (!/^description: .+/m.test(text)) fail(`${file}: needs a description`);
    const top = path.join("skills", skill, "SKILL.md");
    if (!existsSync(top) || readFileSync(top, "utf8") !== text) {
      fail(`${file} differs from ${top}: regenerate the plugins`);
    }
    for (const [, link] of text.matchAll(/\]\(((?!https?:|#)[^)]+)\)/g)) {
      if (!existsSync(path.join(dir, "skills", skill, link))) fail(`${file}: broken link ${link}`);
    }
  }
}
if (versions.size !== 1) fail(`Manifest versions disagree: ${[...versions].join(", ")}`);
if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test([...versions][0])) fail("Version is not semver");
console.log(`Distribution is valid at ${[...versions][0]}.`);
