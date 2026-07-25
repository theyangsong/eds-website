<script setup lang="ts">
import { ref } from 'vue';
import {
  EgSwitch,
  EgCheckbox,
  EgRadio,
  EgDecide,
} from '@eds/website-components';
import shared from '@/views/shared/showcase.module.css';
import group from '@/views/shared/previewGroup.module.css';
import styles from './TogglePreview.module.css';
import {
  previewSizeLabel,
  previewCheckboxStateLabel,
  previewRadioStateLabel,
  previewDecideStateLabel,
  previewStateDisableLabel,
} from '@/utils/previewLabel';

const switchLg = ref(false);
const switchMd = ref(true);
const switchSm = ref(false);
const checkboxLg = ref(false);
const checkboxMd = ref(false);
const checkboxSm = ref(false);
const radioLg = ref(false);
const radioMd = ref(false);
const radioSm = ref(false);
const decideLg = ref(false);
const decideMd = ref(false);
const decideSm = ref(false);
</script>

<template>
  <div id="toggle-switch" :class="group.previewGroup">
    <section :class="shared.section">
      <h2 :class="shared.sectionTitle">Switch</h2>
      <div :class="styles.switchRow">
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.lg }}</span>
          <EgSwitch v-model="switchLg" size="lg" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.md }}</span>
          <EgSwitch v-model="switchMd" size="md" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.sm }}</span>
          <EgSwitch v-model="switchSm" size="sm" />
        </div>
      </div>
    </section>
  </div>

  <div id="toggle-checkbox" :class="group.previewGroup">
    <section :class="shared.section">
      <h2 :class="shared.sectionTitle">Checkbox</h2>
      <div :class="styles.previewStack">
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.lg }}</span>
          <EgCheckbox v-model="checkboxLg" size="lg" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.md }}</span>
          <EgCheckbox v-model="checkboxMd" size="md" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.sm }}</span>
          <EgCheckbox v-model="checkboxSm" size="sm" />
        </div>
      </div>
    </section>

    <section id="toggle-checkbox-states" :class="shared.section">
      <h2 :class="shared.sectionTitle">States</h2>
      <div :class="styles.previewStack">
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{
            previewCheckboxStateLabel.unchecked
          }}</span>
          <EgCheckbox :model-value="false" size="lg" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{
            previewCheckboxStateLabel.checked
          }}</span>
          <EgCheckbox :model-value="true" size="lg" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{
            previewCheckboxStateLabel.checkedIndeterminate
          }}</span>
          <EgCheckbox :model-value="false" size="lg" indeterminate />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewStateDisableLabel }}</span>
          <EgCheckbox :model-value="false" size="lg" disabled />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewStateDisableLabel }}</span>
          <EgCheckbox :model-value="true" size="lg" disabled />
        </div>
      </div>
    </section>
  </div>

  <div id="toggle-radio" :class="group.previewGroup">
    <section :class="shared.section">
      <h2 :class="shared.sectionTitle">Radio</h2>
      <div :class="styles.previewStack">
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.lg }}</span>
          <EgRadio v-model="radioLg" name="radio-interactive-lg" value="lg" size="lg" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.md }}</span>
          <EgRadio v-model="radioMd" name="radio-interactive-md" value="md" size="md" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.sm }}</span>
          <EgRadio v-model="radioSm" name="radio-interactive-sm" value="sm" size="sm" />
        </div>
      </div>
    </section>

    <section id="toggle-radio-states" :class="shared.section">
      <h2 :class="shared.sectionTitle">States</h2>
      <div :class="styles.previewStack">
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{
            previewRadioStateLabel.unchecked
          }}</span>
          <EgRadio :model-value="false" name="radio-demo" value="a" size="lg" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{
            previewRadioStateLabel.checked
          }}</span>
          <EgRadio :model-value="true" name="radio-demo" value="b" size="lg" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewStateDisableLabel }}</span>
          <EgRadio
            :model-value="false"
            name="radio-demo-disabled"
            value="c"
            size="lg"
            disabled
          />
        </div>
      </div>
    </section>
  </div>

  <div id="toggle-decide" :class="group.previewGroup">
    <section :class="shared.section">
      <h2 :class="shared.sectionTitle">Decide</h2>
      <div :class="styles.previewStack">
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.lg }}</span>
          <EgDecide v-model="decideLg" size="lg" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.md }}</span>
          <EgDecide v-model="decideMd" size="md" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewSizeLabel.sm }}</span>
          <EgDecide v-model="decideSm" size="sm" />
        </div>
      </div>
    </section>

    <section id="toggle-decide-states" :class="shared.section">
      <h2 :class="shared.sectionTitle">States</h2>
      <div :class="styles.previewStack">
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{
            previewDecideStateLabel.undecided
          }}</span>
          <EgDecide :model-value="false" size="lg" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{
            previewDecideStateLabel.decided
          }}</span>
          <EgDecide :model-value="true" size="lg" />
        </div>
        <div :class="styles.stateRow">
          <span :class="styles.sizeLabel">{{ previewStateDisableLabel }}</span>
          <EgDecide :model-value="false" size="lg" disabled />
        </div>
      </div>
    </section>
  </div>
</template>
