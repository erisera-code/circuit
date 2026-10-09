# Design defaults

What the engine does before any instance is applied, and why. The neutral
`default` look is a control, not a template: it should read as a typeset
document, not as a generated landing page.

## The reset layer (`de.reset`)

Only things that fix browser defaults belong here; taste lives in `de.base`.

| rule | why |
|---|---|
| `box-sizing: border-box` on everything | the only sane box model |
| `margin: 0` on everything (except fieldset/legend) | the engine spaces with `gap` and `padding`, never element margins, so nothing collapses or double-spaces; `auto` is the one margin the engine writes, for centering |
| anchor carries no chrome (`padding: 0; border: 0; background-image: none`) | `<html data-engine>` and `<body data-engine>` start from the same canvas |
| media is `display: block; max-inline-size: 100%; block-size: auto` | no phantom baseline gap, no overflow |
| `img { font-style: italic }` | broken-image alt text reads as a caption |
| form controls `font: inherit; color: inherit; letter-spacing: inherit` | controls set in the page's type, not the OS's |
| `textarea:not([rows]) { min-block-size: 6lh }` | a usable field when the author gave no size |
| `cursor: pointer` on buttons, summaries, labels that wrap an input | affordance |
| `address, cite, dfn, var { font-style: normal }` | UA italics carry no meaning |
| `sub, sup { line-height: 0 }` | no line-height jitter |
| `:focus-visible` ring, `:focus:not(:focus-visible)` none | keyboard users see focus, mouse users don't get rings |
| `:target { scroll-margin-block-start }` | fragment links clear sticky headers |
| `interpolate-size: allow-keywords` | height:auto transitions where supported |
| reduced motion collapses the duration tokens | every engine duration is a token; no `!important` anywhere |

Not in the reset: heading sizes, list markers, text wrapping, spacing — those
are typographic decisions and live in `de.base` / `de.structure` where an
instance is expected to change them.

## Spacing

- **No margins.** Prose containers (`main`, `article`, `section`, `aside`,
  `header`, `details`, `fieldset`, `dialog`, callouts) are vertical grids with
  `row-gap: var(--de-flow)`. Headings ask for extra room above via
  `padding-block-start`, so hierarchy is spatial: paragraph→paragraph is one
  step, anything→h2 is three, section→section is two plus the section's own
  padding. Lists space items with padding.
- **One page column.** Every direct child of the anchor (masthead, main,
  footer, aside) is `min(100% - 2 × gutter, measure)` and centered. That is
  what keeps a display title and the body on the same axis on a wide screen;
  the previous version centered `main` only, so the masthead hugged the left
  edge while the body sat in the middle.
- **Nothing touches the viewport.** The anchor has block padding of six
  steps; the gutter is `clamp(1rem, 4vw, 3rem)`.
- **Density** (`data-density`) rescales the whole thing from one token.
- **Panels are inset by one token.** The core pads only what it decorates.
  A design that gives a section, figure, table, form, blockquote or the
  masthead a border/background sets `--de-inset` (once, on its root, or per
  element) and the core applies it as padding — content never sits against
  an edge the design drew.

## Links

Underlined only in running text (`p`, `li`, `dd`, `td`, `figcaption`,
`blockquote`, `summary`, `small`), where colour alone would not be a
sufficient affordance. Plain (inherit colour, no underline) in navigation,
headings, cards and footers, where context already says "link". Underlines
use `from-font` thickness and skip ink.

## Things the engine deliberately does not do

These are the recognisable marks of machine-generated pages. The research
behind the list: [Developers Digest, "AI design slop"](https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it),
[funboy322/avoid-ai-design](https://github.com/funboy322/avoid-ai-design),
[925studios, "AI slop web design"](https://www.925studios.co/blog/ai-slop-web-design-guide),
[Nick Babich, "How to spot AI-generated design"](https://uxplanet.org/how-to-spot-ai-generated-design-697aaabe76c8).

| tell | what the engine does instead |
|---|---|
| callout = rounded box, tinted fill, coloured left bar | a printed sidenote: rules above and below, smaller type, tone only in the rule colour, the label written in markup (`<strong>Note.</strong>`). This is a hard rule for every design, enforced by `test/tells.test.mjs`: no quote, callout, banner or toast may carry a coloured side rule; tone goes into a glyph or label, a full hairline, or rules above and below |
| blockquote with an accent-coloured left bar | indent + a hairline in the line colour, body-colour text, no italics |
| every card `rounded-2xl` + drop shadow + hover lift | hairline border, small radius, no shadow, no transform; only the border colour changes on hover, and only when the card is interactive |
| pill badges with tinted backgrounds | square-cornered hairline labels; tone changes the text colour |
| an "eyebrow" label above every heading | none in core; an instance uses labels only where they encode something (drafting numbers, `//` comments) |
| purple/blue gradients, glows, glassmorphism by default | none in core; they exist only as the *identity* of specific instances (synthwave, glass) |
| Inter / one generic sans everywhere | the type facet is a first-class part of every design; the default uses the platform UI face and nothing else |
| emoji as icons | typographic ornaments only (❦ ❧), never emoji |
| uniform `gap-4 / p-6` spacing | a stepped flow scale with more room before headings and between sections than inside them |
| zebra-striped, surface-filled tables | hairline rules, a heavier rule under the header, no fill |
| numbered 01/02/03 sections regardless of content | numbering only where order is information (blueprint's FIG. sheets) |
| centered hero with three feature cards and a CTA | the canonical markup is a document, not a landing page |
| cream + serif + terracotta; near-black + acid accent | the editorial palette is paper-white and ink with a cold accent; brutal keeps its acid yellow because that *is* Swiss poster grammar, and it is one instance among nine |

If you add an instance, run through this table before calling it done.
