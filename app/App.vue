<script>
import './scss/theme.scss'
import AwesomeFooter from './components/AwesomeFooter.vue'
import { mapActions, mapGetters } from '@/store/modules/account/helpers'
import Snowf from 'vue-snowf'

export default {
  name: 'App',
  components: {
    AwesomeFooter,
    Snowf
  },
  data: () => ({
    loaded: false
  }),
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
      this.loaded = true
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
    data-test="app-root"
  >
    <Snowf
      class="root__snowf"
      :amount="70"
      :size="9"
      :speed="2.2"
      :opacity="0.7"
      :resize="true"
    />
    <main class="root__router">
      <router-view v-if="loaded" />
    </main>
    <awesome-footer class="root__footer" />
  </div>
</template>

<style lang="scss">
.root {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  
  &__snowf {
    z-index: -1;
  }

  &__router {
    flex: 1 0 auto;
    padding-bottom: 32px;
  }
}
</style>
