import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'// 引用elementUI  第一步
import 'element-ui/lib/theme-chalk/index.css' // 引用第二部
import router from '@/router'

import axios from './api/index.js' // 引入axios
Vue.prototype.$http = axios // 挂载完成

Vue.use(ElementUI) // 使用UI框架

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
