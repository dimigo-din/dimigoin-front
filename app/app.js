import 'babel-polyfill'
import Vue from 'vue'
import Ripple from 'vue-ripple-directive'

import App from './App.vue'

Vue.directive('ripple', Ripple)

new Vue({
    el: '#app',
    render: h => h(App)
})
