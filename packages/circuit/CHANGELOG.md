# Changelog

## 0.2.0

### Added
- Namespaced token set for applications: `@erisera-code/circuit/namespaced.css` defines only `--circuit-*` custom properties, with light values by default, dark via `prefers-color-scheme`, and `[data-theme="dark"|"light"]` overrides. Importing it cannot clobber an app's own theme variables.
- JS entry point `@erisera-code/circuit/tokens` (with types) exporting `tokens` (`{ shared, light, dark }`) and `tokensCss({ selector? })`, so a JS-only import-map pipeline can inject the tokens.
- Tests (`npm test -w @erisera-code/circuit`) covering the namespacing guarantee, light/dark structure, parity with `tokens.css`, and that the shipped CSS matches `tokensCss()`.
- CI and a publish-from-main workflow (`publish.yml`).

### Unchanged
- `tokens.css`, `themes.css`, `components.css`, `palette.*` behave exactly as in 0.1.1; the docs site is unaffected.

## 0.1.1
- Docs now live at opensource.johnhenry.me.
