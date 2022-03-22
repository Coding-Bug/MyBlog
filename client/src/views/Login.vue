<template>
  <div id="Login">
    <el-form :model="userInfo" :rules="rules" ref="ruleForm" class="card">
      <el-form-item prop="username" v-show="status != 2">
        <el-input
          v-model="userInfo.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user-solid"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="userInfo.password"
          :placeholder="password_content[status]"
          type="password"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email" v-show="status != 0" class="email">
        <el-input v-model="userInfo.email" placeholder="email"></el-input>
        <el-button
          type="primary"
          @click="handleSendCode"
          :disabled="!canSend"
          >{{ codeMessage }}</el-button
        >
      </el-form-item>
      <el-form-item v-show="status != 0" prop="code">
        <el-input v-model="userInfo.code" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item class="submit">
        <!-- 登录的按钮 -->
        <el-button
          type="primary"
          class="login-submit"
          v-show="status == 0"
          @click="handleLogin"
          >登录</el-button
        >
        <!-- 注册按钮 -->
        <el-button
          type="primary"
          class="regester-submit"
          v-show="status == 1"
          @click.native="handleRegister"
        >
          注册
        </el-button>
        <!-- 修改密码按钮 -->
        <el-button type="primary" class="chage-submit" v-show="status == 2" @click="resetPassword">
          修改密码
        </el-button>
        <!-- 回到登录按钮 -->
        <el-button
          type="primary"
          class="back-to-login"
          v-show="status != 0"
          @click="
            () => {
              status = 0;
              resetForm();
            }
          "
        >
          返回
        </el-button>
      </el-form-item>

      <el-form-item class="fotter" v-show="status == 0">
        <span
          class="regester click"
          @click="
            () => {
              status = 1;
              resetForm();
            }
          "
          >注册账号</span
        ><span
          class="forget click"
          @click="
            () => {
              status = 2;
              resetForm();
            }
          "
          >忘记密码</span
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { throttle } from "@/utils/throttle";
export default {
  name: "Login",
  data() {
    return {
      // 用户信息
      userInfo: {
        username: "",
        password: "",
        email: "",
        code: "",
      },
      // 当前状态,0表示登录,1表示注册,2表示修改密码
      status: 0,
      // 验证码按钮提示信息
      codeMessage: "发送验证码",
      // 发送验证码按钮是否可点击
      canSend: true,
      // 定时器
      timer: null,
      // 定时时间
      countTime: 0,
      // 密码框提示
      password_content: ["请输入密码", "请输入密码", "请输入新密码"],

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "用户名长度过长", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, message: "密码长度不小于6", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6,max:6, message: "请输入正确的验证码", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    // 登录节流
    handleLogin() {
      return throttle(this.userLogin, 3000);
    },
  },
  mounted() {
    // 检查验证码按钮状态
    if (localStorage.getItem("skylade_counter") >= 0) {
      this.countDown();
    }
  },
  methods: {
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    // 登录
    async userLogin() {
      // 对表单的用户名和密码进行校验
      try {
        this.$refs.ruleForm.validateField(["username", "password"], (err) => {
          if (err) {
            throw err;
          }
        });
        // 表单验证成功,发送登录请求
        let res = await this.$api.userLogin(this.userInfo);
        this.$message.success(`${res.data.username} 欢迎回来o(^▽^)o  请稍等...`);
        // 保存用户信息
        this.$store.dispatch("user/saveUser", res.data);
        // 修改登陆状态
        this.$store.dispatch("user/setLoginStatus", true);
        // 保存token
        this.$store.dispatch("user/setToken", res.token);
        // 返回上一级路由
        setTimeout(() => {
          this.$router.back();
        }, 200);
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 发送验证码
    async handleSendCode(e) {
      try {
        this.$refs.ruleForm.validateField(["email"], (err) => {
          if (err) {
            throw err;
          }
        });
        await this.$api.sendEmail({ email: this.userInfo.email });
        // 设置过期失效
        this.$message.success("验证码已发送，请查收o(^▽^)o");
        localStorage.setItem("skylade_counter", 60);
        this.countDown();
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 设置不可发送验证码
    countDown() {
      // 设计倒计时
      this.canSend = false;
      this.countTime = localStorage.getItem("skylade_counter");
      this.codeMessage = `重新发送 ${this.countTime}s`;
      this.timer = setInterval(() => {
        this.countTime--;
        if (this.countTime < 0) {
          clearInterval(this.timer);
          this.codeMessage = "发送验证码";
          this.canSend = true;
        } else {
          this.codeMessage = `重新发送 ${this.countTime}s`;
          localStorage.setItem("skylade_counter", this.countTime);
        }
      }, 1000);
    },
    // 注册
    async handleRegister() {
      try {
        this.$refs.ruleForm.validateField(
          ["username", "passwaord", "email", "code"],
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
        let res = await this.$api.userRegister(this.userInfo);
        this.$message.success("注册成功，快去登录吧o(^▽^)o");
        setTimeout(() => {
          this.status = 0;
          this.resetForm();
        }, 200);
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 重置密码
    async resetPassword() {
      try {
        this.$refs.ruleForm.validateField(
          ["passwaord", "email", "code"],
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
        await this.$api.userResetPassword(this.userInfo);
        this.$message.success("密码修改成功，快去登录吧o(^▽^)o");
        setTimeout(() => {
          
          this.status = 0;
          this.resetForm();
          
        }, 200);
      } catch (err) {
        this.$message.error(err)
      }
    },
  },
};
</script>

<style lang='scss'>
#Login {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;
  .el-form {
    width: 50%;
    min-width: 350px;
    padding: 1.2rem 1.2rem 0 1.2rem;
    border-radius: 6px;
    .email {
      .el-form-item__content {
        .el-button {
          padding-right: 2px;
          padding-left: 2px;
          float: right;
        }
        .el-input {
          width: 70%;
        }
      }
    }
    .submit {
      text-align: center;
      .login-submit {
        width: 100%;
      }
      .regester-submit,
      .chage-submit {
        margin-right: 20px;
      }
    }
    .fotter {
      color: #ccc;
      text-align: center;
      margin-bottom: 2px;
      span {
        margin: 0 40px;
        user-select: none;
        cursor: pointer;
      }
    }
  }
}
</style>