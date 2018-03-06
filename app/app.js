import 'babel-polyfill'
import Vue from 'vue'

import { sync } from 'vuex-router-sync'
import Ripple from 'vue-ripple-directive'
import swal from 'vue-sweetalert2'

import App from './App.vue'
import store from './store'
import router from './router'

sync(store, router)

Vue.directive('ripple', Ripple)
Vue.use(swal)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
