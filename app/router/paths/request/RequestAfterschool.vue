<script>
import DimiCard from '../../../components/DimiCard.vue'
import DimiDropdown from '../../../components/DimiDropdown.vue'
import ContentWrapper from '../../partial/ContentWrapper.vue'

export default {
  name: 'RequestAfterschool',
  components: { DimiCard, DimiDropdown, ContentWrapper }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-ball"/>2018년 상반기 방과 후 활동 신청
    </h1>
    <dimi-card slot="main">
      <dimi-dropdown :items="['테스트', '이것도 테스트', '물론 이것도 테스트임']"/>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>

</style>
