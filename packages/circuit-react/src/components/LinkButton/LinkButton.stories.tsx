import type { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from './LinkButton';

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const meta: Meta<typeof LinkButton> = {
  title: 'Primitives/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'primary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    arrow: {
      control: 'select',
      options: ['right', 'down', 'external', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  args: {
    children: 'Learn more',
    href: '#',
  },
};

export const ReadTheDocs: Story = {
  args: {
    children: 'Read the docs',
    href: '#',
    iconLeft: <BookIcon />,
  },
};

export const ViewOnGitHub: Story = {
  args: {
    children: 'View on GitHub',
    href: 'https://github.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    iconLeft: <GitHubIcon />,
    arrow: 'external',
  },
};

export const Muted: Story = {
  args: {
    children: 'View all posts',
    href: '#',
    variant: 'muted',
  },
};

export const Primary: Story = {
  args: {
    children: 'Get started',
    href: '#',
    variant: 'primary',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'Documentation',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    arrow: 'external',
  },
};

export const NoArrow: Story = {
  args: {
    children: 'Simple link',
    href: '#',
    arrow: 'none',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <LinkButton href="#" size="sm">Small link</LinkButton>
      <LinkButton href="#" size="md">Medium link</LinkButton>
      <LinkButton href="#" size="lg">Large link</LinkButton>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <LinkButton href="#" variant="default">Default variant</LinkButton>
      <LinkButton href="#" variant="muted">Muted variant</LinkButton>
      <LinkButton href="#" variant="primary">Primary variant</LinkButton>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{
      maxWidth: '400px',
      padding: '1.5rem',
      background: 'var(--ds-color-surface)',
      borderRadius: '0.75rem',
      border: '1px solid var(--ds-color-border)',
    }}>
      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem', fontWeight: 600 }}>
        Getting Started
      </h3>
      <p style={{ margin: '0 0 1rem', color: 'var(--ds-color-text-muted)', fontSize: '0.875rem' }}>
        Learn how to set up and configure nominos for your Kubernetes cluster.
      </p>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <LinkButton href="#" variant="primary">
          Read the docs
        </LinkButton>
        <LinkButton href="#" variant="muted" iconLeft={<GitHubIcon />} arrow="external">
          GitHub
        </LinkButton>
      </div>
    </div>
  ),
};
