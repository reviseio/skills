# Revise Editor SDK: capability map

Everything the `@reviseio/editor` docs cover, one line each. This is breadth,
not depth: use it to learn that a feature exists, then fetch the page at the
end of the line before writing code.

## Setup

- Install from public npm with no account or token; React 18+, `yjs`, and `y-protocols` are required peers. https://revise.io/developer/docs/editor-sdk/installation.md
- Entry points: `@reviseio/editor`, `@reviseio/editor/full` (Tree-sitter highlighting and WASM, not CSP-safe), `@reviseio/editor/style.css`, `@reviseio/editor/version`. https://revise.io/developer/docs/editor-sdk/installation.md
- Minimal `<ReviseEditor>` with one document, `onReady`, `onDocumentReady`, and `onChange`. https://revise.io/developer/docs/editor-sdk/quickstart.md
- Next.js: client-only component via `next/dynamic` with `ssr: false`. https://revise.io/developer/docs/editor-sdk/quickstart.md
- Load the editor on demand with `lazy()` and `Suspense`; bundle size and Vite's chunk warning. https://revise.io/developer/docs/editor-sdk/installation.md
- Pin an exact version; the package ships a `CHANGELOG.md`; breaking changes only in majors. https://revise.io/developer/docs/editor-sdk/installation.md
- Release history for every version. https://revise.io/developer/docs/editor-sdk/changelog.md
- Migrate from `revise` 2.x, `@reviseio/sdk`, or `@reviseio/editor/server` (2.x) to 3.0. https://revise.io/developer/docs/editor-sdk/installation.md
- Self-host on-demand assets (fonts, math CSS, PDF worker, Tree-sitter) with `setAssetBaseUrl()`; CSP origins to allow. https://revise.io/developer/docs/editor-sdk/installation.md
- Single copy of Yjs: Vite `resolve.dedupe` and `optimizeDeps.exclude`, `npm ls yjs`. https://revise.io/developer/docs/editor-sdk/guides/collaboration.md
- Licensing: free use, commercial license, restrictions, full license text. https://revise.io/developer/docs/editor-sdk/license.md
- Anonymous usage ping and `telemetry={false}`. https://revise.io/developer/docs/editor-sdk/api/revise-editor.md
- Report a problem: `REVISE_SDK_VERSION` and `REVISE_SDK_BUILD`, common errors, security reports. https://revise.io/developer/docs/editor-sdk/support.md
- What the SDK owns versus what the host owns, and what network requests it makes. https://revise.io/developer/docs/editor-sdk/concepts/architecture.md

## Documents and files

- Open documents in `initialDocuments` or at runtime with `documents.open()`, in the foreground or background. https://revise.io/developer/docs/editor-sdk/guides/documents.md
- Per-document options: `format`, `title`, `documentMode`, `readOnly`, `zoom`, `defaultCommentsOpen`, `role`, `agent`. https://revise.io/developer/docs/editor-sdk/guides/documents.md
- Activate, close, list, and subscribe to the open documents (with `opening`/`ready`/`error` status). https://revise.io/developer/docs/editor-sdk/guides/documents.md
- Controlled or uncontrolled active document (`activeDocumentId`, `onActiveDocumentChange`, `defaultActiveDocumentId`). https://revise.io/developer/docs/editor-sdk/guides/documents.md
- Read the document tree with `getDocument()` for word counts, validation, or autosave. https://revise.io/developer/docs/editor-sdk/guides/documents.md
- Word and character counts with `getStatistics()`. https://revise.io/developer/docs/editor-sdk/api/handle.md
- Import DOCX, ODT, RTF, Markdown, plain text, and HTML; what each format keeps. https://revise.io/developer/docs/editor-sdk/guides/formats.md
- Format detection and an explicit `format` for in-memory `Blob` or `ArrayBuffer` sources. https://revise.io/developer/docs/editor-sdk/guides/formats.md
- Export DOCX, PDF, HTML, Markdown, or text with `tools.export({ format, mode })`; `"review"` versus `"final"` mode. https://revise.io/developer/docs/editor-sdk/guides/formats.md
- Blank document for "New document" with `createEmptyDocx()`. https://revise.io/developer/docs/editor-sdk/quickstart.md
- Upload inserted, pasted, or dropped images to your own storage with `onImageUpload`. https://revise.io/developer/docs/editor-sdk/api/revise-editor.md
- Ribbon Import button and drop-to-import with `onImportFile`. https://revise.io/developer/docs/editor-sdk/api/revise-editor.md
- Document fragments: body, headers and footers, and notes are stored separately. https://revise.io/developer/docs/editor-sdk/concepts/architecture.md

## Editing UI

- Ribbon modes with `toolbarMode`: `"native"`, `"compact"`, `"floating"`, `"none"`. https://revise.io/developer/docs/editor-sdk/guides/chrome.md
- Optional chrome: `showTabs`, `showTitleBar`, `showDocumentModeToggle`, `onNewTab`. https://revise.io/developer/docs/editor-sdk/guides/chrome.md
- Custom toolbar: subscribe to `ReviseToolbarState` and call `toolbar` commands (formatting, insertion, clipboard, review). https://revise.io/developer/docs/editor-sdk/guides/chrome.md
- Switch the ribbon row from your own controls with `toolbar.setActiveTab()`; open find with `toolbar.openFind()`. https://revise.io/developer/docs/editor-sdk/api/handle.md
- `view` controller: title, document mode, comments panel, review panel. https://revise.io/developer/docs/editor-sdk/guides/chrome.md
- Let the browser handle Cmd/Ctrl+F with `findShortcut="browser"`. https://revise.io/developer/docs/editor-sdk/api/revise-editor.md
- Focus control with `autoFocus={false}` and `editor.focus()`. https://revise.io/developer/docs/editor-sdk/guides/chrome.md
- Read, observe, capture, restore, and clear the selection (blocks and offsets, no geometry). https://revise.io/developer/docs/editor-sdk/guides/selection.md
- Editing, suggesting, and viewing modes. https://revise.io/developer/docs/editor-sdk/concepts/architecture.md

## Review: tracked changes, roles, and comments

- Suggesting mode: `defaultDocumentMode`, per-document `documentMode`, `view.setDocumentMode()`. https://revise.io/developer/docs/editor-sdk/guides/tracked-changes.md
- `review` controller: open, navigate, accept, reject, accept all, subscribe. https://revise.io/developer/docs/editor-sdk/guides/tracked-changes.md
- Targeted decisions by suggestion ID, with preview before applying. https://revise.io/developer/docs/editor-sdk/guides/tracked-changes.md
- Display: show or hide removals; `"all-markup"`, `"final"`, `"original"` view modes. https://revise.io/developer/docs/editor-sdk/guides/tracked-changes.md
- Word-style redlines and removals shown in review via `settings.trackedChanges`. https://revise.io/developer/docs/editor-sdk/api/revise-editor.md
- Attribution: `currentUser` for people, `agent.name` for tool edits, agent-only navigation. https://revise.io/developer/docs/editor-sdk/guides/tracked-changes.md
- Word round trip of revisions: insertions, deletions, formatting, paragraph marks, tables, and linked moves. https://revise.io/developer/docs/editor-sdk/guides/tracked-changes.md
- Custom review panel from `review.listChanges()` and `review.getChange()`. https://revise.io/developer/docs/editor-sdk/guides/tracked-changes.md
- Roles `editor`, `suggester`, `viewer`, editor-wide or per document, and how each surface enforces them. https://revise.io/developer/docs/editor-sdk/guides/roles.md
- `rolePolicy()`, `ReviseRoleError`, and `editor.getRole()`. https://revise.io/developer/docs/editor-sdk/guides/roles.md
- Read comment threads, add comments (selection, range, block, suggestion), reply, resolve, delete. https://revise.io/developer/docs/editor-sdk/guides/comments.md
- Open the comments panel and select a thread; the margin insert-comment chip. https://revise.io/developer/docs/editor-sdk/guides/comments.md
- Comments linked to suggestions: accept or reject a thread's suggestions. https://revise.io/developer/docs/editor-sdk/guides/comments.md

## Collaboration

- Real-time editing over your own Yjs provider (Hocuspocus, y-websocket, or your own). https://revise.io/developer/docs/editor-sdk/guides/collaboration.md
- `collaboration.connect`, `provider`, or explicit `ydoc` + `awareness` + `remoteOrigin`; reserved Y.Doc keys. https://revise.io/developer/docs/editor-sdk/guides/collaboration.md
- Seeding (`seed: "if-empty"` or `"never"`) and the `synced` flag. https://revise.io/developer/docs/editor-sdk/guides/collaboration.md
- Presence roster from `editor.collaboration.getState()` and `subscribe()`. https://revise.io/developer/docs/editor-sdk/guides/collaboration.md
- Remote carets labeled from `currentUser` (`name`, `image`, `color`). https://revise.io/developer/docs/editor-sdk/guides/collaboration.md
- Collaboration types: `ReviseCollaborationConfig`, `ReviseCollaborationProvider`, `RevisePeer`. https://revise.io/developer/docs/editor-sdk/api/types.md

## AI and agents

- Tool loop: `tools.getDefinitions()` to your model, `tools.executeDynamic()` for its calls, `message` plus `context.html` back. https://revise.io/developer/docs/editor-sdk/guides/agent-tools.md
- Tool results (`ReviseToolResult`), `execute()` versus `call()` (throws `ReviseToolError`). https://revise.io/developer/docs/editor-sdk/guides/agent-tools.md
- Edit by block ID, and edit every match of a search with `search_result_id`. https://revise.io/developer/docs/editor-sdk/guides/agent-tools.md
- Route tool calls to a document with `document_id`, `{ documentId }`, or `tools.forDocument()`. https://revise.io/developer/docs/editor-sdk/guides/agent-tools.md
- Suggestions by default; `{ directMode: true }` for approved direct edits. https://revise.io/developer/docs/editor-sdk/guides/tracked-changes.md
- Tool catalog: reading, searching, measuring, text edits, formatting, page layout, headers and footers, footnotes, tables, comments. https://revise.io/developer/docs/editor-sdk/api/agent-tools.md
- Agent comments with `leave_comment` (anchors, replies, overlap rules). https://revise.io/developer/docs/editor-sdk/guides/comments.md
- Give your agent the user's selection with `get_selection`. https://revise.io/developer/docs/editor-sdk/guides/selection.md
- Delegate a whole task to the Revise agent with `editor.agent.run()` or `revise_run_agent`; `agent` config (`baseUrl`, `token`, `model`, `provider`). https://revise.io/developer/docs/editor-sdk/guides/delegated-agent.md
- Stream, steer, and cancel a delegated run; `onAgentEvent`. https://revise.io/developer/docs/editor-sdk/guides/delegated-agent.md
- Custom model transport with `agent.turnStream`; run accounting and `disableMetrics`. https://revise.io/developer/docs/editor-sdk/guides/delegated-agent.md
- Per-thread comment agents with `editor.comments.run()`, `steer()`, `cancel()`. https://revise.io/developer/docs/editor-sdk/guides/comments.md

## Layout and printing

- Canvas rendering with Word-style pagination, per-section page sizes and margins, running headers and footers, and footnote areas. https://revise.io/developer/docs/editor-sdk/concepts/architecture.md
- Page setup, page numbers, and page borders through the `set_page_layout` tool. https://revise.io/developer/docs/editor-sdk/api/agent-tools.md
- Headers and footers with live `{PAGE}` and `{PAGES}` fields through the `set_header_footer` tool. https://revise.io/developer/docs/editor-sdk/api/agent-tools.md
- Page and section breaks, page numbers, and footnotes from the toolbar's insert commands. https://revise.io/developer/docs/editor-sdk/guides/chrome.md
- PDF export, paginated like the editor with fonts embedded. https://revise.io/developer/docs/editor-sdk/guides/formats.md

## Theming

- `theme="light" | "dark"`, scoped to the editor. https://revise.io/developer/docs/editor-sdk/guides/appearance.md
- `canvasBackground`, `pageBackground`, `pageBorderColor`, or their CSS variables. https://revise.io/developer/docs/editor-sdk/guides/appearance.md
- Add your fonts to the picker with `fonts` (you load the font files). https://revise.io/developer/docs/editor-sdk/guides/appearance.md
- Zoom: `defaultZoom`, `zoom.setZoom()`, `zoom.fitWidth()`, `zoom.subscribe()`. https://revise.io/developer/docs/editor-sdk/guides/appearance.md
- Opt-in WASM acceleration with `wasmHotPaths`. https://revise.io/developer/docs/editor-sdk/guides/appearance.md
- Container sizing, `className`, and `style`. https://revise.io/developer/docs/editor-sdk/guides/appearance.md

## Events and the imperative handle

- Every prop and callback: `onReady`, `onDocumentReady`, `onChange`, `onDocumentsChange`, `onDocumentTitleChange`, `onDocumentModeChange`, `onZoomChange`, `onAgentEvent`, `onAnalyticsEvent`, `onError`. https://revise.io/developer/docs/editor-sdk/api/revise-editor.md
- `ReviseEditorHandle` controllers: `documents`, `tools`, `toolbar`, `view`, `review`, `selection`, `zoom`, `agent`, `comments`, `collaboration`. https://revise.io/developer/docs/editor-sdk/api/handle.md
- Routing any controller to one document with `forDocument(id)` or `editor.document(id)`. https://revise.io/developer/docs/editor-sdk/api/handle.md
- Convenience methods: `whenReady()`, `getRole()`, `getDocument()`, `getStatistics()`, `setDocumentMode()`, `getToolDefinitions()`, `focus()`, open and close review or comments. https://revise.io/developer/docs/editor-sdk/api/handle.md
- Exported TypeScript types for documents, collaboration, roles, tracked changes, settings, toolbar, review, selection, tools, agent, fonts. https://revise.io/developer/docs/editor-sdk/api/types.md

## Server-side use (the `revise` package; use the `revise-cli` skill)

- Your server as a peer in the room: seed rooms, edit live documents, export without a browser. https://revise.io/developer/docs/editor-sdk/guides/collaboration.md
- Review across server and browser with shared `suggestionIds`, and stateless edits returning a Yjs delta. https://revise.io/developer/docs/editor-sdk/guides/collaboration.md
- Same tool contract on Node via `ReviseDocument` and `doc.tools`. https://revise.io/developer/docs/editor-sdk/guides/agent-tools.md
- `revise` library reference. https://revise.io/developer/docs/revise/library.md
- `revise` collaboration guide for sync servers. https://revise.io/developer/docs/revise/collaboration.md
