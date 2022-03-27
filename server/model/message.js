// 评论模块
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema   // 用来创建集合

const schema = new Schema({
    author_id:{type:ObjectId}, // 评论者
    article_id:{type:ObjectId,default:''},// 保存是哪条文章的主评论
    create_time:{type:Number,default:0}, // 评论时间
    content:{type:String,default:0}, // 内容
    like_ids:{type:Array,default:[]}, // 点赞者
    reply_ids:{type:Array,default:[]},// 回复的id集合
    to_id:{type:ObjectId}, // 标记回复的评论
    message_type:{type:Number,default:1}  // 1:文章评论 2:博客留言 3:回复
})

module.exports = mongoose.model('message',schema)

