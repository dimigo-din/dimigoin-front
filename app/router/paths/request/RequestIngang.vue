<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import DimiButton from '../../../components/DimiButton.vue'
import DimiCard from '../../../components/DimiCard.vue'
import DimiLoader from '../../../components/DimiLoader.vue'

import { ingang } from '../../../src/api'
import debounce from 'debounce'

export default {
  name: 'RequestIngang',

  components: { DimiButton, ContentWrapper, DimiCard, DimiLoader },

  data: () => ({
    ingang: {},
    dummyIngang: {},
    today: new Date(),
    pending: true
  }),

  computed: {

  },

  async created () {
    this.pending = true
    try {
      this.ingang = await ingang.getIngang()
      this.dummyIngang = Object.assign({}, this.ingang)
    } catch (err) {
      this.$swal('에러!', '인강실 신청 기간이 지났습니다.', 'error')
      this.$router.back()
    }
    this.pending = false
  },

  methods: {
    async cancel () {
      try {
        this.dummyIngang.applied = false
        this.dummyIngang.count--
        this.dummyIngang.weekApplyCount--

        await ingang.cancelIngang(this.ingang.idx)

        this.ingang.applied = false
        this.ingang.count--
        this.ingang.weekApplyCount--
      } catch (err) {
        this.$swal({
          type: 'error',
          title: '에러!',
          text: err.message
        })

        this.dummyIngang.applied = true
        this.dummyIngang.count++
        this.dummyIngang.weekApplyCount++
      }
    },

    async apply () {
      try {
        if (this.ingang.weekApplyCount >= 2) {
          this.$swal({
            type: 'error',
            title: '에러!',
            text: '일주일 신청 가능 횟수(2회)를 초과했습니다.'
          })
          return
        }

        if (this.ingang.count >= this.ingang.max) {
          this.$swal({
            type: 'error',
            title: '에러!',
            text: '인원이 꽉 찼습니다.'
          })
          return
        }

        this.dummyIngang.applied = true
        this.dummyIngang.count++
        this.dummyIngang.weekApplyCount++

        await ingang.applyIngang(this.ingang.idx)

        this.ingang.applied = true
        this.ingang.count++
        this.ingang.weekApplyCount++
      } catch (err) {
        this.$swal({
          type: 'error',
          title: '에러!',
          text: err.message
        })

        this.dummyIngang.applied = false
        this.dummyIngang.count--
        this.dummyIngang.weekApplyCount--
      }
    },

    handleButton: debounce(function () {
      if (this.ingang.applied) return this.cancel()
      else return this.apply()
    }, 500)
  }
}
</script>

<template>
  <content-wrapper class="req-ingang">
    <h1 slot="header">
      <span class="icon-internet-class"/>
      {{ `${today.getMonth() + 1}월` }}
      {{ `${today.getDate()}일` }}
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
          <span class="req-ingang__info">{{ `${dummyIngang.grade}학년 ${dummyIngang.klass}반` }}</span>
          야간타율학습 {{ dummyIngang.time }}타임
        </h2>
        <div class="req-ingang__content">
          <div class="req-ingang__current">
            <div
              :class="[
                'req-ingang__number',
                'req-ingang__number--' + (dummyIngang.applied ? 'aloes' : 'red')
            ]">{{ dummyIngang.count }}</div>
            <div
              :class="[
                'req-ingang__text',
                'req-ingang__text--' + (dummyIngang.applied ? 'aloes' : 'red')
            ]">현원</div>
          </div>
          <div class="req-ingang__max">
            <div class="req-ingang__number">{{ dummyIngang.max }}</div>
            <div class="req-ingang__text">총원</div>
          </div>
        </div>

        <div class="req-ingang__btn">
          <p class="req-ingang__limit">
            남은 티켓 개수 (월요일에 초기화) : {{ 2 - dummyIngang.weekApplyCount }}개
          </p>
          <dimi-button
            :gray="dummyIngang.applied"
            @click="handleButton"
          >{{ dummyIngang.applied ? '취소하기' : '신청하기' }}</dimi-button>
        </div>
      </template>

    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss">
.req-ingang {
  &__pending {
    align-items: center;
    display: flex;
    height: 30vh;
    justify-content: center;
  }

  &__title {
    @include font-bold;

    color: $gray-dark;
    font-size: 24px;
  }

  &__info {
    color: $gray;
  }

  &__limit {
    @include font-bold;
    color: $orange;
    font-size: 18px;
    margin-right: 1em;
  }

  &__btn {
    align-items: center;
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
