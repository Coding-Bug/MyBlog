# 服务端笔记

### 安装mongodb

* **下载**

  ```js
  https://www.mongodb.com/try/download/community
  ```

* **使用**

  1. 修改bin目录下的mongod.cfg配置,修改默认端口号

     > 比较新的mongodb已经帮配置好了，只要修改就好

  2. 在bin下使配置生效

     ```js
     .\mongod --config "D:\MongoDB\bin\mongod.cfg" --install
     ```

  4. 管理员身份打开ternimal，启动服务

     ```sql
     net start MongoDB
     ```

  4. 在bin执行`mongo`启动后台shell并连接到数据库

     > 端口号是自己配置的端口号
     >
     > 要是配置了环境变量也可以不进入bin

     这个连接还有其他选项
  
     ```
     mongo localhost:3000
     ```
  
  6. 上述操作完后，便可以在网页输入localhost:3000验证，有消息则启动成功
  
  7. 创建myblog数据库
  
     ```js
     use myblog
     ```
  

  7. 设置用户名和密码
  
     ```js
     db.createUser({
       user: 'admin',  // 用户名
       pwd: '123456',  // 密码
       roles:[{
         role: 'root',  // 角色
         db: 'myblog'  // 数据库
       }]
     })
     ```
  
     

### 创建express项目

* 安装

  1. 全局express

     ```js
     npm install -g express
     ```

  2. 命令工具

     ```js
     npm install -g express-generator
     ```

* 创建

  ```js
  express server
  ```

* 装依赖

  ```js
  npm install
  ```

* 文件夹如下

  新增的为新创建需要

  ```js
  - controller 控制层 -新增
  - config 配置文件 -新增
  - views 视图层 - 默认
  - model 模型层（用于管理MongoDB文档对象）- 新增
  - public 静态资源目录 - 默认
  - app.js 入口文件 - 默认
  - package.json 依赖管理文件 - 默认
  ```
  
  





### 亮点

* 使用jwt验证

  1. 后端通过配置中间件，对指定需要验证token的路由进行拦截
* 使用await解决了回调地狱的问题
* 验证token的时候时
  1. 使用中间件拦截需要验证token的路由
  2. 在中间件中判断路由
  3. 如果token成功，则将info挂载到req.info上
  4. 否则返回失败
* 使用错误级别中间件，统一将错误返回
  1. 特别注意，是通过向next传递错误
  2. next之后要return
  3. 在可能抛出异常的地方，还是要try，因为不错误级别的中间件无法处理异常



### 难点

* 前端携带cookie时
  1. 服务器不能将 `Access-Control-Allow-Origin` 的值设为通配符“`*`”
  2. 服务器不能将 `Access-Control-Allow-Headers` 的值设为通配符“`*`”
  3. 服务器不能将 `Access-Control-Allow-Methods` 的值设为通配符“`*`”
* 刚开始不会处理上传图片的逻辑
  * 不知道如何解析图片
* 前端参数传过来的数字会被转换成字符串，要后端再次转换

### 重要逻辑

* **邮箱认证**

  1. 用户点击获取邮箱验证码，调取后端获取验证码的接口
  2. 后端随机生成验证码，发送到用户邮箱，且将次验证码保存到数据库中，设置一定的定时然后把这个验证码删除
  3. 用户填写验证码，在调用接口的时候，把邮箱和验证码带上
  4. 后端进行对比即可

  * 安装邮箱模块

    ```js
    npm install nodemailer
    npm install nodemailer-smtp-transport
    ```


* **对图片的处理**

  * 上传图片时，格式应为form-data
  * 后端使用`formidable`模块保存并解析文件等资源到`fields`,`files`
  * 利用fs模块`fs.rename`重置图片文件名
  * 将图片在静态文件夹public中的路径放到数据库
  * 返回数据时将配置的baseUrl与相对路径结合返回
  * 但是要注意用joinhi有点小问题

  ```js
  // 创建表单解析对象
        const form = new formidable.IncomingForm()
        // 配置文件上传路径
        let avatarPath = path.join(__dirname, '../public/images/avatar')
        form.uploadDir = avatarPath
        // 保留文拓展名
        form.keepExtensions = true
        // 解析表单
        form.parse(req,(err,fields,files)=>{
          if(err){
            throw(err)
          }
          
          // 将文件重命名
          let oldPath = files.avatar.path
          let newPath = avatarPath + '/'+req.info._id+'.png'
          fs.rename(oldPath,newPath,async (err)=>{
            if(err){
              throw(err)
            }else{
              // 获取图片在public中的路径放到集合
              avatar=newPath.split('public')[1]
              // 更新用户信息
              await dao.update({colName:users,where:{_id:req.info._id},newdata:{username:fields.username,introduction:fields.introduction,avatar:avatar}})
              res.send({
                code:200,
                msg:'修改用户信息成功'
              })
            }
          })
        })
  ```

  

  
