import Wrapper from '@/pages/paths/teacher/request/Wrapper.vue'
import TeacherMain from '@/pages/paths/teacher/TeacherMain.vue'

import Information from '@/pages/paths/teacher/request/Information.vue'
import Afterschool from '@/pages/paths/teacher/request/Afterschool.vue'
import Counsel from '@/pages/paths/teacher/request/Counsel.vue'
import Ingang from '@/pages/paths/teacher/request/Ingang.vue'

import Assignment from '@/pages/paths/teacher/assignment/Assignment.vue'

import { withPrefix } from '@/src/util'

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
