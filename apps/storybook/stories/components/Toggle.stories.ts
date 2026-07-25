import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import {
  EgSwitch,
  EgCheckbox,
  EgRadio,
  EgDecide,
} from '@eds/website-components';

const meta = {
  title: 'Components/Toggle Controls',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Switch: Story = {
  render: () => ({
    components: { EgSwitch },
    setup() {
      const on = ref(true);
      return { on };
    },
    template: '<EgSwitch v-model="on" size="md" />',
  }),
};

export const Checkbox: Story = {
  render: () => ({
    components: { EgCheckbox },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: '<EgCheckbox v-model="checked">Label</EgCheckbox>',
  }),
};

export const Radio: Story = {
  render: () => ({
    components: { EgRadio },
    template:
      '<EgRadio :model-value="true" name="story-radio" value="a">Radio</EgRadio>',
  }),
};

export const Decide: Story = {
  render: () => ({
    components: { EgDecide },
    setup() {
      const decided = ref(false);
      return { decided };
    },
    template: '<EgDecide v-model="decided">Decide</EgDecide>',
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { EgSwitch, EgCheckbox },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <EgSwitch disabled />
        <EgCheckbox disabled />
      </div>
    `,
  }),
};
