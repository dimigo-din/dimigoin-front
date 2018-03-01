import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './Main.vue'
import Login from './Login.vue'

import Request from './request/Request.vue'
import RequestInfo from './request/RequestInfo.vue'
import RequestCircle from './request/RequestCircle.vue'
import RequestAfterschool from './request/RequestAfterschool.vue'

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
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: '디미고인 로그인' }
    },
    {
      path: '/request',
      component: Request,
      children: [
        {
          path: '',
          name: 'request',
          component: RequestInfo,
          meta: { title: '신청 > 나의 신청 현황' }
        },
        {
          path: 'nosh',
          name: 'request/nosh',
          meta: { title: '신청 > 간식 신청' }
        },
        {
          path: 'club',
          name: 'request/circle',
          component: RequestCircle,
          meta: { title: '신청 > 동아리 가입 신청' }
        },
        {
          path: 'afterschool',
          name: 'request/afterschool',
          component: RequestAfterschool,
          meta: { title: '신청 > 방과 후 활동 신청' }
        },
        {
          path: 'counsel',
          name: 'request/counsel',
          meta: { title: '신청 > 상담 신청' }
        },
        {
          path: 'internet',
          name: 'request/internet',
          meta: { title: '신청 > 인강실 신청' }
        },
        {
          path: 'stay',
          name: 'request/stay',
          meta: { title: '신청 > 잔류 신청' }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
