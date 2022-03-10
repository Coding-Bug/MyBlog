module.exports={
    devServer:{
        // 开发环境编译好直接打开
        open:true,
    },
    configureWebpack:(config)=>{
        // 调试JS
        config.devtool="source-map"
    }
}