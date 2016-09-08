var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
////引入art-template模板
var template = require('art-template');

var app = express();

template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

function initNoteApp(req, res, next) {
    /////判断目录是否存在
    fs.exists('./notes', function (d) {
        if (d) {
            // console.log('目录已存在');
            next();
        }
        else {
            /////创建一个在项目根目录中创建一个notes目录
            fs.mkdirSync('./notes');
            // console.log('初始化目录完成');
            next();
        }
    })
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/****
 * 在express中使用res.redirect 方式做页面跳转的时候 
 * 如果在url中传递的有中文参数 需要把参数进行一个编码操作
 * 使用 encodeURIComponent方法实现url参数编码
 */
app.get('/', initNoteApp, (req, res) => {
    res.redirect('/dir.html');
});

app.use('/notes/dir', require('./routes/dir'));
app.use('/notes/file', require('./routes/file'));

/////在3000端口启动服务器
app.listen(3000, function (request, response) {
    console.log('服务器运行中......');
});
