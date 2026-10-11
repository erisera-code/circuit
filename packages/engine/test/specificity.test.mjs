// Every engine selector must contribute ZERO specificity — only pseudo-elements
// (which cannot be wrapped in :where()) may add to the type column. This is the
// contract that lets a host's own styles win at equal weight.
import test from "node:test";
import assert from "node:assert/strict";
import { selectorSpecificity } from "@csstools/selector-specificity";
import parser from "postcss-selector-parser";
import { cssFiles, parse, styleRules, rel } from "./_helpers.mjs";

const PSEUDO_ELEMENT = /::[a-z-]+(\([^)]*\))?/gi;

function check(selector) {
  // count pseudo-elements: each legitimately adds (0,0,1)
  const pseudos = (selector.match(PSEUDO_ELEMENT) || []).length;
  let spec;
  parser((sel) => { spec = selectorSpecificity(sel); }).processSync(selector);
  return { pseudos, spec };
}

test("every engine selector has zero specificity beyond pseudo-elements", async () => {
  const offenders = [];
  for (const file of await cssFiles()) {
    const root = await parse(file);
    for (const { rule, isKeyframeStep, isFunctionBody } of styleRules(root)) {
      if (isKeyframeStep || isFunctionBody) continue;
      for (const selector of rule.selectors) {
        const s = selector.trim();
        if (s === "&" || s === "") continue;
        const { pseudos, spec } = check(s.replace(/^&\s*/, ""));
        if (spec.a > 0 || spec.b > 0 || spec.c > pseudos) {
          offenders.push(`${rel(file)}:${rule.source.start.line}  ${s}  → (${spec.a},${spec.b},${spec.c})`);
        }
      }
    }
  }
  assert.deepEqual(offenders, [], `selectors with specificity:\n  ${offenders.join("\n  ")}`);
});

test("no pseudo-element inside :where()/:is() — the browser drops the whole selector", async () => {
  const offenders = [];
  for (const file of await cssFiles()) {
    const root = await parse(file);
    for (const { rule } of styleRules(root)) {
      if (/:(where|is)\([^)]*::[a-z-]+/.test(rule.selector)) offenders.push(`${rel(file)}:${rule.source.start.line}  ${rule.selector.slice(0, 80)}`);
    }
  }
  assert.deepEqual(offenders, []);
});

test("no !important and no revert-layer anywhere in src", async () => {
  const offenders = [];
  for (const file of await cssFiles()) {
    const root = await parse(file);
    root.walkDecls((d) => {
      if (d.important) offenders.push(`${rel(file)}:${d.source.start.line} !important on ${d.prop}`);
      if (/revert-layer/.test(d.value)) offenders.push(`${rel(file)}:${d.source.start.line} revert-layer`);
    });
  }
  assert.deepEqual(offenders, []);
});
