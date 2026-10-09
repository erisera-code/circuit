# CSS feature map

Every modern CSS capability the engine uses, the verified syntax, the module
decision — **core** (always on), **progressive** (`@supports`-guarded or
harmless where unsupported), **experimental** (separate entry) — and support
as of September 2026. Support notes come from the modern-web-guidance
Baseline data and from probing Chromium 148 directly; re-check before relying
on a "pending" engine.

## Cascade

| feature | syntax | module | support |
|---|---|---|---|
| Cascade layers + sublayers | `@layer a, a.x, b;` | core | Baseline |
| `:where()` / `:is()` / `:has()` | structural selectors | core | Baseline |
| `@scope … to (…)` | rule facets, nested instances | progressive (rules ignored elsewhere) | Chrome 118, Safari 17.4, Firefox 144 — Baseline Newly Available |
| `@supports at-rule(@x)` | capability flags | progressive | Chromium; unknown = false, safe |
| `all: revert` in the last layer | `[data-engine-off]` | core | Baseline |

## Tokens & colour

| feature | syntax | module | support |
|---|---|---|---|
| `light-dark()` | every colour token | core | Baseline 2024 |
| `color-scheme` on nested regions | `data-theme` anywhere | core | Baseline |
| `@property` (numeric, length, angle only) | knobs, effect values | core | Baseline 2024 |
| `oklch()` / `color-mix(in oklab …)` | palettes, tints | core | Baseline |
| relative colour `oklch(from …)` | tints, `data-hue` | progressive | Baseline 2024 |
| `contrast-color()` | accent foreground | progressive | Chromium 148 ✓, Safari ✓ (probe) |
| `@function` custom functions | derived tokens | progressive, gated by `at-rule()` | Chromium 139+ only |
| `attr(name type(<syntax>), fallback)` | knobs | progressive | Chromium 133+ |
| `sibling-index()` / `mod()` | zine tilt ramp | progressive | Baseline Newly Available (Aug 2026) |
| Container style queries `@container style()` | variants, flags | capabilities | Baseline Newly Available (May 2026) |
| `if()` | inline conditionals | experimental | Chromium 137+ |

## Layout

| feature | syntax | module | support |
|---|---|---|---|
| `gap` on grid/flex (no margins) | flow rhythm | core | Baseline |
| `min(100% - 2 * gutter, measure)` | page column | core | Baseline |
| `grid` + `auto-fill` / `minmax` | card grids | core | Baseline |
| `subgrid` | `[data-subgrid]` | progressive | Baseline 2023 |
| Container size queries `@container de (…)` | not used for the anchor (would need containment); media queries instead | — | — |
| Logical properties | throughout | core | Baseline |
| `dvh` | document min height | core | Baseline |
| `interpolate-size` / `calc-size()` | auto-height reveals | progressive | Chromium, Safari 26 |
| Anchor positioning | tooltips, anchored popovers | progressive | Chromium, Safari 26; Firefox pending |
| `@position-try` | flips | experimental | volatile |

## Motion

| feature | syntax | module | support |
|---|---|---|---|
| Duration tokens + `--de-animation-reduced` | reduced motion without `!important` | core | Baseline |
| `@starting-style` + `transition-behavior: allow-discrete` | dialog/popover entry | progressive | Baseline 2024 |
| Scroll-driven animations `animation-timeline: view()` | `[data-reveal]`, `[data-parallax]` | progressive | Chromium, Safari 26; Firefox pending |
| View transitions (same-document) | `[data-transition]` | progressive | Baseline Newly Available |

## Typography & text

| feature | syntax | module | support |
|---|---|---|---|
| `text-wrap: balance` (headings) / `pretty` (prose) | base | core | Baseline / pretty: Chromium, Safari 26 |
| `text-decoration-thickness: from-font`, `text-underline-offset`, `skip-ink` | links | core | Baseline |
| `font-variant-numeric: tabular-nums` | tables, time, data | core | Baseline |
| `hanging-punctuation` | anchor | core | Safari only; harmless |
| `@counter-style`, `::marker` | lists | core | Baseline |
| `::first-letter` drop caps, `column-*` | editorial | instance | Baseline |
| `::selection`, `::highlight()`, `::spelling-error` | highlights | progressive | Baseline / partial |

## Forms & overlays

| feature | syntax | module | support |
|---|---|---|---|
| `accent-color`, `caret-color` | anchor | core | Baseline |
| `:user-valid` / `:user-invalid` | validation | core | Baseline 2023 |
| `field-sizing: content` | `[data-auto-size]` | progressive | Chromium, Safari 26 |
| `<dialog>` + scoped `::backdrop` | dialogs | core | Baseline |
| Popover API `[popover]`, `:popover-open` | popovers, tooltips | core | Baseline 2024 |
