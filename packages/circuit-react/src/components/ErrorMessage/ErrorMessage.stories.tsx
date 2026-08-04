import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Feedback/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['inline', 'banner', 'card'],
    },
    showIcon: {
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
type Story = StoryObj<typeof ErrorMessage>;

export const Inline: Story = {
  args: {
    variant: 'inline',
    message: 'Something went wrong. Please try again.',
  },
};

export const InlineWithTitle: Story = {
  args: {
    variant: 'inline',
    title: 'Error',
    message: 'Unable to connect to the server.',
  },
};

export const Banner: Story = {
  args: {
    variant: 'banner',
    message: 'Failed to load agent jobs. Please check your connection and try again.',
  },
};

export const BannerWithTitle: Story = {
  args: {
    variant: 'banner',
    title: 'Connection Error',
    message: 'Unable to reach the Kubernetes cluster. Check your network settings.',
  },
};

export const BannerWithRetry: Story = {
  args: {
    variant: 'banner',
    title: 'Failed to fetch data',
    message: 'There was an error loading your agent jobs.',
    onRetry: () => alert('Retrying...'),
  },
};

export const BannerDismissible: Story = {
  args: {
    variant: 'banner',
    message: 'Some features may be unavailable while we resolve this issue.',
    onDismiss: () => alert('Dismissed'),
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
    title: 'Agent Job Failed',
    message: 'The agent encountered an error while processing your request. View the logs for more details.',
  },
};

export const CardWithRetry: Story = {
  args: {
    variant: 'card',
    title: 'Deployment Failed',
    message: 'Failed to apply the AgentJob manifest to your cluster. The Kubernetes API returned a validation error.',
    onRetry: () => alert('Retrying...'),
    retryText: 'Retry deployment',
  },
};

export const CardWithDismiss: Story = {
  args: {
    variant: 'card',
    title: 'GitHub Sync Error',
    message: 'Could not sync issues from the repository. Check your GitHub token permissions.',
    onRetry: () => alert('Retrying...'),
    onDismiss: () => alert('Dismissed'),
  },
};

export const NoIcon: Story = {
  args: {
    variant: 'banner',
    showIcon: false,
    message: 'An error occurred without an icon.',
  },
};

export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ErrorMessage
        variant="inline"
        message="Inline error message"
      />
      <ErrorMessage
        variant="banner"
        title="Banner Error"
        message="This is a banner-style error with more prominence."
        onRetry={() => {}}
      />
      <ErrorMessage
        variant="card"
        title="Card Error"
        message="This is a card-style error for significant issues that need attention."
        onRetry={() => {}}
        onDismiss={() => {}}
      />
    </div>
  ),
};

export const FormValidationExample: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 'var(--ds-text-sm)',
            fontWeight: 500,
            marginBottom: 'var(--ds-space-1-5)',
          }}
        >
          Email address
        </label>
        <input
          type="email"
          defaultValue="invalid-email"
          style={{
            width: '100%',
            padding: 'var(--ds-space-2) var(--ds-space-3)',
            border: '1px solid var(--ds-error)',
            borderRadius: 'var(--ds-radius-lg)',
            fontSize: 'var(--ds-text-sm)',
          }}
        />
        <div style={{ marginTop: 'var(--ds-space-2)' }}>
          <ErrorMessage variant="inline" message="Please enter a valid email address" />
        </div>
      </div>
    </div>
  ),
};
