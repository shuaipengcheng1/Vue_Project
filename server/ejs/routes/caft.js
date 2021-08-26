// 购物车的路由
var mysql = require('mysql')
var express = require('express')
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
// 加入购物车
router.get('/add/:cid', (req, res) => {
    var cid = req.params.cid
    var arr = []
    // 设置跨域
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080")
    //    设置接收前端的cookie
    res.setHeader('Access-Control-Allow-Credentials', true)
    //    判断cookie
    console.log(req.session.username)
    if (req.session.username != undefined) {
        console.log('通过登录检查')
        // 将用户的收藏从数据库中拉出来
        database.query(`SELECT caft from user where name = '${req.session.username}'`, (err, data) => {
            if (!err) {
                console.log(data[0].caft)
                if (data[0].caft == '') {
                    // 第一次添加
                    arr.push(cid)
                    // 转为json
                    var str = JSON.stringify(arr)
                    // 将str 压入数据库
                    database.query(`UPDATE user set user.caft = '${str}' WHERE name='${req.session.username}'`, (err) => {
                        if (!err) {
                            res.send({
                                message: "购物车成功",
                                status: true
                            })
                        } else {
                            res.send({
                                message: "服务器问题",
                                status: false
                            })
                        }
                    })
                } else {
                    // 有数据了
                    var da = JSON.parse(data[0].caft)
                    // 如果收藏大于10
                    if (da.length > 10) {
                        res.send({
                            message: "不能超过十个购物车哦~",
                            status: false

                        })
                        return
                    }
                    // 压数据
                    for (var i = 0; i < da.length; i++) {
                        // 有重复
                        if (da[i] == cid) {
                            // 说明有过 但是第二次点 那就删除数据
                            da.splice(i, 1)
                            // 还原为json
                            var str = JSON.stringify(da)
                            // 将str 压入数据库
                            database.query(`UPDATE user set user.caft = '${str}' WHERE name='${req.session.username}'`, (err) => {
                                if (!err) {
                                    res.send({
                                        message: "购物车取消",
                                        status: true
                                    })
                                } else {
                                    res.send({
                                        message: "服务器问题",
                                        status: false
                                    })
                                }
                            })
                            return
                        }
                    }
                    da.push(cid)
                    // 还原为json
                    var str = JSON.stringify(da)
                    // 将str 压入数据库
                    database.query(`UPDATE user set user.caft = '${str}' WHERE name='${req.session.username}'`, (err) => {
                        if (!err) {
                            res.send({
                                message: "购物车成功",
                                status: true
                            })
                        } else {
                            res.send({
                                message: "服务器问题",
                                status: false
                            })
                        }
                    })
                }
            }
        })
    } else {
        res.send({
            message: "请登录后再试",
            status: false
        })
    }
})



// 购物车页面
router.get('/', (req, res) => {
    console.log(req.session.username)
    if (req.session.username == undefined) {
        res.send({
            message: "请先登录",
            status: false
        })
    } else {
        // 将购物车数据拉出来
        database.query(`SELECT caft from user where name = '${req.session.username}'`, (err, data) => {
            if (!err) {
                console.log(data)
                if (data[0].caft == '') {
                    res.send({
                        data: [],
                        status: true
                    })
                } else {
                    console.log(JSON.parse(data[0].caft))
                    res.send({
                        data: JSON.parse(data[0].caft),
                        status: true
                    })
                }
            } else {
                res.send({
                    message: "服务器错误",
                    status: false
                })
            }


        })
    }

})
module.exports = router