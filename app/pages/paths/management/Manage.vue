<script>
import DefaultNavbar from '@/components/DefaultNavbar.vue'
import ServiceWrapper from '@/components/ServiceWrapper.vue'

export default {
  name: 'Wrapper',
  components: { DefaultNavbar, ServiceWrapper }
}
</script>

<template>
  <service-wrapper>
    <default-navbar slot="navbar" />
    <dimi-menu slot="menu">
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
  </service-wrapper>
</template>
