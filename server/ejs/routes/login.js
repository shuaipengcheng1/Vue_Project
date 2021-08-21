// 登录路由
var mysql = require('mysql')
var express = require('express')
var router = express.Router()
var cors = require('cors')
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
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080")

    res.setHeader('Access-Control-Allow-Credentials', true)
    console.log(req.session)
    // 判断缓存
    if (req.session.username != undefined) {
        res.send({
            message: "缓存登录",
            status: true
        })
    }

})
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
        database.query(`SELECT * From user where name ="${username}" AND password="${password}"`, (err, data) => {
            console.log(data)
            if (data.length > 0) {
                // 存储cookie
                // 登录的人的用户名
                req.session.username = username;
                console.log(req.session)
                // 登录的人的密码
                req.session.password = password

                res.send({
                    message: "登录成功",
                    status: true
                })
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