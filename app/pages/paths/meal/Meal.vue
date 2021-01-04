<script>
import { getISOWeek, startOfMonth, setDay } from 'date-fns'
import meals from '@/src/util/meals'
import { meal } from '@/src/api/meal'

import DefaultNavbar from '@/components/DefaultNavbar.vue'
import ContentWrapper from '@/components/ContentWrapper.vue'

const shortWeeks = [...'일월화수목금토']
const longWeeks = shortWeeks.map(x => x + '요일')

export default {
  name: 'Meal',
  components: { DefaultNavbar, ContentWrapper },

  data: () => ({
    currentDate: new Date(),
    currentDay: new Date().getDay(),
    list: [...Array(7)].map(_ => ({}))
  }),

  computed: {
    meals: () => meals,
    weeks: () => longWeeks,
    tinyWeeks: () => shortWeeks,
    today: () => new Date().getDay(),
    month: () => 1 + new Date().getMonth(),
    week () {
      const todayWeak = getISOWeek(this.currentDate)
      const thisMonthWeak = getISOWeek(startOfMonth(this.currentDate))
      console.log(todayWeak, thisMonthWeak)
      if (todayWeak < thisMonthWeak) { return 1 }
      return 1 + todayWeak - thisMonthWeak
    },
    currentMeals () { return this.list[this.currentDay] }
  },

  async created () {
    const meals = this.weeks.map((v, i) =>
      meal.getMeal(setDay(this.currentDate, i)))

    this.list = await Promise.all(meals)
  }
}
</script>

<template>
  <div>
    <default-navbar />
    <content-wrapper class="container meal">
      <h1 slot="header">
        <span class="icon-school-meal" />
        {{ month }}월 {{ week }}주차 급식 편성
      </h1>
      <dimi-card
        slot="main"
        class="meal__card"
      >
        <dimi-tab
          v-model="currentDay"
          :tabs="weeks"
          :small-tabs="tinyWeeks"
          class="meal__tabs"
        />

        <div
          v-for="(meal, index) in meals"
          :key="index"
          :active="today === currentDay && meal.isActive()"
          class="meal__timeline"
        >
          <h3 class="meal__title">
            {{ meal.name }}
          </h3>
          <p class="meal__content">
            {{ currentMeals[meal.key] | prettyMeal }}
          </p>
        </div>
      </dimi-card>
    </content-wrapper>
  </div>
</template>

<style lang="scss">
.meal {
  &__card {
    padding-top: 0 !important;
  }

  &__title {
    color: $gray;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__title::before {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 16px;
    background-color: $gray;
    border-radius: 50%;
    content: '';
  }

  &__content {
    position: relative;
    min-height: 80px;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 32px;
    color: $gray-light;
    font-size: 16px;
    line-height: 1.8;
  }

  &__timeline:not(:last-of-type) &__content::before {
    position: absolute;
    top: 0;
    left: calc(0.5em - 2px);
    width: 4px;
    height: 100%;
    background-color: $gray-lighten;
    border-radius: 2px;
    content: '';
  }

  &__timeline:last-of-type &__content {
    min-height: unset;
  }

  &__timeline:first-of-type {
    padding-top: 40px;
  }

  &__timeline[active] &__content {
    color: $gray-dark;
  }

  &__timeline[active] &__title {
    color: $red;
  }

  &__timeline[active] &__title::before {
    background-color: $red;
  }
}
</style>
