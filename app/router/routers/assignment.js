const Assignment = () => import(/* webpackChunkName: "service-assignment" */ '@/pages/paths/assignment/Assignment.vue')

export default [
  {
    path: '/assignment',
    name: 'assignment',
    component: Assignment
  }
]
