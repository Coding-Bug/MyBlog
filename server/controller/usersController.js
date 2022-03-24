// 封装用户接口逻辑


const dao = require("../model/index");
const users = require("../model/users");
const codes = require('../model/codes')
const { setToken, verifyToken } = require("../util/jwt")
// 自己的邮箱
const { emailAuth } = require('../config/config.default')

// 邮件发送模块
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { where } = require("../model/users");

module.exports = {
  async userLogin(req, res) {
    const { username, password } = req.body;
    try {
      let data = await dao.find({ colName: users, where: { $or: [{ username }, { email: username }] } });
      // 用户名不存在
      if (data.length == 0) {
        throw ({
          status: 401,
          body: {
            code: 401,
            msg: "用户不存在",
            data: {},
          }
        })
      }
      data = await dao.find({ colName: users, where: { $or: [{ username, password }, { email: username, password }] } });
      // 密码错误
      if (data.length == 0) {
        throw ({
          status: 401,
          body: {
            code: 401,
            msg: "密码错误",
            data: {},
          }
        })
      }

      // 如果已经被拉入黑名单
      if (data[0].roleType === 3) {
        throw ({
          status: 403,
          body: {
            code: 403,
            msg: "你已被拉入黑名单",
            data: {},
          }
        })
      }
      // 登录成功
      // 生成token
      let token = await setToken(data[0].username, data[0]._id)
      console.log('aaa')
      res.send({
        code: 200,
        msg: '登录成功',
        token,
        data: {
          username: data[0].username,
          avatar: data[0].avatar,
        }
      })


    } catch (err) {
      if (err.status && err.body) {
        res.status(err.status).send(err.body);
      }
    }
  },

  /**
   * 发送邮件
   */
  async sendEmail(req, res) {

    // 邮件发送人配置
    const transport = nodemailer.createTransport(
      {
        host: "smtp.qq.com",
        port: 587,

        auth: emailAuth
      }
    )
    /*生成验证码*/
    const randomFns = () => {
      // 生成6位随机数
      let code = ""
      for (let i = 0; i < 6; ++i) {
        code += parseInt(Math.random() * 10)
      }
      return code
    }

    /*发送验证码*/
    let EMAIL = req.body.email
    let code = randomFns()
    try {
      await transport.sendMail(
        {
          from: '1752552274@qq.com',
          to: EMAIL,
          subject: "验证您的电子邮件", // 标题
          html: `
        <p>您好！</p>
        <p>您正在注册skyblade的博客社区账号</p>
        <p>您的验证码是<strong style="color: #ff4e2a;">${code}</strong></p>
        <p>***该验证码5分钟内有效***</p>
        `
        }
      )

      /*储存验证码到数据库中*/
      const e_mail = EMAIL

      // 先把之前的验证码全删除
      await dao.delete({
        colName: codes,
        where: { e_mail },
      })

      await dao.insert({
        colName: codes,
        data: { e_mail, code }
      })

      setTimeout(async () => {
        await dao.delete({ colName: codes, where: { e_mail, code } })
      }, 1000 * 60 * 5)

      res.send({ code: 200, msg: '邮件发送成功' })
    } catch (err) {
      console.log(err)
      res.status(500).send({ code: 500, msg: '邮件发送失败' })
    }
  },

  /**
   *用户注册
   */
  async userRgester(req, res) {
    const { username, password, email, code } = req.body
    try {
      let data = await dao.find({ colName: users, where: { username } })
      console.log(data)
      if (data.length != 0) {
        throw (
          {
            status: 403,
            body: {
              msg: '用户名已存在',
              code: 403

            }

          }
        )
      }

      data = await dao.find({ colName: codes, where: { e_mail: email, code } })
      if (data.length == 0) {
        throw (
          {
            status: 403,
            body: {
              msg: '验证码错误',
              code: 403

            }
          }
        )
      }

      // 保存用户信息
      await dao.insert({ colName: users, data: { email: email, username, password, roleType: 1 } })

      // 清除验证码
      dao.delete({ colName: codes, where: { email } })
      res.send({ code: 200, mag: '注册成功' })

    } catch (err) {
      if (err.status && err.body) {
        res.status(err.status).send(err.body)
      } else {
        console.log(err)
      }
    }
  },

  /**
   * 重置密码
   */
  async resetPassword(req, res) {
    const { email, code, password } = req.body
    try {
      let data1 = await dao.find({ colName: users, where: { email } }) // 获取用户
      let data2 = await dao.find({ colName: codes, where: { email } }) // 检查验证码
      if (data1.length == 0) {
        throw ({
          status: 403,
          body: {
            msg: '邮箱未注册',
            code: 403

          }
        })
      }

      if (data2.length == 0) {
        throw ({
          status: 403,
          body: {
            msg: '验证码错误',
            code: 403

          }
        })
      }

      // 重置密码
      await dao.update({ colName: users, where: { email }, newdata: { $set: { password } } })
      // 清除验证码
      dao.delete({ colName: codes, where: { email } })

      // 返回
      console.log('成功')
      res.send({ code: 200, msg: '密码修改成功' })
    } catch (err) {
      if (err.status && err.body) {
        res.status(err.status).send(err.body)
      } else {
        console.log(err)
      }
    }
  },


  /**
   * 获取用户信息
   */
  async getUserInfo(req, res) {
    try {
      // 获取用户信息

      let data = await dao.find({ colName: users, where: { _id: req.info._id } })
      if (data.length == 0) {
        throw ({
          status: 401,
          body: {
            code: 401,
            msg: '用户未找到，请重新登陆'
          }
        })
      }
      res.send({
        code: 200,
        msg: '获取成功',
        data: {
          avatar: data[0].avatar,
          username: data[0].username,
          introduction: data[0].introduction || '空空如也｜−・;）'
        }

      }
      )
    } catch (err) {
      if (err.status && err.body) {
        res.status(err.status).send(err.body)
      } else {
        console.log(err)
      }

    }



  }
}