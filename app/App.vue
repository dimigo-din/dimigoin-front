<script>
import './scss/theme.scss'
import AwesomeFooter from './components/AwesomeFooter.vue'
import { mapActions, mapGetters } from '@/store/modules/account/helpers'

import('dimigoincon' /* webpackChunkName: "fonts" */)
import('typeface-nanum-square-round' /* webpackChunkName: "fonts" */)

export default {
  name: 'App',
  components: { AwesomeFooter },
  computed: {
    ...mapGetters(['isLoggedIn', 'needVerify'])
  },
  watch: {
    isLoggedIn (val) {
      if (!val) {
        this.$router.push({ name: 'login' })
      }
    }
  },

  async created () {
    try {
      await this.autoLogin()
      if (this.needVerify) this.$router.push({ name: 'register' })
    } catch (err) {
      console.error(err)
    }
  },

  methods: {
    ...mapActions(['autoLogin'])
  }
}
</script>

<template>
  <div
    id="app"
    class="root"
  >
    <main class="root__router">
      <router-view />
    </main>
    <awesome-footer class="root__footer" />
  </div>
</template>

<style lang="scss">
.root {
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  &__router {
    flex: 1 0 auto;
    padding-bottom: 32px;
  }
}
</style>
