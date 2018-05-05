import 'babel-polyfill'

import Vue from 'vue'
import swal from 'vue-sweetalert2'
import Ripple from 'vue-ripple-directive'
import { sync } from 'vuex-router-sync'
import VueAnalytics from 'vue-analytics'

import App from './App.vue'
import store from './store'
import router from './router'
import filter from './filter'

filter(Vue)
sync(store, router)

Vue.use(swal)
Ripple.zIndex = 55
Vue.directive('ripple', Ripple)

Vue.use(VueAnalytics, {
  router,
  id: process.env.GOOGLE_ANALYTICS_TRACKING_ID
})

const $vm = new Vue({
  store,
  router,
  render: h => h(App)
})

$vm.$mount('#app')
