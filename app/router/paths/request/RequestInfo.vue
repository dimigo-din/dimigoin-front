<script>
import DimiCard from '../../../components/DimiCard.vue'
import ContentWrapper from '../../partial/ContentWrapper.vue'

export default {
  name: 'RequestInfo',
  components: { DimiCard, ContentWrapper }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-list"/>나의 신청 현황
    </h1>
    <dimi-card slot="main">

    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>

</style>
