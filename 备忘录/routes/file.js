var express = require('express');
var router = express.Router();

var fs = require('fs');

router.get('/:path',(req,res)=>{
    var path = req.params.path;////获取path参数
    var arrFiles = fs.readdirSync('./notes/'+path);
    var arrResult = [];
    for(var i=0;i<arrFiles.length;i++){
      var content = fs.readFileSync('./notes/'+path+'/'+arrFiles[i]).toString();
      content = content.length>20?content.substr(0,18)+'...':content;
      console.log(content);
      arrResult.push({fileName:arrFiles[i],content:content});
    }
    res.render('fileAll',{path:path,files:arrResult});
})

router.get('/new/:path',(req,res)=>{
    var path = req.params.path;////获取path参数
    res.render('fileNew',{path:path});
})
router.post('/new',(req,res)=>{
    var path = req.body.path;
    var content = req.body.content;
    if(!!content){
      path = "./notes/"+path+"/"+(+(new Date()))+".txt";
      fs.writeFileSync(path,content);
    }

    res.json({status:"y",msg:"写入文件成功"});
    //////把content的内容写入文件 ./notes/path.txt中
})
router.get('/editor/:path/:fileName',(req,res)=>{
    var path = req.params.path;////获取path参数
    var fileName = req.params.fileName;///获取fileName参数
    // ////读取文件内容
    var content = fs.readFileSync('./notes/'+path+"/"+fileName).toString();
    res.render('fileEditor',{path:path,fileName:fileName,content:content});
})
router.post('/editor',(req,res)=>{
    var fileName = req.body.fileName;
    var path = req.body.path;
    var content = req.body.content;
    path = "./notes/"+path+"/"+fileName;
    fs.writeFileSync(path,content);
    res.json({status:"y",msg:"写入文件成功"});
})


module.exports = router;
