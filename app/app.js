import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Ripple from 'vue-ripple-directive'

import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.directive('ripple', Ripple)

/* eslint-disable no-new */
new Vue({
  store: new Vuex.Store(store),
  router: new VueRouter(router),
  el: '#app',
  render: h => h(App)
})
