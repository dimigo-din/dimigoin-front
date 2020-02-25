<script>
import DimiDivider from './DimiDivider.vue'

export default {
  name: 'DimiCard',
  components: { DimiDivider },

  props: {
    hover: { type: Boolean, default: false },
    clickable: { type: Boolean, defualt: false }
  },
  computed: {
    computedClass () {
      return {
        'c-card': true,
        'c-card--hover': this.hover,
        'c-card--click': this.clickable,
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
  padding: 25px;
  background-color: $white;
  border-radius: 3.3rem;
  box-shadow:  20px 20px 60px #d9d9d9,
    -20px -20px 60px #fff;

  &--hover:hover {
    box-shadow: -2px -2px 5px $white, 2px 2px 5px $shadow;
  }

  &--click:active {
    box-shadow: inset 1px 1px 2px $shadow, inset -1px -1px 2px $white;
  }

  &--button {
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
  }

  &__content {
    padding: 0.5rem;
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
