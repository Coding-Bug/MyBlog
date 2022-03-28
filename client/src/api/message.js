import {get,post} from './request'

/**
 * @method 点赞评论或留言
 * @param {String} likeURL [路径]
 * @param {Object} params [参数]
 */

export const likeMessage=(params)=>post('/message/likeMessage',params)

/**
 * @method 根据评论或者留言
 * @param {String} URL
 * @param {Object} params 
 */
 export const getMessage  = (params)=>get('/message/getMessage',params)

