<script>
import { format } from 'date-fns'
import ContentWrapper from '@/components/ContentWrapper.vue'
// import { mentoringRequestor } from '@/src/api/mentoring'

export default {
  name: 'RequestBook',

  components: { ContentWrapper },

  filters: {
    filterDate (time) {
      return format(time, 'YYYY-MM-DD')
    }
  },

  data () {
    return {
      list: [
        {
          name: '김태철',
          subject: '국어',
          day: '02/25 (월)',
          time: '19:30 ~ 19:50'
        },
        {
          name: '김태철',
          subject: '국어',
          day: '02/25 (월)',
          time: '19:50 ~ 20:20'
        }
      ],
      notice: null,
      pending: false
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      //
      this.pending = false
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
        @click="modals.notice = true"
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
          매주 금요일 13시 30분부터 다음 주 멘토링 신청이 가능합니다.
          자신의 학년 담당 선생님에게만 멘토링 신청이 가능하며, 일주일에 2회 이상은 신청하실 수 없습니다.
        </div>
        <div
          v-if="!list.length"
          class="mentoring__empty"
        >
          아직 신청한 멘토링이 없습니다
        </div>
        <table
          v-else-if="list.length"
          class="mentoring__list"
        >
          <tbody>
            <tr
              v-for="(item, idx) in list"
              :key="`mtr-${currentDay}-${idx}`"
              class="mentoring__row"
            >
              <td class="mentoring__cell mentoring__cell--name">
                {{ item.name }} 선생님
              </td>
              <td class="mentoring__cell">
                {{ item.subject }}
              </td>
              <td class="mentoring__cell">
                {{ item.day }}
              </td>
              <td class="mentoring__cell">
                {{ item.time }}
              </td>
              <td
                :class="{
                  'mentoring__cell': true,
                  'mentoring__cell--button': true
                }"
                :title="item | dateRange"
                @click="toggleApply(item)"
              >
                <template>
                  <span class="icon-ok" /> 신청하기
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </template>

      <dimi-modal
        v-if="notice"
        :opened="modals.notice"
        @close="closeModal"
      >
        <h3 class="modal__title">
          멘토링 공지
          <span class="modal__date">
            {{ notice.date | filterDate }}
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

  &__border {
    border-top: 1px solid $gray-lighter;
  }

  &__detail {
    flex: 1;
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
    color: $gray;
    white-space: nowrap;

    @include until($tablet) {
      display: inline-block;
      padding: 5px;
    }
  }

  &__cell--name {
    width: 99%;
    color: $black;
    line-height: 1.5;
    white-space: normal;
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
</style>
