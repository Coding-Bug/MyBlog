// 储存文章信息
const { ObjectId } = require('mongodb')
const mongoose = require('./db')
const Schema = mongoose.Schema   // 用来创建集合

const schema = new Schema({
    title:{type:String,default:''}, // 标题
    cover:{type:String,default:''}, // 封面
    brief:{type:String,default:''}, // 简介
    content:{type:String,default:''}, // 内容
    author_id:{type:ObjectId},    // 作者id
    create_time:{type:Number,default:new Date().getTime()},  // 创建时间
    reply_ids:{type:Array,default:[]}, // 评论id
    like_ids:{type:Array,default:[]}, // 点赞用户id
    visited:{type:Number,default:0}, // 访问量
    tags:{type:Array,default:[]}, // 标签
    categorise:{type:Array,default:[]}, // 分类
    status:{type:Boolean,defaul:true} // 发布状态
})
module.exports = mongoose.model('article',schema)