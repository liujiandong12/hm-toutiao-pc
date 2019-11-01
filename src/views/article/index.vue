<template>
  <div class="container-article">
    <!-- 筛选条件布局 -->
    <el-card>
      <div slot="header">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>-->
        <!-- 使用的插槽 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选结果布局 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态 :">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核成功</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道 :">
          <!-- 频道组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>

        <el-form-item label="日期 :">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果页面 -->
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>根据筛选条件查询出 {{total}} 条结果</span>
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <!-- 如果图片错误或者是没有图片 -->
              <div slot="error">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              @click="toEdit(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button
              @click="delArticle(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后台的参数
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 分页当前页码
        page: 1,
        // 每页显示多少条
        per_page: 10
      },
      // 频道数据
      channelOptions: [],
      // 时间选择的数组
      dateArr: [],
      // 列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () { // 实例创建之后  结果页面完成后第一步
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: { // 定义方法
    // async getChannelOptions () { // 第二步发请求获取文章列表
    //   // 解构赋值获取数据
    //   const { data: { data } } = await this.$http.get('channels')
    //   // 获取的值赋值给 频道数据的容器
    //   this.channelOptions = data.channels

    async getArticles () { // 获取图片
      // 获取数据
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // 赋值 articles
      this.articles = data.results
      // 给总条数赋值
      this.total = data.total_count
    },
    // 分页函数
    pager (newPage) {
      // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新获取数据
      this.getArticles()
    },
    changeDate (dateArr) { // 时间筛选
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    search () {
      // 处理频道空字符串问题
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      // 把页码换成1
      this.reqParams.page = 1
      // 获取筛选数据（准备日期数据）
      this.getArticles()
    },
    // 去编辑
    toEdit (id) {
      // 第一种  query传参方式
      // this.$router.push(`/publish?id=${id}`)
      // 第二种  query传参方式
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async delArticle (id) {
      // 发请求  restfull 接口规则（get post put patch delete）
      await this.$http.delete(`articles/${id}`)
      // 提示
      this.$message.success('删除成功')
      // 更新列表
      this.getArticles()
    }
  }
}
</script>

<style scoped lang='less'>
</style>
