// 登录路由
var mysql = require('mysql')
var express = require('express')
var router = express.Router()
var cors = require('cors')
var Download = require('../hook/download')
var fs = require('fs')
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
// 缓存登录
router.get('/', (req, res) => {
    // 设置跨域
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080")
    //    设置接收前端的cookie
    res.setHeader('Access-Control-Allow-Credentials', true)
    console.log(req.session)
    // 判断缓存
    if (req.session.username != undefined) {

        // 获取该用户的信息
        database.query(`select * from user where name ="${req.session.username}"`, async (err, data) => {
            // 下载用户的头像到本地服务器
            console.log("路径" + data[0].icon)
            // 是本地文件
            if (/^img/.test(data[0].icon)) {
                // 直接赋值
                var imgname = data[0].icon
                res.send({
                    message: "缓存登录",
                    status: true,
                    imgname,
                    data: {
                        data,

                    }
                })
            } else {
                console.log(data[0].icon)
                console.log(data[0])
                // 是网络链接
                var imgname = await Download({
                    url: data[0].icon,
                    // 返回类型为buffer文件类型
                    responseType: 'arraybuffer'
                }, data[0].name)

                console.log("图片-------------" + imgname)
                res.send({
                    message: "缓存登录",
                    status: true,
                    imgname,
                    data: {
                        data,

                    }
                })
            }

        })

    }

})
// 按钮登录
router.post('/', (req, res) => {
    // console.log()
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080")

    res.setHeader('Access-Control-Allow-Credentials', true)

    var corsOptions = {
        origin: 'http://localhost:8080',
        credentials: true,
        maxAge: '1728000'
        //这一项是为了跨域专门设置的
    }
    //设置跨域
    router.use(cors(corsOptions))


    var { username, password } = req.body


    //  不能为空
    if (username == undefined || password == undefined) {
        res.send({
            message: "不能为空",
            status: false
        })
    } else {
        // 查找数据库
        database.query(`SELECT * From user where name ="${username}" AND password="${password}"`, async (err, data) => {
            console.log(data)
            if (data.length > 0) {
                // 存储cookie
                // 登录的人的用户名
                req.session.username = username;
                console.log(req.session)
                // 登录的人的密码
                req.session.password = password

                
                // 是本地文件
                if (/^img/.test(data[0].icon)) {
                    // 直接赋值
                    //"project\public\images\img_dadas.jpeg"
                    var imgname = data[0].icon
                    res.send({
                        message: "登录",
                        status: true,
                        imgname,
                        data: {
                            data,

                        }
                    })
                } else {
                    // 下载用户的头像到本地服务器
                    console.log("路径" + data[0].icon)
                    var imgname = await Download({
                        url: data[0].icon,
                        // 返回类型为buffer文件类型
                        responseType: 'arraybuffer'
                    }, data[0].name)

                    console.log("图片-------------" + imgname)
                    res.send({
                        message: "登录",
                        status: true,
                        imgname,
                        data: {
                            data,

                        }
                    })
                }




            } else {
                res.send({
                    message: "登录失败",
                    status: false
                })
            }
        })
    }
})

module.exports = router