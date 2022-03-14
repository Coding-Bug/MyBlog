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


/**
 * @method 根据文章评论
 * @param {number} article_id   
 * @param {number} page
 * @param {number} pageSize
 */
export const getArticleMessage  = (params)=>get(`/article/getMessageById`,params)

/**
 * @method 评论或者留言
 * @param {String} publishURL [请求路径]
 * @param {Object} params [参数对象]
 */
export const publish = (publishURL,params)=>post(publishURL,params)