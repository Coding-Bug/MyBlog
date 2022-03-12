<template>
  <div id="Header" class="shadow">
    <el-row class="row" >
      <!-- 设置响应式 -->
      <el-col :xs="24" :sm="5" >
        <LogoContent/>
      </el-col>
      <el-col :xs="0" :sm="22" >
        <!-- <TabbarLink v-if="showSome"></TabbarLink> -->
        <TabbarLink/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LogoContent from './HeaderComponents/LogoContent.vue'
import TabbarLink from './HeaderComponents/TabbarLink.vue'
export default {
  name: "Header",
  props: {
    showSome: {
      type: Boolean,
      default: true,
    },
  },
  components:{
    LogoContent,
    TabbarLink
  }
}
</script>

<style lang='scss'>
#Header{
    height: 52px;
    width: 1200px;
    position: fixed;
    z-index: 2000;
    margin: 0 auto;
    border-bottom: 1px solid #f3f3f3;
    background-color: rgb(116 119 119 / 40%);
    .row{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
}


@media screen and (max-width:768px) {
    #Header{
        width: 100%;
    }
}

</style>