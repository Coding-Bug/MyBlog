// 处理文章逻辑
const dao = require("../model/index");
const config = require('../config/config.default')
const article = require('../model/article');
const users = require('../model/users')
module.exports = {
    // 用户查询文章列表操作
    async getArticle(req, res, next) {
        try {


            let { page, pageSize, seacher, tag, category } = req.query
            page = parseInt(page)
            pageSize = parseInt(pageSize)

            // 构造查询条件
            let where
            if (seacher) {
                // 正则查询
                where = { search: { $elemMatch: { $regex: seacher } } }
            } else if (tag) {
                where = { tag: { $elemMatch: { $eq: tag } } }
            } else if (category) {
                where = { category: { $elemMatch: { $eq: category } } }
            }
            // 分页条件
            let setting = { limit: pageSize, skip: (page - 1) * pageSize }

            // 获取文章总数
            let count = await dao.count({ colName: article, where })
            let data = []
            if (count != 0) {
                data = await dao.find({ colName: article, where, setting })
            }
            // 返回数据
            // console.log('开始返回数据')
            // console.log(data)
            let resData = []
            for (let i = 0; i < data.length; ++i) {
                // 获取作者
                let elem = data[i]
                // console.log(elem)
                let aut = await users.find({ colName: users, where: { _id: elem.author_id } })
                // console.log(aut)
                let author = aut[0].username
                let avatar = config.baseURL + aut[0].avatar
                // console.log(author,avatar)
                // console.log(elem)
                resData.push({
                    article_id: elem._id,
                    cover: elem.cover,
                    title: elem.title,
                    brief: elem.brief,
                    author,
                    avatar,
                    create_time: elem.create_time,
                    replyCount: elem.reply_ids.length, // 回复数量
                    likeCount: elem.like_ids.length,
                    visited: elem.visited,
                    tags: elem.tags // 记得改前端
                })
            }
            res.send({
                code: 200,
                msg: '获取文章列表成功',
                count,
                data: resData
            })
            return
            // next()
        } catch (err) {
            next(err)
            console.log(err)
        }

    }
}
