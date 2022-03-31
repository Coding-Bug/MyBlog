<template>
  <div id="admin">
    <!-- 菜单 -->
    <div class="left">
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
      >
        <el-submenu index="1"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>文章管理</span>
          </template>
            <el-menu-item index="1-1">发布文章</el-menu-item>
            <el-menu-item index="1-2">管理文章</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 内容区域 -->
    <div class="right">
      <router-view></router-view>

    </div>
    
  </div>
</template>

<script>
export default {
  name: "admin",
  methods:{
    handleOpen(){
      console.log('aaa')
    }
  }
};
</script>


<style lang="scss">
  #admin{
    width: 100%;
    height: 100%;
    .left{
      position: fixed;
      width: 200px;
      height: 100%;
      .el-menu-vertical-demo{
        height: 100%;
      }
    
    }

    .right{
      width: 100%;
      padding-left:200px;
    }
  }
</style>