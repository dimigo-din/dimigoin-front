<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import DimiButton from '../../../components/DimiButton.vue'
import DimiCard from '../../../components/DimiCard.vue'
import DimiLoader from '../../../components/DimiLoader.vue'

import { ingang } from '../../../src/api'

export default {
  name: 'RequestIngang',

  components: { DimiButton, ContentWrapper, DimiCard, DimiLoader },

  data: () => ({
    ingang: [],
    applied: false,
    today: new Date(),
    pending: false
  }),

  computed: {

  },

  async created () {
    this.pending = true
    this.ingang = await ingang.getIngang()
    this.pending = false
  },

  methods: {
    
  }
}
</script>

<template>
  <content-wrapper class="req-ingang">
    <h1 slot="header">
      <span class="icon-internet-class"/>{{ `${today.getMonth() + 1}월` }}
      {{ `${today.getDate() + 1}일` }}
      인강실 사용 신청
    </h1>

    <dimi-card
      slot="main"
      class="req-ingang__card">
      <h2 class="req-ingang__title">야간타율학습 1타임</h2>
      <div class="req-ingang__content">
        <div class="req-ingang__current">
          <div class="req-ingang__number req-ingang__number--aloes">13</div>
          <div class="req-ingang__text req-ingang__text--aloes">현원</div>
        </div>
        <div class="req-ingang__max">
          <div class="req-ingang__number">30</div>
          <div class="req-ingang__text">총원</div>
        </div>
      </div>
      <div class="req-ingang__btn">
        <dimi-button
          :gray="applied"
          :active="!applied"
        >{{ applied ? '취소하기' : '신청하기' }}</dimi-button>
      </div>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss">
.req-ingang {
  &__title {
    @include font-bold;

    color: $gray-dark;
    font-size: 24px;
  }

  &__btn {
    display: flex;
    justify-content: flex-end;
  }

  &__content {
    @include font-bold;

    display: flex;
    justify-content: center;
  }

  &__current,
  &__max {
    margin: 4rem 0.75rem 4rem 0.75rem;
  }

  &__number {
    font-size: 64px;
    color: $gray;
  }

  &__number--aloes {
    color: $aloes;
  }

  &__text {
    color: $gray;
    text-align: center;
  }

  &__text--aloes {
    color: $aloes
  }
}
</style>
