import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
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
  decorators: [
    (Story) => (
      <div style={{ width: '500px', border: '1px dashed var(--ds-border)', borderRadius: 'var(--ds-radius-lg)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z" />
  </svg>
);

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1rem', height: '1rem' }}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const Default: Story = {
  args: {
    icon: <FolderIcon />,
    title: 'No files yet',
    description: 'Get started by uploading your first file.',
  },
};

export const WithAction: Story = {
  args: {
    icon: <RocketIcon />,
    title: 'No agent jobs',
    description: 'Create your first agent job to automate code changes.',
    action: (
      <Button variant="primary" iconLeft={<PlusIcon />}>
        Create Job
      </Button>
    ),
  },
};

export const WithBothActions: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'Inbox is empty',
    description: 'When you receive notifications, they will appear here.',
    action: <Button variant="primary">Refresh</Button>,
    secondaryAction: <Button variant="secondary">Settings</Button>,
  },
};

export const SearchNoResults: Story = {
  args: {
    icon: <SearchIcon />,
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
    action: <Button variant="secondary">Clear filters</Button>,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    icon: <FolderIcon />,
    title: 'No items',
    description: 'Add your first item to get started.',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    icon: <RocketIcon />,
    title: 'Welcome to Nominos',
    description: 'Get started by connecting your first Kubernetes cluster and creating an agent job.',
    action: (
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px', border: '1px dashed var(--ds-border)', borderRadius: 'var(--ds-radius-lg)' }}>
        <Story />
      </div>
    ),
  ],
};

export const NoIcon: Story = {
  args: {
    title: 'No data available',
    description: 'There is no data to display at this time.',
  },
};

export const InCard: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: '400px',
          backgroundColor: 'var(--ds-surface)',
          border: '1px solid var(--ds-border)',
          borderRadius: 'var(--ds-radius-xl)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: 'var(--ds-space-4)',
            borderBottom: '1px solid var(--ds-border-muted)',
            fontWeight: 600,
          }}
        >
          Recent Activity
        </div>
        <Story />
      </div>
    ),
  ],
  args: {
    size: 'sm',
    icon: <InboxIcon />,
    title: 'No recent activity',
    description: 'Activity from your jobs will appear here.',
  },
};
