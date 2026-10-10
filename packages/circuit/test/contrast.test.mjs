import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import postcss from 'postcss';
import { tokens } from '../src/tokens.js';
import { ratio } from './contrast-lib.mjs';

// WCAG 2.x contrast for the text roles circuit ships, on circuit's own surfaces.
//
// Values are opaque `#rrggbb`, `hsl(<hue> S% L%)`, or the hue-aware form
// `oklch(from hsl(<hue> S% L%) min|max(l, X) c h)` (OKLCH lightness clamp,
// chroma and hue kept). `var(--circuit-hue)` / `var(--hue)` is substituted, so
// each role can be evaluated at any hue — accent is the per-tool knob.

const AA = 4.5;

// Roles an application sets text in: body/secondary text everywhere, semantic
// and accent colours as labels.
const surfaces = ['bg', 'surface', 'inset'];
const textRoles = ['text', 'dim', 'accent', 'accent-hover', 'success', 'warning', 'danger', 'info'];

// Whole hue wheel in steps, plus the default (25), clawser's hue (212) and every
// hue in the registry (themes.css).
const hues = [...new Set([
  ...Array.from({ length: 73 }, (_, i) => i * 5),
  25, 212, 70, 95, 142, 160, 199, 250, 285, 340, 359,
])].sort((a, b) => a - b);

for (const mode of ['light', 'dark']) {
  for (const role of textRoles) {
    for (const surface of surfaces) {
      test(`${mode}: --circuit-${role} on --circuit-${surface} is at least ${AA}:1 (WCAG AA) at every hue`, () => {
        let worst = { r: Infinity, hue: null };
        for (const hue of hues) {
          const r = ratio(tokens[mode][role], tokens[mode][surface], hue);
          if (r < worst.r) worst = { r, hue };
        }
        assert.ok(worst.r >= AA,
          `${worst.r.toFixed(2)}:1 at hue ${worst.hue} (${tokens[mode][role]} on ${tokens[mode][surface]})`);
      });
    }
  }
}

// The legacy tokens.css (docs site) must meet the same bar; its parity with the
// namespaced set is enforced in tokens.test.mjs, this asserts the end result.
const pkgDir = join(dirname(fileURLToPath(import.meta.url)), '..');
function legacy() {
  const light = {}, dark = {};
  postcss.parse(readFileSync(join(pkgDir, 'src/tokens.css'), 'utf8')).walkRules((r) => {
    const into = r.selector === ':root' ? (r.parent.type === 'root' ? light : dark) : null;
    if (into) r.walkDecls((d) => d.prop.startsWith('--') && (into[d.prop] = d.value));
  });
  return { light, dark: { ...light, ...dark } };
}
const resolveVars = (set, v, depth = 0) =>
  v.replace(/var\((--[\w-]+)\)/g, (_, n) => (depth < 8 && n !== '--hue' && set[n] ? resolveVars(set, set[n], depth + 1) : `var(${n})`));
const LEGACY = { text: '--ink', dim: '--ink-2', accent: '--accent', 'accent-hover': '--accent-hover',
  success: '--success', warning: '--warning', danger: '--error', info: '--info' };
const LEGACY_SURFACE = { bg: '--bg', surface: '--bg-panel', inset: '--bg-inset' };

for (const mode of ['light', 'dark']) {
  test(`${mode}: legacy tokens.css text roles meet ${AA}:1 on every surface at every hue`, () => {
    const set = legacy()[mode];
    const failures = [];
    for (const [role, name] of Object.entries(LEGACY)) {
      for (const [surface, sname] of Object.entries(LEGACY_SURFACE)) {
        for (const hue of hues) {
          const r = ratio(resolveVars(set, set[name]), resolveVars(set, set[sname]), hue);
          if (r < AA) { failures.push(`${role}/${surface}@${hue}=${r.toFixed(2)}`); break; }
        }
      }
    }
    assert.deepEqual(failures, []);
  });
}
