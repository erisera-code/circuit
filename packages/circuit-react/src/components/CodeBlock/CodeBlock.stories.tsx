import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock, CommandLine } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Data Display/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'terminal'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const yamlCode = `apiVersion: nominos.io/v1
kind: AgentJob
metadata:
  name: update-dependencies
spec:
  model: gpt-4
  repository: github.com/acme/app
  task: |
    Update all npm dependencies to their
    latest versions and run tests`;

const bashCode = `helm repo add nominos https://charts.nominos.io
helm install nominos nominos/nominos-core \\
  --namespace nominos-system \\
  --create-namespace`;

const jsCode = `import { AgentJob } from '@nominos/sdk';

const job = new AgentJob({
  name: 'update-deps',
  model: 'gpt-4',
  task: 'Update dependencies',
});

await job.run();`;

export const Default: Story = {
  args: {
    code: yamlCode,
    filename: 'agent-job.yaml',
    language: 'yaml',
  },
  decorators: [(Story) => <div style={{ width: '600px' }}><Story /></div>],
};

export const Terminal: Story = {
  args: {
    code: bashCode,
    variant: 'terminal',
    filename: 'terminal',
  },
  decorators: [(Story) => <div style={{ width: '600px' }}><Story /></div>],
};

export const WithLineNumbers: Story = {
  args: {
    code: jsCode,
    filename: 'example.ts',
    showLineNumbers: true,
  },
  decorators: [(Story) => <div style={{ width: '600px' }}><Story /></div>],
};

export const WithFooter: Story = {
  args: {
    code: yamlCode,
    filename: 'agent-job.yaml',
    footer: <CommandLine command="kubectl apply -f agent-job.yaml" />,
  },
  decorators: [(Story) => <div style={{ width: '600px' }}><Story /></div>],
};

export const NoCopyButton: Story = {
  args: {
    code: yamlCode,
    filename: 'agent-job.yaml',
    showCopy: false,
  },
  decorators: [(Story) => <div style={{ width: '600px' }}><Story /></div>],
};

export const NoHeader: Story = {
  args: {
    code: bashCode,
    showHeader: false,
  },
  decorators: [(Story) => <div style={{ width: '600px' }}><Story /></div>],
};

export const WithMaxHeight: Story = {
  args: {
    code: `${yamlCode}\n\n${yamlCode}\n\n${yamlCode}`,
    filename: 'long-file.yaml',
    maxHeight: '200px',
  },
  decorators: [(Story) => <div style={{ width: '600px' }}><Story /></div>],
};

export const TerminalWithOutput: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <CodeBlock
        variant="terminal"
        filename="terminal"
        code={`$ kubectl apply -f agent-job.yaml
agentjob.nominos.io/update-dependencies created

$ kubectl get agentjobs
NAME                  STATUS    PROGRESS   AGE
update-dependencies   Running   3/7        45s

$ kubectl logs -f job/update-dependencies
[agent] Analyzing package.json...
[agent] Found 12 outdated dependencies
[agent] Updating lodash@4.17.21 → 4.18.0
[agent] Running tests... ✓ passed
[agent] Creating pull request...`}
      />
    </div>
  ),
};

export const CommandLineVariants: Story = {
  render: () => (
    <div style={{
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      padding: '1rem',
      background: '#1a1a2e',
      borderRadius: '0.75rem',
    }}>
      <CommandLine command="kubectl apply -f config.yaml" promptColor="success" />
      <CommandLine command="npm install @nominos/sdk" promptColor="primary" prompt=">" />
      <CommandLine command="git commit -m 'Update deps'" promptColor="muted" prompt="#" />
    </div>
  ),
};

export const KubernetesExample: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <CodeBlock
        code={`apiVersion: nominos.io/v1
kind: AgentSwarm
metadata:
  name: multi-repo-security-scan
spec:
  replicas: 5
  taskTemplate:
    model: gpt-4
    task: |
      Scan for security vulnerabilities
      Fix any critical issues
      Create a detailed report
  repositories:
    - github.com/acme/frontend
    - github.com/acme/backend
    - github.com/acme/api
    - github.com/acme/mobile
    - github.com/acme/infra`}
        filename="agent-swarm.yaml"
        footer={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CommandLine command="kubectl apply -f agent-swarm.yaml" />
            <span style={{ fontSize: '0.75rem', color: '#6b6b8d' }}>ready</span>
          </div>
        }
      />
    </div>
  ),
};
