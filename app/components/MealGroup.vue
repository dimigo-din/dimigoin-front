<script>
import meals from '@/src/util/meals'
import { meal } from '@/src/api/meal'

export default {
  name: 'MealGroup',

  data () {
    return {
      meal: {
        breakfast: '',
        lunch: '',
        dinner: ''
      },
      pending: false
    }
  },

  computed: {
    meals: () => meals
  },

  async created () {
    if (meal.isTomorrow()) {
      const tomorrow = new Date(Date.now() + (24 * 60 * 60 * 1000))
      this.meal = await meal.getMeal(tomorrow)
    } else this.meal = await meal.getTodayMeal()
  }
}
</script>

<template>
  <div class="meal-list">
    <dimi-meal-item
      v-for="(m, i) in meals"
      :key="i"
      :current="m.isActive()"
      :meal="m.name"
    >
      {{ meal[m.key] | prettyMeal }}
    </dimi-meal-item>
  </div>
</template>

<style lang="scss" scoped>
.meal-list {
  color: $gray;
}

</style>
