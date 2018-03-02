<script>
import './scss/theme.scss'
import 'dimigoincon'

import { mapState } from 'vuex'

import Login from './router/Login.vue'

export default {
  name: 'App',
  components: { Login },
  computed: {
    ...mapState({
      isLoggedIn: state => state.account.auth.isLoggedIn
    })
  },
  created () {
    if (!this.isLoggedIn && this.$router.path !== '/login') {
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>

<template>
  <div
    id="app"
    class="root"
  >
    <router-view/>
  </div>
</template>
