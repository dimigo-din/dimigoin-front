import Manage from '../paths/teacher/Teacher.vue'
import ManageAfterschool from '../paths/teacher/TeacherAfterschool.vue'

export default [
  {
    path: '/teacher',
    name: 'teacher',
    component: Manage,
    redirect: { name: 'teacher/afterschool' },
    children: [
      {
        path: 'afterschool',
        name: 'teacher/afterschool',
        component: ManageAfterschool,
        meta: { title: '디미고인 > 방과후신청 관리' }
      }
    ]
  }
]
