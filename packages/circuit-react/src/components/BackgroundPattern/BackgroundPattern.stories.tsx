import type { Meta, StoryObj } from '@storybook/react';
import { BackgroundPattern, Glow } from './BackgroundPattern';

const meta: Meta<typeof BackgroundPattern> = {
  title: 'Layout/BackgroundPattern',
  component: BackgroundPattern,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'dots', 'none'],
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    size: {
      control: { type: 'range', min: 8, max: 64, step: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BackgroundPattern>;

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '400px',
  height: '300px',
  borderRadius: '0.75rem',
  overflow: 'hidden',
  border: '1px solid var(--ds-color-border)',
};

export const Grid: Story = {
  render: (args) => (
    <div style={containerStyle}>
      <BackgroundPattern {...args} absolute />
    </div>
  ),
  args: {
    variant: 'grid',
    opacity: 0.1,
    size: 24,
  },
};

export const Dots: Story = {
  render: (args) => (
    <div style={containerStyle}>
      <BackgroundPattern {...args} absolute />
    </div>
  ),
  args: {
    variant: 'dots',
    opacity: 0.15,
    size: 20,
  },
};

export const WithContent: Story = {
  render: () => (
    <div style={{ ...containerStyle, background: 'var(--ds-color-surface-inverse)', color: 'white' }}>
      <BackgroundPattern variant="grid" opacity={0.1} absolute />
      <div style={{ position: 'relative', padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--ds-font-mono)' }}>Hero Section</h2>
        <p style={{ margin: 0, opacity: 0.7 }}>Background pattern with content overlay</p>
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ ...containerStyle, width: '200px', height: '150px' }}>
        <BackgroundPattern variant="grid" size={12} opacity={0.15} absolute />
        <div style={{ position: 'relative', padding: '1rem', fontSize: '0.75rem' }}>12px grid</div>
      </div>
      <div style={{ ...containerStyle, width: '200px', height: '150px' }}>
        <BackgroundPattern variant="grid" size={24} opacity={0.15} absolute />
        <div style={{ position: 'relative', padding: '1rem', fontSize: '0.75rem' }}>24px grid</div>
      </div>
      <div style={{ ...containerStyle, width: '200px', height: '150px' }}>
        <BackgroundPattern variant="grid" size={48} opacity={0.15} absolute />
        <div style={{ position: 'relative', padding: '1rem', fontSize: '0.75rem' }}>48px grid</div>
      </div>
    </div>
  ),
};

// Glow stories
export const GlowPrimary: Story = {
  render: () => (
    <div style={{ ...containerStyle, background: '#0f172a' }}>
      <Glow color="primary" size={25} top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)' }} />
    </div>
  ),
};

export const GlowColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ ...containerStyle, width: '150px', height: '150px', background: '#0f172a' }}>
        <Glow color="primary" size={10} top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)' }} />
        <div style={{ position: 'relative', padding: '1rem', fontSize: '0.75rem', color: 'white', textAlign: 'center' }}>Primary</div>
      </div>
      <div style={{ ...containerStyle, width: '150px', height: '150px', background: '#0f172a' }}>
        <Glow color="success" size={10} top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)' }} />
        <div style={{ position: 'relative', padding: '1rem', fontSize: '0.75rem', color: 'white', textAlign: 'center' }}>Success</div>
      </div>
      <div style={{ ...containerStyle, width: '150px', height: '150px', background: '#0f172a' }}>
        <Glow color="warning" size={10} top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)' }} />
        <div style={{ position: 'relative', padding: '1rem', fontSize: '0.75rem', color: 'white', textAlign: 'center' }}>Warning</div>
      </div>
      <div style={{ ...containerStyle, width: '150px', height: '150px', background: '#0f172a' }}>
        <Glow color="error" size={10} top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)' }} />
        <div style={{ position: 'relative', padding: '1rem', fontSize: '0.75rem', color: 'white', textAlign: 'center' }}>Error</div>
      </div>
    </div>
  ),
};

export const HeroExample: Story = {
  render: () => (
    <div style={{
      position: 'relative',
      width: '600px',
      padding: '4rem 2rem',
      background: '#0f172a',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      textAlign: 'center',
      color: 'white',
    }}>
      <BackgroundPattern variant="grid" opacity={0.08} absolute />
      <Glow color="primary" size={30} opacity={0.1} top="0" left="50%" style={{ transform: 'translateX(-50%)' }} />

      <div style={{ position: 'relative' }}>
        <span style={{
          display: 'inline-block',
          padding: '0.375rem 0.75rem',
          background: 'rgba(14, 165, 233, 0.1)',
          border: '1px solid rgba(14, 165, 233, 0.2)',
          borderRadius: '9999px',
          fontFamily: 'var(--ds-font-mono)',
          fontSize: '0.75rem',
          color: '#0ea5e9',
          marginBottom: '1.5rem',
        }}>
          Now in Beta
        </span>
        <h1 style={{ margin: '0 0 1rem', fontFamily: 'var(--ds-font-mono)', fontSize: '2.5rem' }}>
          AI Agent Orchestration
        </h1>
        <p style={{ margin: '0 0 2rem', opacity: 0.7, maxWidth: '400px', marginInline: 'auto' }}>
          Automate your software development workflows with intelligent AI agents.
        </p>
        <button style={{
          padding: '0.75rem 1.5rem',
          background: '#0ea5e9',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontWeight: 500,
          cursor: 'pointer',
        }}>
          Get Started
        </button>
      </div>
    </div>
  ),
};
