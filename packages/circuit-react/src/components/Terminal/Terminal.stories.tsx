import type { Meta, StoryObj } from '@storybook/react';
import { Terminal, TerminalLine } from './Terminal';

const meta: Meta<typeof Terminal> = {
  title: 'Components/Terminal',
  component: Terminal,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    showControls: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Terminal>;

export const Default: Story = {
  args: {
    children: (
      <>
        <TerminalLine type="command">kubectl get pods</TerminalLine>
        <TerminalLine type="output">NAME                     READY   STATUS    RESTARTS   AGE</TerminalLine>
        <TerminalLine type="output">nominos-controller-xxx   1/1     Running   0          5m</TerminalLine>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithAgentOutput: Story = {
  args: {
    title: 'agent-job-output',
    children: (
      <>
        <TerminalLine type="command">kubectl logs -f job/update-dependencies</TerminalLine>
        <TerminalLine type="output">[agent] Analyzing package.json...</TerminalLine>
        <TerminalLine type="output">[agent] Found 12 outdated dependencies</TerminalLine>
        <TerminalLine type="output">[agent] Updating lodash@4.17.21 → 4.18.0</TerminalLine>
        <TerminalLine type="success">[agent] Running tests... ✓ passed</TerminalLine>
        <TerminalLine type="output">[agent] Creating pull request...</TerminalLine>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    children: (
      <>
        <TerminalLine type="command">kubectl apply -f broken.yaml</TerminalLine>
        <TerminalLine type="error">error: unable to recognize "broken.yaml": no matches for kind "AgentJob" in version "nominos.io/v1"</TerminalLine>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const InstallationExample: Story = {
  args: {
    title: 'installation',
    children: (
      <>
        <TerminalLine type="comment"># Add the nominos-core Helm repository</TerminalLine>
        <TerminalLine type="command">helm repo add nominos https://charts.nominos.io</TerminalLine>
        <TerminalLine type="output">"nominos" has been added to your repositories</TerminalLine>
        <TerminalLine type="command">helm repo update</TerminalLine>
        <TerminalLine type="output">Hang tight while we grab the latest from your chart repositories...</TerminalLine>
        <TerminalLine type="success">...Successfully got an update from the "nominos" chart repository</TerminalLine>
        <TerminalLine type="command">helm install nominos-core nominos/nominos-core --namespace nominos-system --create-namespace</TerminalLine>
        <TerminalLine type="output">NAME: nominos-core</TerminalLine>
        <TerminalLine type="output">NAMESPACE: nominos-system</TerminalLine>
        <TerminalLine type="success">STATUS: deployed</TerminalLine>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
};

export const RawCode: Story = {
  args: {
    title: 'agent-job.yaml',
    showControls: true,
    children: `apiVersion: nominos.io/v1
kind: AgentJob
metadata:
  name: update-dependencies
spec:
  task:
    description: "Update all npm dependencies"
  repository:
    url: https://github.com/myorg/myapp
    createPR: true
  agent:
    model: claude-sonnet-4`,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};
