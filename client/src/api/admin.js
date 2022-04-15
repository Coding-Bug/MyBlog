import {get,post} from './request'


/**
 * @method 发布文章
 */
export const publishArticle = (params)=>post('/admin/publishArticle',params)

/**
 * @method 获取文章
 */

export const getAdminArticle = (params)=>get('/admin/getAdminArticle',params)