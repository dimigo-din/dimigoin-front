<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import DefaultNavbar from '../../partial/DefaultNavbar.vue'
import DimiCard from '../../../components/DimiCard.vue'
import DimiCheckbox from '../../../components/DimiCheckbox.vue'
import DimiDropdown from '../../../components/DimiDropdown.vue'
import DimiDivider from '../../../components/DimiDivider.vue'
import DimiInput from '../../../components/DimiInput.vue'
import DimiTab from '../../../components/DimiTab.vue'
import DimiButton from '../../../components/DimiButton.vue'

export default {
  name: 'ManageAfterschool',
  components: {
    DimiButton,
    ContentWrapper,
    DefaultNavbar,
    DimiCard,
    DimiDivider,
    DimiCheckbox,
    DimiDropdown,
    DimiInput,
    DimiTab
  },

  data: () => ({
    currentGrade: 0,
    checks: [],
    selectAll: false,

    form: {
      name: '',
      day: 0,
      capacity: '',
      manager: ''
    },

    list: [
      {
        day: '월요일',
        leader: '도로시',
        name: '속성 에메랄드 시티 기행',
        capacity: 20,
        appliedCount: 8
      }, {
        day: '월요일',
        leader: '토토',
        name: '케인스 테리어 육성 학습',
        capacity: 20,
        appliedCount: 8
      }, {
        day: '화요일',
        leader: '허수아비',
        name: '톱밥 주머니와 인간의 뇌 사이 연관에 대한 형이상학적 대화',
        capacity: 20,
        appliedCount: 8
      }, {
        day: '금요일',
        leader: '담당교사',
        name: '자살반',
        capacity: 20,
        appliedCount: 8
      }, {
        day: '금요일',
        leader: '태티푸',
        name: '동쪽 먼치킨을 기르기 위한 101가지 방법',
        capacity: 20,
        appliedCount: 8
      }
    ]
  }),

  computed: {
    days () {
      return ['월요일', '화요일', '수요일', '목요일', '금요일', '토요1', '토요2']
    }
  },

  watch: {
    selectAll (val) {
      this.checks = this.checks.map(() => val)
    }
  },

  created () {
    this.checks = [...Array(this.list.length)].map(() => false)
  }
}
</script>

<template>
  <content-wrapper class="mng-afsc">
    <h1 slot="header"><span class="icon-club"/>2018년 상반기 방과 후 활동 관리</h1>
    <dimi-card
      slot="main"
      class="mng-afsc__main">

      <dimi-tab
        :tabs="['1학년', '2학년', '3학년']"
        :tab-idx.sync="currentGrade"
      />

      <section class="mng-afsc__section">
        <h2 class="mng-afsc__title">
          {{ currentGrade + 1 + '학년' }} 방과 후 활동 관리 ({{ list.length }}개)
        </h2>

        <nav class="mng-afsc__toolbar">
          <dimi-checkbox
            v-model="selectAll"
            class="mng-afsc__tool mng-afsc__select-all">
            모두 선택
          </dimi-checkbox>

          <span class="mng-afsc__tool mng-afsc__delete">
            <span class="mng-afsc__delete-icon icon-delete"/> 선택 삭제
          </span>

          <dimi-dropdown
            :items="['필터 없음', ...days]"
            class="mng-afsc__tool mng-afsc__sort"/>
        </nav>

        <table class="mng-afsc__list">
          <tbody>
            <tr
              v-for="(item, index) in list"
              :key="index"
              class="mng-afsc__row">

              <td class="mng-afsc__cell">
                <dimi-checkbox
                  v-model="checks[index]"
                  class="mng-afsc__item-check">
                  {{ item.day }}</dimi-checkbox>
              </td>

              <td class="mng-afsc__cell">{{ item.leader }}</td>
              <td class="mng-afsc__cell mng-afsc__cell--name">{{ item.name }}</td>
              <td class="mng-afsc__cell">총 {{ item.capacity }}명</td>
              <td class="mng-afsc__cell">{{ item.appliedCount }}명 신청</td>
              <td class="mng-afsc__cell mng-afsc__cell--button">
                <span class="icon-long-arrow"/> 세부관리
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
                v-model="form.manager"
                class="mng-afsc__input mng-afsc__input--manager"/>
            </div>

            <div class="mng-afsc__field">
              <label class="mng-afsc__label">총원</label>
              <dimi-input
                v-model="form.capacity"
                class="mng-afsc__input mng-afsc__input--capacity"
                type="number"/>
              <span class="msg-afsc__capacity-attr">명</span>
            </div>

            <div class="mng-afsc__field">
              <label class="mng-afsc__label">요일</label>
              <div class="mng-afsc__field">
                <dimi-dropdown
                  :items="days"
                  v-model="form.day"
                  class="mng-afsc__input mng-afsc__input--day"/>
              </div>
            </div>
          </div>

          <div class="mng-afsc__form-row">
            <div class="mng-afsc__field mng-afsc__field--right">
              <dimi-button>추가하기</dimi-button>
            </div>
          </div>

        </div>
      </section>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.mng-afsc {
  &__main {
    padding: 0;
  }

  &__section {
    margin-bottom: 64px;
    margin-top: 36px;
    padding: 0 24px 24px;
  }

  &__title {
    @include font-bold;

    color: $gray-dark;
    font-size: 24px;
    margin-bottom: 48px;
  }

  &__toolbar {
    @include font-bold;

    color: $gray-light;
    display: flex;
    font-size: 16px;
    margin-bottom: 12px;
    padding-left: 24px;
  }

  &__tool:not(:first-child) {
    margin-left: 2em;
  }

  &__delete {
    align-items: center;
    display: flex;
  }

  &__sort {
    margin-left: 1em !important;
  }

  &__delete-icon {
    font-size: 18px;
  }

  &__list {
    @include font-bold;
    color: $gray !important;
    width: 100%;
  }

  &__row:not(:last-child) {
    border-bottom: 1px solid $gray-lighter;
  }

  &__cell {
    padding: 24px;
    white-space: nowrap;
  }

  &__cell--name {
    line-height: 1.5;
    white-space: normal;
    width: 99%;
  }

  &__cell--button {
    color: $pink;
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__form-row {
    display: flex;
    margin-bottom: 1rem;
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

  &__input--capacity {
    width: 7em;
  }

  &__input--day {
    background-color: $gray-lighten;
    border: 0;
    border-radius: 20px;
    padding: 0.75em 1em;
  }
}
</style>
