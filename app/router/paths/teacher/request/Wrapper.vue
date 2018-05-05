<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import DefaultNavbar from '@/router/partial/DefaultNavbar.vue'

import permission from '@/mixins/permission'

export default {
  name: 'Wrapper',
  components: { ContentWrapper, DefaultNavbar },
  mixins: [permission('T')]
}
</script>

<template>
  <div class="mng">
    <not-found v-if="rejected"/>
    <template v-else>
      <default-navbar/>
      <div class="container">
        <div class="row">
          <div class="col-xs-24 col-md-5">
            <dimi-menu>
              <dimi-menu-item :to="{ name: 'teacher/request' }">신청 현황</dimi-menu-item>
              <dimi-menu-item :to="{ name: 'teacher/request/afterschool' }">방과 후 활동 관리</dimi-menu-item>
              <dimi-menu-item :to="{ name: 'draft' }">상담 관리</dimi-menu-item>
              <dimi-menu-item :to="{ name: 'teacher/request/ingang' }">인강실 사용 관리</dimi-menu-item>
            </dimi-menu>
          </div>
          <main class="main col-xs">
            <router-view/>
          </main>
        </div>
      </div>
    </template>
  </div>
</template>
