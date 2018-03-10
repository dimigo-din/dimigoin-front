import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './Main.vue'

import * as routers from './routers'

import NotFound from './NotFound.vue'

import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: { title: 'DIMIGOIN' }
    },
    {
      path: '*',
      component: NotFound
    },
    ...routers.auth,
    ...routers.request
  ]
})

const isLoggedIn = () => store.state.account.auth.isLoggedIn
const needVerify = () => store.state.account.auth.needVerify

router.beforeEach((to, from, next) => {
  if (!/login|register/.test(to.path)) {
    if (!isLoggedIn()) return next({ name: 'login' })
    if (needVerify()) return next({ name: 'register/step/3' })
  }

  if (to.meta.draft) return next({ name: 'request/draft' })
  if (to.meta.title) document.title = to.meta.title
  next()
})

export default router
