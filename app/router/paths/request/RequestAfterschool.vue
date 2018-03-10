<script>
import DimiCard from '../../../components/DimiCard.vue'
import DimiDropdown from '../../../components/DimiDropdown.vue'
import DimiCheckbox from '../../../components/DimiCheckbox.vue'
import ContentWrapper from '../../partial/ContentWrapper.vue'

export default {
  name: 'RequestAfterschool',
  components: { DimiCard, DimiDropdown, DimiCheckbox, ContentWrapper },
  methods: { onChecked (val) { console.log('checked:', val) } }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-ball"/>2018년 상반기 방과 후 활동 신청
    </h1>
    <dimi-card class="components" slot="main">
      <dimi-dropdown :items="['테스트', '이것도 테스트', '물론 이것도 테스트임']"/>
      <dimi-checkbox @checked="onChecked">안녕</dimi-checkbox>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.components {
  min-height: 30vh;
}
</style>
