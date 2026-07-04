# Circuit

The [erisera](https://erisera.com) OSS design system — one set of tokens, one accent hue per tool.

**[Live showcase](https://circuit.erisera.com)** · every component on this page is real, imported from `src/`.

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

One construction grammar — a small orthogonal trace on a 5-point grid, straight strokes only — six distinct patterns, each encoding an idea from its tool:

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

## Status

`v0.0.1` — pre-release. Tokens and components are stable enough to build against; expect additions (data table, toast, modal, dropdown — the app-chrome tier needed by clawser and mcp-query's apps) as those tools land, not breaking changes to what's here.

## License

MIT
