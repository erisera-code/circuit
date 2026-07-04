# Circuit

The [erisera](https://erisera.com) OSS design system — one set of tokens, one accent hue per tool.

> Not yet deployed to `circuit.erisera.com` — `docs/` (a Starlight site) and `showcase/index.html` (a standalone interactive demo) are both built and verified locally; see [Docs site](#docs-site) below.

## Why

erisera ships several independent open-source tools — [ai.matey](https://github.com/johnhenry/ai.matey), [mcp-query](https://github.com/johnhenry/mcp-query), [ecmanim](https://github.com/johnhenry/ecmanim), [clawser](https://github.com/johnhenry/clawser), [andbox](https://github.com/johnhenry/andbox), [objectify](https://github.com/johnhenry/objectify) — each with its own docs site. Circuit is what keeps them feeling like one family instead of six unrelated projects: identical neutrals, type, spacing, and components, with exactly **one** thing that changes per site — an accent hue.

## The three rules

1. **Neutrals are hue-stable.** The gray scale never rotates with the accent — scaffolding shouldn't clash with whichever tool's hue is active.
2. **Semantic color is fixed.** `success` / `warning` / `error` / `info` mean the same thing on every site, always the same color.
3. **Syntax highlighting is fixed.** Code reads identically whether you're on matey's docs or ecmanim's.

Only `--accent` (derived from `--hue`) changes per tool. See [`src/tokens.css`](src/tokens.css).

## Install

```sh
npm install @erisera/circuit
```

```css
@import '@erisera/circuit/tokens.css';
@import '@erisera/circuit/themes.css';   /* per-tool --hue overrides */
@import '@erisera/circuit/components.css';
@import '@erisera/circuit/palette.css';
```

Apply a theme and (optionally) dark mode via classes on your root element:

```html
<html class="theme-matey">        <!-- or theme-mcp-query, theme-ecmanim, theme-clawser, theme-andbox, theme-objectify -->
<html class="theme-matey dark">   <!-- dark mode -->
```

## What's in the box

| File | Contents |
|---|---|
| `src/tokens.css` | Neutral scale, semantic colors, accent formula, type, spacing, radius, elevation, syntax colors |
| `src/themes.css` | Per-tool `--hue` overrides + the hue registry (see below) |
| `src/components.css` | Docs shell (header/sidebar/pager), code block, code groups, terminal block, admonitions, API parameter list, buttons, inputs, badges, tabs |
| `src/palette.css` + `src/palette.js` | A working search / command palette — framework-agnostic, ~150 lines, no dependencies |
| `src/marks/*.svg` | Six standalone logo marks, one per tool, tool hue baked in |
| `showcase/index.html` | The live spec/demo page — open it directly, or serve the repo root with any static file server |

## Hue registry

Nine erisera products, one color wheel, zero collisions. The three existing closed products (nominos, nominos-core, the blog) each reserve their hue plus a ±20° buffer; every new OSS theme sits outside all buffers.

| Product | Hue | Status |
|---|---|---|
| erisera (default) / matey | 25° | shipped |
| nominos | 199° | existing, closed |
| nominos-core | 142° | existing, closed |
| blog | 160° | existing, closed |
| objectify | 70° | shipped |
| andbox | 95° | shipped |
| mcp-query | 250° | shipped |
| ecmanim | 285° | shipped |
| clawser | 340° | shipped |

Blocked union: `[122°, 219°]`. Free arcs: `(45°, 122°)` and `(219°, 365°)`. Adding a 7th OSS tool? Pick a hue in a free arc, ≥20° from every existing stop.

Full wheel diagram: open `showcase/index.html` and scroll to **Color**.

## Logo marks

One construction grammar — a small orthogonal trace on a 5-point grid, straight strokes only — one mark per product, each encoding an idea from what it represents:

- **circuit** — a hub with four satellite nodes (one system, many tools)
- **matey** — a four-way junction (universal adapter)
- **mcp-query** — a closed diamond loop (cache / refetch cycle)
- **ecmanim** — a zigzag (motion / curves)
- **clawser** — three lines converging on a point (a claw)
- **andbox** — a nested square (containment / sandbox)
- **objectify** — a stored object with a reference pointer

Each ships as a standalone SVG in `src/marks/` with the tool's hue baked in — safe to use directly as a favicon, in an OG image template, or in a header lockup (`erisera / <tool>`).

## Search / command palette

```js
import { createCommandPalette } from '@erisera/circuit/palette.js';

createCommandPalette({
  trigger: document.getElementById('search-trigger'),
  pages: [{ title: 'Quickstart', path: 'docs / getting-started', href: '/quickstart' }],
  actions: [
    { title: 'Toggle dark mode', icon: '◐', run: () => document.documentElement.classList.toggle('dark') },
    { title: 'Copy page as Markdown', run: () => navigator.clipboard.writeText(pageMarkdown), feedback: 'Copied' },
  ],
});
```

Doubles as a **family-wide jump hub** (search from matey, land on an ecmanim page) and carries the agent-facing actions — copy this page as Markdown, open its `llms.txt` — that erisera's docs-for-agents positioning depends on.

## Docs site

`docs/` is a real [Astro Starlight](https://starlight.astro.build) site that consumes `@erisera/circuit` via a local `file:..` dependency — proof that the design system actually themes a third-party framework, not just its own showcase.

```sh
cd docs
npm install
npm run dev       # http://localhost:4321
npm run build      # → docs/dist
```

`docs/src/styles/circuit-bridge.css` remaps Starlight's own themeable CSS variables onto Circuit's tokens. One gotcha worth flagging for any future Starlight-based site in the family: Starlight's `<Aside type="tip">` renders using its **purple** color variable, not green — despite "tip" reading as a positive/success signal. Circuit's fixed-semantic-color rule (`tip` → `--success`, always green) only holds if you redirect `--sl-color-purple`, not `--sl-color-green`, onto `--success` (see the bridge file for the full, verified mapping — pulled from Starlight's actual `asides.css` source, not assumed). Syntax highlighting uses a custom Shiki/Expressive-Code theme built from Circuit's fixed `--sx-*` palette (`docs/astro.config.mjs`) — Expressive Code applies its own accessibility contrast normalization on top, so rendered hex values are close to but not pixel-identical to the source tokens.

Not yet wired to auto-deploy: `.github/workflows/deploy-docs.yml` is `workflow_dispatch`-only and needs `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` repo secrets before it can run.

## Status

`v0.0.1` — pre-release. Tokens and components are stable enough to build against; expect additions (data table, toast, modal, dropdown — the app-chrome tier needed by clawser and mcp-query's apps) as those tools land, not breaking changes to what's here.

## License

MIT
