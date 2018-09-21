<script>
import DefaultNavbar from '@/components/DefaultNavbar.vue'

export default {
  name: 'Wrapper',
  components: { DefaultNavbar }
}
</script>

<template>
  <div>
    <default-navbar/>
    <div class="container">
      <div class="row">
        <div class="col-xs-24 col-md-5">
          <dimi-menu>
            <dimi-menu-item :to="{ name: 'request' }">나의 신청 현황</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'request/circle' }">동아리 가입 신청</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'request/afterschool' }">방과 후 활동 신청</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'request/counsel' }">상담 신청</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'request/ingang' }">인강실 사용 신청</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'request/dets' }">Dets 신청</dimi-menu-item>
            <dimi-menu-item :to="{ name: 'request/book' }">도서 신청</dimi-menu-item>
          </dimi-menu>
        </div>
        <main class="main col-xs">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>
