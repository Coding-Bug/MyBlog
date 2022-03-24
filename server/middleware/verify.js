// 验证token的中间件

const {verifyToken} = require('../util/jwt')
module.exports={
     verify(req,res,next){
        let token = req.headers['authorization']
        verifyToken(token).then(info=>{
            if(info){
                console.log(info)
                req.info={
                    username:info.name,
                    _id:info._id
                }
                next()
            }else{
                // 身份认证失败
                next({
                    status:401,
                    body:{
                        code:401,
                        msg:'登录过期，请重新登录'
                    }
                })
            }
        },err=>{
            next({
                status:401,
                body:{
                    code:401,
                    msg:'无效的token'
                }
            })
        })
        
        
    }
}


