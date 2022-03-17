
import {get,post} from './request'



/**
 * @method 登录
 * @param  {Object} userInfo
 */

export const userLogin = (params)=>post('/users/login',params)