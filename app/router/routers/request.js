const Wrapper = () => import(/* webpackPrefetch: true, webpackChunkName: "service-request" */ '@/pages/paths/request/Wrapper.vue')
const Information = () => import(/* webpackPrefetch: true, webpackChunkName: "service-request" */ '@/pages/paths/request/Information.vue')
const Circle = () => import(/* webpackPrefetch: true, webpackChunkName: "service-request" */ '@/pages/paths/request/Circle.vue')
const RequestAfterschool = () => import(/* webpackPrefetch: true, webpackChunkName: "service-request" */ '@/pages/paths/request/Afterschool.vue')
const Ingang = () => import(/* webpackPrefetch: true, webpackChunkName: "service-request" */ '@/pages/paths/request/Ingang.vue')
const Dets = () => import(/* webpackPrefetch: true, webpackChunkName: "service-request" */ '@/pages/paths/request/Dets.vue')
const Counsel = () => import(/* webpackPrefetch: true, webpackChunkName: "service-request" */ '@/pages/paths/request/Counsel.vue')
const Book = () => import(/* webpackPrefetch: true, webpackChunkName: "service-request" */ '@/pages/paths/request/Book.vue')

export default [{
  path: '/request',
  component: Wrapper,
  children: [
    {
      path: '',
      name: 'request',
      component: Information,
      meta: { title: '신청 > 나의 신청 현황' }
    },
    {
      path: 'circle',
      name: 'request/circle',
      component: Circle,
      meta: { title: '신청 > 동아리 가입 신청' }
    },
    {
      path: 'afterschool',
      name: 'request/afterschool',
      component: RequestAfterschool,
      meta: { title: '신청 > 방과 후 활동 신청' }
    },
    {
      path: 'counsel',
      name: 'request/counsel',
      component: Counsel,
      meta: { title: '신청 > 상담 신청' }
    },
    {
      path: 'ingang',
      name: 'request/ingang',
      component: Ingang,
      meta: { title: '신청 > 인강실 신청' }
    },
    {
      path: 'dets',
      name: 'request/dets',
      component: Dets,
      meta: { title: '신청 > Dets 신청' }
    },
    {
      path: 'book',
      name: 'request/book',
      component: Book,
      meta: { title: '신청 > 도서 신청' }
    }
  ]
}]
