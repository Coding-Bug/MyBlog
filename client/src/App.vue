<template>
  <div>
    <Rindex/>
    <canvas id="Snow"></canvas>
  </div>
</template>

<script>
import setRequestAniamtionFram from './utils/setRequestAniamtionFram'
import snow from './utils/snow'
import Rindex from './views/Rindex'
export default {
  name: "app",
  mounted() {
    // app加载完成后便下雪
    setRequestAniamtionFram()  
    snow()
  },
  components:{
    Rindex
  }
};
</script>

<style lang='scss'>
// 画布大小
#Snow{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 99999;
  // 不可成为事件
  pointer-events: none;
  
  
}
</style>