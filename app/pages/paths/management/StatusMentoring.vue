<script>
import ContentWrapper from '@/components/ContentWrapper.vue'
import days from '@/src/util/days'
import { mentoringManager } from '@/src/api/mentoring'

export default {
  name: 'StatusMentoring',
  components: { ContentWrapper },

  data () {
    return {
      pending: true,
      tab: 0,
      filter: 0,
      mentorings: []
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
      return this.mentorings[this.tab].map((mentor) =>
        mentor.mentoringRequest.length).reduce((a, b) => a + b, 0)
    }
  },

  async created () {
    this.pending = true
    await this.updateAll()
    this.pending = false
  },

  methods: {
    async updateAll () {
      this.mentorings = await Promise.all([...Array(3)].map((_, grade) => mentoringManager.getMentoringByGrade(grade + 1)))
      this.mentorings = Object.assign({}, this.mentorings)
    },

    async downloadExcel (grade) {
      try {
        await mentoringManager.downloadExcel(grade)
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
  <content-wrapper class="stat-mentoring">
    <h1 slot="header">
      <span class="stat-mentoring__head">
        <span class="icon-list" />멘토링 신청 현황
      </span>
      <span
        class="stat-mentoring__excel"
        @click="downloadExcel(tab + 1)"
      >
        <span class="icon-long-arrow-down" />엑셀 다운로드
      </span>
    </h1>
    <dimi-card
      slot="main"
      class="stat-mentoring__main"
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
        class="stat-mentoring__section"
      >
        <h2 class="stat-mentoring__title">
          {{ tab + 1 + '학년' }} 멘토링 신청 현황 ({{ currentCount }}개)
        </h2>

        <nav class="stat-mentoring__toolbar">
          <dimi-dropdown
            v-model="filter"
            :items="['필터 없음', ...days.map(v => v.text)]"
            class="stat-mentoring__tool stat-mentoring__sort"
          />
        </nav>

        <table class="stat-mentoring__list">
          <tbody>
            <template
              v-for="mentoring in filteredList"
            >
              <tr
                v-for="(item, idx) in mentoring.mentoringRequest"
                :key="idx"
                class="stat-mentoring__row"
              >
                <td class="stat-mentoring__cell stat-mentoring__cell--name">
                  {{ mentoring.teacher.name }} 선생님
                </td>
                <td class="stat-mentoring__cell">
                  {{ mentoring.subject }}
                </td>
                <td class="stat-mentoring__cell">
                  {{ getDaySmallText(mentoring.day) }}
                </td>
                <td class="stat-mentoring__cell">
                  {{ mentoring.startTime }} ~ {{ mentoring.endTime }}
                </td>
                <td class="stat-mentoring__cell">
                  {{ mentoring.room }}
                </td>
                <td class="stat-mentoring__cell">
                  {{ item.requester.serial }} {{ item.requester.name }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </section>
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

.content {
  @include until($tablet) {
    &__header > h1 {
      margin-bottom: 1.8em;
    }
  }
}

.stat-mentoring {
  &__main {
    padding: 0;
  }

  &__section {
    padding: 0 24px 24px;
    margin-top: 36px;
  }

  &__section:last-child {
    padding-bottom: 0;
  }

  &__head {
    @include until($tablet) {
      display: block;
    }
  }

  &__excel {
    margin-top: 1em;
    margin-right: 0.5em;
    color: $aloes;
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
    @include until($tablet) {
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  &__tool:not(:first-child) {
    margin-left: 2em;
  }

  &__tool {
    @include until($tablet) {
      display: inline-block;
      width: 40%;
      justify-content: flex-start;
      margin-left: unset !important;
      text-align: left;
    }
  }

  &__select-all {
    user-select: none;
  }

  &__excel {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
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
    color: $gray;
    white-space: nowrap;
  }

  &__cell--name {
    color: $gray-dark;

    @include from($tablet) {
      width: 99%;
    }
  }

  &__cell:not(:last-child) {
    padding-right: 1.5em;
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
</style>
