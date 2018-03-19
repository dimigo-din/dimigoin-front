import 'babel-polyfill'

import Vue from 'vue'
import swal from 'vue-sweetalert2'
import Ripple from 'vue-ripple-directive'
import { sync } from 'vuex-router-sync'

import App from './App.vue'
import store from './store'
import router from './router'

sync(store, router)

Vue.use(swal)
Ripple.zIndex = 55
Vue.directive('ripple', Ripple)

console.debug(new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
}))
