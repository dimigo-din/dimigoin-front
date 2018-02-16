<script>
import DimiMealItem from './DimiMealItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'DimiMeal',
  components: { DimiMealItem },
  computed: {
    ...mapState({
      breakfast: state => state.meal.breakfast,
      lunch: state => state.meal.lunch,
      dinner: state => state.meal.dinner,
      snack: state => state.meal.snack
    })
  }
}
</script>

<template>
  <div class="c-meal-list">
    <dimi-meal-item meal="아침">{{ breakfast }}</dimi-meal-item>
    <dimi-meal-item meal="점심">{{ lunch }}</dimi-meal-item>
    <dimi-meal-item meal="저녁">{{ dinner }}</dimi-meal-item>
    <dimi-meal-item meal="간식">{{ snack }}</dimi-meal-item>
  </div>
</template>

<style lang="scss" scoped>

.c-meal-list {
  color: $gray;
}

</style>
