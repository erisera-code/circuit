import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './Select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Select defaultValue="main">
        <SelectTrigger fullWidth>
          <SelectValue placeholder="Choose a branch" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="main">main</SelectItem>
          <SelectItem value="develop">develop</SelectItem>
          <SelectItem value="release">release</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

/**
 * Renders with `defaultOpen` so the portalled listbox (which carries the
 * ds-select-* classes) is visible in visual regression snapshots.
 */
export const OpenListbox: Story = {
  render: () => (
    <div style={{ minHeight: 280, minWidth: 300, paddingTop: 8 }}>
      <Select defaultValue="org-a" defaultOpen>
        <SelectTrigger fullWidth>
          <SelectValue placeholder="Choose an owner" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Organizations</SelectLabel>
            <SelectItem value="org-a">erisera-code</SelectItem>
            <SelectItem value="org-b">nominos-labs</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Personal</SelectLabel>
            <SelectItem value="user">johnhenry</SelectItem>
            <SelectItem value="disabled-user" disabled>
              archived-account
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};
