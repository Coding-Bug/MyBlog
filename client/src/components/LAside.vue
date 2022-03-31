<template>
  <div id="LAside">
    <!-- 信息部分 -->
    <div class="info">
      <div class="img">
        <img src="@/assets/images/my-avarta.jpg" alt="" />
      </div>
      <div class="intro">
        <p class="name">skyblade</p>
        <p class="desc">你好欢迎光~临!</p>
      </div>
    </div>

    <!-- 导航部分 -->
    <div class="scroll">
      <div class="nav">
        <el-row style="height: 100%">
          <el-col :span="8" style="height: 100%; width: 200px">
            <el-menu
              class="e-menu-vertical-demo"
              text-colot="#cbced4"
              active-text-color="#1E90FF"
              :default-active="routePath"
            >
              <div class="navTitle">
                <span>导航</span>
              </div>
              <el-menu-item index="1" @click="$router.push('/article')">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>

              <el-menu-item index="2" @click="$router.push('/archive')">
                <i class="el-icon-s-order"></i>
                <span slot="title">归档</span>
              </el-menu-item>
              <el-menu-item index="3" @click="$router.push('/category')">
                <i class="el-icon-menu"></i>
                <span slot="title">分类</span>
              </el-menu-item>
              <el-menu-item index="4" @click="$router.push('/tag')">
                <i class="el-icon-price-tag"></i>
                <span slot="title">标签</span>
              </el-menu-item>

              <div class="navTitle">
                <span>其他</span>
              </div>

              <el-menu-item index="5" @click="$router.push('/message')">
                <i class="el-icon-chat-dot-round"></i>
                <span slot="title">留言</span>
              </el-menu-item>
              <el-menu-item index="6" @click="$router.push('/profile')">
                <i class="el-icon-user"></i>
                <span slot="title">个人信息</span>
              </el-menu-item>
              <el-menu-item index="7" @click="goAdmin">
                <i class="el-icon-setting"></i>
                <span slot="title">管理系统</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LAside",
  data() {
    return {
      routePath: "0",
      indexContent: [
        "article",
        "archive",
        "category",
        "tag",
        "message",
        "profile",
        "admin",
      ],
    };
  },
  watch: {
    $route() {
      let path = this.$route.path;
      for (let i = 0; i < this.indexContent.length; ++i) {
        if (path.indexOf(this.indexContent[i]) != -1) {
          this.routePath = `${i + 1}`;
          break;
        }
      }
    },
  },
  methods:{
    goAdmin(){
      // 跳转到管理员页面
      this.$router.push('/admin')
    }
  }
};
</script>

<style lang="scss">
#LAside {
  .info {
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    border-bottom: 2px solid #dae0da;
    .img {
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 15px;
      box-shadow: 0 0 5px #ccc;
      img {
        width: 100%;
        height: 100%;
        transition: all 1s;
      }
      :hover {
        transform: rotate(360deg);
      }
    }

    .intro {
      .name {
        font-size: 14px;
        margin-bottom: 5px;
        color: #1e90ff;
        font-weight: bold;
      }
      .desc {
        color: rgb(36, 34, 34);
        font-size: 12px;
      }
    }
  }

  .scroll {
    height: calc(80vh - 96px);
    overflow-y: scroll;
    background-color: rgb(189, 189, 189, 0.5);
    .nav {
      position: relative;

      .navTitle {
        height: 18px;
        padding: 0 10px;
        margin-top: 10px;
        margin-bottom: 15px;
        font-size: 16px;
        color: #1a1818;
      }
      .el-menu {
        background-color: rgb(189, 189, 189, 0);
      }
      .el-menu-item.is-active {
        background-color: rgb(189, 189, 189, 0) !important;
      }
      .el-menu-item:hover {
        background-color: rgb(116 119 119 / 80%);
      }
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    display: none;
  }
}
</style>