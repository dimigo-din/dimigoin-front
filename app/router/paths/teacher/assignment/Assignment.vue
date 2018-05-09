<script>
import AssignmentBase from '@/components/AssignmentBase.vue'

export default {
  name: 'Assignment',

  components: { AssignmentBase },

  data: () => ({
    modalOpen: false,
    form: {
      title: '',
      description: '',
      date: new Date()
    }
  }),

  methods: {
    close () { },
    edit () { },
    cancel () { },
    submit () {

    }
  }
}
</script>

<template>
  <div>
    <assignment-base>
      <template slot-scope="{ ass }">
        <span
          class="assignor__item"
          @click="close">
          <span class="icon-ok"/> 마감하기
        </span>

        <span
          class="assignor__item"
          @click="edit">
          <span class="icon-edit"/> 수정하기
        </span>
        <span
          class="assignor__item"
          @click="cancel">
          <span class="icon-cross"/> 취소하기
        </span>
      </template>

      <span slot="header">
        <span class="assignor__header">
          <span class="icon-submission"/>과제 제출 관리

          <span
            class="assignor__plus"
            @click="modalOpen = true"
          >
            <span class="icon-plus"/>추가하기
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
      @close="modalOpen = false">
      <h3 class="assignor__title">과제 제출 추가</h3>

      <div class="assignor__form-field">
        <label class="assignor__form-label">과제명</label>
        <dimi-input
          v-model="form.title"
          placeholder="과제의 제목을 입력하세요"/>
      </div>
      <div class="assignor__form-field">
        <label class="assignor__form-label">과제 설명</label>
        <dimi-input
          v-mode="form.description"
          placeholder="과제에 대해 설명해주세요"/>
      </div>
      <div class="assignor__form-field">
        <label class="assignor__form-label">제출 마감일</label>
        <dimi-date-input v-model="form.date"/>
      </div>

      <div class="assignor__submit">
        <dimi-button @click="submit">추가하기</dimi-button>
      </div>
    </dimi-modal>
  </div>
</template>

<style lang="scss">
.assignor {
  &__item {
    cursor: pointer;
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
    cursor: pointer;
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
