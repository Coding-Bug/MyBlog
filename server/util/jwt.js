const jwt = require('jsonwebtoken')
const singkey = 'cjf_blog_jwtkey_sdfghds'

// 生成token
exports.setToken = function(username,userid){
    return new Promise((resolve,reject)=>{
        const token = jwt.sign({
            name:username,
            _id:userid
        },singkey,{expiresIn:'5h'})
        resolve(token)
    })
}

// 验证token
exports.verifyToken = function(token){
    return new Promise((resolve,reject)=>{
        let info = jwt.verify(token,singkey)
        resolve(info)
    })
}
