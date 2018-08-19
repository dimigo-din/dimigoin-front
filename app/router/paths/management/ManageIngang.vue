<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'

import { ingang } from '@/src/api'

export default {
  name: 'Ingang',
  components: { ContentWrapper },

  data: () => ({
    pending: false,
    currentTab: 0,
    ingangs: {
      firstG: {
        firstT: [],
        secondT: []
      },
      secondG: {
        firstT: [],
        secondT: []
      }
    }
  }),

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.ingangs.firstG.firstT = await ingang.getGradeTimeIngang(1, 1)
      this.ingangs.firstG.secondT = await ingang.getGradeTimeIngang(1, 2)
      this.ingangs.secondG.firstT = await ingang.getGradeTimeIngang(2, 1)
      this.ingangs.secondG.secondT = await ingang.getGradeTimeIngang(2, 2)
      this.pending = false
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header"><span class="icon-internet-class"/>인강실 신청 관리
      <span
        v-if="currentTab < 2"
        class="ingang__excel"
        onclick="location.href='http://dev-api.dimigo.in/ingangs/excel/1'">
        <span class="icon-long-arrow-down"/>엑셀 다운로드
      </span>
      <span
        v-if="currentTab > 1"
        class="ingang__excel"
        onclick="location.href='http://dev-api.dimigo.in/ingangs/excel/2'">
        <span class="icon-long-arrow-down"/>엑셀 다운로드
      </span>
    </h1>
    <dimi-card
      slot="main"
      class="ingang">
      <dimi-tab
        v-model="currentTab"
        :tabs="['1학년 1타임', '1학년 2타임', '2학년 1타임', '2학년 2타임']"/>
      <div
        v-if="pending"
        class="ingang__loader">
        <dimi-loader/>
      </div>
      <h2
        v-else
        class="ingang__working">
        인강실 관리페이지는 공사중입니다<br>엑셀 다운로드를 통해 인원점검 부탁드립니다
      </h2>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.ingang {
  padding: 0;

  &__loader {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__list {
    color: $gray;
    display: block;
    font-weight: $font-weight-bold;
    max-height: 600px;
    min-height: 300px;
    overflow-y: auto;
    padding: 0 3rem;
    width: 100%;
  }

  &__excel {
    color: $aloes;
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__working {
    color: $gray-dark;
    font-size: 32px;
    font-weight: $font-weight-bold;
    margin: 1rem 0;
    text-align: center;
  }

  &__row {
    padding: 0 1.5rem;
  }

  &__row:not(:last-child) {
    border-bottom: 1px solid $gray-lighter;
  }

  &__cell {
    padding: 24px 0;
    white-space: nowrap;
  }

  &__cell:not(:last-child) {
    padding-right: 24px;
  }

  &__cell--name {
    color: $black;
    width: 99%;
  }

  &__download {
    display: flex;
    justify-content: flex-end;
    padding: 24px;
  }
}
</style>
