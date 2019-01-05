<script>
import DefaultNavbar from '@/components/DefaultNavbar.vue'

export default {
  name: 'Wrapper',

  components: { DefaultNavbar }
}
</script>

<template>
  <div>
    <default-navbar />
    <div class="container">
      <div class="row">
        <div class="col-xs-24 col-md-5">
          <dimi-menu>
            <dimi-menu-item :to="{ name: 'management' }">
              관리 페이지
            </dimi-menu-item>
            <dimi-menu-item :to="{ name: 'management/circle' }">
              동아리 신청 관리
            </dimi-menu-item>
            <dimi-menu-item :to="{ name: 'management/dets' }">
              Dets 관리
            </dimi-menu-item>
            <dimi-menu-item :to="{ name: 'management/book' }">
              도서 신청 관리
            </dimi-menu-item>
            <dimi-menu-item :to="{ name: 'management/freshman' }">
              신입생 공지 관리
            </dimi-menu-item>
          </dimi-menu>
        </div>
        <main class="main col-xs">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
