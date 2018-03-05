<script>
import './scss/theme.scss'
import 'dimigoincon'

import { mapState } from 'vuex'

import Login from './router/paths/auth/Login.vue'

export default {
  name: 'App',
  components: { Login },
  computed: {
    ...mapState({
      isLoggedIn: state => state.account.auth.isLoggedIn
    })
  },
  created () {
    if (!this.isLoggedIn && !/login|register/.test(this.$store.state.route.path)) {
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
