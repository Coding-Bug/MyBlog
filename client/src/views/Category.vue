<template>
  <div id="Category">
      <div class="cat_container">
          <h2 class="title high_light">文章分类</h2>
           <span class="cat_card" v-for="item in categoryList" :key="item.category_id" @click="goToArticle(item.cat_name)">
               <el-tag class="name"> {{item.cat_name}}</el-tag>
               <el-tag class="count">{{item.cat_num}}</el-tag>
           </span>
      </div>
  </div>
</template>

<script>
export default {
    name:"Category",
    data(){
        return {
            // 分类列表
            categoryList:[
            ],
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        // 获取分类列表
        async getList(){
            try{
                let res = await this.$api.getCategory()
                this.categoryList=res.data
            }catch(err){
                this.$message.error('网络出错了,(ノへ￣、)！')
            }
        },
        // 跳转
        goToArticle(cat_name){
            this.$router.push({name:'article',params:{cat_name:cat_name}})
        }
    }
}
</script>

<style lang="scss">
#Category{
    display: flex;
    justify-content: center;
    align-items: center;
    .cat_container{
        display: inline-block;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        .title{
            width: 100%;
            text-align: center;
            margin-bottom: 2rem;
            font-size: 2rem;
        }
        .cat_card{
            display: inline-block;
            padding: 0 10px;
            margin:.4rem 0;
            user-select: none;
            cursor: pointer;            
            &:hover{
                transform: translate(-.1rem,-.1rem);
            }
            .name,.count{
                font-size:1.3rem;
                text-align: center;
                min-width: 2.4rem;
            }

        }
    }
}

</style>