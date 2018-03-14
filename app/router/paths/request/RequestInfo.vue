<script>
import DimiCard from '../../../components/DimiCard.vue'
import DimiBadge from '../../../components/DimiBadge.vue'
import ContentWrapper from '../../partial/ContentWrapper.vue'

import { circle } from '../../../src/api'
import * as handleCircle from '../../../src/util/handle-circle-status'

export default {
  name: 'RequestInfo',

  components: { DimiCard, DimiBadge, ContentWrapper },

  data () {
    return {
      circles: []
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

    applied () {
      return [...Object.values(this.circleGroup)].some(a => a.length > 0)
    }
  },

  async created () {
    this.circles = await circle.getCircles()
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-list"/>나의 신청 현황
    </h1>

    <dimi-card
      slot="main"
      class="r-info">
      <dimi-badge
        :color="applied ? 'aloes' : 'orange'"
        class="r-info__badge">
        <template v-if="applied">
          <span class="icon-ok r-info__badge-icon"/> 신청
        </template>
        <template v-else>
          <span class="icon-cross r-info__badge-icon"/> 미신청
        </template>
      </dimi-badge>

      <span class="r-info__title">
        <span class="icon-club"/> 2018년 동아리 가입 신청
      </span>

      <table class="r-info__list">
        <tbody>
          <tr v-if="circleGroup.wait.length > 0">
            <td class="r-info__list-key">대기 중</td>
            <td class="r-info__list-value">{{ circleGroup.wait.join(', ') }}</td>
          </tr>
          <tr v-if="circleGroup.accept.length > 0">
            <td class="r-info__list-key">합격</td>
            <td class="r-info__list-value">{{ circleGroup.accept.join(', ') }}</td>
          </tr>
          <tr v-if="circleGroup.fail.length > 0">
            <td class="r-info__list-key">불합격</td>
            <td class="r-info__list-value">{{ circleGroup.fail.join(', ') }}</td>
          </tr>
        </tbody>
      </table>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
  .r-info {
    &__badge {
      display: inline-block;
      font-size: 14px;
      margin-right: 10px;
    }

    &__badge-icon {
      font-size: 9px;
      margin-right: 4px;
    }

    &__title {
      @include font-bold;
      font-size: 16px;
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
      @include font-bold;
      color: $black;
      padding-right: 16px;
    }

    &__list-value {
      color: $gray;
    }
  }
</style>
