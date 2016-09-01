var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

////引入arttemplate模板
var template = require('art-template');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('view engine', 'jade');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//////格式化request请求中的cookie数据为js对象
/////格式化之后我们可以直接使用 req.cookies.xx ///xx表示cookie的name
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/users', require('./routes/users'));
app.use('/questions', require('./routes/questions'));
app.use('/common', require('./routes/common/common'));

function first(req, res, next) {
  console.log("first:" + req.query.id);
  if (req.query.id == "1") {
    res.send("运行到1");
  }
  else {
    next();
  }
}
function second(req, res, next) {
  console.log("second:" + req.query.id);
  if (req.query.id == "2") {
    res.send("运行到2");
  }
  else {
    next();
  }
}
function third(req, res, next) {
  console.log("third:" + req.query.id);
  if (req.query.id == "3") {
    res.send("运行到3");
  }
  else {
    next();
  }
}

/***
 * next是执行下一步操作的意思
 * 如果没有next了 那么就不再执行下一个调用，直接返回当前方法的处理结果
 */
app.get("/map", first, second, third, function (req, res, next) {
  if (req.query.id == "4") {
    res.send("4----运行完成");
  }
  else {
    next();
  }
}, function(req, res, next){

  res.send("其他完成");

})

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// module.exports = app;
app.listen(3000, function (req, res) {
  console.log("服务器运行中...");
})
