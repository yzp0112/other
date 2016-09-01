var express = require('express');
var router = express.Router();
////引入文件系统
var fs = require('fs');

/****
 * 
 * jquery.cookie.min.js ///客户端jQuery插件
 * cookie-parser ////nodejs的cookie中间件
 * multer /////nodejs文件上传
 * 
 */

/**
 * 判断用户用户是否登陆 
 * @param {any} res
 * @returns
 */
function isLogined(req) {
    if (req.cookies.userName) {
        return true;
    }
    else {
        return false;
    }
}

/////引入自定义的时间处理模块
var DateFun = require('../lib/date');

router.post("/ask", function (req, res, next) {
    /***
     * 用户是否登陆
     */
    console.log(req.cookies);
    if (isLogined(req)) {
        var userName = req.cookies.userName;
        var question = {};
        question.userName = userName;
        question.content = req.body.question;
        var myDate = new DateFun();
        question.qData = myDate.formatDateTime();
        question.answers = [];
        var fileName = "./questions/" + (new Date()).getTime() + ".json";
        fs.writeFile(fileName, JSON.stringify(question));
        res.json({ status: "y", msg: "提交成功" });
    }
    else {
        res.json({ status: 'n', msg: '请先登录', data: 'not-logined' })
    }

})

//////get "/questions/answer"
/****
 * express 路由中另外的传参方法
 * /answer/:id/:name 访问地址为 /questions/answer/307527658/tom
 * 
 * 获取的参数值为
 *  console.log(req.params.id); //////307527658
 *  console.log(req.params.name); /////tom
 */
router.get("/answer/:id", function (req, res, next) {
    console.log(req.params.id);
    res.render('answer', { q: req.params.id });
})

router.post("/answer", function (req, res, next) {
    /***
     * 用户是否登陆
     * 对哪一个问题的回答
     */
    var q = req.body.q;
    if (isLogined(req)) {
        var temFileName = q + ".json";
        var allFiles = fs.readdirSync('./questions');
        if (allFiles.indexOf(temFileName) > -1) {
            var qData = JSON.parse(fs.readFileSync("./questions/" + temFileName));
            var myDate = new DateFun();
            var answer = {};
            answer.userName = req.cookies.userName;
            answer.content = req.body.answer;
            answer.aDate = myDate.formatDateTime();
            qData.answers.push(answer); /////在问题的答案中新增一个回答
            fs.writeFile("./questions/" + temFileName, JSON.stringify(qData));
            res.json({ status: "y", msg: "答案提交成功" });
        }
        else {
            res.json({ status: "n", msg: "你回答的问题不存在，请重新打开页面" });
        }
    }
    else {
        res.json({ status: 'n', msg: '请先登录', data: 'not-logined' })
    }
})

///////获取question数据信息
router.get("/getList", function (req, res, next) {
    ////定义一个变量 用于最终输出数据
    var arrQuestions = [];
    /////读取所有文件数据(文件名)
    var allFiles = fs.readdirSync("./questions");

    for (var i = 0; i < allFiles.length; i++) {
        try {
            var temFileName = "./questions/" + allFiles[i];
            var question = JSON.parse(fs.readFileSync(temFileName));
            question.q = allFiles[i].split('.')[0]; /////获取去掉".json"后的文件名

            try {
                var qUserInfo = JSON.parse(fs.readFileSync('./users/' + question.userName + '.json'));
                question.nickName = !!!qUserInfo.nickName ? qUserInfo.userName : qUserInfo.nickName;
                question.avatar = qUserInfo.avatar;
            }
            catch (e) {
                console.log(e);
            }

            for (var m = 0; m < question.answers.length; m++) {
                try {
                    var temAnswer = question.answers[m];
                    var aUserInfo = JSON.parse(fs.readFileSync('./users/' + temAnswer.userName + '.json'));
                    temAnswer.nickName = !!!aUserInfo.nickName ? aUserInfo.userName : aUserInfo.nickName;
                    temAnswer.avatar = aUserInfo.avatar;
                }
                catch (e) {
                    consoloe.log(e);
                }

            }
            arrQuestions.push(question);
        }
        catch (e) {
            console.log(e);
        }
    }
    res.json({ status: "y", msg: "获取数据成功", data: arrQuestions });
})

module.exports = router;
