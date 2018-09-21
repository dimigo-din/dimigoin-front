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
@import '../scss/vars';
@import '../scss/mixins';

.menu-item {
  border-radius: 0 4em 4em 0;
  color: $gray-light;
  display: block;
  font-size: 16px;
  font-weight: $font-weight-bold;
  padding: 0.6em 0 0.6em 3em;
  text-decoration: none;

  @include from($desktop) {
    @include until($widescreen) {
      padding-left: 1.5em;
    }
  }

  &--active.menu-item {
    background-color: $red !important;
    color: $white;
  }
}
</style>
