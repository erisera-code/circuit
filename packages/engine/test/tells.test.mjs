// The house rule against the machine-generated "box with a coloured side rule":
// no content container (quote, callout, banner, toast) may set a coloured
// inline-start/left border or an inset side-rail shadow. Neutral hairlines in
// the line colour are fine; cursor marks on list rows are a different thing.
import test from "node:test";
import assert from "node:assert/strict";
import { cssFiles, parse, styleRules, rel } from "./_helpers.mjs";

const CONTAINER = /./; // every rule: side rails are out everywhere, cursor marks included
const NEUTRAL = /var\(--de-color-line\)|var\(--de-border\)|transparent|\b0\b|none|inherit|currentcolor/i;

test("no coloured side rule anywhere: not on containers, not as a cursor or selection mark", async () => {
  const offenders = [];
  for (const file of await cssFiles()) {
    const root = await parse(file);
    for (const { rule } of styleRules(root)) {
      if (!CONTAINER.test(rule.selector)) continue;
      rule.walkDecls((d) => {
        // a coloured inline-start/left border, or a one-sided inset shadow (a rail), in a non-neutral colour
        const side = /^border-(inline-start|left)(-color)?$/.test(d.prop);
        // a rail is an inset shadow with a horizontal offset and no vertical offset / blur: `inset 2px 0 0 …`
        const rail = /^(box-shadow|--[\w-]*mark[\w-]*)$/.test(d.prop) && /inset\s+-?[1-9]\d*(\.\d+)?px\s+0(px)?\s+0(px)?(\s+0(px)?)?\s+(?!0)/.test(d.value);
        const toneSide = /^border-color$/.test(d.prop) && false;
        if ((side && !NEUTRAL.test(d.value)) || (rail && !NEUTRAL.test(d.value)) || toneSide) {
          offenders.push(`${rel(file)}:${d.source.start.line}  ${rule.selector.slice(0, 60)}  { ${d.prop}: ${d.value} }`);
        }
      });
    }
  }
  assert.deepEqual(offenders, [], `coloured side rules on containers:\n  ${offenders.join("\n  ")}`);
});
