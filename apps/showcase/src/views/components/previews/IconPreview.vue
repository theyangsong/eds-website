<script setup lang="ts">
import { EgIcon, iconNames } from '@eds/website-components';
import shared from '@/views/shared/showcase.module.css';
import styles from '../ComponentsView.module.css';
</script>

<template>
  <section id="icons-gallery" :class="shared.section">
    <h2 :class="shared.sectionTitle">Icon Set</h2>
    <div :class="styles.iconGrid">
      <div v-for="name in iconNames" :key="name" :class="styles.iconCell">
        <EgIcon :name="name" />
        <span :class="shared.mono">{{ name }}</span>
      </div>
    </div>
  </section>
</template>
