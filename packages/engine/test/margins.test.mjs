// The house rule: the engine spaces with gap and padding, never element
// margins, so nothing collapses and every step is driven by one token
// (--de-flow / --de-space-*). A margin is only ever 0 or auto — centering a
// block, or resetting a UA default — with a short, explicit list of narrow
// exceptions where gap/padding genuinely can't reach: native <dialog>
// top-anchoring, CSS anchor-positioned tooltips/popovers (anchor
// positioning has no gap equivalent), an inline ornament glyph sitting next
// to running text within one line box, the bleed utility breaking a block
// out to the gutter, and the 1px adjacent-border-collapse trick in a
// button group. Anything else that isn't 0/auto is a spacing-rhythm bug —
// see the tablist/menu-separator fixes this test was added to guard.
import test from "node:test";
import assert from "node:assert/strict";
import { cssFiles, parse, styleRules, rel } from "./_helpers.mjs";

const MARGIN_PROP = /^(margin|margin-block(-start|-end)?|margin-inline(-start|-end)?|margin-(top|right|bottom|left))$/;
const ZERO_OR_AUTO = /^(0(px)?|auto)$/;
const ALL_ZERO_OR_AUTO = (value) => value.trim().split(/\s+/).every((v) => ZERO_OR_AUTO.test(v));

// [file suffix, selector substring] — both must match for a non-0/auto
// margin to be allowed. Keep this list short and specific; a new entry
// should be a deliberate, reviewed exception, not a quiet workaround.
const ALLOW = [
  ["capabilities/anchor-positioning.css", "[role=\"tooltip\"]"],
  ["experimental/advanced-anchor.css", "[role=\"tooltip\"]"],
  ["components/tooltips.css", "[role=\"tooltip\"]"],
  ["components/palette.css", "dialog[data-palette]"],
  ["components/badges.css", "::before"],
  ["components/states.css", "::before"],
  ["capabilities/counters-markers.css", "::before"],
  ["utilities/optional.css", ".bleed"],
  ["structure/primitives.css", "de-bleed"],
  ["components/slider.css", "::-webkit-slider-thumb"], // the only way to vertically-centre this pseudo-element on its track
  ["components/buttons.css", "role=\"group\""],
  ["instances/noitroidvania.css", "figure"], // the game's map: an 8px moat inside the dialog, around a bordered figure whose rooms are positioned from its padding edge
];

test("margins are 0 or auto everywhere except a short, reviewed exception list", async () => {
  const offenders = [];
  for (const file of await cssFiles()) {
    const path = rel(file);
    const root = await parse(file);
    for (const { rule, isKeyframeStep } of styleRules(root)) {
      if (isKeyframeStep) continue;
      rule.walkDecls((d) => {
        if (!MARGIN_PROP.test(d.prop)) return;
        if (ALL_ZERO_OR_AUTO(d.value)) return;
        const allowed = ALLOW.some(([f, sel]) => path.endsWith(f) && rule.selector.includes(sel));
        if (!allowed) {
          offenders.push(`${path}:${d.source.start.line}  ${rule.selector.slice(0, 70)}  { ${d.prop}: ${d.value} }`);
        }
      });
    }
  }
  assert.deepEqual(offenders, [], `non-0/auto margins outside the reviewed exception list:\n  ${offenders.join("\n  ")}`);
});
