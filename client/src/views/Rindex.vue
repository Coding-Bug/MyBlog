<template>
  <div id="index">
    <div class="container" v-if="!isAdmin">
      <Header :showSome="showSome"></Header>
      <!-- 控制背景图片 -->
      <div v-show="dayTime" class="day"></div>
      <div v-show="!dayTime" class="night"></div>
      <Light @changeBackground="changeBG" />
      <div class="content">
        <!-- 左边 -->
        <div class="left" ref="left">
          <LAside />
        </div>

        <!-- 中间部分 -->
        <div class="main" :style="{ backgroundColor: bgColor }" ref="main">
          <keep-alive>
            <router-view class="router" :style="{ backgroundColor: bgColor }">
            </router-view>
          </keep-alive>
        </div>
        <!-- 右边部分 -->
        <div v-if="showSome" class="right" ref="right">
          <RAside  />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "../components/Header.vue";
import Light from "../components/Light";
import LAside from "../components/LAside.vue";
import RAside from "../components/RAside.vue";
export default {
  components: {
    Header,
    Light,
    LAside,
    RAside,
  },
  data() {
    return {
      showSome: true,
      isAdmin: false,
      // 屏幕宽度
      screenWidth:document.documentElement.clientWidth
    
    };
  },
  computed: {
    // 监听背景的改变
    dayTime() {
      return this.$store.state.page.backgroundColor;
    },
    bgColor() {
      return this.$store.state.page.bgColor;
    },
    
  },
  
  watch:{
      // 监听屏幕宽度变化
      // 重置nav位置
      screenWidth:function(val){
        if(val>768){
          this.$refs.left.style.left = "";
          this.$refs.main.style.marginLeft = "200px";
          this.showSome=true
        }else{
          this.$refs.left.style.left = '-200px'
          this.$refs.main.style.marginLeft = "0"
          this.showSome=false
        }
      }
  },

  mounted() {
    // 设置控制左边栏的事件总线
    const self = this;
    this.$Bus.$on("navStateChange", function (val) {
      // 显示侧边栏的情况
      if (val) {
        self.$refs.left.style.left = "0";
        self.$refs.main.style.marginLeft = "200px";
      } else {
        self.$refs.left.style.left = "-200px";
        self.$refs.main.style.marginLeft = "0";
      }
    });

    // 监听窗口变化
    window.onresize=function(){
      self.screenWidth=document.documentElement.clientWidth
    }
  },

  methods: {
    // 更新背景状态
    changeBG() {
      this.$store.dispatch("page/update_bgcolor");
    },
  },
};
</script>

<style lang ='scss' scoped>
#index {
  display: flex;
  flex-direction: column;
  width: 100%;

  // 背景
  .day,
  .night {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .night {
    background: url("../assets/images/night.gif") center;
  }
  .day {
    background: url("../assets/images/day.jpg") no-repeat;
    background-size: 100% 100%;
  }
}

.container {
  width: 1200px;
  margin: 0 auto;
  .content {
    display: flex;
    flex-direction: row;

    /* 设置左边部分 */
    .left {
      position: fixed;
      width: 200px;
      height: 80vh;
      margin-top: 50px;
      transition: all 1s;
      background-color: rgba(219, 229, 230, 0.7);
      z-index: 200;
    }
    /* 设置中间主部分 */
    .main {
      position: relative;
      width: 800px;
      min-height: calc(100vh - 50px);
      margin-top: 50px;
      margin-left: 200px;
      transition: all 1s;
      overflow: hidden;
      .router {
        width: 100%;
        padding: 5px;
        min-height: calc(100vh - 50px);
        box-shadow: 0 2px 12px 0 rgb(0 0 0 /10%);
        animation: routerAnimate 1s;
      }
    }
  }
}

@media screen and(max-width:768px) {
  .container {
    width: 100%;
    position: relative;
    .content {
      height: 100%;
      .left{
        left: 0;
      }
      .main {
        min-width: 100%;
        margin-left: 0;
      }
    }
  }
}
@keyframes routerAnimate {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>