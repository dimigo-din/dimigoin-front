<script>
export default {
  name: 'DimiBadge',

  props: {
    color: {
      type: String,
      default: 'aloes',
      validator: c => ['cyan', 'aloes', 'orange', 'gray'].includes(c)
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
  <div :class="computedClass">
    <slot />
  </div>
</template>

<style lang="scss">
@import '../scss/vars';

.badge {
  padding: 0.5em 1.1em;
  border-radius: 20px;
  font-size: 14px;
  line-height: 0.86;
  text-align: center;

  &--aloes {
    background-color: $aloes;
    color: $white;
    box-shadow: 0 5px 15px rgba(0, 180, 162, 0.41);
  }

  &--orange {
    background-color: $orange;
    color: $white;
    box-shadow: 0 5px 15px rgba(245, 105, 61, 0.41);
  }

  &--gray {
    background-color: $gray-lighter;
    color: $gray-dark;
    box-shadow: 0 5px 15px rgba(231, 231, 231, 0.41);
  }

  &--cyan {
    background-color: $cyan;
    color: $white;
    box-shadow: 0 5px 15px rgba(17, 157, 230, 0.41);
  }
}
</style>
