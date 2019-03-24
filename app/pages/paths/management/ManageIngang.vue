<script>
import ContentWrapper from '@/components/ContentWrapper.vue'

import days from '@/src/util/days'
import timestamp from 'unix-timestamp'
import { ingangManager } from '@/src/api/ingang'

export default {
  name: 'ManageIngang',
  components: { ContentWrapper },
  data: () => ({
    pending: false,
    currentTab: 0,
    checks: [],
    ingangs: [],
    notice: '',
    modal: {
      profile: {}
    },

    form: {
      target_grade: '',
      day: 0,
      time: '',
      date: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      max_user_1: '',
      max_user_2: '',
      max_user_3: '',
      max_user_4: '',
      max_user_5: '',
      max_user_6: ''
    }
  }),

  computed: {
    days () {
      return days
    },

    ingangInput () {
      return {
        grade: this.form.target_grade,
        day: days[this.form.day].code,
        time: this.form.time,
        date: timestamp.fromDate(this.form.date),
        startDate: timestamp.fromDate(this.form.startDate),
        endDate: timestamp.fromDate(this.form.endDate),
        max_user_1: parseInt(this.form.max_user_1),
        max_user_2: parseInt(this.form.max_user_2),
        max_user_3: parseInt(this.form.max_user_3),
        max_user_4: parseInt(this.form.max_user_4),
        max_user_5: parseInt(this.form.max_user_5),
        max_user_6: parseInt(this.form.max_user_6)
      }
    }
  },

  watch: {
    selectAll (val) {
      this.checks = this.checks.map(() => val)
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.ingangs = await ingangManager.getIngangs()
      this.notice = (await ingangManager.getAnnouncement()).description
      this.pending = false
    },

    restructure (notice) {
      return {
        'description': notice,
        'date': this.timezone(new Date()).toISOString()
      }
    },

    async addNotice () {
      try {
        await ingangManager.addAnnouncement(this.restructure(this.notice))
        await this.$swal('추가하였습니다', '', 'success')
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async addIngang () {
      try {
        await ingangManager.createIngang(this.ingangInput)
        this.$swal('성공!', '추가되었습니다.', 'success')

        this.form.repeat = false

        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async download (grade) {
      try {
        await ingangManager.downloadExcel(grade)
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async deleteIngang (idx) {
      await ingangManager.deleteIngang(idx)
      await this.refresh()
    },

    timezone (val) {
      const timezoneOffset = new Date().getTimezoneOffset() * 60000
      return new Date(val - timezoneOffset)
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-internet-class" />인강실 신청 관리
    </h1>
    <dimi-card
      slot="main"
      class="ingang"
    >
      <dimi-tab
        v-model="currentTab"
        :tabs="['엑셀', '공지', '인강실']"
      />
      <div
        v-if="pending"
        class="ingang__loader"
      >
        <dimi-loader />
      </div>
      <template v-else>
        <div
          v-if="currentTab === 0"
          class="excel"
        >
          <dimi-button
            :loading="pending"
            class="excel__item"
            @click="download(1)"
          >
            1학년 엑셀 다운
          </dimi-button>
          <dimi-button
            :loading="pending"
            class="excel__item"
            @click="download(2)"
          >
            2학년 엑셀 다운
          </dimi-button>
        </div>
        <div
          v-if="currentTab === 1"
        >
          <div class="notice">
            <dimi-long-input
              v-model="notice"
              :height="300"
              class="notice__input"
            />
          </div>
          <div class="notice__button">
            <dimi-button
              class="notice__button"
              @click="addNotice()"
            >
              공지 수정하기
            </dimi-button>
          </div>
        </div>
        <div
          v-if="currentTab === 2"
        >
          <section class="mng-ing__section">
            <h2 class="mng-ing__title">
              인강실 추가/삭제
            </h2>

            <table class="mng-ing__list">
              <tbody>
                <tr
                  v-for="(item, index) in ingangs"
                  :key="index"
                  class="mng-ing__row"
                >
                  <td class="mng-ing__cell">
                    {{ item.day }}
                  </td>
                  <td class="mng-ing__cell">
                    {{ item.grade }}학년 {{ item.klass }}반
                  </td>
                  <td class="mng-ing__cell mng-ing__cell--time">
                    {{ item.time }}타임
                  </td>
                  <td class="mng-ing__cell">
                    총 {{ item.max }}명
                  </td>
                  <td class="mng-ing__cell">
                    {{ item.count }}명 신청
                  </td>
                  <td class="mng-ing__cell">
                    <span
                      class="mng-ing__tool mng-ing__delete"
                      @click="deleteIngang(item.idx)"
                    >
                      <span class="mng-ing__delete-icon icon-delete" /> 삭제
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section class="mng-ing__section">
            <h2 class="mng-ing__title">
              인강실 추가
            </h2>
            <div class="mng-ing__form">
              <div class="mng-ing__form-row">
                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    학년
                  </label>
                  <dimi-input
                    v-model="form.grade"
                    class="mng-ing__input"
                  />
                </div>

                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    타임
                  </label>
                  <dimi-input
                    v-model="form.time"
                    class="mng-ing__input"
                  />
                </div>

                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    날짜
                  </label>
                  <dimi-input
                    v-model="form.date"
                    type="date"
                  />
                </div>

                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    요일
                  </label>
                  <dimi-dropdown
                    v-model="form.day"
                    :items="days.map(v => v.text)"
                    :dropup="true"
                    class="mng-ing__input mng-ing__input--day"
                  />
                </div>
              </div>

              <div class="mng-ing__form-row">
                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    1반 최대인원
                  </label>
                  <dimi-input
                    v-model="form.max_user_1"
                    class="mng-ing__input"
                  />
                </div>

                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    2반 최대인원
                  </label>
                  <dimi-input
                    v-model="form.max_user_2"
                    class="mng-ing__input"
                  />
                </div>

                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    3반 최대인원
                  </label>
                  <dimi-input
                    v-model="form.max_user_3"
                    class="mng-ing__input"
                  />
                </div>
              </div>

              <div class="mng-ing__form-row">
                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    4반 최대인원
                  </label>
                  <dimi-input
                    v-model="form.max_user_4"
                    class="mng-ing__input"
                  />
                </div>

                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    5반 최대인원
                  </label>
                  <dimi-input
                    v-model="form.max_user_5"
                    class="mng-ing__input"
                  />
                </div>

                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    6반 최대인원
                  </label>
                  <dimi-input
                    v-model="form.max_user_6"
                    class="mng-ing__input"
                  />
                </div>
              </div>

              <div class="mng-ing__form-row">
                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    신청 시작
                  </label>
                  <dimi-date-input v-model="form.startDate" />
                </div>
              </div>

              <div class="mng-ing__form-row">
                <div class="mng-ing__field">
                  <label class="mng-ing__label">
                    신청 마감
                  </label>
                  <dimi-date-input v-model="form.endDate" />
                </div>
              </div>

              <div class="mng-ing__form-row mng-ing__form-row--submit">
                <div class="mng-ing__field mng-ing__field--right">
                  <dimi-button @click="addIngang">
                    추가하기
                  </dimi-button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </template>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.mng-ing {
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

  &__delete {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  &__delete-icon {
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
    padding: 24px;
    white-space: nowrap;
  }

  &__cell--time {
    width: 99%;
    line-height: 1.5;
    white-space: normal;
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
    margin-top: 10px;
    margin-bottom: 24px;
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
}

.ingang {
  padding: 0;
  border: 0;

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.excel {
  display: flex;
  justify-content: center;
  margin: 16px;

  &__item {
    margin: 16px;
  }
}

.notice {
  display: flex;
  justify-content: center;

  &__input {
    padding: 0 12px;
    margin: 6px 0;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 3px 8px 6px 0;
  }
}

.modal {
  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__date {
    font-size: 14px;
    font-weight: $font-weight-light;
  }
}
</style>
