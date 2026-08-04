import React, { createContext, useContext, useState, forwardRef, useId } from 'react';
import './Tabs.css';

export type TabsVariant = 'pills' | 'underline' | 'cards' | 'buttons';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: TabsVariant;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// ============================================
// Tabs (Root)
// ============================================

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The default active tab id */
  defaultTab?: string;
  /** Controlled active tab */
  activeTab?: string;
  /** Callback when tab changes */
  onTabChange?: (tabId: string) => void;
  /** Visual style variant */
  variant?: TabsVariant;
  /** Children (TabList and TabPanels) */
  children: React.ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultTab,
      activeTab: controlledActiveTab,
      onTabChange,
      variant = 'pills',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseId = useId();
    const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(defaultTab || '');

    const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : uncontrolledActiveTab;

    const setActiveTab = (tabId: string) => {
      if (controlledActiveTab === undefined) {
        setUncontrolledActiveTab(tabId);
      }
      onTabChange?.(tabId);
    };

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab, variant, baseId }}>
        <div
          ref={ref}
          className={`ds-tabs ds-tabs--${variant} ${className}`.trim()}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

// ============================================
// TabList
// ============================================

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label for accessibility */
  'aria-label'?: string;
  children: React.ReactNode;
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className = '', ...props }, ref) => {
    const { variant } = useTabsContext();

    return (
      <div
        ref={ref}
        role="tablist"
        className={`ds-tab-list ds-tab-list--${variant} ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

// ============================================
// Tab
// ============================================

export interface TabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
  /** Unique identifier for this tab */
  tabId: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Optional description (for cards variant) */
  description?: string;
  children: React.ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ tabId, icon, description, children, className = '', ...props }, ref) => {
    const { activeTab, setActiveTab, variant, baseId } = useTabsContext();
    const isSelected = activeTab === tabId;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`${baseId}-tab-${tabId}`}
        aria-selected={isSelected}
        aria-controls={`${baseId}-panel-${tabId}`}
        tabIndex={isSelected ? 0 : -1}
        className={`ds-tab ds-tab--${variant} ${isSelected ? 'ds-tab--selected' : ''} ${className}`.trim()}
        onClick={() => setActiveTab(tabId)}
        {...props}
      >
        {variant === 'cards' ? (
          <>
            <span className="ds-tab__indicator" />
            {icon && <span className="ds-tab__icon">{icon}</span>}
            <span className="ds-tab__title">{children}</span>
            {description && <span className="ds-tab__description">{description}</span>}
          </>
        ) : (
          <>
            {icon && <span className="ds-tab__icon">{icon}</span>}
            <span className="ds-tab__title">{children}</span>
          </>
        )}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

// ============================================
// TabPanel
// ============================================

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Must match a Tab's tabId */
  tabId: string;
  children: React.ReactNode;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ tabId, children, className = '', ...props }, ref) => {
    const { activeTab, baseId } = useTabsContext();
    const isSelected = activeTab === tabId;

    if (!isSelected) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-panel-${tabId}`}
        aria-labelledby={`${baseId}-tab-${tabId}`}
        tabIndex={0}
        className={`ds-tab-panel ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';
