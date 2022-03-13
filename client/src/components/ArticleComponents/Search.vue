<template>
  <div id = "search">
      <input type="text"
      v-model="searchValue"
      v-on:keyup.enter="emitToArticle"
      placeholder="请输入关键词"
      >
      <i class="el-icon-search" @click="emitToArticle"></i>
  </div>
</template>

<script>
export default {
    data(){
        return{
            searchValue:'',
        }
    },
    methods:{
        emitToArticle(){
            this.$Bus.$emit('eventFromSearch',this.searchValue) 
            this.searchValue=''  
        }
    }
}
</script>

<style lang="scss">
#search{
    display: flex;
    align-items: center;
    position: relative;
    width: 30%;
    input{
        width: 100%;
        height: 32px;
        padding: 6px 0;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 20px;
        text-indent: 10px; // 缩进
    }
    i{
        cursor: pointer;
        font-size: 15px;
        position: absolute;
        right: 16px;
        &:hover{
            color:#1E90FF;
        }
    }
}

</style>