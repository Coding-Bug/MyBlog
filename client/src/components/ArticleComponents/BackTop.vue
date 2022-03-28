<template>
  <div id="BackTop">
    <div
      :class="{ like: true, BackTop_item: true, high_light: haveLike}"
      @click="articleLike"
    >
      <i class="iconfont icon-dianzan like-comment">
        <span v-show="like != 0" class="like_num">{{
          like | noMoreThen999
        }}</span>
      </i>
    </div>
    <div class="comment BackTop_item" @click="emitToGuestbook">
      <i class="el-icon-chat-dot-square like-comment">
        <span v-show="comment != 0" class="comment_num">{{
          comment | noMoreThen999
        }}</span>
      </i>
    </div>
    <div class="backTop BackTop_item" @click="backTop">
      <i class="el-icon-arrow-up"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Back",
  props: {
    // 点赞人数
    like: {
      type: Number,
      default: 0,
    },
    // 点赞的id
    like_userid: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // 评论人数
    comment: {
      type: Number,
      default: 0,
    },
    // 用户信息
    userInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    haveLike() {
      console.log('计算')
      if (this.userInfo) {
        if (this.like_userid.indexOf(this.userInfo.id) != -1) {
          return true;
        } else {
          return false;
        }
      }
      return false
    },
  },
  methods: {
    // 聚焦评论框
    emitToGuestbook() {
      this.$Bus.$emit("focusComment");
    },
    // 返回顶部
    backTop() {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    },
    // 改变点赞状态
    articleLike() {
      this.$Bus.$emit("articleLike");
    },
  },
};
</script>

<style lang="scss">
#BackTop {
  width: 60px;
  position: fixed;
  right: 15px;
  bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  .BackTop_item {
    width: 100%;
    height: 50px;

    background-color: #fff;
    text-align: center;
    line-height: 50px;
    &:hover {
      background-color: #e7e4e4;
    }
    i {
      font-size: 22px;
    }
    .like-comment {
      span {
        position: absolute;
        font-size: 10px;
      }
      .like_num {
        left: 31px;
        top: -15px;
      }
      .comment_num {
        left: 31px;
        top: 51px;
      }
    }
  }
}
</style>