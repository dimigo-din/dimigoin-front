<script>
import DefaultNavbar from '@/components/DefaultNavbar.vue'
import ServiceWrapper from '@/components/ServiceWrapper.vue'

import permission from '@/mixins/permission'

export default {
  name: 'Wrapper',
  components: { DefaultNavbar, ServiceWrapper },
  mixins: [permission('T')]
}
</script>

<template>
  <div>
    <not-found v-if="rejected" />
    <template v-else>
      <service-wrapper>
        <default-navbar slot="navbar" />
        <dimi-menu slot="menu">
          <dimi-menu-item :to="{ name: 'teacher/request' }">
            교사 페이지
          </dimi-menu-item>
          <dimi-menu-item :to="{ name: 'teacher/request/afterschool' }">
            방과 후 활동 관리
          </dimi-menu-item>
          <dimi-menu-item :to="{ name: 'teacher/request/counsel' }">
            상담 관리
          </dimi-menu-item>
          <dimi-menu-item :to="{ name: 'teacher/request/ingang' }">
            인강실 관리
          </dimi-menu-item>
          <dimi-menu-item :to="{ name: 'teacher/request/notice' }">
            공지사항 관리
          </dimi-menu-item>
        </dimi-menu>
      </service-wrapper>
    </template>
  </div>
</template>
