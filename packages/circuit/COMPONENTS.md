# Circuit components — reference

Every class in `src/components.css`, with its variants and the same markup the
[showcase](../../showcase/index.html) renders. Load `tokens.css` first (and
`themes.css` for a tool hue); everything below reads only tokens.

Conventions: classes are `.c-*`; variants are plain sub-classes on the same
element (`.c-btn.primary`, `.c-toast.error`); named slots inside a component
are short sub-classes (`.head`, `.body`, `.foot`, `.x`, `.actions`, `.glyph`);
native elements do the behaviour (`<dialog>`, `[popover]`, `<details>`,
`<meter>`, `<progress>`, `<kbd>`, `<table>`). Every interactive component has
a visible `:focus-visible` ring (`2px solid var(--accent)`, offset 2px), and
`prefers-reduced-motion: reduce` stops the spinner, toast, pulse and hover-lift
animations.

## Cross-reproduction

This vocabulary is shared, concept for concept, with two sibling systems —
**jjhub** (`web/src/styles.css`, terminal UI) and **noitroidvania**
(`src/ds/`, terminal-adjacent game chrome). Each system expresses every row in
its own idiom and tokens; nothing is copied between them. The table is the
canonical matrix (the circuit column is what ships here; the other two
columns describe the sibling systems as of the matrix).

| # | component | circuit | jjhub | noitroidvania |
|---|---|---|---|---|
| 1 | Button: primary / secondary / ghost / danger, disabled | `.c-btn.primary/.secondary/.ghost/.outline/.danger`, `:disabled` | `button` bracketed, `.accent`, `.warn` (add primary/secondary/ghost/danger semantics: `.btn-primary` filled accent, `.btn-ghost`, `.btn-danger`) | `.ui-root button` base only → add `.btn` with `[data-variant=primary\|ghost\|danger]` |
| 2 | Icon button (square, glyph only, accessible label) | `.c-iconbtn` (+ `.ghost/.outline/.danger`, `.sm/.lg`) | `button.notification-dismiss`, `.stack-collapse` ad hoc → `.btn-icon` | — → `.btn-icon` |
| 3 | Link-styled button | `.c-linkbtn` | `button.link` ✓ | — → `.ui-linkbtn` |
| 4 | Button group / split button | `.c-btngroup`, `.c-split` | `.split-btn` ✓ (+ `.btn-group`) | — → `.btngroup` |
| 5 | Text input / textarea / select | `.c-field` on input / textarea / select (+ `.c-select` chevron wrapper, `.is-error`, `.mono`) | `.modal-field`, `.filter-field` → generic `.field` | base element defaults ✓ (+ `.field` widths/states) |
| 6 | Form field: label + control + hint + error | `.c-form`, `.c-label` (`.req/.opt`), `.c-hint`, `.c-fieldnote` | `.modal-field-group` → `.form-field`, `.form-label`, `.form-hint`, `.form-error` | — → `.field` group with `__label/__hint/__error` |
| 7 | Checkbox / radio / switch (styled native) | `.c-check`, `.c-radio`, `.c-switch` (+ `.c-choices`) | native only → `.check`, `.radio`, `.switch` (glyph `[x]` / `(o)` idiom) | — → `.ui-check`, `.ui-radio`, `.ui-switch` (glyph boxes) |
| 8 | Badge with tones (accent / success / warning / error / neutral) | `.c-badge.accent/.success/.warning/.error/.neutral` | `.badge` outline (add tone classes `.badge.pass/.warn/.fail/.accent`) | `.chip` → add `.badge` with `[data-tone]` |
| 9 | Status dot (live / idle / error) | `.c-dot.live/.idle/.running/.warning/.error/.accent` (+ `.pulse`) | — → `.dot` | — → `.ui-dot` (glyph `●` + colour) |
| 10 | Chip (removable / countable noun) | `.c-chip` (+ `.x`, `.count`, `.accent`) | `.dep-chip`, `.reviewer-chip`, `.user-chip` → generic `.chip` | `.chip` ✓ |
| 11 | Card: header / body / footer, hoverable, clickable | `.c-card` (+ `.head/.body/.foot`, `.hoverable`, `.clickable`, `.compact`) | `.info-card`, `.board-card`, `.desc` → generic `.card` | — → `.card` (border + panel step) |
| 12 | Callout / admonition: note / tip / warning / danger | `.c-callout.tip/.warning/.danger` | `.evidence-note`, `.diff-warning` → `.callout` (box-drawing rail, no fill) | — → `.callout[data-tone]` (glyph + rule) |
| 13 | Banner (inline alert with actions, dismissible) | `.c-banner.success/.warning/.error/.info/.neutral` (+ `.actions`, `.x`) | `DivergenceBanner` class → generic `.banner` | — → `.banner` |
| 14 | Toast + tray (positions, tones, action, dismiss) | `.c-toasts.<position>`, `.c-toast.<tone>` | `.notification-tray/.notification-toast` ✓ | — → `.toasts`, `.toast` |
| 15 | Dialog / modal (+ confirm variant, actions row) | `dialog.c-dialog` (+ `.confirm`, `.head/.body/.actions`, `::backdrop` = `--scrim`) | `.modal*` ✓ | `.scrim` + `.panel` ✓ (+ `.panel--dialog` compact variant) |
| 16 | Popover (anchored panel) | `[popover].c-popover` (+ `.anchored`, `.anchored.end`) | `.change-state-legend-panel` → generic `.popover` | — → `.popover` |
| 17 | Tooltip | `.c-tooltip > .tip` (+ `.bottom`) | `.state-tooltip` → generic `.tooltip` | — → `.tooltip` |
| 18 | Dropdown menu (details-backed) + items + separator | `details.c-menu` (+ `.items`, `.item`, `.sep`, `.label`, `.anchor-start/.anchor-end/.up`) | `.menu*` ✓ | — → `.menu` on `<details>` |
| 19 | Command palette | `palette.css` / `palette.js` | `.cmdk*` ✓ | — → `.palette` (markup + CSS only) |
| 20 | Tabs (+ code-group variant) | `.c-tabbar`, `.c-codegroup` | `.tabs/.tab` ✓ | `.tabs` ✓ |
| 21 | Accordion / disclosure | `details.c-accordion` (+ `.c-accordions`) | `.repo-group` → generic `.disclosure` | — → `.disclosure` |
| 22 | Table: data table + key/value table | `table.c-table` (+ `.c-tablewrap`), `.c-kv` (table or dl) | `table.ops/.grid/.kv` ✓ | — → `.table`, `.kv` |
| 23 | List rows: hover / selected / cursor / dim, glyph + actions | `.c-list`, `.c-row.selected/.cursor/.dim` (+ `.glyph`, `.title`, `.meta`, `.actions`) | `.row` ✓ (+ cursor state) | `.col/.scroll/.row` ✓ |
| 24 | Code block with caption + copy; syntax token classes | `.c-codebox`, `.sx-*` | `.info-code` → `.code` (+ `--sx-*` tokens, `.sx-*`) | — → `.code` (+ syntax tokens `--ui-sx-*`) |
| 25 | Terminal block (window chrome, prompt / output) | `.c-termbox` | — → `.term` | — → `.term` |
| 26 | Empty state | `.c-empty` (+ `.sm`) | `.empty` ✓ | — → `.empty` |
| 27 | Spinner / in-flight | `.c-spinner` (+ `.sm/.lg/.ink`) | `.spinner` ✓ | — → `.ui-spin` (stepped glyph, `--ui-dur` based) |
| 28 | Meter / progress (0..1 fill, tone) | `.c-meter` on meter / progress / `--f` div (+ tones, `.c-meterrow`) | — → `.meter` | `.bar` ✓ |
| 29 | Avatar / user chip (initials fallback) | `.c-avatar` (+ `.sm/.lg/.square/.neutral`, `.c-avatars`) | `.user-chip` ✓ (+ `.avatar`) | — → `.avatar` |
| 30 | Key cap | `kbd.c-key`, `.c-keys` | `.cmdk-help kbd` → `.key` / `kbd` | `.ui-key` ✓ |
| 31 | Separator / section title | `.c-sep` (+ `.vertical`), `.c-section` (+ `.plain`, `.count`) | `.sec-title` ✓ | `.col__head` ✓ (+ `.ui-sep`) |
| 32 | Breadcrumb | `.c-crumb` | — → `.crumb` | — → `.crumb` |
| 33 | Pager (prev / next) | `.c-pager` | — → `.pager` | — → `.pager` |
| 34 | Swatch | `.c-swatch` (`--sw`, `.sm/.lg/.round`), `.c-swatchrow` | — → `.swatch` | `.ui-swatch` ✓ |
| 35 | Categorical ramp (data-attribute driven) | `.c-ramp[data-step="1…6"]` (+ `.solid/.dot/.ink`, tokens `--cat-1…6`) | — → `.ramp[data-step]` | `.ui-rar[data-rarity]` ✓ |
| 36 | Background pattern (grid texture) | `.circuit-grid` | — → `.grid-bg` | — → `.ui-grid` |
| 37 | App shell: header, sidebar/rail, main, statusbar, resize handle | `.c-shell` (+ `.c-header`, `.c-rail`, `.c-main`, `.c-status`, `.c-resize`, `.rail-end`) | `.topbar .rail .main .statusbar .resize-handle` ✓ | `.ui-layer/.panel` → add `.shell` (`__top/__rail/__main/__status`) |
| 38 | Board (columns of cards) | `.c-board` (+ `.col`, `.head`, `.over`) | `.board*` ✓ | — → `.board` |
| 39 | Parameter / definition list | `.c-paramlist` | — → `.params` | — → `.params` |
| 40 | Utilities: text tones, sr-only, nowrap, grow, row, stack, caps | `.c-dim .c-muted .c-accent .c-success .c-warning .c-error .c-info .c-mono .c-caps .c-nowrap .c-truncate .c-grow .c-row-flex .c-stack .c-sr-only` | `.dim .accent .pass .warn .fail .sr-only` ✓ (+ nowrap/grow/row/caps) | `.ui-*` ✓ (+ `.ui-sr-only`) |
| 41 | Scroll area (thin themed scrollbar) | `.c-scroll` (+ `.x/.y`) | `.rail` inline → `.scroll` | `.scroll` ✓ |
| 42 | Overlay layer / scrim | `.c-scrim` (+ `.center`), token `--scrim` | `.modal-overlay`, `.cmdk-overlay` → shared `.scrim` | `.ui-layer`, `.scrim` ✓ |
| 43 | Theme toggle control | `.c-theme-toggle` + `theme-toggle.js` | data-theme attr only → `.theme-toggle` control | contrast mode only → `.ui-theme-toggle` |

Layering, top to bottom: `.c-scrim` 300 (same as the palette backdrop) ·
`.c-toasts` 250 · menus and tooltips 100. `<dialog>` and `[popover]` use the
browser's top layer and need no z-index.

Tokens added for this tier (all in `tokens.css`, light + dark): `--scrim`
(overlay wash) and `--cat-1 … --cat-6` (fixed categorical ramp — never
rotates with `--hue`, distinct from the semantic colours).

## Actions

### Button

`.c-btn` with one variant sub-class.

- `.primary` filled accent · `.secondary` inset panel · `.ghost` text-only · `.outline` bordered · `.danger` filled `--error`
- `:disabled` / `[aria-disabled="true"]` — 40% opacity, `not-allowed` cursor
- drop a `.c-spinner.sm` inside for a loading state (it inverts on `.primary`/`.danger`)

```html
<button class="c-btn primary">Publish</button>
<button class="c-btn secondary">Cancel</button>
<button class="c-btn ghost">Learn more</button>
<button class="c-btn outline">Preview</button>
<button class="c-btn danger">Delete</button>
<button class="c-btn primary" disabled>Publish</button>
```

### Icon button

`.c-iconbtn` — square, glyph only. Always label it (`aria-label`) or wrap it in a `.c-tooltip`.

- `.ghost` borderless · `.outline` transparent surface · `.danger` red on hover
- `.sm` 26px · default 32px · `.lg` 40px

```html
<button class="c-iconbtn" aria-label="Refresh">↻</button>
<button class="c-iconbtn ghost" aria-label="Edit">✎</button>
<button class="c-iconbtn outline sm" aria-label="Close">✕</button>
<button class="c-iconbtn danger" aria-label="Delete">🗑</button>
<button class="c-iconbtn lg" aria-label="Add" disabled>+</button>
```

### Link button

`.c-linkbtn` — a `<button>` that reads as an inline link (undo, show more, toast actions).

```html
<p>Deployed to production. <button class="c-linkbtn">Undo</button> · <button class="c-linkbtn" disabled>View logs</button></p>
```

### Button group / split button

`.c-btngroup` joins adjacent `.c-btn`/`.c-iconbtn`s; `.c-split` is a group whose last segment is a narrow caret — a plain `<button>` or a `.c-menu` whose `<summary>` carries the button classes (`.plain` suppresses the menu's own caret).

```html
<div class="c-btngroup" role="group" aria-label="View">
  <button class="c-btn secondary">Day</button>
  <button class="c-btn secondary">Week</button>
  <button class="c-btn secondary">Month</button>
</div>
<div class="c-split">
  <button class="c-btn primary">Merge</button>
  <details class="c-menu anchor-end">
    <summary class="c-btn primary plain" aria-label="More merge options">▾</summary>
    <div class="items">
      <button class="item">Squash and merge</button>
      <button class="item">Rebase and merge</button>
      <hr class="sep">
      <button class="item danger">Close without merging</button>
    </div>
  </details>
</div>
```

## Forms

### Field

`.c-field` on `<input>`, `<textarea>` or `<select>`; wrap a select in `.c-select` to draw the chevron from tokens. `.c-form` stacks `.c-label` → control → `.c-hint`, and `.c-fieldnote` is the error line.

- `.is-error` red ring · `.mono` monospace value · `:disabled` / `:read-only` inset
- `.c-label .req` required mark · `.c-label .opt` optional tag · `.c-form.inline` puts label and control on one row

```html
<div class="c-form">
  <label class="c-label" for="f-email">Email<span class="req" aria-hidden="true">*</span></label>
  <input class="c-field" id="f-email" type="email" placeholder="you@example.com" aria-describedby="f-email-hint">
  <div class="c-hint" id="f-email-hint">We only use this for deploy notifications.</div>
</div>
<div class="c-form">
  <label class="c-label" for="f-bad">Handle</label>
  <input class="c-field is-error" id="f-bad" value="not a handle" aria-invalid="true" aria-describedby="f-bad-err">
  <div class="c-fieldnote" id="f-bad-err">Handles are lowercase letters and dashes.</div>
</div>
<div class="c-form">
  <label class="c-label" for="f-notes">Notes<span class="opt">optional</span></label>
  <textarea class="c-field" id="f-notes" placeholder="Anything the reviewer should know…"></textarea>
</div>
<div class="c-form">
  <label class="c-label" for="f-region">Region</label>
  <span class="c-select"><select class="c-field" id="f-region"><option>us-east-1</option><option>eu-west-2</option><option>ap-south-1</option></select></span>
</div>
```

### Checkbox / radio / switch

Native inputs wrapped in a label class. `.c-check` and `.c-radio` tint the UA control with `accent-color`; `.c-switch` is `appearance: none` and drawn in CSS. `.c-choices` stacks a set (`.inline` for a row).

```html
<div class="c-choices">
  <label class="c-check"><input type="checkbox" checked> Email me on failure</label>
  <label class="c-check"><input type="checkbox" disabled> Page on-call (needs a rota)</label>
</div>
<div class="c-choices inline" role="radiogroup" aria-label="Strategy">
  <label class="c-radio"><input type="radio" name="strategy" checked> cascade</label>
  <label class="c-radio"><input type="radio" name="strategy"> race</label>
</div>
<label class="c-switch"><input type="checkbox" role="switch" checked> Auto-deploy on green</label>
```

## Feedback

### Badge

`.c-badge` with a tone.

- `.accent` · `.success` · `.warning` · `.error` · `.neutral`

```html
<span class="c-badge accent">accent</span>
<span class="c-badge success">deployed</span>
<span class="c-badge warning">degraded</span>
<span class="c-badge error">failed</span>
<span class="c-badge neutral">draft</span>
```

### Status dot

`.c-dot` — an 8px disc. Pair it with a word: colour is never the only carrier.

- `.live`/`.success` · `.idle`/`.pending` (default) · `.running`/`.info` · `.warning` · `.error` · `.accent`
- `.pulse` adds an expanding ring (off under reduced motion)

```html
<span class="c-dot live pulse" role="img" aria-label="live"></span> live
<span class="c-dot idle" role="img" aria-label="idle"></span> idle
<span class="c-dot running" role="img" aria-label="running"></span> running
<span class="c-dot warning" role="img" aria-label="warning"></span> warning
<span class="c-dot error" role="img" aria-label="error"></span> error
```

### Chip

`.c-chip` — a removable / countable noun. `.x` is the remove button, `.count` a trailing number; an avatar or dot may lead.

- `.accent` tinted

```html
<span class="c-chip">react <span class="count">12</span></span>
<span class="c-chip">design-system <button class="x" aria-label="Remove design-system">✕</button></span>
<span class="c-chip accent"><span class="c-avatar sm">jh</span> john <button class="x" aria-label="Remove john">✕</button></span>
```

### Banner

`.c-banner` — an inline alert with an `.actions` row and a `.x` dismiss. Same rail-and-tint family as `.c-callout`, but a single row.

- default accent · `.success` · `.warning` · `.error` · `.info` · `.neutral`

```html
<div class="c-banner warning" role="status">
  <span class="ic">▲</span>
  <span class="msg"><b>Your branch has diverged.</b> 3 commits behind main.</span>
  <span class="actions"><button class="c-btn secondary">Rebase</button></span>
  <button class="x" aria-label="Dismiss">✕</button>
</div>
<div class="c-banner success" role="status"><span class="ic">✓</span><span class="msg">All checks passed.</span><button class="x" aria-label="Dismiss">✕</button></div>
<div class="c-banner error" role="alert"><span class="ic">✕</span><span class="msg">Deploy failed: <code>ECONNREFUSED</code></span><span class="actions"><button class="c-btn outline">Retry</button></span></div>
<div class="c-banner info"><span class="ic">ⓘ</span><span class="msg">A new version of the CLI is available.</span></div>
```

### Toast + tray

`.c-toasts` is the fixed tray; `.c-toast` is one notice with `.ic`, `.msg` (optional `.title`, `.c-linkbtn` action) and `.x`.

- tray positions: `.bottom-right` (default) · `.bottom-left` · `.top-right` · `.top-left` · `.top-center` · `.bottom-center`
- tones: default accent · `.success` · `.warning` · `.error` · `.info`
- slide-in animation is disabled under reduced motion

```html
<div class="c-toasts bottom-right" aria-live="polite">
  <div class="c-toast success" role="status">
    <span class="ic">✓</span>
    <span class="msg"><span class="title">Deployed</span>matey@0.4.2 is live in us-east-1. <button class="c-linkbtn">View</button></span>
    <button class="x" aria-label="Dismiss">✕</button>
  </div>
  <div class="c-toast error" role="alert"><span class="ic">✕</span><span class="msg"><span class="title">Build failed</span>Type error in <code>src/index.ts</code>.</span><button class="x" aria-label="Dismiss">✕</button></div>
  <div class="c-toast"><span class="c-spinner sm" role="status" aria-label="Working"></span><span class="msg">Warming cache…</span></div>
</div>
```

### Empty state

`.c-empty` — dashed frame with `.glyph`, `.title`, `.desc`, `.actions`.

- `.sm` compact

```html
<div class="c-empty">
  <div class="glyph">◌</div>
  <div class="title">No deploys yet</div>
  <div class="desc">Push to <code>main</code> or run <code>matey deploy</code> to see activity here.</div>
  <div class="actions"><button class="c-btn primary">Deploy now</button><button class="c-btn ghost">Read the guide</button></div>
</div>
<div class="c-empty sm"><div class="glyph">⌕</div><div class="desc">No results for “quorum”.</div></div>
```

### Spinner

`.c-spinner` — a rotating ring; give it `role="status"` and a label. Static under reduced motion.

- `.sm` · default · `.lg` · `.ink` neutral

```html
<span class="c-spinner sm" role="status" aria-label="Loading"></span>
<span class="c-spinner" role="status" aria-label="Loading"></span>
<span class="c-spinner lg" role="status" aria-label="Loading"></span>
<button class="c-btn primary" disabled><span class="c-spinner sm" aria-hidden="true"></span>Deploying…</button>
```

### Meter / progress

`.c-meter` styles a native `<meter>` or `<progress>`, or any element with a `--f` fill in `0..1`. `.c-meterrow` lays out label · bar · `.val`.

- tones: default accent · `.success` · `.warning` · `.error` · `.info`
- `.sm` 4px · default 6px · `.lg` 10px · `.inline` fixed 80px

```html
<div class="c-meterrow"><span>cpu</span><meter class="c-meter" min="0" max="1" value="0.62" aria-label="CPU 62%"></meter><span class="val">62%</span></div>
<div class="c-meterrow"><span>build</span><progress class="c-meter success" max="100" value="80" aria-label="Build 80%"></progress><span class="val">80%</span></div>
<div class="c-meterrow"><span>disk</span><div class="c-meter warning" role="meter" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0.86" aria-label="Disk 86%" style="--f: 0.86"></div><span class="val">86%</span></div>
<div class="c-meterrow"><span>errors</span><div class="c-meter error lg" role="meter" aria-valuenow="0.3" aria-valuemin="0" aria-valuemax="1" aria-label="Errors 30%" style="--f: 0.3"></div><span class="val">30%</span></div>
```

## Overlays

### Dialog

`.c-dialog` on a native `<dialog>`; open with `showModal()`. `::backdrop` is `--scrim`. Slots: `.head` (with `.x`), `.body`, `.actions` (right-aligned; `.start` pushes a button left). A `<form method="dialog">` may wrap the slots.

- `.confirm` compact yes/no variant

```html
<button class="c-btn secondary" id="openDialog">Open dialog</button>
<button class="c-btn danger" id="openConfirm">Delete project…</button>

<dialog class="c-dialog" id="demoDialog" aria-labelledby="demoDialogTitle">
  <form method="dialog">
    <div class="head"><span id="demoDialogTitle">Rename project</span><button class="x" value="cancel" aria-label="Close">✕</button></div>
    <div class="body">
      <div class="c-form">
        <label class="c-label" for="dlg-name">Name</label>
        <input class="c-field" id="dlg-name" value="matey">
        <div class="c-hint">Used in URLs and the CLI.</div>
      </div>
    </div>
    <div class="actions"><button class="c-btn ghost" value="cancel">Cancel</button><button class="c-btn primary" value="ok">Rename</button></div>
  </form>
</dialog>

<dialog class="c-dialog confirm" id="demoConfirm" aria-labelledby="demoConfirmTitle">
  <form method="dialog">
    <div class="head" id="demoConfirmTitle">Delete matey?</div>
    <div class="body">This removes the project and its 14 deploys. It cannot be undone.</div>
    <div class="actions"><button class="c-btn ghost" value="cancel">Keep</button><button class="c-btn danger" value="ok">Delete</button></div>
  </form>
</dialog>
```

### Popover

`.c-popover` on a `[popover]` element, opened by a `popovertarget` button. Slots: `.head`, `.desc`, `.actions`.

- `.anchored` sits under the invoker where CSS anchor positioning exists (implicit anchor), else centred · `.anchored.end` right-aligns

```html
<button class="c-btn secondary" popovertarget="demoPop">Share ▾</button>
<div class="c-popover anchored" id="demoPop" popover>
  <div class="head">Share this page</div>
  <div class="desc">Anyone with the link can view. Editors need an invite.</div>
  <div class="actions"><button class="c-btn ghost" popovertarget="demoPop" popovertargetaction="hide">Close</button><button class="c-btn primary">Copy link</button></div>
</div>
```

### Tooltip

`.c-tooltip` wraps a trigger and a `.tip` (`role="tooltip"`); shows on hover and on keyboard focus of the trigger. Pure CSS.

- default above · `.bottom`

```html
<span class="c-tooltip"><button class="c-iconbtn" aria-describedby="tip-refresh">↻</button><span class="tip" role="tooltip" id="tip-refresh">Refresh (R)</span></span>
<span class="c-tooltip bottom"><button class="c-btn ghost">Hover me</button><span class="tip" role="tooltip">Tooltips need no JS</span></span>
```

### Dropdown menu

`.c-menu` on a `<details>`; the `<summary>` is the trigger (any button class), `.items` the panel. Items are `<button class="item">` or `<a class="item">` with an optional `.glyph` and trailing `.c-key`; `.sep` is an `<hr>`, `.label` a group heading.

- `.anchor-start` (default) · `.anchor-end` · `.up`
- `.item.danger` · `:disabled`
- `summary.plain` hides the built-in caret (icon-button summaries hide it automatically)

```html
<details class="c-menu">
  <summary class="c-btn secondary">Actions</summary>
  <div class="items">
    <div class="label">Project</div>
    <button class="item"><span class="glyph">✎</span>Rename<kbd class="c-key">R</kbd></button>
    <button class="item"><span class="glyph">⧉</span>Duplicate<kbd class="c-key">D</kbd></button>
    <a class="item" href="#components"><span class="glyph">↗</span>Open in new tab</a>
    <hr class="sep">
    <button class="item" disabled><span class="glyph">⇪</span>Archive</button>
    <button class="item danger"><span class="glyph">✕</span>Delete</button>
  </div>
</details>
<details class="c-menu anchor-end">
  <summary class="c-iconbtn" aria-label="More options">⋯</summary>
  <div class="items"><button class="item">Pin</button><button class="item">Mute</button></div>
</details>
```

### Scrim

`.c-scrim` — full-viewport wash on `--scrim` for custom layers; toggle with the `hidden` attribute. `.center` centres a child.

```html
<button class="c-btn secondary" id="openScrim">Show scrim</button>
<div class="c-scrim center" id="demoScrim" hidden>
  <div class="c-card" style="max-width: 320px"><div class="body">Any custom layer sits on <code>--scrim</code>. Click anywhere to close.</div></div>
</div>
```

## Disclosure & navigation

### Accordion

`.c-accordion` on a `<details>` with a `<summary>` and a `.body`; wrap several in `.c-accordions` to join them.

```html
<div class="c-accordions">
  <details class="c-accordion" open>
    <summary>Why is the accent the only thing that moves?</summary>
    <div class="body">Neutrals, semantic colours and syntax colours are fixed so six tools read as one family.</div>
  </details>
  <details class="c-accordion">
    <summary>Does dark mode change the elevation model? <span class="c-badge neutral">tokens</span></summary>
    <div class="body">Yes — <code>--shadow-*</code> become 1px lines in dark so panels never read as fog.</div>
  </details>
  <details class="c-accordion">
    <summary>Can I use these outside a docs site?</summary>
    <div class="body">That is what the app-chrome tier below is for.</div>
  </details>
</div>
```

## Data

### Data table

`.c-table` on a real `<table>`; `.c-tablewrap` gives it a bordered scrolling frame.

- cells: `.num` right-aligned tabular · `.mono`
- rows: `.selected` / `[aria-selected]` · `.dim`
- headers: `.sort` clickable, `[aria-sort]` draws the arrow
- `.compact`

```html
<div class="c-tablewrap">
  <table class="c-table">
    <thead><tr><th>Service</th><th>Region</th><th class="sort" aria-sort="descending" tabindex="0">Uptime</th><th class="num">p95</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>matey-api</td><td class="mono">us-east-1</td><td class="num">99.98%</td><td class="num">142 ms</td><td><span class="c-dot success"></span> healthy</td></tr>
      <tr class="selected"><td>mcp-query</td><td class="mono">eu-west-2</td><td class="num">99.91%</td><td class="num">210 ms</td><td><span class="c-dot warning"></span> degraded</td></tr>
      <tr class="dim"><td>ecmanim-render</td><td class="mono">ap-south-1</td><td class="num">—</td><td class="num">—</td><td><span class="c-dot idle"></span> paused</td></tr>
    </tbody>
  </table>
</div>
```

### Key / value

`.c-kv` on a `<table>` (`<th scope="row">` keys) or a `<dl>`.

```html
<table class="c-kv">
  <tbody>
    <tr><th scope="row">version</th><td class="mono">0.1.1</td></tr>
    <tr><th scope="row">hue</th><td>25° · <span class="c-swatch sm" style="--sw: var(--accent)"></span> accent</td></tr>
    <tr><th scope="row">shipped</th><td>2026-09-07</td></tr>
  </tbody>
</table>
<dl class="c-kv">
  <dt>package</dt><dd class="mono">@erisera-code/circuit</dd>
  <dt>license</dt><dd>MIT</dd>
</dl>
```

### List rows

`.c-list` (`.bordered` for a framed panel) of `.c-row`s — `<li>`, `<a>` or `<button>`. Slots: `.glyph`, `.title` (truncates), `.meta`, `.actions` (revealed on hover / focus / selection).

- `.selected` / `[aria-selected="true"]` · `.cursor` / `[aria-current="true"]` · `.dim`

```html
<ul class="c-list bordered" role="listbox" aria-label="Files">
  <li class="c-row" role="option" aria-selected="true"><span class="glyph">◆</span><span class="title">tokens.css</span><span class="meta">4.1 kB</span><span class="actions"><button class="c-iconbtn ghost sm" aria-label="Open tokens.css">↗</button></span></li>
  <li class="c-row cursor" role="option" aria-selected="false"><span class="glyph">◇</span><span class="title">components.css</span><span class="meta">38 kB</span><span class="actions"><button class="c-iconbtn ghost sm" aria-label="Open components.css">↗</button></span></li>
  <li class="c-row" role="option" aria-selected="false"><span class="glyph">◇</span><span class="title">palette.css — a very long file name that truncates with an ellipsis</span><span class="meta">3.2 kB</span></li>
  <li class="c-row dim" role="option" aria-selected="false"><span class="glyph">·</span><span class="title">themes.css</span><span class="meta">ignored</span></li>
</ul>
```

### Board

`.c-board` — horizontally scrolling columns (`.col` with a `.head` and `.count`) of `.c-card`s. `.col.over` is the drop-target state; `.c-card.dragging` fades the lifted card.

```html
<div class="c-board">
  <section class="col"><div class="head">Queued <span class="count">2</span></div>
    <div class="c-card"><div class="body">Rotate signing key</div><div class="foot"><span class="c-ramp dot" data-step="1"></span> infra</div></div>
    <div class="c-card"><div class="body">Docs: hue registry</div><div class="foot"><span class="c-ramp dot" data-step="3"></span> docs</div></div>
  </section>
  <section class="col"><div class="head">Running <span class="count">1</span></div>
    <div class="c-card"><div class="body">Build 4821</div><div class="foot"><span class="c-spinner sm" aria-hidden="true"></span> 42s</div></div>
  </section>
  <section class="col over"><div class="head">Done <span class="count">0</span></div><div class="c-empty sm"><div class="desc">Drop here</div></div></section>
</div>
```

## Identity & marks

### Avatar

`.c-avatar` — initials by default; put an `<img>` inside for a photo. `.c-avatars` overlaps a group.

- `.sm` 22px · default 28px · `.lg` 40px
- `.square` · `.neutral`

```html
<span class="c-avatar sm">jh</span>
<span class="c-avatar" title="John Henry">jh</span>
<span class="c-avatar lg square">mq</span>
<span class="c-avatar neutral">?</span>
<span class="c-avatars" aria-label="3 reviewers"><span class="c-avatar sm">jh</span><span class="c-avatar sm">ab</span><span class="c-avatar sm neutral">+1</span></span>
```

### Key cap

`kbd.c-key`; group a combo in `.c-keys`.

```html
<span class="c-keys"><kbd class="c-key">⌘</kbd>+<kbd class="c-key">K</kbd></span>
<kbd class="c-key">Esc</kbd>
<kbd class="c-key">↵</kbd>
```

### Swatch

`.c-swatch` reads its colour from `--sw`; `.c-swatchrow` pairs it with a label.

- `.sm` · default · `.lg` · `.round`

```html
<span class="c-swatchrow"><span class="c-swatch" style="--sw: var(--accent)"></span>accent</span>
<span class="c-swatchrow"><span class="c-swatch round" style="--sw: var(--success)"></span>success</span>
<span class="c-swatchrow"><span class="c-swatch lg" style="--sw: var(--n-700)"></span>n-700</span>
<span class="c-swatchrow"><span class="c-swatch sm" style="--sw: var(--warning)"></span>warning</span>
```

### Categorical ramp

`.c-ramp[data-step="1"…"6"]` selects one of six fixed colours (`--cat-1…6`) into `--ramp`. The attribute name is a convention: to bind the ramp to an app noun (`data-lane`, `data-rarity`…) copy the six selector lines under your attribute — the visual rules only read `--ramp`.

- default tinted label · `.solid` filled · `.dot` 10px disc · `.ink` text only

```html
<span class="c-ramp" data-step="1">lane 1</span>
<span class="c-ramp" data-step="2">lane 2</span>
<span class="c-ramp" data-step="3">lane 3</span>
<span class="c-ramp solid" data-step="4">4</span>
<span class="c-ramp dot" data-step="5" role="img" aria-label="step 5"></span>
<span class="c-ramp ink" data-step="6">step 6 as text</span>
```

## Layout & chrome

### App shell

`.c-shell` — a header / rail / main / statusbar grid. `--c-rail-w` sets the rail width (default 232px); `.c-resize` draws the drag handle (wire the drag yourself). Below 780px the rail is hidden.

- `.rail-end` puts the rail on the right
- `.c-status` is a 26px monospace bar (`.seg` items, `.sp` spacer) and works standalone
- `.c-resize.horizontal` for a bottom edge

```html
<div class="c-shell" style="--c-rail-w: 200px">
  <header class="c-header"><span class="c-logo"><span class="co">erisera</span><span class="tool">clawser</span></span><nav><a href="#app-chrome" aria-current="page">Runs</a><a href="#app-chrome">Settings</a></nav></header>
  <aside class="c-rail">
    <div class="c-side">
      <h5>Runs</h5>
      <ul><li><a href="#app-chrome" class="on">Today</a></li><li><a href="#app-chrome">Yesterday</a></li></ul>
    </div>
    <button class="c-resize" aria-label="Resize sidebar"></button>
  </aside>
  <main class="c-main">
    <div class="c-section">Latest run</div>
    <p class="c-muted">The main pane scrolls independently of the rail.</p>
  </main>
  <footer class="c-status"><span class="seg"><span class="c-dot live"></span> connected</span><span class="seg">branch <b>main</b></span><span class="sp"></span><span class="seg">3 jobs</span><span class="seg">v0.1.1</span></footer>
</div>
```

### Separator / section title

`.c-sep` (`<hr>`, or `.vertical` inline) and `.c-section` — the sidebar heading style with a trailing rule (`.plain` drops it; `.count` and `.actions` slots).

```html
<div class="c-section">Foundations <span class="count">4</span></div>
<p>Tokens, themes, type, spacing.</p>
<hr class="c-sep">
<p>inline <span class="c-sep vertical"></span> separator</p>
<div class="c-section plain">Plain title</div>
```

### Scroll area

`.c-scroll` — thin themed scrollbar; `.x` / `.y` lock an axis. Give a scrollable region `tabindex="0"` so keyboard users can reach it.

```html
<div class="c-scroll" style="height: 120px" tabindex="0">
  <pre class="c-mono" style="margin:0">01 tokens.css
02 themes.css
03 components.css
04 palette.css
05 palette.js
06 theme-toggle.js
07 marks/matey.svg
08 marks/mcp-query.svg
09 marks/ecmanim.svg
10 marks/clawser.svg
11 marks/andbox.svg
12 marks/objectify.svg</pre>
</div>
```

### Theme toggle

`.c-theme-toggle` — the button `theme-toggle.js` drives (it writes the label and `aria-pressed`; pressed = an explicit dark/light override is active).

```html
<button class="c-theme-toggle" id="themeToggle" aria-pressed="false">◐ auto</button>
```

### Utilities

Single-purpose helpers.

- text tones: `.c-dim` (ink-3) · `.c-muted` (ink-2) · `.c-accent` · `.c-success` · `.c-warning` · `.c-error` · `.c-info`
- type: `.c-mono` · `.c-caps`
- layout: `.c-row-flex` (`.wrap`, `.end`, `.between`) · `.c-stack` (`.tight`, `.loose`) · `.c-grow` · `.c-nowrap` · `.c-truncate` · `.c-sr-only`

```html
<div class="c-stack">
  <div class="c-row-flex"><span class="c-caps">caps</span><span class="c-dim">dim</span><span class="c-muted">muted</span><span class="c-success">success</span><span class="c-warning">warning</span><span class="c-error">error</span><span class="c-info">info</span><span class="c-accent">accent</span><span class="c-mono">mono</span></div>
  <div class="c-row-flex"><span class="c-nowrap">never wraps</span><span class="c-grow c-truncate">grow + truncate — this text is long enough to be cut off at the end of the row</span><button class="c-btn ghost">end</button></div>
  <p><span class="c-sr-only">screen-reader only text lives here</span>The line above contains hidden text for assistive tech.</p>
</div>
```

## Pre-existing components

Unchanged by the cross-reproduction pass; see the showcase for markup:
`.c-header` / `.c-side` / `.c-crumb` / `.c-pager` (docs shell), `.c-codebox` +
`.sx-*` (code block), `.c-codegroup` (code tabs), `.c-termbox` (terminal),
`.c-callout` (admonitions), `.c-paramlist` / `.c-paramrow` (API parameters),
`.c-tabbar` (tabs), `.c-search-trigger` + `.c-palette*` (command palette,
`palette.css`), `.circuit-grid` (background texture, `tokens.css`).
