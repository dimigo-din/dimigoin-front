<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import { ingang } from '@/src/api'

export default {
  name: 'Ingang',

  components: { ContentWrapper },

  data () {
    return {
      pending: false,
      ingang: {},
      today: new Date()
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.ingang = await ingang.getStudentIngang()
      this.pending = false
    },

    async toggleApply (parameter) {
      try {
        if (parameter.request === true) await ingang.cancelIngang(parameter.idx)
        else await ingang.applyIngang(parameter.idx)
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
      await this.refresh()
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-internet-class"/>
      {{ today.getMonth() + 1 }}월
      {{ today.getDate() }}일
      인강실 사용 신청
    </h1>

    <dimi-card
      slot="main"
      class="req-ingang__card">

      <div
        v-if="pending"
        class="req-ingang__pending">
        <dimi-loader/>
      </div>

      <template v-else>
        <h2 class="req-ingang__title">
          <span class="req-ingang__info">{{ `${ingang.grade}학년 ${ingang.class}반` }}</span>
          야간자율학습 {{ ingang.time }}타임
        </h2>
        <div class="req-ingang__content">
          <div class="req-ingang__current">
            <div
              :class="[
                'req-ingang__number',
                'req-ingang__number--' + (ingang.request ? 'aloes' : 'red')
            ]">{{ ingang.count }}</div>
            <div
              :class="[
                'req-ingang__text',
                'req-ingang__text--' + (ingang.applied ? 'aloes' : 'red')
            ]">현원</div>
          </div>
          <div class="req-ingang__max">
            <div class="req-ingang__number">{{ ingang.max }}</div>
            <div class="req-ingang__text">총원</div>
          </div>
        </div>

        <div class="req-ingang__btn">
          <p class="req-ingang__limit">
            남은 티켓 개수 (월요일에 초기화) : {{ ingang.weekCount }}개
          </p>
          <dimi-button
            :gray="ingang.request"
            @click="toggleApply(ingang)"
          >{{ ingang.request ? '취소하기' : '신청하기' }}</dimi-button>
        </div>
      </template>

    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss">
@import '~styles/variables';

.req-ingang {
  &__pending {
    align-items: center;
    display: flex;
    height: 30vh;
    justify-content: center;
  }

  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__info {
    color: $gray;
  }

  &__limit {
    color: $orange;
    font-size: 18px;
    font-weight: $font-weight-bold;
    margin-right: 1em;
  }

  &__btn {
    align-items: center;
    display: flex;
    justify-content: flex-end;
  }

  &__content {
    display: flex;
    font-weight: $font-weight-bold;
    justify-content: center;
  }

  &__current,
  &__max {
    margin: 4rem 0.75rem;
  }

  &__number {
    color: $gray;
    font-size: 64px;
  }

  &__number--aloes {
    color: $aloes;
  }

  &__number--red {
    color: $red;
  }

  &__text {
    color: $gray;
    text-align: center;
  }

  &__text--aloes {
    color: $aloes;
  }

  &__text--red {
    color: $red;
  }
}
</style>
