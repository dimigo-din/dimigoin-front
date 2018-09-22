import { withPrefix } from '@/src/util'

const Manage = () => import(/* webpackChunkName: "service-management" */ '@/pages/paths/management/Manage.vue')
const ManageCircle = () => import(/* webpackChunkName: "service-management" */ '@/pages/paths/management/ManageCircle.vue')
const ManageDets = () => import(/* webpackChunkName: "service-management" */ '@/pages/paths/management/ManageDets.vue')
const ManageBook = () => import(/* webpackChunkName: "service-management" */ '@/pages/paths/management/manageBook.vue')

export default [
  ...withPrefix('/management', [
    {
      path: '/',
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
  ])
]
