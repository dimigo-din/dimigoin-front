import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import * as routers from './routers'
import store from '@/store'

import Main from '@/pages/Main.vue'
const NotFound = () => import(/* webpackPrefetch: true, webpackChunkName: "not-found" */ '@/pages/NotFound.vue')
const Meal = () => import(/* webpackPrefetch: true, webpackChunkName: "service-meal" */ '@/pages/paths/meal/Meal.vue')
const Draft = () => import(/* webpackChunkName: "draft" */ '@/pages/Draft.vue')
const ExplorerFound = () => import(/* webpackChunkName: "explorer-found" */ '@/pages/ExplorerFound.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
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

    ...routers.auth,
    ...routers.request,
    ...routers.management,
    ...routers.teacher,
    ...routers.assignment,

    {
      path: '*',
      component: NotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

const isLoggedIn = () => store.getters['account/isLoggedIn']
const needVerify = () => store.getters['account/needVerify']
const isIE = () => /MSIE |Trident\//.test(window.navigator.userAgent)

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (isIE()) {
    if (to.name === 'ienope') return next()
    else return next({ name: 'ienope' })
  }

  if (!/login|register/.test(to.path)) {
    if (!isLoggedIn()) return next({ name: 'login' })
    if (needVerify()) return next({ name: 'register' })
  }

  if (to.meta.draft) return next({ name: 'draft' })
  if (to.meta.title) document.title = to.meta.title
  next()
})

router.afterEach((to, from, next) => {
  NProgress.done()
})

export default router
