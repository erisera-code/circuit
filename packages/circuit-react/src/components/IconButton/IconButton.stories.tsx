import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

// Sample icons
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Primitives/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <SettingsIcon />,
    'aria-label': 'Settings',
  },
};

export const Ghost: Story = {
  args: {
    icon: <CloseIcon />,
    variant: 'ghost',
    'aria-label': 'Close',
  },
};

export const Outline: Story = {
  args: {
    icon: <MenuIcon />,
    variant: 'outline',
    'aria-label': 'Menu',
  },
};

export const AsLink: Story = {
  args: {
    icon: <GitHubIcon />,
    as: 'a',
    href: 'https://github.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    variant: 'ghost',
    'aria-label': 'GitHub',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <IconButton icon={<SettingsIcon />} size="sm" aria-label="Settings (small)" />
      <IconButton icon={<SettingsIcon />} size="md" aria-label="Settings (medium)" />
      <IconButton icon={<SettingsIcon />} size="lg" aria-label="Settings (large)" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <IconButton icon={<GitHubIcon />} variant="default" aria-label="Default" />
      <IconButton icon={<GitHubIcon />} variant="ghost" aria-label="Ghost" />
      <IconButton icon={<GitHubIcon />} variant="outline" aria-label="Outline" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    icon: <SettingsIcon />,
    disabled: true,
    'aria-label': 'Settings (disabled)',
  },
};

export const HeaderExample: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      background: 'var(--ds-color-surface)',
      borderRadius: '0.5rem',
      border: '1px solid var(--ds-color-border)',
    }}>
      <IconButton
        icon={<GitHubIcon />}
        variant="ghost"
        as="a"
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View on GitHub"
      />
      <IconButton icon={<SettingsIcon />} variant="ghost" aria-label="Settings" />
      <IconButton icon={<MenuIcon />} variant="ghost" aria-label="Menu" />
    </div>
  ),
};
