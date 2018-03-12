<script>
import VueRecaptcha from 'vue-recaptcha'

import ContentWrapper from '../../partial/ContentWrapper.vue'
import DimiCard from '../../../components/DimiCard.vue'
import DimiTab from '../../../components/DimiTab.vue'

import { afterschool } from '../../../src/api'
import config from '../../../../config'

const { days, sitekey } = config
const { getAfterschools, applyAfterschool } = afterschool

export default {
  name: 'RequestAfterschool',
  components: { VueRecaptcha, ContentWrapper, DimiCard, DimiTab },

  data () {
    return {
      list: [],
      currentDay: 0,
      captchaResponse: null
    }
  },

  computed: {
    days () { return days },
    sitekey () { return sitekey },
    currentList () {
      return this.list.filter(item =>
        item.day === days[this.currentDay].code)
    }
  },

  async created () {
    await this.refresh()
  },

  methods: {
    async refresh () {
      this.list = await getAfterschools()
    },

    verifyRecaptcha (response) {
      this.captchaResponse = response
    },

    async toggleApply (item) {
      try {
        await applyAfterschool(item.idx, this.captchaResponse)
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    }
  }
}
</script>

<template>
  <content-wrapper class="req-afsc">
    <h1 slot="header">
      <span class="icon-ball"/>2018년 상반기 방과 후 활동 신청
      <span
        class="req-afsc__refresh"
        @click="refresh">새로고침</span>
    </h1>

    <dimi-card
      v-if="captchaResponse === null"
      slot="main">

      <p class="req-afsc__captcha">
        방과후 활동 신청은 정정당당한 사람의 손으로만 할 수 있습니다.<br>
        더럽고 비열한 매크로들은 <a href="https://www.google.com/recaptcha">reCAPTCHA&trade;</a>의 힘에 쓰러질 것입니다.
      </p>

      <vue-recaptcha
        :sitekey="sitekey"
        @verify="verifyRecaptcha"
        @expired="verifyRecaptcha(null)"/>
    </dimi-card>

    <dimi-card
      v-else
      slot="main"
      class="req-afsc__main">
      <dimi-tab
        :tabs="days.map(v => v.text)"
        :tab-idx.sync="currentDay"/>

      <table class="req-afsc__list">
        <tbody>
          <tr
            v-for="(item, idx) in currentList"
            :key="`aftc-${currentDay}-${idx}`"
            class="req-afsc__row">
            <td class="req-afsc__cell req-afsc__cell--name">{{ item.name }}</td>
            <td class="req-afsc__cell">{{ item.teacherName }}</td>
            <td class="req-afsc__cell">{{ (item.capacity - item.count) + '명 남음' }}</td>
            <td
              :disabled="item.capacity === item.count"
              class="req-afsc__cell req-afsc__cell--button"
              @click="toggleApply(item)">
              <template v-if="item.capacity > item.count">
                <span class="icon-ok"/> 신청하기
              </template><template v-else>
                <span class="icon-alert"/> 신청불가
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.req-afsc {
  &__captcha {
    color: $gray-dark;
    font-size: 16px;
    line-height: 1.8;
    padding-bottom: 2em;
  }

  &__main {
    padding-top: 0;
  }

  &__refresh {
    color: $red;
    cursor: pointer;
    font-size: 16px;
    float: right;
    margin-top: 1em;
    margin-right: 0.5em;
  }

  &__row:not(:last-child) {
    border-bottom: 1px solid $gray-lighter;
  }

  &__list {
    @include font-bold;
    color: $gray !important;
    width: 100%;
  }

  &__cell {
    color: $gray;
    padding: 24px;
    white-space: nowrap;
  }

  &__cell--name {
    color: $black;
    line-height: 1.5;
    white-space: normal;
    width: 99%;
  }

  &__cell--button {
    color: $pink;
    cursor: pointer;
  }

  &__cell--button[disabled] {
    color: $mustard;
  }
}
</style>
