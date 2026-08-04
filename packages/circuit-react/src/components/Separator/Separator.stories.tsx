import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Layout/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 280, fontFamily: 'var(--ds-font-body)' }}>
      <p style={{ margin: 0, fontSize: 'var(--ds-text-sm)' }}>Section one</p>
      <Separator style={{ margin: '0.75rem 0' }} />
      <p style={{ margin: 0, fontSize: 'var(--ds-text-sm)' }}>Section two</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        height: 24,
        fontFamily: 'var(--ds-font-body)',
        fontSize: 'var(--ds-text-sm)',
      }}
    >
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Blog</span>
      <Separator orientation="vertical" />
      <span>Source</span>
    </div>
  ),
};
