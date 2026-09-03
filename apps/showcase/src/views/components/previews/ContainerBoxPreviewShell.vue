<script setup lang="ts">
import { EgTooltip } from '@eds/website-components';
import styles from './ContainerBoxPreviewShell.module.css';
</script>

<template>
  <EgTooltip panel-kind="container" :class="styles.shell">
    <slot />
  </EgTooltip>
</template>
