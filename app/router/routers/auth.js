import { withPrefix } from '@/src/util'

const Register = () => import(/* webpackChunkName: "register" */ '@/pages/paths/auth/register/Register.vue')
const RegisterStepOne = () => import(/* webpackChunkName: "register" */ '@/pages/paths/auth/register/RegisterStepOne.vue')
const RegisterStepTwo = () => import(/* webpackChunkName: "register" */ '@/pages/paths/auth/register/RegisterStepTwo.vue')
const RegisterStepThree = () => import(/* webpackChunkName: "register" */ '@/pages/paths/auth/register/RegisterStepThree.vue')
const RegisterSideOne = () => import(/* webpackChunkName: "register" */ '@/pages/paths/auth/register/RegisterSideOne.vue')
const RegisterSideTwo = () => import(/* webpackChunkName: "register" */ '@/pages/paths/auth/register/RegisterSideTwo.vue')
const RegisterSideThree = () => import(/* webpackChunkName: "register" */ '@/pages/paths/auth/register/RegisterSideThree.vue')

const Login = () => import(/* webpackChunkName: "login" */ '@/pages/paths/auth/Login.vue')

export default withPrefix('/auth', [
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
])
