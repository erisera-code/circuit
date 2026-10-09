// Every row of the family vocabulary has a classless binding in the engine and
// an example in the canonical markup — so the gallery cannot silently regress.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ROOT, cssFiles } from "./_helpers.mjs";
import { COMPONENTS } from "../examples/family/components.mjs";

// id → [selector fragment that must exist in src, markup fragment that must exist in examples/index.html]
const BINDINGS = {
  "button": ['[data-variant="danger"]', 'data-variant="danger"'],
  "icon-button": ["button[data-icon]", "data-icon"],
  "link-button": ['[data-variant="link"]', 'data-variant="link"'],
  "button-group": ['[role="group"]:has(> button)', 'role="group"'],
  "input": ["textarea", "<textarea"],
  "form-field": ["label > small", "<small role=\"alert\">"],
  "choice": ['input[type="checkbox"][role="switch"]', 'role="switch"'],
  "badge": ['[data-tone="warn"]', 'data-tone="warn"'],
  "status-dot": ["data[data-dot]", "data-dot"],
  "chip": ["[data-chip]", "data-chip"],
  "card": [") > :where(li) > :where(article, section)", "<li><article>"],
  "callout": ['[role="note"]', 'role="note"'],
  "banner": ["[data-banner]", "data-banner"],
  "toast": ["[data-toasts]", "data-toasts"],
  "dialog": ["dialog", "<dialog"],
  "popover": ["[popover]", "popover"],
  "tooltip": ['[role="tooltip"]', 'role="tooltip"'],
  "menu": ['[role="menuitem"]', 'role="menuitem"'],
  "palette": ["dialog[data-palette]", "data-palette"],
  "tabs": ['[role="tablist"]', 'role="tablist"'],
  "accordion": ["details > summary", "<details"],
  "table": ["thead th", "<thead>"],
  "list": ['[role="listbox"] > li[role="option"]', 'role="option"'],
  "code": ["figure:has(> pre)) > :where(figcaption)", "<figcaption>src/"],
  "terminal": ["pre[data-terminal]", "data-terminal"],
  "empty": ["[data-empty]", "data-empty"],
  "spinner": ['[aria-busy="true"]', 'aria-busy="true"'],
  "meter": ["progress", "<progress"],
  "avatar": ["[data-avatar]", "data-avatar"],
  "key": ["kbd", "<kbd>"],
  "separator": ["hr", "<hr>"],
  "breadcrumb": ['nav[aria-label="breadcrumb"]', 'aria-label="breadcrumb"'],
  "pager": ['a[rel="next"]', 'rel="next"'],
  "swatch": ["[data-swatch]", "data-swatch"],
  "ramp": ['[data-step="6"]', 'data-step="6"'],
  "pattern": ["[data-pattern]", "data-pattern"],
  "shell": ["[data-engine] [data-shell]", "data-shell"],
  "board": ["[data-board]", "data-board"],
  "params": ["dt", "<dl>"],
  "utilities": ["de-cluster", "<de-cluster>"],
  "scroll": ["[data-scroll]", "data-scroll"],
  "scrim": ["[data-scrim]", "data-scrim"],
  "theme-toggle": ["button[data-theme-toggle]", "data-theme-toggle"],
  "slider":    ['input[type="range"]', '<input type="range"'],
  "segmented": ["fieldset[data-segmented]", "data-segmented"],
  "combobox":  ["[data-combobox]", "data-combobox"],
  "skeleton":  ["[data-skeleton]", "data-skeleton"],
  "stat":      ["[data-stat]", "data-stat"],
  "rating":    ["[data-rating]", "data-rating"],
  "stepper":   ["ol[data-steps]", "data-steps"],
  "timeline":  ["ol[data-timeline]", "data-timeline"],
  "carousel":  ["[data-carousel]", "data-carousel"],
  "drawer":    ['dialog[data-sheet="top"], dialog[data-sheet="bottom"]', 'data-sheet="end"'],
};

test("every vocabulary id has a binding in src and an example in the canonical markup", async () => {
  const css = (await Promise.all((await cssFiles()).map((f) => readFile(f, "utf8")))).join("\n");
  const html = await readFile(join(ROOT, "examples", "index.html"), "utf8");
  const garden = html.slice(html.indexOf("<div data-engine"), html.indexOf("END CANONICAL GARDEN MARKUP"));
  const problems = [];
  for (const c of COMPONENTS) {
    const b = BINDINGS[c.id];
    if (!b) { problems.push(`${c.id}: no binding declared in this test`); continue; }
    const [sel, markup] = Array.isArray(b) ? b : [b[0], b[1]];
    if (!css.includes(sel)) problems.push(`${c.id}: selector fragment not in src: ${sel}`);
    if (!garden.includes(markup)) problems.push(`${c.id}: markup fragment not in example: ${markup}`);
  }
  assert.deepEqual(problems, []);
});

test("every instance file styles the vocabulary it claims (spot checks)", async () => {
  const must = { chip: "[data-chip]", toast: "[data-toast]", palette: "[data-palette]", terminal: "[data-terminal]", rows: '[role="option"]', board: "[data-board]" };
  const problems = [];
  for (const name of ["circuit", "jjhub", "noitroidvania", "snake"]) {
    const css = await readFile(join(ROOT, "src", "instances", `${name}.css`), "utf8");
    for (const [k, frag] of Object.entries(must)) if (!css.includes(frag)) problems.push(`${name}: no ${k} rule (${frag})`);
  }
  assert.deepEqual(problems, []);
});
