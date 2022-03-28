import {get,post} from './request'

/**
 * @method 点赞评论或留言
 * @param {String} likeURL [路径]
 * @param {Object} params [参数]
 */

export const likeMessage=(params)=>post('/message/likeMessage',params)


