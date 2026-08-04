import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    pill: {
      control: 'boolean',
    },
    dot: {
      control: 'boolean',
    },
    dotColor: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'running'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Base variants
export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

// Pill
export const Pill: Story = {
  args: {
    pill: true,
    children: 'Pill Badge',
  },
};

// With dot
export const WithDot: Story = {
  args: {
    dot: true,
    children: 'With Dot',
  },
};

export const RunningDot: Story = {
  args: {
    dot: true,
    dotColor: 'running',
    children: 'Running',
  },
};

export const SuccessDot: Story = {
  args: {
    dot: true,
    dotColor: 'success',
    variant: 'success',
    children: 'Completed',
  },
};

export const ErrorDot: Story = {
  args: {
    dot: true,
    dotColor: 'error',
    variant: 'error',
    children: 'Failed',
  },
};

// Status badges (common use case)
export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="success" dot dotColor="success" pill>Completed</Badge>
      <Badge variant="warning" dot dotColor="warning" pill>Pending</Badge>
      <Badge variant="primary" dot dotColor="running" pill>Running</Badge>
      <Badge variant="error" dot dotColor="error" pill>Failed</Badge>
      <Badge variant="default" dot pill>Cancelled</Badge>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Badge pill>Pill</Badge>
        <Badge dot>With Dot</Badge>
        <Badge dot dotColor="running">Running</Badge>
      </div>
    </div>
  ),
};
