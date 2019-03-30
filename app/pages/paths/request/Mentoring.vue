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
      list: [
        {
          idx: 2,
          day: 'tus',
          startTime: new Date('2019-05-10 19:30'),
          endTime: new Date('2019-05-10 19:50'),
          subject: '국어',
          teacher: {
            idx: 1,
            name: '김태철'
          },
          startDate: new Date('2019-03-27'),
          endDate: new Date('2019-04-15'),
          room: '1학년 5반 교실',
          status: false,
          present: 2,
          maxUser: 5
        },
        {
          idx: 2,
          day: 'tus',
          startTime: new Date('2019-05-10 19:30'),
          endTime: new Date('2019-05-10 19:50'),
          subject: '국어',
          teacher: {
            idx: 1,
            name: '김태철'
          },
          startDate: new Date('2019-03-27'),
          endDate: new Date('2019-04-15'),
          room: '1학년 5반 교실',
          status: true,
          present: 5,
          maxUser: 5
        },
        {
          idx: 2,
          day: 'tus',
          startTime: new Date('2019-05-10 19:30'),
          endTime: new Date('2019-05-10 19:50'),
          subject: '국어',
          teacher: {
            idx: 1,
            name: '김태철'
          },
          startDate: new Date('2019-03-27'),
          endDate: new Date('2019-04-15'),
          room: '1학년 5반 교실',
          status: false,
          present: 5,
          maxUser: 5
        }
      ],
      notice: null,
      pending: false
    }
  },

  computed: {
    days: () => days
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      // ;[this.list, this.notice] = await Promise.all([
      //   mentoringRequestor.getStudentMentoring(),
      //   mentoringRequestor.getNotice()
      // ])
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

    getDaySmallTextByCode (code) {
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
          매주 금요일 13시 30분부터 다음 주 멘토링 신청이 가능합니다. <br>
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
                {{ item.startTime | filterDay }} ({{ getDaySmallTextByCode(item.day) }})
              </td>
              <td
                :class="{
                  'mentoring__cell--time': true,
                  'mentoring__cell--disabled': (item.maxUser === item.present)
                }"
                class="mentoring__cell"
              >
                {{ item.startTime | filterTime }} ~ {{ item.endTime | filterTime }}
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

                <template v-else-if="!item.status">
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
</style>
