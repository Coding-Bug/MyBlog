// 创建用户的集合

const mongoose = require('./db')
const Schema = mongoose.Schema   // 用来创建集合


const schema = new Schema({
    username:{type:String},
    password:{type:String},
    roleType:{type:Number}, // 1:普通人 2:管理员 3:已经拉黑
    introduction:{type:String},
    avatar:{type:String}, // 头像地址
    email:{type:String},

})

// 生成集合
module.exports = mongoose.model('users',schema)
