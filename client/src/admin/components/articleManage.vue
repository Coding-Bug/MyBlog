<template>
  <div id="articleManage">
    <!-- 搜索框 -->
    <div class="search">
      <el-input v-model="search" placeholder="按文章标题搜索"
      suffix-icon="el-icon-search" @keyup.enter.native="getArticle"></el-input>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="标题" width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="创建日期" width="170" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.create_time | formateDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="封面"
          width="150"
          align="center"
          class-name="cover"
        >
          <template slot-scope="scope">
            <span
              ><img
                :src="scope.row.cover"
                alt="文章封面"
                style="width: 110px; height: 40px"
            /></span>
          </template>
        </el-table-column>
        <el-table-column label="分类" width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.categorise[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="350" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span>
              <el-tag
                v-for="tag in scope.row.tags"
                :key="tag"
                style="margin: 3px; font-size: 15px"
              >
                {{ tag }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="浏览量" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.visited }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点赞数" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.like_ids.length }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论数" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.reply_ids.length }}</span>
          </template>
        </el-table-column>
        <!-- 发布状态 -->
        <el-table-column label="发布状态" width="90" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="简介"
          show-overflow-tooltip
          
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.brief }}</span>
          </template>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="medium">编辑</el-button>
            <el-button size="medium" type="danger"
              >删除{{ scope.row.id }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      background
      :page-size="pageSize"
      page="1"
      layout="prev, pager, next"
      :total="count"
      class="pagenation"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "articleManage",
  data() {
    return {
      tableData: [{ id: 1, categorise: [], like_ids: [], reply_ids: [] }],
      pageSize: 10,
      page: 1,
      // 搜索条件
      search: "",
      count: 0,
    };
  },
  beforeMount() {
    // 获取表单信息
    this.getArticle();
  },
  methods: {
    async getArticle() {
      console.log('aaa')
      try {
        let res = await this.$api.getAdminArticle({
          page: this.page,
          pageSize: this.pageSize,
          search: this.search,
        });
        this.tableData = res.data;
        this.count = res.count;
      } catch (err) {
        this.$message.error(err);
      }
    },
  },
};
</script>

<style lang='scss'>
#articleManage {
  margin:25px;
  margin-top: 0;
  overflow: hidden;
  
  .search{
    .el-input{
      width: 280px;
      font-size: 16px;
      .el-input__icon {
        font-size: 20px;
        
      }
    }
    margin: 10px 0;

  }
  .table {
    
    .el-table th {
      font-size: 16px;
    }
    .cover {
      height: 20px !important;
    }
    .el-table td {
      padding: 7px 0;
      font-size: 15px;
      .cell {
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .pagenation {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>