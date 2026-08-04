import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Avatar size="sm">
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Avatar size="lg">
      {/* Data URI keeps the visual snapshot deterministic (no network) */}
      <AvatarImage
        alt="Gradient avatar"
        src={`data:image/svg+xml;utf8,${encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="%23f97316"/><circle cx="40" cy="30" r="14" fill="%23fff7ed"/><rect x="16" y="50" width="48" height="24" rx="12" fill="%23fff7ed"/></svg>'
        )}`}
      />
      <AvatarFallback>GA</AvatarFallback>
    </Avatar>
  ),
};

export const BrokenImageFallsBack: Story = {
  render: () => (
    <Avatar>
      <AvatarImage alt="" src="/does-not-exist.png" />
      <AvatarFallback>JH</AvatarFallback>
    </Avatar>
  ),
};

export const InContext: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        border: '1px solid var(--ds-border)',
        borderRadius: 'var(--ds-radius-lg)',
        fontFamily: 'var(--ds-font-body)',
      }}
    >
      <Avatar>
        <AvatarFallback>JH</AvatarFallback>
      </Avatar>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 'var(--ds-text-sm)', fontWeight: 500 }}>
          John Henry
        </span>
        <span style={{ fontSize: 'var(--ds-text-xs)', color: 'var(--ds-text-muted)' }}>
          john@example.com
        </span>
      </div>
    </div>
  ),
};
