import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    component: () => import('../views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('../views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('../views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('../views/article'),
    //开启路由传参可以在使用的组件中的propo参数中得到
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
