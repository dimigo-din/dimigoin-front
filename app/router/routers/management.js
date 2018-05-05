import Manage from '@/router/paths/management/Manage.vue'
import ManageCircle from '@/router/paths/management/ManageCircle.vue'

export default [
  {
    path: '/management',
    name: 'management',
    redirect: { name: 'management/circle' },
    component: Manage,
    children: [
      {
        path: 'circle',
        name: 'management/circle',
        component: ManageCircle,
        meta: {
          title: '디미고인 > 동아리 신청자 관리',
          perm: 2
        }
      }
    ]
  }
]
