import Wrapper from '../paths/request/Wrapper.vue'
import Information from '../paths/request/Information.vue'
import Circle from '../paths/request/Circle.vue'
import RequestAfterschool from '../paths/request/Afterschool.vue'
import Ingang from '../paths/request/Ingang.vue'

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
      meta: { title: '신청 > 상담 신청', draft: true }
    },
    {
      path: 'ingang',
      name: 'request/ingang',
      component: Ingang,
      meta: { title: '신청 > 인강실 신청' }
    }
  ]
}]
