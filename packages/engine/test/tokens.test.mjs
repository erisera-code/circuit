// Token hygiene: every var(--de-*) read has a definition somewhere in the engine,
// registered properties have computationally-independent initial values, and
// registered color tokens do not exist (they would freeze light-dark()).
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { cssFiles, parse, rel } from "./_helpers.mjs";

test("every --de-* token read via var() is defined somewhere", async () => {
  const defined = new Set();
  const reads = new Map();
  for (const file of await cssFiles()) {
    const root = await parse(file);
    root.walkDecls((d) => {
      if (d.prop.startsWith("--")) defined.add(d.prop);
      // a var() read WITH a fallback is a host-facing knob; only bare reads must be defined
      for (const m of d.value.matchAll(/var\(\s*(--[\w-]+)\s*([,)])/g)) {
        if (m[2] === ")" && !reads.has(m[1])) reads.set(m[1], `${rel(file)}:${d.source.start.line}`);
      }
    });
    root.walkAtRules("property", (at) => defined.add(at.params.trim()));
    root.walkAtRules("function", (at) => {
      for (const m of at.params.matchAll(/(--[\w-]+)\s*(?:<|:|,|\))/g)) defined.add(m[1]);
    });
  }
  const missing = [...reads].filter(([name]) => !defined.has(name)).map(([n, at]) => `${n} (first read ${at})`);
  assert.deepEqual(missing, []);
});

test("@property initial values are computationally independent and no color token is registered", async () => {
  const bad = [];
  for (const file of await cssFiles()) {
    const root = await parse(file);
    root.walkAtRules("property", (at) => {
      const name = at.params.trim();
      let syntax = "", initial = "";
      at.walkDecls((d) => { if (d.prop === "syntax") syntax = d.value; if (d.prop === "initial-value") initial = d.value; });
      if (/\b(r?em|ch|ex|lh|v[wh]|vmin|vmax|dv[wh]|cq[iwb])\b/.test(initial)) bad.push(`${rel(file)} ${name}: relative unit in initial-value (${initial}) — registration is silently dropped`);
      if (/<color>/.test(syntax)) bad.push(`${rel(file)} ${name}: registered <color> freezes light-dark()`);
    });
  }
  assert.deepEqual(bad, []);
});

test("duration literals only appear in the motion tokens (everything else reads a token)", async () => {
  const bad = [];
  for (const file of await cssFiles()) {
    if (/primitives\.motion|modes\/motion|functions\.css/.test(file)) continue;
    const css = (await readFile(file, "utf8")).replace(/\/\*[\s\S]*?\*\//g, "");
    for (const m of css.matchAll(/(?:transition|animation)(?:-duration)?\s*:[^;]*?\b(\d*\.?\d+m?s)\b/g)) {
      bad.push(`${rel(file)}: literal ${m[1]} in ${m[0].slice(0, 60)}`);
    }
  }
  // signature effects are allowed exactly where they are documented
  const allowed = bad.filter((b) => /instances\/terminal\.css/.test(b));
  assert.deepEqual(bad.filter((b) => !allowed.includes(b)), []);
});
