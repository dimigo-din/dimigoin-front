<script>
import { format } from 'date-fns'
import ContentWrapper from '@/components/ContentWrapper.vue'
import days from '@/src/util/days'
import { mentoringManager } from '@/src/api/mentoring'
// import timestamp from 'unix-timestamp'

export default {
  name: 'ManageMentoring',
  components: { ContentWrapper },

  filters: {
    filterDay (time) {
      return format(time, 'YYYY/MM/DD')
    },
    filterTime (time) {
      return format(time, 'HH:mm')
    },
    filterDate (time) {
      return format(time, 'YYYY/MM/DD HH:mm')
    }
  },

  data () {
    return {
      pending: true,
      tab: 0,
      checks: [],
      selectAll: false,
      filter: 0,

      modal: {
        create: {
          open: false,
          grade: false,
          time: false,
          applyTime: false
        }
      },

      form: {
        teacher: '',
        day: 0,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        subject: '',
        room: '',
        startDate: new Date(),
        endDate: new Date(),
        grade: 0,
        maxUser: 0
      },

      mentorings: [
        [], [], []
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
      ;[this.mentorings[0], this.mentorings[1], this.mentorings[2]] =
        await Promise.all([1, 2, 3].map(grade => mentoringManager.getMentoringByGrade(grade)))
      this.checks = [...Array(this.mentorings[this.tab].length)].map(() => false)
      this.mentorings = Object.assign({}, this.mentorings)
    },

    closeModal () {
      this.modal.create.open = false
      this.form = {
        teacher: '',
        day: 0,
        date: new Date(),
        subject: '',
        room: '',
        startTime: new Date(),
        endTime: new Date(),
        grade: 0,
        maxUser: 0
      }
    },

    async addMentoring () {
      try {
        await mentoringManager.addMentoring(this.form)
        await this.$swal('추가하였습니다', '', 'success')
        this.closeModal()
        await this.updateAll()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async deleteChecked () {
      if (!this.checks.filter(v => v).length) return
      const { value: answer } = await this.$swal({
        type: 'warning',
        title: '경고',
        text: '정말 삭제하실 건가요? 이 작업은 되돌릴 수 없습니다.',
        confirmButtonColor: '#d61315',
        cancelButtonColor: '#ababab',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        showCancelButton: true
      })

      if (!answer) return
      try {
        await Promise.all(Object.keys(this.checks.filter(v => v))
          .map(key => mentoringManager.deleteMentoringByAdmin(this.filteredList[key].idx)))
        await this.$swal('삭제되었습니다', '', 'success')
        await this.updateAll()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async deleteMentoring (idx) {
      const { value: answer } = await this.$swal({
        type: 'warning',
        title: '경고',
        text: '정말 삭제하실 건가요? 이 작업은 되돌릴 수 없습니다.',
        confirmButtonColor: '#d61315',
        cancelButtonColor: '#ababab',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCancelButton: true
      })

      if (!answer) return
      try {
        await mentoringManager.deleteMentoringByAdmin(idx)
        await this.$swal('삭제되었습니다', '', 'success')
        await this.updateAll()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    getDaySmallText (code) {
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
        @click="modal.create.open = true"
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
                {{ getDaySmallText(item.day) }}
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
                @click="deleteMentoring(item.idx)"
              >
                <span class="icon-cross" /> 삭제
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <dimi-modal
        :opened="modal.create.open"
        class="modal__modal"
        @close="modal.create.open = false"
      >
        <h3 class="modal__title">
          멘토링 추가
        </h3>
        <div class="modal__field">
          <div class="modal__label">선생님 명</div>
          <dimi-input
            v-model.trim="form.teacher"
            class="modal__input"
            placeholder="선생님 명을 기입하세요."
          />
        </div>
        <div class="modal__field">
          <div class="modal__label">장소</div>
          <dimi-input
            v-model.trim="form.room"
            class="modal__input"
            placeholder="장소를 기입하세요."
          />
        </div>
        <div class="modal__field">
          <div class="modal__label">과목</div>
          <dimi-input
            v-model.trim="form.subject"
            class="modal__input"
            placeholder="과목을 기입하세요."
          />
        </div>
        <div class="modal__field">
          <div class="modal__label">학년</div>
          <dimi-dropdown
            v-model="form.grade"
            :items="[1, 2, 3]"
          />
        </div>
        <div class="modal__field">
          <div @click="modal.create.time = !modal.create.time">
            <div class="modal__label">멘토링 시간</div>
            <div
              v-if="!modal.create.time"
              class="modal__label-right"
            >
              {{ form.startTime }} {{ form.endTime | filterTime }} ~ {{ form.endTime | filterTime }}
            </div>
            <div class="modal__expand">
              <span :class="`icon-arrow-${modal.create.time ? 'up' : 'down'}`" />
            </div>
          </div>
          <div
            v-if="modal.create.time"
            class="modal__input"
          >
            <div class="modal__label--small">날짜</div>
            <dimi-date-input v-model="form.date" />
            <div class="modal__label--small">시작 시간</div>
            <dimi-date-input v-model="form.startTime" />
            <div class="modal__label--small">종료 시간</div>
            <dimi-date-input v-model="form.endTime" />
          </div>
        </div>
        <div class="modal__field">
          <div @click="modal.create.applyTime = !modal.create.applyTime">
            <div class="modal__label">신청 시간</div>
            <div
              v-if="!modal.create.applyTime"
              class="modal__label-right"
            >
              {{ form.startDate | filterDate }} ~ {{ form.endDate | filterDate }}
            </div>
            <div class="modal__expand">
              <span :class="`icon-arrow-${modal.create.applyTime ? 'up' : 'down'}`" />
            </div>
          </div>
          <div
            v-if="modal.create.applyTime"
            class="modal__input"
          >
            <div class="modal__label--small">신청 시작</div>
            <dimi-date-input v-model="form.startDate" />
            <div class="modal__label--small">신청 마감</div>
            <dimi-date-input v-model="form.endDate" />
          </div>
        </div>
        <span
          class="modal__create"
          @click="addMentoring"
        >
          <dimi-button>추가하기</dimi-button>
        </span>
      </dimi-modal>
    </dimi-card>
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

  &__delete {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  &__sort {
    margin-left: 1em !important;
  }

  &__delete-icon {
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
    width: 30%;
    color: $black;
    white-space: normal;
  }

  &__cell:not(:last-child):not(:nth-last-child(2)) {
    padding-right: 54px;
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

  &__field {
    display: flex;
    align-items: center;
  }

  &__label {
    width: 5em;
    max-width: 4em;
    padding-right: 1em;
  }

  &__input {
    font-size: 16px;
  }
}

.modal {
  &__title {
    margin-bottom: 1.5em;
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__field {
    margin: 1.5rem 0;
  }

  &__field:last-of-type {
    margin-bottom: 3em;
  }

  &__label {
    display: inline-block;
    margin-bottom: 8px;
    color: $gray-dark;
    font-size: 20px;
    font-weight: $font-weight-bold;
    line-height: 1.15;
  }

  &__label--small {
    margin-top: 5px;
    margin-bottom: 8px;
    color: $gray;
    font-size: 18px;
    font-weight: $font-weight-bold;
    line-height: 1.15;
  }

  &__label--minimal {
    display: inline-block;
    margin-right: 0.5em;
    color: $black;
    font-size: 16px;
    line-height: 1.15;
  }

  &__label-right {
    display: block;
    margin-right: 20px;
    float: right;
    font-size: 16px;
  }

  &__input--time {
    display: inline-block;
    width: 15%;
    margin-right: 3px;
  }

  &__expand {
    display: inline-block;
    margin-bottom: 16px;
    margin-left: 8px;
    cursor: pointer;
  }

  &__checkbox {
    margin-bottom: 13px;
  }

  &__create {
    position: absolute;
    right: 25px;
    bottom: 1.5em;
    margin-right: 0.5em;
    color: $red;
    cursor: pointer;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }
}

.dropdown {
  display: inline-flex;
  margin-left: 0.5em;
  font-size: 20px;
  line-height: 1.15;

  &__item {
    padding: 15px 24px;
    background-color: $white;
    text-align: center;
  }

  &__item:hover {
    background-color: $gray-lighten;
  }
}

.date-input {
  margin-bottom: 1em;
}
</style>
