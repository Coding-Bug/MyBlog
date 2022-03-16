<template>
  <div id="Archive">
    <el-card class="time-line-container">
      <el-timeline>
        <el-timeline-item size="large" color="#1E90FF" icon="el-icon-more">
          <span class="count">目前共{{ count }}篇，加油!</span>
        </el-timeline-item>
        <el-timeline-item
          v-for="item in archiveList"
          :key="item.article_id"
          :timestamp="item.createTime | formateDate"
          size="large"
          placement="top"
          color="#b5cbe0"
        >
          <el-card
            class="title_container"
            @click.native="$router.push(`/detail/${item.article_id}`)"
            ><h4>{{ item.title }}</h4></el-card
          >
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Aechive",
  data() {
    return {
      // 归档列表
      archiveList: [
      ],
      // 文章总数
      count: 0,
    };
  },
  mounted(){
this.getArchive()
  },
  methods: {
    async getArchive(){
      try {
        let res = await this.$api.getArchive();
        this.count = res.count
        this. archiveList= res.data
      } catch (err) {
        this.$message.error("网络出错了,(ノへ￣、)！");
      }
    },
  },
};
</script>

<style lang="scss">
.time-line-container {
  background-color: rgba($color: #f2f2f2, $alpha: 0.7);
  .count {
    font-size: 1.4rem;
    font-weight: bold;
  }
  .title_container {
    font-size: 1.2rem;
    background-color: #ffffff99;
    cursor: pointer;
    user-select: none;
    &:hover {
      transform: translate(-0.2rem, -0.2rem);
      box-shadow: 0.2rem 0.2rem 30px #ccc;
    }
  }
  .el-timeline-item__timestamp {
    color: #b5cbe0;
    font-size: 0.9rem;
  }
}
</style>