<template>
  <div id="Detail">
    <!-- 头部区域 -->
    <header class="detail_header" :style="{color: Color}">
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
            <span >
              <i class="el-icon-date"> </i
              >{{ detail.create_time | formateDate }}</span
            >
            <span><i class="el-icon-view"> </i>{{ detail.visited }} </span>
            <span>
              <i class="iconfont icon-dianzan"></i>
              {{ detail.like }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 使用插件展示 -->
      <mavon-editor v-model="detail.content" defaultOpen= "preview"  :toolbarsFlag="false" :subfield="false" class="markdown-body" 
      :ishljs="true"
      previewBackground="background-color: rgba($color: #fff, $alpha: 0.6);"
      style="z-index: 1;"
      >
      </mavon-editor>
    </div>

    <!-- 评论区域 -->

  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      // 文章对象
      detail: {
        avatar: "@/assets/imgages/day.jpg/",
        title: "关于母猪的产后护理这件事",
        author: "skyblade",
        create_time: "54646465456",
        visited: 3,
        like: 564,
        content:'# 母猪的产后护理要快！准！狠！'
      },
    };
  },
  computed:{
  Color(){
    return this.$store.state.page.fontColor
  }
  },
  watch:{
    $route(){
      if(this.$route.params.id){
        this.getDetail()
      }
    }
  },
  mounted(){
    this.getDetail()
  },
  methods:{
    // 获取文章详情
    async getDetail(){
      try{
        const res =await this.$api.getDetail(this.$route.params.id)
        if(res.code == 200){
          this.detail = res.data
        }
      }catch(e){
        this.$message.error("网络出错了,(ノへ￣、)！")
      }
    }

    // 获取文章留言
  }
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
      .info{
      margin-bottom: .5rem;
      .author_name{
        font-size: 1.333rem;
        font-weight: 500;
      }
      span{
        margin-right: .8rem;
      }
    }
    }
  }
  .content {
   margin-top: 2rem;
   z-index: 1;
  }
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html{
    background: rgba($color: #edeeea, $alpha: 0.6) ;
}
</style>