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
    }
  },

  data () {
    return {
      list: [],
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
      return this.list.filter(item => item.day === days[this.currentDay].code)
    },

    applied () {
      return this.currentList.filter(item => item.status === 'request').length === 2
    }
  },

  async created () {
    await this.refresh()
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

    async toggleApply (item) {
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
                'req-afsc__cell--applied': item.status === 'request'
              }"
              :title="item | dateRange"
              @click="toggleApply(item)"
            >
              <template v-if="item.status === 'request'">
                <span class="icon-cross" /> 신청취소
              </template>

              <template v-else-if="!applied">
                <template v-if="item.maxCount > item.count">
                  <span class="icon-ok" /> 신청하기
                </template><template v-else>
                  <span class="icon-alert" /> 신청불가
                </template>
              </template>
            </td>
          </tr>
          <!-- <tr
            v-if="currentList.length === 0"
            class="req-afsc__row">
            <td class="req-afsc__cell req-afsc__cell--placeholder">(없음)</td>
          </tr> -->
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
    width: 99%;
    color: $black;
    line-height: 1.5;
    white-space: normal;
  }

  // &__cell--placeholder {
  //   color: $gray;
  //   font-size: 25px;
  //   text-align: center;
  // }

  &__cell--button {
    color: $pink;
    cursor: pointer;
  }

  &__cell--full {
    color: $mustard;
  }

  &__cell--applied {
    color: $gray-light;
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
