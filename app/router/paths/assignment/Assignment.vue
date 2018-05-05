<script>
import AssignmentBase from '@/components/AssignmentBase.vue'

import fileDialog from 'file-dialog'
import { assignment } from '@/src/api'
import dummy from './dummy'

const assignee = assignment.assignee

export default {
  name: 'Assignment',
  components: { AssignmentBase },

  data: () => ({
    percentage: 0,
    uploading: false,
    assignments: dummy
  }),

  methods: {
    async uploadFile (ass) {
      const files = await fileDialog()
      this.uploading = true
      try {
        await assignee.submitAssignment(ass.idx, files[0], () =>
          (this.percentage = Math.floor((event.loaded * 100) / event.total)))
      } catch (err) {
        this.$swal({
          type: 'error',
          title: '에러!',
          text: err.message
        })
      }
      this.uploading = false
    }
  }
}
</script>

<template>
  <assignment-base :assignments="assignments">
    <template slot-scope="{ ass }">
      <span
        class="assignee__upload"
        @click="uploadFile(ass)">
        <span class="icon-upload"/> {{ uploading ? percentage + '%' : '제출' }}
      </span>
    </template>

    <span slot="header">
      <span class="icon-submission"/> 과제 제출
    </span>

    <span
      slot="opponent"
      slot-scope="{ ass }"
    >{{ ass.assignor.name }}</span>

    <span
      slot="badge"
      slot-scope="{ ass }"
    >
      <dimi-badge
        :color="ass.reports ? 'aloes' : 'orange'"
        class="assignee__badge"
      >
        <span :class="ass.reports ? 'icon-ok' : 'icon-cross'"/>
        {{ ass.reports ? '제출' : '미제출' }}
      </dimi-badge>
    </span>
  </assignment-base>
</template>

<style lang="scss">
  .assignee {
    &__upload {
      cursor: pointer;
    }

    &__badge {
      margin-right: 16px;
    }
  }
</style>
