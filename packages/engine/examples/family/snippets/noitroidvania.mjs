// noitroidvania — "Ashfall UI" (src/ds/, .ui-root scoped).
// One snippet per shared component id (see ../components.mjs). The markup is
// lifted from src/ds/examples/gallery.ts, which reads each demo's source back
// off the live element, so these are the strings the browser parsed there.
//
// Conventions of this system worth knowing before reading the snippets:
//   - variants are data attributes (.btn[data-variant], .badge[data-tone],
//     .row[data-cursor], .ui-rar[data-rarity]) — the markup carries the value;
//   - overlays position against the nearest containing block: .scrim, .panel,
//     .notices, .shell all assume a `.ui-layer` (position:absolute; inset:0),
//     so every overlay below sits in a relative, fixed-height stage;
//   - the toast is spelled .notices/.notice and the status bar .shell__statusbar
//     (docs/33 §3: "toast" and "status" are game nouns the seam reserves);
//   - .btn, .btn-icon, .ui-linkbtn, .ui-check/.ui-radio/.ui-switch are written
//     `.ui-root .x` in the sheet, because they must outrank `.ui-root button`.

export default {
  root: { class: "ui-root", attrs: "" },

  button: {
    html: `<div class="ui-row">
  <button class="btn" type="button">default</button>
  <button class="btn" type="button" data-variant="primary">primary</button>
  <button class="btn" type="button" data-variant="ghost">ghost</button>
  <button class="btn" type="button" data-variant="danger">danger</button>
  <button class="btn" type="button" disabled>disabled</button>
</div>`,
    note: "Variants are data-variant, not sub-classes. Primary is an accent edge on the top surface step, never a filled wash.",
  },

  "icon-button": {
    html: `<div class="ui-row">
  <button class="btn btn-icon" type="button" aria-label="close">✕</button>
  <button class="btn btn-icon" type="button" aria-label="settings" data-variant="ghost">⚙</button>
  <button class="btn btn-icon" type="button">✕<span class="ui-sr-only">close the panel</span></button>
</div>`,
    note: "Square .btn.btn-icon; the label is aria-label or a .ui-sr-only span.",
  },

  "link-button": {
    html: `<div>a sentence with <button class="ui-linkbtn" type="button">an action inside it</button> that is still a button.</div>`,
  },

  "button-group": {
    html: `<div class="btngroup" role="group" aria-label="view">
  <button class="btn" type="button" data-on="1">list</button>
  <button class="btn" type="button">grid</button>
  <button class="btn" type="button">map</button>
</div>`,
    note: "data-on=\"1\" marks the chosen segment. No separate split-button primitive; a group of two is the split.",
  },

  input: {
    html: `<div class="ui-row" style="align-items: flex-start">
  <input type="text" value="ember blade">
  <input type="search" placeholder="search…">
  <select><option>all</option><option>owned</option><option>favourite</option></select>
  <textarea rows="2">a two-handed thing</textarea>
</div>`,
    note: "Bare elements are styled at .ui-root input / select / textarea — no class needed.",
  },

  "form-field": {
    html: `<div class="ui-row" style="align-items: flex-start; gap: 16px">
  <label class="field" style="--w: 200px">
    <span class="field__label">name</span>
    <input type="text" value="ember blade">
    <span class="field__hint">what the row will be called</span>
  </label>
  <label class="field" data-invalid="1" style="--w: 200px">
    <span class="field__label">weight</span>
    <input type="text" value="heavy" aria-invalid="true" aria-describedby="w-err">
    <span class="field__error" id="w-err">must be a number</span>
  </label>
  <label class="field" style="--w: 140px">
    <span class="field__label">kind</span>
    <select><option>blade</option><option>lance</option></select>
  </label>
</div>`,
    note: "The wrapper owns width (--w) and state (data-invalid); the control is the bare element.",
  },

  choice: {
    html: `<div class="col" style="gap: 4px">
  <label class="ui-row"><input class="ui-check" type="checkbox" checked> favourite</label>
  <label class="ui-row"><input class="ui-check" type="checkbox"> hidden</label>
  <div class="ui-row" role="radiogroup" aria-label="hand">
    <label class="ui-row"><input class="ui-radio" type="radio" name="nv-hand" checked> main</label>
    <label class="ui-row"><input class="ui-radio" type="radio" name="nv-hand"> off</label>
  </div>
  <label class="ui-row"><input class="ui-switch" type="checkbox" role="switch" checked> sound</label>
  <label class="ui-row"><input class="ui-switch" type="checkbox" role="switch"> music</label>
</div>`,
    note: "Native inputs with appearance:none, drawn as [ ]/[x], ( )/(o) and a two-cell switch.",
  },

  badge: {
    html: `<div class="ui-row">
  <span class="badge">draft</span>
  <span class="badge" data-tone="good">passing</span>
  <span class="badge" data-tone="bad">failing</span>
  <span class="badge" data-tone="warn">stale</span>
  <span class="badge" data-tone="accent">chosen</span>
</div>`,
    note: "Border is currentColor; each tone brings its own glyph so colour is never the only signal.",
  },

  "status-dot": {
    html: `<div class="ui-row" style="gap: 14px">
  <span class="ui-row"><i class="ui-dot" aria-hidden="true"></i> off</span>
  <span class="ui-row"><i class="ui-dot" data-state="live" aria-hidden="true"></i> live</span>
  <span class="ui-row"><i class="ui-dot" data-state="idle" aria-hidden="true"></i> idle</span>
  <span class="ui-row"><i class="ui-dot" data-state="error" aria-hidden="true"></i> error</span>
</div>`,
    note: "A one-glyph state light: ○ ● ◐ ⊗.",
  },

  chip: {
    html: `<div class="ui-row">
  <span class="chip">kinetic</span>
  <span class="chip">thermal</span>
  <span class="chip">two-handed</span>
  <span class="chip">3 sockets</span>
</div>`,
  },

  card: {
    html: `<div class="ui-row" style="align-items: stretch">
  <div class="card" style="width: 220px">
    <div class="card__head">ember blade <span class="ui-grow"></span><span class="badge" data-tone="good">owned</span></div>
    <div class="card__body">A one-handed blade that leaves a trail. 14 heat per swing.</div>
    <div class="card__foot">rare · 3 sockets</div>
  </div>
  <div class="card" data-hot="1" tabindex="0" role="button" style="width: 220px">
    <div class="card__head">arc lance</div>
    <div class="card__body">data-hot="1": hover for the raised edge and the next surface step.</div>
    <div class="card__foot">epic · press to equip</div>
  </div>
</div>`,
  },

  callout: {
    html: `<div class="col" style="gap: 8px; width: 460px; max-width: 100%">
  <div class="callout" data-tone="note"><div class="callout__title">note</div><div class="callout__body">The default tone: a leading rule in the second ink and an i in the gutter.</div></div>
  <div class="callout" data-tone="tip"><div class="callout__title">tip</div><div class="callout__body">Hold the key to see the range before you commit.</div></div>
  <div class="callout" data-tone="warn"><div class="callout__title">warning</div><div class="callout__body">This will spend the reagent whether or not it works.</div></div>
  <div class="callout" data-tone="danger"><div class="callout__title">danger</div><div class="callout__body">Cannot be undone.</div></div>
</div>`,
    note: "A 2px leading border in the tone colour and a glyph in the gutter. No fill, no shadow.",
  },

  banner: {
    html: `<div class="col" style="gap: 8px">
  <div class="banner" role="status">
    <span class="ui-grow">A new version is available.</span>
    <div class="banner__acts"><button class="btn" type="button" data-variant="primary">reload</button><button class="btn btn-icon" type="button" aria-label="dismiss">✕</button></div>
  </div>
  <div class="banner" data-tone="warn" role="alert">
    <span class="ui-grow">Unsaved changes will be lost when you leave.</span>
    <div class="banner__acts"><button class="btn" type="button">save</button><button class="btn btn-icon" type="button" aria-label="dismiss">✕</button></div>
  </div>
</div>`,
  },

  toast: {
    html: `<div class="ui-layer" style="position: relative; height: 170px">
  <div class="notices" data-at="tr" aria-live="polite">
    <div class="notice"><div class="notice__body">Saved.</div><div class="notice__acts"><button class="btn btn-icon" type="button" aria-label="dismiss">✕</button></div></div>
    <div class="notice" data-tone="good"><div class="notice__body">Equipped ember blade.</div></div>
    <div class="notice" data-tone="bad"><div class="notice__body">Could not reach the server.</div><div class="notice__acts"><button class="btn" type="button">retry</button></div></div>
  </div>
</div>`,
    note: "Spelled .notices/.notice — \"toast\" is a game noun the seam reserves (docs/33 §3). The tray corner is data-at (tl/tr/bl/br); leaving is the one fade.",
  },

  dialog: {
    html: `<div class="ui-layer" style="position: relative; height: 260px">
  <div class="scrim"></div>
  <div class="panel panel--dialog" role="dialog" aria-labelledby="nv-dlg-t" aria-modal="true">
    <div class="panel__head"><div class="panel__title" id="nv-dlg-t">discard</div></div>
    <div class="panel__body" style="padding: 12px">Discard the ember blade? The sockets come with it.</div>
    <div class="panel__acts"><button class="btn" type="button" data-variant="ghost">keep</button><button class="btn" type="button" data-variant="danger">discard</button></div>
  </div>
</div>`,
    note: "The scrim is a sibling of the panel, never its parent. Plain .panel is inset:20px; .panel--dialog shrinks to content and centres with inset:0 + margin:auto, and works on a native <dialog>.",
  },

  popover: {
    html: `<div style="position: relative; height: 130px">
  <button class="btn" type="button" aria-expanded="true" aria-controls="nv-pop-1">details</button>
  <div class="popover" id="nv-pop-1" style="top: 28px; left: 0">
    <div class="popover__head">ember blade</div>
    <div class="ui-dim">14 heat · 3 sockets · rare</div>
  </div>
</div>`,
    note: "The second surface step with the raised edge; positioned by the host.",
  },

  tooltip: {
    html: `<div style="position: relative; height: 60px">
  <button class="btn btn-icon" type="button" aria-describedby="nv-tip-1">?</button>
  <div class="tooltip" role="tooltip" id="nv-tip-1" style="top: 26px; left: 0">help — shown and hidden with the hidden attribute</div>
</div>`,
  },

  menu: {
    html: `<div style="position: relative; height: 130px">
  <details class="menu" open>
    <summary class="btn">actions</summary>
    <div class="menu__items" role="menu">
      <button class="menu__item" type="button" role="menuitem">equip</button>
      <button class="menu__item" type="button" role="menuitem">compare</button>
      <hr class="menu__sep">
      <button class="menu__item" type="button" role="menuitem" disabled>discard</button>
    </div>
  </details>
</div>`,
    note: "A <details> whose summary wears .btn; native open/close and keyboard.",
  },

  palette: {
    html: `<div class="ui-layer" style="position: relative; height: 240px">
  <div class="scrim"></div>
  <div class="palette" role="dialog" aria-label="commands">
    <div class="palette__bar"><input class="palette__input" type="text" role="combobox" aria-expanded="true" aria-controls="nv-pal-list" aria-activedescendant="nv-pal-2" value="eq" placeholder="type a command…"></div>
    <div class="palette__list scroll" role="listbox" id="nv-pal-list">
      <div class="palette__item" role="option" id="nv-pal-1">equip: ember blade <span class="palette__hint">E</span></div>
      <div class="palette__item" role="option" id="nv-pal-2" data-cursor="1" aria-selected="true">equip: arc lance <span class="palette__hint">E</span></div>
      <div class="palette__item" role="option" id="nv-pal-3">unequip all</div>
    </div>
    <div class="palette__help"><span><kbd class="ui-key">↑</kbd> <kbd class="ui-key">↓</kbd> move</span><span><kbd class="ui-key">↵</kbd> run</span><span><kbd class="ui-key">Esc</kbd> close</span></div>
  </div>
</div>`,
    note: "Markup and CSS only: a combobox over a listbox, the cursor as aria-activedescendant.",
  },

  tabs: {
    html: `<div class="tabs">
  <button type="button" data-on="1">materials</button>
  <button type="button">reactions</button>
  <button type="button">bestiary</button>
</div>`,
    note: "One-of-N along an edge; the chosen tab is data-on=\"1\".",
  },

  accordion: {
    html: `<div class="col" style="width: 360px; max-width: 100%">
  <details class="disclosure" open>
    <summary>materials</summary>
    <div class="disclosure__body ui-dim">▾ open: the glyph turned and the body is indented under the title.</div>
  </details>
  <details class="disclosure">
    <summary>reactions</summary>
    <div class="disclosure__body ui-dim">closed</div>
  </details>
</div>`,
  },

  table: {
    html: `<div class="ui-row" style="align-items: flex-start; gap: 24px">
  <table class="table" style="width: 380px">
    <caption>inventory</caption>
    <thead><tr><th>name</th><th>rarity</th><th data-num>heat</th></tr></thead>
    <tbody>
      <tr><td>ember blade</td><td><span class="ui-rar" data-rarity="rare">rare</span></td><td data-num>14</td></tr>
      <tr data-cursor="1"><td>arc lance</td><td><span class="ui-rar" data-rarity="epic">epic</span></td><td data-num>22</td></tr>
      <tr data-dim="1"><td>oath breaker</td><td><span class="ui-rar" data-rarity="relic">relic</span></td><td data-num>40</td></tr>
    </tbody>
  </table>
  <table class="kv">
    <tbody>
      <tr><th scope="row">seed</th><td>ash-4471</td></tr>
      <tr><th scope="row">depth</th><td>12</td></tr>
      <tr><th scope="row">standing</th><td><span class="badge" data-tone="good">allied</span></td></tr>
    </tbody>
  </table>
</div>`,
    note: "Real tables. .table takes data-cursor / data-dim on rows and data-num on cells; .kv is the key/value cousin.",
  },

  list: {
    html: `<div class="col" style="border: 1px solid var(--ui-line); background: var(--ui-panel); width: 420px; max-width: 100%">
  <div class="col__head">inventory</div>
  <div class="scroll" style="max-height: 150px">
    <div class="row" data-cursor="1"><i class="row__glyph">†</i><div class="ui-grow ui-nowrap">ember blade</div><span class="ui-rar" data-rarity="rare">rare</span><div class="row__acts"><button type="button">equip</button></div></div>
    <div class="row"><i class="row__glyph">⌁</i><div class="ui-grow ui-nowrap">arc lance</div><span class="ui-rar" data-rarity="epic">epic</span><div class="row__acts"><button type="button">equip</button></div></div>
    <div class="row"><i class="row__glyph">◎</i><div class="ui-grow ui-nowrap">slag thrower</div><span class="ui-rar" data-rarity="common">common</span><div class="row__acts"><button type="button">equip</button></div></div>
    <div class="row" data-dim="1"><i class="row__glyph">✶</i><div class="ui-grow ui-nowrap">oath breaker</div><span class="ui-rar" data-rarity="relic">relic</span><div class="row__acts"><button type="button">equip</button></div></div>
    <div class="row"><i class="row__glyph">⊘</i><div class="ui-grow ui-nowrap">null rod</div><span class="ui-rar" data-rarity="uncommon">uncommon</span><div class="row__acts"><button type="button">equip</button></div></div>
  </div>
</div>`,
    note: "Hover is the sheet's; cursor is data-cursor=\"1\" (surface step + --ui-mark); dim is data-dim=\"1\". .row__acts appears on hover.",
  },

  code: {
    html: `<figure class="code" style="width: 460px; max-width: 100%">
  <figcaption class="code__cap">src/ds/index.ts <div class="code__acts"><button class="btn btn-icon" type="button" aria-label="copy">⧉</button></div></figcaption>
  <pre><code><span class="sx-cm">// mount the sheet, once</span>
<span class="sx-kw">export function</span> <span class="sx-fn">injectDsStyle</span><span class="sx-punct">(</span>doc<span class="sx-punct">:</span> <span class="sx-type">Document</span><span class="sx-punct">,</span> id <span class="sx-punct">=</span> <span class="sx-str">'ds-style'</span><span class="sx-punct">):</span> <span class="sx-type">void</span> <span class="sx-punct">{</span>
  <span class="sx-kw">if</span> <span class="sx-punct">(</span>doc<span class="sx-punct">.</span><span class="sx-fn">getElementById</span><span class="sx-punct">(</span>id<span class="sx-punct">))</span> <span class="sx-kw">return</span><span class="sx-punct">;</span>
  <span class="sx-kw">const</span> s <span class="sx-punct">=</span> doc<span class="sx-punct">.</span><span class="sx-fn">createElement</span><span class="sx-punct">(</span><span class="sx-str">'style'</span><span class="sx-punct">);</span>
  s<span class="sx-punct">.</span><span class="sx-attr">hidden</span> <span class="sx-punct">=</span> <span class="sx-bool">false</span><span class="sx-punct">;</span> <span class="sx-cm">// &lt;<span class="sx-tag">style</span>&gt; ×<span class="sx-num">1</span></span>
<span class="sx-punct">}</span></code></pre>
</figure>`,
    note: "Ten .sx-* classes read the ten --ui-sx-* tokens, the only tokens a single component owns.",
  },

  terminal: {
    html: `<div class="term" style="width: 460px; max-width: 100%">
  <div class="term__bar"><i class="term__light" aria-hidden="true"></i><i class="term__light" aria-hidden="true"></i><i class="term__light" aria-hidden="true"></i><span>zsh — 80×24</span></div>
  <pre class="term__body"><span class="term__prompt">ls src/ds</span><span class="term__out">base.ts  ds.css  examples  index.ts  primitives.ts  tokenDocs.ts  tokens.ts</span><span class="term__prompt"></span></pre>
</div>`,
    note: "The prompt glyph is drawn by the sheet on .term__prompt; output is .term__out in the second ink.",
  },

  empty: {
    html: `<div class="empty" style="width: 360px; max-width: 100%">
  <div class="empty__glyph" aria-hidden="true">∅</div>
  <div class="empty__title">nothing here yet</div>
  <div>Craft a reaction and it will appear in this list.</div>
  <button class="btn" type="button">craft</button>
</div>`,
  },

  spinner: {
    html: `<div class="ui-row" style="gap: 14px">
  <span class="ui-row"><i class="ui-spin" role="status" aria-label="loading"></i> loading</span>
  <button class="btn" type="button" aria-disabled="true"><i class="ui-spin" aria-hidden="true"></i> saving</button>
</div>`,
    note: "The one thing that moves: eight braille frames stepped at --ui-dur × 6. Reduced motion prints an ellipsis.",
  },

  meter: {
    html: `<div class="col" style="gap: 6px; width: 260px; max-width: 100%">
  <div class="bar" style="--f: .72"><i></i></div>
  <div class="bar" style="--f: .4; --c: var(--ui-good)"><i></i></div>
  <div class="bar" style="--f: .15; --c: var(--ui-bad)"><i></i></div>
</div>`,
    note: "A 0..1 fill written as --f, drawn with a transform rather than a width; --c is the fill colour.",
  },

  avatar: {
    html: `<div class="ui-row">
  <span class="avatar" title="John Henry">jh</span>
  <span class="avatar" style="--sz: 32px" title="Ash Fall">af</span>
  <span class="avatar" aria-label="anonymous">?</span>
</div>`,
    note: "Initials in a bordered square; --sz is the edge and an <img> inside covers the initials.",
  },

  key: {
    html: `<div class="ui-row">
  <kbd class="ui-key">W</kbd><kbd class="ui-key">A</kbd><kbd class="ui-key">S</kbd><kbd class="ui-key">D</kbd>
  <kbd class="ui-key">Shift</kbd><kbd class="ui-key">Space</kbd>
</div>`,
    note: "A bare <kbd> in a .panel__foot gets this for free.",
  },

  separator: {
    html: `<div class="col" style="width: 360px; max-width: 100%">
  <div class="col__head">section title</div>
  <div>above the rule</div>
  <hr class="ui-sep">
  <div>between the rules</div>
  <hr class="ui-sep" data-label="advanced">
  <div>below the captioned rule</div>
</div>`,
    note: ".col__head is the caps section title; .ui-sep is an <hr>, and data-label makes it a captioned rule.",
  },

  breadcrumb: {
    html: `<nav aria-label="breadcrumb">
  <ol class="crumb">
    <li><a href="#">codex</a></li>
    <li><a href="#">materials</a></li>
    <li aria-current="page">ash glass</li>
  </ol>
</nav>`,
  },

  pager: {
    html: `<nav class="pager" aria-label="pages" style="width: 420px; max-width: 100%">
  <a class="btn pager__prev" href="#">materials</a>
  <span class="pager__label">3 / 12</span>
  <a class="btn pager__next" href="#">reactions</a>
</nav>`,
    note: "Two .btn links at either end of a rule; the arrows are drawn by the sheet.",
  },

  swatch: {
    html: `<div class="col" style="gap: 4px">
  <div class="ui-row"><i class="ui-swatch" style="--c: #3d7ea6"></i><span class="ui-dim">a colour that came with the data</span></div>
  <div class="ui-row"><i class="ui-swatch" style="--c: var(--ui-r-uncommon)"></i><span class="ui-dim">or a step of the ramp</span></div>
  <div class="ui-row"><i class="ui-swatch" style="--c: var(--ui-accent)"></i><span class="ui-dim">or a token, when it is a decision</span></div>
  <div class="ui-row">
    <i class="ui-swatch" style="--c: var(--ui-r-cursed); --sz: 22px"></i>
    <i class="ui-swatch" style="--c: var(--ui-warn); --sz: 22px"></i>
    <i class="ui-swatch" style="--c: var(--ui-accent-2); --sz: 22px"></i>
  </div>
</div>`,
    note: "The colour arrives as --c because it is data; --sz is the edge.",
  },

  ramp: {
    html: `<div class="ui-row">
  <span class="ui-rar" data-rarity="common">common</span>
  <span class="ui-rar" data-rarity="uncommon">uncommon</span>
  <span class="ui-rar" data-rarity="rare">rare</span>
  <span class="ui-rar" data-rarity="epic">epic</span>
  <span class="ui-rar" data-rarity="relic">relic</span>
  <span class="ui-rar" data-rarity="cursed">cursed</span>
</div>`,
    note: "Six steps chosen by data-rarity, reading the --ui-r-* tokens.",
  },

  pattern: {
    html: `<div class="ui-grid" style="height: 96px; border: 1px solid var(--ui-line)"></div>`,
    note: "Two gradients at the soft line colour on a cell the interface scale (--ui-u) sets.",
  },

  shell: {
    html: `<div class="ui-layer" style="position: relative; height: 320px">
  <div class="shell" style="--rail: 160px">
    <div class="shell__top"><span class="panel__title">ashfall</span><span class="ui-grow"></span><span class="avatar">jh</span></div>
    <div class="shell__rail">
      <div class="col__head">codex</div>
      <div class="row" data-cursor="1"><i class="row__glyph">◆</i>materials</div>
      <div class="row"><i class="row__glyph">⌁</i>reactions</div>
      <div class="row"><i class="row__glyph">✶</i>bestiary</div>
      <div class="shell__resize" role="separator" aria-orientation="vertical" aria-label="resize rail"></div>
    </div>
    <div class="shell__main ui-grid"><div class="empty" style="margin: 16px"><div class="empty__title">select an entry</div></div></div>
    <div class="shell__statusbar"><span class="ui-row"><i class="ui-dot" data-state="live" aria-hidden="true"></i> connected</span><span>seed ash-4471</span><span class="ui-grow"></span><span>12 entries</span></div>
  </div>
</div>`,
    note: "A grid inside .ui-layer: top / rail / main / statusbar with --rail as the rail width. Spelled __statusbar because \"status\" is a game noun (docs/33 §3).",
  },

  board: {
    html: `<div class="ui-layer" style="position: relative; height: 230px">
  <div class="board" style="height: 100%">
    <div class="board__col">
      <div class="board__head">to craft <span class="board__count">2</span></div>
      <div class="board__cards scroll">
        <div class="card" data-hot="1" tabindex="0"><div class="card__body">ash glass</div><div class="card__foot"><span class="badge" data-tone="warn">needs heat</span></div></div>
        <div class="card" data-hot="1" tabindex="0"><div class="card__body">slag ingot</div></div>
      </div>
    </div>
    <div class="board__col">
      <div class="board__head">crafting <span class="board__count">1</span></div>
      <div class="board__cards scroll">
        <div class="card" data-hot="1" tabindex="0"><div class="card__body"><span class="ui-row"><i class="ui-spin" aria-hidden="true"></i> ember blade</span></div></div>
      </div>
    </div>
    <div class="board__col">
      <div class="board__head">done <span class="board__count">1</span></div>
      <div class="board__cards scroll">
        <div class="card" data-hot="1" tabindex="0"><div class="card__body">arc lance</div><div class="card__foot"><span class="badge" data-tone="good">equipped</span></div></div>
      </div>
    </div>
  </div>
</div>`,
    note: "The board scrolls sideways; each column's list is a .scroll.",
  },

  params: {
    html: `<ul class="params" style="width: 460px; max-width: 100%">
  <li class="param">
    <div class="param__head"><code class="param__name">doc</code><span class="param__type">Document</span><span class="param__default">document</span></div>
    <div class="param__desc">The document to mount the sheet into.</div>
  </li>
  <li class="param">
    <div class="param__head"><code class="param__name">id</code><span class="param__type">string</span><span class="param__default">'ds-style'</span></div>
    <div class="param__desc">The style element's id; a second call with the same id is a no-op.</div>
  </li>
  <li class="param">
    <div class="param__head"><code class="param__name">root</code><span class="param__type">HTMLElement</span><span class="param__req">required</span></div>
    <div class="param__desc">The element that receives the ui-root class.</div>
  </li>
</ul>`,
  },

  utilities: {
    html: `<div class="col" style="gap: 4px">
  <div>default ink — the sentence the screen is about</div>
  <div class="ui-dim">ui-dim — labels, units, supporting lines</div>
  <div class="ui-mute">ui-mute — keys, counts, the fine print</div>
  <div class="ui-good">ui-good — an outcome in your favour</div>
  <div class="ui-bad">ui-bad — an outcome against you, or a refusal</div>
  <div class="ui-warn">ui-warn — a cost or a caveat</div>
  <div class="ui-caps">ui-caps — the heading treatment</div>
  <div class="ui-row"><span>ui-row —</span><span class="ui-grow">ui-grow fills the gap</span><span>end</span></div>
  <div class="col"><span>col —</span><span>a stack, one per line</span></div>
  <div class="ui-nowrap" style="width: 220px; overflow: hidden; text-overflow: ellipsis">ui-nowrap — a line that will not wrap, however long it gets</div>
  <div>sr-only — <span class="ui-sr-only">read by a screen reader, drawn by nothing</span><span class="ui-dim">(a hidden sentence sits here)</span></div>
</div>`,
    note: "One property each; the stack utility is .col (no .ui-stack). .ui-sr-only is the one helper with more than one property.",
  },

  scroll: {
    html: `<div class="col" style="border: 1px solid var(--ui-line); background: var(--ui-panel); width: 320px; max-width: 100%">
  <div class="col__head">log</div>
  <div class="scroll" style="max-height: 96px">
    <div class="row">01 · entered the ash flats</div>
    <div class="row">02 · found slag ingot</div>
    <div class="row">03 · crafted ash glass</div>
    <div class="row">04 · equipped ember blade</div>
    <div class="row">05 · reaction: thermal + kinetic</div>
    <div class="row">06 · depth 12</div>
  </div>
</div>`,
    note: "Thin themed scrollbar via scrollbar-width / scrollbar-color, with a webkit fallback.",
  },

  scrim: {
    html: `<div class="ui-layer" style="position: relative; height: 160px; border: 1px solid var(--ui-line)">
  <div style="padding: 12px">content under the layer: the scrim dims it, and the panel sits beside the scrim, not inside it.</div>
  <div class="scrim"></div>
  <div class="panel" style="inset: 40px 80px">
    <div class="panel__head"><div class="panel__title">panel</div></div>
    <div class="panel__body" style="padding: 12px">a plain .panel is inset:20px against .ui-layer</div>
  </div>
</div>`,
    note: ".ui-layer is the containing block (absolute, inset:0); .scrim covers it with --ui-scrim. Pointer-events on the layer are opt-in via .ui-clickable.",
  },

  "theme-toggle": {
    html: `<div class="ui-row">
  <button class="btn btn-icon ui-theme-toggle" type="button" aria-pressed="false" aria-label="high contrast"></button>
  <button class="btn btn-icon ui-theme-toggle" type="button" aria-pressed="true" aria-label="high contrast"></button>
  <span class="ui-dim">off, on — the host flips aria-pressed and writes the theme's tokens</span>
</div>`,
    note: "The glyph (◐ off, ◑ on) is drawn by the sheet from aria-pressed. Pairs with the host's high-contrast mode.",
  },

  // ---- rows 44-53: the vocabulary's second extension (docs/33 §1 of this system)

  slider: {
    html: `<div class="col" style="gap: 8px; width: 220px">
  <label class="field__label">volume — <output>65</output></label>
  <input class="ui-slider" type="range" min="0" max="100" value="65">
</div>`,
    note: "appearance:none turns the input's own box into the groove; the two vendor thumb pseudo-elements are styled to match.",
  },

  segmented: {
    html: `<div class="segmented" role="radiogroup" aria-label="view">
  <label class="segmented__opt"><input class="ui-sr-only" type="radio" name="nv-seg" checked>day</label>
  <label class="segmented__opt"><input class="ui-sr-only" type="radio" name="nv-seg">week</label>
  <label class="segmented__opt"><input class="ui-sr-only" type="radio" name="nv-seg">month</label>
</div>`,
    note: "Real radio inputs, not clickable divs. The input wears .ui-sr-only; :has(:checked) fills the label the way .tabs fills the chosen button.",
  },

  combobox: {
    html: `<div class="ui-layer" style="position: relative; height: 130px">
  <div class="combobox" style="width: 200px">
    <input type="text" role="combobox" aria-expanded="true" aria-controls="nv-cb-list" aria-autocomplete="list" value="ember" style="width: 100%">
    <div class="combobox__list" role="listbox" id="nv-cb-list">
      <div class="combobox__item" role="option" data-cursor="1">ember blade</div>
      <div class="combobox__item" role="option">ember shard</div>
    </div>
  </div>
</div>`,
    note: "The popover treatment over a listbox; the option under the cursor takes data-cursor, exactly as .palette and .row do.",
  },

  skeleton: {
    html: `<div class="ui-row" style="align-items: center; gap: 10px">
  <i class="ui-skeleton" data-shape="avatar"></i>
  <div class="col" style="gap: 4px">
    <div class="ui-skeleton" data-shape="text" style="width: 140px"></div>
    <div class="ui-skeleton" data-shape="text" style="width: 90px"></div>
  </div>
</div>`,
    note: "The second bounded exception to \"nothing moves\" (docs/28 §1): a highlight sweeping once across a flat well, never a colour cycling through hues.",
  },

  stat: {
    html: `<div class="ui-row" style="gap: 24px">
  <div class="stat"><div class="stat__value">1,204</div><div class="stat__label">active users</div><div class="stat__trend" data-dir="up">▲ 4.2%</div></div>
  <div class="stat"><div class="stat__value">12</div><div class="stat__label">open bugs</div><div class="stat__trend" data-dir="down">▼ 3</div></div>
</div>`,
    note: "The trend carries its direction as a glyph and a colour together, never colour alone.",
  },

  rating: {
    html: `<span class="ui-rating" role="img" aria-label="4.2 out of 5 stars" style="--v: .84"></span>`,
    note: "Two stacked glyph layers, the accent one clipped to --v. The number lives in aria-label, never in colour alone.",
  },

  stepper: {
    html: `<ol class="stepper" style="width: 360px">
  <li class="stepper__step" data-status="done"><span class="stepper__num">✓</span><span class="stepper__label">account</span></li>
  <li class="stepper__step" data-status="current"><span class="stepper__num">2</span><span class="stepper__label">shipping</span></li>
  <li class="stepper__step"><span class="stepper__num">3</span><span class="stepper__label">payment</span></li>
</ol>`,
    note: "The connecting line is --ui-line and never carries the state; the current step takes --ui-mark's full ring, not a one-sided rail.",
  },

  timeline: {
    html: `<ol class="timeline" style="width: 260px">
  <li class="timeline__item"><i class="timeline__dot" aria-hidden="true"></i><div class="timeline__date">sep 1</div><div class="timeline__body">repo created.</div></li>
  <li class="timeline__item" data-status="current"><i class="timeline__dot" aria-hidden="true"></i><div class="timeline__date">sep 9</div><div class="timeline__body">today.</div></li>
</ol>`,
    note: "The connecting line lives in a fixed gutter, drawn once on the list so it runs continuously behind every dot.",
  },

  carousel: {
    html: `<div class="carousel" style="width: 220px">
  <div class="carousel__slides">
    <figure class="carousel__slide"><div class="ui-row" style="height: 90px; justify-content: center; background: var(--ui-panel-2); border: 1px solid var(--ui-line)">one</div></figure>
    <figure class="carousel__slide"><div class="ui-row" style="height: 90px; justify-content: center; background: var(--ui-panel-2); border: 1px solid var(--ui-line)">two</div></figure>
  </div>
  <button class="btn btn-icon carousel__prev" type="button" aria-label="previous slide">‹</button>
  <button class="btn btn-icon carousel__next" type="button" aria-label="next slide">›</button>
  <div class="carousel__dots" role="tablist" aria-label="slide">
    <button type="button" role="tab" data-on="1" aria-label="slide 1"></button>
    <button type="button" role="tab" aria-label="slide 2"></button>
  </div>
</div>`,
    note: "Native scroll-snap does the sliding; the sheet draws the frame, the arrows and the dots (data-on=\"1\" — the same attribute .tabs uses).",
  },

  drawer: {
    html: `<div class="ui-layer" style="position: relative; height: 180px">
  <div class="scrim"></div>
  <div class="panel panel--drawer" data-edge="end" role="dialog" aria-labelledby="nv-drw-t" aria-modal="true">
    <div class="panel__head"><div class="panel__title" id="nv-drw-t">filters</div></div>
    <div class="panel__body" style="padding: 12px">data-edge picks start / end / top / bottom.</div>
    <div class="panel__acts"><button class="btn" type="button">close</button></div>
  </div>
</div>`,
    note: "The same scrim, .panel__* parts and open/close semantics as .panel--dialog — only the geometry differs.",
  },
};
