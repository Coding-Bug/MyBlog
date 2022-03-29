// 处理留言评论逻辑
const dao = require("../model/index");
const config = require('../config/config.default')
const article = require('../model/article');
const users = require('../model/users');
const message = require('../model/message');
const xss = require('xss')
const { ObjectId } = require("mongodb");

module.exports = {
    // 获取评论或者留言
    async getMessage(req, res, next) {
        try {
            let message_set = []  // 最终返回的结果数组

            let { article_id, page, pageSize } = req.query
            page = parseInt(page)
            pageSize = parseInt(pageSize)

            let where = {}
            // 如果是评论模块
            if (article_id) {
                where = {
                    article_id
                }
            } else {  // 如果是留言模块
                where = {
                    message_type: 2
                }
            }
            let count = await dao.count({ colName: message, where })
            if (count != 0) {
                // 获取主评论数组
                let data = await dao.find({ colName: message, where, setting: { limit: pageSize, skip: (page - 1) * pageSize } })

                // 为每条主评论的返回结果做处理并获取处理主评论的回复
                for (let i = 0; i < data.length; ++i) {
                    let temp = {} // 保存这项评论

                    // 获取用户
                    let aut = await dao.find({ colName: users, where: { _id: data[i].author_id } })

                    // 保存主评论的基本信息
                    temp.message_id = data[i]._id
                    temp.avatar = config.baseURL + aut[0].avatar
                    temp.author = aut[0].username
                    temp.create_time = data[i].create_time
                    temp.content = data[i].content
                    temp.like_ids = data[i].like_ids
                    temp.replyAcess = []
                    // 获取主评论的回复

                    for (let j = 0; j < data[i].reply_ids.length; ++j) {
                        // 这项回复对应的id
                        let id = data[i].reply_ids[j]
                        let temp_reply = {} // 保存主评论的回复

                        // 获取回复
                        let reply = await dao.find({ colName: message, where: { _id: id } })

                        reply = reply[0]
                        console.log(reply)

                        // 获取回复者
                        let replyer = await dao.find({ colName: users, where: { _id: reply.author_id } })
                                
                        // 获取回复对象信息
                        console.log('****************')
                        console.log(reply.to_id)
                        let reply_to = await dao.find({ colName: message, where: { _id: reply.to_id } })
                        console.log(reply_to)
                        let reply_to_aut = await dao.find({ colName: users, where: { _id: reply_to[0].author_id } })


                        temp_reply.reply_id = reply._id
                        temp_reply.avatar = config.baseURL + replyer[0].avatar
                        temp_reply.author = replyer[0].username
                        temp_reply.create_time = reply.create_time
                        temp_reply.content = reply.content
                        temp_reply.like_ids = reply.like_ids
                        temp_reply.reply_name = reply_to_aut[0].username

                        // 加入到子评论
                        temp.replyAcess.push(temp_reply)
                    }
                    message_set.push(temp)
                }

            }
            res.send({
                code: 200,
                msg: '获取评论成功',
                count,
                data: message_set
            })
        } catch (err) {
            next(err)
        }


    },
    // 给评论或留言点赞
    async likeMessage(req, res, next) {
        try {
            let { message_id } = req.body
            let user_id = req.info._id
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
    },

    // 发布评论或者留言
    async leaveMessage(req, res, next) {
        try {
            // 获取前端数据
            let { content, article_id, message_id, to_id } = req.body
            let user_id = req.info._id
            // 获取用户信息
            let aut = await dao.find({ colName: users, where: { _id: user_id } })
            if (aut.length == 0) {
                throw ("用户不存在")
            }

            let redata = {}   // 需要返回的数据
            // xss过滤
            content = xss(content)
            let newdata = {} // 评论数据库对象
            newdata.author_id = user_id
            newdata.create_time = new Date().getTime()
            newdata.content = content


            // 判断是什么评论
            if (message_id) { // 是回复   ----------- 成功
                newdata.to_id = to_id
                newdata.message_type = 3
                // 插入数据库
                let data = await dao.insert({ colName: message, data: newdata })
                // 添加的评论的_id添加到message_id评论中
                await dao.update({
                    colName: message, where: { _id: message_id }, newdata: {
                        "$push": { "reply_ids": data[0]._id }
                    }
                })

                // 返回插入的回复
                redata.reply_id = data[0]._id
                redata.avatar = config.baseURL + aut[0].avatar
                redata.author = aut[0].username
                redata.create_time = newdata.create_time
                redata.content = newdata.content
                redata.like_ids = []
                // 获取评论对象名字
                redata.reply_name = (await dao.find({ colName: users, where: { _id: (await dao.find({ colName: message, where: { _id: message_id } }))[0].author_id } }))[0].username

            } else {
                let data
                if (article_id) {// 是文章评论 -------------已成功
                    newdata.message_type = 1
                    newdata.article_id = article_id
                    // 将评论插入数据库 
                    data = await dao.insert({ colName: message, data: newdata })
                    // 向文章中添加该评论
                    await dao.update({
                        colName: article, where: { _id: article_id }, newdata: {
                            "$push": { "reply_ids": data[0]._id }
                        }
                    })
                } else {   // 是博客留言   -- 已成功
                    // 直接插入数据库
                    newdata.message_type = 2
                    data = await dao.insert({ colName: message, data: newdata })
                }
                // 返回评论数据
                redata.message_id = data[0]._id
                redata.avatar = config.baseURL + aut[0].avatar
                redata.author = aut[0].username
                redata.create_time = newdata.create_time
                redata.content = newdata.content
                redata.like_ids = []
                redata.replyAcess = []
            }
            res.send({
                code: 200,
                msg: '评论成功',
                data: redata
            })
        } catch (err) {
            next(err)
        }





    }
}
