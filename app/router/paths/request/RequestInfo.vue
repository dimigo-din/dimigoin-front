<script>
import DimiCard from '../../../components/DimiCard.vue'
import DimiBadge from '../../../components/DimiBadge.vue'
import ContentWrapper from '../../partial/ContentWrapper.vue'

export default {
  name: 'RequestInfo',
  components: { DimiCard, DimiBadge, ContentWrapper }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-list"/>나의 신청 현황 (테스트)
    </h1>

    <dimi-card slot="main" class="r-info">
      <dimi-badge class="r-info__badge">
        <span class="icon-ok r-info__badge-icon"/>신청
      </dimi-badge>

      <span class="r-info__title">
        <span class="icon-club"/> 2018년 동아리 가입 신청
      </span>

      <table class="r-info__list">
        <tbody>
          <tr>
            <td class="r-info__list-key">대기 중</td>
            <td class="r-info__list-value">JNJ Communication</td>
          </tr>
          <tr>
            <td class="r-info__list-key">합격</td>
            <td class="r-info__list-value">COIN</td>
          </tr>
          <tr>
            <td class="r-info__list-key">불합격</td>
            <td class="r-info__list-value">New Turn</td>
          </tr>
        </tbody>
      </table>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
  .r-info {
    &__badge {
      font-size: 14px;
      margin-right: 10px;
      display: inline-block;
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

    &__list-key, &__list-value {
      padding-top: 16px;
    }

    &__list-key {
      color: $black;
      @include font-bold;
      padding-right: 16px;
    }

    &__list-value {
      color: $gray;
    }
  }
</style>
