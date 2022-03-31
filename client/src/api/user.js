
import {get,post} from './request'



/**
 * @method 登录
 * @param  {Object} userInfo
 */

export const userLogin = (params)=>post('/users/login',params)

/**
 * @method 发送邮箱接口
 * @param {Object} email
 */
export const sendEmail = (params)=>post('/users/sendEmail',params)

/**
 * @method 注册
 * @param {Object} userInfo
 */
export const userRegister =(userInfo)=>post('/users/register',userInfo)

/**
 * @method 修改密码
 * @param {Object} userInfo
 */
export const userResetPassword = (userInfo)=>post('/users/resetPassword',userInfo)



/**
 * @method 获取用户信息
 */

export const getUserInfo  = ()=>get('/users/getInfo')

/**
 * @method 更新用户信息
 * @param {Object} params 用户信息以及token
 */

export const changeUserInfo=(params)=>post('/users/changeInfo',params)

/**
 * @method  向后端请求判断是否管理员
 */
 export const isAdmin = ()=>get('/users/isAdmin')