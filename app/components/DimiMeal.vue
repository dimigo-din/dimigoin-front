<script>
import DimiMealItem from './DimiMealItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'DimiMeal',

  components: { DimiMealItem },

  filters: {
    beautifulMeal (value) {
      return value.split('/').join(' | ')
    }
  },

  data () {
    return {
      pending: false
    }
  },

  computed: {
    ...mapState('meal', ['breakfast', 'lunch', 'dinner', 'snack'])
  },

  async mounted () {
    if (!this.$store.state.meal.isFetched) {
      this.pending = true
      try {
        await this.$store.dispatch('meal/fetchMeal')
      } catch (err) {
        console.error(err)
      }
      this.pending = false
    }
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
      :current="isBetween(0, 815)">{{ breakfast | beautifulMeal }}</dimi-meal-item>
    <dimi-meal-item
      meal="점심"
      :current="isBetween(816, 1340)">{{ lunch | beautifulMeal }}</dimi-meal-item>
    <dimi-meal-item
      meal="저녁"
      :current="isBetween(1341, 1920)">{{ dinner | beautifulMeal }}</dimi-meal-item>
    <dimi-meal-item
      meal="간식"
      :current="isBetween(1921, 2140)">{{ snack | beautifulMeal }}</dimi-meal-item>
  </div>
</template>

<style lang="scss">

.meal-list {
  color: $gray;
}

</style>
