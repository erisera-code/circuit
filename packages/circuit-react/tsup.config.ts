import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/react/index.ts' },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom', /^@radix-ui\//],
  // Component .tsx files import their sibling .css files. The "copy" loader
  // emits each stylesheet into dist/ and rewrites the import specifier to the
  // emitted file, so `import '@erisera-code/circuit-react/react'` resolves its
  // CSS from the published dist/ layout (consumer's bundler handles the .css
  // imports as usual).
  loader: { '.css': 'copy' },
});
