import Manage from '@/router/paths/management/Manage.vue'
import ManageCircle from '@/router/paths/management/ManageCircle.vue'
import ManageDets from '@/router/paths/management/ManageDets.vue'
import ManageBook from '@/router/paths/management/manageBook.vue'

export default [
  {
    path: '/management',
    name: 'management',
    component: Manage,
    children: [
      {
        path: '',
        name: 'management',
        meta: {
          title: '디미고인 > 관리 페이지',
          perm: 2
        },
        redirect: { name: 'management/dets' }
      },
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
          title: '디미고인 > Dets 관리',
          perm: 2
        }
      },
      {
        path: 'book',
        name: 'management/book',
        component: ManageBook,
        meta: {
          title: '디미고인 > 도서신청 관리',
          perm: 2
        }
      }
    ]
  }
]
