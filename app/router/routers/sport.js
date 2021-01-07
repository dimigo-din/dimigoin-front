const Sport = () => import(/* webpackChunkName: "service-assignment" */ '@/pages/paths/sport/Sport.vue')

export default [
  {
    path: '/sport',
    name: 'sport',
    component: Sport
  }
]
