<script>
import DimiCard from './DimiCard.vue'

export default {
  name: 'DimiMenu',
  components: { DimiCard }
}

</script>

<template>
  <dimi-card class="menu"><slot/></dimi-card>
</template>

<style lang="scss" scoped>
.menu {
  padding: 12px 12px 12px 0;
  margin-bottom: 2rem;
}
</style>
