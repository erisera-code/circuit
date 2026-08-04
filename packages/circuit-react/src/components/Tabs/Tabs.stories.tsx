import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pills', 'underline', 'cards', 'buttons'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Pills: Story = {
  render: () => (
    <Tabs defaultTab="tab1" variant="pills">
      <TabList aria-label="Example tabs">
        <Tab tabId="tab1">Overview</Tab>
        <Tab tabId="tab2">Features</Tab>
        <Tab tabId="tab3">Pricing</Tab>
      </TabList>
      <TabPanel tabId="tab1">
        <div style={{ padding: '1rem', background: 'var(--ds-color-surface)', borderRadius: '0.5rem', border: '1px solid var(--ds-color-border)' }}>
          <h3 style={{ margin: '0 0 0.5rem' }}>Overview Content</h3>
          <p style={{ margin: 0, color: 'var(--ds-color-text-muted)' }}>This is the overview tab panel content.</p>
        </div>
      </TabPanel>
      <TabPanel tabId="tab2">
        <div style={{ padding: '1rem', background: 'var(--ds-color-surface)', borderRadius: '0.5rem', border: '1px solid var(--ds-color-border)' }}>
          <h3 style={{ margin: '0 0 0.5rem' }}>Features Content</h3>
          <p style={{ margin: 0, color: 'var(--ds-color-text-muted)' }}>This is the features tab panel content.</p>
        </div>
      </TabPanel>
      <TabPanel tabId="tab3">
        <div style={{ padding: '1rem', background: 'var(--ds-color-surface)', borderRadius: '0.5rem', border: '1px solid var(--ds-color-border)' }}>
          <h3 style={{ margin: '0 0 0.5rem' }}>Pricing Content</h3>
          <p style={{ margin: 0, color: 'var(--ds-color-text-muted)' }}>This is the pricing tab panel content.</p>
        </div>
      </TabPanel>
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultTab="tab1" variant="underline">
      <TabList aria-label="Example tabs">
        <Tab tabId="tab1">Overview</Tab>
        <Tab tabId="tab2">Features</Tab>
        <Tab tabId="tab3">Pricing</Tab>
        <Tab tabId="tab4">FAQ</Tab>
      </TabList>
      <TabPanel tabId="tab1">
        <p style={{ color: 'var(--ds-color-text-muted)' }}>Overview content goes here.</p>
      </TabPanel>
      <TabPanel tabId="tab2">
        <p style={{ color: 'var(--ds-color-text-muted)' }}>Features content goes here.</p>
      </TabPanel>
      <TabPanel tabId="tab3">
        <p style={{ color: 'var(--ds-color-text-muted)' }}>Pricing content goes here.</p>
      </TabPanel>
      <TabPanel tabId="tab4">
        <p style={{ color: 'var(--ds-color-text-muted)' }}>FAQ content goes here.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const Cards: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Tabs defaultTab="agentJob" variant="cards">
        <TabList aria-label="CRD types">
          <Tab tabId="agentJob" description="Single agent task">AgentJob</Tab>
          <Tab tabId="agentSwarm" description="Parallel agents">AgentSwarm</Tab>
          <Tab tabId="mergeQueue" description="PR automation">MergeQueue</Tab>
        </TabList>
        <TabPanel tabId="agentJob">
          <div style={{
            padding: '1.5rem',
            background: '#1a1a2e',
            borderRadius: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            color: '#e4e4eb',
          }}>
            <pre style={{ margin: 0 }}>
{`apiVersion: nominos.io/v1
kind: AgentJob
metadata:
  name: update-deps
spec:
  model: gpt-4
  task: "Update dependencies"`}
            </pre>
          </div>
        </TabPanel>
        <TabPanel tabId="agentSwarm">
          <div style={{
            padding: '1.5rem',
            background: '#1a1a2e',
            borderRadius: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            color: '#e4e4eb',
          }}>
            <pre style={{ margin: 0 }}>
{`apiVersion: nominos.io/v1
kind: AgentSwarm
metadata:
  name: multi-repo-update
spec:
  replicas: 5
  taskTemplate: ...`}
            </pre>
          </div>
        </TabPanel>
        <TabPanel tabId="mergeQueue">
          <div style={{
            padding: '1.5rem',
            background: '#1a1a2e',
            borderRadius: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            color: '#e4e4eb',
          }}>
            <pre style={{ margin: 0 }}>
{`apiVersion: nominos.io/v1
kind: MergeQueue
metadata:
  name: main-branch
spec:
  targetBranch: main
  autoMerge: true`}
            </pre>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

export const Buttons: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Tabs defaultTab="helm" variant="buttons">
        <TabList aria-label="Installation methods">
          <Tab tabId="helm">Helm</Tab>
          <Tab tabId="kustomize">Kustomize</Tab>
          <Tab tabId="kubectl">kubectl</Tab>
        </TabList>
        <TabPanel tabId="helm">
          <div style={{
            padding: '1.5rem',
            background: '#1a1a2e',
            borderRadius: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            color: '#e4e4eb',
          }}>
            <pre style={{ margin: 0 }}>
{`helm repo add nominos https://charts.nominos.io
helm install nominos nominos/nominos-core`}
            </pre>
          </div>
        </TabPanel>
        <TabPanel tabId="kustomize">
          <div style={{
            padding: '1.5rem',
            background: '#1a1a2e',
            borderRadius: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            color: '#e4e4eb',
          }}>
            <pre style={{ margin: 0 }}>
{`# kustomization.yaml
resources:
  - github.com/nominos-io/nominos-core//deploy?ref=v1.0.0`}
            </pre>
          </div>
        </TabPanel>
        <TabPanel tabId="kubectl">
          <div style={{
            padding: '1.5rem',
            background: '#1a1a2e',
            borderRadius: '0.75rem',
            fontFamily: 'var(--ds-font-mono)',
            fontSize: '0.875rem',
            color: '#e4e4eb',
          }}>
            <pre style={{ margin: 0 }}>
{`kubectl apply -f https://raw.githubusercontent.com/nominos-io/nominos-core/main/deploy/install.yaml`}
            </pre>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultTab="files" variant="pills">
      <TabList aria-label="Navigation">
        <Tab tabId="files" icon={<FileIcon />}>Files</Tab>
        <Tab tabId="settings" icon={<SettingsIcon />}>Settings</Tab>
      </TabList>
      <TabPanel tabId="files">
        <p style={{ color: 'var(--ds-color-text-muted)' }}>Files content</p>
      </TabPanel>
      <TabPanel tabId="settings">
        <p style={{ color: 'var(--ds-color-text-muted)' }}>Settings content</p>
      </TabPanel>
    </Tabs>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem', fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-color-text-muted)' }}>Pills</h4>
        <Tabs defaultTab="tab1" variant="pills">
          <TabList>
            <Tab tabId="tab1">Tab 1</Tab>
            <Tab tabId="tab2">Tab 2</Tab>
            <Tab tabId="tab3">Tab 3</Tab>
          </TabList>
        </Tabs>
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem', fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-color-text-muted)' }}>Underline</h4>
        <Tabs defaultTab="tab1" variant="underline">
          <TabList>
            <Tab tabId="tab1">Tab 1</Tab>
            <Tab tabId="tab2">Tab 2</Tab>
            <Tab tabId="tab3">Tab 3</Tab>
          </TabList>
        </Tabs>
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem', fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-color-text-muted)' }}>Cards</h4>
        <Tabs defaultTab="tab1" variant="cards">
          <TabList>
            <Tab tabId="tab1" description="Description">Tab 1</Tab>
            <Tab tabId="tab2" description="Description">Tab 2</Tab>
            <Tab tabId="tab3" description="Description">Tab 3</Tab>
          </TabList>
        </Tabs>
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem', fontFamily: 'var(--ds-font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ds-color-text-muted)' }}>Buttons</h4>
        <Tabs defaultTab="tab1" variant="buttons">
          <TabList>
            <Tab tabId="tab1">Tab 1</Tab>
            <Tab tabId="tab2">Tab 2</Tab>
            <Tab tabId="tab3">Tab 3</Tab>
          </TabList>
        </Tabs>
      </div>
    </div>
  ),
};
