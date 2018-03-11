import Manage from '../paths/manage/Manage.vue'
import ManageCircle from '../paths/manage/ManageCircle.vue'
import ManageAfterschool from '../paths/manage/ManageAfterschool.vue'

export default [{
  path: '/manage',
  component: Manage,
  redirect: '/404', // TODO fix
  children: [
    {
      path: 'circle',
      name: 'manage/circle',
      component: ManageCircle,
      meta: { title: '디미고인 > 동아리 관리' }
    },
    {
      path: 'afterschool',
      name: 'manage/afterschool',
      component: ManageAfterschool,
      meta: { title: '디미고인 > 방과후신청 관리' }
    }
  ]
}]
