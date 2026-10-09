// The family gallery is the cross-system audit: every system must render every
// row of the vocabulary with real markup whose classes exist in that system's
// stylesheet. A `missing` entry anywhere fails.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ROOT } from "./_helpers.mjs";
import { COMPONENTS, SYSTEMS } from "../examples/family/components.mjs";

const VENDOR = { circuit: "vendor/circuit.css", jjhub: "vendor/jjhub.css", noitroidvania: "vendor/noitroidvania.css", snake: "vendor/snake.css" };

test("every system has a real, class-valid snippet for all 53 components", async () => {
  const problems = [];
  for (const s of SYSTEMS) {
    const m = (await import(`../examples/family/snippets/${s.id}.mjs`)).default;
    let css = "";
    if (VENDOR[s.id]) css = await readFile(join(ROOT, "examples", "family", VENDOR[s.id]), "utf8");
    for (const c of COMPONENTS) {
      const e = m[c.id];
      if (!e) { problems.push(`${s.id}/${c.id}: no entry`); continue; }
      if (!e.html || e.missing) { problems.push(`${s.id}/${c.id}: missing (${e.missing ?? "empty"})`); continue; }
      if (css) for (const [, cls] of e.html.matchAll(/class="([^"]+)"/g)) for (const k of cls.split(/\s+/)) if (k && !css.includes("." + k)) problems.push(`${s.id}/${c.id}: class .${k} not in stylesheet`);
    }
  }
  assert.deepEqual(problems, []);
});

test("vendored stylesheets are in sync with the sibling checkouts (when present)", async () => {
  const { existsSync, readFileSync } = await import("node:fs");
  const { homedir } = await import("node:os");
  const H = homedir();
  const pairs = [
    ["jjhub", join(H, "Projects/@erisera-code/jjhub/web/src/styles.css")],
    ["noitroidvania", join(H, "Projects/noitroidvania/src/ds/ds.css")],
    ["snake", join(H, "Projects/impressive-snake/src/ds/ds.css")],
  ];
  const stale = [];
  for (const [id, src] of pairs) {
    if (!existsSync(src)) continue;
    let live = readFileSync(src, "utf8");
    if (id === "jjhub") {
      // jjhub's design-system work rides its design-system-updates branch until it lands upstream
      const { execFileSync } = await import("node:child_process");
      try { live = execFileSync("git", ["-C", join(H, "Projects/@erisera-code/jjhub"), "show", "design-system-updates:web/src/styles.css"], { encoding: "utf8" }); } catch {}
    }
    const a = live, b = readFileSync(join(ROOT, "examples", "family", VENDOR[id]), "utf8");
    if (a !== b) stale.push(`${id}: run npm run sync:family`);
  }
  assert.deepEqual(stale, []);
});
