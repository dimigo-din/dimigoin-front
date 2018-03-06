<script>
export default {
  name: 'DimiBadge',

  props: {
    aloes: {
      type: Boolean,
      default: false
    },
    orange: {
      type: Boolean,
      default: false
    },
    gray: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedClass () {
      return {
        'badge': true,
        'badge--aloes': this.aloes,
        'badge--orange': this.orange,
        'badge--gray': this.gray
      }
    }
  }
}
</script>

<template>
  <div :class="computedClass"><slot/></div>
</template>

<style lang="scss">
.badge {
  font-size: 14px;
  padding: 0.3em 1.5em;

  &--aloes {
    background-color: $aloes;
    color: $white;
  }

  &--orange {
    background-color: $orange;
    color: $white;
  }

  &--gray {
    background-color: $gray;
    color: $gray-dark;
  }
}
</style>
