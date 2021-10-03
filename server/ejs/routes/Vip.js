var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/:day', (req, res) => {
    // 获取天数
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Credentials","true");

    var day = req.params.day;
    console.log(day)
    // 获取session
    if (req.session.username != undefined) {
        console.log(req.session.username)
        console.log(req.session.password)
        //  转发给java服务器
        var   url= `http://localhost:5050/Vue_Vip_Server_war_exploded/vip?Day=${day}&username=${req.session.username}&password=${req.session.password}`

        request(url,function (error, response, data) {
   
            console.log(data)
            res.send(data)
        });

    } else {
        res.send('错误 无登录')
    }
})
router.get('/check/isVip',(req,res)=>{
    // 判断是否为Vip
    // 获取session
      // 获取天数
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
      res.setHeader("Access-Control-Allow-Credentials","true");
  
      // 获取session
      if (req.session.username != undefined) {
          console.log(req.session.username)
          console.log(req.session.password)
           //  转发给java服务器
           var   url= `http://localhost:5050/Vue_Vip_Server_war_exploded/check?username=${req.session.username}&password=${req.session.password}`

           request(url,function (error, response, data) {
      
               console.log(data)
               res.send(data)
           });
        
      } else {
          res.send('错误 无登录')
      }
})

module.exports = router