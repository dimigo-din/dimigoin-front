<script>
import moment from 'moment'
import ContentWrapper from '@/components/ContentWrapper.vue'
import * as ingang from '@/src/api/ingang'

export default {
  name: 'Ingang',

  components: { ContentWrapper },

  filters: {
    filterDate (time) {
      return moment(time).format('YYYY-MM-DD')
    },

    filterBlackDate (time) {
      return moment(time).format('MM월 DD까지 인강실을 사용할 수 없습니다.')
    }
  },

  data () {
    return {
      pending: false,
      ingangs: [],
      today: new Date(),
      notice: {},
      ticket: '',
      modal: false
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.ingangs = await ingang.request.getIngangList()
      this.notice = await ingang.notice.getLatestNotice()
      this.ticket = this.ingangs[0].week_request_count
      this.pending = false
    },

    async toggleApply (ing) {
      try {
        if (ing.request) await ingang.request.deleteIngangRequest(ing.idx)
        else await ingang.request.requestIngang(ing.idx)
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
      <span class="icon-internet-class" />
      인강실 사용 신청
      <span
        class="ingang__ticket"
      >
        남은 티켓 개수 : {{ ticket }} 개
      </span>
      <span
        class="ingang__notice"
        @click="modal = true"
      >
        <span class="icon-notice" />인강실 공지
      </span>
    </h1>

    <div
      v-if="pending"
      class="ingang__pending"
    >
      <dimi-loader />
    </div>

    <template v-else>
      <template v-if="ingangs[0].black">
        <dimi-card
          slot="main"
          class="ingang__card"
        >
          <h2 class="ingang__black ingang__black--title">
            You Are Banned
          </h2>
          <div class="ingang__black ingang__black--comment">
            {{ ingangs[0].black | filterBlackDate }}
          </div>
        </dimi-card>
      </template>
      <template v-else>
        <dimi-card
          v-for="(ing, idx) in ingangs"
          slot="main"
          :key="`${idx}`"
          class="ingang__card"
        >
          <h2 class="ingang__title">
            {{ today.getMonth() + 1 }}월 {{ today.getDate() }}일 야간자율학습 {{ ing.time }}타임
          </h2>

          <div class="ingang__content">
            <div class="ingang__current">
              <div
                :class="[
                  'ingang__number',
                  'ingang__number--' + (ing.request ? 'aloes' : 'red')
                ]"
              >
                {{ ing.count }}
              </div>
              <div
                :class="[
                  'ingang__text',
                  'ingang__text--' + (ing.request ? 'aloes' : 'red')
                ]"
              >
                현원
              </div>
            </div>
            <div class="ingang__max">
              <div class="ingang__number">
                {{ ing.max }}
              </div>
              <div class="ingang__text">
                총원
              </div>
            </div>
          </div>

          <div class="ingang__btn">
            <dimi-button
              :gray="ing.request"
              @click="toggleApply(ing)"
            >
              {{ ing.request ? '취소하기' : '신청하기' }}
            </dimi-button>
          </div>

          <dimi-modal
            :opened="modal"
            class="modal__modal"
            @close="modal = false"
          >
            <h3 class="modal__title">
              인강실 공지
              <span class="modal__date">
                {{ notice.date | filterDate }}
              </span>
            </h3>
            <div class="modal__field">
              <p class="modal__notice">
                {{ notice.description }}
              </p>
            </div>
          </dimi-modal>
        </dimi-card>
      </template>
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

  &__black {
    display: flex;
    justify-content: center;
  }

  &__black--title {
    color: $red;
    font-size: 64px;
    font-weight: $font-weight-extra-bold;
    padding-top: 4rem;
  }

  &__black--comment {
    font-size: 22px;
    font-weight: $font-weight-regular;
    padding-bottom: 4rem;
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

  &__notice {
    color: $orange;
    cursor: pointer;
    float: right;
    font-size: 18px;
    margin-right: 0.5em;
    margin-top: 1em;
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

.modal {
  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__field {
    align-items: center;
    display: flex;
    margin: 1.5rem 0;
  }

  &__label {
    min-width: 6em;
  }

  &__leftInput {
    padding-right: 10px;
  }

  &__button {
    padding-top: 20px;
    position: absolute;
    right: 25px;
  }

  &__notice {
    font-family: inherit;
    font-weight: $font-weight-regular;
    line-height: 1.2rem;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  &__date {
    font-size: 14px;
    font-weight: $font-weight-light;
  }
}
</style>
