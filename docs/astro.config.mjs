// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Circuit's syntax palette is fixed across every theme (see src/tokens.css) —
// this is the same rule applied to Starlight's real Shiki/Expressive-Code
// pipeline, not just the hand-rolled highlighting in the showcase demo.
// Code surfaces stay dark regardless of page light/dark mode (--code-bg),
// so one theme covers both.
const circuitShikiTheme = {
  name: 'circuit',
  type: 'dark',
  colors: {
    'editor.background': '#0f172a',
    'editor.foreground': '#e2e8f0',
  },
  tokenColors: [
    { scope: ['comment'], settings: { foreground: '#8b93a1', fontStyle: 'italic' } },
    { scope: ['string', 'string.quoted'], settings: { foreground: '#0f9d63' } },
    { scope: ['keyword', 'keyword.control', 'storage.type', 'storage.modifier'], settings: { foreground: '#d6337d' } },
    { scope: ['entity.name.function', 'support.function'], settings: { foreground: '#1d6fbf' } },
    { scope: ['constant.numeric'], settings: { foreground: '#9333d6' } },
    { scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: '#b45f06' } },
    { scope: ['entity.other.attribute-name'], settings: { foreground: '#1d8f8f' } },
    { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'], settings: { foreground: '#7c4fd6' } },
    { scope: ['constant.language', 'constant.language.boolean'], settings: { foreground: '#c0392b', fontStyle: 'bold' } },
    { scope: ['punctuation', 'punctuation.definition', 'punctuation.separator'], settings: { foreground: '#94a3b8' } },
  ],
};

export default defineConfig({
  site: 'https://circuit.erisera.com',
  integrations: [
    starlight({
      title: 'Circuit',
      description: 'The erisera OSS design system — one set of tokens, one accent hue per tool.',
      logo: {
        src: '../src/marks/circuit.svg',
      },
      customCss: ['./src/styles/circuit-bridge.css'],
      expressiveCode: {
        themes: [circuitShikiTheme],
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/erisera-code/circuit' },
      ],
      sidebar: [
        { label: 'Overview', slug: 'index' },
        {
          label: 'Foundations',
          items: [
            { label: 'Color', slug: 'color' },
            { label: 'Typography', slug: 'typography' },
            { label: 'Spacing & elevation', slug: 'spacing' },
          ],
        },
        {
          label: 'Applied',
          items: [
            { label: 'Components', slug: 'components' },
            { label: 'Search palette', slug: 'search-palette' },
            { label: 'Logo & marks', slug: 'marks' },
          ],
        },
      ],
    }),
  ],
});
