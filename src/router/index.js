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

    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/Article'),
    props: true // 开启 Props 传参，说白了就是把路由参数映射到组件的 props 数据中
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user')
  },
  {
    name: 'user-profile',
    path: '/user/profile',
    component: () => import('@/views/user-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
