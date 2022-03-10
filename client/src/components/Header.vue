<template>
  <div id="Header" class="shadow">
    <el-row class="row">
      <!-- 设置响应式 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="5">
        <LogoContent></LogoContent>
      </el-col>
      <el-col :xs="0" :sm="0" :md="0" :lg="22">
        <!-- <TabbarLink v-if="showSome"></TabbarLink> -->
        <div>tarbar</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LogoContent from './HeaderComponents/LogoContent.vue'
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
  }
};
</script>

<style lang='scss' scoped>
.shadow{
    background-color: #FFFFFF;
    box-shadow: 0px 5px 40px -1px rgba(2,10,18,0.1);
}

#Header{
    height: 52px;
    width: 1000px;
    position: fixed;
    z-index: 2000;
    margin: 0 auto;
    border-bottom: 1px solid #f3f3f3;
    background-color: #CCFFFF;
    .row{
        display: flex;
        justify-content: space-around;
        width: 100%;
    }
}


@media screen and (max-width:768px) {
    #Header{
        width: 100%;
    }
}
// @media only screen and(min-width:768px) {
//     .el-col-xs-24{
//         display: block;
//     }
//     .cl-col-xs-0{
//         display: block;
//     }
    
// }
</style>