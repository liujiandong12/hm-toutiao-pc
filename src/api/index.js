// 导出一个配置好的axios  给main.js挂载
import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 设置请求头过程
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }
// 请求拦截器 请求时拦截
axios.interceptors.request.use(config => {
  // 1. 获取用户信息
  const user = local.getUser() || {} // 如果local.getUser()中有值,就直接给user 没值的话就给user一个空对象
  // 2. 给请求头部设置token
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器在所有响应回来前执行
// 总用是解决token过期错误
axios.interceptors.response.use(res => res, err => {
  if (RegExp.response.status === 401) {
    // window.location.hash = '#/login' //这样的跳转不经过路由不建议使用
    // 要实现通过路由跳转  先引入路由模块
    return router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
