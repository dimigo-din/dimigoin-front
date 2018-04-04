<script>
import AssignmentBase from '../../../components/AssignmentBase.vue'
import DimiBadge from '../../../components/DimiBadge.vue'

export default {
  name: 'Assignment',
  components: { AssignmentBase, DimiBadge },

  data: () => ({
    assignments: require('./dummy').default
  })
}
</script>

<template>
  <assignment-base :assignments="assignments">
    <template slot-scope="{ ass }">
      <span
        class="assignee__upload"
        @click="$swal(ass.title, ass.description)">
        <span class="icon-upload"/> 제출
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
