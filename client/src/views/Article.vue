<template>
  <div id="Article">
    <el-card class="box-card">
      <!-- 顶部 -->
      <div slot="header" class="clearfix header">
        <h3>
          <i class="el-icon-document"></i>
          文章列表
        </h3>
        <h3 style="float: right">共{{ count }}篇</h3>
      </div>
      <!-- 内容区域 -->
      <span v-show="count != 0">
        <div
          class="content"
          v-for="item in List"
          :key="item.id"
          @click="detailPage(item)"
        >
          <div class="img">
            <img :src="item.cover" alt="图片" />
          </div>
          <div class="text">
            <!-- 标题 -->
            <h2 class="title">
              {{ item.title }}
            </h2>
            <!-- 简介 -->
            <p class="desc">
              {{ item.brief }}
            </p>
            <!-- 底部 -->
            <div class="text-bottom">
              <!-- 标签 -->
              <div>
                <el-tag
                  v-for="tag in item.tags"
                  :key="tag"
                  class="tag"
                >
                  <i class="el-icon-price-tag"> </i>
                  {{ tag }}
                </el-tag>
              </div>
              <!-- 创建信息 -->
              <div class="creater">
                <div class="img">
                  <img :src="item.avatar" alt="" />
                </div>
                <span class="name">
                  {{ item.author }}
                </span>
                <span class="time">
                  <i class="el-icon-date"> </i>
                  <!-- 使用过滤器 -->
                  {{ item.create_time | formateDate }}
                </span>
                <span>
                  <i class="el-icon-chat-dot-round"> </i>
                  {{ item.replyCount }}
                </span>
                <span> <i class="el-icon-view"> </i>{{ item.visited }} </span>
                <span>
                  <i class="iconfont icon-dianzan"></i>
                  {{ item.likeCount }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页区域 -->
        <div class="paginationWrap">
          <el-pagination
            class="pagination"
            background
            layout="total,prev,pager,next"
            :current-page="params.page"
            :page-size="params.pageSize"
            @current-change="handlePageChange"
            :total="count"
          ></el-pagination>
        </div>
      </span>
    </el-card>
    <div class="article-not-found" v-show="count == 0">
      <h2>抱歉，没有任何相关文章o(^▽^)o</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      // 总文章数
      count: 0,
      // 获取列表请求相关参数
      params: {
        pageSize: 3,
        page: 1,
        search: "",
        tag: "",
        category: "",
      },
      // 标识是否为Category组件传来的
      isCategory: false,
      // 标识是否为Tag组件传来的
      isTag: false,
      // 标识是否从search组件传来的
      isSearch: false,
      List: [
      ],
    };
  },
  watch: {
    // 判断
    $route() {
      if (this.$route.params.cat_name) {
        this.initParams();
        this.params.category = this.$route.params.cat_name;
        this.isCategory = true;
        this.getList();
      } else if (this.$route.params.tag_name) {
        this.initParams();
        this.params.tag = this.$route.params.tag_name;
        this.isTag = true;
        this.getList();
      }
    },
  },
  mounted() {
    // 加载完毕的时候
    this.getList();
  },
  beforeUpdate() {
    const self = this;
    // 绑定从所搜组件传过来的事件
    this.$Bus.$on("eventFromSearch", function (val) {
      self.initParams();
      self.params.search = val;
      self.isSearch = true;
      self.getList();
    });
  },
  methods: {
    // 初始化参数
    initParams() {
      this.params.page = 1;
      this.params.search = "";
      this.params.tag = "";
      this.params.category = "";
      this.isTag = false;
      this.isCategory = false;
      this.isSearch = false;
    },
    // 处理切换页数
    handlePageChange(val) {
      console.log(val)
      this.page = val;
      // 如果列表是由分类过来的
      if (this.isCategory) {
        this.emitToCatefory();
      } else if (this.isTag) {
        // 如果是从标签过来的
        this.emitToTag();
      } else {
        this.getList(val);
      }
    },
    // 处理点击跳转详情页
    detailPage(item) {
      // 使这篇文章的访问量+1
      item.visited++
      this.$router.push(`/detail/${item.article_id}`);
    },

    // 获取文章列表
    async getList() {
      // 文章正在加载状态
      // this.$store.dispach('')
      try {
        this.params.page=this.page
        const res = await this.$api.getArticle(this.params);
        this.List = res.data;
        this.count = res.count;
        // 结束文章正在加载状态
        // this.$store.dispach('')
      } catch (err) {
        this.$message.error(err);
        // 结束文章正在加载状态
        // this.$store.dispach('')
      }
    },
  },
};
</script>

<style lang='scss' scoped>
#Article {
  width: 100%;
  .box-card {
    width: 100%;
    margin: 0 auto;
    z-index: 1;
    background-color: rgba($color: #f2f2f2, $alpha: 0.7);
    h3 {
      font-weight: 700;
      font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-size: 1.17em;
      display: inline;
    }
    h2 {
      font-weight: bold;
      font-size: 20px;
    }
    .content {
      width: 85%;
      display: flex;
      margin: 0 auto;
      margin-top: 1.25rem;
      border-radius: 0.5rem;
      cursor: pointer;
      background-color: rgb(255, 255, 255, 0.6);
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      .img {
        width: 11rem;
        height: 10rem;
        margin-right: 1rem;
        border-radius: 0.5rem;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          transition: all 0.3s;
          position: relative;
          top: -0.1rem;
          left: -0.01rem;
          box-shadow: 0 5px 10px 2px #ccc;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        position: relative;
        width: 27rem;
        .title {
          display: block;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .desc {
          font-size: 16px;
          font-weight: 100;
          margin-bottom: 1rem;
        }
        .text-bottom {
          width: 100%;

          .creater {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 0.5rem;
            font-size: 16px;
            span {
              font-size: 16px;
              font-weight: 20;
              margin-left: 0.5rem;
            }
            .img {
              width: 3rem;
              margin: 0;
              height: 3rem;
              border-radius: 50%;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .tag {
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            margin-right: 0.5rem;
            margin-bottom: 1rem;
          }
        }
      }
    }

    @media screen and(max-width:768px) {
      .content {
        width: 95%;
        .img {
          width: 100%;
          height: 15rem;
          margin-right: 0;
          margin: 0.8rem;
        }
        .text {
          padding: 0 0.5rem;
        }
      }
    }
  }
}

.article-not-found {
  text-align: center;
  margin-top: 10px;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.paginationWrap {
  .pagination {
    float: right;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>