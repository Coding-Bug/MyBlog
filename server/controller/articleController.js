// 处理文章逻辑
const dao = require("../model/index");
const config = require('../config/config.default')
const article = require('../model/article');
const users = require('../model/users');
const message = require('../model/message')
const { ObjectId } = require("mongodb");
const categoty = require('../model/category')
const tag = require('../model/tag')
const formidable = require('formidable')
const { insertTag, insertCat } = require('../util/insertTagorCat')
const fs = require('fs')
const path = require('path')


module.exports = {
    // 用户查询文章列表操作
    async getArticle(req, res, next) {
        try {
            let { page, pageSize, search, tag, category } = req.query
            page = parseInt(page)
            pageSize = parseInt(pageSize)
            // 构造查询条件
            let where ={}
            if (search) {
                // 正则查询
                where = { title:  {$regex: search } }
            } else if (tag) {
                where = { tags: { $elemMatch: { $eq: tag } } }
            } else if (category) {
                where = { categorise: { $elemMatch: { $eq: category } } }
            }
            // 获取的是发布了的文章
            where.status = true
            // 分页条件
            let setting = { limit: pageSize, skip: (page - 1) * pageSize, sort: { create_time: -1 } }

            // 获取文章总数
            let count = await dao.count({ colName: article, where })
            let data = []
            if (count != 0) {
                data = await dao.find({ colName: article, where, setting })

            }
            // 返回数据
            let resData = []
            for (let i = 0; i < data.length; ++i) {
                // 获取作者
                let elem = data[i]
                let aut = await users.find({ colName: users, where: { _id: elem.author_id } })
                let author = aut[0].username
                let avatar = config.baseURL + aut[0].avatar
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
            await dao.update({ colName: article, where: { _id: article_id }, newdata: { $inc: { visited: 1 } } })


            // 获取该文章
            // 直接返回该文章，让前端自行处理
            let data = await dao.find({ colName: article, where: { _id: article_id } })
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
    async likeArticle(req, res, next) {
        try {
            let { article_id } = req.body
            let user_id = req.info._id
            // 查看该用户是否已经为文章点赞
            let data = await dao.find({ colName: article, where: { article_id, like_ids: { $elemMatch: { $eq: user_id } } } })

            // 如果已经点赞，则更新为未点赞并设置flag为false标识
            if (data.length != 0) {
                // 从点赞中删除该用户
                await dao.update({ colName: article, where: { article_id }, newdata: { "$pull": { "like_ids": user_id } } })
                res.send({
                    code: 200,
                    msg: '取消点赞',
                    flag: false
                })

            } else {
                // 从点赞中添加该用户
                await dao.update({ colName: article, where: { article_id }, newdata: { "$push": { "like_ids": user_id } } })
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

    // 获取文章归档
    async getArchive(req, res, next) {
        try {
            let data = await dao.find({ colName: article })
            let count = data.length
            let resdata = []
            for (let i = 0; i < data.length; ++i) {
                let tmp = {}
                tmp.article_id = data[i]._id
                tmp.createTime = data[i].create_time
                tmp.title = data[i].title
                resdata.push(tmp)
            }
            res.send({
                code: 200,
                mas: '获取归档成功',
                count,
                data: resdata
            })
        } catch (err) {
            next(err)
        }
    },

    // 获取所有分类
    async getCategory(req, res, next) {
        try {
            let resdata = []
            let data = await dao.find({ colName: categoty })
            for (let i = 0; i < data.length; ++i) {
                let tmp = {}
                tmp.category_id = data[i]._id
                tmp.cat_name = data[i].cat_name
                tmp.cat_num = data[i].cat_count
                resdata.push(tmp)
            }

            res.send({
                code: 200,
                msg: '获取标签成功',
                data: resdata
            })



        } catch (err) {
            next(err)
        }
    },

    // 获取所有标签
    async getTag(req, res, next) {
        try {
            let resdata = []
            let data = await dao.find({ colName: tag })
            for (let i = 0; i < data.length; ++i) {
                let tmp = {}
                tmp.tag_id = data[i]._id
                tmp.tag_name = data[i].tag_name
                tmp.tag_num = data[i].tag_count
                resdata.push(tmp)
            }
            res.send({
                code: 200,
                msg: '获取标签成功',
                data: resdata
            })

        } catch (err) {
            next(err)
        }
    },

    // 发布文章
    async publishArticle(req, res, next) {
        try {
            // 创建表单对象解析表单
            const form = new formidable.IncomingForm()
            // 配置文件上传路径
            let coverPath = path.join(__dirname, '../public/images/article')
            form.uploadDir = coverPath
            // 保留文件拓展名
            form.keepExtensions = true

            // 解析表单
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    throw (err)
                }
                // 要插入的对象
                let data = {}
                data.title = fields.title
                data.status = true
                data.brief = fields.brief
                data.content = fields.content
                data.author_id = req.info._id
                data.createTime = (new Date()).getTime()
                // 处理标签和分类
                data.tags = []
                if (fields.tag1 != "") {
                    data.tags.push(fields.tag1)
                    await insertTag(fields.tag1)

                }
                if (fields.tag2 != "") {
                    data.tags.push(fields.tag2)
                    await insertTag(fields.tag2)
                }
                if (fields.tag3 != "") {
                    data.tags.push(fields.tag3)
                    await insertTag(fields.tag3)
                }
                if (fields.category != "") {
                    data.categorise = [fields.category]
                    await insertCat(fields.category)
                }


                // 将数据先插入数据库中
                data = await dao.insert({ colName: article, data})
                data = data[0]

                // 如果有上传封面
                if (files.cover) {
                    let oldPath = files.cover.path
                    let newPath = coverPath + '/' + data._id + '.jpg'
                    console.log(oldPath,newPath)
                    fs.rename(oldPath, newPath, async (err) => {
                        if (err) {
                            throw (err)
                        }
                        // 将照片路径保存到数据库中
                        await dao.update({ colName: article, where: { _id: data._id }, newdata: { cover: newPath.split('public')[1] } })
                    })

                } else {
                    // 如果没有封面，将默认文章封面路径存到数据库
                    await dao.update({ colName: article, where: { _id: data._id }, newdata: { cover: config.defaultCover } })
                }

                res.send({
                    code: 200,
                    msg: '文章发布成功'
                })

            })

        } catch (err) {
            next(err)
        }
    },

    // 管理员获取文章列表
    async getAdminArticle(req,res,next){
        try {
            let { page, pageSize, search} = req.query
            page = parseInt(page)
            pageSize = parseInt(pageSize)
            // 构造查询条件
            let where ={}
            if (search) {
                // 正则查询
                where = { title: { $regex: search } }
            }
            // 分页条件
            let setting = { limit: pageSize, skip: (page - 1) * pageSize, sort: { create_time: -1 } }

            // 获取文章总数
            let count = await dao.count({ colName: article, where })
            let data = []
            if (count != 0) {
                data = await dao.find({ colName: article, where, setting })
                data.forEach((val,index,data)=>{
                    
                    data[index].cover = config.baseURL+data[index].cover
                })
            }
            res.send({
                code: 200,
                msg: '获取文章列表成功',
                count,
                data
            })
        } catch (err) {
            next(err)
        }


    }
}
