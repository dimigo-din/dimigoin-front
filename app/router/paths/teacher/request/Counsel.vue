<script>
import moment from 'moment'
import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import DefaultNavbar from '@/router/partial/DefaultNavbar.vue'
import { counsel } from '@/src/api'

export default {
  name: 'Counsel',

  components: { ContentWrapper, DefaultNavbar },

  filters: {
    filterTime (time) {
      const month = moment(time).format('MM')
      const date = moment(time).format('DD')
      const day = moment(time).format('dddd')
      const hour = moment(time).format('hh')
      const minute = moment(time).format('mm')
      const sejong = day === 'Wendnesday' ? '수요일' : '금요일'
      return sejong + ' ( ' + month + '월 ' + date + '일 ) ' + hour + '시 ' + minute + '분 ~ '
    },
    filterEndTime (time) {
      const hour = moment(time).format('hh')
      const minute = moment(time).format('mm')
      return hour + '시 ' + minute + '분'
    }
  },
  data () {
    return {
      pending: false,
      list: []
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list = await counsel.getCounsel()
      this.pending = false
    }
  }
}
</script>

<template lang="html">
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-comment"/>상담 신청 관리
      <span
        class="counsel__excel"
        onclick="location.href='http://dev-api.dimigo.in/counsel/excel'">
        <span class="icon-long-arrow-down"/>엑셀 다운로드
      </span>
    </h1>

    <dimi-card
      slot="main"
      class="counsel__main">

      <div
        v-if="pending"
        class="counsel__loader-wrapper">
        <dimi-loader/>
      </div>

      <template v-else>
        <div
          v-for="(counsel, index) in list"
          :key="`counsel-${index}`">
          <div class="counsel__list">
            <span class="counsel__title">
              {{ counsel.startDate | filterTime }}{{ counsel.endDate | filterEndTime }}
            </span>
            <div class="counsel__speaker">
              <template v-if="counsel.caniapplied === 'no'">
                {{ counsel.request.user.serial }} {{ counsel.request.user.name }}
              </template>
              <template>신청자 없음</template>
            </div>
          </div>
        </div>
      </template>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.counsel {
  &__loader-wrapper {
    align-items: center;
    display: flex;
    height: 35vh;
    justify-content: center;
  }

  &__main {
    padding-top: 0;
  }

  &__excel {
    color: $aloes;
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__list {
    align-items: center;
    border-bottom: 1px solid $gray-lighter;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    padding: 24px;
  }

  &__title {
    color: $black !important;
    flex: 1;
    font-size: 16px;
    font-weight: $font-weight-bold;
    margin-right: 16px;
  }

  &__item {
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
    margin-right: 16px;
  }

}
</style>
