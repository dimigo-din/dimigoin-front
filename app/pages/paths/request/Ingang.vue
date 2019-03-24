<script>
import { format } from 'date-fns'
import ContentWrapper from '@/components/ContentWrapper.vue'
import { ingangRequestor } from '@/src/api/ingang'

export default {
  name: 'Ingang',
  components: { ContentWrapper },
  filters: {
    filterDate: time => format(time, 'YYYY-MM-DD')
  },
  data () {
    return {
      pending: false,
      ingangs: [],
      today: new Date(),
      announcement: {},
      status: {},
      modal: false
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.ingangs = await ingangRequestor.getIngangs()
      this.status = await ingangRequestor.getStatus()
      this.announcement = await ingangRequestor.getAnnouncement()
      this.pending = false
    },

    async handleSubmitButton (ingang) {
      try {
        if (ingang.status) await ingangRequestor.cancelIngang(ingang.idx)
        else await ingangRequestor.applyIngang(ingang.idx)
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
      await this.refresh()
    },

    getStatusColor (ingang) {
      return ingang.status ? 'aloes' : 'red'
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-internet-class" />인강실 사용 신청
      <span
        class="ingang__helper ingang__helper--link"
        @click="modal = true"
      >
        <span class="icon-notice" />공지사항
      </span>
      <span class="ingang__helper">
        <span class="ingang__ticket" />이번 주 신청 가능 횟수 : {{ status.weekly_ticket_num - status.weekly_request_count }}회 /
        <span class="ingang__ticket" />오늘 신청 가능 횟수 : {{ status.daily_ticket_num - status.daily_request_count }}회
      </span>
    </h1>

    <div
      v-if="pending"
      class="ingang__pending"
    >
      <dimi-loader />
    </div>

    <template v-else>
      <div
        v-if="!ingangs.length"
        class="ingang__empty"
      >
        아직 등록된 인강실 신청이 없습니다.
      </div>
      <template>
        <dimi-card
          v-for="(ingang, idx) in ingangs"
          slot="main"
          :key="`ingang-${idx}`"
          class="ingang__card"
        >
          <h2 class="ingang__title">
            {{ today.getMonth() + 1 }}월 {{ today.getDate() }}일 야간자율학습 {{ ingang.time }}타임
          </h2>

          <div class="ingang__content">
            <div class="ingang__current">
              <div
                :class="[
                  'ingang__number',
                  'ingang__number--' + getStatusColor(ingang)
                ]"
              >
                {{ ingang.count }}
              </div>
              <div
                :class="[
                  'ingang__text',
                  'ingang__text--' + getStatusColor(ingang)
                ]"
              >
                현원
              </div>
            </div>
            <div class="ingang__max">
              <div class="ingang__number">
                {{ ingang.max }}
              </div>
              <div class="ingang__text">
                총원
              </div>
            </div>
          </div>

          <div class="ingang__btn-wrapper">
            <div class="ingang__btn">
              <dimi-button
                :gray="ingang.status"
                @click="handleSubmitButton(ingang)"
              >
                {{ ingang.status ? '취소하기' : '신청하기' }}
              </dimi-button>
            </div>
          </div>

          <dimi-modal
            :opened="modal"
            class="modal__modal"
            @close="modal = false"
          >
            <h3 class="modal__title">
              인강실 공지사항
              <span class="modal__date">
                {{ announcement.date | filterDate }}
              </span>
            </h3>
            <div class="modal__field">
              <p class="modal__announcement">
                {{ announcement.desc }}
              </p>
            </div>
          </dimi-modal>
        </dimi-card>
      </template>
    </template>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.ingang {
  &__pending {
    display: flex;
    height: 30vh;
    align-items: center;
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
    padding-top: 4rem;
    color: $red;
    font-size: 64px;
    font-weight: $font-weight-extra-bold;
  }

  &__black--comment {
    padding-bottom: 4rem;
    font-size: 22px;
    font-weight: $font-weight-regular;
  }

  &__helper {
    margin-top: 1em;
    margin-left: 1em;
    color: $gray-dark;
    float: right;
    font-size: 18px;
  }

  &__helper--link {
    color: $orange;
    cursor: pointer;
  }

  &__btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  &__btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__ticket {
    margin-top: 0.4rem;
    color: $gray-dark;
    font-size: 0.8rem;
    font-weight: $font-weight-bold;
  }

  &__content {
    display: flex;
    justify-content: center;
    font-weight: $font-weight-bold;
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

  &__empty {
    padding: 24px;
    margin-right: 16px;
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }
}

.modal {
  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__field {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
  }

  &__label {
    min-width: 6em;
  }

  &__leftInput {
    padding-right: 10px;
  }

  &__button {
    position: absolute;
    right: 25px;
    padding-top: 20px;
  }

  &__announcement {
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
