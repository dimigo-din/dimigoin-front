<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import ClubApplicantRow from '../../../components/ClubApplicantRow.vue'

import * as circle from '../../../src/api/circle'

export default {
  name: 'RequestCircle',

  components: { ContentWrapper, ClubApplicantRow },

  data () {
    return {
      pending: false,
      circles: []
    }
  },

  async created () {
    this.pending = true
    this.circles = await circle.getCircles()
    this.pending = false
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-club"/>2018년 동아리 가입 신청
    </h1>
    <div
      class="circle"
      slot="main">
      <section class="circle__section">
        <h2 class="circle__title">신청한 동아리</h2>
      </section>
      <section class="circle__section">
        <h2 class="circle__title">전체 동아리</h2>
      </section>
    </div>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.circle {
  &__section {

  }

  &__title {

  }
}
</style>
