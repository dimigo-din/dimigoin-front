<script>
import DimiMealItem from './DimiMealItem.vue'

export default {
    name: 'DimiMeal',
    components: { DimiMealItem }
}
</script>

<template>
    <div class="c-meal-list">
        <dimi-meal-item breakfast></dimi-meal-item>
        <dimi-meal-item lunch></dimi-meal-item>
        <dimi-meal-item dinner></dimi-meal-item>
        <dimi-meal-item snack></dimi-meal-item>
    </div>
</template>

<style lang="scss" scoped>

.c-meal-list {
    color: $gray;
}

</style>
