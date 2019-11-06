import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui' // 引用elementUI  第一步
import 'element-ui/lib/theme-chalk/index.css' // 引用第二部
import router from '@/router' // 路由
import '@/style/index.less' // 公用样式

import axios from './api/index.js' // 引入axios
// import MyBread from '@/components/my-bread' // 引入面包屑组件
// Vue.component('my-bread', MyBread)// 全局注册面包屑
import plugin from '@/components' // 全局插件
Vue.use(plugin) // plugin的意思是插件

Vue.prototype.$http = axios // 挂载完成

Vue.use(ElementUI) // 使用UI框架

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
