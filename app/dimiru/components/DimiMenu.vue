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
  padding: 0.75rem 0.75rem 0.75rem 0 !important;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
