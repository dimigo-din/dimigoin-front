import withPrefix from '@/src/util/path-with-prefix'

const ManageWrapper = () => import('@/pages/paths/management/ManageWrapper.vue')
const ManageMain = () => import('@/pages/paths/management/ManageMain.vue')
const ManageRequest = () => import('@/pages/paths/management/ManageRequest.vue')
const ManageAssignment = () => import('@/pages/paths/management/ManageAssignment.vue')
const ManageAfterschool = () => import('@/pages/paths/management/ManageAfterschool.vue')
const ManageCounsel = () => import('@/pages/paths/management/ManageCounsel.vue')
const ManageIngang = () => import('@/pages/paths/management/ManageIngang.vue')
const ManageMentoring = () => import('@/pages/paths/management/ManageMentoring.vue')
const ManageAnnouncement = () => import('@/pages/paths/management/ManageAnnouncement.vue')
const ManageCircle = () => import('@/pages/paths/management/ManageCircle.vue')
const ManageDets = () => import('@/pages/paths/management/ManageDets.vue')
const ManageBook = () => import('@/pages/paths/management/ManageBook.vue')
const ManageFreshman = () => import('@/pages/paths/management/ManageFreshman.vue')
const ManageEtc = () => import('@/pages/paths/management/ManageEtc.vue')

export default [
  {
    path: '/management',
    name: 'management',
    component: ManageMain,
    meta: {
      title: '디미고인 > 관리 페이지'
    }
  },
  ...withPrefix('/management', [
    {
      path: '/',
      component: ManageWrapper,
      children: [
        {
          path: 'request',
          name: 'management/request',
          component: ManageRequest,
          meta: {
            title: '디미고인 > 신청 현황'
          }
        },
        {
          path: 'assignment',
          name: 'management/assignment',
          component: ManageAssignment,
          meta: {
            title: '디미고인 > 과제 관리'
          }
        },
        {
          path: 'afterschool',
          name: 'management/afterschool',
          component: ManageAfterschool,
          meta: {
            title: '디미고인 > 방과후신청 관리'
          }
        },
        {
          path: 'counsel',
          name: 'management/counsel',
          component: ManageCounsel,
          meta: {
            title: '디미고인 > 상담 신청 관리'
          }
        },
        {
          path: 'mentoring',
          name: 'management/mentoring',
          component: ManageMentoring,
          meta: {
            title: '디미고인 > 멘토링 신청 관리'
          }
        },
        {
          path: 'ingang',
          name: 'management/ingang',
          component: ManageIngang,
          meta: {
            title: '디미고인 > 인강실 관리'
          }
        },
        {
          path: 'announcement',
          name: 'management/announcement',
          component: ManageAnnouncement,
          meta: {
            title: '디미고인 > 공지사항 관리'
          }
        },
        {
          path: 'circle',
          name: 'management/circle',
          component: ManageCircle,
          meta: {
            title: '디미고인 > 동아리 신청자 관리'
          }
        },
        {
          path: 'dets',
          name: 'management/dets',
          component: ManageDets,
          meta: {
            title: '디미고인 > Dets 관리'
          }
        },
        {
          path: 'book',
          name: 'management/book',
          component: ManageBook,
          meta: {
            title: '디미고인 > 도서신청 관리'
          }
        },
        {
          path: 'freshman',
          name: 'management/freshman',
          component: ManageFreshman,
          meta: {
            title: '디미고인 > 신입생 공지 관리'
          }
        },
        {
          path: 'etc',
          name: 'management/etc',
          component: ManageEtc,
          meta: {
            title: '디미고인 > 기타 신청 관리'
          }
        }
      ]
    }
  ])
]
