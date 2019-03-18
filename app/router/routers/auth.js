import withPrefix from '@/src/util/path-with-prefix'
import Login from '@/pages/paths/auth/Login.vue'

const Register = () => import(/* webpackChunkName: "register" */ '@/pages/paths/auth/register/Register.vue')

export default withPrefix('/auth', [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '로그인' }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { title: '회원가입' }
  }
])
