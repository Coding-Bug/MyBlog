
import {get,post} from './request'




/**
 * @method 获取用户留言
 * @param {number} page
 * @param {number} pageSize
 */
export const getMessage = (params)=>get('message/getMessage',params)