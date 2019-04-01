<script>
import ContentWrapper from '@/components/ContentWrapper.vue'
import days from '@/src/util/days'
import timestamp from 'unix-timestamp'
import { mentoringManager } from '@/src/api/mentoring'

export default {
  name: 'ManageMentoring',
  components: { ContentWrapper },

  data () {
    return {
      pending: true,
      tab: 0,
      checks: [],
      selectAll: false,
      filter: 0,

      form: {
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        day: 0,
        maxCount: null,
        teacherName: ''
      },

      mentorings: [
        [
          {
            idx: 0,
            day: 'tus',
            date: new Date('2019-04-02'),
            startTime: '19:50',
            endTime: '20:20',
            subject: '국어',
            teacher: {
              idx: 0,
              name: '김태철'
            },
            targetGrade: 1,
            startDate: new Date('2019-03-20'),
            requestEdate: new Date('2019-04-01'),
            room: '비즈쿨실',
            maxUser: 0,
            mentoringRequest: [
              {
                idx: 0,
                request_time: new Date('2019-03-30'),
                requester: {
                  idx: 0,
                  name: '여준호',
                  grade: 1,
                  klass: 5,
                  number: 2,
                  serial: 1520
                }
              }
            ]
          },
          {
            idx: 0,
            day: 'tus',
            date: new Date('2019-04-02'),
            startTime: '19:50',
            endTime: '20:20',
            subject: '국어',
            teacher: {
              idx: 0,
              name: '김태철'
            },
            targetGrade: 1,
            startDate: new Date('2019-03-20'),
            requestEdate: new Date('2019-04-01'),
            room: '비즈쿨실',
            maxUser: 0,
            mentoringRequest: [
              {
                idx: 0,
                request_time: new Date('2019-03-30'),
                requester: {
                  idx: 0,
                  name: '여준호',
                  grade: 1,
                  klass: 5,
                  number: 2,
                  serial: 1520
                }
              }
            ]
          }
        ],
        [],
        []
      ]
    }
  },

  computed: {
    days () {
      return days
    },

    filteredList () {
      if (this.filter === 0) return this.mentorings[this.tab]

      return this.mentorings[this.tab].filter(v => v.day ===
        this.days[this.filter - 1].code)
    },

    currentCount () {
      return this.mentorings[this.tab].length
    }
  },

  watch: {
    selectAll (val) {
      this.checks = this.checks.map(() => val)
    },

    filteredList (val) {
      this.checks = [...Array(val.length)].map(() => false)
      this.selectAll = false
    }
  },

  async created () {
    this.pending = true
    await this.updateAll()
    this.pending = false
  },

  methods: {
    async updateAll () {
      const allMentorings = await mentoringManager.getAllMentorings()
      ;[this.mentorings[0], this.mentorings[1], this.mentorings[2]] =
        await Promise.all([1, 2, 3].map(grade => allMentorings.filter(targetGrade =>
          targetGrade === grade
        )))
      this.checks = [...Array(this.mentorings[this.tab].length)].map(() => false)
      this.mentorings = Object.assign({}, this.mentorings)
    },

    async deleteChecked () {

    },

    getDaySmallTextByCode (code) {
      return days.find(v => v.code === code).smallText
    }
  }
}
</script>

<template>
  <content-wrapper class="mng-mentoring">
    <h1 slot="header">
      <span class="icon-comment" />멘토링 신청 관리
      <span
        class="mng-mentoring__create"
      >
        <span class="icon-plus" />추가하기
      </span>
    </h1>
    <dimi-card
      slot="main"
      class="mng-mentoring__main"
    >
      <dimi-tab
        v-model="tab"
        :tabs="['1학년', '2학년', '3학년']"
      />
      <div
        v-if="pending"
        class="mentoring__loader"
      >
        <dimi-loader />
      </div>
      <section
        v-else
        class="mng-mentoring__section"
      >
        <h2 class="mng-mentoring__title">
          {{ tab + 1 + '학년' }} 멘토링 신청 관리 ({{ currentCount }}개)
        </h2>

        <nav class="mng-mentoring__toolbar">
          <dimi-checkbox
            v-model="selectAll"
            class="mng-mentoring__tool mng-mentoring__select-all"
          >
            모두 선택
          </dimi-checkbox>

          <span
            class="mng-mentoring__tool mng-mentoring__delete"
            @click="deleteChecked"
          >
            <span class="mng-mentoring__delete-icon icon-delete" /> 선택 삭제
          </span>

          <dimi-dropdown
            v-model="filter"
            :items="['필터 없음', ...days.map(v => v.text)]"
            class="mng-mentoring__tool mng-mentoring__sort"
          />
        </nav>

        <table class="mng-mentoring__list">
          <tbody>
            <tr
              v-for="(item, index) in filteredList"
              :key="index"
              class="mng-mentoring__row"
            >
              <td class="mng-mentoring__cell--name">
                <dimi-checkbox
                  v-model="checks[index]"
                  class="mng-mentoring__item-check"
                >
                  {{ item.teacher.name }} 선생님
                </dimi-checkbox>
              </td>
              <td class="mng-mentoring__cell">
                {{ item.subject }}
              </td>
              <td class="mng-mentoring__cell">
                {{ getDaySmallTextByCode(item.day) }}
              </td>
              <td class="mng-mentoring__cell">
                {{ item.startTime }} ~ {{ item.endTime }}
              </td>
              <td class="mng-mentoring__cell">
                {{ item.room }}
              </td>
              <td
                class="mng-mentoring__cell mng-mentoring__cell--button-edit"
              >
                <span class="icon-edit" /> 수정
              </td>
              <td
                class="mng-mentoring__cell mng-mentoring__cell--button-delete"
              >
                <span class="icon-cross" /> 삭제
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </dimi-card>
    <dimi-modal
      :opened="true"
      class="mng-mentoring__modal"
    >
      <h3 class="mng-mentoring__modal-title">
        멘토링 추가
      </h3>
    </dimi-modal>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.mentoring {
  padding: 0;
  border: 0;

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.mng-mentoring {
  &__main {
    padding: 0;
  }

  &__section {
    padding: 0 24px 24px;
    margin-top: 36px;
    margin-bottom: 24px;
  }

  &__section:last-child {
    padding-bottom: 0;
  }

  &__create {
    margin-top: 1em;
    margin-right: 0.5em;
    color: $red;
    cursor: pointer;
    float: right;
    font-size: 16px;
  }

  &__title {
    margin-bottom: 32px;
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__toolbar {
    display: flex;
    margin-bottom: 12px;
    color: $gray-light;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }

  &__tool:not(:first-child) {
    margin-left: 2em;
  }

  &__select-all {
    user-select: none;
  }

  &__delete,
  &__excel {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  &__sort {
    margin-left: 1em !important;
  }

  &__delete-icon,
  &__excel-icon {
    font-size: 18px;
  }

  &__list {
    display: block;
    width: 100%;
    color: $gray !important;
    font-weight: $font-weight-bold;
    overflow-y: auto;
  }

  &__row:not(:last-child) {
    border-bottom: 1px solid $gray-lighter;
  }

  &__cell {
    padding: 24px 0;
    color: $gray-dark;
    white-space: nowrap;
  }

  &__cell--name {
    width: 28%;
    color: $black;
    white-space: normal;
  }

  &__cell:not(:last-child):not(:nth-last-child(2)) {
    padding-right: 84px;
  }

  &__cell--button-edit {
    padding-right: 24px;
    color: $red;
    cursor: pointer;
  }

  &__cell--button-delete {
    color: $gray-light;
    cursor: pointer;
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__form-row {
    display: flex;
    margin-bottom: 24px;
  }

  &__form-row--submit {
    margin-top: 24px;
    margin-bottom: 0;
  }

  &__field {
    display: flex;
    align-items: center;
  }

  &__field--full {
    flex-grow: 1;
  }

  &__field--right {
    margin-left: auto;
  }

  &__label {
    width: 5em;
    max-width: 4em;
    padding-right: 1em;
    text-align: right;
  }

  &__input {
    font-size: 16px;
  }

  &__input--manager {
    width: 10em;
  }

  &__input--maxCount {
    width: 6em;
  }

  &__input--day {
    padding: 0.75em 1em;
    border: 0;
    background-color: $gray-lighten;
    border-radius: 20px;
  }

  &__modal {
    padding: 24px;
  }
}
</style>
