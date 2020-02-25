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
    box-shadow: 0 5px 15px 0 rgba(234, 51, 51, 0.41);
    text-shadow: 2px 2px 3px rgba(248, 105, 105, 0.9);
    color: $white;
  }

  &--active.menu-item:hover {
    box-shadow: 0px 3px 15px 0 rgba(234, 51, 51, 0.41);
  }
}
</style>
