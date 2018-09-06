<script>
import AssignmentBase from '@/components/AssignmentBase.vue'
import throwable from '@/mixins/throwable'
import { assignment } from '@/src/api'

export default {
  name: 'Assignment',
  components: { AssignmentBase },
  mixins: [throwable],

  data: () => ({
    loading: false,
    assignments: [],
    now: new Date(),
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
      await assignment.assignor.editAssignment(ass.idx, this.restructure(this.form))
      await this.$swal('수정되었습니다', '', 'success')
      this.closeModal()
      await this.update()
    },

    async download (ass) {
      assignment.assignor.getResult(ass.idx)
    },

    async deleteAss (ass) {
      if (await this.$swal({
        type: 'warning',
        text: '정말 삭제하시겠습니까?',
        confirmButtonColor: '#d61315',
        cancelButtonColor: '#ababab',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        showCancelButton: true
      })) {
        try {
          await assignment.assignor.deleteAssignment(ass.idx)
          this.assignments = await assignment.assignor.getAssignmentList()
          this.$swal(
            '삭제되었습니다',
            'success'
          )
        } catch (err) {
          this.$_throwable_handleError(err)
        }
        await this.update()
      }
    },

    async create () {
      try {
        await assignment.admin.createAssignment(this.restructure(this.form))
        await this.$swal('추가되었습니다', '', 'success')
        this.closeModal()
        await this.update()
      } catch (err) {
        this.$_throwable_handleError(err)
      }
    },

    async update () {
      this.loading = true
      this.assignments = await assignment.assignor.getAssignmentList()
      this.loading = false
    },

    openEditModal (ass) {
      this.modals.edit = true
      this.modals.temp = ass
      this.form = {
        title: ass['title'],
        description: ass['description'],
        endDate: new Date(ass['end_date']),
        targetGrade: ass['target_grade'],
        targetClass: ass['target_class']
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
    },

    restructure (ass) {
      return {
        'title': ass.title,
        'description': ass.description,
        'target_grade': parseInt(ass.targetGrade),
        'target_class': parseInt(ass.targetClass),
        'end_date': (ass.endDate).toISOString()
      }
    }
  }
}
</script>

<template>
  <div>
    <assignment-base
      :loading="loading"
      :assignments="assignments">
      <template slot-scope="{ ass }">
        <span
          class="assignor__item"
          @click="openEditModal(ass)">
          <span class="icon-edit"/> 수정하기
        </span>
        <span
          v-if="now.getTime() <= (new Date(ass.end_date)).getTime()"
          class="assignor__item--del"
          @click="deleteAss(ass)">
          <span class="icon-cross"/> 삭제하기
        </span>
        <span
          v-else
          class="assignor__item--down"
          @click="download(ass)">
          <span class="icon-long-arrow-down"/> 다운로드
        </span>
      </template>

      <span slot="header">
        <span class="assignor__header">
          <span class="icon-submission"/>과제 제출 관리

          <span
            class="assignor__plus"
            @click="modals.create = true">
            <span class="icon-plus"/>추가하기
          </span>
        </span>
      </span>

      <span
        slot="opponent"
        slot-scope="{ ass }">
        {{ ass.target_grade }}학년
        {{ ass.target_class }}반 대상
      </span>

    </assignment-base>

    <dimi-modal
      :opened="modals.create"
      @close="closeModal">
      <h3 class="assignor__title">과제 제출 추가</h3>

      <div class="assignor__form-field">
        <label class="assignor__form-label">과제명</label>
        <dimi-input
          id="ass-title"
          v-model="form.title"
          class="assignor__form-input"
          placeholder="과제의 제목을 입력하세요"/>
        <label class="assignor__form-label assignor__form-label--target">학년</label>
        <dimi-input
          id="ass-target-grade"
          v-model="form.targetGrade"
          class="assignor__form-input assignor__form-input--target"/>
        <label class="assignor__form-label assignor__form-label--target">반</label>
        <dimi-input
          id="ass-target-class"
          v-model="form.targetClass"
          class="assignor__form-input assignor__form-input--target"/>
      </div>
      <div class="assignor__form-field">
        <label class="assignor__form-label">과제 설명</label>
        <dimi-input
          id="ass-desc"
          v-model="form.description"
          placeholder="과제에 대해 설명해주세요"/>
      </div>
      <div class="assignor__form-field">
        <label class="assignor__form-label">제출 마감일</label>
        <dimi-date-input v-model="form.endDate"/>
      </div>

      <div class="assignor__submit">
        <dimi-button @click="create">추가</dimi-button>
      </div>
    </dimi-modal>

    <dimi-modal
      :opened="modals.edit"
      @close="closeModal">
      <h3 class="assignor__title">과제 제출 수정</h3>

      <div class="assignor__form-field">
        <label class="assignor__form-label">과제명</label>
        <dimi-input
          id="ass-title"
          v-model="form.title"
          class="assignor__form-input"
          placeholder="과제의 제목을 입력하세요"/>
        <label class="assignor__form-label assignor__form-label--target">학년</label>
        <dimi-input
          id="ass-target-grade"
          v-model="form.targetGrade"
          class="assignor__form-input assignor__form-input--target"/>
        <label class="assignor__form-label assignor__form-label--target">반</label>
        <dimi-input
          id="ass-target-class"
          v-model="form.targetClass"
          class="assignor__form-input assignor__form-input--target"/>
      </div>
      <div class="assignor__form-field">
        <label class="assignor__form-label">과제 설명</label>
        <dimi-input
          id="ass-desc"
          v-model="form.description"
          placeholder="과제에 대해 설명해주세요"/>
      </div>
      <div class="assignor__form-field">
        <label class="assignor__form-label">제출 마감일</label>
        <dimi-date-input v-model="form.endDate"/>
      </div>

      <div class="assignor__submit">
        <dimi-button @click="edit(modals.temp)">수정</dimi-button>
      </div>
    </dimi-modal>
  </div>
</template>

<style lang="scss">
@import '~styles/variables';

.assignor {
  &__item {
    cursor: pointer;
    margin-right: 24px;
  }

  &__item--del {
    color: $gray;
    cursor: pointer;
    margin-right: 0;
  }

  &__item--down {
    color: $aloes;
    cursor: pointer;
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
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__form-field {
    align-items: center;
    display: flex;
    margin: 1.5rem 0;
  }

  &__form-label {
    min-width: 6em;
  }

  &__form-label--target {
    margin-right: 1em;
    min-width: 3em;
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
