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
* 使用await解决了回调地狱的问题



### 难点

* 前端携带cookie时

  1. 服务器不能将 `Access-Control-Allow-Origin` 的值设为通配符“`*`”
  2. 服务器不能将 `Access-Control-Allow-Headers` 的值设为通配符“`*`”
  3. 服务器不能将 `Access-Control-Allow-Methods` 的值设为通配符“`*`”

  
