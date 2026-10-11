---
name: revise-editor
description: >-
  Integrate @reviseio/editor, Revise's embeddable React word processor (DOCX
  import and export, tracked changes, comments, Y.js collaboration, agent
  tools). Use when adding a Word/.docx editor, a document editor with tracked
  changes or comments, or a Google-Docs-like editor to a React app; adding
  real-time collaborative editing with Y.js; letting an AI agent edit documents
  in the browser; or touching code that imports @reviseio/editor. For editing
  files from a terminal or a server, use the revise skill instead.
---

# Revise Editor SDK

`@reviseio/editor` is a browser-only React component that embeds a paginated
word processor, rendered on canvas. The host app keeps its own shell,
authentication, storage, and users. It opens DOCX, ODT, RTF, Markdown, plain
text, and HTML, and exports DOCX, PDF, HTML, Markdown, and text.

**License.** The SDK is proprietary and installs from public npm without an
account. Under its license, evaluation (development, testing, and prototyping,
including for planned commercial applications) is free, as are personal
noncommercial apps and education (accredited nonprofit or public schools,
colleges, and universities). Production use by businesses, nonprofit
organizations, and government entities, whether internal or customer-facing,
requires a separate written commercial license before deployment, including
paid, subscription, ad-supported, and commercially intended apps that are
temporarily free or not yet earning revenue. Contact sdk@revise.io. Terms: https://revise.io/developer/docs/editor-sdk/license

## Depth policy: look it up, don't guess

This skill carries only the core model and a capability map. For any specific
prop, method, option, or tool input, fetch the Markdown version of the docs
page first:

`https://revise.io/developer/docs/<page>.md` (index: `https://revise.io/developer/docs/llms.txt`)

The pages you will need most:

- `editor-sdk/quickstart.md`, `editor-sdk/installation.md` (entry points, peers, bundling, CSP, migration)
- `editor-sdk/api/revise-editor.md` (every prop) and `editor-sdk/api/handle.md` (every controller method)
- `editor-sdk/api/types.md` (exported TypeScript types)
- `editor-sdk/guides/collaboration.md`, `editor-sdk/guides/tracked-changes.md`, `editor-sdk/guides/agent-tools.md`
- `editor-sdk/api/agent-tools.md` (the tool catalog)

Pages without a version prefix document the current major. For a project on
2.x, use the versioned pages (for example `editor-sdk/v2.2/quickstart.md`).

Never invent a prop or method name. The package ships its own `.d.ts`; check
it, or the API pages above, before writing a call. Before telling the user
something is impossible, or hand-rolling it, scan `capabilities.md` in this
folder: it lists every documented feature with the page to fetch.

## Quick start

```bash
npm i @reviseio/editor
```

React 18+, ReactDOM, `yjs`, and `y-protocols` are peer dependencies. npm and
pnpm install them automatically; with Yarn, list them:
`yarn add @reviseio/editor yjs y-protocols`. Node 18+. There is no license key
or API key to configure.

```tsx DocumentPane.tsx
import ReviseEditor, { type ReviseEditorHandle } from "@reviseio/editor";
import "@reviseio/editor/style.css";
import { useRef } from "react";

export default function DocumentPane({ file }: { file: File }) {
  const editor = useRef<ReviseEditorHandle | null>(null);

  return (
    <ReviseEditor
      initialDocuments={[{ id: "contract-1", title: "Contract", source: file }]}
      onReady={(handle) => {
        // Editor is mounted. Set up subscriptions here.
        editor.current = handle;
      }}
      onDocumentReady={() => {
        // First document is open. Controllers are usable.
      }}
      onChange={(documentId, document) => {
        console.log(documentId, "now has", document.children.length, "blocks");
      }}
    />
  );
}
```

```ts
await editor.current.whenReady();
const blob = await editor.current.tools.exportDocx();
```

Things that break first integrations:

- The editor fills its container. Give the container a height (`100vh`, a
  fixed value, or a flex or grid track).
- It renders client-side only. In Next.js, use a `"use client"` component
  loaded with `next/dynamic` and `ssr: false`.
- The main chunk is large (about 800 KB gzipped). Load it with `lazy()` where a
  document opens, not in the entry bundle.
- `onReady` fires before any document exists. Calls that act on a document
  need `onDocumentReady` or `await editor.whenReady()`.
- Exactly one copy of `yjs` must load (`npm ls yjs`). Two copies fail with
  "Unexpected content type in insert operation".
- `createEmptyDocx()` (exported from `@reviseio/editor`) gives a blank
  document for "New document".

## Core model

- **The document is Y.js state.** Every session is a Yjs CRDT, even with one
  user. Read it with `editor.getDocument()` or `onChange`; change it through
  the handle's controllers or the tools. The document is not in the DOM.
- **Multi-document workspace.** Each document has a stable, host-owned `id`.
  Controllers act on the active document, or on one ID via
  `forDocument(id)` / `editor.document(id)`.
- **Modes and roles.** A mode (`"editing"`, `"suggesting"`, `"viewing"`) is
  switchable state: `defaultDocumentMode`, `view.setDocumentMode()`. A role
  (`role="editor" | "suggester" | "viewer"`, or per document) is a limit the
  editor enforces on typing, chrome, the handle, and tools. Roles are
  client-side, not a security control. `readOnly` is a per-document input.
- **Tracked changes and comments** are first-class and round-trip through
  .docx as native Word revisions and comments. Set `currentUser` before anyone
  edits, or authorship is recorded as "Anonymous". The host drives review
  through `editor.review`.
- **.docx in, .docx out.** `tools.exportDocx()` or
  `tools.export({ format, mode })`. Untouched content from an imported .docx
  exports as the original bytes.
- **Agent tools in the browser.** `editor.tools.getDefinitions()` returns JSON
  schemas for your model; run calls with `tools.executeDynamic(name, input)`
  and send back `message` plus `context.html`. Results are
  `{ ok, value } | { ok, error }`, never thrown. Tool edits are tracked
  suggestions unless the call passes `{ directMode: true }`.
- **Collaboration uses a host-supplied Y.js provider.** Pass
  `collaboration: { connect | provider | ydoc, synced, seed }` on a document
  input. The SDK never opens a socket and never persists anything.
- **Documents never pass through Revise's servers.** The SDK loads static
  assets from revise.io (mirror them with `setAssetBaseUrl()`) and sends one
  anonymous usage ping. Only a configured delegated agent sends document
  content off the page.
- **Tests and CI:** pass `telemetry={false}` to turn off the usage ping.

## Server work

Server-side conversion, seeding collaboration rooms, and headless edits of a
shared Y.Doc use the `revise` package (MIT), at the same version as the
editor. Use the `revise-cli` skill for that. In 3.0, `@reviseio/editor/server` was
removed in favor of `revise`; see `editor-sdk/installation.md` for the
migration table.
