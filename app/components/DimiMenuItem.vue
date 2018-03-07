<script>
export default {
  name: 'DimiMenuItem',
  props: {
    to: {
      type: [String, Object],
      default: '',
      required: true
    }
  }
}
</script>

<template>
  <router-link
    :to="to"
    class="menu-item"
    exact-active-class="menu-item--active"><slot/></router-link>
</template>

<style lang="scss">
@import '../scss/helpers/typography';

.menu-item {
  @extend %h-text-r;
  @extend %h-text-gray-light;
  @include font-bold;
  border-radius: 0 4em 4em 0;
  display: block;
  padding: 0.6em 0 0.6em 3em;
  text-decoration: none;

  &--active.menu-item {
    @extend %h-text-white;
    background-color: $red !important;
  }
}
</style>
