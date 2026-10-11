// circuit (erisera-code/circuit) — one HTML snippet per shared component id.
// Markup follows packages/circuit/COMPONENTS.md / showcase/index.html; every
// class below exists in circuit's tokens.css + components.css + palette.css.
// Overlays are rendered statically (open / visible) because the gallery has no JS.
export default {
  root: { class: "", attrs: "" },

  button: {
    html: `<div class="c-row-flex wrap">
  <button class="c-btn primary">Publish</button>
  <button class="c-btn secondary">Cancel</button>
  <button class="c-btn ghost">Learn more</button>
  <button class="c-btn outline">Preview</button>
  <button class="c-btn danger">Delete</button>
  <button class="c-btn primary" disabled>Publish</button>
  <button class="c-btn primary" disabled><span class="c-spinner sm" aria-hidden="true"></span>Deploying…</button>
</div>`,
    note: "",
  },

  "icon-button": {
    html: `<div class="c-row-flex wrap">
  <button class="c-iconbtn" aria-label="Refresh">↻</button>
  <button class="c-iconbtn ghost" aria-label="Edit">✎</button>
  <button class="c-iconbtn outline sm" aria-label="Close">✕</button>
  <button class="c-iconbtn danger" aria-label="Delete">🗑</button>
  <button class="c-iconbtn lg" aria-label="Add" disabled>+</button>
</div>`,
  },

  "link-button": {
    html: `<p>Deployed to production. <button class="c-linkbtn">Undo</button> · <button class="c-linkbtn" disabled>View logs</button></p>`,
  },

  "button-group": {
    html: `<div class="c-row-flex wrap">
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
</div>`,
  },

  input: {
    html: `<div class="c-stack">
  <input class="c-field" type="text" placeholder="you@example.com" aria-label="Email">
  <input class="c-field mono" type="text" value="sk-live-4f9a…" aria-label="Token">
  <input class="c-field is-error" type="text" value="not a handle" aria-invalid="true" aria-label="Handle">
  <input class="c-field" type="text" value="read only" readonly aria-label="Read only">
  <input class="c-field" type="text" value="disabled" disabled aria-label="Disabled">
  <textarea class="c-field" placeholder="Anything the reviewer should know…" aria-label="Notes"></textarea>
  <span class="c-select"><select class="c-field" aria-label="Region"><option>us-east-1</option><option>eu-west-2</option><option>ap-south-1</option></select></span>
</div>`,
  },

  "form-field": {
    html: `<div class="c-form">
  <label class="c-label" for="cf-email">Email<span class="req" aria-hidden="true">*</span></label>
  <input class="c-field" id="cf-email" type="email" placeholder="you@example.com" aria-describedby="cf-email-hint">
  <div class="c-hint" id="cf-email-hint">We only use this for deploy notifications.</div>
</div>
<div class="c-form">
  <label class="c-label" for="cf-bad">Handle</label>
  <input class="c-field is-error" id="cf-bad" value="not a handle" aria-invalid="true" aria-describedby="cf-bad-err">
  <div class="c-fieldnote" id="cf-bad-err">Handles are lowercase letters and dashes.</div>
</div>
<div class="c-form">
  <label class="c-label" for="cf-notes">Notes<span class="opt">optional</span></label>
  <textarea class="c-field" id="cf-notes" placeholder="Anything the reviewer should know…"></textarea>
</div>
<div class="c-form inline">
  <label class="c-label" for="cf-region">Region</label>
  <span class="c-select"><select class="c-field" id="cf-region"><option>us-east-1</option><option>eu-west-2</option></select></span>
</div>`,
  },

  choice: {
    html: `<div class="c-stack">
  <div class="c-choices">
    <label class="c-check"><input type="checkbox" checked> Email me on failure</label>
    <label class="c-check"><input type="checkbox" disabled> Page on-call (needs a rota)</label>
  </div>
  <div class="c-choices inline" role="radiogroup" aria-label="Strategy">
    <label class="c-radio"><input type="radio" name="c-strategy" checked> cascade</label>
    <label class="c-radio"><input type="radio" name="c-strategy"> race</label>
  </div>
  <label class="c-switch"><input type="checkbox" role="switch" checked> Auto-deploy on green</label>
  <label class="c-switch"><input type="checkbox" role="switch"> Notify on rollback</label>
</div>`,
  },

  badge: {
    html: `<div class="c-row-flex wrap">
  <span class="c-badge accent">accent</span>
  <span class="c-badge success">deployed</span>
  <span class="c-badge warning">degraded</span>
  <span class="c-badge error">failed</span>
  <span class="c-badge neutral">draft</span>
</div>`,
  },

  "status-dot": {
    html: `<div class="c-row-flex wrap">
  <span><span class="c-dot live pulse" role="img" aria-label="live"></span> live</span>
  <span><span class="c-dot idle" role="img" aria-label="idle"></span> idle</span>
  <span><span class="c-dot running" role="img" aria-label="running"></span> running</span>
  <span><span class="c-dot warning" role="img" aria-label="warning"></span> warning</span>
  <span><span class="c-dot error" role="img" aria-label="error"></span> error</span>
  <span><span class="c-dot accent" role="img" aria-label="accent"></span> accent</span>
</div>`,
  },

  chip: {
    html: `<div class="c-row-flex wrap">
  <span class="c-chip">react <span class="count">12</span></span>
  <span class="c-chip">design-system <button class="x" aria-label="Remove design-system">✕</button></span>
  <span class="c-chip accent"><span class="c-avatar sm">jh</span> john <button class="x" aria-label="Remove john">✕</button></span>
</div>`,
  },

  card: {
    html: `<div class="c-stack">
  <div class="c-card">
    <div class="head">Deploy summary <span class="sub">#4821</span><span class="actions"><button class="c-iconbtn ghost sm" aria-label="More">⋯</button></span></div>
    <div class="body">Three services rolled out to <code>us-east-1</code> in 42s. No config drift detected.</div>
    <div class="foot"><span class="c-dot success"></span> healthy <span class="actions"><button class="c-btn ghost">Logs</button></span></div>
  </div>
  <a class="c-card hoverable clickable" href="#">
    <div class="body"><b>Hoverable + clickable</b><br>Lifts on hover, focus ring on keyboard.</div>
  </a>
  <div class="c-card compact">
    <div class="head">Compact</div>
    <div class="body">Tighter padding for boards and rails.</div>
  </div>
</div>`,
  },

  callout: {
    html: `<div class="c-stack">
  <div class="c-callout"><span class="ic">ⓘ</span><p><b>Note.</b> Uses the live accent.</p></div>
  <div class="c-callout tip"><span class="ic">✓</span><p><b>Tip.</b> Always success-green.</p></div>
  <div class="c-callout warning"><span class="ic">▲</span><p><b>Warning.</b> Always amber.</p></div>
  <div class="c-callout danger"><span class="ic">✕</span><p><b>Danger.</b> Always error-red.</p></div>
</div>`,
  },

  banner: {
    html: `<div class="c-stack">
  <div class="c-banner warning" role="status">
    <span class="ic">▲</span>
    <span class="msg"><b>Your branch has diverged.</b> 3 commits behind main.</span>
    <span class="actions"><button class="c-btn secondary">Rebase</button></span>
    <button class="x" aria-label="Dismiss">✕</button>
  </div>
  <div class="c-banner success" role="status"><span class="ic">✓</span><span class="msg">All checks passed.</span><button class="x" aria-label="Dismiss">✕</button></div>
  <div class="c-banner error" role="alert"><span class="ic">✕</span><span class="msg">Deploy failed: <code>ECONNREFUSED</code></span><span class="actions"><button class="c-btn outline">Retry</button></span></div>
  <div class="c-banner info"><span class="ic">ⓘ</span><span class="msg">A new version of the CLI is available.</span></div>
  <div class="c-banner neutral"><span class="ic">·</span><span class="msg">Read-only mode.</span><button class="x" aria-label="Dismiss">✕</button></div>
</div>`,
  },

  toast: {
    html: `<div style="position:relative; min-height: 210px; border:1px dashed var(--line); border-radius: var(--r-lg)">
  <div class="c-toasts" aria-live="polite" style="position:absolute">
    <div class="c-toast success" role="status">
      <span class="ic">✓</span>
      <span class="msg"><span class="title">Deployed</span>matey@0.4.2 is live in us-east-1. <button class="c-linkbtn">View</button></span>
      <button class="x" aria-label="Dismiss">✕</button>
    </div>
    <div class="c-toast error" role="alert"><span class="ic">✕</span><span class="msg"><span class="title">Build failed</span>Type error in <code>src/index.ts</code>.</span><button class="x" aria-label="Dismiss">✕</button></div>
    <div class="c-toast"><span class="c-spinner sm" role="status" aria-label="Working"></span><span class="msg">Warming cache…</span></div>
  </div>
</div>`,
    note: "Tray is position:fixed in circuit; pinned to a stage here with an inline position:absolute.",
  },

  dialog: {
    html: `<div style="position:relative; display:grid; gap:16px; justify-items:center">
  <dialog class="c-dialog" open aria-labelledby="c-dlg-title" style="position:relative">
    <form method="dialog">
      <div class="head"><span id="c-dlg-title">Rename project</span><button class="x" value="cancel" aria-label="Close">✕</button></div>
      <div class="body">
        <div class="c-form">
          <label class="c-label" for="c-dlg-name">Name</label>
          <input class="c-field" id="c-dlg-name" value="matey">
          <div class="c-hint">Used in URLs and the CLI.</div>
        </div>
      </div>
      <div class="actions"><button class="c-btn ghost start">Help</button><button class="c-btn ghost" value="cancel">Cancel</button><button class="c-btn primary" value="ok">Rename</button></div>
    </form>
  </dialog>
  <dialog class="c-dialog confirm" open aria-labelledby="c-cfm-title" style="position:relative">
    <form method="dialog">
      <div class="head" id="c-cfm-title">Delete matey?</div>
      <div class="body">This removes the project and its 14 deploys. It cannot be undone.</div>
      <div class="actions"><button class="c-btn ghost" value="cancel">Keep</button><button class="c-btn danger" value="ok">Delete</button></div>
    </form>
  </dialog>
</div>`,
    note: "Rendered with the open attribute (non-modal), so ::backdrop is not shown.",
  },

  popover: {
    html: `<div style="position:relative">
  <button class="c-btn secondary" aria-expanded="true">Share ▾</button>
  <div class="c-popover" role="dialog" style="margin-top:6px">
    <div class="head">Share this page</div>
    <div class="desc">Anyone with the link can view. Editors need an invite.</div>
    <div class="actions"><button class="c-btn ghost">Close</button><button class="c-btn primary">Copy link</button></div>
  </div>
</div>`,
    note: "Shown statically: the [popover] attribute is omitted so the panel renders without a popovertarget click.",
  },

  tooltip: {
    html: `<div class="c-row-flex" style="padding: 36px 0 36px">
  <span class="c-tooltip"><button class="c-iconbtn" aria-describedby="c-tip-refresh">↻</button><span class="tip" role="tooltip" id="c-tip-refresh" style="opacity:1; transform:translateX(-50%) translateY(0)">Refresh (R)</span></span>
  <span class="c-tooltip bottom"><button class="c-btn ghost">Hover me</button><span class="tip" role="tooltip" style="opacity:1; transform:translateX(-50%) translateY(0)">Tooltips need no JS</span></span>
</div>`,
    note: "Tips are forced visible inline; in circuit they appear on hover / focus-within.",
  },

  menu: {
    html: `<div class="c-row-flex" style="position:relative; min-height: 270px; align-items:flex-start">
  <details class="c-menu" open>
    <summary class="c-btn secondary">Actions</summary>
    <div class="items">
      <div class="label">Project</div>
      <button class="item"><span class="glyph">✎</span>Rename<kbd class="c-key">R</kbd></button>
      <button class="item"><span class="glyph">⧉</span>Duplicate<kbd class="c-key">D</kbd></button>
      <a class="item" href="#"><span class="glyph">↗</span>Open in new tab</a>
      <hr class="sep">
      <button class="item" disabled><span class="glyph">⇪</span>Archive</button>
      <button class="item danger"><span class="glyph">✕</span>Delete</button>
    </div>
  </details>
  <details class="c-menu anchor-end" open>
    <summary class="c-iconbtn" aria-label="More options">⋯</summary>
    <div class="items"><button class="item">Pin</button><button class="item">Mute</button></div>
  </details>
</div>`,
  },

  palette: {
    html: `<button class="c-search-trigger" type="button" style="margin-bottom:12px">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="20" y1="20" x2="15.3" y2="15.3"/></svg>
  Search docs, or jump to a tool…
  <kbd>/</kbd>
</button>
<div style="position:relative;height:220px;overflow:hidden;border-radius:var(--r-lg)">
  <div class="c-palette-backdrop open" style="position:absolute; padding-top:16px">
    <div class="c-palette" role="dialog" aria-modal="true" aria-label="Search" style="max-height:190px">
      <div class="c-palette-input-row">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="20" y1="20" x2="15.3" y2="15.3"/></svg>
        <input type="text" value="dep" placeholder="Search docs, or jump to a tool…" autocomplete="off" spellcheck="false">
        <kbd>esc</kbd>
      </div>
      <div class="c-palette-results">
        <div class="c-presult-group"><div class="c-presult-label">Pages</div>
          <div class="c-presult sel"><span class="picon">▤</span><span class="ptext"><div class="ptitle"><mark>Dep</mark>loy</div><div class="ppath">/guides/deploy</div></span><span class="penter">↵</span></div>
          <div class="c-presult"><span class="picon">▤</span><span class="ptext"><div class="ptitle"><mark>Dep</mark>endencies</div><div class="ppath">/reference/deps</div></span><span class="penter">↵</span></div>
        </div>
        <div class="c-presult-group"><div class="c-presult-label">Actions</div>
          <div class="c-presult"><span class="picon">◐</span><span class="ptext"><div class="ptitle">Toggle theme</div></span><span class="penter">↵</span></div>
        </div>
      </div>
      <div class="c-palette-footer"><span><kbd>↑↓</kbd> navigate</span><span><kbd>↵</kbd> select</span><span><kbd>esc</kbd> close</span></div>
    </div>
  </div>
</div>`,
    note: "palette.js normally mounts this markup; here it is written out statically with the .open state.",
  },

  tabs: {
    html: `<div class="c-stack">
  <div class="c-tabbar"><span class="tab on">Overview</span><span class="tab">Reference</span><span class="tab">Examples</span></div>
  <div class="c-codegroup">
    <div class="cgtabs"><button class="on">npm</button><button>pnpm</button><button>bun</button></div>
    <div class="c-codebox"><pre>npm install @erisera-code/circuit</pre></div>
  </div>
</div>`,
  },

  accordion: {
    html: `<div class="c-accordions">
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
    <div class="body">That is what the app-chrome tier is for.</div>
  </details>
</div>`,
  },

  table: {
    html: `<div class="c-stack">
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
</div>`,
  },

  list: {
    html: `<ul class="c-list bordered" role="listbox" aria-label="Files">
  <li class="c-row" role="option" aria-selected="true"><span class="glyph">◆</span><span class="title">tokens.css</span><span class="meta">4.1 kB</span><span class="actions"><button class="c-iconbtn ghost sm" aria-label="Open tokens.css">↗</button></span></li>
  <li class="c-row cursor" role="option" aria-selected="false"><span class="glyph">◇</span><span class="title">components.css</span><span class="meta">38 kB</span><span class="actions"><button class="c-iconbtn ghost sm" aria-label="Open components.css">↗</button></span></li>
  <li class="c-row" role="option" aria-selected="false"><span class="glyph">◇</span><span class="title">palette.css — a very long file name that truncates with an ellipsis</span><span class="meta">3.2 kB</span></li>
  <li class="c-row dim" role="option" aria-selected="false"><span class="glyph">·</span><span class="title">themes.css</span><span class="meta">ignored</span></li>
</ul>`,
  },

  code: {
    html: `<div class="c-codebox">
  <span class="cap">example.ts <button class="cp" type="button">copy</button></span>
  <pre><span class="sx-kw">import</span> <span class="sx-punct">{</span> createClient <span class="sx-punct">}</span> <span class="sx-kw">from</span> <span class="sx-str">"@mcp-query/core"</span><span class="sx-punct">;</span>

<span class="sx-cm">// reactive client, typed against a live server contract</span>
<span class="sx-kw">interface</span> <span class="sx-type">QueryOptions</span> <span class="sx-punct">{</span>
  ttl<span class="sx-punct">:</span> <span class="sx-type">number</span><span class="sx-punct">;</span>
  retry<span class="sx-punct">:</span> <span class="sx-bool">boolean</span><span class="sx-punct">;</span>
<span class="sx-punct">}</span>
<span class="sx-kw">const</span> client <span class="sx-punct">=</span> <span class="sx-fn">createClient</span><span class="sx-punct">(</span><span class="sx-punct">{</span> ttl<span class="sx-punct">:</span> <span class="sx-num">3000</span> <span class="sx-punct">}</span><span class="sx-punct">);</span></pre>
</div>`,
  },

  terminal: {
    html: `<div class="c-termbox">
  <div class="twin"><i></i><i></i><i></i></div>
  <pre><span class="prompt">$</span> npm install @erisera-code/circuit
<span class="out">✓ added @erisera-code/circuit@0.0.1</span>
<span class="prompt">$</span> matey deploy
<span class="out">→ us-east-1 · 3 services · 42s</span></pre>
</div>`,
  },

  empty: {
    html: `<div class="c-stack">
  <div class="c-empty">
    <div class="glyph">◌</div>
    <div class="title">No deploys yet</div>
    <div class="desc">Push to <code>main</code> or run <code>matey deploy</code> to see activity here.</div>
    <div class="actions"><button class="c-btn primary">Deploy now</button><button class="c-btn ghost">Read the guide</button></div>
  </div>
  <div class="c-empty sm"><div class="glyph">⌕</div><div class="desc">No results for “quorum”.</div></div>
</div>`,
  },

  spinner: {
    html: `<div class="c-row-flex wrap">
  <span class="c-spinner sm" role="status" aria-label="Loading"></span>
  <span class="c-spinner" role="status" aria-label="Loading"></span>
  <span class="c-spinner lg" role="status" aria-label="Loading"></span>
  <span class="c-spinner ink" role="status" aria-label="Loading"></span>
  <button class="c-btn primary" disabled><span class="c-spinner sm" aria-hidden="true"></span>Deploying…</button>
</div>`,
  },

  meter: {
    html: `<div class="c-stack tight">
  <div class="c-meterrow"><span>cpu</span><meter class="c-meter" min="0" max="1" value="0.62" aria-label="CPU 62%"></meter><span class="val">62%</span></div>
  <div class="c-meterrow"><span>build</span><progress class="c-meter success" max="100" value="80" aria-label="Build 80%"></progress><span class="val">80%</span></div>
  <div class="c-meterrow"><span>disk</span><div class="c-meter warning" role="meter" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0.86" aria-label="Disk 86%" style="--f: 0.86"></div><span class="val">86%</span></div>
  <div class="c-meterrow"><span>errors</span><div class="c-meter error lg" role="meter" aria-valuenow="0.3" aria-valuemin="0" aria-valuemax="1" aria-label="Errors 30%" style="--f: 0.3"></div><span class="val">30%</span></div>
  <div class="c-meterrow"><span>sync</span><div class="c-meter info sm" role="meter" aria-valuenow="0.5" aria-valuemin="0" aria-valuemax="1" aria-label="Sync 50%" style="--f: 0.5"></div><span class="val">50%</span></div>
</div>`,
  },

  avatar: {
    html: `<div class="c-row-flex wrap">
  <span class="c-avatar sm">jh</span>
  <span class="c-avatar" title="John Henry">jh</span>
  <span class="c-avatar lg square">mq</span>
  <span class="c-avatar neutral">?</span>
  <span class="c-avatars" aria-label="3 reviewers"><span class="c-avatar sm">jh</span><span class="c-avatar sm">ab</span><span class="c-avatar sm neutral">+1</span></span>
  <span class="c-chip"><span class="c-avatar sm">jh</span> john</span>
</div>`,
  },

  key: {
    html: `<div class="c-row-flex wrap">
  <span class="c-keys"><kbd class="c-key">⌘</kbd>+<kbd class="c-key">K</kbd></span>
  <kbd class="c-key">Esc</kbd>
  <kbd class="c-key">↵</kbd>
  <span class="c-keys"><kbd class="c-key">Ctrl</kbd>+<kbd class="c-key">Shift</kbd>+<kbd class="c-key">P</kbd></span>
</div>`,
  },

  separator: {
    html: `<div class="c-section">Foundations <span class="count">4</span></div>
<p>Tokens, themes, type, spacing.</p>
<hr class="c-sep">
<p>inline <span class="c-sep vertical"></span> separator</p>
<div class="c-section plain">Plain title</div>
<div class="c-section">With actions <span class="actions"><button class="c-iconbtn ghost sm" aria-label="Add">+</button></span></div>`,
  },

  breadcrumb: {
    html: `<div class="c-crumb">docs / components / <b>button</b></div>`,
  },

  pager: {
    html: `<nav class="c-pager" aria-label="Pagination">
  <a href="#"><span class="dir">← Previous</span><span class="t">Tokens</span></a>
  <a href="#" class="next"><span class="dir">Next →</span><span class="t">Themes</span></a>
</nav>`,
  },

  swatch: {
    html: `<div class="c-row-flex wrap">
  <span class="c-swatchrow"><span class="c-swatch" style="--sw: var(--accent)"></span>accent</span>
  <span class="c-swatchrow"><span class="c-swatch round" style="--sw: var(--success)"></span>success</span>
  <span class="c-swatchrow"><span class="c-swatch lg" style="--sw: var(--n-700)"></span>n-700</span>
  <span class="c-swatchrow"><span class="c-swatch sm" style="--sw: var(--warning)"></span>warning</span>
  <span class="c-swatchrow"><span class="c-swatch" style="--sw: var(--error)"></span>error</span>
</div>`,
  },

  ramp: {
    html: `<div class="c-row-flex wrap">
  <span class="c-ramp" data-step="1">lane 1</span>
  <span class="c-ramp" data-step="2">lane 2</span>
  <span class="c-ramp" data-step="3">lane 3</span>
  <span class="c-ramp" data-step="4">lane 4</span>
  <span class="c-ramp" data-step="5">lane 5</span>
  <span class="c-ramp" data-step="6">lane 6</span>
</div>
<div class="c-row-flex wrap" style="margin-top:8px">
  <span class="c-ramp solid" data-step="1">1</span><span class="c-ramp solid" data-step="2">2</span><span class="c-ramp solid" data-step="3">3</span><span class="c-ramp solid" data-step="4">4</span><span class="c-ramp solid" data-step="5">5</span><span class="c-ramp solid" data-step="6">6</span>
  <span class="c-ramp dot" data-step="5" role="img" aria-label="step 5"></span>
  <span class="c-ramp ink" data-step="6">step 6 as text</span>
</div>`,
  },

  pattern: {
    html: `<div class="circuit-grid" style="height:140px; border:1px solid var(--line); border-radius: var(--r-lg); display:flex; align-items:center; justify-content:center">
  <span class="c-muted c-mono">.circuit-grid · 24px texture</span>
</div>`,
  },

  shell: {
    html: `<div style="height:320px; border:1px solid var(--line); border-radius: var(--r-lg); overflow:hidden">
  <div class="c-shell" style="--c-rail-w: 160px; height: 320px">
    <header class="c-header"><span class="c-logo"><span class="co">erisera</span><span class="tool">clawser</span></span><nav><a href="#" aria-current="page">Runs</a><a href="#">Settings</a></nav></header>
    <aside class="c-rail">
      <div class="c-side">
        <h5>Runs</h5>
        <ul><li><a href="#" class="on">Today</a></li><li><a href="#">Yesterday</a></li></ul>
      </div>
      <button class="c-resize" aria-label="Resize sidebar"></button>
    </aside>
    <main class="c-main">
      <div class="c-section">Latest run</div>
      <p class="c-muted">The main pane scrolls independently of the rail.</p>
    </main>
    <footer class="c-status"><span class="seg"><span class="c-dot live"></span> connected</span><span class="seg">branch <b>main</b></span><span class="sp"></span><span class="seg">3 jobs</span><span class="seg">v0.1.1</span></footer>
  </div>
</div>`,
    note: "The rail hides below a 780px viewport (circuit's own breakpoint).",
  },

  board: {
    html: `<div style="height:320px; overflow:hidden">
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
</div>`,
  },

  params: {
    html: `<div class="c-paramlist">
  <div class="c-paramrow"><span class="pname">providers</span><span class="ptype">Provider[]</span><span class="preq required">required</span><p class="pdesc">Backends to route through, in priority order.</p></div>
  <div class="c-paramrow"><span class="pname">fallback</span><span class="ptype">"cascade" | "race"</span><span class="pdefault">= "cascade"</span><span class="preq optional">optional</span><p class="pdesc">Try providers in order or race them.</p></div>
  <div class="c-paramrow"><span class="pname">timeout</span><span class="ptype">number</span><span class="pdefault">= 30000</span><span class="preq optional">optional</span><p class="pdesc">Milliseconds before a provider is skipped.</p></div>
</div>`,
  },

  utilities: {
    html: `<div class="c-stack">
  <div class="c-row-flex wrap"><span class="c-caps">caps</span><span class="c-dim">dim</span><span class="c-muted">muted</span><span class="c-success">success</span><span class="c-warning">warning</span><span class="c-error">error</span><span class="c-info">info</span><span class="c-accent">accent</span><span class="c-mono">mono</span></div>
  <div class="c-row-flex"><span class="c-nowrap">never wraps</span><span class="c-grow c-truncate">grow + truncate — this text is long enough to be cut off at the end of the row</span><button class="c-btn ghost">end</button></div>
  <div class="c-row-flex between"><span>row-flex.between</span><span class="c-dim">right</span></div>
  <div class="c-stack tight"><span>stack.tight</span><span class="c-dim">second line</span></div>
  <p><span class="c-sr-only">screen-reader only text lives here</span>The line above contains hidden text for assistive tech.</p>
</div>`,
  },

  scroll: {
    html: `<div class="c-scroll" style="height: 120px" tabindex="0">
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
</div>`,
  },

  scrim: {
    html: `<div style="position:relative; height:220px; overflow:hidden; border-radius: var(--r-lg); border:1px solid var(--line)">
  <p class="c-muted" style="padding:16px">Content underneath the wash.</p>
  <div class="c-scrim center" style="position:absolute">
    <div class="c-card" style="max-width: 320px"><div class="body">Any custom layer sits on <code>--scrim</code>. Click anywhere to close.</div></div>
  </div>
</div>`,
    note: "Scrim is position:fixed in circuit; pinned to a stage here with an inline position:absolute.",
  },

  "theme-toggle": {
    html: `<div class="c-row-flex wrap">
  <button class="c-theme-toggle" aria-pressed="false">◐ auto</button>
  <button class="c-theme-toggle" aria-pressed="true">● dark</button>
  <button class="c-theme-toggle" aria-pressed="true">○ light</button>
</div>`,
    note: "Static markup; theme-toggle.js normally writes the label and aria-pressed.",
  },

  slider: {
    html: `<div class="c-stack">
  <input class="c-slider" type="range" min="0" max="100" value="40" aria-label="Volume">
  <input class="c-slider" type="range" min="0" max="100" value="70" disabled aria-label="Volume (disabled)">
</div>`,
  },

  segmented: {
    html: `<div class="c-segmented" role="radiogroup" aria-label="View">
  <label><input type="radio" name="c-segmented-view" checked>Day</label>
  <label><input type="radio" name="c-segmented-view">Week</label>
  <label><input type="radio" name="c-segmented-view">Month</label>
</div>`,
  },

  combobox: {
    html: `<div class="c-combobox" style="max-width:260px">
  <input class="c-field" type="text" role="combobox" aria-expanded="true" aria-controls="c-cb-fruit" aria-autocomplete="list" placeholder="Search fruit…">
  <ul class="panel c-list" role="listbox" id="c-cb-fruit">
    <li class="c-row" role="option" aria-selected="true">Apple</li>
    <li class="c-row" role="option">Apricot</li>
    <li class="c-row" role="option">Avocado</li>
  </ul>
</div>`,
    note: "Shown statically: the popup listbox has no hidden attribute, so it renders open without JS.",
  },

  skeleton: {
    html: `<div class="c-row-flex" style="max-width:260px" aria-busy="true">
  <div class="c-skeleton avatar"></div>
  <div class="c-grow c-stack tight">
    <div class="c-skeleton text"></div>
    <div class="c-skeleton text"></div>
  </div>
</div>`,
  },

  stat: {
    html: `<div class="c-row-flex wrap">
  <div class="c-stat">
    <span class="value">1,204</span>
    <span class="label">Active users</span>
    <span class="trend up">▲ 4.2%</span>
  </div>
  <div class="c-stat">
    <span class="value">42ms</span>
    <span class="label">p95 latency</span>
    <span class="trend down">▼ 8ms</span>
  </div>
</div>`,
  },

  rating: {
    html: `<div class="c-row-flex wrap">
  <span class="c-rating" role="img" aria-label="4.5 out of 5 stars" style="--val: 4.5"></span>
  <span class="c-rating" role="img" aria-label="3 out of 5 stars" style="--val: 3"></span>
</div>`,
  },

  stepper: {
    html: `<ol class="c-stepper" style="max-width:420px">
  <li class="done">Account</li>
  <li class="current">Shipping</li>
  <li>Payment</li>
  <li>Confirm</li>
</ol>`,
  },

  timeline: {
    html: `<ol class="c-timeline" style="max-width:320px">
  <li><time datetime="2026-09-01">Sep 1</time><p>Repo created.</p></li>
  <li><time datetime="2026-09-07">Sep 7</time><p>v0.1.1 shipped.</p></li>
  <li class="current"><time datetime="2026-09-09">Sep 9</time><p>Extended vocabulary landed.</p></li>
</ol>`,
  },

  carousel: {
    html: `<div class="c-carousel" style="max-width:320px">
  <div class="track">
    <div class="c-card"><div class="body">Slide 1</div></div>
    <div class="c-card"><div class="body">Slide 2</div></div>
    <div class="c-card"><div class="body">Slide 3</div></div>
  </div>
  <div class="nav">
    <button class="c-iconbtn ghost" aria-label="Previous">‹</button>
    <button class="c-iconbtn ghost" aria-label="Next">›</button>
  </div>
  <div class="dots" role="tablist" aria-label="Slide">
    <button role="tab" aria-selected="true" aria-label="Slide 1"></button>
    <button role="tab" aria-selected="false" aria-label="Slide 2"></button>
    <button role="tab" aria-selected="false" aria-label="Slide 3"></button>
  </div>
</div>`,
    note: "Advancing the track and syncing the dots is JS in circuit; the first slide is shown here.",
  },

  drawer: {
    html: `<dialog class="c-dialog drawer" open aria-labelledby="c-drw-title" style="position:relative; width:240px; height:260px">
  <form method="dialog">
    <div class="head"><span id="c-drw-title">Filters</span><button class="x" value="cancel" aria-label="Close">✕</button></div>
    <div class="body">
      <div class="c-choices">
        <label class="c-check"><input type="checkbox" checked> Healthy only</label>
        <label class="c-check"><input type="checkbox"> Include paused</label>
      </div>
    </div>
    <div class="actions"><button class="c-btn ghost" value="cancel">Reset</button><button class="c-btn primary" value="ok">Apply</button></div>
  </form>
</dialog>`,
    note: "Rendered with the open attribute (non-modal) and pinned to position:relative; in circuit it is showModal()'d and anchored fixed to a screen edge.",
  },
};
