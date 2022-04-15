<template>
  <div id="articlePublish">
    <div class="container">
      <div class="title row">
        <h3>标题:</h3>
        <el-input v-model="article.title" style="width: 220px"></el-input>
      </div>
      <div class="breif row">
        <h3>简介:</h3>
        <el-input v-model="article.brief" style="width: 600px"></el-input>
      </div>
      <div class="category row">
        <h3>分类:</h3>
        <el-input v-model="article.category" style="width: 150px"></el-input>
      </div>
      <div class="tag row">
        <h3>标签:</h3>
        <el-input v-model="article.tag1" placeholder="标签1"></el-input>
        <el-input v-model="article.tag2" placeholder="标签2"></el-input>
        <el-input v-model="article.tag3" placeholder="标签3"></el-input>
      </div>
      <div class="cover row">
        <h3>封面:</h3>
        <div class="upload">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="() => {}"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :file-list="coverList"
            :limit="1"
            
            list-type="picture"

          >
            <el-button size="small" type="primary" style="fontSize:17px">点击上传文章封面</el-button>
          </el-upload>
        </div>
      </div>
      <div class="content">
        <h3>正文:</h3>
        <mavon-editor
        class="md"
        v-model="article.content"
        codeStyle="rainbow"
        fontSize="17px"
        >
        </mavon-editor>
      </div>
      <!-- 发布 -->
      <div class="publish">
        <el-button type="primary"  style="fontSize:17px" @click="submit"> 
          发布文章
        </el-button>

      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from '@/utils/debounce'
export default {
  name: "articlePublish",
  data() {
    return { 
      article: {
        title: "",
        brief: "",
        category: "",
        tag1: "",
        tag2: "",
        tag3: "",
        cover:null,
        content:''
      },
      coverList: [],
    };
  },
  methods: {
    handleChange(file) {
      this.article.cover = file.raw
      this.coverList.push({})
      this.coverList[0].url = file.url;
    },
    // 删除时将要发送到后端的cover也删除
    handleRemove() {
      this.article.cover=null
      this.coverList.pop()
    },
    handleSubmit (){
      return debounce(this.submit,300)
    },
    async submit(){
      // 转化成formdata的格式
      let params = new FormData()
      for (let key in this.article){
        params.append(key,this.article[key])
      }
      try{
        await this.$api.publishArticle(params)
        this.$message.success('文章发布成功ヾ(^▽^*)))')

      }catch(err){
        this.$message.error(err)
      }
    }
  },
};
</script>

<style lang="scss">
#articlePublish {
  .container {
    padding: 20px 20px;
    .row {
      display: flex;
      font-size: 17px;
      h3 {
        margin-right: 15px;
        margin-bottom: 30px;
      }
    }
    .tag {
      .el-input {
        width: 130px;
        font-size: 16px;
        margin-right: 20px;
        .el-input__inner {
          text-align: center;
        }
      }
    }
    .cover {
      .el-upload-list--picture {
        .el-upload-list__item-thumbnail{
            min-width: 600px;
            min-height: 300px;
            max-width: 600px;
            max-height: 300px;
            margin: 0;
        }
        .el-upload-list__item {
            width: 100%;
            height: 100%;
            padding: 15px 15px 15px 15px;
          .el-upload-list__item-name {
            display: none;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .content{
      font-size: 17px;
      margin-top:10px;
      .md{
        width: 90%;
        margin-top: 10px;
      }.v-note-wrapper .v-note-op .v-left-item .op-icon, .v-note-wrapper .v-note-op .v-right-item .op-icon{
        font-size: 18px;
        }
    }
    .publish{
      margin-top: 20px;
    }
  }
}
</style>