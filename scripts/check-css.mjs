#!/usr/bin/env node
// Parses the circuit CSS package with postcss and asserts that every
// `var(--x)` read (without a fallback) is declared somewhere in tokens.css or
// components.css. There is no test suite for the CSS package; this is the
// floor. Run: node scripts/check-css.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import postcss from 'postcss';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'circuit', 'src');
const files = ['tokens.css', 'themes.css', 'components.css', 'palette.css'];
const declared = new Set();
const reads = [];
for (const f of files) {
  const rootNode = postcss.parse(readFileSync(join(root, f), 'utf8'), { from: f });
  rootNode.walkDecls((d) => {
    if (d.prop.startsWith('--')) declared.add(d.prop);
    for (const m of d.value.matchAll(/var\(\s*(--[\w-]+)\s*(,)?/g)) {
      if (!m[2]) reads.push({ name: m[1], file: f, line: d.source.start.line });
    }
  });
}
const missing = reads.filter((r) => !declared.has(r.name));
for (const m of missing) console.error(`undeclared ${m.name} at ${m.file}:${m.line}`);
console.log(`${files.length} files parsed, ${declared.size} custom properties declared, ${reads.length} var() reads checked, ${missing.length} missing`);
process.exit(missing.length ? 1 : 0);
