// 上传
// var upload = require('upload')
var multer = require('multer')
var express = require('express')
var router = express.Router()
var fs = require('fs')
var mysql = require('mysql')
var database = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'spc652324',
    database: "vue_project"
})
// 配置上传
var upload = multer({ dest: 'project\\public\\images' })

database.connect((err) => {
    if (!err) {
        console.log('成功')
    }
})

// 图片上传的路由   upload.single(作用,单一上传:形参,文件的name属性值)
router.post('/:user', upload.single('img'), (req, res) => {
    var username
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080")
    // 接收前端的cookie
    res.setHeader('Access-Control-Allow-Credentials', true)

    // 文件信息
    console.log(req.file)
    // 获取后缀
    var back = req.file.originalname.split('.')[1]
    // 修改文件名
    let oldpath = req.file.destination + '/' + req.file.filename
    // 修改为新的名字\
    // 判断是否传入用户名
    if (req.params.user != 'undefined') {
        console.log('y')
        username = req.params.user
        let newpath = req.file.destination + '/' + 'img_' + username + '.' + back
        fs.rename(oldpath, newpath, (err) => {
            if (!err) {

                console.log('替换成功')
                console.log(newpath)
                res.send({
                    message: "上传成功",
                    status: true,
                    file_name: 'img_' + username + '.' + back
                })
            } else {
                console.log('失败')
            }
        })
    } else {
        console.log('user= ==undf')
        res.send({
            message: '需要填入完整信息',
            status: false,
            file_name: 'img_' + username + '.' + back
        })
    }



})


// 个人界面的头像更改
//传入一个cookie 并且通过用户名 修改数据库数据 并且获取上传的头像 (个人页面只能上传本地图片)
router.post('/page/p', upload.single('img') ,(req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080")
    // 接收前端的cookie
    res.setHeader('Access-Control-Allow-Credentials', true)

    var name  = req.session.username
    name = name.trim()
    
    // 文件信息
    console.log(req.file)
    // 获取后缀
    var back = req.file.originalname.split('.')[1]
    // 修改文件名
    let oldpath = req.file.destination + '/' + req.file.filename
    // 修改为新的名字\
    // 判断是否传入用户名
    if (name != '') {
        console.log('y')
        // 设置路径
        let newpath = req.file.destination + '/' + 'img_' + name + '.' + back
        // 修改数据库
        database.query(`UPDATE user set user.icon = 'img_${name}.${back}' WHERE name = '${name}'`,(err,data)=>{
            if(!err){
                console.log('替换成功')
            }
        })
        fs.rename(oldpath, newpath, (err) => {
            if (!err) {

                console.log('页面替换成功')
                console.log(newpath)
                res.send({
                    message: "上传成功",
                    status: true,
                    // file_name: 'img_' + name + '.' + back
                })
            } else {
                console.log('失败')
            }
        })
    } else {
        console.log('user= ==undf')
        res.send({
            message: '需要填入完整信息',
            status: false,
            // file_name: 'img_' + username + '.' + back
        })
    }
})


module.exports = router
