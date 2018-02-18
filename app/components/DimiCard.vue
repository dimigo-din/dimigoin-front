<script>
export default {
  name: 'DimiCard',

  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedClass () {
      const classes = {
        'c-card': true,
        'c-card--shadow': this.shadow
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
}
</style>
