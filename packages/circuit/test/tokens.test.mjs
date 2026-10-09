import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import postcss from 'postcss';

const pkgDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'));
const read = (f) => readFileSync(join(pkgDir, f), 'utf8');

// Resolve through the package's own name, the way an app would.
const { tokens, tokensCss } = await import('@erisera-code/circuit/tokens');

const declsOf = (css) => {
  const out = [];
  postcss.parse(css).walkDecls((d) => d.prop.startsWith('--') && out.push(d));
  return out;
};

test('the tokens entry point is exported with types', () => {
  const e = pkg.exports['./tokens'];
  assert.ok(e && e.types && e.import, 'conditional export with types + import');
  assert.ok(pkg.exports['./namespaced.css'], 'exports ./namespaced.css');
  assert.match(read(e.types.replace('./', '')), /tokensCss/);
});

test('tokensCss() defines only --circuit-* custom properties', () => {
  const decls = declsOf(tokensCss());
  assert.ok(decls.length > 40);
  assert.deepEqual(decls.filter((d) => !d.prop.startsWith('--circuit-')).map((d) => d.prop), []);
});

test('shipped namespaced.css is exactly tokensCss()', () => {
  assert.equal(read('src/namespaced.css'), tokensCss());
});

test('light values on :root, dark via prefers-color-scheme and [data-theme]', () => {
  const rules = [];
  postcss.parse(tokensCss()).walkRules((r) =>
    rules.push({ sel: r.selector, media: r.parent.type === 'atrule' ? r.parent.params : null }));
  assert.ok(rules.find((r) => r.sel === ':root' && !r.media), 'light :root rule');
  const sys = rules.find((r) => r.media && /prefers-color-scheme:\s*dark/.test(r.media));
  assert.ok(sys && /:not\(\[data-theme='light'\]\)/.test(sys.sel), 'system dark respects explicit light');
  assert.ok(rules.some((r) => /\[data-theme='dark'\]/.test(r.sel) && !r.media), 'explicit dark');
  assert.ok(rules.some((r) => /\[data-theme='light'\]/.test(r.sel) && !r.media), 'explicit light');
});

test('tokens data has light and dark sets with the same role keys', () => {
  assert.ok(tokens.light && tokens.dark && tokens.shared);
  assert.deepEqual(Object.keys(tokens.dark).sort(), Object.keys(tokens.light).sort());
  for (const role of ['bg', 'surface', 'text', 'dim', 'accent', 'border', 'danger']) {
    assert.ok(tokens.light[role] && tokens.dark[role], role);
    assert.notEqual(tokens.light[role], tokens.dark[role], `${role} differs light/dark`);
  }
});

test('options: scoping selector keeps everything namespaced and off :root', () => {
  const css = tokensCss({ selector: '.app' });
  assert.match(css, /\.app/);
  const sels = [];
  postcss.parse(css).walkRules((r) => sels.push(r.selector));
  assert.ok(sels.every((s) => s.includes('.app')), sels.join(' | '));
  assert.deepEqual(declsOf(css).filter((d) => !d.prop.startsWith('--circuit-')), []);
});

// Parity: namespaced colours must equal the legacy tokens.css values.
function legacy() {
  const light = {}, dark = {};
  postcss.parse(read('src/tokens.css')).walkRules((r) => {
    const into = r.selector === ':root' ? (r.parent.type === 'root' ? light : dark) : null;
    if (into) r.walkDecls((d) => d.prop.startsWith('--') && (into[d.prop] = d.value));
  });
  return { light, dark: { ...light, ...dark } };
}
function resolve(set, v, depth = 0) {
  return v.replace(/var\((--[\w-]+)\)/g, (_, n) => (depth < 8 && n !== '--hue' && set[n] ? resolve(set, set[n], depth + 1) : `var(${n})`));
}
const MAP = { bg: '--bg', surface: '--bg-panel', inset: '--bg-inset', text: '--ink', dim: '--ink-2', faint: '--ink-3',
  border: '--line', accent: '--accent', 'accent-hover': '--accent-hover', danger: '--error', success: '--success',
  warning: '--warning', info: '--info', scrim: '--scrim', 'code-bg': '--code-bg', 'code-ink': '--code-ink' };

for (const mode of ['light', 'dark']) {
  test(`namespaced ${mode} values match legacy tokens.css`, () => {
    const set = legacy()[mode];
    for (const [role, legacyName] of Object.entries(MAP)) {
      const want = resolve(set, set[legacyName]).replaceAll('var(--hue)', 'var(--circuit-hue)');
      assert.equal(tokens[mode][role], want, `${mode} ${role}`);
    }
  });
}

test('legacy tokens.css still declares the un-prefixed set for the docs site', () => {
  const names = new Set(declsOf(read('src/tokens.css')).map((d) => d.prop));
  for (const n of ['--bg', '--accent', '--ink', '--line', '--hue', '--n-0']) assert.ok(names.has(n), n);
});
