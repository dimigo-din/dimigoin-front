<script>
import DimiCard from './DimiCard.vue'

export default {
  name: 'DimiMenu',
  components: { DimiCard }
}

</script>

<template>
  <dimi-card class="menu">
    <slot />
  </dimi-card>
</template>

<style lang="scss">
@import '../scss/vars';

.menu {
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding: 0.75rem 0.75rem 0.75rem 0 !important;
}
</style>
