// 储存验证码的
const mongoose = require('./db')
const Schema = mongoose.Schema   // 用来创建集合

const schema = new Schema({
    e_mail:{type:String},
    code:{type:String}
})
module.exports = mongoose.model('codes',schema)