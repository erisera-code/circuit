import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from '../Button';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Overlays/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

/**
 * Stories render with `isOpen` so the portal content (which carries the
 * ds-alert-dialog-* classes) is visible in visual regression snapshots.
 */
export const Default: Story = {
  render: () => (
    <div style={{ minHeight: 320, minWidth: 480 }}>
      <ConfirmDialog
        isOpen
        title="Pause job?"
        message="The job will stop after the current step and can be resumed later."
        confirmLabel="Pause"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <div style={{ minHeight: 320, minWidth: 480 }}>
      <ConfirmDialog
        isOpen
        title="Delete repository?"
        message="This action cannot be undone. All job history for this repository will be removed."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ minHeight: 320, minWidth: 480 }}>
      <ConfirmDialog
        isOpen
        isLoading
        title="Cancelling job"
        message="Waiting for the runner to acknowledge the cancellation."
        confirmLabel="Cancel job"
        variant="destructive"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ minHeight: 120 }}>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete…
        </Button>
        <ConfirmDialog
          isOpen={open}
          title="Delete item?"
          message="This cannot be undone."
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </div>
    );
  },
};
