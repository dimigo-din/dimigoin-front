<script>
import moment from 'moment'
import { meals } from '@/src/util'
import { meal } from '@/src/api'

import DefaultNavbar from '@/router/partial/DefaultNavbar.vue'
import ContentWrapper from '@/router/partial/ContentWrapper.vue'

const shortWeeks = [...'일월화수목금토']
const longWeeks = shortWeeks.map(x => x + '요일')

export default {
  name: 'Meal',
  components: { DefaultNavbar, ContentWrapper },

  data: () => ({
    currentDay: moment().day(),
    list: [...Array(7)].map(_ => ({}))
  }),

  computed: {
    meals: () => meals,
    weeks: () => longWeeks,
    tinyWeeks: () => shortWeeks,
    today: () => moment().day(),
    month: () => 1 + moment().month(),
    week: () => 1 + moment().week() - moment().date(1).week(),
    currentMeals () { return this.list[this.currentDay] }
  },

  async created () {
    const meals = this.weeks.map((v, i) =>
      meal.getMeal(moment().day(i)))

    this.list = await Promise.all(meals)
  }
}
</script>

<template>
  <div>
    <default-navbar/>
    <content-wrapper class="container meal">
      <h1 slot="header">
        <span class="icon-school-meal"/>
        {{ month }}월 {{ week }}주차 급식 편성
      </h1>
      <dimi-card
        slot="main"
        class="meal__card">

        <dimi-tab
          v-model="currentDay"
          :tabs="weeks"
          :small-tabs="tinyWeeks"
          class="meal__tabs"/>

        <div
          v-for="(meal, index) in meals"
          :key="index"
          :active="today === currentDay && meal.isActive()"
          class="meal__timeline">

          <h3 class="meal__title">{{ meal.name }}</h3>
          <p class="meal__content">{{ currentMeals[meal.key] | prettyMeal }}</p>
        </div>
      </dimi-card>
    </content-wrapper>
  </div>
</template>

<style lang="scss">
@import '~styles/variables';

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
    background-color: $gray;
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 16px;
    margin-right: 16px;
    width: 16px;
  }

  &__content {
    color: $gray-light;
    font-size: 16px;
    line-height: 1.8;
    min-height: 80px;
    padding-bottom: 16px;
    padding-left: 32px;
    padding-top: 16px;
    position: relative;
  }

  &__timeline:not(:last-of-type) &__content::before {
    background-color: $gray-lighten;
    border-radius: 2px;
    content: '';
    height: 100%;
    left: calc(0.5em - 2px);
    position: absolute;
    top: 0;
    width: 4px;
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
