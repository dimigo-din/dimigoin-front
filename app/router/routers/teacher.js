import withPrefix from '@/src/util/path-with-prefix'

const TeacherMain = () => import(/* webpackChunkName: "teacher-main" */ '@/pages/paths/teacher/TeacherMain.vue')

const Wrapper = () => import(/* webpackChunkName: "teacher-request" */ '@/pages/paths/teacher/request/Wrapper.vue')
const Information = () => import(/* webpackChunkName: "teacher-request" */ '@/pages/paths/teacher/request/Information.vue')
const Afterschool = () => import(/* webpackChunkName: "teacher-request" */ '@/pages/paths/teacher/request/Afterschool.vue')
const Counsel = () => import(/* webpackChunkName: "teacher-request" */ '@/pages/paths/teacher/request/Counsel.vue')
const Ingang = () => import(/* webpackChunkName: "teacher-request" */ '@/pages/paths/teacher/request/Ingang.vue')
const Notice = () => import(/* webpackChunkName: "teacher-request" */ '@/pages/paths/teacher/request/Notice.vue')

const Assignment = () => import(/* webpackChunkName: "teacher-assignment" */ '@/pages/paths/teacher/assignment/Assignment.vue')

export default [
  {
    path: '/teacher',
    name: 'teacher',
    component: TeacherMain
  },
  ...withPrefix('/teacher', [
    {
      path: '/request',
      component: Wrapper,
      children: [
        {
          path: '',
          name: 'teacher/request',
          component: Information,
          meta: { title: '디미고인 > 교사 페이지' },
          redirect: { name: 'teacher/request/afterschool' }
        },
        {
          path: 'afterschool',
          name: 'teacher/request/afterschool',
          component: Afterschool,
          meta: { title: '디미고인 > 방과후신청 관리' }
        },
        {
          path: 'counsel',
          name: 'teacher/request/counsel',
          component: Counsel,
          meta: { title: '디미고인 > 상담 신청 관리' }
        },
        {
          path: 'ingang',
          name: 'teacher/request/ingang',
          component: Ingang,
          meta: { title: '디미고인 > 인강실 관리' }
        },
        {
          path: 'notice',
          name: 'teacher/request/notice',
          component: Notice,
          meta: { title: '디미고인 > 공지사항 관리' }
        }
      ]
    },
    {
      path: '/assignment',
      name: 'teacher/assignment',
      component: Assignment,
      meta: { title: '디미고인 > 과제 제출 관리' }
    }
  ])
]
