import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './Main.vue'
import Meal from './meal/Meal.vue'
import Draft from './Draft.vue'
import NotFound from './NotFound.vue'
import ExplorerFound from './ExplorerFound.vue'

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
      path: '/meal',
      name: 'meal',
      component: Meal,
      meta: { title: '디미밥' }
    },
    {
      path: '/ienope',
      name: 'ienope',
      component: ExplorerFound,
      meta: { title: 'DIMIGOIN' }
    },
    {
      path: '*',
      component: NotFound
    },
    ...routers.auth,
    ...routers.request,
    ...routers.management,
    ...routers.teacher
  ]
})

const isLoggedIn = () => store.state.account.auth.isLoggedIn
const needVerify = () => store.state.account.auth.needVerify
const isIE = () => /MSIE |Trident\//.test(window.navigator.userAgent)

router.beforeEach((to, from, next) => {
  if (isIE()) {
    if (to.name === 'ienope') return next()
    else return next({ name: 'ienope' })
  }

  if (!/login|register/.test(to.path)) {
    if (!isLoggedIn()) return next({ name: 'login' })
    if (needVerify()) return next({ name: 'register/step/3' })
  }

  if (to.meta.draft) return next({ name: 'draft' })
  if (to.meta.title) document.title = to.meta.title
  next()
})

export default router
