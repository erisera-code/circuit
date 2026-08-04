import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    center: {
      control: 'boolean',
    },
    padded: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

const DemoContent = ({ label }: { label: string }) => (
  <div
    style={{
      backgroundColor: 'var(--ds-primary-subtle)',
      border: '2px dashed var(--ds-primary)',
      borderRadius: 'var(--ds-radius-lg)',
      padding: 'var(--ds-space-8)',
      textAlign: 'center',
    }}
  >
    <p style={{ margin: 0, color: 'var(--ds-text-secondary)' }}>{label}</p>
  </div>
);

export const Default: Story = {
  args: {
    children: <DemoContent label="Default container (lg)" />,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: <DemoContent label="Small container (max-width: 640px)" />,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: <DemoContent label="Medium container (max-width: 768px)" />,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: <DemoContent label="Large container (max-width: 1024px)" />,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: <DemoContent label="Extra large container (max-width: 1280px)" />,
  },
};

export const Full: Story = {
  args: {
    size: 'full',
    children: <DemoContent label="Full width container" />,
  },
};

export const NotCentered: Story = {
  args: {
    center: false,
    children: <DemoContent label="Not centered (aligned left)" />,
  },
};

export const NoPadding: Story = {
  args: {
    padded: false,
    children: <DemoContent label="No horizontal padding" />,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem 0' }}>
      <Container size="sm">
        <DemoContent label="Small (640px)" />
      </Container>
      <Container size="md">
        <DemoContent label="Medium (768px)" />
      </Container>
      <Container size="lg">
        <DemoContent label="Large (1024px)" />
      </Container>
      <Container size="xl">
        <DemoContent label="Extra Large (1280px)" />
      </Container>
    </div>
  ),
};
