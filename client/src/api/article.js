import {get,post} from './request'


/**
 * @method 获取文章
 * @param {Object} params [查询参数对象]
 */
export const getArticle = (params)=> get(`/article/
getArticle
`,params)

/**
 * @method 获取文章详情
 * @param {number} article_id [文章对应的id]
 */

export const getDetail = (article_id)=>get(`/article/getArticleByid`,{article_id})
