# Changelog

## 0.5.0 — 2026-10-09

- Moved into the erisera-code/circuit monorepo as `@erisera-code/circuit-engine`
  (was `@johnhenry/design-engine`, never published).
- New `./mount` export: `mountSkin`, `skinFromParam`, `geometryOf`, with
  types — mounts an instance over an existing app's own stylesheets without
  a rebuild.
- New `examples/starter/index.html`: a page in the grammar with an instance
  switcher.
- `engines.node` is `>=26`, the erisera/@johnhenry family floor; the
  stylesheets themselves don't need Node, only the build and the `./mount`
  helper's tooling do.
- Deep re-audit of the whole project: removed the accent-coloured masthead
  rule and the rounded/tinted callout-banner-chip treatment from `circuit`,
  the tinted callout/banner wash from `snake`, capped `botanical`'s card
  radius to match `glass`'s ceiling, fixed a tablist double-spacing bug that
  10 of 13 instances had (two had quietly patched around it locally), moved
  menu separators and the command palette off margin-based spacing, and gave
  every margin in `src/` a test (`test/margins.test.mjs`) so this class of
  bug can't come back unreviewed. Interaction fixes in the example: the
  command palette filters as you type, tabs get real keyboard navigation,
  list rows activate on Enter/Space, the theme toggle correctly cycles
  light → dark → auto and persists the choice. The same coloured-rail
  anti-pattern was independently found and fixed in all four sibling
  systems' own stylesheets (circuit, jjhub, noitroidvania, impressive-snake).
- **Extended vocabulary**: ten components common elsewhere but missing from
  the shared 43 — range slider, segmented control, combobox, skeleton,
  statistic, rating, stepper, timeline, carousel, and drawer (an
  edge-anchored `<dialog data-sheet>`, which already existed as CSS but had
  never been documented, exampled, or given top/bottom edges until now).
  Deliberately kept out of the family's 43-component matrix — see
  `examples/extended-components.mjs` and `docs/element-binding-map.md` — so
  the sibling systems aren't expected to carry them too. Guarded by its own
  `test/extended-vocabulary.test.mjs` and covered in Storybook
  (`Compare Extended` + a 44–53 block in every `Designs/*` file).
- Fixed a real pre-existing bug found while building the drawer: every
  `<dialog>` on the page kept a live, hit-testable layout box even while
  closed (`display: grid` from the flow-rhythm grid rule was beating the
  browser's own `dialog:not([open]) { display: none }`, since author-origin
  styles always win over user-agent styles regardless of specificity or
  layer). `components/dialogs.css` now restates `display: none` for closed
  dialogs as the correct baseline, and `capabilities/entry-transitions.css`
  restates it again inside the `allow-discrete` transition so the fade-out
  still animates before the box disappears.

## 0.5.0 — 2026-09-08

- The full family vocabulary (43 components shared with circuit, jjhub and
  noitroidvania) bound classlessly: chips, banners, toasts, command palette,
  terminal blocks, code figures with syntax tones, list rows, pagers, boards,
  nested shells, empty states, spinners, avatars, swatches, categorical ramp,
  patterns, scroll areas, scrims, theme toggle, icon/link buttons, button
  groups, switches, field hints and errors.
- Four house styles as instances: `circuit`, `jjhub`, `noitroidvania`, `snake`
  (impressive-snake, whose design system was extracted for this).
- `#vocabulary` section in the example; family gallery snippets for the
  engine now have no gaps. The example wires every interaction (dialog,
  palette with keyboard, tabs, rows, chips, toasts, copy, theme toggle).
- Storybook 10: 258 iframe-isolated stories (one per component per system)
  plus Compare stories and a vocabulary docs page; `test/family.test.mjs`
  audits all five systems for missing or unstyled components.
- Fixes: theme switch targeted `<html>` instead of the engine root; popover
  trigger targeted the dialog.
- Contrast pass driven by `scripts/audit.browser.js` (2184 measured pairs,
  578 failing before, 0 after):
  the neutral ramp, accent ramp and status colours now clear WCAG on both
  sides; a `--de-color-edge` token gives controls a 3:1 boundary while
  decorative hairlines stay quiet; selected rows/options keep the foreground
  ink; syntax comments readable; synthwave's sky has a light side; every
  instance re-tuned against the audit.
- Panel insets: anything a design frames or fills keeps its content clear of
  the edge. Collapsed-border tables take the inset on their edge cells,
  fieldsets and definition lists join the inset mechanism, list boxes,
  tooltips, code captions and board columns gained room, and the audit now
  measures edge-to-text distance for every framed element in every design.
- Boards no longer inherit the flow layer's explicit 1fr track (the first
  column collapsed when columns overflowed).
- The coloured side rule is gone everywhere: toasts carry tone with a glyph
  and a full hairline, quotes and callouts with rules, glyphs or labels,
  keyboard cursors with an inset ring, selections with a fill. Enforced by
  `test/tells.test.mjs`.
- Storybook restructured around one canonical markup per component:
  `Designs/<design>` sections use byte-identical snippets under each of the
  thirteen designs, `Compare` shows all designs per component, and the
  sibling systems' own stylesheets are a separate reference section.
- Tokens: `--de-sx-*` syntax tones and `--de-cat-1…6` categorical ramp,
  fixed light-dark pairs that never rotate with the accent.

## 0.4.0 — 2026-09-07

Reorganised from the Perplexity Computer artifacts into a publishable npm
package, then re-architected.

### Architecture
- **Facets.** Every instance is split into palette / type / shape / layout /
  fx, each in its own `de.instances.<facet>` sublayer and selectable with
  `data-palette`, `data-type`, `data-shape`, `data-layout`, `data-fx`.
  `data-instance` is a preset for all five. Mix designs by attribute.
- **`@scope`** wraps every layout and fx rule (`to ([data-instance],
  [data-<facet>])`), so instances nest and the nearest one wins.
- **`light-dark()` everywhere.** One pair per colour token; colour tokens are
  no longer registered so the pair resolves where it is used. Nested
  `data-theme` regions work. The three-way light / media-dark / explicit-dark
  duplication in every instance is gone.
- **`@function`** module (`--de-alpha`, `--de-tint`, `--de-shade`,
  `--de-mix`, `--de-space`, `--de-fluid`, `--de-dur`, `--de-shadow`), used for
  derived tokens under `@supports at-rule(@function)`.
- **Typed `attr()` knobs** backed by `@property`: `data-cols`, `data-span`,
  `data-hue`, `data-measure`, `data-tilt`.
- `contrast-color()`, `sibling-index()`, `if()` (experimental), style queries
  promoted to capabilities; `--de-has-*` flags detect `@scope`, `@function`,
  typed `attr()`, `sibling-index()`, `contrast-color()`.

### Design defaults
- A true reset layer: zero margins everywhere, spacing by `gap` and padding.
- One page column: masthead, main, aside and footer share the centered
  measure; nothing touches the viewport edge.
- Links underlined only in running text.
- Removed the machine-generated tells from core: side-bar callouts, tinted
  rounded boxes, pill badges, card shadows and hover lifts, zebra tables.
  See docs/design-defaults.md.
- Editorial re-palettised (paper white, ink, cold accent; no eyebrows);
  botanical uses typographic ornaments instead of emoji.

### Fixes
- Density mode had no effect: semantic.layout.css re-declared the spacing
  scale as literals. Removed.
- `@property` registrations with `rem` initial values were silently dropped.
- `[data-engine-off]` opt-out now works (moved to the last layer, covers
  descendants).
- `::backdrop` rules are scoped and layered; no `!important` anywhere.
- `container-type: style` and `container-type: style-state` (invalid)
  removed; style-query detection uses a self-probe.
- Reduced motion no longer uses global `!important` overrides.
- Nested comments in the layer statement broke bundling; the build now
  re-emits the layer order at the top of every file.
- Experimental modules are a separate entry instead of being imported by
  default.

### Family gallery
- `examples/family/`: one page rendering all 43 shared components across
  circuit, jjhub, noitroidvania and design-engine, with per-system snippet
  modules, a no-cache static server and `npm run sync:family`.

### Package
- `@erisera-code/circuit-engine`; exports for `engine`, `core`, `experimental`
  and per-instance files; `npm test` (node:test) enforces zero specificity,
  layer discipline, token hygiene, `light-dark()` discipline, and that modern
  syntax survives the bundle.
