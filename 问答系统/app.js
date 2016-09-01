var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

////引入arttemplate模板
var template = require('art-template');

var app = express();

template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//////格式化request请求中的cookie数据为js对象
/////格式化之后我们可以直接使用 req.cookies.xx ///xx表示cookie的name
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users'));
app.use('/questions',require('./routes/questions'));
app.use('/common',require('./routes/common/common'));

function first(req,res,next){
  console.log("first:"+req.query.id);
  if(req.query.id == "1"){
    res.send("运行到1");
  }
  else{
    next();
  } 
}
function second(req,res,next){
  console.log("second:"+req.query.id);
  if(req.query.id == "2"){
    res.send("运行到2");
  }
  else{
    next();
  } 
}
function third(req,res,next){
  console.log("third:"+req.query.id);
  if(req.query.id == "3"){
    res.send("运行到3");
  }
  else{
    next();
  } 
}
app.get("/map",first,second,third,function(req,res,next){
  res.send("运行完成");
})

app.listen(3000,function(req,res){
  console.log("服务器运行中...");
})
