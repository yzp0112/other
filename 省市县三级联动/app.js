var express = require('express')
var app = express()

app.use(express.static('./public'))
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api',require('./address'))

/////localhost:3000/api
// app.get('/api', (req, res) => {
//     res.json({
//         status: 'y', msg: '获取数据成功',
//         data: [
//             { name: "Tom", age: 18 },
//             { name: "Jerry", age: 18 }
//         ]
//     })
// })

app.listen(3000, function () {
    console.log('服务器运行中')
})