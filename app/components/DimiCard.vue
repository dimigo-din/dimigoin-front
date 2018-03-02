<script>
export default {
  name: 'DimiCard',

  props: {
    shadow: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedClass () {
      const classes = {
        'c-card': true,
        'c-card--shadow': this.shadow,
        'c-card--hover': this.hover,
        'c-card--border': !this.shadow
      }
      return classes
    }
  }
}
</script>

<template>
  <div :class="computedClass">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.c-card {
  position: relative;
  background-color: $white;
  border-radius: 6px;
  padding: 1.25rem;
  &--shadow {
    box-shadow: 0 6px 12px 0 rgba(21, 19, 19, 0.1);
  }
  &--border {
    border: solid 1px $gray-lighten;
  }
  &--hover {
    transition: .5s box-shadow ease, 0s z-index .5s;
    &:hover {
      box-shadow: 0px 16px 36px 0 rgba(21, 19, 19, 0.15);
      z-index: 1;
    }
  }
}
</style>
