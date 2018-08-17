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
        남은 티켓 개수 : {{ ingangs[0].weekCount }} 개
      </span>
    </h1>

    <dimi-card
      slot="main"
      class="ingang__card">

      <div
        v-if="pending"
        class="ingang__pending">
        <dimi-loader/>
      </div>

      <template v-else>
        <h2 class="ingang__title">
          <span class="ingang__info">
            {{ today.getMonth() + 1 }}월 {{ today.getDate() }}일
          </span>
          야간자율학습
        </h2>
        <div
          v-for="(ing, idx) in ingangs"
          :key="`${idx}`"
          class="ingang__content">
          <div class="ingang__time">
            {{ ing.time }}타임
          </div>
          <div class="ingang__human">
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
              @click="toggleApply(ing)">
              {{ ing.request ? '취소하기' : '신청하기' }}
            </dimi-button>
          </div>
        </div>
      </template>
    </dimi-card>
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

  &__info {
    color: $gray;
  }

  &__time {
    font-size: 22px;
  }

  &__content {
    vertical-align: middle;
    width: 50%;
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
  }

  &__human {
    display: flex;
    font-weight: $font-weight-bold;
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
