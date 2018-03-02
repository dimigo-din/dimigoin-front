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

<style lang="scss" scoped>
.divider {
  position: absolute;
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
