import Manage from '../paths/manage/Manage.vue'
import ManageAfterschool from '../paths/manage/ManageAfterschool.vue'

export default [{
  path: '/manage',
  component: Manage,
  redirect: '/404', // TODO fix
  children: [
    {
      path: 'afterschool',
      name: 'manage/afterschool',
      component: ManageAfterschool,
      meta: { title: '디미고인 > 방과후신청 관리' }
    }
  ]
}]
