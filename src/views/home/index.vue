<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside :width="isOpen?'200px':'64px'">
      <!-- logo  -->
      <div class="logo" :class="{smallLogo:!isOpen}"></div>
      <!-- 菜单 -->
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right: none;"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 图标 -->
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <span class="text">传智播客教育有限公司</span>

        <el-dropdown class="cD">
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            <span class="userName">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting">
              <span class="el-icon-setting"></span> 个人设置
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              <span class="el-icon-unlock"></span> 退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 欢迎页面 -->
      <el-main>
        <!-- 二级路由的容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'

export default {
  data () {
    return {
      // 根据这个属性值控制菜单栏收起展开
      isOpen: true,
      // 头像
      photo: '',
      // 名称
      name: ''
    }
  },
  created () {
    // 页面初始化的时候的钩子函数
    const user = local.getUser() || {} // 如果没有值也不会报错空对象返回的是undefined
    this.photo = user.photo // 获取头像并赋值
    this.name = user.name
  },
  methods: {
    toggleMenu () {
      // 切换菜单栏的展开和收起
      this.isOpen = !this.isOpen
    },
    setting () {
      // 进入个人设置页面的方法
      this.$router.push('/setting')
    },
    logout () {
      local.delUser()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002044 url("../../assets/logo_admin.png") no-repeat center /
        120px auto;
    }
    //切换小图
    .smallLogo {
      background-image: url("../../assets/logo_admin_01.png");
      background-size: 36px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      margin-left: 8px;
      font-weight: 700;
    }
    .cD {
      float: right;
      img {
        width: 27px;
        height: 27px;
        vertical-align: middle;
      }
      .userName {
        vertical-align: middle;
        font-weight: bold;
        margin-left: 8px;
      }
    }
  }
}
</style>
