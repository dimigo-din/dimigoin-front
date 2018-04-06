import Wrapper from '../paths/teacher/request/Wrapper.vue'
import TeacherMain from '../paths/teacher/TeacherMain.vue'

import Information from '../paths/teacher/request/Information.vue'
import Afterschool from '../paths/teacher/request/Afterschool.vue'

import Assignment from '../paths/teacher/assignment/Assignment.vue'

import { withPrefix } from '../../src/util'

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
