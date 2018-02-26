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
        'c-card--hover': this.hover
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
  max-width: 100%;
  background-color: #fff;
  @include dimi-border;
  &--shadow {
    box-shadow: 0px 6px 12px 0 rgba(21, 19, 19, 0.1);
  }
  &--hover {
    transition: .5s box-shadow ease;
    &:hover {
      box-shadow: 0px 16px 36px 0 rgba(21, 19, 19, 0.15);
      z-index: 100;
    }
  }
}
</style>
