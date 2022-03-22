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
 * @method 获取归档
*/
export const getArchive=()=>get(`/article/getArchive`)

/**
 * @method 获取分类
 */

 export const getCategory = ()=>get(`/article/getCategory`)

 /** 
  * @method 获取标签
 */
export const getTag = ()=>get(`/article/getTag`)

/**
 * @method 根据评论或者留言
 * @param {String} URL
 * @param {Object} params 
 */
export const getMessage  = (URL,params)=>get(URL,params)

/**
 * @method 评论或者留言或者回复
 * @param {String} publishURL [请求路径]
 * @param {Object} params [参数对象]
 */
export const publishOrReply = (publishURL,params)=>post(publishURL,params)

/**
 * @method 点赞评论或留言
 * @param {String} likeURL [路径]
 * @param {Object} params [参数]
 */
export const likeMessage=(likeURL,params)=>post(likeURL,params)


/**
 * @method 点赞文章
 * @param {Object} params [参数]
 */
export const likeArticle =(params)=>post('/article/likeArticle',params)


/**
 * @method 获取博客相关
 */
 export const getAbout = ()=>get('/blog/getAbout')