import Vue from 'vue'
import VueRouter from 'vue-router'// 引入router

import Login from '@/views/login' // 引入登录模块
import Home from '@/views/home' // 引入首页模块
import Welcome from '@/views/welcome' // 欢迎页面路由二级的
import NotFound from '@/views/404'

Vue.use(VueRouter) // 使用router

const router = new VueRouter({
  routes: [
    // 登录
    { path: '/login', component: Login },
    // 首页 二级路由都在这切换
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎页面
        { path: '/', component: Welcome }
      ]
    },
    // 404页面路由规则
    {
      path: '*', component: NotFound
    }
  ]
})

export default router
