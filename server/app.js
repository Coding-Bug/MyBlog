// App统一入口
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 测试mongodb
const {user} = require('./model/users')
// 引入路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// 配置
app.all('*', function (req, res, next) {
  // 设置请求头为允许跨域
  res.header('Access-Control-Allow-Origin','*');
  // 设置服务器支持的所有头信息字段
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
  res.header('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
  // 设置服务器支持的所有跨域请求的方法
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // 设置可携带cookie
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  if (req.method.toLowerCase() == 'options') {
      res.status(200).send({code:90});  // 让options尝试请求快速结束
  } else {
      next();
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 引入相关插件
app.use(logger('dev'));
app.use(express.json());   // 解析body参数
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 定义public为静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 引用相关的路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});            
                    
app.listen(9000,function(){
  console.log('监听9000')
})
module.exports = app;
