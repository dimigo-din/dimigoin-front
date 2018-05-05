<script>
import { meals } from '@/src/util'
import { mapState } from 'vuex'

export default {
  name: 'MealGroup',

  data () {
    return {
      pending: false
    }
  },

  computed: {
    meals: () => meals,
    ...mapState(['meal'])
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
      this.$emit('postFetch')
    }
  }
}
</script>

<template>
  <div class="meal-list">
    <dimi-meal-item
      v-for="(m, i) in meals"
      :key="i"
      :current="m.isActive()"
      :meal="m.name">
      {{ meal[m.key] | prettyMeal }}</dimi-meal-item>
  </div>
</template>

<style lang="scss">

.meal-list {
  color: $gray;
}

</style>
