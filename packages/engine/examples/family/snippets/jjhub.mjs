// jjhub (erisera-code/jjhub) — one HTML snippet per shared component id.
// Markup mirrors web/src/DesignSystemPage.tsx and docs/DESIGN-SYSTEM.md; it
// renders with vendor/jjhub.css loaded. Fixed-position layers (.scrim,
// .cmdk-overlay, .notification-tray) are shown inside a relative "stage"
// with an inline position override so they stay in the gallery cell.

const stage = (h, extra = "") =>
  `style="position:relative;height:${h}px;overflow:hidden;contain:layout;${extra}"`;

export default {
  root: { class: "", attrs: "" },

  button: {
    html: `<div class="actions">
  <button type="button" class="btn-primary">Land change</button>
  <button type="button" class="btn-secondary">Cancel</button>
  <button type="button" class="btn-ghost">More</button>
  <button type="button" class="btn-danger">Abandon</button>
  <button type="button" class="accent">accent</button>
  <button type="button" class="warn">warn</button>
  <button type="button" class="btn-primary" disabled>Landing…</button>
  <button type="button" disabled>disabled</button>
</div>`,
    note: "The bare <button> is the secondary; brackets are generated, variants only change ink.",
  },

  "icon-button": {
    html: `<div class="row-flex">
  <button type="button" class="btn-icon" aria-label="Dismiss" title="Dismiss">×</button>
  <button type="button" class="btn-icon" aria-label="Collapse" title="Collapse">▾</button>
  <button type="button" class="btn-icon" aria-label="Pin" title="Pin">●</button>
</div>`,
  },

  "link-button": {
    html: `<div class="row-flex">
  <span>Filtered to 3 changes.</span>
  <button type="button" class="link">clear</button>
</div>`,
  },

  "button-group": {
    html: `<div class="row-flex" style="min-height:110px;align-items:flex-start">
  <div class="btn-group" role="group" aria-label="View">
    <button type="button" class="accent">list</button>
    <button type="button">board</button>
    <button type="button">graph</button>
  </div>
  <div class="split-btn">
    <button type="button" class="btn-primary">Approve</button>
    <details class="menu menu-caret menu-start" open>
      <summary aria-label="Approve — options">▾</summary>
      <div class="menu-items">
        <button type="button">Approve and sign</button>
        <button type="button">Approve with note</button>
      </div>
    </details>
  </div>
</div>`,
  },

  input: {
    html: `<div class="stack">
  <input class="field" placeholder="Change title" aria-label="Change title">
  <textarea class="field" rows="3" placeholder="Description" aria-label="Description"></textarea>
  <select class="field" aria-label="Base bookmark">
    <option value="main" selected>main</option>
    <option value="release">release/next</option>
  </select>
  <input class="field" value="not-a-bookmark" aria-invalid="true" aria-label="Invalid example">
  <input class="field" disabled value="read only" aria-label="Disabled example">
</div>`,
  },

  "form-field": {
    html: `<div class="stack">
  <div class="form-field">
    <label class="form-label" for="jj-bookmark">Bookmark <span class="form-req">*</span></label>
    <input id="jj-bookmark" class="field" value="feature/tidy" aria-describedby="jj-bookmark-hint">
    <div class="form-hint" id="jj-bookmark-hint">Tracked bookmarks mirror a GitHub branch one-to-one.</div>
  </div>
  <div class="form-field">
    <label class="form-label" for="jj-name">Stack name</label>
    <input id="jj-name" class="field" value="" aria-invalid="true" aria-describedby="jj-name-err">
    <div class="form-error" id="jj-name-err" role="alert">A name is required.</div>
  </div>
</div>`,
  },

  choice: {
    html: `<div class="stack">
  <div class="row-flex">
    <label class="choice"><input type="checkbox" class="check" checked> collapse unchanged hunks</label>
    <label class="choice"><input type="checkbox" class="check"> land when ready</label>
    <label class="choice"><input type="checkbox" class="check" disabled> disabled</label>
  </div>
  <div class="row-flex" role="radiogroup" aria-label="Diff layout">
    <label class="choice"><input type="radio" class="radio" name="jj-layout" checked> unified</label>
    <label class="choice"><input type="radio" class="radio" name="jj-layout"> split</label>
  </div>
  <div class="row-flex">
    <label class="choice"><input type="checkbox" class="switch" role="switch" checked> interface sounds</label>
    <label class="choice"><input type="checkbox" class="switch" role="switch"> push notifications</label>
  </div>
</div>`,
    note: "Native inputs with appearance:none, drawn as [x], (o) and [on ].",
  },

  badge: {
    html: `<div class="row-flex">
  <span class="badge">draft</span>
  <span class="badge accent">in review</span>
  <span class="badge pass">landed</span>
  <span class="badge warn">conflicted</span>
  <span class="badge fail">failed</span>
  <span class="badge dim">abandoned</span>
</div>`,
  },

  "status-dot": {
    html: `<div class="row-flex">
  <span class="dot" data-state="live" role="img" aria-label="live"></span> live
  <span class="dot" data-state="busy" role="img" aria-label="busy"></span> busy
  <span class="dot" data-state="idle" role="img" aria-label="idle"></span> idle
  <span class="dot" data-state="error" role="img" aria-label="error"></span> error
</div>`,
  },

  chip: {
    html: `<div class="row-flex">
  <span class="chip">api-client <span class="chip__count">3</span></span>
  <span class="chip accent">@octocat
    <button type="button" class="chip__x" aria-label="Remove @octocat">×</button>
  </span>
  <span class="chip">CHG-184</span>
</div>`,
  },

  card: {
    html: `<div class="stack">
  <div class="card">
    <div class="card__head">CHG-184 · tidy the projection engine</div>
    <div class="card__body">Stable change identity survives amend, split, squash and rebase.</div>
    <div class="card__foot">
      <span class="badge pass">landed</span>
      <span class="grow"></span>
      <span>2 files</span>
    </div>
  </div>
  <div class="card hoverable">
    <div class="card__body">A hoverable card: the border turns --accent on hover.</div>
  </div>
  <div class="card clickable" tabindex="0" role="button">
    <div class="card__body">A clickable card (cursor: pointer, hover rule in --accent).</div>
  </div>
  <div class="card selected">
    <div class="card__body">A selected card.</div>
  </div>
</div>`,
  },

  callout: {
    html: `<div class="stack">
  <div class="callout" data-tone="note">
    <div class="callout__title">Note</div>
    <div class="callout__body">Bookmarks are the only thing the daemon pushes without asking.</div>
  </div>
  <div class="callout" data-tone="tip">
    <div class="callout__body">Add --scope read to mint a read-only token.</div>
  </div>
  <div class="callout" data-tone="warn">
    <div class="callout__title">Divergent</div>
    <div class="callout__body">Two live changes claim the same jj change id.</div>
  </div>
  <div class="callout" data-tone="danger">
    <div class="callout__body">A force-land rewrites trunk. This cannot be undone from GitHub.</div>
  </div>
</div>`,
    note: "A left rail and a glyph (▸ ✓ ⚠ ✗); no fill.",
  },

  banner: {
    html: `<div class="banner" data-tone="warn" role="status">
  <span class="banner__msg">The daemon lost contact 4 minutes ago; changes may be stale.</span>
  <span class="banner__actions">
    <button type="button">Reconnect</button>
    <button type="button" class="btn-icon" aria-label="Dismiss">×</button>
  </span>
</div>`,
  },

  toast: {
    html: `<div ${stage(170)}>
  <section class="notification-tray" aria-label="Notifications" style="position:absolute;right:12px;bottom:12px">
    <div class="notification-toast success" role="status" aria-atomic="true">
      <span class="notification-message">Landed CHG-184 → main</span>
      <button type="button" class="notification-dismiss" aria-label="Dismiss notification">×</button>
    </div>
    <div class="notification-toast error" role="alert" aria-atomic="true">
      <span class="notification-message">Land failed: CHG-183 has a durable conflict. <button type="button" class="link">retry</button></span>
      <button type="button" class="notification-dismiss" aria-label="Dismiss notification">×</button>
    </div>
  </section>
</div>`,
    note: "The tray is position:fixed in the app; pinned to the stage here.",
  },

  dialog: {
    html: `<div ${stage(260)}>
  <div class="scrim" style="position:absolute">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="jj-modal-title">
      <div class="modal-title" id="jj-modal-title">Abandon CHG-184?</div>
      <div class="modal-message dim">The change stays in the op log and can be restored.</div>
      <div class="actions modal-actions">
        <button type="button">Cancel</button>
        <button type="button" class="warn">Abandon</button>
      </div>
    </div>
  </div>
</div>`,
    note: "Modal.tsx renders exactly this with .modal-overlay (an alias of .scrim); the confirm variant is a .warn action.",
  },

  popover: {
    html: `<div style="min-height:150px">
  <details class="menu menu-btn" open>
    <summary>legend</summary>
    <div class="popover popover-start">
      <div class="row-flex"><span class="badge pass">landed</span> merged on GitHub</div>
      <div class="row-flex"><span class="badge warn">conflicted</span> a durable conflict is open</div>
    </div>
  </details>
</div>`,
  },

  tooltip: {
    html: `<div style="min-height:90px">
  <span class="tip-anchor">
    <button type="button" class="link" aria-describedby="jj-tip">what is a stack?</button>
    <span class="tooltip" role="tooltip" id="jj-tip" style="display:block">A stack is an ordered group of changes landed in dependency order.</span>
  </span>
</div>`,
    note: "Normally shown on hover/focus of .tip-anchor; forced open here.",
  },

  menu: {
    html: `<div style="min-height:150px">
  <details class="menu menu-btn" open>
    <summary>actions</summary>
    <div class="menu-items">
      <button type="button">New change</button>
      <button type="button">Sync</button>
      <button type="button" class="btn-danger">Abandon</button>
    </div>
  </details>
</div>`,
  },

  palette: {
    html: `<div ${stage(330)}>
  <div data-scrim data-layer="palette" style="position:absolute;padding-top:24px">
    <article role="dialog" aria-modal="true" aria-label="Command palette" data-palette>
      <form role="search">
        <input role="combobox" aria-expanded="true" aria-controls="jj-cmdk-listbox" aria-autocomplete="list" value="lan" placeholder="Search commands… ( > actions only · ? help )">
        <button type="button" aria-label="Close command palette" title="Close (Esc)">✕</button>
      </form>
      <ul role="listbox" id="jj-cmdk-listbox" aria-label="Commands">
        <li role="option" aria-selected="true">
          <span><mark>lan</mark>d change</span>
          <small>Merge the current change into trunk</small>
        </li>
        <li role="option" aria-selected="false">
          <span><mark>lan</mark>d stack</span>
          <small>Land every change in dependency order</small>
        </li>
      </ul>
      <footer>↑↓ navigate · ↵ select · esc close · &gt; actions · ? help</footer>
    </article>
  </div>
</div>`,
    note: "Cmd+K / Ctrl+K; the palette speaks the shared grammar — [data-layer=palette] is the scrim's top-anchored form, the dialog a search form over a listbox.",
  },

  tabs: {
    html: `<div class="tabs">
  <button type="button" class="tab active">Overview</button>
  <button type="button" class="tab">Diff</button>
  <button type="button" class="tab">Checks</button>
</div>`,
  },

  accordion: {
    html: `<div class="stack">
  <details class="disclosure" open>
    <summary>2 jobs</summary>
    <div class="disclosure__body">
      <div class="row">build ✓</div>
      <div class="row">test ✓</div>
    </div>
  </details>
  <details class="disclosure">
    <summary>3 files changed</summary>
    <div class="disclosure__body">…</div>
  </details>
</div>`,
  },

  table: {
    html: `<div class="stack">
  <table class="kv">
    <tbody>
      <tr><td>Change</td><td>CHG-184</td></tr>
      <tr><td>Bookmark</td><td>feature/tidy</td></tr>
    </tbody>
  </table>
  <div class="table-scroll">
    <table class="ops">
      <thead>
        <tr><th>op</th><th>who</th><th>when</th><th>description</th></tr>
      </thead>
      <tbody>
        <tr><td>OP-42</td><td>octocat</td><td>2m ago</td><td>land CHG-184</td></tr>
        <tr class="selected"><td>OP-41</td><td>daemon</td><td>9m ago</td><td>sync working copy</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
  },

  list: {
    html: `<div class="card">
  <div class="row"><span class="marker">·</span> CHG-181 rename projection module</div>
  <div class="row selected"><span class="marker">▸</span> CHG-182 split the sync loop</div>
  <div class="row" data-cursor=""><span class="marker">·</span> CHG-183 keyboard cursor sits here</div>
  <div class="row dim"><span class="marker">·</span> CHG-180 abandoned</div>
</div>`,
  },

  code: {
    html: `<figure class="code">
  <figcaption class="code__cap">
    <span>src/land.ts</span>
    <button type="button" class="copy-button code__copy">copy</button>
  </figcaption>
  <pre><code><span class="sx-cm">// land in dependency order</span>
<span class="sx-kw">export async function</span> <span class="sx-fn">landStack</span><span class="sx-punct">(</span><span class="sx-attr">stackId</span><span class="sx-punct">: </span><span class="sx-type">string</span><span class="sx-punct">) {</span>
  <span class="sx-kw">const</span> force <span class="sx-punct">=</span> <span class="sx-bool">false</span><span class="sx-punct">;</span>
  <span class="sx-kw">return</span> <span class="sx-fn">land</span><span class="sx-punct">(</span>stackId<span class="sx-punct">, </span><span class="sx-num">3</span><span class="sx-punct">, </span><span class="sx-str">"main"</span><span class="sx-punct">);</span>
<span class="sx-punct">}</span></code></pre>
</figure>`,
  },

  terminal: {
    html: `<div class="term">
  <div class="term__bar">
    <span class="term__lights" aria-hidden="true"><i></i><i></i><i></i></span>
    <span>bash</span>
  </div>
  <pre class="term__body"><span class="term__prompt">$</span> npx jjhub change land CHG-184
<span class="term__out">landed CHG-184 → main (PR #428 merged)</span></pre>
</div>`,
  },

  empty: {
    html: `<div class="empty">No changes match this filter.</div>`,
  },

  spinner: {
    html: `<div class="row-flex">
  <span class="spinner" role="status" aria-label="Loading"></span> syncing…
</div>`,
  },

  meter: {
    html: `<div class="stack">
  <div class="meter" role="meter" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0.6" aria-label="Checks passed" style="--f: 0.6; --c: var(--pass)"></div>
  <div class="meter" role="meter" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0.3" aria-label="Risk" style="--f: 0.3; --c: var(--warn)"></div>
  <meter class="meter" min="0" max="1" value="0.45" aria-label="Native meter"></meter>
</div>`,
    note: "Fill via --f (0..1), tone via --c; native <meter> gets the same box.",
  },

  avatar: {
    html: `<div class="row-flex">
  <span class="avatar sm" aria-hidden="true">oc</span>
  <span class="avatar" role="img" aria-label="octocat">oc</span>
  <span class="avatar lg" role="img" aria-label="octocat">oc</span>
  <span class="user-chip"><span class="avatar sm" aria-hidden="true">oc</span> octocat</span>
</div>`,
  },

  key: {
    html: `<div class="row-flex">
  <kbd>⌘</kbd> <kbd>K</kbd> <span class="key">esc</span>
</div>`,
  },

  separator: {
    html: `<div class="stack">
  <div class="sec-title">Changes</div>
  <div class="row">CHG-184 tidy the projection engine</div>
  <div class="sec-title">Stacks</div>
  <div class="row dim">none yet</div>
</div>`,
  },

  breadcrumb: {
    html: `<nav class="crumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">repos</a></li>
    <li><a href="#">acme/svc</a></li>
    <li aria-current="page">CHG-184</li>
  </ol>
</nav>`,
  },

  pager: {
    html: `<nav class="pager" aria-label="Pagination">
  <a href="#" aria-disabled="true">◂ prev</a>
  <span class="pager__info">page 1 of 9</span>
  <a href="#">next ▸</a>
</nav>`,
  },

  swatch: {
    html: `<div class="row-flex">
  <span class="swatch" style="--c: var(--accent)">--accent</span>
  <span class="swatch" style="--c: var(--pass)">--pass</span>
  <span class="swatch" style="--c: var(--warn)">--warn</span>
  <span class="swatch" style="--c: var(--fail)">--fail</span>
  <span class="swatch lg" style="--c: var(--panel)">--panel</span>
</div>`,
  },

  ramp: {
    html: `<div class="row-flex">
  <span class="swatch ramp" data-step="1">step 1</span>
  <span class="swatch ramp" data-step="2">step 2</span>
  <span class="swatch ramp" data-step="3">step 3</span>
  <span class="swatch ramp" data-step="4">step 4</span>
  <span class="swatch ramp" data-step="5">step 5</span>
  <span class="swatch ramp" data-step="6">step 6</span>
</div>`,
  },

  pattern: {
    html: `<div class="grid-bg card">
  <div class="card__body" style="min-height:96px">A faint character-cell grid, mixed from --fg over --bg.</div>
</div>`,
  },

  shell: {
    html: `<div class="card" style="height:320px;display:flex;flex-direction:column;overflow:hidden">
  <div class="topbar">
    <span class="brand">JJHub</span>
    <span class="dim">acme/svc</span>
    <span class="spacer"></span>
    <button type="button">sync</button>
    <button type="button" class="theme-toggle" aria-label="Switch theme"><span class="theme-toggle__glyph" aria-hidden="true"></span></button>
  </div>
  <div class="cols">
    <div class="rail" style="--rail-width: 160px">
      <div class="sec-title">Changes</div>
      <div class="row selected"><span class="marker">▸</span> CHG-184</div>
      <div class="row"><span class="marker">·</span> CHG-183</div>
      <div class="row dim"><span class="marker">·</span> CHG-180</div>
    </div>
    <div class="resize-handle" role="separator" aria-orientation="vertical" aria-label="Resize rail" tabindex="0"></div>
    <div class="main">
      <div class="sec-title">CHG-184</div>
      <p>tidy the projection engine</p>
      <div class="row-flex"><span class="badge pass">landed</span><span class="dim">2 files</span></div>
    </div>
  </div>
  <div class="statusbar">
    <span class="dot" data-state="live" role="img" aria-label="live"></span>
    <span class="dim">3 changes</span>
    <span class="spacer"></span>
    <span class="user-chip"><span class="avatar sm" aria-hidden="true">oc</span> octocat</span>
  </div>
</div>`,
    note: "The real .app is position:fixed; here the frame is boxed to a 320px stage.",
  },

  board: {
    html: `<div class="board">
  <div class="board-column">
    <div class="board-column-header"><span>ready</span><span class="board-column-count">2</span></div>
    <div class="board-card">
      <div class="board-card-title">CHG-184 tidy the projection engine</div>
      <div class="board-card-meta"><span class="badge pass">checks</span></div>
    </div>
    <div class="board-card board-card-selected">
      <div class="board-card-title">CHG-183 split the sync loop</div>
      <div class="board-card-meta"><span class="badge accent">in review</span></div>
    </div>
  </div>
  <div class="board-column">
    <div class="board-column-header"><span>blocked</span><span class="board-column-count">1</span></div>
    <div class="board-card">
      <div class="board-card-title">CHG-181 rename projection module</div>
      <div class="board-card-meta"><span class="badge warn">conflicted</span></div>
    </div>
  </div>
  <div class="board-column">
    <div class="board-column-header"><span>landed</span><span class="board-column-count">0</span></div>
    <div class="dim board-empty">None</div>
  </div>
</div>`,
  },

  params: {
    html: `<dl class="params">
  <div class="param">
    <dt><code>changeId</code> <span class="param__type">string</span> <span class="param__req">required</span></dt>
    <dd>The stable change id, e.g. CHG-184.</dd>
  </div>
  <div class="param">
    <dt><code>force</code> <span class="param__type">boolean</span></dt>
    <dd>Rewrite trunk if the merge is not a fast-forward. Parks a confirmation.</dd>
  </div>
</dl>`,
  },

  utilities: {
    html: `<div class="stack">
  <div class="row-flex">
    <span class="dim">.dim quiet ink</span>
    <span class="accent">.accent ink</span>
    <span class="pass">.pass ink</span>
    <span class="warn">.warn ink</span>
    <span class="fail">.fail ink</span>
  </div>
  <div class="caps">.caps uppercase small text</div>
  <div class="nowrap" style="max-width:180px;overflow:hidden">.nowrap keeps this line from ever wrapping</div>
  <div class="row-flex">
    <span>.row-flex</span>
    <span class="grow" style="border-bottom:1px dashed currentColor"></span>
    <span class="dim">.grow pushed this right</span>
  </div>
  <div class="stack" style="border-left:1px dashed currentColor;padding-left:8px">
    <span>.stack item one</span>
    <span>.stack item two</span>
  </div>
  <span class="sr-only">.sr-only: screen-reader only text (invisible)</span>
  <span class="dim">(a .sr-only span precedes this line)</span>
</div>`,
  },

  scroll: {
    html: `<div class="scroll card" style="max-height:96px">
  <div class="card__body">
    <div>line 1 of a long log</div>
    <div>line 2 of a long log</div>
    <div>line 3 of a long log</div>
    <div>line 4 of a long log</div>
    <div>line 5 of a long log</div>
    <div>line 6 of a long log</div>
    <div>line 7 of a long log</div>
    <div>line 8 of a long log</div>
  </div>
</div>`,
  },

  scrim: {
    html: `<div class="row-flex" style="align-items:stretch">
  <div ${stage(160, "flex:1 1 200px")}>
    <div class="scrim" style="position:absolute"><span class="badge">.scrim · centered</span></div>
  </div>
  <div ${stage(160, "flex:1 1 200px")}>
    <div class="scrim scrim-top" style="position:absolute;padding-top:16px"><span class="badge">.scrim.scrim-top · top-anchored</span></div>
  </div>
</div>`,
    note: ".modal-overlay is an alias; .scrim-top is the palette's top-anchored form.",
  },

  "theme-toggle": {
    html: `<div class="row-flex">
  <button type="button" class="theme-toggle" aria-label="Switch to light theme" aria-pressed="false">
    <span class="theme-toggle__glyph" aria-hidden="true"></span>
  </button>
  <span class="dim">◐ in the dark theme, ◑ in the light one (driven by :root[data-theme])</span>
</div>`,
  },

  // ---- extended vocabulary (rows 44-53, matrix parity with the sibling systems) ----

  slider: {
    html: `<div class="row-flex">
  <label class="form-label" for="jj-zoom">Zoom</label>
  <input id="jj-zoom" class="slider" type="range" min="0" max="100" value="40" aria-describedby="jj-zoom-out">
  <output id="jj-zoom-out" for="jj-zoom">40</output>
</div>`,
    note: "A native <input type=range>; appearance:none down to a thin track and an accent thumb.",
  },

  segmented: {
    html: `<div class="segmented" role="radiogroup" aria-label="View">
  <label class="segmented__opt"><input type="radio" name="jj-view" value="day" checked> Day</label>
  <label class="segmented__opt"><input type="radio" name="jj-view" value="week"> Week</label>
  <label class="segmented__opt"><input type="radio" name="jj-view" value="month"> Month</label>
</div>`,
    note: "Real radio inputs, clipped not hidden; the checked label fills with --accent.",
  },

  combobox: {
    html: `<div style="min-height:110px">
  <div class="combobox">
    <label class="form-label" for="jj-fruit" id="jj-fruit-label">Fruit</label>
    <input id="jj-fruit" class="field" type="text" value="Ap" role="combobox" aria-expanded="true"
           aria-controls="jj-fruit-list" aria-autocomplete="list" aria-activedescendant="jj-fruit-opt-1">
    <div class="combobox__list popover popover-start" id="jj-fruit-list" role="listbox" aria-labelledby="jj-fruit-label">
      <div class="row selected" role="option" id="jj-fruit-opt-1" aria-selected="true" tabindex="-1">Apple</div>
      <div class="row" role="option" aria-selected="false" tabindex="-1">Apricot</div>
    </div>
  </div>
</div>`,
    note: "The input is a plain .field; the dropdown is .popover.popover-start unmodified, rows reuse .row.",
  },

  skeleton: {
    html: `<div role="status" aria-label="Loading" class="stack">
  <div class="row-flex">
    <span class="skeleton" data-shape="avatar" aria-hidden="true"></span>
    <span class="skeleton" data-shape="line" style="max-width:16ch" aria-hidden="true"></span>
  </div>
  <span class="skeleton" data-shape="line" style="max-width:28ch" aria-hidden="true"></span>
  <span class="skeleton" data-shape="block" aria-hidden="true"></span>
</div>`,
    note: "A flat --panel tone with a moving highlight, not colour-cycling; stops under prefers-reduced-motion.",
  },

  stat: {
    html: `<div class="row-flex">
  <div class="stat">
    <div class="stat__value">1,204</div>
    <div class="stat__label">Active users</div>
    <div class="stat__trend" data-trend="up">4.2%</div>
  </div>
  <div class="stat">
    <div class="stat__value">97%</div>
    <div class="stat__label">Uptime</div>
    <div class="stat__trend" data-trend="flat">steady</div>
  </div>
  <div class="stat">
    <div class="stat__value">3</div>
    <div class="stat__label">Open conflicts</div>
    <div class="stat__trend" data-trend="down">-1 today</div>
  </div>
</div>`,
    note: "The trend glyph changes with the state (▲/▼/●), so it is never colour alone.",
  },

  rating: {
    html: `<span class="rating" role="img" aria-label="4.2 out of 5 stars" style="--f: 0.84"></span>`,
    note: "A ☆/★ overlay clipped to --f (the same fill token .meter uses); the number lives in aria-label.",
  },

  stepper: {
    html: `<ol class="stepper" aria-label="Land readiness">
  <li class="stepper__step" data-status="done"><span class="stepper__num">✓</span> Review</li>
  <li class="stepper__step" data-status="current"><span class="stepper__num">2</span> Checks</li>
  <li class="stepper__step" data-status="upcoming"><span class="stepper__num">3</span> Land</li>
</ol>`,
    note: "Done / current / upcoming, connected by a neutral ── glyph — never an accent-coloured rail.",
  },

  timeline: {
    html: `<ol class="timeline">
  <li class="timeline__item">
    <span class="timeline__marker" aria-hidden="true"></span>
    <time datetime="2026-09-01">Sep 1</time>
    <p>CHG-184 opened.</p>
  </li>
  <li class="timeline__item" data-status="current">
    <span class="timeline__marker" aria-hidden="true"></span>
    <time datetime="2026-09-09">Sep 9</time>
    <p>Landed on main.</p>
  </li>
</ol>`,
    note: "A fixed gutter; the connecting line is neutral --border, painted behind the marker glyph.",
  },

  carousel: {
    html: `<section class="carousel" aria-roledescription="carousel" aria-label="Recent lands">
  <div class="carousel__track">
    <div class="carousel__slide">CHG-184 · tidy the projection engine</div>
    <div class="carousel__slide">CHG-182 · split the sync loop</div>
  </div>
  <div class="carousel__controls">
    <button type="button" class="btn-icon" aria-label="Previous slide">‹</button>
    <div class="carousel__dots" role="tablist" aria-label="Slide">
      <button type="button" class="carousel__dot btn-bare active" role="tab" aria-selected="true" aria-label="Slide 1"></button>
      <button type="button" class="carousel__dot btn-bare" role="tab" aria-selected="false" aria-label="Slide 2"></button>
    </div>
    <button type="button" class="btn-icon" aria-label="Next slide">›</button>
  </div>
</section>`,
    note: "CSS scroll-snap on .carousel__track; prev/next are .btn-icon, dots are bare buttons in a role=tablist.",
  },

  drawer: {
    html: `<div ${stage(200)}>
  <div class="scrim scrim-end" style="position:absolute">
    <div class="drawer" role="dialog" aria-modal="true" aria-labelledby="jj-drawer-title">
      <div class="drawer__head">
        <div class="drawer__title" id="jj-drawer-title">Filters</div>
        <button type="button" class="btn-icon" aria-label="Dismiss">×</button>
      </div>
      <div class="drawer__body dim">Edge-anchored, same open/close semantics as .modal.</div>
    </div>
  </div>
</div>`,
    note: "Same semantics as .modal (a .scrim overlay, role=dialog, aria-modal=true); .scrim-end anchors it to an edge.",
  },
};
