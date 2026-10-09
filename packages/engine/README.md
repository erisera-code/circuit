# @erisera-code/circuit-engine

A headless, class-free CSS design engine. It styles **bare semantic HTML** by
element type and tree position, is driven by `light-dark()` tokens and
cascade layers, and ships nine complete designs that can be applied whole or
**mixed facet by facet** — take one design's palette, another's type, a
third's layout.

> Write HTML. Link a stylesheet. Get a designed document. No classes, no
> build step required to use it.

```html
<link rel="stylesheet" href="https://unpkg.com/@erisera-code/circuit-engine/dist/engine.min.css">
<body data-engine data-instance="editorial">
  <header><h1>…</h1><p>…</p><nav>…</nav></header>
  <main><article>…</article></main>
  <footer>…</footer>
</body>
```

## Install

```bash
npm install @erisera-code/circuit-engine
```

| import | contents |
|---|---|
| `@erisera-code/circuit-engine` (or `/engine.min.css`) | core + all nine designs |
| `@erisera-code/circuit-engine/core.min.css` | core only (neutral default look) |
| `@erisera-code/circuit-engine/instances/<name>.min.css` | one design, load after core |
| `@erisera-code/circuit-engine/experimental.min.css` | opt-in volatile modules (`if()`, `@position-try`) |
| `@erisera-code/circuit-engine/src/index.css` | the raw `@import` graph — works with no build |

## Use

Opt a subtree in with one attribute. Everything inside is styled; everything
outside is untouched. The anchor can be `html`, `body`, `main` or any element.

```html
<main data-engine>
  <article>
    <header><p><time datetime="2026-09-07">Sep 7, 2026</time> · <address>Ada</address></p></header>
    <h2>A title</h2>
    <p>Body prose…</p>
  </article>
</main>
```

### Designs

`data-instance` applies a whole design. Each one is a complete restyling of
the same markup, not a hue swap.

| instance | character |
|---|---|
| `default` | the neutral control: platform type, hairlines, no ornament |
| `editorial` | magazine: serif, paper-white and ink, multi-column sections, drop caps, double-rule masthead |
| `brutal` | Swiss grid: heavy black rules, monospace labels, hard offset shadows, one acid accent |
| `glass` | frosted panels over a gradient mesh |
| `terminal` | phosphor-green CRT with window chrome, `$` prompts, scanlines |
| `zine` | risograph collage: rotated scraps, marker swipes, spot colours |
| `synthwave` | neon nightscape: perspective grid floor, glowing sun |
| `blueprint` | drafting sheet: graph paper, title block, FIG. labels |
| `botanical` | garden greens, serif, typographic ornaments, soft pots |
| `circuit` | the erisera docs system: hue-driven accent, cool slate, Plex + JetBrains Mono |
| `jjhub` | the JJHub terminal UI: monospace, `[ bracketed ]` buttons, box-drawing rules |
| `noitroidvania` | Ashfall game chrome: square, 1px lines, no shadows, glyph + colour states |
| `snake` | Impressive Snake HUD: deep navy, translucent panels, neon signal colours, tracked labels |

### Facets: mix designs

Every design is five facets. Each facet has its own attribute and its own
cascade sublayer, so you can override any one of them:

| facet | attribute | holds |
|---|---|---|
| palette | `data-palette` | colour tokens |
| type | `data-type` | fonts, sizes, leading, text treatment |
| shape | `data-shape` | radii, borders, shadows |
| layout | `data-layout` | how the tree is arranged |
| fx | `data-fx` | decoration, texture, motion |

```html
<body data-engine data-instance="editorial" data-palette="synthwave" data-fx="none">
<body data-engine data-palette="brutal" data-type="editorial" data-layout="glass">
```

Facets can also be applied to a nested region: a `<section data-instance="terminal">`
inside an editorial page is a terminal window in a magazine. Rule facets are
`@scope`d, so the nearest region wins.

### Modes

Region attributes, valid on the anchor or on any nested element:

| attribute | values | effect |
|---|---|---|
| `data-theme` | `light` / `dark` / `auto` | forces a side of every `light-dark()` token |
| `data-density` | `compact` / `cozy` / `comfortable` | rescales the spacing unit |
| `data-contrast` | `more` / `less` | line and muted contrast |
| `data-motion` | `reduced` / `full` | zero or restore every duration |
| `data-wide` | — | a wider page column |

### Knobs

Typed attribute values feed registered custom properties (Chromium today,
enumerated fallbacks elsewhere):

```html
<ul data-cols="5">…</ul>              <!-- any integer -->
<article data-span="2">…</article>    <!-- grid-column span -->
<section data-hue="30">…</section>    <!-- re-hue the accent for one region -->
<article data-measure="52ch">…        <!-- reading measure -->
<figure data-tilt="-2deg">…           <!-- rotation -->
```

### Escape hatches

```html
<button data-variant="danger">Delete</button>   <button data-variant="ghost">Cancel</button>
<div data-grid> … </div>                          <de-stack> … </de-stack>   <de-cluster> … </de-cluster>
<div data-engine-off> host-styled island </div>
```

## The vocabulary

Forty-three components shared with the circuit, jjhub and noitroidvania design
systems are bound classlessly: roles, data attributes and placement. Buttons
(`data-variant`, `data-icon`, `role=group`), fields with hints and errors,
switches (`role=switch`), badges and dots (`<data>`), chips (`data-chip`),
banners and toasts (`data-banner`, `data-toasts`), the command palette
(`dialog[data-palette]`), terminal blocks (`<pre>` with `<kbd>`/`<samp>`),
code figures with syntax tones (`data-sx`), list rows (`role=listbox`), pagers
(`rel=prev|next`), boards (`data-board`), nested shells (`data-shell`),
empty states, spinners (`aria-busy`), avatars, swatches, the categorical
ramp (`data-step`), patterns, scroll areas, scrims and the theme toggle.
[docs/element-binding-map.md](docs/element-binding-map.md) lists every
binding; the `#vocabulary` section of the example shows all of them.

## Design defaults

The neutral look is a typeset document, not a generated landing page: zero
margins (spacing by `gap` and padding), one centered page column shared by
masthead, body and footer, links underlined only in running text, callouts as
ruled sidenotes rather than tinted boxes with a coloured side bar, hairline
cards without shadows, square badges, no eyebrows, no emoji.
[docs/design-defaults.md](docs/design-defaults.md) lists every choice and
the machine-generated tells it avoids.

## How it works

- **Zero specificity.** Every selector is wrapped in `:where()`; your styles
  always win at equal weight. A test fails the build otherwise.
- **Layers.** `@layer de.reset, de.properties, de.tokens, de.modes, de.base,
  de.structure, de.components, de.capabilities, de.instances.palette …
  de.instances.fx, de.instances, de.experimental, de.utilities`.
- **`light-dark()` tokens,** unregistered so they resolve where used and
  nested themes work.
- **`@scope`** around every layout / fx rule so designs nest.
- **`@function`** for derived tokens, gated with `@supports at-rule(@function)`.
- **Typed `attr()` + `@property`** for knobs.
- **Container style queries** for variants (`--de-variant: featured | muted`)
  and capability flags (`--de-has-*`).

[docs/architecture.md](docs/architecture.md) explains each decision;
[docs/css-feature-map.md](docs/css-feature-map.md) lists every feature with
support status; [docs/element-binding-map.md](docs/element-binding-map.md)
lists every binding; [docs/authoring-an-instance.md](docs/authoring-an-instance.md)
is the guide for writing a design.

## Browser support

Core: evergreen browsers with `:has()`, `@layer`, `light-dark()`,
`color-mix()` (Chrome 123+, Safari 17.5+, Firefox 120+). Rule facets need
`@scope` (Chrome 118+, Safari 17.4+, Firefox 144+); without it a design
degrades to its token facets. `@function`, typed `attr()`, `if()` and
`contrast-color()` are progressive and gated.

## The family gallery

`examples/family/` shows every component of the shared vocabulary side by side
across five systems: [circuit](https://github.com/erisera-code/circuit),
[jjhub](https://github.com/erisera-code/jjhub),
[noitroidvania](https://github.com/johnhenry/noitroidvania),
[impressive-snake](https://github.com/johnhenry/impressive-snake) and this engine.
Each pane is an iframe that loads that system's real stylesheet and real
markup, so gaps show up as gaps. `npm run sync:family` copies the sibling
checkouts' CSS into `examples/family/vendor/`; `npm run serve` then serves it
at `/examples/family/`.

## Storybook

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # storybook-static/
```

Storybook 10 with one story per component per system (258 stories): each is
that system's real stylesheet on real markup, isolated in an iframe, plus a
**Compare** section that puts all five systems side by side. The toolbar
switches the colour scheme and which design-engine design renders. Stories are
generated from the vocabulary list with `npm run stories`.

## Contrast and theme audit

`scripts/audit.browser.js` measures, for every design in both colour schemes,
84 probe points in the example page: composited foreground/background pairs
and their WCAG ratio (text 4.5:1, large text 3:1, control borders 3:1),
whether the light and dark themes actually differ, and which components a
design leaves at core defaults. Run it from the dev server's page:

```js
const { audit } = await import('/scripts/audit.browser.js'); await audit();
```

The summary is returned and the full result is written to `reports/audit.json`
(plus `reports/instances/<design>.md` via the helper in the session notes).

## Develop

```bash
npm install
npm run build     # dist/
npm test          # node:test — specificity, layers, tokens, bundle, markup
npm run serve     # http://127.0.0.1:4173/examples/  (no-cache static server)
```

## License

MIT
