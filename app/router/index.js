import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './Main.vue'
import Draft from './Draft.vue'
import NotFound from './NotFound.vue'

import * as routers from './routers'

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
      path: '/draft',
      name: 'draft',
      component: Draft,
      meta: { title: '준비 중입니다!' }
    },
    {
      path: '*',
      component: NotFound
    },
    ...routers.auth,
    ...routers.request,
    ...routers.manage
  ]
})

const isLoggedIn = () => store.state.account.auth.isLoggedIn
const needVerify = () => store.state.account.auth.needVerify

router.beforeEach((to, from, next) => {
  if (!/login|register/.test(to.path)) {
    if (!isLoggedIn()) return next({ name: 'login' })
    if (needVerify()) return next({ name: 'register/step/3' })
  }

  if (to.meta.draft) return next({ name: 'draft' })
  if (to.meta.title) document.title = to.meta.title
  next()
})

export default router
