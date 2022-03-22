<template>
  <div id="Profile">
    <div class="container card">
      <!-- 用户头像上传框 -->
      <div
        class="avatar-container"
        @mousemove.stop="showDelete = true"
        @mouseout="showDelete = false"
      >
        <span>头像:</span
        ><el-upload
          action="#"
          :http-request="Upload"
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handleAvatarChange"
          :disabled="userInfo.avatar != null || !isEdit"
        >
          <img
            class="avatar-img"
            v-if="userInfo.avatar"
            :src="userInfo.avatar"
            alt="用户头像"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <!-- 删除图片蒙版 -->
          <span
            class="el-upload-item-delete click"
            v-show="isEdit && userInfo.avatar && showDelete"
            @click.stop="handleRemove()"
          >
            <i class="el-icon-delete" ></i>
          </span>
        </el-upload>
      </div>

      <p>
        <span>昵称:</span>
        <input
          type="text"
          :disabled="!isEdit"
          v-model="userInfo.username"
          class="name"
        />
      </p>
      <p>
        <span>介绍:</span>
        <input
          type="text"
          :disabled="!isEdit"
          v-model="userInfo.introduction"
          class="introduction"
        />
      </p>
      <div class="btn">
        <el-button
          class="bt-l"
          type="primary"
          v-show="!isEdit"
          @click="isEdit = true"
          >编辑信息</el-button
        >
        <el-button
          class="bt-l"
          type="primary"
          v-show="isEdit"
          @click="discardChanges"
          >取消修改</el-button
        >
        <el-button
          class="bt-r"
          type="primary"
          v-show="isEdit"
          @click="handleSubmit"

          >提交修改</el-button
        >
        <el-button
          class="bt-r"
          type="primary"
          v-show="!isEdit"
          @click.native="handleUserLogout"
          >退出登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "../utils/debounce";
export default {
  name: "profile",
  data() {
    return {
      userInfo: {},
      // 信息的副本，取消修改可以回退
      infoCopy: {},
      // 要提交修改时的数据
      params: {},
      isEdit: false, // 编辑状态'
      showDelete: false,
    };
  },
  computed: {
    token() {
      return this.$store.getters["user/token"];
    },
    handleUserLogout() {
      return debounce(this.userLogout, 500);
    },
    handleSubmit(){
      return debounce(this.Submit,500)
    }
  },
  activated() {
    if (!this.token) {
      console.log(this.token);
      this.$message("登录后才能查看个人信息ヽ( o･ｪ･)ﾉ");
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getInfo();
  },

  methods: {
    // 删除图片
    handleRemove() {
      this.userInfo.avatar = null;
    },
    handleAvatarChange(file) {
      this.params.avatar = file; // 将修改的新头像放进提交参数里面
      this.$set(this.userInfo, "avatar", URL.createObjectURL(file.raw));
    },
    // 占位，无需实现
    Upload() {},
    // 放弃修改
    // 将原来的恢复
    discardChanges() {
      this.isEdit = false;
      this.params.avatar = null;
      for (var key in this.infoCopy) {
        this.userInfo[key] = this.infoCopy[key];
      }
    },
    // 获取信息
    async getInfo() {
      try {
        let res = await this.$api.getUserInfo({ token: this.token });
        this.userInfo = res.data;
        // 保存副本
        for (var key in this.userInfo) {
          this.infoCopy[key] = this.userInfo[key];
        }
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 退出登录
    async userLogout() {
      try {
        await this.$api.userLogout({ token: this.token });
        this.$store.dispatch("user/setLoginStatus", false); // 改变登录状态
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
    },

    // 提交修改
    async Submit() {
      if (!this.userInfo.avatar) {
        this.$message.error("头像不能为空╰(*°▽°*)╯");
        return;
      }
      if (!this.userInfo.username || this.userInfo.username.length > 10) {
        this.$message.error("用户昵称过长╰(*°▽°*)╯");
        return;
      }
      try {
        this.params.avatar = this.userInfo.avatar;
        this.params.token = this.token;
        this.params.username = this.userInfo.username;
        this.params.introduction = this.userInfo.introduction;
        await this.$api.changeUserInfo(this.params);
        this.$message.success("修改成功o(*￣▽￣*)o");
        window.location.reload();
      } catch (err) {
        this.$message.error(err);
      }
    },
  },
};
</script>

<style lang="scss">
#Profile {
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 60%;
    min-width: 350px;

    padding: 2rem;

    // 头像部分
    .avatar-container {
      display: flex;
      align-items: center;
    }
    .avatar-uploader .el-upload {
      margin-left: 0.5rem;
      margin-bottom: 1rem;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border-radius: 60px !important;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      border-radius: 60px !important;
    }
    .avatar-img {
      width: 120px;
      height: 120px;
    }
    // 删除图片蒙版
    .el-upload-item-delete {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      line-height: 120px;
      width: 120px;
      height: 120px;
      border-radius: 60px !important;
      z-index: 999;
    }

    // 昵称和介绍按钮部分
    .name,
    .introduction {
      width: 70%;
      height: 2.2rem;
      font-size: 14px;
      font-weight: 500 !important;
      border: 1px solid #ccc;
      outline: none;
      padding: 0.2rem;
      font-weight: bold;
      border-radius: 5px;
      margin-left: 0.5rem;
      margin-bottom: 1.3rem;
    
        text-overflow: ellipsis;
     

    }

    .btn {
      display: flex;
      justify-content: center;

      .el-button {
        margin: 0 1rem;
      }
    }
  }
}
</style>