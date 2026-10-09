// @erisera-code/circuit-engine/mount — the skin mount.
//
// An app whose markup speaks the shared classless grammar (elements, ARIA
// roles and labels, a few data-* knobs — see docs/element-binding-map.md)
// can be dressed by the engine with one <link> and three attributes on the
// document root. A GREENFIELD app needs nothing from this file: link
// engine.css, set data-engine / data-instance / data-theme on <html>, done.
//
// This module is for an EXISTING app that already carries its own
// stylesheets. `mountSkin` mounts the engine over such an app without a
// rebuild: every native stylesheet is silenced (media="not all", never
// removed — screens that install their own sheet by id find it and leave it
// alone), the GEOMETRY of each native sheet is derived into a live chassis
// sheet (placing and sizing declarations plus the custom properties they
// spend, shared compositions left to the engine) so the app keeps its
// arrangement under any look, and the root carries the instance. Mounting
// `null` undoes all of it. Without a mount nothing happens, so the native
// cascade is untouched.
//
//   import { mountSkin, skinFromParam } from "@erisera-code/circuit-engine/mount";
//   mountSkin(skinFromParam(new URLSearchParams(location.search).get("skin"), "/vendor/engine.css"));
//
// Native sheets are found as <style> elements (not marked data-chassis) and
// <link rel=stylesheet> elements (other than the mount's own); a link's text
// is fetched to derive its chassis, which is why `applyTo` is asynchronous.

/**
 * @typedef {object} EngineSkin
 * @property {string} href     where engine.css is served from (`/vendor/engine.css` when vendored)
 * @property {string} instance the instance preset: all five facets of one design
 * @property {string} [palette]  facet override — `data-palette`
 * @property {string} [type]     facet override — `data-type`
 * @property {string} [shape]    facet override — `data-shape`
 * @property {string} [layout]   facet override — `data-layout`
 * @property {string} [fx]       facet override — `data-fx` (one design's composition under another's paint)
 * @property {"dark" | "light" | "auto"} [theme]
 */

export const SKIN_LINK_ID = "circuit-engine-skin";
const FACETS = /** @type {const} */ (["instance", "palette", "type", "shape", "layout", "fx", "theme"]);

/** @type {EngineSkin | null} */
let mounted = null;
/** @type {MutationObserver | null} */
let watcher = null;

/** The foreign skin in force, if any. */
export function foreignSkin() {
  return mounted;
}

/**
 * Placing and sizing properties — the half of a rule that is an app's own
 * arrangement rather than its look. Everything else (colour, type, edges,
 * shadows, radii, transitions) is the skin's.
 */
export const GEOMETRY_PROPS =
  /^(?:display|position|inset(?:-[a-z-]+)?|top|right|bottom|left|z-index|order|flex(?:-[a-z-]+)?|grid(?:-[a-z-]+)?|gap|row-gap|column-gap|align-[a-z]+|justify-[a-z]+|place-[a-z]+|width|height|min-width|min-height|max-width|max-height|inline-size|block-size|min-inline-size|min-block-size|max-inline-size|max-block-size|padding(?:-[a-z-]+)?|margin(?:-[a-z-]+)?|overflow(?:-[xy])?|box-sizing|white-space|text-overflow|overflow-wrap|word-break|translate|transform|visibility|pointer-events|list-style(?:-[a-z]+)?|appearance|-webkit-appearance|text-align|vertical-align|aspect-ratio|object-fit|image-rendering|scrollbar-width)$/;

/** Compositions the engine lays out itself; their native geometry is not kept. */
export const SHARED_COMPOSITION =
  /article\[role="dialog"\]|\[role="listbox"\]|section\[data-track\]|section\[data-axis\]|section\[role="note"\]|\[data-kind="(?:swatch|thumb)"\]|ul\[data-rows\]|dialog\[data-palette\]/;

/**
 * The geometric half of a sheet: every rule restated with only its placing
 * and sizing declarations (and the custom properties they spend), shared
 * compositions left out, empty rules dropped. Comments are stripped; @media
 * blocks are kept around what survives; other at-rules are the skin's.
 * @param {string} css
 * @returns {string}
 */
export function geometryOf(css) {
  const src = css.replace(/\/\*[\s\S]*?\*\//g, "");
  /** @type {string[]} */
  const out = [];
  const walk = (/** @type {string} */ text, /** @type {string} */ indent) => {
    let i = 0;
    while (i < text.length) {
      const open = text.indexOf("{", i);
      if (open < 0) break;
      const head = text.slice(i, open).trim();
      let depth = 0;
      let j = open;
      for (; j < text.length; j++) {
        if (text[j] === "{") depth++;
        else if (text[j] === "}" && --depth === 0) break;
      }
      const body = text.slice(open + 1, j);
      i = j + 1;
      if (!head) continue;
      if (head.startsWith("@media")) {
        const before = out.length;
        walk(body, indent + "  ");
        const inner = out.splice(before);
        if (inner.length) out.push(`${indent}${head} {`, ...inner, `${indent}}`);
        continue;
      }
      if (head.startsWith("@")) continue;
      if (SHARED_COMPOSITION.test(head)) continue;
      const kept = body
        .split(";")
        .map((d) => d.trim())
        .filter((d) => d && (d.startsWith("--") || GEOMETRY_PROPS.test(d.slice(0, d.indexOf(":")).trim())));
      if (kept.length) out.push(`${indent}${head.replace(/\s+/g, " ")} { ${kept.join("; ")}; }`);
    }
  };
  walk(src, "");
  return out.join("\n");
}

/** @param {Node} n @returns {n is HTMLStyleElement | HTMLLinkElement} */
function isNative(n) {
  if (n instanceof HTMLStyleElement) return !n.hasAttribute("data-chassis");
  if (n instanceof HTMLLinkElement) return n.rel === "stylesheet" && n.id !== SKIN_LINK_ID;
  return false;
}

/** @param {HTMLStyleElement | HTMLLinkElement} sheet @returns {Promise<string>} */
async function textOf(sheet) {
  if (sheet instanceof HTMLStyleElement) return sheet.textContent || "";
  try {
    return await (await fetch(sheet.href)).text();
  } catch {
    return "";
  }
}

/** @param {HTMLStyleElement | HTMLLinkElement} sheet @param {Document} doc */
async function applyTo(sheet, doc) {
  const key = sheet.id || sheet.getAttribute("data-vite-dev-id") || String(Array.from(doc.querySelectorAll("style, link")).indexOf(sheet));
  const chassisId = "chassis-" + key;
  const existing = doc.getElementById(chassisId);
  if (!mounted) {
    sheet.media = "";
    if (existing) existing.remove();
    return;
  }
  sheet.media = "not all";
  if (!existing) {
    const text = await textOf(sheet);
    if (!mounted || doc.getElementById(chassisId)) return;
    const chassis = doc.createElement("style");
    chassis.id = chassisId;
    chassis.setAttribute("data-chassis", "");
    chassis.textContent = geometryOf(text);
    sheet.parentNode?.insertBefore(chassis, sheet);
  }
}

/** @param {Document} doc */
function sweep(doc) {
  for (const n of doc.querySelectorAll("style, link[rel=stylesheet]")) if (isNative(n)) void applyTo(n, doc);
}

/**
 * Mount a skin over the app's native sheets, or `null` to return to the native look.
 * @param {EngineSkin | null} skin
 * @param {Document} [doc]
 */
export function mountSkin(skin, doc = document) {
  mounted = skin;
  const root = doc.documentElement;
  const old = doc.getElementById(SKIN_LINK_ID);
  if (!skin) {
    old?.remove();
    if (watcher) {
      watcher.disconnect();
      watcher = null;
    }
    sweep(doc);
    for (const f of FACETS) delete root.dataset[f];
    delete root.dataset.engine;
    return;
  }
  if (!old || old.getAttribute("href") !== skin.href) {
    old?.remove();
    const link = doc.createElement("link");
    link.id = SKIN_LINK_ID;
    link.rel = "stylesheet";
    link.href = skin.href;
    doc.head.appendChild(link);
  }
  root.dataset.engine = "";
  for (const f of FACETS) {
    const v = skin[f];
    if (v) root.dataset[f] = v;
    else delete root.dataset[f];
  }
  if (!skin.theme) root.dataset.theme = "dark";
  sweep(doc);
  // Screens that install their sheets lazily arrive after the mount.
  if (!watcher && typeof MutationObserver === "function") {
    watcher = new MutationObserver((records) => {
      for (const r of records) for (const n of r.addedNodes) if (isNative(n)) void applyTo(n, doc);
    });
    watcher.observe(doc.head, { childList: true });
  }
}

/**
 * `jjhub`, `noitroidvania+snake` (instance + fx), or nothing — the shape of a
 * `?skin=` query parameter.
 * @param {string | null | undefined} value
 * @param {string} [href]
 * @returns {EngineSkin | null}
 */
export function skinFromParam(value, href = "/vendor/engine.css") {
  if (!value) return null;
  const [instance, fx] = String(value).split("+");
  if (!instance) return null;
  return fx ? { href, instance, fx } : { href, instance };
}
