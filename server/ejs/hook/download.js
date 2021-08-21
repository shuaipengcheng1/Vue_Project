// 下载图片or文件到本地 并且返回他们的名字
var axios = require('axios')
var fs = require('fs')
module.exports = async (options, username) => {
    var data
    // 名字
    var name = `img_${username}.jpg`
    new Promise((res) => {
        res(axios(options))
    }).then((v) => {
        // console.log(v)
        data = v.data//获取data
        // console.log("数据" + data)


        console.log(name)
        fs.writeFile(`project\\public\\images\\${name}`, data, (err) => {
            if (!err) {
                // console.log('sussess')
                // 返回图片名字
                console.log("写入成功"+name)

            }
        })

    })
    return (name)
}