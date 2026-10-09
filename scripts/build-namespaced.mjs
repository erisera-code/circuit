#!/usr/bin/env node
// Regenerates packages/circuit/src/namespaced.css from tokens.js so the
// CSS-only file can never drift from the JS entry point.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tokensCss } from '../packages/circuit/src/tokens.js';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'circuit', 'src', 'namespaced.css');
writeFileSync(out, tokensCss());
console.log(`wrote ${out}`);
