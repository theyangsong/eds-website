<script setup lang="ts">
import {
  EgButton,
  EgIconButton,
  EgIconButtonPro,
  EgLink,
  EgPaginationItem,
} from '@eds/website-components';
import shared from '@/views/shared/showcase.module.css';
import group from '@/views/shared/previewGroup.module.css';
import styles from './ButtonPreview.module.css';
import {
  previewButtonToneLabel,
  previewButtonVariantLabel,
  previewIconShapeLabel,
  previewLinkSizeLabel,
  previewLinkToneLabel,
  previewPaginationKindLabel,
  previewPaginationToneLabel,
  previewSizeLabel,
  previewStateDisableLabel,
  previewStateLoadingLabel,
} from '@/utils/previewLabel';

const sizes = [
  { key: 'lg', label: previewSizeLabel.lg },
  { key: 'md', label: previewSizeLabel.md },
  { key: 'sm', label: previewSizeLabel.sm },
  { key: 'xs', label: previewSizeLabel.xs },
] as const;

const variants = [
  { key: 'solid', label: previewButtonVariantLabel.solid },
  { key: 'outline', label: previewButtonVariantLabel.outline },
  { key: 'text', label: previewButtonVariantLabel.text },
] as const;

const tones = [
  { key: 'brand', label: previewButtonToneLabel.brand },
  { key: 'danger', label: previewButtonToneLabel.danger },
  { key: 'decor', label: previewButtonToneLabel.decor },
  { key: 'subtle', label: previewButtonToneLabel.subtle },
  { key: 'sameWhite', label: previewButtonToneLabel.sameWhite },
] as const;

const iconShapes = [
  { key: 'rectangular', label: previewIconShapeLabel.rectangular },
  { key: 'square', label: previewIconShapeLabel.square },
  { key: 'round', label: previewIconShapeLabel.round },
] as const;

const linkTones = [
  { key: 'brand', label: previewLinkToneLabel.brand },
  { key: 'theme', label: previewLinkToneLabel.theme },
] as const;

const linkSizes = [
  { key: 'lg', label: previewLinkSizeLabel.lg },
  { key: 'md', label: previewLinkSizeLabel.md },
  { key: 'sm', label: previewLinkSizeLabel.sm },
] as const;

const paginationKinds = [
  { key: 'number', label: previewPaginationKindLabel.number },
  { key: 'symbol', label: previewPaginationKindLabel.symbol },
  { key: 'button', label: previewPaginationKindLabel.button },
] as const;

const paginationTones = [
  { key: 'decor', label: previewPaginationToneLabel.decor },
  { key: 'brand', label: previewPaginationToneLabel.brand },
] as const;
</script>

<template>
  <div id="button-text" :class="group.previewGroup">
    <section id="button-variants" :class="shared.section">
      <h2 :class="shared.sectionTitle">Style</h2>
      <div :class="styles.previewStack">
        <div v-for="variant in variants" :key="variant.key" :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ variant.label }}</span>
          <div :class="styles.buttonRow">
            <EgButton :variant="variant.key">Button</EgButton>
          </div>
        </div>
      </div>
    </section>

    <section id="button-tones" :class="shared.section">
      <h2 :class="shared.sectionTitle">Tone</h2>
      <div :class="styles.previewStack">
        <div v-for="tone in tones" :key="tone.key" :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ tone.label }}</span>
          <div
            :class="[styles.buttonRow, tone.key === 'sameWhite' && styles.darkSurface]"
          >
            <EgButton :tone="tone.key">Button</EgButton>
          </div>
        </div>
      </div>
    </section>

    <section id="button-sizes" :class="shared.section">
      <h2 :class="shared.sectionTitle">Size</h2>
      <div :class="styles.previewStack">
        <div v-for="size in sizes" :key="size.key" :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ size.label }}</span>
          <div :class="styles.buttonRow">
            <EgButton :size="size.key">Button</EgButton>
          </div>
        </div>
      </div>
    </section>

    <section id="button-states" :class="shared.section">
      <h2 :class="shared.sectionTitle">States</h2>
      <div :class="styles.previewStack">
        <div :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ previewStateDisableLabel }}</span>
          <div :class="styles.buttonRow">
            <EgButton disabled>Button</EgButton>
          </div>
        </div>
        <div :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ previewStateLoadingLabel }}</span>
          <div :class="styles.buttonRow">
            <EgButton loading>Button</EgButton>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div id="button-icon" :class="group.previewGroup">
    <section id="icon-button-shapes" :class="shared.section">
      <h2 :class="shared.sectionTitle">Shape</h2>
      <div :class="styles.previewStack">
        <div v-for="shape in iconShapes" :key="shape.key" :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ shape.label }}</span>
          <div :class="styles.buttonRow">
            <EgIconButton :shape="shape.key" label="Add">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </EgIconButton>
          </div>
        </div>
      </div>
    </section>

    <section id="icon-button-sizes" :class="shared.section">
      <h2 :class="shared.sectionTitle">Size</h2>
      <div :class="styles.previewStack">
        <div v-for="size in sizes" :key="size.key" :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ size.label }}</span>
          <div :class="styles.buttonRow">
            <EgIconButton :size="size.key" label="Add">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </EgIconButton>
          </div>
        </div>
      </div>
    </section>

    <section id="icon-button-states" :class="shared.section">
      <h2 :class="shared.sectionTitle">States</h2>
      <div :class="styles.previewStack">
        <div :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ previewStateDisableLabel }}</span>
          <div :class="styles.buttonRow">
            <EgIconButton disabled label="Add">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </EgIconButton>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div id="button-icon-pro" :class="group.previewGroup">
    <section id="icon-button-pro-default" :class="shared.section">
      <h2 :class="shared.sectionTitle">Default</h2>
      <div :class="styles.buttonRow">
        <EgIconButtonPro label="Label">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </EgIconButtonPro>
      </div>
    </section>

    <section id="icon-button-pro-badges" :class="shared.section">
      <h2 :class="shared.sectionTitle">Badge</h2>
      <div :class="styles.buttonRow">
        <EgIconButtonPro label="Label" show-badge badge="0">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </EgIconButtonPro>
        <EgIconButtonPro label="Label" show-reddot>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </EgIconButtonPro>
      </div>
    </section>

    <section id="icon-button-pro-states" :class="shared.section">
      <h2 :class="shared.sectionTitle">States</h2>
      <div :class="styles.buttonRow">
        <EgIconButtonPro label="Label" disabled>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </EgIconButtonPro>
      </div>
    </section>
  </div>

  <div id="button-link" :class="group.previewGroup">
    <section id="link-tones" :class="shared.section">
      <h2 :class="shared.sectionTitle">Tone</h2>
      <div :class="styles.previewStack">
        <div v-for="tone in linkTones" :key="tone.key" :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ tone.label }}</span>
          <div :class="styles.buttonRow">
            <EgLink :tone="tone.key">Connect to EDS</EgLink>
          </div>
        </div>
      </div>
    </section>

    <section id="link-sizes" :class="shared.section">
      <h2 :class="shared.sectionTitle">Size</h2>
      <div :class="styles.previewStack">
        <div v-for="size in linkSizes" :key="size.key" :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ size.label }}</span>
          <div :class="styles.buttonRow">
            <EgLink :size="size.key">Connect to EDS</EgLink>
          </div>
        </div>
      </div>
    </section>

    <section id="link-states" :class="shared.section">
      <h2 :class="shared.sectionTitle">States</h2>
      <div :class="styles.previewStack">
        <div :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ previewStateDisableLabel }}</span>
          <div :class="styles.buttonRow">
            <EgLink disabled>Connect to EDS</EgLink>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div id="button-pagination" :class="group.previewGroup">
    <section id="pagination-kinds" :class="shared.section">
      <h2 :class="shared.sectionTitle">Kind</h2>
      <div :class="styles.previewStack">
        <div v-for="kind in paginationKinds" :key="kind.key" :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ kind.label }}</span>
          <div :class="styles.buttonRow">
            <EgPaginationItem :kind="kind.key" tone="decor" label="0">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 6l-6 6 6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </EgPaginationItem>
          </div>
        </div>
      </div>
    </section>

    <section id="pagination-tones" :class="shared.section">
      <h2 :class="shared.sectionTitle">Tone</h2>
      <div :class="styles.previewStack">
        <div v-for="tone in paginationTones" :key="tone.key" :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ tone.label }}</span>
          <div :class="styles.buttonRow">
            <EgPaginationItem kind="button" :tone="tone.key">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14m0 0-4-4m4 4-4 4"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </EgPaginationItem>
          </div>
        </div>
      </div>
    </section>

    <section id="pagination-states" :class="shared.section">
      <h2 :class="shared.sectionTitle">States</h2>
      <div :class="styles.previewStack">
        <div :class="styles.sizeRow">
          <span :class="styles.sizeLabel">{{ previewStateDisableLabel }}</span>
          <div :class="styles.buttonRow">
            <EgPaginationItem kind="number" tone="decor" label="0" disabled />
            <EgPaginationItem kind="button" tone="brand" disabled>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14m0 0-4-4m4 4-4 4"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </EgPaginationItem>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
