<script>
import AssignmentBase from '@/components/AssignmentBase.vue'
import DefaultNavbar from '@/components/DefaultNavbar.vue'
import fileDialog from 'file-dialog'
import { assignmentSubscriber } from '@/src/api/assignment'

export default {
  name: 'Assignment',
  components: { DefaultNavbar, AssignmentBase },

  data: () => ({
    percentages: [],
    uploads: [],
    assignments: [],
    filter: {
      deadline: false
    }
  }),

  computed: {
    filteredAssignments () {
      return this.assignments.filter(v => {
        return this.filter.deadline || v.endDate >= new Date()
      })
    }
  },

  async created () {
    this.assignments = await assignmentSubscriber.getAssignmentList()
  },

  methods: {
    async uploadFile (ass) {
      const files = await fileDialog()
      this.$set(this.uploads, ass.idx, true)
      try {
        if (ass.report) {
          await assignmentSubscriber.editAssignment(ass.idx, files[0], event =>
            this.$set(this.percentages, ass.idx, Math.floor((event.loaded * 100) / event.total)))
        } else {
          await assignmentSubscriber.submitAssignment(ass.idx, files[0], event =>
            this.$set(this.percentages, ass.idx, Math.floor((event.loaded * 100) / event.total)))
        }
        this.assignments = await assignmentSubscriber.getAssignmentList()
        await this.$swal('성공적으로 제출했습니다', '', 'success')
      } catch (err) {
        this.$swal('에러!', err.message, 'error')
      } finally {
        this.uploads.splice(ass.idx, 1)
        this.$set(this.percentages, ass.idx, 0)
      }
    }
  }
}
</script>

<template>
  <div>
    <default-navbar />
    <assignment-base
      class="container"
      :assignments="filteredAssignments"
    >
      <template slot-scope="{ ass }">
        <span
          class="assignee__upload"
          @click="uploadFile(ass)"
        >
          <span class="icon-upload" /> {{
            uploads[ass.idx] ? (percentages[ass.idx] || 0) + '%' :
            ass.report ? '수정' : '제출'
          }}
        </span>
      </template>

      <span slot="header">
        <span class="assignee__header">
          <span class="icon-submission" />과제 제출 관리

          <dimi-checkbox
            v-model="filter.deadline"
            class="assignee__filter"
          >
            지난 과제 보기
          </dimi-checkbox>
        </span>
      </span>

      <span
        slot="opponent"
        slot-scope="{ ass }"
      >
        {{ ass.assignor.name }}
      </span>

      <span
        slot="badge"
        slot-scope="{ ass }"
      >
        <dimi-badge
          :color="ass.report ? 'aloes' : 'orange'"
          class="assignee__badge"
        >
          <span :class="ass.report ? 'icon-ok' : 'icon-cross'" />
          {{ ass.report ? '제출' : '미제출' }}
        </dimi-badge>
      </span>
    </assignment-base>
  </div>
</template>

<style lang="scss">
  .assignee {
    &__header {
      position: relative;
      display: block;
    }

    &__filter {
      position: absolute;
      right: 0;
      bottom: 0;
      cursor: pointer;
      font-size: 16px;
    }

    &__upload {
      cursor: pointer;
    }

    &__badge {
      margin-right: 16px;
    }
  }
</style>
