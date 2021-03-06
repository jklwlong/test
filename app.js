var https = require('https');
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//允许跨域访问配置
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

app.use(cookieParser());
// app.use(session({
//     secret: 'hubwiz app',
//     cookie: {maxAge: 60 * 1000 * 30}
// }));

// app.get('/*', function (req, res) {
//     if (req.session.sign) {//检查用户是否已经登录
//         console.log(req.session);//打印session的值
//         res.send(req.session.name);
//     } else {//否则展示index页面
//         console.log(req.session);
//         req.session.sign = true;
//         req.session.name = "ohayou";
//         res.json({"flag": "nologin"});
//     }
// });

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/fetch', require('./routes/fetch'));
app.use('/user', require('./routes/user'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var options = {
	key: fs.readFileSync('./spider/zs/privatekey.pem'),
	cert: fs.readFileSync('./spider/zs/certificate.pem')
}

https.createServer(options, app).listen(8888, function () {
    console.log('Https server listening on port ' + 8888);
});

// app.listen(app.get('port'),function  () {      // 监听端口如果有用户进入页面发送请求我们输出以下语句
// console.log('express started on port 3000')
// })

module.exports = app;
