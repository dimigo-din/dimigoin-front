<script>
import './scss/theme.scss'

import { mapState } from 'vuex'

import TheLogin from './components/TheLogin.vue'

export default {
  name: 'App',
  components: { TheLogin },
  computed: {
    ...mapState({
      isLoggedIn: state => state.account.auth.isLoggedIn
    })
  }
}
</script>

<template>
  <div id="app">
    <the-login v-if="!isLoggedIn"/>
    <router-view v-else/>
  </div>
</template>
