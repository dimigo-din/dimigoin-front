<script>
import DimiCard from './DimiCard.vue'

export default {
  name: 'CircleCard',

  components: { DimiCard },

  props: {
    circle: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    hasBadge () {
      return true // TODO
    }
  }
}
</script>

<template>
  <dimi-card class="circle-card">
    <div class="circle-card__info"></div>
    <div class="circle-card__description"></div>
    <div
      v-if="hasBadge"
      class="circle-card__badge"></div>
  </dimi-card>
</template>

<style lang="scss">
.circle-card {
  &__info {
    display: flex;
  }

  &__description {

  }

  &__badge {

  }
}
</style>
