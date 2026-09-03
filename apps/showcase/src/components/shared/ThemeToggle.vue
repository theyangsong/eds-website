<script setup lang="ts">
import { useShowcaseContentTheme } from '@/composables/useShowcaseContentTheme';
import styles from './ThemeToggle.module.css';

const { theme, toggleTheme } = useShowcaseContentTheme();
</script>

<template>
  <button type="button" :class="styles.button" @click="toggleTheme">
    {{ theme === 'light' ? 'Dark' : 'Light' }}
  </button>
</template>
