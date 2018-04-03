import Wrapper from '../paths/teacher/request/Wrapper.vue'
import Afterschool from '../paths/teacher/request/Afterschool.vue'
import Assignment from '../paths/teacher/assignment/Assignment.vue'

import { withPrefix } from '../../src/util'

export default [
  ...withPrefix('/teacher', [
    {
      path: '/request',
      component: Wrapper,
      redirect: { name: 'teacher/request/afterschool' },
      children: [
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
