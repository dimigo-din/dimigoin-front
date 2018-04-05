<script>
import AssignmentBase from '../../../components/AssignmentBase.vue'
import DimiBadge from '../../../components/DimiBadge.vue'

import fileDialog from 'file-dialog'
import { assignment } from '../../../src/api'

const assignee = assignment.assignee

export default {
  name: 'Assignment',
  components: { AssignmentBase, DimiBadge },

  data: () => ({
    percentage: 0,
    uploading: false,
    assignments: require('./dummy').default
  }),

  methods: {
    async uploadFile (idx) {
      this.uploading = true
      await assignee.submitAssignment(idx, await fileDialog(), () =>
        (this.percentage = Math.floor((event.loaded * 100) / event.total)))
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
        @click="uploadFile(ass.idx)">
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
