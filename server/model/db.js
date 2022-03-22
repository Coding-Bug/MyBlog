// 连接mongodb
const {dbURL} = require('../config/config.default') 
const mongoose = require('mongoose')
mongoose.connect(dbURL,{
    useUnifiedTopology: true
})
let connection = mongoose.connection
// 连接成功
connection.on("connected",()=>{
    console.log('connect ok')
})
// 未连接
connection.on("disconnected",()=>{
    console.log('connect disconnected')
})

// 异常
connection.on("error",()=>{
    console.log("connect error")
}) 


module.exports = mongoose
