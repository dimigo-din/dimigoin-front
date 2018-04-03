<script>
import ContentWrapper from '../../../partial/ContentWrapper.vue'
import DefaultNavbar from '../../../partial/DefaultNavbar.vue'
import DimiMenu from '../../../../components/DimiMenu.vue'
import DimiMenuItem from '../../../../components/DimiMenuItem.vue'

export default {
  name: 'Teacher',

  components: { ContentWrapper, DefaultNavbar, DimiMenu, DimiMenuItem },

  created () {
    // TODO check permission
  }
}
</script>

<template>
  <div class="mng">
    <default-navbar/>
    <div class="container">
      <div class="row">
        <div class="col-xs-24 col-md-5">
          <dimi-menu>
            <dimi-menu-item :to="{ name: 'teacher/request' }">신청 현황</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'draft' }">동아리 가입 관리</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'teacher/request/afterschool' }">방과 후 활동 관리</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'draft' }">상담 관리</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'draft' }">인강실 사용 관리</dimi-menu-item>
          </dimi-menu>
        </div>
        <main class="main col-xs">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
