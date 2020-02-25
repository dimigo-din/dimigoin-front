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
  padding: 1.5rem 0.75rem 1.5rem 0 !important;
  margin-bottom: 2rem;
}
</style>
