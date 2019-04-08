<script>
import { format } from 'date-fns'
import ContentWrapper from '@/components/ContentWrapper.vue'
import { mentoringRequestor } from '@/src/api/mentoring'
import days from '@/src/util/days'

export default {
  name: 'RequestMentoring',

  components: { ContentWrapper },

  filters: {
    filterDay (time) {
      return format(time, 'MM/DD')
    },
    filterTime (time) {
      return format(time, 'HH:mm')
    }
  },

  data () {
    return {
      list: [],
      notice: {},
      pending: false,
      modal: false
    }
  },

  computed: {
    days: () => days
  },

  async created () {
    await this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      ;[this.list, this.notice] = await Promise.all([
        mentoringRequestor.getStudentMentoring(),
        mentoringRequestor.getNotice()
      ])
      this.pending = false
    },

    async toggleApply (item) {
      try {
        if (!item.status) await mentoringRequestor.applyMentoring(item.idx)
        else await mentoringRequestor.cancelMentoring(item.idx)
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }

      await this.refresh()
    },

    getDaySmallText (code) {
      return days.find(v => v.code === code).smallText
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-comment" />멘토링 신청
      <span
        class="mentoring__notice"
        @click="modal = true"
      >
        <span class="icon-notice" />멘토링 공지
      </span>
    </h1>

    <dimi-card
      slot="main"
      class="mentoring__main"
    >
      <div
        v-if="pending"
        class="mentoring__loader-wrapper"
      >
        <dimi-loader />
      </div>

      <template v-else>
        <h2 class="mentoring__notice-title">
          주의사항
        </h2>
        <div class="mentoring__notice-article">
          매주 금요일 13시 30분부터 다음 주 멘토링 신청이 가능합니다. <br>
          자신의 학년 담당 선생님에게만 멘토링 신청이 가능하며, 일주일에 2회 이상은 신청하실 수 없습니다.
        </div>
        <div
          v-if="!list.length"
          class="mentoring__empty"
        >
          아직 등록된 멘토링이 없습니다.
        </div>
        <table
          v-else
          class="mentoring__list"
        >
          <tbody>
            <tr
              v-for="(item, idx) in list"
              :key="`mtr-${idx}`"
              class="mentoring__row"
            >
              <td class="mentoring__cell mentoring__cell--name">
                {{ item.teacher.name }} 선생님
              </td>
              <td class="mentoring__cell">
                {{ item.subject }}
              </td>
              <td class="mentoring__cell">
                {{ item.date | filterDay }} ({{ getDaySmallText(item.day) }})
              </td>
              <td
                :class="{
                  'mentoring__cell--time': true,
                  'mentoring__cell--disabled': (item.maxUser === item.present)
                }"
                class="mentoring__cell"
              >
                {{ item.startTime }} ~ {{ item.endTime }}
              </td>
              <td
                :class="{
                  'mentoring__cell': true,
                  'mentoring__cell--button': true,
                  'mentoring__cell--full': (item.maxUser === item.present),
                  'mentoring__cell--applied': item.status
                }"
                @click="toggleApply(item)"
              >
                <template v-if="item.status">
                  <span class="icon-cross" /> 신청취소
                </template>

                <template v-else>
                  <template v-if="item.maxUser > item.present">
                    <span class="icon-ok" /> 신청하기
                  </template>
                  <template v-else>
                    <span class="icon-alert" /> 신청불가
                  </template>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </template>

      <dimi-modal
        :opened="modal"
        class="modal__modal"
        @close="modal = false"
      >
        <h3 class="modal__title">
          멘토링 공지
          <span class="modal__date">
            {{ notice.date }}
          </span>
        </h3>
        <div class="modal__field">
          <p class="modal__notice">
            {{ notice.desc }}
          </p>
        </div>
      </dimi-modal>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.mentoring {
  &__loader-wrapper {
    display: flex;
    height: 35vh;
    align-items: center;
    justify-content: center;
  }

  &__notice {
    margin-top: 1em;
    color: $orange;
    cursor: pointer;
    float: right;
    font-size: 16px;
  }

  &__notice-title {
    margin-top: 1.2em;
    margin-left: 0.5em;
    color: #595858;
    font-size: 24px;
    font-weight: 600;
  }

  &__notice-article {
    margin-top: 1.2em;
    margin-left: 0.8em;
    color: #595858;
    font-size: 16px;
    line-height: 1.76;
  }

  &__main {
    padding-top: 0;
    padding-bottom: 0;
  }

  &__mentoring {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 24px;
    cursor: pointer;
  }

  &__empty {
    padding: 24px;
    margin-right: 16px;
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }

  &__loader-wrapper {
    display: flex;
    height: 35vh;
    align-items: center;
    justify-content: center;
  }

  &__option {
    display: flex;
  }

  &__main {
    padding-top: 0;
    padding-bottom: 0;
  }

  &__row:not(:last-child) {
    border-bottom: 1px solid $gray-lighter;
  }

  &__list {
    width: 100%;
    color: $gray !important;
    font-weight: $font-weight-bold;

    @include until($tablet) {
      margin-bottom: 0.5em;
    }
  }

  &__cell {
    padding: 24px;
    color: $gray-dark;
    white-space: nowrap;

    @include until($tablet) {
      display: inline-block;
      padding: 5px;
    }
  }

  &__cell--name {
    width: 35%;
    color: $black;
    line-height: 1.5;
    white-space: normal;
  }

  // &__cell--time {
  //   color: $pink;
  // }

  &__cell--disabled {
    color: $gray-light;
    text-decoration: line-through;
  }

  &__cell--button {
    color: $pink;
    cursor: pointer;

    @include until($tablet) {
      float: right;
    }
  }

  &__cell--full {
    color: $mustard;
  }

  &__cell--applied {
    color: $gray-light;
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
