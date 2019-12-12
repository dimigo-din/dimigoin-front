<template>
  <div class="filter">
    <h2 class="filter__title">
      멘토링 신청 현황 ({{ currentCount }}개)
    </h2>

    <nav class="filter__toolbar">
      <dimi-dropdown
        v-model="filter.grade"
        :items="['필터 없음', '1학년', '2학년', '3학년']"
        class="filter__tool filter__sort"
      />
      <span
        class="filter__excel"
        @click="modal.excel = true"
      >
        <span class="icon-long-arrow-down" />엑셀 다운로드
      </span>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.filter {
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

  &__delete,
  &__excel {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  &__delete-icon {
    font-size: 18px;
  }
}
</style>
