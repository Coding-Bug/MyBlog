const dao = require('../model/index')
const tag = require('../model/tag')
const category = require('../model/category')

// 处理标签
module.exports = {
    // 添加标签的逻辑
    insertTag(name) {
        return new Promise( async(resolve, reject) => {
            let data = await dao.find({ colName: tag, where: { tag_name: name } })
            if (data.length == 0) {
                // 没有就新增
                await dao.insert({ colName: tag, data: { tag_name: name, tag_count: 1 } })
            } else {
                // 有就修改数量
                await dao.update({ colName: tag, data: { tag_name: name }, newdata: { $inc: { tag_count: 1 } } })
            }
            resolve()
        })

    },

    // 添加分类的逻辑
    insertCat(name){
        return new Promise(async  (resolve, reject) => {
            let data = await dao.find({ colName: category, where: { cat_name: name } })
            if (data.length == 0) {
                // 没有就新增
                await dao.insert({ colName: category, data: { cat_name: name, cat_count: 1 } })

            } else {
                // 有就修改数量
                await dao.update({ colName: category, data: { cat_name: name }, newdata: { $inc: { cat_count: 1 } } })
            }
            resolve()

        })
    }


}
