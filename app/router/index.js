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
    ...routers.request,
    ...routers.manage
  ]
})

const authRequired = path =>
  !store.state.account.auth.isLoggedIn && !/login|register/.test(path)

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
  if (authRequired(to.path)) return void next({ name: 'login' })
  if (to.meta.draft) return void next({ name: 'request/draft' })

  next()
})

export default router
