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
          :tabs="weeks"/>

        <!-- TODO: Add meal view -->
      </dimi-card>
    </content-wrapper>
  </div>
</template>

<script>
import moment from 'moment'

import DefaultNavbar from './partial/DefaultNavbar.vue'
import ContentWrapper from './partial/ContentWrapper.vue'

import DimiTab from '../components/DimiTab.vue'
import DimiCard from '../components/DimiCard.vue'

const getWeekOfMonth = () =>
  1 + moment().week() - moment().date(1).week()

export default {
  name: 'Meal',
  components: { DefaultNavbar, ContentWrapper, DimiTab, DimiCard },

  data: () => ({ currentDay: moment().day() }),
  computed: {
    week: getWeekOfMonth,
    month: () => moment().month(),
    weeks: () => Array.from('일월화수목금토', x => `${x}요일`)
  }
}
</script>

<style lang="scss">
.meal {
  &__card {
    padding-top: 0;
  }
}
</style>
