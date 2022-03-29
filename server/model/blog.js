// 储存博客信息
const mongoose = require('./db')
const Schema = mongoose.Schema   // 用来创建集合

const schema = new Schema({
    create_time:{type:Number,default: (new Date()).getTime()}, // 创建时间
    count:{type:Number,default:88}, // 文章总数
    github:{type:String,default:'https://github.com/Coding-Bug'}

})
module.exports = mongoose.model('blog',schema)