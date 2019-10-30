// 导出一个本地操作用户信息的模块(设置用户,获取用户,删除用户)
// 定义一个常量KEY
const KEY = 'hm-touTiAo-pc-85-user-key'
const local = {
  setUser (user) { // 传进要处理的user对象
    // 将传进来的user对象转成  (json字符)串类型
    const jsonStr = JSON.stringify(user)
    // 用本地存储的方式保存用户信息
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

export default local
