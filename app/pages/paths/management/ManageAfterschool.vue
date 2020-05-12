<script>
import ContentWrapper from '@/components/ContentWrapper.vue'

import { daysWithSun as days } from '@/src/util/days'
import { format } from 'date-fns'
import { afterschool } from '@/src/api/afterschool'

export default {
  name: 'ManageAfterschool',
  components: { ContentWrapper },

  filters: {
    filterDate: time => format(time, 'YYYY년 MM월 DD일 HH시 mm분 ss초')
  },

  data () {
    return {
      tab: 0,
      checks: [],
      selectAll: false,
      filter: 0,

      form: {
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        day: Array(6).fill(false),
        maxCount: null,
        teacherName: '',
        time: [false, false]
      },

      afterschools: [
        [],
        [],
        []
      ],

      editModal: {
        show: false,
        afsc: {
          day: Array(6).fill(false),
          time: [false, false]
        }
      },

      timeModal: {
        show: false,
        time: {
          start: new Date(),
          end: new Date(),
          day: 0
        }
      }
    }
  },

  computed: {
    days: () => days,

    filteredList () {
      if (this.filter === 0) return this.afterschools[this.tab]

      return this.afterschools[this.tab]
    },

    currentCount () {
      return this.afterschools[this.tab].length
    },

    afterschoolInput () {
      return {
        name: this.form.name,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        day: this.form.day,
        time: this.form.time,
        grade: this.tab + 1,
        maxCount: this.form.maxCount,
        teacherName: this.form.teacherName
      }
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
    await this.updateAll()
  },

  methods: {
    async updateAll () {
      [this.afterschools[0], this.afterschools[1], this.afterschools[2]] =
        await Promise.all([1, 2, 3].map(grade => afterschool.getGradeAfterschool(grade)))
      this.checks = [...Array(this.afterschools[this.tab].length)].map(() => false)
      this.afterschools = Object.assign({}, this.afterschools)
    },

    async addAfterschool () {
      try {
        await afterschool.createAfterschool(this.afterschoolInput)
        this.$swal('성공!', '추가되었습니다.', 'success')

        this.form.name = ''
        this.form.maxCount = null
        this.form.teacherName = ''

        await this.updateAll()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    getDayTextByCode (code) {
      return code.map(v =>
        days.find(_v => _v.code === v).smallText).join(',')
    },

    getDayIdxByCode (code) {
      return days.find(v => v.code === code).idx
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
        await Promise.all(Object.keys(this.checks).filter(v => this.checks[v])
          .map(key => afterschool.deleteAfterschool(this.filteredList[key].idx)))
        await this.$swal('삭제되었습니다', '', 'success')
        await this.updateAll()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async changeRequestTime () {
      const day = days[this.timeModal.time.day]
      const { value: answer } = await this.$swal({
        type: 'warning',
        title: '경고',
        text: `정말 ${this.tab + 1}학년 ${day.text} 수업의 수강 신청 기간을 모두 변경하시겠습니까?`,
        confirmButtonColor: '#d61315',
        cancelButtonColor: '#ababab',
        confirmButtonText: '변경',
        cancelButtonText: '취소',
        showCancelButton: true
      })
      if (!answer) return

      try {
        afterschool.changeRequestTime(this.timeModal.time, this.tab + 1)
        await this.$swal('수정되었습니다.', '', 'success')
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async downloadExcel (grade) {
      try {
        await afterschool.downloadExcel(grade)
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    getAfscTime (item) {
      return item.time.length === 2 ? '연강'
        : `${item.time.join()}타임`
    },

    openEditModal (item) {
      this.editModal.show = true
      this.editModal.afsc = Object.assign({}, item, {
        day: Array(6).fill(false),
        time: [false, false]
      })
      item.day.forEach(v => {
        this.editModal.afsc.day[this.getDayIdxByCode(v)] = true
      })
      item.time.forEach(v => {
        this.editModal.afsc.time[v - 1] = true
      })
    },

    openTimeModal () {
      this.timeModal.show = true
    },

    closeEditModal () {
      this.editModal.show = false
    },

    closeTimeModal () {
      this.timeModal.show = false
    },

    async editAfterschool () {
      try {
        await afterschool.editAfterschool(this.editModal.afsc)
        this.$swal('성공!', '수정되었습니다.', 'success')
        await this.updateAll()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    }
  }
}
</script>

<template>
  <content-wrapper class="mng-afsc">
    <h1 slot="header">
      <span class="icon-club" />방과 후 활동 신청 관리
    </h1>
    <dimi-card
      slot="main"
      class="mng-afsc__main"
    >
      <dimi-tab
        v-model="tab"
        :tabs="['1학년', '2학년', '3학년']"
      />

      <section class="mng-afsc__section">
        <h2 class="mng-afsc__title">
          {{ tab + 1 + '학년' }} 방과 후 활동 관리 ({{ currentCount }}개)
        </h2>

        <nav class="mng-afsc__toolbar">
          <dimi-checkbox
            v-model="selectAll"
            class="mng-afsc__tool mng-afsc__select-all"
          >
            모두 선택
          </dimi-checkbox>

          <span
            class="mng-afsc__tool mng-afsc__delete"
            @click="deleteChecked"
          >
            <span class="mng-afsc__delete-icon icon-delete" /> 선택 삭제
          </span>

          <span
            class="mng-afsc__tool mng-afsc__time"
            @click="openTimeModal"
          >
            <span class="mng-afsc__time-icon icon-edit" /> 신청 기간 일괄 수정
          </span>

          <span
            class="mng-afsc__tool mng-afsc__excel"
            @click="downloadExcel(tab + 1)"
          >
            <span class="mng-afsc__excel-icon icon-long-arrow-down" /> 엑셀 다운로드
          </span>

          <dimi-dropdown
            v-model="filter"
            :items="['필터 없음', ...days.map(v => v.text)]"
            class="mng-afsc__tool mng-afsc__sort"
          />
        </nav>

        <table class="mng-afsc__list">
          <tbody>
            <tr
              v-for="(item, index) in filteredList"
              :key="index"
              class="mng-afsc__row"
            >
              <td class="mng-afsc__cell">
                <dimi-checkbox
                  v-model="checks[index]"
                  class="mng-afsc__item-check"
                >
                  {{ getDayTextByCode(item.day) }}
                </dimi-checkbox>
              </td>

              <td class="mng-afsc__cell">
                {{ getAfscTime(item) }}
              </td>
              <td class="mng-afsc__cell">
                {{ item.teacherName }}
              </td>
              <td class="mng-afsc__cell mng-afsc__cell--name">
                {{ item.name }}
              </td>
              <td class="mng-afsc__cell">
                총 {{ item.maxCount }}명
              </td>
              <td class="mng-afsc__cell">
                {{ item.count }}명 신청
              </td>
              <td
                class="mng-afsc__cell mng-afsc__cell--button"
                @click="openEditModal(item)"
              >
                <span class="icon-long-arrow-right" /> 세부관리
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="mng-afsc__section">
        <h2 class="mng-afsc__title">
          방과 후 활동 추가
        </h2>
        <div class="mng-afsc__form">
          <div class="mng-afsc__form-row">
            <div class="mng-afsc__field mng-afsc__field--full">
              <label class="mng-afsc__label">
                활동명
              </label>
              <dimi-input
                v-model="form.name"
                class="mng-afsc__input"
                placeholder="방과 후 활동명을 적어주세요!"
              />
            </div>
          </div>
          <div class="mng-afsc__form-row">
            <div class="mng-afsc__field">
              <label class="mng-afsc__label">
                담당자
              </label>
              <dimi-input
                v-model="form.teacherName"
                class="mng-afsc__input mng-afsc__input--manager"
              />
            </div>

            <div class="mng-afsc__field">
              <label class="mng-afsc__label">
                총원
              </label>
              <dimi-input
                v-model="form.maxCount"
                class="mng-afsc__input mng-afsc__input--maxCount"
              />
              <span class="msg-afsc__maxCount-attr">
                명
              </span>
            </div>
          </div>

          <div class="mng-afsc__form-row">
            <div class="mng-afsc__field">
              <label class="mng-afsc__label">
                신청 시작
              </label>
              <dimi-date-input v-model="form.startDate" />
            </div>
          </div>

          <div class="mng-afsc__form-row">
            <div class="mng-afsc__field">
              <label class="mng-afsc__label">
                신청 마감
              </label>
              <dimi-date-input v-model="form.endDate" />
            </div>
          </div>

          <div class="mng-afsc__form-row">
            <div class="mng-afsc__field">
              <label class="mng-afsc__label">
                타임
              </label>
              <dimi-checkbox
                v-for="i in 2"
                :key="`time-${i}`"
                v-model="form.time[i-1]"
                class="mng-afsc__input--time"
              >
                {{ i }}타임
              </dimi-checkbox>
              <span class="mng-afsc__helper">(연강일 경우 두 타임 모두 체크하세요.)</span>
            </div>
          </div>

          <div class="mng-afsc__form-row">
            <div class="mng-afsc__field">
              <label class="mng-afsc__label">
                요일
              </label>
              <dimi-checkbox
                v-for="(day, i) in days"
                :key="`day-${i}`"
                v-model="form.day[i]"
                class="mng-afsc__input--time"
              >
                {{ day.text }}
              </dimi-checkbox>
            </div>
          </div>

          <div class="mng-afsc__form-row mng-afsc__form-row--submit">
            <div class="mng-afsc__field mng-afsc__field--right">
              <dimi-button @click="addAfterschool">
                추가하기
              </dimi-button>
            </div>
          </div>
        </div>
      </section>
      <dimi-modal
        class="modal__modal"
        :opened="editModal.show"
        @close="closeEditModal"
      >
        <h3 class="modal__title">
          방과 후 활동 세부 관리
        </h3>
        <div class="modal__field">
          <label class="modal__label">
            방과후 이름
          </label>
          <dimi-input
            v-model="editModal.afsc.name"
            placeholder="방과 후 수업의 제목을 기입하세요"
          />
        </div>
        <div class="modal__field">
          <label class="modal__label">
            수강 학년
          </label>
          <dimi-input
            v-model="editModal.afsc.grade"
            placeholder="방과 후 수업의 대상 학년을 기입하세요"
          />
        </div>
        <div class="modal__field">
          <label class="modal__label">
            수강 인원
          </label>
          <dimi-input
            v-model="editModal.afsc.maxCount"
            placeholder="방과 후 수업의 수강 인원을 기입하세요"
          />
        </div>
        <div class="modal__field">
          <label class="modal__label">
            강사 이름
          </label>
          <dimi-input
            v-model="editModal.afsc.teacherName"
            placeholder="방과 후 수업의 강사 이름을 기입하세요"
          />
        </div>
        <div class="modal__field">
          <label class="modal__label">
            요일
          </label>
          <dimi-checkbox
            v-for="(day, i) in days"
            :key="`day-${i}`"
            v-model="editModal.afsc.day[i]"
            class="mng-afsc__input--time"
          >
            {{ day.text }}
          </dimi-checkbox>
        </div>
        <div class="modal__field">
          <label class="modal__label">
            타임
          </label>
          <dimi-checkbox
            v-for="i in 2"
            :key="`time-${i}`"
            v-model="editModal.afsc.time[i-1]"
            class="modal__input--time"
          >
            {{ i }}타임
          </dimi-checkbox>
          <span class="mng-afsc__helper">(연강일 경우 두 타임 모두 체크하세요.)</span>
        </div>
        <div class="modal__field">
          <label class="modal__label">
            기존 신청 기간
            {{ editModal.afsc.startDate | filterDate }} ~ {{ editModal.afsc.endDate | filterDate }}
          </label>
        </div>
        <div class="modal__field">
          <label class="modal__label">
            신청 시작
          </label>
          <dimi-date-input
            :value="editModal.afsc.startDate"
            class="modal__input--time"
          />
        </div>
        <div class="modal__field">
          <label class="modal__label">
            신청 마감
          </label>
          <dimi-date-input
            :value="editModal.afsc.endDate"
          />
        </div>
        <div class="modal__field">
          <div class="modal__button">
            <dimi-button
              @click="editAfterschool"
            >
              적용하기
            </dimi-button>
          </div>
        </div>
      </dimi-modal>

      <dimi-modal
        class="modal__modal"
        :opened="timeModal.show"
        @close="closeTimeModal"
      >
        <h3 class="modal__title">
          {{ `${tab + 1}학년 방과 후 활동 신청 기간 일괄 수정` }}
        </h3>
        <div class="modal__field">
          <label class="modal__label">
            수업 요일
          </label>
          <dimi-dropdown
            v-model="timeModal.time.day"
            :items="days.map(v => v.text)"
          />
        </div>
        <div class="modal__field">
          <label class="modal__label">
            신청 시작
          </label>
          <dimi-date-input
            v-model="timeModal.time.start"
            class="modal__input--time"
          />
        </div>
        <div class="modal__field">
          <label class="modal__label">
            신청 마감
          </label>
          <dimi-date-input
            v-model="timeModal.time.end"
          />
        </div>
        <div class="modal__field">
          <div class="modal__button">
            <dimi-button
              @click="changeRequestTime"
            >
              적용하기
            </dimi-button>
          </div>
        </div>
      </dimi-modal>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss">
.mng-afsc {
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

  &__title {
    margin-bottom: 48px;
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
  &__excel,
  &__time {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  &__sort {
    margin-left: 1em !important;
  }

  &__delete-icon,
  &__excel-icon,
  &__time-icon {
    font-size: 18px;
  }

  &__list {
    display: block;
    width: 100%;
    height: 600px;
    color: $gray !important;
    font-weight: $font-weight-bold;
    overflow-y: auto;
  }

  &__row:not(:last-child) {
    border-bottom: 1px solid $gray-lighter;
  }

  &__cell {
    padding: 24px 0;
    white-space: nowrap;
  }

  &__cell:not(:last-child) {
    padding-right: 24px;
  }

  &__cell--name {
    width: 99%;
    line-height: 1.5;
    white-space: normal;
  }

  &__cell--button {
    color: $pink;
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

  &__input--time:not(:last-child) {
    margin-right: 1rem;
  }

  &__input--day {
    padding: 0.75em 1em;
    border: 0;
    background-color: $gray-lighten;
    border-radius: 20px;
  }

  &__helper {
    margin-left: 0.5rem;
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

  &__button {
    position: absolute;
    right: 25px;
    padding-top: 20px;
  }

  &__input--time:not(:last-child) {
    margin-right: 1rem;
  }

  &__helper {
    margin-left: 0.5rem;
  }
}
</style>
