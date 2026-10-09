// impressive-snake — "Impressive Snake UI" (src/ds/, .ss-root scoped).
// One snippet per shared component id (see ../components.mjs). The markup is
// lifted from src/ds/examples/gallery.js, which prints each demo's outerHTML
// back off the live element, so these are the strings the browser parsed there.
//
// Conventions of this system worth knowing before reading the snippets:
//   - neon over navy: translucent panels on a deep board, 1px --edge borders,
//     a 3–4px corner, and five signal colours (--ok --charge --warn --bad
//     --burn) that never carry a meaning alone;
//   - variants and states are data attributes (.ss-btn[data-variant],
//     .ss-badge[data-tone], .ss-dot[data-state], .ss-row[data-cursor]) and
//     aria (aria-pressed, aria-selected) — never sub-classes;
//   - data the host decides arrives as a custom property: --f (fill), --c
//     (colour), --w (width), --sz (size), --rail (rail width);
//   - nothing is position:fixed. .ss-overlay, .ss-scrim, .ss-shell are
//     inset:0 against the nearest positioned host; .ss-popover, .ss-tooltip
//     and .ss-menu__items are absolute against their anchor — so every
//     overlay below sits in a relative, fixed-height stage;
//   - native elements first: <dialog>, <details>, <kbd>, a real <table>.

export default {
  root: { class: "ss-root", attrs: "" },

  button: {
    html: `<div class="ss-row-flex">
  <button class="ss-btn" type="button" data-variant="primary">Play it</button>
  <button class="ss-btn" type="button">Settings</button>
  <button class="ss-btn" type="button" data-variant="ghost">Back</button>
  <button class="ss-btn" type="button" data-variant="danger">Restore defaults</button>
  <button class="ss-btn" type="button" disabled>Too dear</button>
  <button class="ss-btn" type="button" aria-pressed="true">Muted</button>
</div>`,
    note: "Variants are data-variant; the plain .ss-btn is the secondary. aria-pressed is the toggled state, disabled the dear one.",
  },

  "icon-button": {
    html: `<div class="ss-row-flex">
  <button class="ss-btn ss-btn-icon" type="button" aria-label="close">✕</button>
  <button class="ss-btn ss-btn-icon" type="button" data-variant="primary" aria-label="play">▶</button>
  <button class="ss-btn ss-btn-icon" type="button" data-variant="ghost" aria-label="previous">‹</button>
</div>`,
    note: "Square .ss-btn.ss-btn-icon; the label is aria-label.",
  },

  "link-button": {
    html: `<p style="margin:0">Nothing matches. <button class="ss-linkbtn" type="button">Clear the filter</button> or <button class="ss-linkbtn" type="button">search all switches</button>.</p>`,
    note: "A dotted charge-coloured underline; still a button.",
  },

  "button-group": {
    html: `<div class="ss-btngroup" role="group" aria-label="sort">
  <button class="ss-btn" type="button" aria-pressed="true">Found</button>
  <button class="ss-btn" type="button">Kind</button>
  <button class="ss-btn" type="button">Name</button>
</div>`,
    note: "Buttons that share their edges; the chosen segment is aria-pressed. A group of two is the split.",
  },

  input: {
    html: `<div class="ss-row-flex" style="align-items:flex-start">
  <input type="text" placeholder="a number, or any word" aria-label="seed">
  <select aria-label="sort"><option>found</option><option>kind</option></select>
  <textarea aria-label="notes" rows="2">a whole floor, as a token</textarea>
</div>`,
    note: "Bare element defaults from base.js, wrapped in :where() so they weigh nothing — no class needed.",
  },

  "form-field": {
    html: `<div class="ss-row-flex" style="align-items:flex-start; gap:16px">
  <label class="ss-field" style="--w:220px">
    <span class="ss-field__label">Seed</span>
    <input type="text" value="beetroot">
    <span class="ss-field__hint">Any word works. The same word is the same run.</span>
  </label>
  <label class="ss-field" data-invalid="1" style="--w:220px">
    <span class="ss-field__label">Floor</span>
    <input type="number" value="0" aria-invalid="true" aria-describedby="sk-floor-err">
    <span class="ss-field__error" id="sk-floor-err">Floors start at 1.</span>
  </label>
</div>`,
    note: "The wrapper owns width (--w) and state (data-invalid turns the edge and shows the error line).",
  },

  choice: {
    html: `<div class="ss-row-flex" style="gap:18px; flex-wrap:wrap">
  <label class="ss-row-flex"><input class="ss-check" type="checkbox" checked> screen shake</label>
  <label class="ss-row-flex"><input class="ss-check" type="checkbox"> flashes</label>
  <label class="ss-row-flex"><input class="ss-radio" type="radio" name="sk-p" checked> full</label>
  <label class="ss-row-flex"><input class="ss-radio" type="radio" name="sk-p"> calm</label>
  <label class="ss-row-flex"><input class="ss-switch" type="checkbox" role="switch" checked> music</label>
  <label class="ss-row-flex"><input class="ss-switch" type="checkbox" role="switch" disabled> (locked)</label>
</div>`,
    note: "Native inputs under appearance:none, drawn as neon-edged boxes; the switch is the settings pill.",
  },

  badge: {
    html: `<div class="ss-row-flex">
  <span class="ss-badge">draft</span>
  <span class="ss-badge" data-tone="good">clearable</span>
  <span class="ss-badge" data-tone="warn">fragile</span>
  <span class="ss-badge" data-tone="bad">unsolvable</span>
  <span class="ss-badge" data-tone="accent">built</span>
</div>`,
    note: "A wash of the tone and the glyph that tone implies, so colour is never the only signal.",
  },

  "status-dot": {
    html: `<div class="ss-row-flex" style="gap:14px">
  <span><i class="ss-dot" aria-hidden="true"></i> off</span>
  <span><i class="ss-dot" data-state="live" aria-hidden="true"></i> live</span>
  <span><i class="ss-dot" data-state="idle" aria-hidden="true"></i> idle</span>
  <span><i class="ss-dot" data-state="error" aria-hidden="true"></i> error</span>
</div>`,
    note: "One glyph per state (○ ● ◐ ⊗); live also glows.",
  },

  chip: {
    html: `<div class="ss-row-flex">
  <span class="ss-chip">seed <b class="ss-chip__n">48213</b></span>
  <span class="ss-chip" data-hot="1">floor 4</span>
  <span class="ss-chip">ashcoat <button class="ss-chip__x" type="button" aria-label="remove ashcoat"></button></span>
</div>`,
    note: "A small bordered noun; __n is the count, __x the remove (glyph drawn by the sheet), data-hot lights the edge.",
  },

  card: {
    html: `<div class="ss-row-flex" style="align-items:stretch; flex-wrap:wrap">
  <div class="ss-card" style="width:240px">
    <div class="ss-card__head">Floor 7 <span class="ss-badge" data-tone="warn" style="margin-left:auto">boss</span></div>
    <div class="ss-card__body">The Mother. Sixteen segments, two phases, one exit.</div>
    <div class="ss-card__foot">cleared twice · best 3:12</div>
  </div>
  <div class="ss-card" data-hot="1" tabindex="0" role="button" style="width:240px">
    <div class="ss-card__head">Floor 8</div>
    <div class="ss-card__body">data-hot="1": hover lights the edge; tabindex makes it the clickable card.</div>
    <div class="ss-card__foot">press to dive</div>
  </div>
  <div class="ss-stat" data-tone="good"><div class="ss-stat__v ss-num">42</div><div class="ss-stat__sub">kills</div></div>
  <div class="ss-stat" data-tone="accent"><div class="ss-stat__v ss-num">7</div><div class="ss-stat__sub">floors</div></div>
</div>`,
    note: "Head / body / foot; data-hot is the hoverable card. .ss-stat is the card for one number.",
  },

  callout: {
    html: `<div class="ss-stack" style="width:460px; max-width:100%">
  <div class="ss-callout"><div class="ss-callout__title">Note</div><div class="ss-callout__body">Segment order is the spell.</div></div>
  <div class="ss-callout" data-tone="tip"><div class="ss-callout__title">Tip</div><div class="ss-callout__body">A modifier reaches forward, tailward, over the payloads after it.</div></div>
  <div class="ss-callout" data-tone="warn"><div class="ss-callout__title">Cost</div><div class="ss-callout__body">Reversing costs twice what a jump does.</div></div>
  <div class="ss-callout" data-tone="danger"><div class="ss-callout__title">Lethal</div><div class="ss-callout__body">The burn band destroys every segment behind the tail mark.</div></div>
</div>`,
    note: "A rule on the leading edge, a wash of the tone, and a glyph in the gutter. The untoned one is the note.",
  },

  banner: {
    html: `<div class="ss-stack">
  <div class="ss-banner" role="status">A cast is pending — it fires on the next tick. <span class="ss-banner__acts"><button class="ss-btn" type="button" data-variant="ghost">Cancel</button></span></div>
  <div class="ss-banner" data-tone="warn" role="alert">Your browser is holding an old copy of the game. <span class="ss-banner__acts"><button class="ss-btn" type="button">Reload</button><button class="ss-btn ss-btn-icon" type="button" data-variant="ghost" aria-label="dismiss">✕</button></span></div>
  <div class="ss-banner" data-tone="bad">This floor cannot be cleared by movement alone.</div>
  <div class="ss-banner" data-tone="good">Link copied.</div>
</div>`,
    note: "A full-width strip; the actions trail in __acts.",
  },

  toast: {
    html: `<div style="position:relative; height:120px; overflow:hidden">
  <div class="ss-toasts" data-at="tl" role="log" aria-live="polite" style="position:absolute; top:6px; left:0">
    <div class="ss-toast">segment order changed</div>
    <div class="ss-toast" data-tone="good">exit open</div>
    <div class="ss-toast" data-tone="warn">2 charge short <span class="ss-toast__acts"><button class="ss-btn" type="button" data-variant="ghost">undo</button></span></div>
    <div class="ss-toast" data-tone="bad">cast refused <span class="ss-toast__acts"><button class="ss-btn ss-btn-icon" type="button" data-variant="ghost" aria-label="dismiss">✕</button></span></div>
  </div>
</div>`,
    note: "The HUD's own rail: .ss-toasts is a column the host pins to a corner (data-at tl/tr/bl/br); each toast is toned on the edge and in a tint of the ink, and slides in 3px over --dur.",
  },

  dialog: {
    html: `<div style="position:relative; height:260px; overflow:hidden">
  <div class="ss-overlay" role="dialog" aria-modal="true" aria-labelledby="sk-d1">
    <div class="ss-sheet" style="width:min(420px,100%)">
      <div class="ss-sheet__title"><h2 id="sk-d1">Paused</h2><span class="ss-sheet__sub">floor 4 · seed 48213</span></div>
      <div class="ss-sheet__rule"></div>
      <div class="ss-dim">Arrange the body. Order is the spell.</div>
      <div class="ss-keys"><span class="ss-key"><kbd>esc</kbd> resume</span><span class="ss-key"><kbd>←</kbd><kbd>→</kbd> move</span></div>
    </div>
  </div>
  <dialog class="ss-dialog" open aria-labelledby="sk-d2" style="z-index:var(--z-modal)">
    <div class="ss-sheet__title"><h2 id="sk-d2" style="font-size:var(--fs)">Forget this floor?</h2></div>
    <div class="ss-sheet__rule"></div>
    <div class="ss-dim">The token stays in your clipboard history; the library will not.</div>
    <div class="ss-dialog__acts"><button class="ss-btn" type="button" data-variant="ghost">Keep it</button><button class="ss-btn" type="button" data-variant="danger">Forget</button></div>
  </dialog>
</div>`,
    note: "Two constructions: .ss-overlay (radial scrim + blur, inset:0) holding a .ss-sheet with the lit edge and the title rule; and the compact confirm on a native <dialog class=\"ss-dialog\">, whose ::backdrop takes the scrim under showModal(). Both are shown open here, the confirm stacked on the overlay.",
  },

  popover: {
    html: `<div style="position:relative; height:120px; overflow:hidden">
  <div style="position:absolute; top:8px; left:8px">
    <button class="ss-btn" type="button" aria-expanded="true" aria-controls="sk-pop-1">Legend</button>
    <div class="ss-popover" id="sk-pop-1" style="top:100%; left:0; margin-top:4px">
      <div class="ss-popover__head">Board marks</div>
      <div class="ss-legend" style="margin:0"><span><i class="ss-swatch" style="--c:var(--ok)"></i> exit</span><span><i class="ss-swatch" style="--c:var(--bad)"></i> enemy</span></div>
    </div>
  </div>
</div>`,
    note: "An anchored box one step in front (--inset, --edge-hot, --shadow-sm); positioned by the host.",
  },

  tooltip: {
    html: `<div style="position:relative; height:80px; overflow:hidden">
  <div style="position:absolute; top:44px; left:120px">
    <span class="ss-chip" aria-describedby="sk-tip-1">◆ anvil</span>
    <div class="ss-tooltip" role="tooltip" id="sk-tip-1" style="bottom:calc(100% + 6px); left:50%"><b>anvil</b> · payload <span class="ss-dim">power 2 + charge/3</span></div>
  </div>
</div>`,
    note: "The spine's tip made general: centred over its anchor by translateX(-50%); shown and hidden with the hidden attribute.",
  },

  menu: {
    html: `<div style="position:relative; height:150px; overflow:hidden">
  <details class="ss-menu" open style="position:absolute; top:8px; left:8px">
    <summary class="ss-btn">Run</summary>
    <div class="ss-menu__items" role="menu">
      <button class="ss-menu__item" type="button" role="menuitem">Copy link to this run</button>
      <button class="ss-menu__item" type="button" role="menuitem">Open in editor</button>
      <hr class="ss-menu__sep">
      <button class="ss-menu__item" type="button" role="menuitem" disabled>Play this body</button>
    </div>
  </details>
</div>`,
    note: "A <details> whose summary wears .ss-btn (the ▾ is drawn by the sheet). Native open, native keyboard, no script.",
  },

  palette: {
    html: `<div style="position:relative; height:240px; overflow:hidden">
  <div class="ss-scrim" aria-hidden="true"></div>
  <div class="ss-palette" role="dialog" aria-label="commands" style="position:relative; z-index:var(--z-modal)">
    <div class="ss-palette__bar"><input class="ss-palette__input" type="text" role="combobox" aria-expanded="true" aria-controls="sk-pl" aria-activedescendant="sk-pl-2" value="in" placeholder="search 63 switches…"></div>
    <div class="ss-palette__list" id="sk-pl" role="listbox">
      <div class="ss-palette__item" role="option" id="sk-pl-1">screen shake <span class="ss-palette__hint">feel</span></div>
      <div class="ss-palette__item" role="option" id="sk-pl-2" data-cursor="1" aria-selected="true">input lean <span class="ss-palette__hint">feel</span></div>
      <div class="ss-palette__item" role="option" id="sk-pl-3">bloom <span class="ss-palette__hint">render</span></div>
    </div>
    <div class="ss-palette__help"><span class="ss-key"><kbd>↑</kbd><kbd>↓</kbd> move</span><span class="ss-key"><kbd>↵</kbd> toggle</span><span class="ss-key"><kbd>esc</kbd> close</span></div>
  </div>
</div>`,
    note: "Markup and CSS only: a combobox over a listbox, the cursor as aria-activedescendant. The palette centres itself 32px from the top of its host; the scrim here is a sibling.",
  },

  tabs: {
    html: `<div class="ss-tabs" role="tablist">
  <button type="button" role="tab" aria-selected="true">All</button>
  <button type="button" role="tab">Payloads</button>
  <button type="button" role="tab">Modifiers</button>
  <button type="button" role="tab">Passives</button>
</div>`,
    note: "One-of-N along an edge, the chosen one lit from underneath by aria-selected. A .ss-code placed after it is the code-group variant.",
  },

  accordion: {
    html: `<div class="ss-stack" style="width:360px; max-width:100%">
  <details class="ss-disclosure" open>
    <summary>Advanced — all 63 switches</summary>
    <div class="ss-disclosure__body ss-dim">Every effect switch, searchable, with the preset's answer beside your override.</div>
  </details>
  <details class="ss-disclosure">
    <summary>Presets</summary>
    <div class="ss-disclosure__body ss-dim">closed</div>
  </details>
</div>`,
    note: "A <details> with a turning glyph in the charge colour.",
  },

  table: {
    html: `<div class="ss-row-flex" style="align-items:flex-start; gap:24px; flex-wrap:wrap">
  <table class="ss-table" style="width:auto">
    <caption>fangs</caption>
    <thead><tr><th>name</th><th>condition</th><th data-num>n</th></tr></thead>
    <tbody>
      <tr><td>first blood</td><td class="ss-dim">a kill on floor 1</td><td data-num>3</td></tr>
      <tr data-cursor="1"><td>restraint</td><td class="ss-dim">clear a floor without casting</td><td data-num>1</td></tr>
      <tr data-dim="1"><td>—</td><td class="ss-dim">not yet earned</td><td data-num>0</td></tr>
    </tbody>
  </table>
  <table class="ss-kv">
    <tbody>
      <tr><th scope="row">seed</th><td>48213</td></tr>
      <tr><th scope="row">floor</th><td>4 of 10</td></tr>
      <tr><th scope="row">body</th><td>◆ ▶ ◆ ○ ◆</td></tr>
    </tbody>
  </table>
</div>`,
    note: "A real <table>: caps column heads, rows on the edge, numbers right with data-num; data-cursor / data-dim on rows. .ss-kv is the two-column cousin.",
  },

  list: {
    html: `<div class="ss-list" role="listbox" style="width:320px; max-width:100%">
  <button class="ss-row" type="button" role="option"><span class="ss-row__glyph">◆</span> anvil <span class="ss-dim">payload</span></button>
  <button class="ss-row" type="button" role="option" aria-selected="true"><span class="ss-row__glyph">▶</span> fan <span class="ss-dim">modifier</span> <span class="ss-row__acts"><span class="ss-btn" data-variant="ghost">+</span></span></button>
  <button class="ss-row" type="button" role="option" data-cursor="1"><span class="ss-row__glyph">○</span> haste <span class="ss-dim">passive</span></button>
  <button class="ss-row" type="button" role="option" data-dim="1"><span class="ss-row__glyph">?</span> ██████ <span class="ss-dim">undiscovered</span></button>
</div>`,
    note: "Hover is the sheet's; selected is aria-selected (raised surface, lit edge); cursor is data-cursor=\"1\" (a charge bar on the leading edge); dim is data-dim=\"1\". __acts trail on the right. The gallery nests a <button> inside the row button; here the action is a span so the markup parses.",
  },

  code: {
    html: `<figure class="ss-code" style="margin:0; max-width:100%">
  <figcaption class="ss-code__cap">src/ds/index.js <span class="ss-code__acts"><button class="ss-btn" type="button">copy</button></span></figcaption>
  <pre><code><span class="sx-cm">// mount the sheet, once</span>
<span class="sx-kw">import</span> { <span class="sx-fn">injectDsStyle</span>, <span class="sx-type">DS_ROOT_CLASS</span> } <span class="sx-kw">from</span> <span class="sx-str">'./ds/index.js'</span><span class="sx-punct">;</span>
<span class="sx-fn">injectDsStyle</span>(document)<span class="sx-punct">;</span>
root.classList.<span class="sx-fn">add</span>(<span class="sx-type">DS_ROOT_CLASS</span>)<span class="sx-punct">;</span>  <span class="sx-cm">// &lt;<span class="sx-tag">div</span> <span class="sx-attr">class</span>="ss-root"&gt;</span>
<span class="sx-kw">const</span> ready <span class="sx-punct">=</span> <span class="sx-bool">true</span><span class="sx-punct">,</span> tokens <span class="sx-punct">=</span> <span class="sx-num">58</span><span class="sx-punct">;</span></code></pre>
</figure>`,
    note: "A <figure>: caption strip, copy button in __acts, and the ten .sx-* classes reading the ten --sx-* tokens.",
  },

  terminal: {
    html: `<div class="ss-term" style="max-width:100%">
  <div class="ss-term__bar"><i class="ss-term__light" aria-hidden="true"></i><i class="ss-term__light" aria-hidden="true"></i><i class="ss-term__light" aria-hidden="true"></i> zsh</div>
  <pre class="ss-term__body"><span class="ss-term__prompt">node tools/ds-css.js --check</span><span class="ss-term__out">src/ds/ds.css is fresh (45599 bytes)</span></pre>
</div>`,
    note: "Window chrome with three lights; the prompt glyph is drawn by the sheet on __prompt, output is __out in the second ink.",
  },

  empty: {
    html: `<div class="ss-empty" style="max-width:360px">
  <div class="ss-empty__glyph" aria-hidden="true">?</div>
  <div class="ss-empty__title">Nothing matches</div>
  <div>Try fewer letters, or clear the filter.</div>
  <button class="ss-btn" type="button" data-variant="ghost">Clear</button>
</div>`,
    note: "The dashed box where content is not — the compendium's undiscovered hatch.",
  },

  spinner: {
    html: `<div class="ss-row-flex" style="gap:14px">
  <span class="ss-row-flex"><span class="ss-spin" role="status" aria-label="proving"></span> proving over twelve seeds…</span>
  <button class="ss-btn" type="button" aria-disabled="true"><span class="ss-spin" aria-hidden="true"></span> saving</button>
</div>`,
    note: "A stepped braille glyph in the charge colour, at --dur × 6; stops under prefers-reduced-motion.",
  },

  meter: {
    html: `<div class="ss-stack" style="width:260px; max-width:100%">
  <div class="ss-meter" role="meter" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" aria-label="quota"><i style="--f:.65"></i></div>
  <div class="ss-meter" data-tone="warn" role="meter" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" aria-label="hold"><i style="--f:.3"></i></div>
  <div class="ss-meter" data-tone="bad" role="meter" aria-valuenow="12" aria-valuemin="0" aria-valuemax="100" aria-label="danger"><i style="--f:.12"></i></div>
  <div class="ss-meter" role="meter" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" aria-label="custom"><i style="--f:.5; --c:var(--burn)"></i></div>
  <div class="ss-pips" role="meter" aria-valuenow="5" aria-valuemin="0" aria-valuemax="8" aria-label="charge"><i data-on="1"></i><i data-on="1"></i><i data-on="1"></i><i data-on="1"></i><i data-on="1"></i><i></i><i></i><i></i></div>
</div>`,
    note: "The quota bar: --f (0..1) on the inner <i> is the fill, drawn with scaleX on a gradient over --well; data-tone or --c picks the colour. .ss-pips is the charge meter's pip row (data-on per pip).",
  },

  avatar: {
    html: `<div class="ss-row-flex">
  <span class="ss-avatar" style="--c:var(--charge)" title="John Henry">jh</span>
  <span class="ss-avatar" style="--c:var(--ok); --sz:32px" title="ok">ok</span>
  <span class="ss-avatar" style="--sz:40px" aria-label="anonymous">◆</span>
</div>`,
    note: "Initials in a bordered square on a wash of --c; --sz is the edge and an <img> inside covers the initials.",
  },

  key: {
    html: `<div class="ss-keys" style="margin:0">
  <span class="ss-key"><kbd>space</kbd> cast</span>
  <span class="ss-key"><kbd>shift</kbd> jump</span>
  <span class="ss-key"><kbd>tab</kbd> arrange</span>
  <span class="ss-key"><kbd>?</kbd> compendium</span>
</div>`,
    note: "A <kbd> on --raised with the heavier --edge-2 rim, beside its verb; .ss-keys is the pause screen's row of them.",
  },

  separator: {
    html: `<div class="ss-stack" style="width:320px; max-width:100%">
  <div class="ss-label">Segments</div>
  <div>above the rule</div>
  <hr class="ss-sep">
  <div>between the rules</div>
  <hr class="ss-sep" data-label="passives">
  <div>below the captioned rule</div>
</div>`,
    note: ".ss-sep is the --edge-hot rule that fades to nothing; data-label captions it. .ss-label alone is the 9px tracked section title.",
  },

  breadcrumb: {
    html: `<nav aria-label="breadcrumb">
  <ol class="ss-crumb">
    <li><a href="#">compendium</a></li>
    <li><a href="#">payloads</a></li>
    <li aria-current="page">anvil</li>
  </ol>
</nav>`,
    note: "Where you are, as an <ol>; the separators are drawn by the sheet.",
  },

  pager: {
    html: `<nav class="ss-pager" aria-label="floors" style="width:420px; max-width:100%">
  <a class="ss-btn ss-pager__prev" href="#">Floor 3</a>
  <span class="ss-pager__label">4 of 10</span>
  <a class="ss-btn ss-pager__next" href="#">Floor 5</a>
</nav>`,
    note: "Previous and next as .ss-btn links on a rule; the arrows are drawn by the sheet.",
  },

  swatch: {
    html: `<div class="ss-stack">
  <div class="ss-legend" style="margin:0">
    <span><i class="ss-swatch" style="--c:var(--ok)"></i> exit</span>
    <span><i class="ss-swatch" style="--c:var(--bad)"></i> enemy</span>
    <span><i class="ss-swatch" style="--c:var(--circuit)"></i> plate</span>
    <span><i class="ss-swatch" style="--c:var(--bone)"></i> fitted</span>
    <span><i class="ss-swatch" style="--sz:14px"></i> empty</span>
  </div>
  <div class="ss-row-flex">
    <i class="ss-swatch" style="--c:#3d7ea6; --sz:22px"></i>
    <i class="ss-swatch" style="--c:var(--burn); --sz:22px"></i>
    <i class="ss-swatch" style="--c:var(--charge); --sz:22px"></i>
  </div>
</div>`,
    note: "A box of a colour: --c is the colour (data, so it may be a literal or a token), --sz the edge. .ss-legend is the pause screen's row of swatches beside their words.",
  },

  ramp: {
    html: `<div class="ss-row-flex" style="gap:12px">
  <b class="ss-ramp" data-step="1">one</b><b class="ss-ramp" data-step="2">two</b><b class="ss-ramp" data-step="3">three</b>
  <b class="ss-ramp" data-step="4">four</b><b class="ss-ramp" data-step="5">five</b><b class="ss-ramp" data-step="6">six</b>
</div>`,
    note: "Six steps chosen by data-step, reading --cat-1…6 — the six signal hues in a fixed order.",
  },

  pattern: {
    html: `<div class="ss-grid" style="height:96px; border:1px solid var(--edge); border-radius:var(--r)"></div>`,
    note: "The board's cell texture: two --edge gradients on a 24px cell over --bg.",
  },

  shell: {
    html: `<div style="position:relative; height:320px; overflow:hidden">
  <div class="ss-shell" style="--rail:160px">
    <div class="ss-shell__top"><b>IMPRESSIVE SNAKE</b> <span class="ss-dim">editor</span> <span class="ss-grow"></span><button class="ss-btn" type="button" data-variant="primary">Prove</button></div>
    <div class="ss-shell__rail">
      <div class="ss-list"><button class="ss-row" type="button" aria-selected="true">floor 1</button><button class="ss-row" type="button">floor 2</button><button class="ss-row" type="button">floor 3</button></div>
      <div class="ss-shell__resize" role="separator" aria-orientation="vertical" aria-label="resize rail"></div>
    </div>
    <div class="ss-shell__main ss-grid"><div class="ss-empty" style="margin:16px"><div class="ss-empty__title">select a floor</div></div></div>
    <div class="ss-shell__status"><i class="ss-dot" data-state="live" aria-hidden="true"></i> proven <span class="ss-grow"></span> 48 × 30</div>
  </div>
</div>`,
    note: "A grid inset:0 in a positioned host: top / rail / main / status, with --rail as the rail width and __resize the handle that can write it.",
  },

  board: {
    html: `<div class="ss-board" style="height:200px">
  <div class="ss-board__col"><div class="ss-board__head">shipped <span class="ss-board__count">2</span></div><div class="ss-board__cards">
    <div class="ss-card"><div class="ss-card__body">echo</div></div><div class="ss-card"><div class="ss-card__body">palindrome</div></div></div></div>
  <div class="ss-board__col"><div class="ss-board__head">in flight <span class="ss-board__count">1</span></div><div class="ss-board__cards">
    <div class="ss-card" data-hot="1"><div class="ss-card__body">terrain decay</div></div></div></div>
  <div class="ss-board__col"><div class="ss-board__head">open <span class="ss-board__count">0</span></div><div class="ss-board__cards"><div class="ss-empty ss-dim" style="padding:12px">—</div></div></div>
</div>`,
    note: "Columns of cards on --inset, scrolling sideways; each column's __cards scrolls on its own.",
  },

  params: {
    html: `<ul class="ss-params" style="max-width:460px">
  <li class="ss-param"><div class="ss-param__head"><span class="ss-param__name">seed</span><span class="ss-param__type">number | string</span><span class="ss-param__req">required</span></div><div class="ss-param__desc">The run. A word is hashed; a number is used as it is.</div></li>
  <li class="ss-param"><div class="ss-param__head"><span class="ss-param__name">floor</span><span class="ss-param__type">number</span><span class="ss-param__default">1</span></div><div class="ss-param__desc">Where to start. Anything past 1 is a dive.</div></li>
</ul>`,
    note: "Name, type, default and requirement on one line; the description under it.",
  },

  utilities: {
    html: `<div class="ss-stack" style="gap:4px">
  <div>default ink — the sentence the screen is about</div>
  <div class="ss-dim">ss-dim — the second ink: labels, units, supporting lines</div>
  <div class="ss-dimmer">ss-dimmer — the third ink: nothing actionable</div>
  <div class="ss-ok">ss-ok — the goal</div>
  <div class="ss-charge">ss-charge — cast, chosen</div>
  <div class="ss-warn">ss-warn — a cost</div>
  <div class="ss-bad">ss-bad — a refusal</div>
  <div class="ss-caps">ss-caps — the tracked uppercase label</div>
  <div class="ss-num">ss-num — 01234 tabular figures</div>
  <div class="ss-row-flex"><span>ss-row-flex —</span><span class="ss-grow">ss-grow fills the gap</span><span>end</span></div>
  <div class="ss-stack"><span>ss-stack —</span><span>one per line</span></div>
  <div class="ss-nowrap" style="width:220px; overflow:hidden; text-overflow:ellipsis">ss-nowrap — a line that will not wrap, however long it gets</div>
  <div class="ss-panel" style="padding:6px 9px">ss-panel — the translucent panel face</div>
  <div>ss-sr-only — <span class="ss-sr-only">read by a screen reader, drawn by nothing</span><span class="ss-dim">(a hidden sentence sits here)</span></div>
</div>`,
    note: "One property each. The stack utility is .ss-stack, the row .ss-row-flex (.ss-row is the list row). .ss-panel and .ss-num are the HUD's originals.",
  },

  scroll: {
    html: `<div class="ss-scroll ss-panel" style="height:72px; padding:6px 9px; width:320px; max-width:100%">
  <div>01 · entered floor 1</div><div>02 · found anvil</div><div>03 · cast: anvil ▶ fan</div><div>04 · exit open</div><div>05 · dove to floor 2</div><div>06 · 2 charge short</div><div>07 · restraint earned</div>
</div>`,
    note: "The spine's thin scrollbar via scrollbar-width / scrollbar-color, on anything.",
  },

  scrim: {
    html: `<div style="position:relative; height:160px; overflow:hidden; border:1px solid var(--edge)">
  <div class="ss-panel" style="position:absolute; inset:8px; padding:9px">content under the layer: the scrim dims and blurs it, and the box sits beside the scrim, not inside it.</div>
  <div class="ss-scrim" aria-hidden="true"></div>
  <div class="ss-panel" style="position:absolute; top:40px; left:40px; padding:9px; z-index:var(--z-float)">in front of it</div>
</div>`,
    note: ".ss-scrim is the wash alone (--scrim, a radial gradient, plus a 2px blur) at inset:0 and --z-overlay, for a host that brings its own box; .ss-overlay is the scrim with a sheet in it.",
  },

  "theme-toggle": {
    html: `<div class="ss-row-flex">
  <button class="ss-btn ss-theme-toggle" type="button" aria-pressed="false"> high contrast</button>
  <button class="ss-btn ss-theme-toggle" type="button" aria-pressed="true"> high contrast</button>
  <span class="ss-dim">off, on — the host flips aria-pressed and writes its other theme's tokens onto the root</span>
</div>`,
    note: "The glyph (◐ off, ◑ on) is drawn by the sheet from aria-pressed.",
  },

  // ---- rows 44-53: the ten components added to the shared vocabulary ----

  slider: {
    html: `<label class="ss-field" style="--w:220px">
  <span class="ss-field__label">Volume</span>
  <input class="ss-slider" type="range" min="0" max="100" value="65" aria-label="volume">
</label>`,
    note: "A native input[type=range]: a --well track, a --charge thumb, a focus ring drawn as a box-shadow (an outline cannot follow a round thumb).",
  },

  segmented: {
    html: `<fieldset class="ss-segmented">
  <legend class="ss-sr-only">Body speed</legend>
  <label><input class="ss-sr-only" type="radio" name="speed" checked> Slow</label>
  <label><input class="ss-sr-only" type="radio" name="speed"> Normal</label>
  <label><input class="ss-sr-only" type="radio" name="speed"> Fast</label>
</fieldset>`,
    note: "Real radio inputs, hidden with the existing .ss-sr-only clip; the filled segment is :has(> input:checked), the primary button's own wash and a full inset ring — never a flat block or a rail.",
  },

  combobox: {
    html: `<div class="ss-field" style="--w:220px">
  <span class="ss-field__label">Payload</span>
  <div class="ss-combobox">
    <input type="text" role="combobox" aria-expanded="true" aria-controls="cb-payload" aria-autocomplete="list" value="An">
    <div class="ss-combobox__list" id="cb-payload" role="listbox">
      <div class="ss-palette__item" role="option" data-cursor="1" aria-selected="true">anvil</div>
      <div class="ss-palette__item" role="option">antler</div>
    </div>
  </div>
</div>`,
    note: "A field plus a popup; the rows are .ss-palette__item, the same row the command palette prints.",
  },

  skeleton: {
    html: `<div class="ss-stack" style="width:220px">
  <div class="ss-skeleton" data-shape="text"></div>
  <div class="ss-skeleton" data-shape="text"></div>
  <div class="ss-row-flex"><span class="ss-skeleton" data-shape="avatar"></span><span class="ss-skeleton" data-shape="text" style="width:100px"></span></div>
</div>`,
    note: "A flat --well tone with a single --edge-hot band swept across it — never a colour cycle, so it reads as loading rather than alive.",
  },

  stat: {
    html: `<div class="ss-row-flex" style="align-items:stretch">
  <div class="ss-stat" data-tone="good"><div class="ss-stat__v ss-num">128</div><div class="ss-stat__sub">kills this run</div><div class="ss-stat__trend" data-trend="up">+12 vs last</div></div>
  <div class="ss-stat" data-tone="bad"><div class="ss-stat__v ss-num">2</div><div class="ss-stat__sub">deaths</div><div class="ss-stat__trend" data-trend="down">-1 vs last</div></div>
</div>`,
    note: "The card-for-one-number from row 11, plus an up/down/flat line under it — colour and a glyph, never colour alone.",
  },

  rating: {
    html: `<span class="ss-rating" role="img" aria-label="3.5 out of 5 stars" style="--v:3.5"></span>`,
    note: "Two stacked five-star strings (--dimmer under, --charge on top, clipped by --v/5); the fraction is visual only, the number lives in aria-label.",
  },

  stepper: {
    html: `<ol class="ss-steps" style="width:320px; list-style:none; margin:0; padding:0">
  <li data-status="done">Choose seed</li>
  <li data-status="current">Pick a body</li>
  <li>Dive</li>
</ol>`,
    note: "A CSS counter numbers each step; only the step's own circle takes the colour, the connecting line stays --edge the whole way across.",
  },

  timeline: {
    html: `<ol class="ss-timeline" style="width:260px; list-style:none; margin:0; padding-left:18px">
  <li><time class="ss-timeline__time">floor 1</time><div>Run started, seed 48213.</div></li>
  <li data-status="current"><time class="ss-timeline__time">floor 4</time><div>Boss engaged.</div></li>
</ol>`,
    note: "A marker dot and a neutral connecting line, both in a fixed gutter beside the text, never on the text's own box.",
  },

  carousel: {
    html: `<div class="ss-stack" style="width:280px">
  <div class="ss-carousel">
    <div class="ss-carousel__track" role="group" aria-label="floor previews">
      <div class="ss-panel" style="padding:20px; text-align:center">floor 1</div>
      <div class="ss-panel" style="padding:20px; text-align:center">floor 2</div>
    </div>
    <div class="ss-carousel__nav"><button class="ss-btn ss-btn-icon" type="button" aria-label="previous">‹</button><button class="ss-btn ss-btn-icon" type="button" aria-label="next">›</button></div>
  </div>
  <div class="ss-carousel__dots" role="tablist" aria-label="floor preview">
    <button type="button" role="tab" aria-selected="true" aria-label="floor 1"></button>
    <button type="button" role="tab" aria-label="floor 2"></button>
  </div>
</div>`,
    note: "A scroll-snap track; prev/next float over it in the same grid cell (the track need not be positioned itself), and the selected dot fills.",
  },

  drawer: {
    html: `<div>
  <button class="ss-btn" type="button">Open filters…</button>
  <dialog class="ss-drawer" data-edge="end" aria-labelledby="dr-title">
    <div class="ss-sheet__title"><h2 id="dr-title" style="font-size:var(--fs)">Filters</h2></div>
    <div class="ss-sheet__rule"></div>
    <div class="ss-dim">Same open/close semantics as the centred dialog, anchored to the right edge instead.</div>
    <div class="ss-dialog__acts"><button class="ss-btn" data-variant="ghost" type="button">Close</button></div>
  </dialog>
</div>`,
    note: "A native <dialog> — .ss-dialog's own ::backdrop, Escape and showModal()/close() — with data-edge moving the margin that centres it and dropping the corner it now touches.",
  },
};
