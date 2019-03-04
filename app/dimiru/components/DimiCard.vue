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
        <slot />
      </div>

      <div
        class="c-card__button"
        @click="$emit('button')"
      >
        <slot name="button" />
        <dimi-divider
          horizontal
          class="c-card__divider"
        />
      </div>
    </template>

    <template v-else>
      <slot />
    </template>
  </div>
</template>

<style lang="scss">
.c-card {
  position: relative;
  padding: 1.5rem;
  background-color: $white;
  border-radius: 15px;

  &--shadow {
    box-shadow: 15px 19px 32px -18px rgba(21, 19, 19, 0.07);
  }

  &--border {
    border: solid 1px $gray-lighten;
  }

  &--hover {
    transition: 0.5s box-shadow ease;
  }

  &--hover:hover {
    z-index: 1;
    box-shadow: 0 16px 36px 0 rgba(21, 19, 19, 0.15);
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
    position: absolute !important;
    width: 100%;
    margin: 0;
  }

  &__button {
    display: flex;
    align-items: stretch;
    padding: 1.25rem;
    margin-top: auto;
    cursor: pointer;
  }

  &__button > span {
    flex: 1;
    margin-top: 20px;
    font-weight: $font-weight-bold;
    text-align: center;
  }
}
</style>
