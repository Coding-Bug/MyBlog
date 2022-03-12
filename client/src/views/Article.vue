<template>
  <div id="Article">
    <el-card class="box-card">
      <!-- 顶部 -->
      <div slot="header" class="clearfix header">
        <h3>
          <i class="el-icon-document"></i>
          文章列表
        </h3>
        <h3 style="float: right">共{{ count }}篇</h3>
      </div>
      <!-- 内容区域 -->
      <div class="content" v-for="item in List" :key="item.id">
        <div class="img">
          <img
            :src="item.img"
            @click="detailPage(item.article_id)"
            alt="图片"
          />
        </div>
        <div class="text">
          <!-- 标题 -->
          <h2 class="title">
            <i class="el-icon-paperclip">{{ item.title }}</i>
          </h2>
          <!-- 简介 -->
          <p class="desc">
            {{ item.brief }}
          </p>
          <!-- 底部 -->
          <div class="text-bottom">
             <!-- 标签 -->
            <div >
              <el-tag v-for="label in item.labels" :key="label.lable_id" class="tag">
                <i class="el-icon-price-tag"> </i>
                {{ label.tag }}
              </el-tag>
            </div>
            <!-- 创建信息 -->
            <div class="creater">
              <div class="img">
                <img :src="item.avatar" alt="" />
              </div>
              <span class="name">
                {{ item.author }}
              </span>
              <span class="time">
                <i class="el-icon-date"> </i>
                <!-- 使用过滤器 -->
                {{ item.create_time | formateDate }}
              </span>
              <span>
                <i class="el-icon-chat-dot-round"> </i>
                {{ item.replyCount }}
              </span>
              <span>
                <i class="el-icon-view">  </i>{{ item.visited }}
              </span>
            </div>
           
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      count: 1,
      List: [
        {
          id: 0,
          article_id: 0,
          img: "../assets/images/my-avarta.jpg",
          title: "测试",
          brief: "这是拿来测试的",
          author: "skyblade",
          avatar: "../assets/images/my-avarta.jpg",
          create_time: 54613245,
          replyCount: "5",
          visited: "12",
          labels: [
            {
              lable_id: 0,
              tag: "javascript",
              
            },
            {
              lable_id: 1,
              tag: "html5",
            }
          ],
        },
        {
          id: 0,
          article_id: 0,
          img: `../assets/images/my-avarta.jpg`,
          title: "测试",
          brief: "这是拿来测试的",
          author: "skyblade",
          avatar: "../assets/images/my-avarta.jpg",
          create_time: 54613245,
          replyCount: "5",
          visited: "12",
          labels: [
            {
              lable_id: 0,
              tag: "javascript",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang='scss' scoped>
#Article {
  width: 100%;
  .box-card {
    width: 100%;
    margin: 0 auto;
    z-index: 1;
    background-color: rgba($color: #f2f2f2, $alpha: 0.7);
    h3 {
      font-weight: 700;
      font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-size: 1.17em;
      display: inline;
    }
    h2{
      font-weight: bold;
      font-size: 20px;
    }
    .content {
      width: 85%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 0 auto;
      margin-top: 1.25rem;
      border-radius: 0.5rem;
      background-color: rgb(255, 255, 255, 0.6);
      .img {
        width: 11rem;
        height: 10rem;
        margin-right: 1rem;
        border-radius: 0.5rem;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          transition: all 0.3s;
          position: relative;
          top: -0.1rem;
          left: -0.01rem;
          box-shadow: 0 5px 10px 2px #ccc;
        }
        .img {
          width: 100%;
        }
      }

      .text {
        position: relative;
        .title {
          display: block;
          margin-bottom: 1rem;
        }
        .desc {
          font-size: 16px;
          font-weight: 100;
          margin-bottom: 2rem;
        }
        .text-bottom {
          width: 100%;
         
          .creater {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: .5rem;
            font-size: 16px;
            i {
              margin-right: 2px;
            }
            span {
              font-size: 16px;
              font-weight: 20;
              margin-left: 0.5rem;
              margin-right: 0.5rem;
            }
            .img {
              width: 3rem;
              margin: 0;
              height: 3rem;
              border-radius: 50%;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .tag{
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            margin-right: .5rem;
            margin-bottom: 1rem;

          }
        }
      }
    }

    @media screen and(max-width:768px) {
      .content{
        width: 90%;
        .img{
          width: 100%;
          height: 15rem;
          margin-right: 0;
          margin:.8rem
        }
      }
      
    }
  }
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>