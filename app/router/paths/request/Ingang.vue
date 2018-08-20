<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import { ingang } from '@/src/api'

export default {
  name: 'Ingang',

  components: { ContentWrapper },

  data () {
    return {
      pending: false,
      ingangs: [],
      today: new Date()
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.ingangs = await ingang.getStudentIngang()
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
    },

    countTicket (ingang) {
      return ingang[0].weekCount
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-internet-class"/>
      인강실 사용 신청
      <span
        class="ingang__ticket">
        남은 티켓 개수 : {{ countTicket(ingangs) }} 개
      </span>
    </h1>

    <div
      v-if="pending"
      class="ingang__pending">
      <dimi-loader/>
    </div>

    <template v-else>

      <dimi-card
        v-for="(ing, idx) in ingangs"
        slot="main"
        :key="`${idx}`"
        class="ingang__card">
        <h2 class="ingang__title">
          {{ today.getMonth() + 1 }}월 {{ today.getDate() }}일 야간자율학습 {{ ing.time }}타임
        </h2>
        <div class="ingang__content">
          <div class="ingang__current">
            <div
              :class="[
                'ingang__number',
                'ingang__number--' + (ing.request ? 'aloes' : 'red')
            ]">{{ ing.count }}</div>
            <div
              :class="[
                'ingang__text',
                'ingang__text--' + (ing.request ? 'aloes' : 'red')
            ]">현원</div>
          </div>
          <div class="ingang__max">
            <div class="ingang__number">{{ ing.max }}</div>
            <div class="ingang__text">총원</div>
          </div>
        </div>
        <div class="ingang__btn">
          <dimi-button
            :gray="ing.request"
            @click="toggleApply(ing)"
          >{{ ing.request ? '취소하기' : '신청하기' }}
          </dimi-button>
        </div>
      </dimi-card>
    </template>
  </content-wrapper>
</template>

<style lang="scss">
@import '~styles/variables';

.ingang {
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

  &__card {
    margin-bottom: 12px;
  }

  &__ticket {
    color: $red;
    float: right;
    font-size: 18px;
    margin-right: 0.5em;
    margin-top: 1em;
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
