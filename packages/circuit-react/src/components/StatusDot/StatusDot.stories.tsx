import type { Meta, StoryObj } from '@storybook/react';
import { StatusDot } from './StatusDot';

const meta: Meta<typeof StatusDot> = {
  title: 'Feedback/StatusDot',
  component: StatusDot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: [
        'pending', 'running', 'success', 'error', 'warning',
        'draft', 'queued', 'merging', 'completed', 'failed', 'cancelled',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusDot>;

export const Default: Story = {
  args: {
    status: 'pending',
  },
};

export const Running: Story = {
  args: {
    status: 'running',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
  },
};

export const WithLabel: Story = {
  args: {
    status: 'running',
    label: 'Processing',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <StatusDot status="pending" label="Pending" />
      <StatusDot status="running" label="Running" />
      <StatusDot status="success" label="Success" />
      <StatusDot status="error" label="Error" />
      <StatusDot status="warning" label="Warning" />
    </div>
  ),
};

export const JobStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <StatusDot status="draft" label="Draft" />
      <StatusDot status="queued" label="Queued" />
      <StatusDot status="running" label="Running" />
      <StatusDot status="merging" label="Merging" />
      <StatusDot status="completed" label="Completed" />
      <StatusDot status="failed" label="Failed" />
      <StatusDot status="cancelled" label="Cancelled" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <StatusDot status="success" size="sm" label="Small" />
      <StatusDot status="success" size="md" label="Medium" />
      <StatusDot status="success" size="lg" label="Large" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      padding: '1rem',
      background: 'var(--ds-color-surface)',
      borderRadius: '0.5rem',
      border: '1px solid var(--ds-color-border)',
      fontFamily: 'var(--ds-font-mono)',
      fontSize: '0.875rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>update-dependencies</span>
        <StatusDot status="running" label="Running" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>fix-security-vuln</span>
        <StatusDot status="success" label="Complete" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>refactor-auth</span>
        <StatusDot status="pending" label="Queued" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>broken-pipeline</span>
        <StatusDot status="error" label="Failed" />
      </div>
    </div>
  ),
};
