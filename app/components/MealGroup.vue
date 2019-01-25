<script>
import meals from '@/src/util/meals'
import * as meal from '@/src/api/meal'
import NProgress from 'nprogress'

export default {
  name: 'MealGroup',

  data () {
    return {
      meal: {
        breakfast: '',
        lunch: '',
        dinner: '',
        snack: ''
      },
      pending: false
    }
  },

  computed: {
    meals: () => meals
  },

  async created () {
    NProgress.start()
    this.meal = await meal.getTodayMeal()
    NProgress.done()
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

<style lang="scss">
.meal-list {
  color: $gray;
}

</style>
