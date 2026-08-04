import { useState, createContext, useContext, useId } from 'react';

/*
 * Minimal Tabs component - just manages active state
 * Styling comes from components.css (.tab-list, .tab)
 */

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Must be used within Tabs');
  return ctx;
}

// Root
export function Tabs({
  defaultTab,
  children,
  className = '',
}: {
  defaultTab: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const baseId = useId();

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, baseId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// Tab list container
export function TabList({
  children,
  className = 'tab-list',
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={className}>
      {children}
    </div>
  );
}

// Individual tab button
export function Tab({
  id,
  children,
  className = 'tab',
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab, setActiveTab, baseId } = useTabsContext();
  const isSelected = activeTab === id;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${id}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${id}`}
      tabIndex={isSelected ? 0 : -1}
      className={className}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

// Tab panel
export function TabPanel({
  id,
  children,
  className = '',
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab, baseId } = useTabsContext();
  if (activeTab !== id) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${id}`}
      aria-labelledby={`${baseId}-tab-${id}`}
      className={className}
    >
      {children}
    </div>
  );
}
