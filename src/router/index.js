import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  }, {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/QA')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/My')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/Search')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
