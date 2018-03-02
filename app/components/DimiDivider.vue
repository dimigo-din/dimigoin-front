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
  <span :class="computedClass"/>
</template>

<style lang="scss">
.divider {
  position: absolute;

  &--horizontal {
    border-top: solid 1px $gray-lighten;
    left: 0;
    right: 0;
  }

  &--vertical {
    border-left: solid 1px $gray-lighten;
    bottom: 0;
    top: 0;
  }
}
</style>
