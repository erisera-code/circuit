# Changelog

## 0.3.0

### Fixed
- Text roles now meet WCAG AA (4.5:1) on `bg`, `surface` and `inset`, in light and dark, at every hue (#7). `accent` and `accent-hover` derive their lightness from the hue: the hue's own colour with OKLCH lightness clamped (light: at most 0.52 / 0.47 for hover; dark: at least 0.71 / 0.76 for hover), so no hue falls below AA and apps no longer need to mix these roles toward `text`.
- Light `dim`, `success`, `warning` and `danger` darkened to pass (the dark set already passed).

### Changed (visual)
- The legacy `tokens.css` had the same failures, so it is fixed too and the docs site shifts slightly: light-mode accent is a deeper orange at the default hue (was `hsl(25 95% 46%)`, now clamped to OKLCH L 0.52), light `--ink-2`/`--success`/`--warning`/`--error` are a little darker (`#64748b`->`#5b6b82`, `#0f9d63`->`#0b7a4b`, `#b45f06`->`#a45506`, `#d13c30`->`#c4372b`), and in dark mode blue-to-purple accents are lightened. Syntax colours, `info` and the dark semantic colours are unchanged.
- `accent` and `accent-hover` now use CSS relative colour syntax (`oklch(from hsl(...) ...)`): Chrome/Edge 119+, Safari 16.4+, Firefox 128+.

### Added
- `test/contrast.test.mjs`: every text role against all three surfaces, both modes, every 5 degrees of hue plus the registry hues, for `tokens.js` and the legacy `tokens.css`.

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
