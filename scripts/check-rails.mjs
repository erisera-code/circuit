#!/usr/bin/env node
// Regression guard for the "rounded box + tinted fill + coloured side rail"
// anti-pattern (the AI-generated-looking admonition/toast/list-selection
// treatment that design-engine eliminated and that circuit's own
// components.css independently reinvented — see the 2026-09 audit).
//
// Scoped to admonition/banner/toast/list-row-like components (matched by
// selector name) rather than the whole file, because a full-file sweep would
// also flag pre-existing, unrelated, intentionally-coloured one-sided
// borders elsewhere (e.g. the categorical .c-ramp swatch rail, the .c-side
// active-nav rail, the .c-split menu divider) that are not this bug and
// were not part of the audit. Extend TARGET_RE if a new tone component is
// added to this family.
//
// Flags two shapes, checked per individual CSS rule (not across the
// cascade):
//   A) a coloured (non-transparent, non-currentColor, non `var(--line)`)
//      border-left/border-left-color set without border-right/-color (or a
//      symmetric `border` shorthand) also set on the same rule — a one-sided
//      "rail" — and the mirror case for border-right.
//   B) `border-radius` co-occurring with a non-transparent, non-`var(--line)`
//      background on the same rule — a rounded, tinted fill.
//
// Run: node scripts/check-rails.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import postcss from 'postcss';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'circuit', 'src');
const file = 'components.css';
const css = readFileSync(join(root, file), 'utf8');
const root_ = postcss.parse(css, { from: file });

// Component family this guard applies to. Keep in sync with the components
// the audit covered: callouts, banners, toasts, alerts, and list-row
// selection state.
const TARGET_RE = /\.c-(callout|banner|toast|alert|notice|admonition|row)\b/i;

const NEUTRAL_VALUE_RE = /^(transparent|currentcolor|inherit|initial|unset|none|0(px)?)$/i;
const isNeutral = (v) => {
  const t = v.trim();
  if (NEUTRAL_VALUE_RE.test(t)) return true;
  if (/var\(\s*--line\b/.test(t)) return true; // the design system's own "neutral line" token
  return false;
};

const issues = [];

root_.walkRules((rule) => {
  if (!TARGET_RE.test(rule.selector)) return;

  const decls = rule.nodes ? rule.nodes.filter((n) => n.type === 'decl') : [];
  const find = (prop) => decls.find((d) => d.prop.toLowerCase() === prop);
  // Effective colour of one side, in declaration order (later wins): the
  // `border` shorthand sets a baseline for all four sides, which a later
  // `border-left`/`border-right`/`border-*-color` on the same rule overrides
  // for just that side. Returns null if the side has no border at all.
  const sideColour = (side) => {
    let colour = null;
    for (const d of decls) {
      const p = d.prop.toLowerCase();
      if (p === 'border') colour = d.value.trim().split(/\s+/).pop();
      else if (p === `border-${side}`) colour = d.value.trim().split(/\s+/).pop();
      else if (p === `border-${side}-color`) colour = d.value;
    }
    return colour;
  };
  const leftColour = sideColour('left');
  const rightColour = sideColour('right');
  const leftColoured = leftColour !== null && !isNeutral(leftColour);
  const rightColoured = rightColour !== null && !isNeutral(rightColour);
  const rightNeutralOrAbsent = rightColour === null || isNeutral(rightColour);
  const leftNeutralOrAbsent = leftColour === null || isNeutral(leftColour);

  // --- condition A: one-sided coloured rail ---
  if (leftColoured && rightNeutralOrAbsent) {
    issues.push(`${rule.source.start.line}: ${rule.selector} — coloured border-left without a matching border-right (one-sided rail)`);
  }
  if (rightColoured && leftNeutralOrAbsent) {
    issues.push(`${rule.source.start.line}: ${rule.selector} — coloured border-right without a matching border-left (one-sided rail)`);
  }

  // --- condition B: rounded + tinted fill ---
  const radiusDecl = decls.find((d) => d.prop.toLowerCase() === 'border-radius');
  const bgDecl = decls.find((d) => d.prop.toLowerCase() === 'background' || d.prop.toLowerCase() === 'background-color');
  if (radiusDecl && !isNeutral(radiusDecl.value) && bgDecl && !isNeutral(bgDecl.value)) {
    issues.push(`${rule.source.start.line}: ${rule.selector} — border-radius co-occurring with a non-neutral background (rounded tinted fill)`);
  }
});

if (issues.length) {
  console.error('Rounded-box / tinted-fill / coloured-rail anti-pattern detected:');
  for (const i of issues) console.error(`  ${file}:${i}`);
  console.error(`\n${issues.length} issue(s). See scripts/check-rails.mjs for what this guards against.`);
  process.exit(1);
}
console.log(`${file} checked, 0 rail/tinted-fill anti-pattern issues in callout/banner/toast/row-like selectors.`);
