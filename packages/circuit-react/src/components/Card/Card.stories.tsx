import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'ghost'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hoverable: {
      control: 'boolean',
    },
    clickable: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>
        This is a basic card with default styling.
      </p>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>
        This card has an elevated shadow effect.
      </p>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>
        This card has a stronger border.
      </p>
    ),
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: (
      <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>
        This card has no visible border or background.
      </p>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>
        Hover over this card to see the effect.
      </p>
    ),
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    children: (
      <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>
        This card is clickable and shows a primary color on hover.
      </p>
    ),
  },
};

export const WithHeaderAndBody: Story = {
  render: () => (
    <Card>
      <CardHeader
        title="Card Title"
        subtitle="This is a subtitle describing the card content"
      />
      <CardBody>
        <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>
          This is the main content area of the card. It can contain any content.
        </p>
      </CardBody>
    </Card>
  ),
};

export const WithHeaderAction: Story = {
  render: () => (
    <Card>
      <CardHeader
        title="Agent Jobs"
        subtitle="Manage your automation tasks"
        action={<Badge variant="success" dot dotColor="success">Running</Badge>}
      />
      <CardBody>
        <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>
          3 jobs currently running across 2 repositories.
        </p>
      </CardBody>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader title="Create New Job" />
      <CardBody>
        <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>
          Configure your agent job settings and click save to create.
        </p>
      </CardBody>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithFooterBetween: Story = {
  render: () => (
    <Card>
      <CardHeader title="Confirm Action" />
      <CardBody>
        <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>
          Are you sure you want to delete this job? This action cannot be undone.
        </p>
      </CardBody>
      <CardFooter align="between">
        <Button variant="ghost">Learn more</Button>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

export const CompactCard: Story = {
  args: {
    padding: 'sm',
    children: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Badge variant="primary" dot dotColor="running">Running</Badge>
        <span style={{ color: 'var(--ds-text)' }}>update-dependencies</span>
        <span style={{ marginLeft: 'auto', color: 'var(--ds-text-muted)', fontSize: '0.875rem' }}>2m ago</span>
      </div>
    ),
  },
};

export const CardGrid: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
      <Card hoverable>
        <CardHeader title="AgentJob" subtitle="Single task automation" />
        <CardBody>
          <p style={{ margin: 0, color: 'var(--ds-text-secondary)', fontSize: '0.875rem' }}>
            Define a single AI agent task with full lifecycle management.
          </p>
        </CardBody>
      </Card>
      <Card hoverable>
        <CardHeader title="AgentSwarm" subtitle="Multi-repo orchestration" />
        <CardBody>
          <p style={{ margin: 0, color: 'var(--ds-text-secondary)', fontSize: '0.875rem' }}>
            Coordinate multiple agents across repositories.
          </p>
        </CardBody>
      </Card>
      <Card hoverable>
        <CardHeader title="MergeQueue" subtitle="Intelligent merging" />
        <CardBody>
          <p style={{ margin: 0, color: 'var(--ds-text-secondary)', fontSize: '0.875rem' }}>
            Automated merge queue with conflict resolution.
          </p>
        </CardBody>
      </Card>
      <Card hoverable>
        <CardHeader title="AgentPolicy" subtitle="Governance rules" />
        <CardBody>
          <p style={{ margin: 0, color: 'var(--ds-text-secondary)', fontSize: '0.875rem' }}>
            Define what agents can and cannot do.
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};
