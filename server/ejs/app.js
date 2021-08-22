var express = require('express');
var path = require('path');
var session = require('express-session')
var upload = require('upload')

/* 
在做vue全家桶+express 做项目。 想做一个免登陆功能，选择session方案。 服务器设置session 后， 
返回的响应头有Set-Cookie,但是浏览器的Application的cookies缺没有返回的sessionID的cookie。 
折腾了很久，才意识到这是跨域造成了问题。前端是8080端口，后端是4000端口。 默认情况下跨域请求浏览器不会携带凭证信息（cookie, ssl证明等）
，服务器设置的cookie也会被浏览器拦截
*/

var app = express();

//需要安装并且引入中间件cors
const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
    maxAge: '1728000'
    //这一项是为了跨域专门设置的
  }
  app.use(cors(corsOptions))
  //设置跨域

// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
// 引入路由
var loginRouter = require('./routes/login')
var submitRouter = require('./routes/submit')
var exitRouter = require('./routes/exit')
var uploadRouter = require('./routes/upload')
// 解析post
app.use(express.urlencoded({ extended: false })); //在req.body中
app.use(express.json());
app.use(session({
    resave: true,//自动保存
    saveUninitialized: true, //保存初始值
    secret: 'misaka',//密盐
    cookie: {
        maxAge: 1000000 //生命周期
    }
}))

app.use(express.static(path.join(__dirname, 'public')));
// 注册路由
app.use('/login', loginRouter)
app.use('/submit', submitRouter)
app.use('/exit',exitRouter)
app.use('/upload',uploadRouter)

app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(3000, () => {
    console.log('服务器启动')
})
module.exports = app;
