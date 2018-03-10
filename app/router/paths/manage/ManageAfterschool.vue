<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import DefaultNavbar from '../../partial/DefaultNavbar.vue'
import DimiCard from '../../../components/DimiCard.vue'

export default {
  name: 'ManageCircle',

  components: { ContentWrapper, DefaultNavbar, DimiCard }
}
</script>

<template>
  <content-wrapper class="mng-afterschool">
    <h1 slot="header"><span class="icon-club"/>2018년 상반기 방과후 활동 관리</h1>
    <dimi-card slot="main"/>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.mng-afterschool {

}
</style>
