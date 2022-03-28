const path = require('path');
function resolve(dir){
    return path.join(__dirname,dir)//设置绝对路径

}
module.exports={
    devServer:{
        // 开发环境编译好直接打开
        open:true,
        port:9000
    },
    //配置路径
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    },
    configureWebpack: (config)=>{
        config.devtool='source-map'
    }

}