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
      console.log(this.$slots)
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
    <slot/>
    <div class="c-card__button">
      <dimi-divider horizontal/>
      <div class="c-card__slot">
        <slot name="button"/>
      </div>
    </div>
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
  }

  &__button {
    display: none;
  }

  &--button &__button {
    display: block;
  }

  &__slot {
    align-items: stretch;
    display: flex;
    margin-top: 1.75rem;
  }

  &__slot > * {
    @include font-bold;
    cursor: pointer;
    flex: 1;
    text-align: center;
  }
}
</style>
