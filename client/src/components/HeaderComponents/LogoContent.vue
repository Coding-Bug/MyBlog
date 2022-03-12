<template>
  <div id="logocontent">
      <div class="logo_name">
      <i class="menu iconfont icon-caidan" @click="showNav" ></i>
      <p v-show="$route.name !== 'home'">skyblede</p>
      <i @click="$router.push('/category')" class="search iconfont icon-sousuo"></i>
      </div>
  </div>
</template>
<script>
export default {
    name:'logo',
    data(){
        return {
            isShowNav:true
        }
    },
    methods:{
        // 控制导航栏开关
        showNav(){
            this.isShowNav=!this.isShowNav
            this.$Bus.$emit('navStateChange',this.isShowNav)
        }
    }
}
</script>

<style lang="scss" scoped>
#logocontent{
    width: 100%;
    line-height: 52px;
    .logo_name{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        user-select: none; // 不可选
        p{
            font-size: 40px;
            color: #1E90FF;
            font-family: 'Oh-Chewy-2'; 
           
        }
    }
    // 页面小的时候显示搜索图标和菜单
    // 页面大的时候是显示搜索框
    @media screen and(max-width:768px){
        .menu,
        .search{
            color:black;
            display: block !important;
        }
    }

    .menu,
    .search{
        position: absolute;
        font-size: 1.5em;
        cursor: pointer;
        color: #d4d4d4;
        display: none;
        transition:all  1s linear ;
        
    }
    .menu{
        left: 2rem;
    }
    .search{
        right: 2rem;
    }

    .menu:hover,
    .search:hover{
        color: #1E90FF;
    }
}

</style>