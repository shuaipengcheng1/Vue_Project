//   先判断 是否登录(后端判断cookie) 没登陆跳转到 /login  登录后发送请求 给后端 将该cid(转为数组json)存入数据库 

var express = require('express')
var mysql = require('mysql')
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
// 检查收藏
router.get('/check/:cid', (req, res) => {
    console.log('check')
    var cid = req.params.cid
    // 设置跨域
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080")
    //    设置接收前端的cookie
    res.setHeader('Access-Control-Allow-Credentials', true)
    console.log(req.session)
    if (req.session.username != undefined) {
        // 获取用户的数据
        database.query(`SELECT submit from user where name = '${req.session.username}'`, (err, data) => {
            if (data[0].submit != '') {
                var arr = JSON.parse(data[0].submit)
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == cid) {
                        res.send({
                            status: true
                        })
                        return
                    }
                }
            } else {
                res.send({
                    status: false
                })
                return
            }
            // 没有返回false
            res.send({
                status: false
            })

        })
    } else {
        res.send({
            message: "请登录后再试",
            status: false
        })
    }
})


// 收藏
router.get('/:cid', (req, res) => {
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
        database.query(`SELECT submit from user where name = '${req.session.username}'`, (err, data) => {
            if (!err) {
                console.log(data[0].submit)
                if (data[0].submit == '') {
                    // 第一次添加
                    arr.push(cid)
                    // 转为json
                    var str = JSON.stringify(arr)
                    // 将str 压入数据库
                    database.query(`UPDATE user set user.submit = '${str}' WHERE name='${req.session.username}'`, (err) => {
                        if (!err) {
                            res.send({
                                message: "收藏成功",
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
                    var da = JSON.parse(data[0].submit)
                    // 压数据
                    for (var i = 0; i < da.length; i++) {
                        // 有重复
                        if (da[i] == cid) {
                            // 说明有过 但是第二次点 那就删除数据
                            da.splice(i, 1)
                            // 还原为json
                            var str = JSON.stringify(da)
                            // 将str 压入数据库
                            database.query(`UPDATE user set user.submit = '${str}' WHERE name='${req.session.username}'`, (err) => {
                                if (!err) {
                                    res.send({
                                        message: "收藏取消",
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
                    database.query(`UPDATE user set user.submit = '${str}' WHERE name='${req.session.username}'`, (err) => {
                        if (!err) {
                            res.send({
                                message: "收藏成功",
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

module.exports = router