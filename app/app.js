import '@babel/polyfill'
import 'typeface-nanum-square-round'
import 'dimigoincon'

import Vue from 'vue'
import DimiRu from './dimiru'
import swal from 'vue-sweetalert2'
import Ripple from 'vue-ripple-directive'
import { sync } from 'vuex-router-sync'
import VueAnalytics from 'vue-analytics'
import NProgress from 'nprogress'

import App from './App.vue'
import store from './store'
import router from './router'

import * as Sentry from '@sentry/browser'

NProgress.configure({ showSpinner: false })
NProgress.start()

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    router,
    id: process.env.GOOGLE_ANALYTICS_TRACKING_ID
  })

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Sentry.Integrations.Vue({ Vue })],
    release: process.env.SENTRY_PROPOSED_VERSION
  })
}

sync(store, router)

Vue.use(DimiRu)
Vue.use(swal)

Ripple.zIndex = 55
Vue.directive('ripple', Ripple)

// pretty print meal information
Vue.filter('prettyMeal', val => {
  const str = (val || '').replace(/ ?\/ ?/g, ' | ')
  return !str ? '급식 정보가 없습니다.' : str
})

const $vm = new Vue({
  store,
  router,
  render: h => h(App)
})

$vm.$mount('#app')

NProgress.done()
