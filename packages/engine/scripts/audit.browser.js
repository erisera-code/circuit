// Contrast / theme / coverage audit, run inside examples/index.html.
// Usage (from devtools or the browser tool):
//   const { audit } = await import('/scripts/audit.browser.js'); await audit();
// Returns { rows, summary } and stores it on window.__audit.

const INSTANCES = ["default","editorial","brutal","glass","terminal","zine","synthwave","blueprint","botanical","circuit","jjhub","noitroidvania","snake"];

// probe points: [label, selector, kind]  kind: text | large | ui (border/fill vs surroundings)
const PROBES = [
  ["body text", "#premise > p", "text"],
  ["muted byline", "main > article > header > p", "text"],
  ["h1", "[data-engine] > header h1", "large"],
  ["h2", "#premise > h2", "large"],
  ["card title", "#materials li > article h3", "text"],
  ["card text", "#materials li > article p", "text"],
  ["nav link", "[data-engine] > header nav a", "text"],
  ["prose link", "#composition li:nth-child(4) a, #empty a, p a", "text"],
  ["kicker small", "[data-engine] > header small", "text"],
  ["figcaption", "#materials figcaption", "text"],
  ["footer", "[data-engine] > footer small", "text"],
  ["blockquote", "#premise blockquote > p", "text"],
  ["cite", "#premise blockquote cite", "text"],
  ["callout text", "#premise [role=note] p", "text"],
  ["button", "#vocabulary > h3 + p > button:first-child", "text"],
  ["primary button", "#interaction form > p:last-child > button:last-child", "text"],
  ["ghost button", "#vocabulary button[data-variant=ghost]:not([data-icon])", "text"],
  ["danger button", "#vocabulary button[data-variant=danger]:not([data-icon])", "text"],
  ["link button", "#vocabulary button[data-variant=link]", "text"],
  ["input text", "#interaction input[type=email]", "text"],
  ["input placeholder", "#interaction input[type=email]", "placeholder"],
  ["label", "#interaction label", "text"],
  ["field hint", "#vocabulary label > small:not([role])", "text"],
  ["field error", "#vocabulary label > small[role=alert]", "text"],
  ["badge neutral", "#vocabulary data[value='1']", "text"],
  ["badge ok", "#vocabulary data[data-tone=ok]", "text"],
  ["badge warn", "#vocabulary data[data-tone=warn]", "text"],
  ["badge danger", "#vocabulary data[data-tone=danger]", "text"],
  ["chip", "#vocabulary [data-chip]:not([data-tone])", "text"],
  ["chip warn", "#vocabulary [data-chip][data-tone=warn]", "text"],
  ["swatch label", "#vocabulary [data-swatch]", "text"],
  ["ramp step 3", "#vocabulary [data-step='3']", "text"],
  ["avatar", "#vocabulary [data-avatar]:not([data-avatar=sm])", "text"],
  ["banner text", "#vocabulary [data-banner] p", "text"],
  ["toast text", "#vocabulary [data-toast][role=status] p", "text"],
  ["toast alert", "#vocabulary [data-toast][role=alert] p", "text"],
  ["empty state", "#vocabulary [data-empty]", "text"],
  ["palette input", "#vocabulary dialog[data-palette] input", "text"],
  ["palette option", "#vocabulary dialog[data-palette] li[role=option]:not([aria-selected])", "text"],
  ["palette selected", "#vocabulary dialog[data-palette] li[role=option][aria-selected=true]", "text"],
  ["palette footer", "#vocabulary dialog[data-palette] footer", "text"],
  ["tooltip", "#vocabulary [role=tooltip]", "text"],
  ["menu item", "#vocabulary [role=menuitem]", "text"],
  ["tab", "#vocabulary [role=tab]:not([aria-selected=true])", "text"],
  ["tab selected", "#vocabulary [role=tab][aria-selected=true]", "text"],
  ["breadcrumb", "#vocabulary nav[aria-label=breadcrumb] a", "text"],
  ["kbd", "#vocabulary > p > kbd", "text"],
  ["row", "#vocabulary > ul[role=listbox] > li[role=option]:not([aria-selected]):not([data-cursor])", "text"],
  ["row selected", "#vocabulary > ul[role=listbox] > li[role=option][aria-selected=true]", "text"],
  ["row small", "#vocabulary > ul[role=listbox] > li[role=option][aria-selected=true] small", "text"],
  ["code caption", "#vocabulary figure > figcaption", "text"],
  ["code body", "#vocabulary figure > pre > code", "text"],
  ["syntax kw", "#vocabulary [data-sx=kw]", "text"],
  ["syntax cm", "#vocabulary [data-sx=cm]", "text"],
  ["inline code", "#premise code", "text"],
  ["terminal kbd", "#vocabulary pre[data-terminal] > kbd", "text"],
  ["terminal samp", "#vocabulary pre[data-terminal] > samp", "text"],
  ["pager", "#vocabulary nav[aria-label=pagination] a[rel=next]", "text"],
  ["pager small", "#vocabulary nav[aria-label=pagination] a[rel=next] small", "text"],
  ["board head", "#vocabulary [data-board] > section > h3", "text"],
  ["board card", "#vocabulary [data-board] article p", "text"],
  ["shell header", "#vocabulary [data-shell] > header strong", "text"],
  ["shell rail current", "#vocabulary [data-shell] > nav a[aria-current]", "text"],
  ["shell rail", "#vocabulary [data-shell] > nav a:not([aria-current])", "text"],
  ["shell status", "#vocabulary [data-shell] > footer span:last-child", "text"],
  ["scroll area", "#vocabulary [data-scroll] p", "text"],
  ["scrim text", "#vocabulary [data-scrim] p", "text"],
  ["table th", "#sequence th", "text"],
  ["table td", "#sequence td", "text"],
  ["dt", "#grammar dt", "text"],
  ["dd", "#grammar dd", "text"],
  ["summary", "#interaction summary", "text"],
  ["legend", "#interaction legend", "text"],
  ["dialog text", "#info p", "text"],
  ["dialog title", "#info h3", "large"],
  ["popover", "#popover-info", "text"],
  ["nested terminal p", "#composition [data-instance=terminal] p", "text"],
  ["hue card link", "#composition [data-hue] a", "text"],
  // UI (non-text) contrast: element border vs its surroundings, 3:1
  ["input border", "#interaction input[type=email]", "border"],
  ["button border", "#vocabulary > h3 + p > button:first-child", "border"],
  ["chip border", "#vocabulary [data-chip]:not([data-tone])", "border"],
  ["card border", "#materials li > article", "divider"],
  ["hr", "#vocabulary hr", "divider"],
  ["listbox border", "#vocabulary > ul[role=listbox]", "divider"],
];

// components whose "signature" props are compared against the default instance
const SIGNATURES = {
  card: ["#materials li > article", ["backgroundColor","borderTopColor","borderTopWidth","borderRadius","boxShadow","padding"]],
  callout: ["#premise [role=note]", ["backgroundColor","borderTopColor","borderLeftWidth","borderRadius","padding"]],
  button: ["#vocabulary > h3 + p > button:first-child", ["backgroundColor","borderTopColor","borderRadius","textTransform","letterSpacing","fontFamily"]],
  primary: ["#interaction form > p:last-child > button:last-child", ["backgroundColor","backgroundImage","color","borderTopColor"]],
  input: ["#interaction input[type=email]", ["backgroundColor","borderTopColor","borderRadius"]],
  badge: ["#vocabulary data[data-tone=ok]", ["backgroundColor","borderTopColor","borderRadius","color"]],
  chip: ["#vocabulary [data-chip]:not([data-tone])", ["backgroundColor","borderTopColor","borderRadius"]],
  toast: ["#vocabulary [data-toast][role=status]", ["backgroundColor","borderLeftColor","borderRadius","boxShadow"]],
  banner: ["#vocabulary [data-banner]", ["borderTopColor","backgroundColor","borderTopWidth"]],
  dialog: ["#info", ["backgroundColor","borderTopColor","borderRadius","boxShadow"]],
  palette: ["#vocabulary dialog[data-palette]", ["backgroundColor","borderRadius","borderTopColor"]],
  paletteSel: ["#vocabulary dialog[data-palette] li[aria-selected=true]", ["backgroundColor","color"]],
  menu: ["#vocabulary [role=menu]", ["backgroundColor","borderTopColor","borderRadius","padding"]],
  tabs: ["#vocabulary [role=tab][aria-selected=true]", ["color","borderBottomColor","backgroundColor"]],
  table: ["#sequence thead th", ["borderBottomColor","backgroundColor","textTransform","letterSpacing"]],
  rows: ["#vocabulary > ul[role=listbox] > li[aria-selected=true]", ["backgroundColor","color"]],
  code: ["#vocabulary figure > pre", ["backgroundColor","borderRadius","color"]],
  terminal: ["#vocabulary pre[data-terminal]", ["backgroundColor","borderRadius","color"]],
  empty: ["#vocabulary [data-empty]", ["borderTopStyle","borderTopColor","color"]],
  meter: ["#interaction progress", ["blockSize","borderRadius","backgroundColor"]],
  avatar: ["#vocabulary [data-avatar]:not([data-avatar=sm])", ["borderRadius","backgroundColor","borderTopColor"]],
  kbd: ["#vocabulary > p > kbd", ["backgroundColor","borderTopColor","borderRadius","boxShadow"]],
  pager: ["#vocabulary nav[aria-label=pagination] a[rel=next]", ["borderTopColor","backgroundColor","borderRadius"]],
  board: ["#vocabulary [data-board] > section", ["backgroundColor","borderTopColor","borderRadius"]],
  shell: ["#vocabulary [data-shell] > header", ["backgroundColor","borderBottomColor"]],
  scroll: ["#vocabulary [data-scroll]", ["borderTopColor","backgroundColor"]],
  details: ["#interaction details", ["borderTopColor","borderTopWidth","backgroundColor"]],
  tooltip: ["#vocabulary [role=tooltip]", ["backgroundColor","color","borderRadius"]],
  spinner: ["#vocabulary [aria-busy]", ["color"]],
  headings: ["#premise > h2", ["fontFamily","textTransform","letterSpacing","fontWeight"]],
  masthead: ["[data-engine] > header", ["borderBottomColor","borderBottomWidth","backgroundColor","paddingBottom"]],
};

const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1;
const ctx = canvas.getContext("2d", { willReadFrequently: true });
function rgba(color) {
  if (!color || color === "transparent" || /^rgba\(0, 0, 0, 0\)$/.test(color)) return [0, 0, 0, 0];
  // alpha: only when the string has a 4th component (`/ a` or `rgba(r, g, b, a)`)
  let a = 1;
  const slash = /\/\s*([\d.]+)(%?)\s*\)$/.exec(color);
  const comma = /^rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)$/.exec(color);
  if (slash) a = parseFloat(slash[1]) / (slash[2] ? 100 : 1); else if (comma) a = parseFloat(comma[1]);
  // colour: let the canvas convert any syntax to sRGB, at full opacity
  const opaque = color.replace(/\/\s*[\d.]+%?\s*\)$/, ")").replace(/^rgba\((.*),\s*[\d.]+\)$/, "rgb($1)");
  ctx.fillStyle = "#000"; ctx.fillStyle = opaque; ctx.clearRect(0, 0, 1, 1); ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2], isNaN(a) ? 1 : Math.max(0, Math.min(1, a))];
}
/** first colour stop of a gradient image, as an estimate of what it paints */
function gradientColor(img) {
  const m = /(oklch|oklab|rgb|rgba|hsl|hsla|color)\([^()]*(?:\([^()]*\)[^()]*)*\)|#[0-9a-f]{3,8}/i.exec(img);
  return m ? rgba(m[0]) : null;
}
const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
const blend = (top, under) => { const a = top[3]; return [0,1,2].map(i => Math.round(top[i] * a + under[i] * (1 - a))).concat([1]); };

// effective background at an element: composite every ancestor's background colour (and flat gradients count as unknown)
function effectiveBg(el) {
  const layers = [];
  for (let n = el; n; n = n.parentElement) {
    const cs = getComputedStyle(n);
    const c = rgba(cs.backgroundColor);
    if (c[3] > 0) layers.push({ c });
    if (cs.backgroundImage !== "none" && /gradient/.test(cs.backgroundImage)) {
      const g = gradientColor(cs.backgroundImage);
      layers.push({ img: true });
      // a repeating hairline texture barely tints; a real gradient paints — use its first stop when the element has no solid colour
      if (g && g[3] > 0 && c[3] === 0 && !/repeating-|1px, transparent|transparent 1px/.test(cs.backgroundImage)) layers.push({ c: g });
    }
    if (c[3] >= 1) break;
  }
  const html = rgba(getComputedStyle(document.documentElement).backgroundColor);
  let bg = html[3] > 0 ? html : [255, 255, 255, 1];
  for (const l of layers.reverse()) if (l.c) bg = blend(l.c, bg);
  return { bg, hasImage: layers.some(l => l.img) };
}
function textColor(el, kind) {
  const cs = kind === "placeholder" ? getComputedStyle(el, "::placeholder") : getComputedStyle(el);
  return rgba(cs.color);
}
const need = (kind) => kind === "large" ? 3 : kind === "border" ? 3 : kind === "divider" ? 1.25 : 4.5;

// timers, not requestAnimationFrame: a background tab never gets a frame
async function settle() { await new Promise(r => setTimeout(r, 120)); document.body.offsetHeight; }

// panel inset: an element with a visible edge (border or fill) must not let its
// content touch that edge — first/last table cells stand in for the table.
const PANELS = [
  "#premise", "main > article", "#premise [role=note]", "#interaction fieldset", "#sequence table", "#materials figure", "#interaction details",
  "#premise blockquote", "#grammar pre", "#grammar dl", "#vocabulary > ul[role=listbox]", "[data-engine] > header nav", "#vocabulary [data-banner]",
  "#vocabulary [data-toast]", "#info", "#vocabulary [data-scroll]", "#interaction form", "#vocabulary [data-board] > section", "#vocabulary figure:has(> pre)",
  "#vocabulary [data-empty]", "#vocabulary dialog[data-palette]", "#vocabulary [role=menu]", "#vocabulary [data-shell] > main", "#vocabulary [data-shell] > nav",
  "#materials li > article", "#vocabulary [data-board] article", "#popover-info", "#vocabulary [role=tooltip]", "#vocabulary pre[data-terminal]",
];
const MIN_INSET = 8;
/** which sides of the element carry a visible edge: border on that side, or a fill/ring (all sides) */
function edgesOf(el) {
  const cs = getComputedStyle(el);
  const sides = ["Top", "Right", "Bottom", "Left"];
  const edge = {};
  for (const sd of sides) edge[sd] = parseFloat(cs[`border${sd}Width`]) > 0 && cs[`border${sd}Style`] !== "none" && rgba(cs[`border${sd}Color`])[3] > 0;
  const bg = rgba(cs.backgroundColor); const parentBg = el.parentElement ? effectiveBg(el.parentElement).bg : null;
  const fill = bg[3] > 0.05 && parentBg && (Math.abs(bg[0] - parentBg[0]) + Math.abs(bg[1] - parentBg[1]) + Math.abs(bg[2] - parentBg[2]) > 12 || bg[3] < 1);
  const ring = /inset 0 0 0 [1-9]/.test(cs.boxShadow) || (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0);
  if (fill || ring) for (const sd of sides) edge[sd] = true;
  // a scroll container clips its far edges; only the leading edges are measurable
  if (/auto|scroll/.test(cs.overflowY)) edge.Bottom = false;
  if (/auto|scroll/.test(cs.overflowX)) edge.Right = false;
  return edge;
}
/** distance from each edged side of the panel to the nearest visible text inside it */
function insetOf(el, edge) {
  const box = el.getBoundingClientRect();
  // visible text only: not the hidden content of a closed <details>, not a
  // <legend> (which sits on the fieldset's rule by design), not closed dialogs/popovers
  // overlays and demo stages inside the panel are positioned out of its flow: not its content
  const overlay = (n) => { const o = n.parentElement?.closest("[data-toasts], [data-scrim], [data-stage], dialog, [popover], [role=tooltip]"); return o && o !== el && !o.contains(el) && el.contains(o); };
  const hidden = (n) => { if (overlay(n)) return true; const d = n.parentElement?.closest("details"); if (d && !d.open && !n.parentElement.closest("summary")) return true; if (n.parentElement?.closest("legend, caption")) return true; /* both sit outside the framed area by design */ const dl = n.parentElement?.closest("dialog, [popover]"); if (dl && dl !== el && !dl.contains(el) && !(dl.open || dl.matches(":popover-open"))) return true; return false; };
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: (n) => n.textContent.trim() && !hidden(n) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP });
  // per-side minimum over every line box of every text node (DOM order is not screen order)
  let n, any = false; const d = { Top: Infinity, Bottom: Infinity, Left: Infinity, Right: Infinity };
  while ((n = walker.nextNode())) {
    const r = document.createRange(); r.selectNodeContents(n);
    // text inside a scrollable descendant is clipped on its far sides: only its leading edges count
    let scrollX = false, scrollY = false;
    for (let a = n.parentElement; a && a !== el; a = a.parentElement) { const o = getComputedStyle(a); if (/auto|scroll/.test(o.overflowX)) scrollX = true; if (/auto|scroll/.test(o.overflowY)) scrollY = true; }
    for (const rect of r.getClientRects()) {
      if (!rect.width || !rect.height) continue; any = true;
      d.Top = Math.min(d.Top, rect.top - box.top); if (!scrollY) d.Bottom = Math.min(d.Bottom, box.bottom - rect.bottom);
      d.Left = Math.min(d.Left, rect.left - box.left); if (!scrollX) d.Right = Math.min(d.Right, box.right - rect.right);
    }
  }
  if (!any) return { v: Infinity, side: "" };
  let best = { v: Infinity, side: "" };
  for (const [k, v] of Object.entries(d)) if (edge[k] && v < best.v) best = { v, side: k };
  return best;
}
function insetIssues() {
  const out = [];
  for (const sel of PANELS) {
    const el = document.querySelector(sel); if (!el) continue;
    const edge = edgesOf(el); if (!Object.values(edge).some(Boolean)) continue;
    const { v: i, side } = insetOf(el, edge);
    const min = Math.max(6, 0.5 * parseFloat(getComputedStyle(el).fontSize)); // 8px at 16px type, 6px at 12px
    if (i + 0.5 < min) out.push(`${sel} inset ${Math.round(i)}px < ${Math.round(min)}px (${side.toLowerCase()})`);
  }
  return out;
}

export async function audit(opts = {}) {
  const scope = document.querySelector("[data-engine]");
  const instances = opts.instances || INSTANCES;
  // freeze transitions: a theme flip mid-transition would be sampled half-way
  const prevMotion = scope.getAttribute("data-motion"); scope.setAttribute("data-motion", "reduced");
  const rows = [], coverage = {}, themes = {};
  const defaults = {};
  for (const inst of instances) {
    for (const theme of ["dark", "light"]) {
      scope.setAttribute("data-instance", inst); scope.setAttribute("data-theme", theme);
      await settle();
      const pageBg = effectiveBg(document.querySelector("#premise > p")).bg;
      themes[`${inst}/${theme}`] = { pageBg, pageLum: +lum(pageBg).toFixed(3) };
      for (const [label, sel, kind] of PROBES) {
        const el = document.querySelector(sel);
        if (!el) { rows.push({ inst, theme, label, ok: false, note: "probe missing" }); continue; }
        let fg, bg, hasImage;
        if (kind === "border" || kind === "divider") {
          const cs = getComputedStyle(el);
          const w = parseFloat(cs.borderTopWidth); const col = rgba(cs.borderTopColor);
          if (!(w > 0) || col[3] === 0) { rows.push({ inst, theme, label, kind, ok: false, ratio: 0, note: "no visible border" }); continue; }
          ({ bg, hasImage } = effectiveBg(el.parentElement)); fg = col[3] < 1 ? blend(col, bg) : col;
        } else {
          const c = textColor(el, kind); ({ bg, hasImage } = effectiveBg(el)); fg = c[3] < 1 ? blend(c, bg) : c;
        }
        const r = +ratio(fg, bg).toFixed(2); const min = need(kind);
        rows.push({ inst, theme, label, kind, ratio: r, min, ok: r >= min, fg, bg, ...(hasImage ? { note: "bg has image; ratio approximate" } : {}) });
      }
      const inset = insetIssues();
      if (inset.length) (rows.insets ??= {})[`${inst}/${theme}`] = inset;
      // coverage: which signature components differ from default (same theme)
      const sig = {};
      for (const [name, [sel, props]] of Object.entries(SIGNATURES)) {
        const el = document.querySelector(sel); if (!el) { sig[name] = null; continue; }
        const cs = getComputedStyle(el); sig[name] = props.map(p => cs[p]).join("|");
      }
      if (inst === "default") defaults[theme] = sig;
      else coverage[`${inst}/${theme}`] = Object.fromEntries(Object.entries(sig).map(([k, v]) => [k, v === null ? null : v !== defaults[theme]?.[k]]));
    }
  }
  scope.setAttribute("data-instance", "default"); scope.removeAttribute("data-theme");
  if (prevMotion === null) scope.removeAttribute("data-motion"); else scope.setAttribute("data-motion", prevMotion);
  // theme health: light and dark must differ meaningfully in page luminance; light must be light
  const themeIssues = [];
  for (const inst of instances) {
    const d = themes[`${inst}/dark`], l = themes[`${inst}/light`];
    if (Math.abs(d.pageLum - l.pageLum) < 0.15) themeIssues.push(`${inst}: dark and light nearly identical (lum ${d.pageLum} vs ${l.pageLum})`);
    if (l.pageLum < 0.4) themeIssues.push(`${inst}: light theme is not light (lum ${l.pageLum})`);
    if (d.pageLum > 0.4) themeIssues.push(`${inst}: dark theme is not dark (lum ${d.pageLum})`);
  }
  const fails = rows.filter(r => !r.ok);
  const byInst = {};
  for (const r of fails) (byInst[`${r.inst}/${r.theme}`] ??= []).push(`${r.label}${r.ratio !== undefined ? ` ${r.ratio}:1` : ""}${r.note ? ` (${r.note})` : ""}`);
  const uncovered = {};
  for (const [k, v] of Object.entries(coverage)) { const list = Object.entries(v).filter(([, x]) => x === false).map(([n]) => n); if (list.length) uncovered[k] = list; }
  const summary = { probes: PROBES.length, instances: instances.length, checks: rows.length, failing: fails.length, themeIssues, failsByInstance: byInst, uncoveredByInstance: uncovered, insetIssues: rows.insets ?? {} };
  window.__audit = { rows, coverage, themes, summary, at: new Date().toISOString() };
  if (opts.post !== false) { try { await fetch("/__audit", { method: "POST", body: JSON.stringify(window.__audit) }); } catch {} }
  return summary;
}

// =============================================================================
// DEEP PASS: every visible text node, every pseudo-element glyph, every design,
// both schemes — plus an ink inventory per design for consistency review.
//   const { deep } = await import('/scripts/audit.browser.js'); await deep();
// =============================================================================

/** estimate what a vertical linear-gradient paints at a given y fraction (0..1) */
function gradientAt(img, frac) {
  const m = /linear-gradient\(\s*(to bottom|180deg)?,?\s*(.*)\)$/s.exec(img);
  if (!m) return null;
  // split on top-level commas
  const parts = []; let depth = 0, cur = "";
  for (const ch of m[2]) { if (ch === "(") depth++; if (ch === ")") depth--; if (ch === "," && depth === 0) { parts.push(cur.trim()); cur = ""; } else cur += ch; }
  parts.push(cur.trim());
  const stops = parts.map((p, i) => { const pm = /^(.*?)(?:\s+([\d.]+)%)?$/s.exec(p); const c = rgba(pm[1].trim()); const pos = pm[2] !== undefined ? +pm[2] / 100 : (i === 0 ? 0 : i === parts.length - 1 ? 1 : null); return { c, pos }; });
  // fill missing positions evenly
  for (let i = 0; i < stops.length; i++) if (stops[i].pos === null) { let j = i; while (stops[j].pos === null) j++; const a = stops[i - 1].pos, b = stops[j].pos; for (let k = i; k < j; k++) stops[k].pos = a + (b - a) * (k - i + 1) / (j - i + 1); }
  if (stops.some((s) => !s.c)) return null;
  let a = stops[0], b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) if (frac >= stops[i].pos && frac <= stops[i + 1].pos) { a = stops[i]; b = stops[i + 1]; break; }
  const t = b.pos === a.pos ? 0 : (frac - a.pos) / (b.pos - a.pos);
  return [0, 1, 2, 3].map((i) => a.c[i] + (b.c[i] - a.c[i]) * t);
}

/** composited background behind a rect, walking ancestors; gradients sampled at the rect's position */
function bgBehind(el, rect) {
  const layers = [];
  for (let n = el; n; n = n.parentElement) {
    const cs = getComputedStyle(n);
    const c = rgba(cs.backgroundColor);
    if (c[3] > 0) layers.push({ c });
    if (cs.backgroundImage !== "none" && /gradient/.test(cs.backgroundImage)) {
      const first = cs.backgroundImage.split(/,(?![^(]*\))/).pop().trim(); // bottom-most layer paints the base
      let g = null;
      if (/linear-gradient/.test(first) && !/repeating/.test(first)) {
        const box = cs.backgroundAttachment.includes("fixed") ? { top: 0, height: innerHeight } : n.getBoundingClientRect();
        g = gradientAt(first, Math.min(1, Math.max(0, (rect.top + rect.height / 2 - box.top) / box.height)));
      } else if (!/repeating-|1px, transparent|transparent 1px|1px,transparent/.test(first)) g = gradientColor(first);
      if (g && g[3] > 0) layers.push({ c: g, approx: true });
    }
    if (c[3] >= 1) break;
  }
  const html = rgba(getComputedStyle(document.documentElement).backgroundColor);
  let bg = html[3] > 0 ? html : [255, 255, 255, 1];
  let approx = false;
  for (const l of layers.reverse()) { bg = blend(l.c, bg); if (l.approx) approx = true; }
  return { bg, approx };
}

function locator(el) {
  const parts = [];
  for (let n = el, i = 0; n && i < 4 && !n.hasAttribute?.("data-engine"); n = n.parentElement, i++) {
    let p = n.tagName.toLowerCase();
    if (n.id) p += "#" + n.id;
    for (const a of ["role", "data-tone", "data-variant", "data-toast", "data-banner", "data-chip", "data-empty", "data-palette", "data-terminal", "data-shell", "data-board", "data-swatch", "data-step", "data-avatar", "data-cursor", "aria-selected", "aria-current", "data-instance", "data-sx", "data-scrim", "data-scroll", "data-icon", "popover"]) if (n.hasAttribute(a)) p += `[${a}${n.getAttribute(a) ? `=${n.getAttribute(a)}` : ""}]`;
    parts.unshift(p);
  }
  return parts.join(" > ");
}

const isLarge = (cs) => { const px = parseFloat(cs.fontSize); const bold = parseInt(cs.fontWeight) >= 700; return px >= 24 || (bold && px >= 18.66); };

export async function deep(opts = {}) {
  const scope = document.querySelector("[data-engine]");
  const instances = opts.instances || INSTANCES;
  const prevMotion = scope.getAttribute("data-motion"); scope.setAttribute("data-motion", "reduced");
  const failures = {}, inks = {}, counts = {};
  for (const inst of instances) for (const theme of ["dark", "light"]) {
    scope.setAttribute("data-instance", inst); scope.setAttribute("data-theme", theme);
    await settle();
    const key = `${inst}/${theme}`; failures[key] = []; const inkMap = new Map(); let checked = 0;
    const seen = new Set();
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        if (n.nodeType === 1) {
          const cs = getComputedStyle(n);
          if (cs.display === "none" || cs.visibility === "hidden" || n.closest("[aria-hidden=true]")) return NodeFilter.FILTER_REJECT;
          if (n.matches("details:not([open]) > :not(summary)")) return NodeFilter.FILTER_REJECT;
          if (n.matches("dialog:not([open]), [popover]:not(:popover-open)")) return NodeFilter.FILTER_REJECT;
          if (n.matches(":disabled, [aria-disabled=true]")) return NodeFilter.FILTER_REJECT; // WCAG exempts inactive controls
          return NodeFilter.FILTER_ACCEPT;
        }
        return n.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
    let n;
    while ((n = walker.nextNode())) {
      if (n.nodeType === 1) {
        // pseudo-element glyphs with real text
        for (const pe of ["::before", "::after"]) {
          const ps = getComputedStyle(n, pe);
          const content = ps.content;
          if (!content || content === "none" || content === "normal" || content === '""' || /^"\s*"$/.test(content) || /attr\(|counter/.test(content) && false) continue;
          if (ps.display === "none" || parseFloat(ps.opacity) === 0) continue;
          if (/text/.test(ps.backgroundClip) || /text/.test(ps.webkitBackgroundClip)) continue; // painted by its background, not its colour
          const text = content.replace(/^"|"$/g, "");
          if (!text.trim()) continue;
          const rect = n.getBoundingClientRect(); if (!rect.width) continue;
          let { bg, approx } = bgBehind(n, rect);
          const own = rgba(ps.backgroundColor); if (own[3] > 0) bg = blend(own, bg);
          const c = rgba(ps.color); const fg = c[3] < 1 ? blend(c, bg) : c;
          const r = +ratio(fg, bg).toFixed(2); const min = 3; // glyphs are non-text UI: 3:1
          checked++;
          if (r < min) failures[key].push({ loc: locator(n) + pe, text: text.slice(0, 12), ratio: r, min, fg: fg.slice(0, 3), bg: bg.slice(0, 3), approx, kind: "glyph" });
        }
        continue;
      }
      const el = n.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
      const r0 = document.createRange(); r0.selectNodeContents(n); const rect = r0.getBoundingClientRect(); if (!rect.width) continue;
      const cs = getComputedStyle(el);
      const { bg, approx } = bgBehind(el, rect);
      const c = rgba(cs.color); const fg = c[3] < 1 ? blend(c, bg) : c;
      const r = +ratio(fg, bg).toFixed(2); const min = isLarge(cs) ? 3 : 4.5;
      checked++;
      const ink = cs.color; const im = inkMap.get(ink) || { color: ink, count: 0, sample: locator(el) }; im.count++; inkMap.set(ink, im);
      if (r < min) failures[key].push({ loc: locator(el), text: n.textContent.trim().slice(0, 24), ratio: r, min, fg: fg.slice(0, 3), bg: bg.slice(0, 3), approx, kind: "text" });
    }
    counts[key] = checked;
    inks[key] = [...inkMap.values()].sort((a, b) => b.count - a.count);
  }
  scope.setAttribute("data-instance", "default"); scope.removeAttribute("data-theme");
  if (prevMotion === null) scope.removeAttribute("data-motion"); else scope.setAttribute("data-motion", prevMotion);
  const total = Object.values(failures).reduce((a, v) => a + v.length, 0);
  const result = { checked: counts, failing: total, failures, inks, at: new Date().toISOString() };
  window.__deep = result;
  if (opts.post !== false) { try { await fetch("/__audit", { method: "POST", body: JSON.stringify({ deep: result }) }); } catch {} }
  return { checked: Object.values(counts).reduce((a, b) => a + b, 0), failing: total, byInstance: Object.fromEntries(Object.entries(failures).map(([k, v]) => [k, v.length])) };
}
