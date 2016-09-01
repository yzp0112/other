var express = require('express');
var router = express.Router();
////引入文件系统
var fs = require('fs');

/**
 * 验证用户名是否已经存在
 * @param {any} userName
 * @returns bool
 */
function validateUserNameIsExist(userName) {
  ////读取所有的用户信息文件
  var allUsers = fs.readdirSync('./users');
  /////临时拼接一个文件名 用于判断用户是否已经存在
  //console.log(allUsers);
  var strNeedValidate = userName + ".json";
  //console.log(strNeedValidate);
  if (allUsers.indexOf(strNeedValidate) > -1) {
    return true; ////用户名存在
  }
  else {
    return false;////用户名不存在
  }
}


/**
 * 把用户名信息写入cookie中 
 * @param {any} userInfo 用户信息
 * @param {any} res     respones
 */
function writeUserNameInCookie(userInfo, res) {
  res.cookie("userName", userInfo.userName);
  res.cookie("avatar", !!!userInfo.avatar ? "" : userInfo.avatar);
  res.cookie("nickName", !!!userInfo.nickName ? userInfo.userName : userInfo.nickName);
}

/* GET users listing. */
/////验证用户名是否存在
router.get('/validateUserName', function (req, res, next) {
  // console.log(req.query.userName);
  /////此处的验证方法还没有完成,只供测试使用
  var userName = req.query.userName.trim();
  if (validateUserNameIsExist(userName)) {
    res.send('false');
  }
  else {
    res.send('true');
  }
});

/////引入自定义的时间处理模块
var DateFun = require('../lib/date');

///// 访问地址 /users/reg
router.get('/reg',function(req,res){
  res.render('reg.html',{title:"用户注册",isLogined:false});
})

/////注册页面post提交
router.post('/reg', function (req, res, next) {
  //console.log(req.body);
  var myDate = new DateFun();
  var user = {};
  user.userName = req.body.userName.trim();
  user.pwd = req.body.pwd;
  user.nickName = '';
  user.avatar = '';
  user.regDate = myDate.formatDateTime();
  fs.writeFile('./users/' + user.userName + '.json', JSON.stringify(user));
  writeUserNameInCookie(user, res);
  res.redirect("/users/userInfo");
})

////登录页面 get
router.get('/login',function(req,res){
  res.render('login',{title:"用户登录",isLogined:false,error:""});
})
////登陆页面post提交
router.post('/login', function (req, res, next) {
  //console.log(req.body.userName);
  var userName = req.body.userName.trim();
  if (validateUserNameIsExist(userName)) {
    // req.body.pwd 
    var userInfo = JSON.parse(fs.readFileSync('./users/' + userName + '.json'));
    if (userInfo.pwd == req.body.pwd) {
      writeUserNameInCookie(userInfo, res);
      res.redirect("/users/userInfo");
      //res.json({ status: "y", msg: "登陆成功" });
    }
    else {
      res.render('login',{title:"用户登录",isLogined:false,error:"密码错误"})
      //res.json({ status: "n", msg: "密码错误" });
    }
  }
  else {
    res.render('login',{title:"用户登录",isLogined:false,error:"用户名不存在"})
    //res.json({ status: "n", msg: "用户名不存在" });
  }

  //req.body.userName
})

/**
 * 登陆判断
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function validateLogined(req,res,next){
  if(req.cookies.userName){    
    next();
  }
  else{
    res.redirect("/login.html");
  }
}

/***
 * 用户中心 get
 */
router.get('/userInfo',validateLogined,function(req,res){
  var fileName = './users/'+req.cookies.userName+'.json';
  var userInfo = JSON.parse(fs.readFileSync(fileName));
  res.render("userInfo",{title:"用户中心",isLogined:true,userInfo:userInfo});
})
router.post('/updateUserInfo', function (req, res) {
  if (req.cookies.userName) {
    try {
      var fileName = './users/' + req.cookies.userName + '.json';
      console.log(fileName);
      var userInfo = JSON.parse(fs.readFileSync(fileName));
      userInfo.nickName = req.body.nickName;
      userInfo.avatar = req.body.avatar;
      fs.writeFile(fileName, JSON.stringify(userInfo));

      // res.cookie.nickName = userInfo.nickName;
      // res.cookie.avatar = userInfo.avatar;
      writeUserNameInCookie(userInfo,res);

      res.json({status:"y",msg:"更新个人信息成功"});
    }
    catch (e) {
      res.json({status:"n",msg:"文件系统错误"});
    }


  }
  else {
    res.json({ status: "n", msg: "请先登录" });
  }

})

module.exports = router;
