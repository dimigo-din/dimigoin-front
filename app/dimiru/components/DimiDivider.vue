<script>
export default {
  name: 'DimiDivider',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedClass () {
      if (this.horizontal || this.vertical === this.horizontal) {
        return ['divider', 'divider--horizontal']
      } else {
        return ['divider', 'divider--vertical']
      }
    }
  }
}
</script>

<template>
  <hr :class="computedClass">
</template>

<style lang="scss">
@import '../scss/vars';

.divider {
  position: absolute;
  border: 0;

  &--horizontal {
    right: 0;
    left: 0;
    border-top: solid 1px $gray-lighten;
  }

  &--vertical {
    top: 0;
    bottom: 0;
    border-left: solid 1px $gray-lighten;
  }
}
</style>
