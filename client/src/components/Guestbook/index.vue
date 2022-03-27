<template>
  <div id="GuestBook">
    <h2 v-if="isComment">评论</h2>
    <h2 v-else style="width: 100%; text-align: center; padding: 1rem 0">
      给博主留言吧，虽然博主可能不会理你[]~(￣▽￣)~*
    </h2>
    <!-- 编辑发布区域 -->
    <div class="compile">
      <div class="avatar">
        <img :src="userInfo.avatar" alt="头像" />
      </div>
      <div class="input-container">
        <el-input
          v-model="value"
          maxlength="200"
          placeholder="把你想说的写下来吧^_~   (Enter换行,Ctrl+Enter发送)"
          @keydown.enter.native="publishOrReply"
          :rows="3"
          type="textarea"
          resize="none"
          ref="messageInput"
        >
        </el-input>
      </div>
    </div>

    <div class="comment-container">
      <div v-for="item in comments" :key="item.message_id" class="comment">
        <div class="commentItem">
          <div class="avatar">
            <img :src="item.avatar" alt="头像" />
          </div>
          <div class="content-box">
            <!-- 楼主的评价 -->
            <div class="comment-main">
              <!-- 用户名和日期 -->
              <div class="user-date">
                <span class="username">{{ item.author }}</span>
                <span
                  v-if="item.author === $store.state.user.admin"
                  class="admin_name"
                  >站长</span
                >
                <span class="date">{{ item.create_time | formateDate }}</span>
              </div>
              <!-- 评论内容 -->
              <p class="content">{{ item.content }}</p>

              <!-- 点赞和回复 -->
              <div class="like-reply">
                <span
                  @click="like(item)"
                  :class="{ click: true, high_light: haveLiked(item) }"
                  ><i class="icon-dianzan iconfont"></i
                  ><span v-if="item.like_ids && item.like_ids.length> 0">{{
                    item.like_ids.length
                  }}</span>
                  <span v-else>点赞</span></span
                >
                <span class="click" @click="open(item)"
                  ><i class="el-icon-chat-dot-square"></i>
                  <span v-if="item.replyAcess && item.replyAcess.length!= 0">{{
                    item.replyAcess.length
                  }}</span>
                  <span v-else>回复</span>
                </span>
              </div>

              <!-- 回复框 -->
              <div
                class="input-container"
                v-if="
                  show.comment_id === item.message_id && !show.subComment_id
                "
              >
                <el-input
                  v-model="value"
                  maxlength="200"
                  @keydown.enter.native="publishOrReply"
                  :rows="3"
                  type="textarea"
                  resize="none"
                  :placeholder="reply_placeholder"
                  ref="reply_input"
                  @keyup.esc.native="resetShow"
                >
                </el-input>
              </div>
            </div>
            <!-- 子评价 -->
            <div class="subcomment-wrapper" v-if="item.replyAcess.length!=0">
              <div
                class="comment-sub"
                v-for="subItem in item.replyAcess"
                :key="subItem.reply_id"
              >
                <div class="avatar">
                  <img :src="subItem.avatar" alt="头像" />
                </div>
                <div class="content-box">
                  <!-- 用户名和日期 -->
                  <div class="user-date">
                    <span class="username">{{ subItem.author }}</span>
                    <span
                      v-if="subItem.name === $store.state.user.admin"
                      class="admin_name"
                      >站长</span
                    >
                    <span v-show="subItem.reply_name !== item.author"
                      ><span class="huifu">回复</span
                      ><span class="username">{{
                        subItem.reply_name
                      }}</span></span
                    >
                    <span class="date">{{
                      subItem.create_time | formateDate
                    }}</span>
                  </div>
                  <!-- 评论内容 -->
                  <p class="content">{{ subItem.content }}</p>

                  <!-- 点赞和回复 -->
                  <div class="like-reply">
                    <span
                      @click="like(item, subItem)"
                      :class="{ click: true, high_light: haveLiked(subItem) }"
                      ><i class="icon-dianzan iconfont"></i
                      ><span v-if="subItem.like_ids && subItem.like_ids.length > 0">{{
                        subItem.like_ids.length
                      }}</span>
                      <span v-else>点赞</span></span
                    >
                    <span class="click" @click="open(item, subItem)"
                      ><i class="el-icon-chat-dot-square"></i>
                      <span>回复</span>
                    </span>
                  </div>

                  <!-- 回复框 -->
                  <div
                    class="input-container"
                    v-if="
                      show.comment_id === item.message_id &&
                      show.subComment_id === subItem.reply_id
                    "
                  >
                    <el-input
                      v-model="value"
                      maxlength="200"
                      :placeholder="reply_placeholder"
                      @keydown.enter.native="publishOrReply"
                      :rows="3"
                      type="textarea"
                      resize="none"
                      ref="reply_input"
                      @keyup.esc.native="resetShow"
                    >
                    </el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-footer">
      <!-- 到底了 -->
      <span class="no-more-comment comment-footer-item" v-show="showFoot">
        到底啦(๑￫ܫ￩)
      </span>
      <!-- 正在加载更多 -->
      <span class="loding-more comment-footer-item" v-show="!showFoot">
        <i class="el-icon-loading"></i>
        正在加载更多...
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addScollEvent, deleteScollEvent } from "@/utils/scrollMore";
export default {
  name: "GuestBook",
  props: {
    // true表示评论
    // false表示留言
    isComment: {
      type: Boolean,
      default: true,
    },
    // 文章id
    article_id: {
      type: String,
    },
  },

  data() {
    return {
      // 留言
      value: "",
      // 头像
      avarta: "dsd",
      // 控制回复框的显示和隐藏
      show: {
        comment_id: "",
        subComment_id: "",
      },
      // 回复框的默认文本
      reply_placeholder: "",
      // 发送的请求的参数
      params: {},
      // 评论的页码及每页大小
      page: 1,
      pageSize: 5,
      count: 0, // 总数

      // 评论
      comments: [],

      // 是否打开到底了
      showFoot: false,
    };
  },
  mounted() {
    // 绑定聚焦搜索框事件
    this.getComments();
    this.$Bus.$on("focusComment", () => {
      this.$refs.messageInput.focus();
    });
  },

  activated() {
    // 绑定滚动条到底部的事件
    
    addScollEvent(this.handleScroll, 1000);
  },
  deactivated() {
    deleteScollEvent(); // 失活时注销
  },
  computed: {
    // 发表地址
    publishURL() {
      return this.isComment ? "/article/leaveMessage" : "/message/leaveMessage";
    },
    // 获取地址
    getURL() {
      return this.isComment ? "/article/getMessage" : "/message/getMessage";
    },
    // 点赞地址
    likeURL() {
      return this.isComment ? "/article/likeMessage" : "/message/likeMessage";
    },
    ...mapGetters("user", ["userInfo", "token"]),
  },
  watch: {
    article_id() {
      this.page = 1;
      this.getComments();
    },
  },
  methods: {
    // 获取评论或者留言
    async getComments() {
      this.params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      try {
        let res;
        if (this.isComment) {
          // 获取评论
          this.params.article_id = this.article_id;
          res = await this.$api.getMessage(this.getURL, this.params);
        } else {
          // 获取留言
          res = await this.$api.getMessage(this.getURL, this.params);
        }
        // 加入到列表
        this.comments.push(...res.data);
        this.count = res.count;
        // 取消正在加载
        if (this.page * this.pageSize >= this.count) {
          setTimeout((this.showFoot = true));
        }
      } catch (err) {
        this.$message.error(err);
        setTimeout((this.showFoot = true));
      }
    },
    // 加载吓一页评论
    handleScroll() {
      console.log("aaa");
      if (this.page * this.pageSize >= this.count) {
        return;
      }
      this.page++;
      this.getComments();
    },

    // 发布留言或者评论以及回复
    async publishOrReply(e, reply_id) {
      // 注意监听的是keydwom事件。如果监听keyUp,那么发送的时候换行也有了
      if (e.ctrlKey && e.keyCode == 13) {
        // 判断有没有token
        if (this.token) {
          this.params = {
            token: this.token,
            content: this.value,
          };
          // 如果是评论
          if (this.isComment) {
            this.params.article_id = this.article_id;
          }
          if (reply_id) {
            this.params.reply_id = reply_id;
          }
          // 调用统一发布接口
          try {
            let res = await this.$api.publishOrReply(
              this.publishURL,
              this.params
            );

            if (res.code == 200) {
              this.$message.success(res.msg);
              // 重新发送获取评论请求
              this.getComments();
            }
          } catch (err) {
            this.$message.error(err);
          }
        } else {
          this.$router.push("/login");
          this.$message.error("请先登录(ノへ￣、)");
        }
      }
    },

    // 打开回复
    open(comment, subComment) {
      // 先重置回复
      this.resetShow();
      // 如果是打开回复楼主的输入框
      if (comment && subComment) {
        this.reply_placeholder = `回复${subComment.name}    (Enter换行,Ctrl+Enter发送,Esc取消)`;
        this.show.comment_id = comment.message_id;
        this.show.subComment_id = subComment.reply_id;
      } else {
        this.reply_placeholder = `回复${comment.name}  (Enter换行,Ctrl+Enter发送，Esc取消)`;
        this.show.comment_id = comment.message_id;
      }
      // 使其获取焦点
      this.$nextTick(function () {
        this.$refs.reply_input[0].focus();
      });
    },
    // 重置回复框状态
    resetShow() {
      this.show.comment_id = "";
      this.show.subComment_id = "";
    },
    // 点赞
    async like(message, reply) {
      // 判断有没有token
      if (this.token) {
        this.params = {
          token: this.token,
          message_id: message.message_id,
        };
        // 如果是点赞回复
        if (reply) {
          this.params.reply_id = reply.reply_id;
        }
        // 调用统一点赞接口
        try {
          let res = await this.$api.likeMessage(this.likeURL, this.params);
          if (res.code == 200) {
            // 重置该评论点赞
            this.resetLike(message, res.flag, reply);
          }
        } catch (err) {
          this.$message.error(err);
        }
      } else {
        this.$router.push("/login");
        this.$message.error("请先登录(ノへ￣、)");
      }
    },
    // 判断是否已经点赞
    haveLiked(item) {
      console.log(this.userInfo)
      if (this.userInfo) {
        if (item.like_ids.indexOf(this.userInfo.id) == -1) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    },
    // 重置某个点赞
    resetLike(message, flag, reply) {
      console.log(message, reply);
      let obj;
      if (reply) {
        obj = reply;
      } else {
        obj = message;
      }
      if (flag) {
        obj.like++; // 点赞数减一
        obj.like_userid.push(this.userInfo.id); // 将用户添加倒点赞列表
      } else {
        obj.like--;
        obj.like_userid.splice(obj.like_ids.indexOf(this.userInfo.id), 1);
      }
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
    padding-bottom: 0.5rem;
    .commentItem {
      display: flex;
      /* 评论区除去头像部分 */
      .content-box {
        flex-grow: 1;
        margin-top: 0.2rem;
        /* 用户名和日期 */
        .user-date {
          .admin_name {
            padding-left: 0.4rem;
            font-size: 1.1rem;
            color: #515767;
          }
          .username {
            font-size: 1.27rem;
            font-weight: 500;
            color: #252933;
            cursor: pointer;
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
          margin-bottom: 0.5rem;
          color: #515767;
          font-size: 14px;
          span {
            font-size: 1.1rem;
            margin-right: 0.4rem;
            cursor: pointer;
          }
          i {
            margin-right: 2px;
          }
        }

        /* 子评论区部分 */
        .subcomment-wrapper {
          background-color: rgb(231 228 228);
          padding: 0.5rem 0 0 0.5rem;
          margin-top: 0.5rem;
          .avatar {
            width: 40px;
            height: 40px;
          }
          .comment-sub {
            display: flex;
            margin-bottom: 2rem;
            .huifu {
              padding: 0 0.5rem;
              color: #515767;
              font-size: 14px;
            }
          }
          .input-container {
            width: 95%;
          }
        }
      }
    }
  }

  /* 底部 */
  .comment-footer {
    text-align: center;
  }

  /* 输入框 */
  .el-textarea__inner {
    font-size: 16px;
  }
}
</style>