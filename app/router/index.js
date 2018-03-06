import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './Main.vue'

import Register from './paths/auth/register/Register.vue'
import RegisterStepOne from './paths/auth/register/RegisterStepOne.vue'
import RegisterStepTwo from './paths/auth/register/RegisterStepTwo.vue'
import RegisterStepThree from './paths/auth/register/RegisterStepThree.vue'
import RegisterSideOne from './paths/auth/register/RegisterSideOne.vue'
import RegisterSideTwo from './paths/auth/register/RegisterSideTwo.vue'
import RegisterSideThree from './paths/auth/register/RegisterSideThree.vue'

import Login from './paths/auth/Login.vue'

import Request from './paths/request/Request.vue'
import RequestInfo from './paths/request/RequestInfo.vue'
import RequestCircle from './paths/request/RequestCircle.vue'
import RequestAfterschool from './paths/request/RequestAfterschool.vue'

import NotFound from './NotFound.vue'

import { withPrefix } from '../src/util'
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
    ...withPrefix('/auth', [
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { title: '로그인' }
      },
      {
        path: '/register',
        component: Register,
        children: [
          {
            path: '',
            name: 'register',
            redirect: { name: 'register/step/1' }
          },
          {
            path: 'step/1',
            name: 'register/step/1',
            components: {
              side: RegisterSideOne,
              form: RegisterStepOne
            },
            meta: { title: '회원가입' }
          },
          {
            path: 'step/2',
            name: 'register/step/2',
            components: {
              side: RegisterSideTwo,
              form: RegisterStepTwo
            },
            meta: { title: '회원가입' }
          },
          {
            path: 'step/3',
            name: 'register/step/3',
            components: {
              side: RegisterSideThree,
              form: RegisterStepThree
            }
          }
        ]
      }
    ]),
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
          path: 'circle',
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
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { account: { auth: { isLoggedIn } }} = store.state

  if (to.meta.title) document.title = to.meta.title

  if (isLoggedIn || /login|register/.test(to.path)) {
    next()
    return
  }

  next({ name: 'login' })
})

export default router
