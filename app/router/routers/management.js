import Manage from '@/router/paths/management/Manage.vue'
import ManageCircle from '@/router/paths/management/ManageCircle.vue'
import ManageDets from '@/router/paths/management/ManageDets.vue'

export default [
  {
    path: '/management',
    name: 'management',
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
      },
      {
        path: 'dets',
        name: 'management/dets',
        component: ManageDets,
        meta: {
          title: '디미고인 > Dets 관리'
        }
      }
    ]
  }
]
