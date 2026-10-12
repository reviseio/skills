# Revise agent skills

Skills that teach coding agents (Claude Code, Codex, Cursor, Copilot, and
others) to work with [Revise](https://revise.io) documents.

Quickest start: paste one of these into your agent.

```
Read https://revise.io/skills/cli.md and follow it.
Read https://revise.io/skills/editor.md and follow it.
Read https://revise.io/skills/collaborate.md and follow it.
```

For the CLI skill, any agent with a terminal can also run:

```bash
npx -y revise@latest skill install
```

It writes the `revise-cli` skill where your agent reads skills (`.claude/skills` from Claude Code, `.agents/skills` for Codex, Cursor, and others) and prints its path. Read that SKILL.md now and follow it: a running session doesn't load new skills, new sessions do.

| Plugin | Skill | For |
| --- | --- | --- |
| `cli@revise` | [`revise-cli`](skills/revise-cli) | Reading, editing, redlining, and converting Word documents with the `revise` CLI and TypeScript library |
| `editor@revise` | [`revise-editor`](skills/revise-editor) | Building document editors with [`@reviseio/editor`](https://www.npmjs.com/package/@reviseio/editor) |
| `collaborate@revise` | [`collaborate-in-revise`](skills/collaborate-in-revise) | Working with people in live revise.io documents over the Revise MCP server |

`cli` and `editor` need no account or connection: the CLI, library, and
editor run on your machine and your servers. `collaborate` adds the Revise
MCP server (`https://mcp.revise.io/mcp`).

## Claude Code

```bash
claude plugin marketplace add reviseio/skills
claude plugin install cli@revise
claude plugin install editor@revise
claude plugin install collaborate@revise
```

Update with `claude plugin update cli@revise`, then `/reload-plugins` or a new session.

## Codex and the ChatGPT desktop app

```bash
codex plugin marketplace add reviseio/skills
codex plugin add cli@revise
codex plugin add editor@revise
codex plugin add collaborate@revise
```

Update with `codex plugin marketplace upgrade revise`, then add the plugins again.

## Cursor, Copilot, Windsurf, Cline, and others

```bash
npx skills add reviseio/skills --skill revise-cli
npx skills add reviseio/skills --skill revise-editor
npx skills add reviseio/skills --skill collaborate-in-revise
```

Update with `npx skills update`.

## Without a plugin system

`npx -y revise@latest skill install` installs the CLI skill (see above), and `revise skill` prints
it. Or copy a skill folder from `skills/` into your agent's skills
directory, keeping `SKILL.md` with the files it references.

## Maintaining

`skills/revise-cli` and `skills/revise-editor` (and `plugins/`, the manifests,
and this README) are generated from each `revise` release; edit them in the
Revise monorepo, not here. `skills/collaborate-in-revise` is authored here.
`node scripts/validate-distribution.mjs` checks the manifests; CI runs it.

## License

MIT
