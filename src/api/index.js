// 导出一个配置好的axios  给main.js挂载
import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
export default axios
