// 处理留言评论逻辑
const dao = require("../model/index");
const config = require('../config/config.default')
const article = require('../model/article');
const users = require('../model/users');
const message = require('../model/message');
const { ObjectId } = require("mongodb");

module.exports = {
    // 给评论或者子评论点赞
    async likeMessage(req, res, next) {
        try {
            let { message_id } = req.body
            let user_id =  req.info._id
            // 查询该用户有没有为该评论点赞
            let Message = await dao.find({ colName: message, where: { _id: message_id, like_ids: { $elemMatch: { $eq: user_id } } } })
            // 已经点过赞了，则取消
            if (Message.length != 0) {
                // 从点赞中删除该用户
                await dao.update({ colName: message, where: { _id: message_id }, newdata: { "$pull": { "like_ids": user_id } } })
                res.send({
                    code: 200,
                    msg: '取消点赞',
                    flag: false
                })

            } else {
                // 从点赞中添加该用户
                await dao.update({ colName: message, where: { _id: message_id }, newdata: { "$push": { "like_ids": user_id } } })
                res.send({
                    code: 200,
                    msg: '点赞',
                    flag: true
                })
            }
        } catch (err) {
            next(err)
        }
    }
}
