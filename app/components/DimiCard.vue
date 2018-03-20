<script>
import DimiDivider from './DimiDivider.vue'

export default {
  name: 'DimiCard',
  components: { DimiDivider },

  props: {
    hover: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false }
  },
  computed: {
    computedClass () {
      return {
        'c-card': true,
        'c-card--shadow': this.shadow,
        'c-card--hover': this.hover,
        'c-card--border': !this.shadow,
        'c-card--button': !!this.$slots.button
      }
    }
  }
}
</script>

<template>
  <div :class="computedClass">
    <template v-if="$slots.button">
      <div class="c-card__content">
        <slot/>
      </div>

      <dimi-divider
        horizontal
        class="c-card__divider"/>

      <div
        class="c-card__button"
        @click="$emit('button')">
        <slot name="button"/>
      </div>
    </template>

    <template v-else>
      <slot/>
    </template>
  </div>
</template>

<style lang="scss">
.c-card {
  background-color: $white;
  border-radius: 6px;
  padding: 1.25rem;
  position: relative;

  &--shadow {
    box-shadow: 0 6px 12px 0 rgba(21, 19, 19, 0.1);
  }

  &--border {
    border: solid 1px $gray-lighten;
  }

  &--hover {
    transition: 0.5s box-shadow ease;
  }

  &--hover:hover {
    box-shadow: 0 16px 36px 0 rgba(21, 19, 19, 0.15);
    z-index: 1;
  }

  &--button {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  &__content {
    padding: 1.25rem;
  }

  &__divider {
    margin: 0;
    position: relative !important;
    width: 100%;
  }

  &__button {
    align-items: stretch;
    cursor: pointer;
    display: flex;
    padding: 1.25rem;
  }

  &__button > span {
    @include font-bold;
    flex: 1;
    text-align: center;
  }
}
</style>
