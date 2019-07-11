<script>
import AssignmentBase from '@/components/AssignmentBase.vue'
import { assignmentPublisher } from '@/src/api/assignment'

import timestamp from 'unix-timestamp'

export default {
  name: 'ManageAssignment',
  components: { AssignmentBase },

  data: () => ({
    loading: false,
    assignments: [],
    now: timestamp.fromDate(new Date()),
    modals: {
      create: false,
      edit: false,
      temp: {}
    },
    form: {
      title: '',
      description: '',
      endDate: new Date(),
      targetGrade: null,
      targetClass: null
    }
  }),

  async created () {
    await this.update()
  },

  methods: {
    async edit (ass) {
      await assignmentPublisher.editAssignment(ass.idx, this.form)
      await this.$swal('수정되었습니다', '', 'success')
      this.closeModal()
      await this.update()
    },

    async download (ass) {
      await assignmentPublisher.getResult(ass.idx)
    },

    async deleteAss (ass) {
      const { value: answer } = await this.$swal({
        type: 'warning',
        text: '정말 삭제하시겠습니까?',
        confirmButtonColor: '#d61315',
        cancelButtonColor: '#ababab',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        showCancelButton: true
      })

      if (!answer) return
      try {
        await assignmentPublisher.deleteAssignment(ass.idx)
        this.assignments = await assignmentPublisher.getAssignmentList()
        this.$swal('삭제되었습니다', '', 'success')
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
      await this.update()
    },

    async create () {
      try {
        await assignmentPublisher.createAssignment(this.form)
        await this.$swal('추가되었습니다', '', 'success')
        this.closeModal()
        await this.update()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async update () {
      this.loading = true
      this.assignments = await assignmentPublisher.getAssignmentList()
      this.loading = false
    },

    openEditModal (ass) {
      this.modals.edit = true
      this.modals.temp = ass
      this.form = {
        title: ass.title,
        description: ass.description,
        endDate: ass.endDate,
        targetGrade: ass.targetGrade,
        targetClass: ass.targetClass
      }
    },

    closeModal () {
      this.modals = {
        create: false,
        edit: false,
        temp: {}
      }

      this.form = {
        title: '',
        description: '',
        endDate: new Date(),
        targetGrade: null,
        targetClass: null
      }
    }
  }
}
</script>

<template>
  <div>
    <assignment-base
      :loading="loading"
      :assignments="assignments"
    >
      <template slot-scope="{ ass }">
        <span
          class="assignor__item"
          @click="openEditModal(ass)"
        >
          <span class="icon-edit" /> 수정하기
        </span>
        <span
          v-if="now <= ass.end_date"
          class="assignor__item--del"
          @click="deleteAss(ass)"
        >
          <span class="icon-cross" /> 삭제하기
        </span>
        <span
          v-else
          class="assignor__item--down"
          @click="download(ass)"
        >
          <span class="icon-long-arrow-down" /> 다운로드
        </span>
      </template>

      <span slot="header">
        <span class="assignor__header">
          <span class="icon-submission" />과제 제출 관리

          <span
            class="assignor__plus"
            @click="modals.create = true"
          >
            <span class="icon-plus" />추가하기
          </span>
        </span>
      </span>

      <span
        slot="opponent"
        slot-scope="{ ass }"
      >
        {{ ass.targetGrade }}학년
        {{ ass.targetClass }}반 대상
      </span>
    </assignment-base>

    <dimi-modal
      :opened="modals.create"
      @close="closeModal"
    >
      <h3 class="assignor__title">
        과제 제출 추가
      </h3>

      <div class="assignor__form-field">
        <label class="assignor__form-label">
          과제명
        </label>
        <dimi-input
          id="ass-title"
          v-model="form.title"
          class="assignor__form-input"
          placeholder="과제의 제목을 입력하세요"
        />
        <label class="assignor__form-label assignor__form-label--target">
          학년
        </label>
        <dimi-input
          id="ass-target-grade"
          v-model="form.targetGrade"
          class="assignor__form-input assignor__form-input--target"
        />
        <label class="assignor__form-label assignor__form-label--target">
          반
        </label>
        <dimi-input
          id="ass-target-class"
          v-model="form.targetClass"
          class="assignor__form-input assignor__form-input--target"
        />
      </div>
      <div class="assignor__form-field">
        <label class="assignor__form-label">
          과제 설명
        </label>
        <dimi-input
          id="ass-desc"
          v-model="form.description"
          placeholder="과제에 대해 설명해주세요"
        />
      </div>
      <div class="assignor__form-field">
        <label class="assignor__form-label">
          제출 마감일
        </label>
        <dimi-date-input v-model="form.endDate" />
      </div>

      <div class="assignor__submit">
        <dimi-button @click="create">
          추가
        </dimi-button>
      </div>
    </dimi-modal>

    <dimi-modal
      :opened="modals.edit"
      @close="closeModal"
    >
      <h3 class="assignor__title">
        과제 제출 수정
      </h3>

      <div class="assignor__form-field">
        <label class="assignor__form-label">
          과제명
        </label>
        <dimi-input
          id="ass-title"
          v-model="form.title"
          class="assignor__form-input"
          placeholder="과제의 제목을 입력하세요"
        />
        <label class="assignor__form-label assignor__form-label--target">
          학년
        </label>
        <dimi-input
          id="ass-target-grade"
          v-model="form.targetGrade"
          class="assignor__form-input assignor__form-input--target"
        />
        <label class="assignor__form-label assignor__form-label--target">
          반
        </label>
        <dimi-input
          id="ass-target-class"
          v-model="form.targetClass"
          class="assignor__form-input assignor__form-input--target"
        />
      </div>
      <div class="assignor__form-field">
        <label class="assignor__form-label">
          과제 설명
        </label>
        <dimi-input
          id="ass-desc"
          v-model="form.description"
          placeholder="과제에 대해 설명해주세요"
        />
      </div>
      <div class="assignor__form-field">
        <label class="assignor__form-label">
          제출 마감일
        </label>
        <dimi-date-input v-model="form.endDate" />
      </div>

      <div class="assignor__submit">
        <dimi-button @click="edit(modals.temp)">
          수정
        </dimi-button>
      </div>
    </dimi-modal>
  </div>
</template>

<style lang="scss">
.assignor {
  &__item {
    margin-right: 24px;
    cursor: pointer;
  }

  &__item--del {
    margin-right: 0;
    color: $gray;
    cursor: pointer;
  }

  &__item--down {
    margin-right: 0;
    color: $aloes;
    cursor: pointer;
  }

  &__header {
    position: relative;
    display: block;
  }

  &__plus {
    position: absolute;
    right: 0;
    bottom: 0;
    color: $pink;
    cursor: pointer;
    font-size: 16px;
  }

  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__form-field {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
  }

  &__form-label {
    min-width: 6em;
  }

  &__form-label--target {
    min-width: 3em;
    margin-right: 1em;
    text-align: right;
  }

  &__form-input--target {
    flex-basis: 150px;
  }

  &__submit {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
