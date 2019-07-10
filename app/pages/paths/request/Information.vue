<script>
import ContentWrapper from '@/components/ContentWrapper.vue'

import { circleRequestor } from '@/src/api/circle'
import { ingangRequestor } from '@/src/api/ingang'
import { afterschool } from '@/src/api/afterschool'

import days from '@/src/util/days'

import * as handleCircle from '@/src/util/handle-circle-status'

export default {
  name: 'RequestInfo',

  components: { ContentWrapper },

  data () {
    return {
      circles: [],
      ingangs: [],
      afters: []
    }
  },

  computed: {
    circleGroup () {
      const filter = status => this.circles.filter(v => v.status === status).map(v => v.name)

      return {
        wait: filter(handleCircle.WAIT),
        accept: filter(handleCircle.ACCEPT),
        fail: filter(handleCircle.FAIL),
        final: filter(handleCircle.FINAL)
      }
    },

    isCircleApplied () {
      return [...Object.values(this.circleGroup)].some(a => a.length > 0)
    },

    isIngangApplied () {
      return this.appliedIngangs.length > 0
    },

    appliedIngangs () {
      return this.ingangs.filter(v => v.status)
        .map(v => `${v.time}타임`)
    },

    todayAfters () {
      return this.afters.filter(v => v.status)
        .filter(v => v.day === this.today.code)
        .map(v => v.name)
    },

    today () {
      return days[new Date().getDay() - 1]
    }
  },

  async created () {
    this.circles = await circleRequestor.getCircles()
    this.ingangs = (await ingangRequestor.getIngangs()).filter(v => v.status)
    this.afters = (await afterschool.getStudentAfterschool()).filter(v => v.status)
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-list" />나의 신청 현황
    </h1>

    <dimi-card
      slot="main"
      class="r-info"
    >
      <dimi-badge
        :color="isCircleApplied ? 'aloes' : 'orange'"
        class="r-info__badge"
      >
        <template v-if="isCircleApplied">
          <span class="icon-ok r-info__badge-icon" /> 신청
        </template>
        <template v-else>
          <span class="icon-cross r-info__badge-icon" /> 미신청
        </template>
      </dimi-badge>

      <span class="r-info__title">
        <span class="icon-club-sm" /> 2019년 동아리 가입 신청
      </span>

      <table class="r-info__list">
        <tbody>
          <tr v-if="circleGroup.wait.length > 0">
            <td class="r-info__list-key">
              대기 중
            </td>
            <td class="r-info__list-value">
              {{ circleGroup.wait.join(', ') }}
            </td>
          </tr>
          <tr v-if="circleGroup.accept.length > 0">
            <td class="r-info__list-key">
              합격
            </td>
            <td class="r-info__list-value">
              {{ circleGroup.accept.join(', ') }}
            </td>
          </tr>
          <tr v-if="circleGroup.fail.length > 0">
            <td class="r-info__list-key">
              불합격
            </td>
            <td class="r-info__list-value">
              {{ circleGroup.fail.join(', ') }}
            </td>
          </tr>
          <tr v-if="circleGroup.final.length > 0">
            <td class="r-info__list-key">
              최종 결정
            </td>
            <td class="r-info__list-value">
              {{ circleGroup.final.join(', ') }}
            </td>
          </tr>
        </tbody>
      </table>
    </dimi-card>

    <dimi-card
      slot="main"
      class="r-info"
    >
      <dimi-badge
        :color="isIngangApplied ? 'aloes' : 'orange'"
        class="r-info__badge"
      >
        <template v-if="isIngangApplied">
          <span class="icon-ok r-info__badge-icon" /> 신청
        </template>
        <template v-else>
          <span class="icon-cross r-info__badge-icon" /> 미신청
        </template>
      </dimi-badge>

      <span class="r-info__title">
        <span class="icon-internet-class" /> 오늘의 인강실
      </span>

      <td
        v-if="appliedIngangs.length"
        class="r-info__list-value"
      >
        {{ appliedIngangs.join(', ') }}
        인강실
      </td>
      <td
        v-else
        class="r-info__list-value"
      >
        아직 신청한 인강실이 없습니다.
      </td>
    </dimi-card>

    <dimi-card
      slot="main"
      class="r-info"
    >
      <span class="r-info__title">
        <span class="icon-ball" /> 오늘의 방과후
      </span>

      <table class="r-info__list">
        <tbody>
          <tr>
            <td
              v-if="todayAfters.length"
              class="r-info__list-value"
            >
              {{ todayAfters.join(', ') }}
            </td>
            <td
              v-else
              class="r-info__list-value"
            >
              오늘은 방과후 수업이 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.r-info {
  margin-bottom: 0.5rem;

  &__badge {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
  }

  &__badge-icon {
    margin-right: 4px;
    font-size: 9px;
  }

  &__title {
    font-size: 16px;
    font-weight: $font-weight-bold;
    line-height: 0.75;
  }

  &__list {
    margin-top: 8px;
  }

  &__list-key,
  &__list-value {
    padding-top: 16px;
  }

  &__list-key {
    padding-right: 16px;
    color: $gray-dark;
  }

  &__list-value {
    color: $gray;
  }
}
</style>
