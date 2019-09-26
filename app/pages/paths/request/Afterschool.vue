<script>
import { format, distanceInWordsToNow } from 'date-fns'
import koLocale from 'date-fns/locale/ko'
import { afterschool } from '@/src/api/afterschool'
import days from '@/src/util/days'

import ContentWrapper from '@/components/ContentWrapper.vue'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'RequestAfterschool',
  components: { ContentWrapper, VueRecaptcha },

  filters: {
    dateRange (item) {
      const [a, b] = [new Date(item.startDate), new Date(item.endDate)]
      const startSince = distanceInWordsToNow(a, { locale: koLocale })
      const endSince = distanceInWordsToNow(b, { locale: koLocale })
      const startFormat = format(a, 'YYYY년 MM월 DD일 dddd A h시 m분', { locale: koLocale })
      const endFormat = format(b, 'YYYY년 MM월 DD일 dddd A h시 m분', { locale: koLocale })

      return `${startSince}에 시작 (${startFormat})\n${endSince}에 마감 (${endFormat})`
    },
    filterTime: time => format(time, 'HH:mm:ss')
  },

  data () {
    return {
      list: [],
      now: new Date(),
      pending: false,
      currentDay: 0,
      captchaOpen: false,
      captchaResponse: null,
      callbackAfterCaptcha: () => null
    }
  },

  computed: {
    days () { return days },
    sitekey () { return process.env.RECAPTCHA_SITE_KEY },

    currentList () {
      return this.list.filter(item => item.day.includes(days[this.currentDay].code))
        .sort((a, b) => a.time.length === 2 ? -1 : 1)
        .sort((a, b) => a.time.length === 2 ? -1 : a.time[0] - b.time[0])
    }
  },

  async created () {
    await this.refresh()

    setInterval(() => {
      this.now = new Date()
    }, 1000)
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list = await afterschool.getStudentAfterschool()
      this.pending = false
    },

    verifyRecaptcha (response) {
      this.captchaResponse = response
      if (response) {
        this.captchaOpen = false
        this.callbackAfterCaptcha()
        this.callbackAfterCaptcha = () => null
      }
    },

    checkApplyRange (item) {
      return item.startDate <= this.now && this.now <= item.endDate
    },

    isAvailable (item) {
      return !this.list.filter(v => item.day.filter(_v => v.day.includes(_v)).length > 0) // 날짜가 겹치는 방과후 모두 필터링
        .filter(v => item.time.filter(_v => v.time.includes(_v)).length > 0) // 신청 대상의 타임에 포함되는 방과후 필터링
        .filter(v => v.status === 'request') // 그 중, 신청한 것만 필터링
        .length && item.maxCount > item.count && // 꽉 차지 않은 방과후만 필터링
        this.checkApplyRange(item) // 신청 기간
    },

    async toggleApply (item) {
      if (!this.checkApplyRange(item)) return
      if (!item.status && !this.isAvailable(item)) return

      try {
        if (item.status === null && !this.applied) await this.apply(item)
        else await afterschool.cancelAfterschool(item.idx)
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }

      await this.refresh()
    },

    async apply (item) {
      if (this.captchaResponse === null) {
        this.captchaOpen = true
        this.callbackAfterCaptcha = () => this.toggleApply(item)
        return
      }

      try {
        await afterschool.applyAfterschool(item.idx, this.captchaResponse)
      } catch (e) {
        throw e
      } finally {
        this.captchaResponse = null
        this.$refs.recaptcha.reset()
      }
    },

    getAfscTime (item) {
      return item.time.length === 2 ? '연강'
        : `${item.time.join()}타임`
    }
  }
}
</script>

<template>
  <content-wrapper class="req-afsc">
    <h1 slot="header">
      <span class="icon-ball" />방과 후 활동 신청
      <span
        class="req-afsc__refresh"
        @click="refresh"
      >
        새로고침
      </span>
      <span
        class="req-afsc__time"
      >
        {{ now | filterTime }}
      </span>
    </h1>

    <dimi-card
      slot="main"
      class="req-afsc__main"
    >
      <dimi-tab
        v-model="currentDay"
        :tabs="days.map(v => v.text)"
        :small-tabs="days.map(v => v.smallText)"
      />

      <div
        v-if="pending"
        class="req-afsc__loader-wrapper"
      >
        <dimi-loader />
      </div>

      <table
        v-else-if="currentList.length"
        class="req-afsc__list"
      >
        <tbody>
          <tr
            v-for="(item, idx) in currentList"
            :key="`aftc-${currentDay}-${idx}`"
            class="req-afsc__row"
          >
            <td class="req-afsc__cell req-afsc__cell--time">
              {{ getAfscTime(item) }}
            </td>
            <td class="req-afsc__cell req-afsc__cell--name">
              {{ item.name }}
            </td>
            <td class="req-afsc__cell">
              {{ item.teacherName }}
            </td>
            <td
              :title="`${item.count}/${item.maxCount}`"
              class="req-afsc__cell"
            >
              {{ (item.maxCount - item.count) + '명 남음' }}
            </td>
            <td
              :class="{
                'req-afsc__cell': true,
                'req-afsc__cell--button': true,
                'req-afsc__cell--full': item.maxCount === item.count,
                'req-afsc__cell--applied': item.status === 'request',
                'req-afsc__cell--applied--ended': item.status === 'request' && !checkApplyRange(item),
                'req-afsc__cell--disabled': !item.status && !isAvailable(item)
              }"
              :title="item | dateRange"
              @click="toggleApply(item)"
            >
              <template v-if="item.status === 'request'">
                <span class="icon-cross" /> 신청취소
              </template>

              <template v-else>
                <template v-if="isAvailable(item)">
                  <span class="icon-ok" /> 신청하기
                </template><template v-else>
                  <span class="icon-alert" /> 신청불가
                </template>
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-else
        class="req-afsc__empty"
      >
        아직 등록된 방과 후 활동이 없습니다
      </div>

      <dimi-modal
        :opened="captchaOpen"
        @close="captchaOpen = false"
      >
        <vue-recaptcha
          ref="recaptcha"
          :sitekey="sitekey"
          @verify="verifyRecaptcha"
          @expired="verifyRecaptcha(null)"
        />
      </dimi-modal>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.req-afsc {
  &__loader-wrapper {
    display: flex;
    height: 35vh;
    align-items: center;
    justify-content: center;
  }

  &__captcha {
    padding-bottom: 2em;
    color: $gray-dark;
    font-size: 16px;
    line-height: 1.8;
  }

  &__main {
    padding-top: 0;
    padding-bottom: 0;
  }

  &__time {
    margin-top: 1em;
    margin-right: 0.5em;
    float: right;
    font-size: 16px;
  }

  &__refresh {
    margin-top: 1em;
    margin-right: 0.5em;
    color: $red;
    cursor: pointer;
    float: right;
    font-size: 16px;
  }

  &__row:not(:last-child) {
    border-bottom: 1px solid $gray-lighter;
  }

  &__list {
    width: 100%;
    color: $gray !important;
    font-weight: $font-weight-bold;

    @include until($tablet) {
      margin-bottom: 0.5em;
    }
  }

  &__cell {
    padding: 24px;
    color: $gray;
    white-space: nowrap;

    @include until($tablet) {
      display: inline-block;
      padding: 5px;
    }
  }

  &__cell--name {
    width: 80%;
    color: $black;
    line-height: 1.5;
    white-space: normal;

    @include until($tablet) {
      width: 75%;
    }
  }

  &__cell--time {
    width: 10%;
    color: $gray;
    line-height: 1.5;

    @include until($tablet) {
      width: 15%;
    }
  }

  &__cell--button {
    color: $pink;
    cursor: pointer;

    @include until($tablet) {
      float: right;
    }
  }

  &__cell--full {
    color: $mustard;
  }

  &__cell--applied {
    color: $gray-light;
  }

  &__cell--applied--ended {
    color: $gray-light;
    cursor: not-allowed;
  }

  &__cell--disabled {
    cursor: not-allowed;
  }

  &__empty {
    padding: 24px;
    margin-right: 16px;
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }
}
</style>
