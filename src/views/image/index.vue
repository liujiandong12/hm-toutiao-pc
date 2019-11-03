<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div class="btn_box">
        <!-- 全部与收藏 -->
        <!-- label 指定选中当前单选框的值 -->
        <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="open" style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 素材区域 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <div class="footer" v-show="!reqParams.collect">
            <span
              class="el-icon-star-off"
              @click="toggleStatus(item)"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="deleteImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        class="fenye"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <span>
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          name="image"
          :on-success="handleSuccess"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      // 提交的筛选参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 14
      },
      // 素材列表
      images: [],
      // 素材总数
      total: 0,
      // 控制对话框 显示与隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null,
      // 设置请求头需要引入local
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImges()
  },
  methods: {
    // 素材添加的点击方法
    open () {
      // 开启对话框
      this.dialogVisible = true
      // 同时把预览地址改成空
      this.imageUrl = null
    },
    // 图片上传成功以后
    handleSuccess (res) {
      // 预览功能
      this.imageUrl = res.data.url
      // 成功后提示
      this.$message.success('上传成功')
      // 两面之后关闭对话框
      window.setTimeout(() => {
        this.dialogVisible = false
      }, 2000)
      // 渲染素材列表
      this.getImges()
    },
    async getImges () {
      // 获取素材数据
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImges()
    },
    // 全部和收藏的切换
    toggleList () {
      this.reqParams.page = 1
      this.getImges()
    },
    // 收藏的状态
    async toggleStatus (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功（改当前图片的状态，提示）
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    // 删除图片功能
    deleteImage (id) {
      // 显示确认框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击了确认
        // 1. 发请求
        await this.$http.delete(`user/images/${id}`)
        // 2. 提示
        this.$message.success('删除成功')
        // 3. 更新列表
        this.getImges()
      }).catch(() => {
        // 点击了取消
      })
    }

  }
}

</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      // span .red{} 选择器无效
      // span.red{} 选择器有效  &连接符
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
