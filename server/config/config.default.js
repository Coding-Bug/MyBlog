module.exports ={
    dbURL:"mongodb://localhost:3000/myblog", // 连接数据库的url
    emailAuth:{
        user:'1752552274@qq.com',
        pass:'zdrdqzfnlkslcdgb'
    },
    tokenPath:['/users/getInfo','/users/changeInfo','/article/likeArticle','/message/likeMessage','/message/leaveMessage','/users/isAdmin','/admin/*'],
    adminPath:['/admin/*'],
    defaultCover:'/images/article/defaultCover.jpg',
    baseURL:'http://127.0.0.1:9000/'
    
}