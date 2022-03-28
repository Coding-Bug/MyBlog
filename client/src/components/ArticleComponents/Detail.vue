<template>
  <div id="Detail">
    <!-- 头部区域 -->
    <header class="detail_header" :style="{ color: Color }">
      <!-- 标题 -->
      <h1>
        {{ detail.title }}
      </h1>
      <!-- 创建信息部分 -->
      <div class="creater">
        <div class="avatar">
          <img :src="detail.avatar" alt="头像" />
        </div>
        <div class="info">
          <div class="author_name">{{ detail.author }}</div>
          <div class="info_list">
            <span>
              <i class="el-icon-date"> </i
              >{{ detail.create_time | formateDate }}</span
            >
            <span><i class="el-icon-view"> </i>{{ detail.visited }} </span>
          </div>
        </div>
      </div>
    </header>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 使用插件展示 -->
      <mavon-editor
        v-model="detail.content"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :subfield="false"
        class="markdown-body"
        :ishljs="true"
        previewBackground="background-color: rgba($color: #fff, $alpha: 0.6);"
        style="z-index: 1"
      >
      </mavon-editor>
    </div>

    <!-- 评论区域 -->
    <Guestbook :article_id="$route.params.id"></Guestbook>

    <!-- 右下角的返回顶部部分 -->
    <BackTop
      :like="detail.like_ids.length"
      :like_userid="detail.like_ids"
      :comment="detail.reply_ids.length"
      :userInfo="userInfo"
    ></BackTop>
  </div>
</template>

<script>
import Guestbook from "../Guestbook/index.vue";
import BackTop from "./BackTop.vue";
import { mapGetters } from "vuex";
export default {
  name: "Detail",
  components: {
    Guestbook,
    BackTop,
  },
  data() {
    return {
      // 文章对象
      detail: {
        like_ids:[],
        reply_ids:[],
      },
    };
  },
  computed: {
    Color() {
      return this.$store.state.page.fontColor;
    },
    ...mapGetters("user", ["userInfo", "token"]),
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        this.getDetail();
      }
    },
  },
  mounted() {
      // 绑定点赞
    this.getDetail()
    this.$Bus.$on("articleLike",()=>{this.articleLike()})
  },
  activated(){
    this.getDetail()
  },
  methods: {
    // 获取文章详情
    async getDetail() {
      try {
        const res = await this.$api.getDetail(this.$route.params.id);
        if (res.code == 200) {
          this.detail = res.data;
        }
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 点赞
    async articleLike(){
      {
        if (this.token) {
          let params = {
            token: this.token,
            article_id: this.detail.article_id,
          }
          try {
            let res = await this.$api.likeArticle(params)
            this.changeLike(res.flag)

          } catch (err) {
            this.$message.error(err)
          }
        } else {
         this.$router.push("/login");
          this.$message.error("请先登录(ノへ￣、)");
        }
      }
    },

    // 改变点赞状态
    changeLike(flag){
      // 如果现在是点赞的状态
      let obj =this.detail.like_ids
      if(flag){
        obj.push(this.userInfo.id)
      }else{
        obj.splice(obj.indexOf(this.userInfo.id),1)
      }
    }

  },
};
</script>

<style lang="scss">
#Detail {
  .detail_header {
    padding-left: 20px;
    padding-top: 1rem;
    .creater {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      .info {
        margin-bottom: 0.5rem;
        .author_name {
          font-size: 1.333rem;
          font-weight: 500;
        }
        span {
          margin-right: 0.8rem;
        }
      }
    }
  }
  .content {
    margin-top: 2rem;
    z-index: 1;
  }
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background: rgba($color: #edeeea, $alpha: 0.6);
}
</style>