<template>
  <div id="GuestBook">
    <h2>评论</h2>
    <!-- 编辑发布区域 -->
    <div class="compile">
      <div class="avatar">
        <img :src="avarta" alt="头像" />
      </div>
      <div class="input-container">
        <el-input
          v-model="value"
          maxlength="200"
          placeholder="把你想说的写下来吧^_~   (Enter换行,Ctrl+Enter发送)"
          @keydown.enter.native="publish"
          :rows="3"
          type="textarea"
          resize="none"
        >
        </el-input>
      </div>
    </div>

    <div class="comment-container">
      <div v-for="item in comments" :key="item.id" class="comment">
        <div class="commentItem">
          <div class="avatar">
            <img :src="item.avatar" alt="头像" />
          </div>
          <div class="content-box">
            <!-- 楼主的评价 -->
            <div class="comment-main">
              <!-- 用户名和日期 -->
              <div class="user-date">
                <span class="username">{{ item.name }}</span>
                <span class="date">{{ item.create_time | formateDate }}</span>
              </div>
              <!-- 评论内容 -->
              <p class="content">{{ item.content }}</p>

              <!-- 点赞和回复 -->
              <div class="like-reply">
                <span @click="like"
                  ><i class="icon-dianzan iconfont"></i
                  ><span v-if="item.like && item.like != 0">{{
                    item.like
                  }}</span>
                  <span v-else>点赞</span></span
                >
                <span
                  ><i class="el-icon-chat-dot-square"></i>
                  <span v-if="item.reply && item.reply != 0">{{
                    item.reply
                  }}</span>
                  <span v-else>回复</span>
                </span>
              </div>
            </div>
            <!-- 子评价 -->
            <div class="subcomment-wrapper">
              <div
                class="comment-sub"
                v-for="subItem in item.subComments"
                :key="subItem.id"
              >
                <div class="avatar">
                  <img :src="subItem.avatar" alt="头像" />
                </div>
                <div class="content-box">
                  <!-- 用户名和日期 -->
                  <div class="user-date">
                    <span class="username">{{ subItem.name }}</span>
                    <span class="date">{{
                      subItem.create_time | formateDate
                    }}</span>
                  </div>
                  <!-- 评论内容 -->
                  <p class="content">{{ subItem.content }}</p>

                  <!-- 点赞和回复 -->
                  <div class="like-reply">
                    <span @click="like"
                      ><i class="icon-dianzan iconfont"></i
                      ><span v-if="subItem.like && item.like != 0">{{
                        item.like
                      }}</span>
                      <span v-else>点赞</span></span
                    >
                    <span
                      ><i class="el-icon-chat-dot-square"></i>
                      <span>回复</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuestBook",
  props: {
    comments: {
      type: Array,
      default() {
        return [
          {
            id: 1,
            avatar: "55",
            name: "skyblade",
            create_time: 5465465445,
            content: "太棒打卡萨丁加拉设计的拉萨大家拉萨大家啊了",
            like: 5,
            reply: 5,
            subComments: [
              {
                id: 1,
                avatar: "55",
                name: "skyblade",
                create_time: 5465465445,
                content: "太棒打卡萨丁加拉设计的拉萨大家拉萨大家啊了",
                like: 5,
                reply: 5,
              },
              {
                id: 1,
                avatar: "55",
                name: "skyblade",
                create_time: 5465465445,
                content: "太棒打卡萨丁加拉设计的拉萨大家拉萨大家啊了",
                like: 5,
                reply: 5,
              },
            ],
          },
        ];
      },
    },
  },
  data() {
    return {
      // 留言
      value: "",
      // 头像
      avarta: "dsd",
    };
  },
  methods: {
    publish(e) {
      // 注意监听的是keydwom事件。如果监听keyUp,那么发送的时候换行也有了
      if (e.ctrlKey && e.keyCode == 13) {
        console.log("发布评论");
      }
    },
  },
  computed: {
    Color() {
      return this.$store.state.page.fontColor;
    },
  },
};
</script>

<style lang = "scss">
#GuestBook {
  background-color: rgb(244 245 242);
  margin-top: 1.2rem;
  h2 {
    margin-left: 1.2rem;
  }
  /* 编辑区域 */
  .compile {
    width: 90%;
    position: relative;
    display: flex;
    margin: 1rem 1rem 0;
    .input-container {
      flex-grow: 1;
    }
  }

  /* 评论 */
  .comment-container {
    width: 90%;
    margin: 1rem 1rem 0;
    .commentItem {
      display: flex;
      /* 评论区除去头像部分 */
      .content-box {
        flex-grow: 1;
        margin-top: 0.2rem;
        /* 用户名和日期 */
        .user-date {
          .username {
            font-size: 1.27rem;
            font-weight: 500;
            color: #252933;
          }
          .date {
            float: right;
            color: #8a919f;
          }
        }
        /* 评论段落 */
        p {
          margin-top: 0.3rem;
          font-weight: 400;
          color: #515767;
        }
        /* 点赞和回复 */
        .like-reply {
          margin-top: 0.5rem;
          span {
            font-size: 1.1rem;
            margin-right: 0.4rem;
            cursor: pointer;
          }
          i{
              margin-right: 2px;
          }
        }

        /* 子评论区部分 */
        .subcomment-wrapper {
            background-color: rgb(231 228 228);
          padding: .5rem 0 0 .5rem;
          margin-top: .5rem;
          .avatar {
            width: 40px;
            height: 40px;
          }
          .comment-sub {
            display: flex;
             margin-bottom: 2rem;
          }
        }
      }
    }
  }
}
</style>