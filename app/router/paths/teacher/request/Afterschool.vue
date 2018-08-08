<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import DefaultNavbar from '@/router/partial/DefaultNavbar.vue'

import { days } from '@/src/util/index'
import { afterschool } from '@/src/api'

export default {
  name: 'Afterschool',
  components: { ContentWrapper, DefaultNavbar },

  data () {
    return {
      currentGrade: 0,
      checks: [],
      selectAll: false,
      filter: 0,

      form: {
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        day: 0,
        targetGrade: null,
        maxCount: null,
        teacherName: ''
      },

      afterschools: [
        [],
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
      if (this.filter === 0) return this.afterschools[this.currentGrade]

      return this.afterschools[this.currentGrade].filter(v => v.day ===
        this.days[this.filter - 1].code)
    },

    lengthByGrade () {
      return this.afterschools[this.currentGrade].length
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
      for (const grade of [1, 2, 3]) {
        this.afterschools[grade - 1] = (await afterschool.getGradeAfterschool(grade))
      }
      this.checks = [...Array(this.afterschools[this.currentGrade].length)].map(() => false)
      this.afterschools = Object.assign({}, this.afterschools)
    },

    async addAfterschool () {
      try {
        await afterschool.createAfterschool(this.restructure(this.form))

        this.form = {
          name: '',
          startDate: new Date(),
          endDate: new Date(),
          day: 0,
          targetGrade: null,
          maxCount: null,
          teacherName: ''
        }

        await this.updateAll()

        this.$swal('성공!', '추가되었습니다.', 'success')
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    getDayTextByCode (code) {
      return this.days.filter(v => v.code === code)[0].text
    },

    async deleteChecked () {
      for (const key in this.checks) {
        if (this.checks[key]) await afterschool.deleteAfterschool(this.filteredList[key].idx)
      }
      await this.updateAll()
    },

    restructure (val) {
      return {
        'name': val['name'],
        'request_start_date': val['startDate'].toISOString(),
        'request_end_date': val['endDate'].toISOString(),
        'day': days.filter(v => v.idx === val['day']).code,
        'target_grade': this.currentGrade,
        'max_of_count': parseInt(val['maxCount']),
        'teacher_name': val['teacherName']
      }
    }
  }
}
</script>

<template>
  <content-wrapper class="mng-afsc">
    <h1 slot="header"><span class="icon-club"/>2018년 하반기 방과 후 활동 관리</h1>
    <dimi-card
      slot="main"
      class="mng-afsc__main">

      <dimi-tab
        v-model="currentGrade"
        :tabs="['1학년', '2학년', '3학년']"
      />

      <section class="mng-afsc__section">
        <h2 class="mng-afsc__title">
          {{ currentGrade + 1 + '학년' }} 방과 후 활동 관리 ({{ lengthByGrade }}개)
        </h2>

        <nav class="mng-afsc__toolbar">
          <dimi-checkbox
            v-model="selectAll"
            class="mng-afsc__tool mng-afsc__select-all">
            모두 선택
          </dimi-checkbox>

          <span
            class="mng-afsc__tool mng-afsc__delete"
            @click="deleteChecked">
            <span class="mng-afsc__delete-icon icon-delete"/> 선택 삭제
          </span>

          <dimi-dropdown
            :items="['필터 없음', ...days.map(v => v.text)]"
            v-model="filter"
            class="mng-afsc__tool mng-afsc__sort"/>
        </nav>

        <table class="mng-afsc__list">
          <tbody>
            <tr
              v-for="(item, index) in filteredList"
              :key="index"
              class="mng-afsc__row">

              <td class="mng-afsc__cell">
                <dimi-checkbox
                  v-model="checks[index]"
                  class="mng-afsc__item-check">
                  {{ getDayTextByCode(item.day) }}</dimi-checkbox>
              </td>

              <td class="mng-afsc__cell">{{ item.teacherName }}</td>
              <td class="mng-afsc__cell mng-afsc__cell--name">{{ item.name }}</td>
              <td class="mng-afsc__cell">총 {{ item.maxCount || '?' }}명</td>
              <td class="mng-afsc__cell">{{ item.count || '?' }}명 신청</td>
              <td class="mng-afsc__cell mng-afsc__cell--button">
                <span class="icon-long-arrow-right"/> 세부관리
              </td>
            </tr>
          </tbody>
        </table>

      </section>

      <section class="mng-afsc__section">
        <h2 class="mng-afsc__title">방과 후 활동 추가</h2>
        <div class="mng-afsc__form">
          <div class="mng-afsc__form-row">
            <div class="mng-afsc__field mng-afsc__field--full">
              <label class="mng-afsc__label">활동명</label>
              <dimi-input
                v-model="form.name"
                class="mng-afsc__input"
                placeholder="방과 후 활동명을 적어주세요!"
              />
            </div>
          </div>
          <div class="mng-afsc__form-row">

            <div class="mng-afsc__field">
              <label class="mng-afsc__label">담당자</label>
              <dimi-input
                v-model="form.teacher"
                class="mng-afsc__input mng-afsc__input--manager"/>
            </div>

            <div class="mng-afsc__field">
              <label class="mng-afsc__label">총원</label>
              <dimi-input
                v-model="form.maxCount"
                class="mng-afsc__input mng-afsc__input--maxCount"/>
              <span class="msg-afsc__maxCount-attr">명</span>
            </div>

            <div class="mng-afsc__field">
              <label class="mng-afsc__label">요일</label>
              <dimi-dropdown
                :items="days.map(v => v.text)"
                :dropup="true"
                v-model="form.day"
                class="mng-afsc__input mng-afsc__input--day"/>
            </div>
          </div>

          <div class="mng-afsc__form-row">
            <div class="mng-afsc__field">
              <label class="mng-afsc__label">신청 시작</label>
              <dimi-date-input v-model="form.startDate"/>
            </div>
          </div>

          <div class="mng-afsc__form-row">
            <div class="mng-afsc__field">
              <label class="mng-afsc__label">신청 마감</label>
              <dimi-date-input v-model="form.endDate"/>
            </div>
          </div>

          <div class="mng-afsc__form-row mng-afsc__form-row--submit">
            <div class="mng-afsc__field mng-afsc__field--right">
              <dimi-button @click="addAfterschool">추가하기</dimi-button>
            </div>
          </div>

        </div>
      </section>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.mng-afsc {
  &__main {
    padding: 0;
  }

  &__section {
    margin-bottom: 24px;
    margin-top: 36px;
    padding: 0 24px 24px;
  }

  &__section:last-child {
    padding-bottom: 0;
  }

  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
    margin-bottom: 48px;
  }

  &__toolbar {
    color: $gray-light;
    display: flex;
    font-size: 16px;
    font-weight: $font-weight-bold;
    margin-bottom: 12px;
  }

  &__tool:not(:first-child) {
    margin-left: 2em;
  }

  &__select-all {
    user-select: none;
  }

  &__delete {
    align-items: center;
    cursor: pointer;
    display: flex;
    user-select: none;
  }

  &__sort {
    margin-left: 1em !important;
  }

  &__delete-icon {
    font-size: 18px;
  }

  &__list {
    color: $gray !important;
    display: block;
    font-weight: $font-weight-bold;
    height: 600px;
    overflow-y: auto;
    width: 100%;
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
    line-height: 1.5;
    white-space: normal;
    width: 99%;
  }

  &__cell--button {
    color: $pink;
    cursor: not-allowed;
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
    margin-bottom: 0;
    margin-top: 24px;
  }

  &__field {
    align-items: center;
    display: flex;
  }

  &__field--full {
    flex-grow: 1;
  }

  &__field--right {
    margin-left: auto;
  }

  &__label {
    max-width: 4em;
    padding-right: 1em;
    text-align: right;
    width: 5em;
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
    background-color: $gray-lighten;
    border: 0;
    border-radius: 20px;
    padding: 0.75em 1em;
  }
}
</style>
