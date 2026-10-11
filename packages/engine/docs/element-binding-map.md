# Element-binding map

How the engine attaches styles: **by element type and tree position, not by
class.** Classes and custom elements are escape hatches.

## The binding axes

1. **Element type** — `article`, `header`, `nav`, `aside`, `figure`,
   `blockquote`, `details`, `form`, `table`, `time`, `address`… The tag name
   is the hook.
2. **Tree position** — child/descendant, sibling, `:first-child`, `:has()`.
   Where an element sits decides what it means.
3. **Attributes as knobs** — `data-*` attributes carry *intent* the tree
   cannot express (`data-variant`, `data-tone`) or *values* (`data-cols`,
   `data-hue`), never identity.

## Bindings in core

| markup | reads as | where |
|---|---|---|
| `[data-engine] > header` | masthead, in the page column | structure/sections |
| `[data-engine] > main` / `> aside` / `> footer` | page column regions | structure/sections |
| `article > header` | byline; `time`/`address` inline, muted | structure/articles |
| `ul:has(> li > article)` | card grid; each article a card | structure/cards |
| `[data-grid] > article` | card | structure/cards |
| `nav ul` / `nav > a` | horizontal link run, plain links | structure/nav |
| `aside`, `[role=note|status|alert]` | ruled sidenote; tone in the rule colour | components/callouts |
| `blockquote` (+ `footer > cite`) | indented, hairline, attribution line | base/typography |
| `details > summary` | ruled disclosure with a drawn caret | components/details |
| `form > p:last-child > button:last-child`, `form > button:last-child`, `menu button` | primary action | components/buttons |
| `button[data-variant=danger|ghost]` | intent variants | components/buttons |
| `label:has(> input)` | stacked field; inline for checkbox/radio | base/forms |
| `table` with `caption`, `thead`, `tfoot` | ruled data table, caption as title | base/tables |
| `dl > dt + dd` | key/value set | base/lists |
| `figure > img + figcaption` | media with caption | base/media |
| `dialog`, `[popover]`, `[role=tooltip]` | overlays; scoped backdrop; entry transitions | components/* + capabilities |
| `data`, `[data-badge]` | square hairline label | components/badges |
| `[role=tablist] > [role=tab]` | tabs | components/tabs |
| `nav[aria-label=breadcrumb] ul` | breadcrumb trail | components/breadcrumbs |
| `[role=menu] > [role=menuitem]` (+ `data-cursor` on the keyboard-cursored item) | menu | components/menus |
| `[data-cols]`, `[data-span]`, `[data-hue]`, `[data-measure]`, `[data-tilt]` | typed knobs | capabilities/knobs |
| `[data-reveal]`, `[data-parallax]`, `[data-scroll-progress]` | scroll-driven motion | capabilities/scroll-motion |
| `[data-snap]`, `[data-snap=x]` | scroll snapping / carousel | capabilities/scroll-snap |
| `[data-counter=checks|zero|steps]`, `[data-counted]` | counter styles | capabilities/counters-markers |
| `button[data-icon]`, `button[data-variant=link]` | icon button, link-styled button | components/buttons |
| `[role=group] > button` | joined button group / split button | components/buttons |
| `label > small`, `[aria-invalid]`, `input[role=switch]` | field hint/error, switch | base/forms |
| `[data-chip]` (+ `data`, `button`) | chip with count and remove | components/chips |
| `[data-banner][role=…]` | full-width banner with actions | components/notices |
| `[data-toasts] > [data-toast][role=…]` | toast tray and toasts | components/notices |
| `[data-stage]` | a positioned demo stage that fixed things stay inside | components/notices |
| `dialog[data-palette]` + `form[role=search]` + `ul[role=listbox]` | command palette | components/palette |
| `pre[data-terminal]` / `pre:has(> samp)` with `kbd`/`samp` lines | terminal block | components/terminal |
| `figure:has(> pre) > figcaption` | code block with caption and copy | components/terminal |
| `[data-sx=kw|str|fn|cm|num|tag|attr|punct|type|bool]` | syntax tones | components/terminal |
| `[data-empty]`, `[aria-busy=true]`, `progress:not([value])` | empty state, spinner, indeterminate bar | components/states |
| `[data-avatar]`, `[data-swatch]`, `[data-step=1…6]`, `[data-pattern]`, `[data-scroll]`, `[data-scrim]`, `button[data-theme-toggle]` | avatar, swatch, categorical ramp, background pattern, scroll area, scrim, theme toggle | components/states |
| `ul[role=listbox] > li[role=option]` (+ `aria-selected`, `data-cursor`, `aria-disabled`) | list rows | structure/regions |
| `nav[aria-label=pagination] > a[rel=prev|next]` | pager | structure/regions |
| `[data-board] > section > h3 + ul` | board columns of cards | structure/regions |
| `[data-engine] [data-shell]` with `header`, `nav`, `[data-resize]`, `main`, `footer` | nested app shell | structure/regions |
| `[data-engine-off]` | opt a subtree out of the engine | utilities |
| `input[type=range]` | range slider | components/slider |
| `fieldset[data-segmented] > label:has(input:checked)` | segmented control; the legend and radio inputs are hidden by the binding itself, not a utility class | components/segmented |
| `[data-combobox]` with an `input[role=combobox]` + `[role=listbox]` | combobox / autocomplete; row styling is the existing listbox rules in structure/regions | components/combobox |
| `[data-skeleton]`, `[data-skeleton=text\|avatar]` | loading placeholder | components/skeleton |
| `[data-stat]` with a `data` value + a trailing `[data-trend=up\|down\|flat]` | statistic / stat card | components/stat |
| `[data-rating]` with `--de-rating-value` | read-only star rating | components/rating |
| `ol[data-steps] > li[data-status=done\|current]` | stepper; numbers from a CSS counter | components/stepper |
| `ol[data-timeline] > li[data-status=current]`, `> time` | timeline | components/timeline |
| `[data-carousel]` wrapping `[data-snap=x]`, `+ nav`, `+ [role=tablist][data-dots]` | carousel; the scroll-snap mechanics live in capabilities/scroll-snap | components/carousel |
| `dialog[data-sheet=start\|end\|top\|bottom]` | drawer — an edge-anchored dialog, same `showModal()`/`close()`/Escape/backdrop contract as any other `<dialog>` | components/dialogs + capabilities/entry-transitions |
| `article[role=dialog]` with `header` (h2, tablist, p[role=status], search, close), `div` of `section[role=tabpanel]` + `section` + `aside`, a `section[aria-label]` tray, `footer` of `kbd` hints | workbench panel: columns that share the panel's height | components/panels |
| `li[role=option] > i + button + strong + small + data + small + span` (+ `data-on`) | named row: glyph, star, name, meta, value, tags, actions | components/panels |
| `ul[data-rows] > li > small + strong + button` (+ `data-empty`) | keyed row: kind, name, actions | components/panels |
| `ul[role=listbox][data-grid] > li[role=option]` (+ `data-redacted`, `i[data-kind=swatch]`, `[data-kind=thumb]`) | card rows and pictures | components/panels |
| `section[data-track] > header + progress + ul > li[data-on]` | track: a meter with its unlocks | components/panels |
| `section[data-axis] > header(button, span, button) + div(b, i[data-side]) + footer(data, data)` | axis: a signed meter between two poles | components/panels |
| `section[role=note] > h4 + ul`, `p[data-empty]`, `p[data-tone]` | note group: leads and items | components/panels |

## Region attributes (anchor or any nested element)

| attribute | values |
|---|---|
| `data-instance` | preset: all five facets of one design |
| `data-palette` / `data-type` / `data-shape` / `data-layout` / `data-fx` | one facet from any design |
| `data-theme` | `light` / `dark` / `auto` |

A nested `[data-engine]` inside another anchor is a new column, not a new
design: it inherits every token (and so the instance) of the anchor above it.
| `data-density` | `compact` / `cozy` / `comfortable` |
| `data-contrast` | `more` / `less` |
| `data-motion` | `reduced` / `full` |
| `data-wide` | wider page column |

## The zero-specificity pattern

Every compound in every selector is wrapped in `:where()`; only
pseudo-elements sit outside. With nesting, nest `:where()` blocks, never bare
`& article`. Inside `@scope`, selectors are implicitly relative to the root;
`:where(:scope)` is the root itself. `npm test` enforces this.

```css
@layer de.structure {
  :where([data-engine]) :where(ul, ol):where(:has(> li > article)) { /* card grid */ }
}
@layer de.instances.layout {
  @scope (:where([data-engine], [data-engine] *):where([data-instance="zine"]:not([data-layout]), [data-layout="zine"]))
      to ([data-instance], [data-layout]) {
    :where(ul:has(> li > article)) { /* zine's version */ }
  }
}
```

## Escape hatches

- **Custom elements** (no JS): `<de-stack>`, `<de-cluster>`, `<de-grid>`,
  `<de-bleed>` — structure/primitives.
- **Utility classes** (the only classes in the engine): `.stack`, `.cluster`,
  `.grid`, `.bleed`, `.center`, `.wide`, `.text-muted`, `.text-accent`,
  `.text-center`, `.visually-hidden` — utilities/optional.

## What the engine never styles by

- class as component identity (no `.card`, `.btn`);
- `id` (fragment links, dialog/popover targets, a11y wiring only);
- `head` or anything outside `[data-engine]`.
