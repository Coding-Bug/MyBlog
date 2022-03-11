<template>
  <div id="index">
    <div class="container" v-if="!isAdmin">
      <Header :showSome="showSome"></Header>
      <!-- 控制背景图片 -->
      <div v-show="dayTime" class="day"></div>
      <div v-show="!dayTime" class="night"></div>
      <Light @changeBackground="changeBG"/>
      
    </div>
  </div>
</template>


<script>
import Header from "../components/Header.vue";
import Light from '../components/Light'
export default {
  components: {
    Header,
    Light
  },
  data() {
    return {
      showSome: true,
      isAdmin:false
    };
  },
  computed:{
    // 监听背景的改变
    dayTime(){
      return this.$store.state.page.backgroundColor
    }
  },

  methods:{
    // 更新背景状态
    changeBG(){
      this.$store.dispatch('page/update_bgcolor')
    }
  }

};
</script>

<style lang ='scss' scoped>
#index{
    display: flex;
    flex-direction: column;
    width: 100%;
    
    // 背景
    .day, .night{
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: -1;
    }
    .night{
      background: url('../assets/image/night.gif') center;
    }
    .day{
      background: url('../assets/image/day.jpg') no-repeat;
      background-size: 100% 100%;
    }
    
}

.container{
    width: 1200px;
    margin: 0 auto;
}
</style>