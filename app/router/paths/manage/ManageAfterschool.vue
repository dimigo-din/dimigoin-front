<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import DefaultNavbar from '../../partial/DefaultNavbar.vue'
import DimiCard from '../../../components/DimiCard.vue'
import DimiCheckbox from '../../../components/DimiCheckbox.vue'
import DimiDropdown from '../../../components/DimiDropdown.vue'
import DimiDivider from '../../../components/DimiDivider.vue'

export default {
  name: 'ManageCircle',
  components: { ContentWrapper, DefaultNavbar, DimiCard, DimiDivider, DimiCheckbox, DimiDropdown },

  data: () => ({
    checks: [],
    selectAll: false,

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
    <h1 slot="header"><span class="icon-club"/>2018년 상반기 방과후 활동 관리</h1>
    <dimi-card
      slot="main"
      class="mng-afsc__main">

      <section class="mng-afsc__section">
        <h1 class="mng-afsc__title">
          방과 후 활동 관리 ({{ list.length }}개)
        </h1>

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
            :items="['요일 기준 정렬', '담당교사 기준 정렬', '신청자 순 기준 정렬']"
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
              <td class="mng-afsc__cell mng-afsc__cell-name">{{ item.name }}</td>
              <td class="mng-afsc__cell">총 {{ item.capacity }}명</td>
              <td class="mng-afsc__cell">{{ item.appliedCount }}명 신청</td>
              <td class="mng-afsc__cell mng-afsc__cell-button">
                <span class="icon-long-arrow"/> 세부관리
              </td>
            </tr>
          </tbody>
        </table>

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
  }

  &__title {
    font-size: 24px;
    padding: 24px;
  }

  &__toolbar {
    @include font-bold;

    color: $gray-light;
    display: flex;
    font-size: 16px;
    margin-bottom: 24px;
    padding: 0 24px;
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

  &__item-divider {
    position: relative;
  }

  &__cell {
    padding: 12px;
    white-space: nowrap;
  }

  &__cell:first-child {
    padding-left: 24px;
  }

  &__cell:last-child {
    padding-right: 24px;
  }

  &__cell-name {
    white-space: normal;
    width: 99%;
  }

  &__cell-button {
    color: $pink;
  }
}
</style>
