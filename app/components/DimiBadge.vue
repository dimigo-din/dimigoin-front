<script>
export default {
  name: 'DimiBadge',

  props: {
    color: {
      type: String,
      default: 'aloes',
      validator: c => ['aloes', 'orange', 'gray'].includes(c)
    }
  },

  computed: {
    computedClass () {
      return ['badge', 'badge--' + this.color]
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
  line-height: 0.86;
  padding: 0.3em 1.1em;
  border-radius: 10px;
  text-align: center;

  &--aloes {
    background-color: $aloes;
    color: $white;
  }

  &--orange {
    background-color: $orange;
    color: $white;
  }

  &--gray {
    background-color: $gray-lighter;
    color: $gray-dark;
  }
}
</style>
