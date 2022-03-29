<template>
  <div id="About">
    <el-card class="card">
      <div slot="header" class="clearfix">
        <span><i class="icon-boke iconfont"></i>博客信息</span>
      </div>
      <div class="list">
        <span class="left"
          ><i class="icon-dengjizongshu iconfont"></i>文章总数</span
        >
        <span>{{ blogInfo.count }}</span>
      </div>
      <div class="list">
        <span class="left"><i class="icon-jiangbei iconfont"></i>运营天数</span>
        <span>{{ blogInfo.day }}</span>
      </div>
      <div class="list">
        <span class="left click" @click="gotoGithub"
          ><i class="icon-github-fill iconfont"></i>github</span
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      blogInfo: {
        count: 0,
        day: 0,
      },
    };
  },
  methods: {
    gotoGithub() {
      window.open(this.blogInfo.github, "_blank");
    },
    async getBlogInfo() {
      try {
        let res = await this.$api.getBloginfo();
        this.blogInfo = res.data
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getBlogInfo();
  },
};
</script>

<style lang = "scss">
#About {
  user-select: none;
  .el-card__header {
    padding: 8px 0;
    font-size: 20px;
    padding-left: 11px;

    i {
      font-size: 20px;
      margin-right: 4px;
    }
  }
  .el-card__body {
    padding: 0;
    .list {
      border-bottom: 1px solid #ccc;
      i {
        display: inline-block;
        margin-right: 5px;
        margin-left: 14px;
        padding: 8px 0;
      }
      .icon-jiangbei {
        margin-left: 12px;
      }
      .icon-github-fill {
        font-size: 20px;
        margin-left: 12px;
      }
      .left {
        padding-right: 30px;
      }
    }
    :last-child {
      border: 0;
    }
  }
}
</style>