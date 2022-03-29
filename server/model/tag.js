// 储存标签信息
const mongoose = require('./db')
const Schema = mongoose.Schema   // 用来创建集合

const schema = new Schema({
      tag_name:{type:String,default:''}, // 标签名
      tag_count:{type:Number,default:0} // 标签数量
})
module.exports = mongoose.model('tag',schema)