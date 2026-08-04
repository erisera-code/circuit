/*
 * ERISERA DESIGN SYSTEM - React Components
 *
 * React components with Radix UI primitives for accessible UI.
 * Styling comes from the CSS files - import those separately:
 *
 * @import '@erisera-code/circuit-react/css';
 *
 * Or import the tokens:
 * @import '@erisera-code/circuit-react/tokens';
 */

// Legacy exports (kept for backward compatibility).
// NOTE: the legacy ./Tabs re-export was removed — it shadowed the component
// library's Tabs/TabList/Tab/TabPanel below (explicit named exports win over
// star exports). Import the legacy minimal Tabs from
// '@erisera-code/circuit-react/react/Tabs' directly if ever needed.
export { CopyButton } from './CopyButton';
export { MobileMenu } from './MobileMenu';

// Re-export all components from the components directory
export * from '../components';
