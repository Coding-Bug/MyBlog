const dao = require('../model/index')
const blog  = require('../model/blog')



module.exports = {
    async getBloginfo(req,res,next){
        try{
           let data = await dao.find({colName:blog})
           let resdata = {}
           resdata.day = Math.floor(((new Date()).getTime()-data[0].create_time)/(24 * 3600 * 1000))
           resdata.count = data[0].count
           resdata.github = data[0].github
           res.send({
               code:200,
               msg:'获取博客详情成功',
               data:resdata
           })
           
        }catch(err){
            next(err)
        }
    }
}