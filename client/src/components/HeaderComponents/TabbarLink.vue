<template>
  <div id="tabbarLink">
      <Search></Search>
      <!-- 用户信息 -->
      <div class="userbox">
          <div class="is-login" v-if="loginStatus">
              <el-avatar class="avatar " :src="userInfo.avatar"></el-avatar>
                  <span class="click name" @click="$router.push('/profile')">{{userInfo.username}}</span>
          </div>
          <div class="no-login" @click="handleLogin" v-else>
              登录
          </div>
      </div>
  </div>
</template>

<script>
import Search from '../ArticleComponents/Search.vue'
import {mapGetters} from 'vuex'
export default {
    name:'Tablik',
    components:{
       Search
    },
    computed:{
        ...mapGetters('user',[
            'userInfo',
            'loginStatus'
        ])
    },
   
    methods:{
        // 点击登录
        handleLogin(){
            this.$router.push('/login')
        },
        // 登出
    },
     mounted(){
        // DOM挂载完获取获取用户信息
        if(localStorage.getItem('userInfo')){
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        }
    },

     
}
</script>

<style lang="scss" scoped>
#tabbarLink{
    display: flex;
    height: 100%;
    padding: 0 20px;
    white-space: nowrap;//合并空格换行无效
    justify-content: space-around;
    align-items: center;
    flex-wrap: nowrap;
    .userbox{
        display: flex;
        color: #fff;
        float: right;
        margin-left: 33px;
        .is-login{
            font-size: 18px;
            display: flex;
            align-items: center;

            .avatar{
                width: 50px;
                height: 50px;
                margin-right: 15px;
                transition: all 1s linear;
                &:hover{
                    transform: rotate(360deg);
                }
            }
            
            
        }
        .no-login{
            font-size: 14px;
            cursor:pointer;
            // 嵌套伪类要用&
            &:hover{
                color: #1E90FF;
            }
        }
        
        
    }
    @media screen and(max-width:768px){
        #tabbarLink{
            display: none;
        }
    }
}
</style>