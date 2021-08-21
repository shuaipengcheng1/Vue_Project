// 注销
var express = require('express')
var router = express.Router()

router.get('/',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080")

    res.setHeader('Access-Control-Allow-Credentials', true)
  req.session.destroy(()=>{
      res.send({
          message:'已注销',
          status:true
      })
  })
})
module.exports = router