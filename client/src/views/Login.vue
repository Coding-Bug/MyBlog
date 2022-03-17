<template>
  <div id="Login">
    <el-form :model="userInfo" :rules="rules" ref="ruleForm" class="card">
      <el-form-item prop="username" v-if="status != 2">
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
      <el-form-item prop="email" v-if="status != 0" class="email">
        <el-input v-model="userInfo.email" placeholder="email"></el-input>
        <el-button type="primary">发送验证码</el-button>
      </el-form-item>
      <el-form-item v-if="status != 0">
        <el-input v-model="code" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item class="submit">
        <!-- 登录的按钮 -->
        <el-button
          type="primary"
          class="login-submit"
          v-if="status == 0"
          @click="handleLogin"
          >登录</el-button
        >
        <!-- 注册按钮 -->
        <el-button type="primary" class="regester-submit" v-if="status == 1">
          注册
        </el-button>
        <!-- 修改密码按钮 -->
        <el-button type="primary" class="chage-submit" v-if="status == 2">
          修改密码
        </el-button>
        <!-- 回到登录按钮 -->
        <el-button
          type="primary"
          class="back-to-login"
          v-if="status != 0"
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

      <el-form-item class="fotter" v-if="status == 0">
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
      },
      // 当前状态,0表示登录,1表示注册,2表示修改密码
      status: 0,
      // 验证码
      code: "",
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
      },
    };
  },
  computed: {
    // 登录节流
    handleLogin() {
      return throttle(this.userLogin, 3000);
    },
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
        this.$refs.ruleForm.validateField(
          ["username", "password"],
           (err) => {
            if (err) {
              throw err;
            }
          }
        );
        // 表单验证成功,发送登录请求
        let res = await this.$api.userLogin(this.userInfo)

        this.$message.success(
            `${res.data.name} 欢迎回来o(^▽^)o  请稍等...`
        )
        // 保存用户信息
        this.$store.dispatch('user/saveUser',res.data)
        // 修改登陆状态
        this.$store.dispatch('user/setLoginStatus',true)
        // 保存token
        this.$store.dispatch('user/setToken',res.token)
        // 返回上一级路由
        setTimeout(()=>{
            this.$router.back()
        },2000)
      } catch (err) {console.log(err)}
    },
  },
};
</script>

<style lang='scss'>
#Login {
  display: flex;
  justify-content: center;
  align-items: center;
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