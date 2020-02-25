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
    exact-active-class="menu-item--active"
  >
    <slot />
  </router-link>
</template>

<style lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.menu-item {
  display: block;
  width: fit-content;
  padding: 0.6em;
  margin-left: 0.6em;
  border-radius: 4em;
  color: $gray-light;
  font-size: 16px;
  font-weight: $font-weight-bold;
  text-decoration: none;

  &--active.menu-item {
    background-color: $red !important;
    color: $white;
  }
}
</style>
