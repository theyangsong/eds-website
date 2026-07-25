import type { CatalogSection } from '../types';

export const componentCatalog: CatalogSection[] = [
  {
    title: 'Atoms',
    items: [
      {
        name: 'Icons',
        slug: 'icons',
        description: 'SVG icon set for Website applications.',
        status: 'implemented',
      },
      {
        name: 'Crypto',
        slug: 'crypto',
        description: 'Cryptocurrency icons and asset marks.',
        status: 'placeholder',
      },
      {
        name: 'Avatar',
        slug: 'avatar',
        description: 'User avatar with image and fallback states.',
        status: 'placeholder',
      },
      {
        name: 'Divider',
        slug: 'divider',
        description: 'Horizontal and vertical content dividers.',
        status: 'placeholder',
      },
    ],
  },
  {
    title: 'Molecules',
    items: [
      {
        name: 'Input',
        slug: 'input',
        description: 'Text and amount inputs with clear, unit, and Max actions.',
        status: 'implemented',
      },
      {
        name: 'Button',
        slug: 'button',
        description: 'Label, icon, link, and pagination button variants for actions and navigation.',
        status: 'implemented',
        children: [
          { id: 'button-text', label: 'Button' },
          { id: 'button-icon', label: 'iCons Container Simple' },
          { id: 'button-icon-pro', label: 'iCons Container Professional' },
          { id: 'button-link', label: 'Link' },
          { id: 'button-pagination', label: 'Pagination' },
        ],
      },
      {
        name: 'Menu Box',
        slug: 'menu-box',
        description: 'Dropdown menu container and item list.',
        status: 'placeholder',
      },
      {
        name: 'Flotation',
        slug: 'flotation',
        description: 'Floating action surface for contextual tools.',
        status: 'placeholder',
      },
      {
        name: 'Tag',
        slug: 'tag',
        description: 'Compact labels for status and metadata.',
        status: 'placeholder',
      },
      {
        name: 'Toggle',
        slug: 'toggle',
        description: 'Switch, checkbox, radio, and decide controls.',
        status: 'implemented',
        children: [
          { id: 'toggle-switch', label: 'Switch' },
          { id: 'toggle-checkbox', label: 'Checkbox' },
          { id: 'toggle-radio', label: 'Radio' },
          { id: 'toggle-decide', label: 'Decide' },
        ],
      },
      {
        name: 'Tab',
        slug: 'tab',
        description: 'Tab strip for switching related views.',
        status: 'placeholder',
      },
      {
        name: 'Feedback',
        slug: 'feedback',
        description: 'Inline feedback messages and callouts.',
        status: 'placeholder',
      },
      {
        name: 'Popovers',
        slug: 'popovers',
        description: 'Anchored overlays for menus and lightweight panels.',
        status: 'placeholder',
      },
      {
        name: 'Countdown',
        slug: 'countdown',
        description: 'Time remaining display for timed actions.',
        status: 'placeholder',
      },
      {
        name: 'Progress',
        slug: 'progress',
        description: 'Linear and circular progress indicators.',
        status: 'placeholder',
      },
      {
        name: 'Loading',
        slug: 'loading',
        description: 'Loading spinners and skeleton placeholders.',
        status: 'placeholder',
      },
      {
        name: 'Upload',
        slug: 'upload',
        description: 'File upload trigger and drag-and-drop area.',
        status: 'placeholder',
      },
    ],
  },
  {
    title: 'Organisms',
    items: [
      {
        name: 'Nav Bar',
        slug: 'nav-bar',
        description: 'Top application navigation bar.',
        status: 'placeholder',
      },
      {
        name: 'Module Menu',
        slug: 'module-menu',
        description: 'Module switcher for multi-area applications.',
        status: 'placeholder',
      },
      {
        name: 'Tool Bar',
        slug: 'tool-bar',
        description: 'Contextual toolbar for page-level actions.',
        status: 'placeholder',
      },
      {
        name: 'Paginer',
        slug: 'paginer',
        description: 'Pagination controls for long lists and tables.',
        status: 'placeholder',
      },
      {
        name: 'Detail',
        slug: 'detail',
        description: 'Detail page layout for entity inspection.',
        status: 'placeholder',
      },
      {
        name: 'Data Table View',
        slug: 'data-table-view',
        description: 'Read-only data table with sorting and filters.',
        status: 'placeholder',
      },
      {
        name: 'Data Table Edit',
        slug: 'data-table-edit',
        description: 'Editable data table for inline record updates.',
        status: 'placeholder',
      },
      {
        name: 'Data List',
        slug: 'data-list',
        description: 'Scrollable list layout for structured records.',
        status: 'placeholder',
      },
      {
        name: 'Reminder',
        slug: 'reminder',
        description: 'Reminder banner for pending user actions.',
        status: 'placeholder',
      },
      {
        name: 'Verify',
        slug: 'verify',
        description: 'Verification step flow for security checks.',
        status: 'placeholder',
      },
      {
        name: 'Filter',
        slug: 'filter',
        description: 'Filter panel for narrowing list and table results.',
        status: 'placeholder',
      },
      {
        name: 'Batch Bar',
        slug: 'batch-bar',
        description: 'Bulk action bar for multi-selected items.',
        status: 'placeholder',
      },
    ],
  },
  {
    title: 'Templates',
    items: [
      {
        name: 'Container',
        slug: 'container',
        description: 'Page container with standard content width.',
        status: 'placeholder',
      },
      {
        name: 'Layout',
        slug: 'layout',
        description: 'Application shell layout scaffold.',
        status: 'placeholder',
      },
      {
        name: 'Popup',
        slug: 'popup',
        description: 'Modal and popup page framing.',
        status: 'placeholder',
      },
      {
        name: 'Skid',
        slug: 'skid',
        description: 'Sliding panel template for secondary flows.',
        status: 'placeholder',
      },
    ],
  },
];
