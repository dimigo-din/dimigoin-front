<script>
import AssignmentBase from './AssignmentBase.vue'
import DimiModal from '../../../components/DimiModal.vue'

export default {
  name: 'Assignor',
  components: { AssignmentBase, DimiModal },
  data: () => ({
    modalOpen: false
  })
}
</script>

<template>
  <div>
    <assignment-base>
      <template slot-scope="{ ass }">
        <span class="assignor__item">
          <span class="icon-ok"/> 마감하기
        </span>

        <span class="assignor__item">
          <span class="icon-edit"/> 수정하기
        </span>
        <span class="assignor__item">
          <span class="icon-cross"/> 취소하기
        </span>
      </template>

      <span slot="header">
        <span class="assignor__header">
          <span class="icon-request-sm"/> 과제 제출 관리

          <span
            class="assignor__plus"
            @click="modalOpen = true"
          >
            <span class="icon-plus"/> 추가하기
          </span>
        </span>
      </span>

      <span
        slot="opponent"
        slot-scope="{ ass }"
      >
        {{ ass.target_grade }}학년
        {{ ass.target_grade }}반 대상
      </span>

    </assignment-base>

    <dimi-modal
      :opened="modalOpen"
      @close="modalOpen = false"
    >
      <h3 class="assignor__title">과제 제출 추가</h3>
    </dimi-modal>
  </div>
</template>

<style lang="scss">
.assignor {
  &__item {
    margin-right: 24px;
  }

  &__item:last-of-type {
    color: $gray;
    margin-right: 0;
  }

  &__header {
    display: block;
    position: relative;
  }

  &__plus {
    bottom: 0;
    color: $pink;
    font-size: 16px;
    position: absolute;
    right: 0;
  }

  &__title {
    @include font-bold;

    color: $gray-dark;
    font-size: 24px;
  }
}
</style>
