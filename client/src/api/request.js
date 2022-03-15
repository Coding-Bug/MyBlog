// 封装axios

import axios from "axios";
import { Message } from "element-ui";
import store from '../store'
import router from '../router'
// 配置axios(进行全局配置)
axios.defaults.baseURL = "http://127.0.0.1:4523/mock/697537";
axios.defaults.withCredentials = true; // 跨域也发送cookie灯
axios.defaults.crossDmain = true; // 允许跨域
axios.defaults.timeout = 4000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 判断token,加上token，一次把所有的都加上
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 相应拦截器
axios.interceptors.response.use(
    // 2**才会进入response
    response=>{
        if(response.status === 200){
            return Promise.resolve(response)
        }else {  // 如果不是200,就返回错误的promise
            return Promise.reject(response)
        }

    },
    error=>{  // 服务器不是2xx的情况
        // 401则让用户重新登录，并删除token信息
        if(error.response.status==401){
            router.push('/login')
            store.dispatch('user/removeToken')
        }
        console.log(error.response)
        return Promise.reject(error.response)
        
       
    }
)

/**
 * 封装get方法
 * 封装后直接返回数据就行，不用返回整个res
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 * */ 
export function get(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{params:{
            params
        }}).then(res=>{
            resolve(res.data)
        })
        .catch(err=>{
            reject(err.data||"网络出错了(ノへ`、)")
        })
    })
}


/**
 * 封装post方法
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */

export function post(url,data){
    return new Promise((resolve,reject)=>{
        axios.post(url,data).then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })

}
