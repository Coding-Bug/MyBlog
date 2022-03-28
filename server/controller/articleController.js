// 处理文章逻辑
const dao = require("../model/index");
const config = require('../config/config.default')
const article = require('../model/article');
const users = require('../model/users');
const message = require('../model/message')
const { ObjectId } = require("mongodb");


// // 插入测试用例
// let comment={
//     author_id:ObjectId('623abcec577189cb050fb3b2'),
//     create_time:213214324324,
//     content:'太棒了这头母猪',
//     like_ids:[ObjectId('623ff734cb769776f344bbaf'),ObjectId('623abcec577189cb050fb3b2')],
//     reply_ids:[ObjectId('623ff734cb769776f344bbaf')],
//     message_type:1 // 1:文章评论 2:博客留言 3:回复
// }
// let reply1={
//     author_id:ObjectId('623ff734cb769776f344bbaf'),
//     create_time:213214324324,
//     content:'确实是非常棒啊!',
//     like_ids:[ObjectId('623ff734cb769776f344bbaf'),ObjectId('623abcec577189cb050fb3b2')],
//     reply_ids:[ObjectId('623ff760cb769776f344bbb0')],
//     to_id:ObjectId('623abcec577189cb050fb3b2'),
//     message_type:3 // 1:文章评论 2:博客留言 3:回复
// }
// let reply2 = {
//     author_id:ObjectId('623ff760cb769776f344bbb0'),
//     create_time:213214324324,
//     content:'果然你也觉得棒',
//     like_ids:[],
//     reply_ids:[],
//     to_id:ObjectId('623ff734cb769776f344bbaf'),
//     message_type:3 // 1:文章评论 2:博客留言 3:回复
// }
// dao.insert({colName:message,data:comment})
// dao.insert({colName:message,data:reply1})
// dao.insert({colName:message,data:reply2})



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
                    cover: config.baseURL + elem.cover,
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

    },

    // 获取文章详细
    async getArticleByid(req, res, next) {
        try {
            const { article_id } = req.query
            // 增加该文章的点击量
            await dao.update({ colName: article, where: { article }, newdata: { $inc: { visited: 1 } } })


            // 获取该文章
            // 直接返回该文章，让前端自行处理
            let data = await dao.find({ colName: article, where: { article_id } })
            if (data.length != 0) {
                // 获取作者
                data = data[0]
                let aut = await dao.find({ colName: users, where: { _id: data.author_id } })

                // 添加的时候不能直接添加
                data._doc.author = aut[0].username
                data._doc.avatar = config.baseURL + aut[0].avatar
                // 返回数据
                res.send({
                    code: 200,
                    msg: '获取文章详情成功',
                    data
                })
            }
        } catch (err) {
            throw (err)
        }

    },

 

    // 给文章点赞
    async likeArticle(req,res,next){
        try{
            let {article_id} = req.body
            let user_id = req.info._id
            // 查看该用户是否已经为文章点赞
            let data =await dao.find({colName:article,where:{article_id,like_ids: { $elemMatch: { $eq: user_id }}}})
            
            // 如果已经点赞，则更新为未点赞并设置flag为false标识
            if(data.length!=0){
                // 从点赞中删除该用户
                await dao.update({colName:article,where:{article_id},newdata:{"$pull":{"like_ids":user_id}}})
                res.send({
                    code:200,
                    msg:'取消点赞',
                    flag:false
                })

            }else{
                // 从点赞中添加该用户
                await dao.update({colName:article,where:{article_id},newdata:{"$push":{"like_ids":user_id}}})
                res.send({
                    code:200,
                    msg:'点赞',
                    flag:true
                })
            }

        }catch(err){
            next(err)
        }
    }

}
