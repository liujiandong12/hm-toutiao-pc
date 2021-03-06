import Vue from 'vue'
import VueRouter from 'vue-router' // 引入router
import local from '@/utils/local' // 功能函数
import Login from '@/views/login' // 引入登录模块
import Home from '@/views/home' // 引入首页模块
import Image from '@/views/image' // 素材模块
import Welcome from '@/views/welcome' // 欢迎页面路由二级的
import NotFound from '@/views/404' // 导入404组件
import Article from '@/views/article' // 能容管理
import Publish from '@/views/publish' // 文章发布
import Comment from '@/views/comment' // 评论设置
import Setting from '@/views/setting' // 个人设置
import Fans from '@/views/fans' // 个人设置

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
        { path: '/', component: Welcome },
        // 内容页
        { path: '/article', component: Article },
        // 素材页
        { path: '/image', component: Image },
        // 发布文章
        { path: '/publish', component: Publish },
        // 评论管理
        { path: '/comment', component: Comment },
        // 个人设置
        { path: '/setting', component: Setting },
        // 粉丝管理
        { path: '/fans', component: Fans }
      ]
    },
    // 404页面路由规则 一级路由
    {
      path: '*',
      component: NotFound
    }
  ]
})

// 设置路由守卫  beforeEach 比否一吃
// 里边的参数to是要跳转到哪是个对象,from是从哪跳转过来的,next()放行
// next("/login")阻拦到登录页
router.beforeEach((to, from, next) => {
  // 判断用户要跳转的页面是不是登录页并且用户存不存在
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

export default router
