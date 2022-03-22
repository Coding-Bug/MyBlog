// 封装用户接口逻辑
const dao = require("../model/index");
const users = require("../model/users");
const {setToken,verifyToken} = require("../util/jwt")
module.exports = {
  async userLogin(req, res) {
    const { username, password } = req.body;
    try {
      let data = await dao.find({ colName: users, where: { username } });
      // 用户名不存在
      if (data.length == 0) {
        throw ({
          status: 401,
          body: {
            code: 401,
            msg: "用户名不存在",
            data: {},
          }
        })
      }
      data = await dao.find({ colName: users, where: { username,password } });
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
      let token = await setToken(data[0].username,data[0]._id)
      console.log('aaa')
      res.send({
        code:200,
        msg:'登录成功',
        token,
        data:{
          username:data[0].username,
          avatar:data[0].avatar,
        }
      })


    } catch (err) {
      if (err.status && err.body) {
        res.status(err.status).send(err.body);
      }
    }
  }
}