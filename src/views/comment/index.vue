<template>
  <div class="container-comment">
    <el-card>
      <!-- 卡片头 -->
      <div slot="header">
        <!-- 面包屑组件 -->
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 列表 -->
      <el-table :data="articles">
        <el-table-column label="标题" width="400px" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <!-- 使用作用域插槽 -->
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="scope.row.comment_status"
              type="danger"
              size="small"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="success" size="small">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="pager"
    ></el-pagination>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 接收文章列表
      articles: [],
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      // 文章总条数
      total: 0
    }
  },
  created () { // 页面初始化时的钩子
    this.getArticles()
  },
  methods: { // 组件方法的容器
    // 实现切换的方法
    toggleStatus (row) {
      // const { id, comment_status } = row // 结构赋值
      // 弹框提示
      const text = row.comment_status ? '您确定要关闭评论吗' : '您确定要打开评论吗'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发请求
        const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
        // 成功提示
        this.$message.success(data.allow_comment ? '打开评论成功' : '关闭成功')
        // 更新状态当前这一条文章状态
        row.comment_status = data.allow_comment
      }).catch(() => {

      })
    },
    // 获取文章数据
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    // 分页函数
    pager (newPage) {
      // 修改当前页码
      this.reqParams.page = newPage
      // 再获取数据
      this.getArticles()
    }

  }

}
</script>

<style scoped lang='less'></style>
