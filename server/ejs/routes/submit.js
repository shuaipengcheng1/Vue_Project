// 登录路由
var mysql = require('mysql')
var express = require('express')
// const e = require('express')
var fs = require('fs')
var router = express.Router()

var database = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'spc652324',
    database: "vue_project"
})
database.connect((err) => {
    if (!err) {
        console.log('成功')
    }
})

router.post('/', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', "*")
    var { username, password, icon } = req.body
    console.log(icon)
    // 文件状态
    var st
    // 查找文件img_dawdawsd.PNG
    // 如果是img开头的 就说明有本地文件
    if (/^img/.test(icon)) {
        st = true
    } else {
        st = false
    }
    // 没有存入头像链接 也没有上传
    if (icon == undefined && st == false) {
        //头像默认值
        icon = 'https://tse1-mm.cn.bing.net/th/id/R-C.250f95855aec49c974acb36b3ed32571?rik=BgcOI1PX1fb%2bww&riu=http%3a%2f%2fwww.desktx.com%2fd%2ffile%2fwallpaper%2fscenery%2f20170120%2f387b1a5181ebeddbec90fd5f19e606ce.jpg&ehk=Feb%2bz1leZKOVuTS20av3z7LKELRP0HH277cc6aSrAeI%3d&risl=&pid=ImgRaw&r=0'
    }
    // 有上传的头像
    if (st == true) {
        // 使用上传的头像
        icon = `${icon}`
    }
    // 上面都没有就会使用传入的头像链接
    console.log(req.body)
    if (password == undefined || username == undefined) {
        res.send({
            status: false,
            message: "不能为空"
        })
    }
    //  先检查 用户名和密码
    if (username != '' && password.length > 6) {
        // 往数据库里面存值 之前 先检查用户名是否重复
        database.query(`SELECT * From user where name='${username}'`, (err, data) => {
            if (data.length == 0) {
                //  存值
                var arr = []
                arr.push(username, password, icon)
                database.query(`INSERT INTO user (name,password,icon) VALUES (?,?,?)`, arr, (err, data) => {
                    if (!err) {
                        res.send({
                            status: true,
                            message: "注册成功",
                        })
                    } else {
                        res.send({
                            status: false,
                            message: "服务器问题"
                        })
                    }
                })
            } else {
                res.send({
                    message: "用户名重复",
                    status: false
                })
            }
        })

    } else {
        res.send({
            status: false,
            message: "密码大于6位"
        })
    }

})

module.exports = router