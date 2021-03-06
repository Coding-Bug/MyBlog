// 防抖函数
export const debounce = function(fun,delay){
    let timer = null
    return function(...args){
        
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fun.apply(this,args)
        },delay)
    }
}