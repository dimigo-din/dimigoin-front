<script>
import DefaultNavbar from '@/router/partial/DefaultNavbar.vue'
import { sns } from '@/src/api'

export default {
  name: 'Wrapper',
  components: { DefaultNavbar },
  data () {
    return {
      subsc: []
    }
  },

  async created () {
    this.subsc = await sns.per.getMyPer()
  }
}
</script>

<template>
  <div>
    <default-navbar/>
    <div class="container">
      <div class="row">
        <div class="col-xs-24 col-md-5">
          <dimi-menu>
            <dimi-menu-item :to="{ path: '/sns' }">구독 페이지 전체</dimi-menu-item>
            <dimi-menu-item :to="{ path: '/sns/page' }">페이지 전체</dimi-menu-item>
            <dimi-menu-item
              v-for="(sub, index) in subsc"
              :key="index"
              :to="{ path: `/sns/page/${sub.page.idx}`}">
              {{ sub.page.title }}
            </dimi-menu-item>
          </dimi-menu>
        </div>
        <main class="main col-xs">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>
