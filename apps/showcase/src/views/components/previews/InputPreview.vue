<script setup lang="ts">
import { ref } from 'vue';
import { EgInput } from '@eds/website-components';
import shared from '@/views/shared/showcase.module.css';
import previewStyles from './ButtonPreview.module.css';
import styles from '../ComponentsView.module.css';
import { previewSizeLabel } from '@/utils/previewLabel';

const standardValue = ref('');
const amountValue = ref('');
const unitValue = ref('');
const amountMaxValue = ref('');

const sizes = [
  { key: 'lg', label: previewSizeLabel.lg },
  { key: 'md', label: previewSizeLabel.md },
  { key: 'sm', label: previewSizeLabel.sm },
] as const;
</script>

<template>
  <section id="input-sizes" :class="shared.section">
    <h2 :class="shared.sectionTitle">Sizes</h2>
    <div :class="previewStyles.previewStack">
      <div v-for="size in sizes" :key="size.key" :class="previewStyles.sizeRow">
        <span :class="previewStyles.sizeLabel">{{ size.label }}</span>
        <EgInput
          v-model="standardValue"
          :size="size.key"
          placeholder="请输入"
          style="width: 319px"
        />
      </div>
    </div>
  </section>

  <section id="input-amount" :class="shared.section">
    <h2 :class="shared.sectionTitle">Amount</h2>
    <div :class="styles.typeList">
      <EgInput
        v-model="amountValue"
        type="amount"
        unit="Unit"
        placeholder="0"
        style="width: 319px"
      />
      <EgInput
        v-model="amountMaxValue"
        type="amount"
        unit="Unit"
        show-max
        style="width: 319px"
      />
    </div>
  </section>

  <section id="input-unit" :class="shared.section">
    <h2 :class="shared.sectionTitle">Unit</h2>
    <EgInput
      v-model="unitValue"
      placeholder="请输入"
      unit="Unit"
      style="width: 319px"
    />
  </section>

  <section id="input-disabled" :class="shared.section">
    <h2 :class="shared.sectionTitle">Disabled</h2>
    <div :class="styles.typeList">
      <EgInput model-value="请输入" placeholder="请输入" disabled style="width: 319px" />
      <EgInput
        model-value=""
        type="amount"
        unit="Unit"
        disabled
        style="width: 319px"
      />
    </div>
  </section>
</template>
