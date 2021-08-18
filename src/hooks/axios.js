import axios from 'axios'
export default (options) => {
    return new Promise((res, rej) => {
        //  发送请求
        res(
            axios(options)
        )
    })
}