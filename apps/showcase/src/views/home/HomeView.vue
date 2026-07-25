<script setup lang="ts">
import { RouterLink } from 'vue-router';
import styles from './HomeView.module.css';

const cards = [
  {
    title: 'Tokens',
    description: 'Color, scale, typography, and semantic variables from @eds/website-tokens.',
    to: '/tokens',
  },
  {
    title: 'Components',
    description: 'Live previews of Website Vue components.',
    to: '/components',
  },
  {
    title: 'Scenes',
    description: 'Page-level flows from @eds/website-scenes.',
    to: '/scenes',
  },
];
</script>

<template>
  <div :class="styles.page">
    <section :class="styles.hero">
      <h1 :class="styles.title">WebSite ShowCase</h1>
      <p :class="styles.lead">
        A lightweight gallery for Website design tokens, components, and scenes.
      </p>
    </section>

    <section :class="styles.grid">
      <RouterLink v-for="card in cards" :key="card.to" :to="card.to" :class="styles.card">
        <h2 :class="styles.cardTitle">{{ card.title }}</h2>
        <p :class="styles.cardText">{{ card.description }}</p>
      </RouterLink>
    </section>
  </div>
</template>
