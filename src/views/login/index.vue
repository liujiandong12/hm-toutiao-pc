<template>
  <div class="container">
    <el-card>
      <!-- 校验功能必须在el-form 标签里加有个属性:rules="数组的方法"数组方法要去data里定义 -->
      <el-form ref="loginForm" :model="LoginForm" :rules="LoginRules" status-icon>
        <el-form-item>
          <img src="../../assets/logo_index.png" alt />
        </el-form-item>
        <!-- 校验那个就在那个el-form-item加prop="要校验的值" -->
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input
            v-model="LoginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'

export default {
  data () {
    // 校验手机号的函数
    const checkMobile = (rule, value, callback) => {
      // 校验手机号的格式 1开头 3到9 最后9个数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      LoginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      LoginRules: {
        // 对象方法里边是数组 数组里是对象每个对象都是一个校验规则
        // 校验规则
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }, // required: true  表示输入框里不能为空
          { validator: checkMobile, trigger: 'blur' } // 通过validator:调用校验手机函数
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }, // required: true  表示输入框里不能为空
          { len: 6, message: '请输入6位验证码', trigger: 'blur' } // 通过len  len是length的简写
        ]
      }
    }
  },
  methods: {
    login () {
      // 整体校验
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          // this.$http
          //   .post('authorizations', this.LoginForm)
          //   .then(res => {
          //     // 成功
          //     // 保存用户信息 去utils中设置一个操作用户的功能函数
          //     local.setUser(res.data.data) // 这个操作是保存用户信息 下一步是导航守卫
          //     this.$router.push('/')
          // })
          // .catch(() => {
          //   // 失败 提示
          //   this.$message.error('手机号或验证码错误')
          // })
          // 改造代码
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.LoginForm)
            local.setUser(data)
            this.$router.push('/')
          } catch (e) { // 失败 提示
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url("./../../assets/login_bg.jpg") no-repeat center / cover;
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
