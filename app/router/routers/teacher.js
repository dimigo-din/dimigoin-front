import Wrapper from '@/router/paths/teacher/request/Wrapper.vue'
import TeacherMain from '@/router/paths/teacher/TeacherMain.vue'

import Information from '@/router/paths/teacher/request/Information.vue'
import Afterschool from '@/router/paths/teacher/request/Afterschool.vue'
import Ingang from '@/router/paths/teacher/request/Ingang.vue'

import Assignment from '@/router/paths/teacher/assignment/Assignment.vue'

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
          meta: { title: '디미고인 > 신청 현황' },
          redirect: { name: 'teacher/request/afterschool' }
        },
        {
          path: 'afterschool',
          name: 'teacher/request/afterschool',
          component: Afterschool,
          meta: { title: '디미고인 > 방과후신청 관리' }
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
