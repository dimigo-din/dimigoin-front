<script>
import DimiMealItem from './DimiMealItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'DimiMeal',

  components: { DimiMealItem },

  computed: {
    ...mapState('meal', ['breakfast', 'lunch', 'dinner', 'nosh'])
  },

  async mounted () {
    await this.$store.dispatch('meal/fetchMeal')
  },

  methods: {
    isBetween (from, to) {
      const now = new Date()
      const formatted = now.getHours() * 100 + now.getMinutes()
      return formatted >= from && formatted <= to
    }
  }
}
</script>

<template>
  <div class="meal-list">
    <dimi-meal-item
      meal="아침"
      :current="isBetween(0, 815)">{{ breakfast }}</dimi-meal-item>
    <dimi-meal-item
      meal="점심"
      :current="isBetween(816, 1340)">{{ lunch }}</dimi-meal-item>
    <dimi-meal-item
      meal="저녁"
      :current="isBetween(1341, 1920)">{{ dinner }}</dimi-meal-item>
    <dimi-meal-item
      meal="간식"
      :current="isBetween(1921, 2140)">{{ nosh }}</dimi-meal-item>
  </div>
</template>

<style lang="scss" scoped>

.meal-list {
  color: $gray;
}

</style>
