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
        'menu-item--disable': !this.isActive,
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
  @extend %h-text-r;
  @include font-bold;
  border-radius: 0 4em 4em 0;
  display: block;
  padding: 0.6em 0 0.6em 3em;
  text-decoration: none;

  &--disable {
    @extend %h-text-gray-light;
  }

  &--active {
    @extend %h-text-white;
    background-color: $red;
  }
}
</style>
