const dao = require('../model/index')
const users = require('../model/users')

/**
 * @method 进行管理员判断拦截
 */
module.exports= async function verifyAdmin(req,res,next){
    try{
        let data = await dao.find({colName:users,where:{_id:req.info._id}})
        // 是管理员则放行
        if(data[0].roleType===2){
            next()
        }else{
            res.status(403).send({
                code:403,
                msg:'无操作权限！'
            })
        }
    }catch(err){
        next(err)
    }
}