// Layer discipline: every rule sits in a declared engine layer; every layer used
// is declared in layers.css; instance files use only the facet sublayers.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cssFiles, parse, styleRules, rel, SRC } from "./_helpers.mjs";

async function declaredLayers() {
  const css = await readFile(join(SRC, "layers.css"), "utf8");
  const body = css.replace(/\/\*[\s\S]*?\*\//g, "").match(/@layer\s+([\s\S]*?);/)[1];
  return new Set(body.split(",").map((s) => s.trim()).filter(Boolean));
}

test("every layer referenced in src is declared in layers.css", async () => {
  const declared = await declaredLayers();
  const missing = new Set();
  for (const file of await cssFiles()) {
    const root = await parse(file);
    root.walkAtRules("layer", (at) => {
      if (file.endsWith("layers.css")) return;
      for (const name of at.params.split(",").map((s) => s.trim())) if (!declared.has(name)) missing.add(`${rel(file)}: ${name}`);
    });
  }
  assert.deepEqual([...missing], []);
});

test("every style rule (outside @keyframes / @function) is inside an engine layer", async () => {
  const unlayered = [];
  for (const file of await cssFiles()) {
    const root = await parse(file);
    for (const { rule, layer, isKeyframeStep, isFunctionBody } of styleRules(root)) {
      if (isKeyframeStep || isFunctionBody) continue;
      if (!layer) unlayered.push(`${rel(file)}:${rule.source.start.line} ${rule.selector}`);
    }
  }
  assert.deepEqual(unlayered, []);
});

test("instance files only use facet sublayers, and rule facets use @scope", async () => {
  const bad = [];
  for (const file of (await cssFiles()).filter((f) => f.includes("/instances/"))) {
    const root = await parse(file);
    root.walkAtRules("layer", (at) => {
      if (!/^de\.instances\.(palette|type|shape|layout|fx)$/.test(at.params)) bad.push(`${rel(file)}: layer ${at.params}`);
    });
    for (const { rule, layer, scope, isKeyframeStep } of styleRules(root)) {
      if (isKeyframeStep) continue;
      const isRoot = /\[data-engine\]/.test(rule.selector);
      if (/de\.instances\.(layout|fx)$/.test(layer) && !scope) bad.push(`${rel(file)}:${rule.source.start.line} ${layer} rule outside @scope`);
      if (/de\.instances\.(palette)$/.test(layer) && !isRoot) bad.push(`${rel(file)}:${rule.source.start.line} palette facet must be tokens on the region root`);
    }
  }
  assert.deepEqual(bad, []);
});

test("instances never branch on prefers-color-scheme or data-theme — light-dark() does that", async () => {
  const bad = [];
  for (const file of (await cssFiles()).filter((f) => f.includes("/instances/"))) {
    const css = await readFile(file, "utf8");
    if (/prefers-color-scheme/.test(css)) bad.push(`${rel(file)}: prefers-color-scheme`);
    if (/data-theme="(light|dark)"/.test(css)) bad.push(`${rel(file)}: [data-theme=…] selector`);
    for (const m of css.matchAll(/light-dark\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g)) {
      const args = m[1];
      if (/^\s*[\d.]+\s*,/.test(args)) bad.push(`${rel(file)}: light-dark() with a number: ${m[0]}`);
    }
  }
  assert.deepEqual(bad, []);
});
