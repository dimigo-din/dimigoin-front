<script>
export default {
  name: 'DimiMenuItem',
  props: {
    to: {
      type: [String, Object],
      default: '',
      required: true
    }
  },
  computed: {
    computedClass () {
      return {
        'menu-item': true,
        'menu-item--active': this.isActive
      }
    },
    isActive () {
      const { path, name } = this.$store.state.route
      return path === this.to || name === this.to.name
    }
  }
}
</script>

<template>
  <router-link
    :class="computedClass"
    :to="to"><slot/></router-link>
</template>

<style lang="scss">
@import '../scss/helpers/typography';

.menu-item {
  display: block;
  text-decoration: none;
  padding: .6em 0 .6em 3em;
  border-radius: 0 4em 4em 0;
  color: $gray-light;
  @extend %h-text-r;
  @include font-bold;

  &--active {
    background-color: $red;
    @extend %h-text-white;
  }
}
</style>
