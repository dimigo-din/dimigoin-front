import Request from '../paths/request/Request.vue'
import RequestInfo from '../paths/request/RequestInfo.vue'
import RequestCircle from '../paths/request/RequestCircle.vue'
import RequestAfterschool from '../paths/request/RequestAfterschool.vue'
import RequestIngang from '../paths/request/RequestIngang.vue'

export default [{
  path: '/request',
  component: Request,
  children: [
    {
      path: '',
      name: 'request',
      component: RequestInfo,
      meta: { title: '신청 > 나의 신청 현황' }
    },
    {
      path: 'circle',
      name: 'request/circle',
      component: RequestCircle,
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
      meta: { title: '신청 > 상담 신청', draft: true }
    },
    {
      path: 'ingang',
      name: 'request/ingang',
      component: RequestIngang,
      meta: { title: '신청 > 인강실 신청' }
    }
  ]
}]
