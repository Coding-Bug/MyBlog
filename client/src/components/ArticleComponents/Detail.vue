<template>
  <div id="Detail">
    <!-- 头部区域 -->
    <header class="detaile_header">
      <!-- 标题 -->
      <h1>
        {{ detail.title }}
      </h1>
      <!-- 创建信息部分 -->
      <div class="creater">
        <div class="avatar">
          <img src="detail.avatar" alt="" />
        </div>
        <div class="info">
          <div>{{ detail.author }}</div>
          <div class="info_list">
            <span>
              <i class="el-icon-date"> </i
              >{{ detaile.create_time | formateDate }}</span
            >
            <span><i class="el-icon-view"> </i>{{ item.visited }} </span>
            <span>
              <i class="iconfont icon-dianzan"></i>
              {{ item.like }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- 内容区域 -->
    <div class="content">
        
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      detail: {
        title: "关于母猪的产后护理这件事",
      },
    };
  },
};
</script>

<style>
</style>