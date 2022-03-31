import {get,post} from './request'


/**
 * @method 发布文章
 */
export const publishArticle = (params)=>post('/admin/publishArticle')