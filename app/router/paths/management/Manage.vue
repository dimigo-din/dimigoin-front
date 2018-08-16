<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import DefaultNavbar from '@/router/partial/DefaultNavbar.vue'

export default {
  name: 'Wrapper',

  components: { ContentWrapper, DefaultNavbar }
}
</script>

<template>
  <div>
    <default-navbar/>
    <div class="container">
      <div class="row">
        <div class="col-xs-24 col-md-5">
          <dimi-menu>
            <dimi-menu-item :to="{ name: 'management' }">관리 페이지</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'management/circle' }">동아리 신청 관리</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'management/dets' }">Dets 관리</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'management/ingang' }">인강실 사용 관리</dimi-menu-item>
          </dimi-menu>
        </div>
        <main class="main col-xs">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>
