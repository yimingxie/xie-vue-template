import axios from 'axios'
import jsonp from 'jsonp'
import {Message,Loading} from 'element-ui'

// 封装请求方法
// http: 异步请求，myJsonp: 跨域请求

/*
 * 一、request：
 *    1. 说明：封装对后台的请求，可以选择自动处理一些异常。
 *    2. 参数：
 *        - url：            后台地址，必填，String，如："/user/add"
 *        - params：         请求参数，必填，Object，如：{"name":"xxx"}
 *        - config：         axios参数，选填，Object，默认值：{}
 *        - auto_error_res： 是否自动处理响应错误，选填，Boolean，默认值：true
 *        - auto_error_data：是否自动处理后台错误，选填，Boolean，默认值：true
 *    3. 返回：
 *        - 成功：Promise.resolve(请求成功后的结果：response.data.result)
 *        - 失败：
 *            - 请求异常：Promise.reject(http响应错误)
 *            - 请求失败：Promise.reject(请求失败后的结果：response.data.error)
 *    4. 约定后台返回数据格式：
 *        response.data = {
 *          "success": true/false,         //请求成功或失败
 *          "result": {},                  //请求成功后的结果
 *          "error":{
 *            "code": 100001,              //请求失败错误码
 *            "message": "用户名字重复"    //请求失败描述
 *          }
 *        }
 *
 **/


// 全局axios配置
// 为每个请求设置默认baseURL
if (process.env.NODE_ENV === 'development') {
  // axios.default.baseURL = 'http://192.168.100.9'
  axios.default.baseURL = 'http://localhost'
} else if (process.env.NODE_ENV === 'production') {
  axios.default.baseURL = 'https://iot.gidomino.com'
}


// 请求拦截器，判断token
axios.interceptors.request.use(function (config) {
  config.headers.Accept = 'application/json'
  // config.headers.Authorization = localStorage.getItem('user-token')
  return config
})

// 响应拦截
// axios.interceptors.response.use(response => {
//   return response
// }, error => {
//   if (error.response) {
//     switch (error.response.status) {
//       // 判断token过期，跳转到登录页
//       case 401:
//         console.log('来自request.js -- token过期')
//         this.$router.push('/login')
//         break
//     }
//   }
// })


// 封装请求
export const http = (method, url, params, auto_err = true) => {
  const args = {
    "method": method,
    "url": url,
    "data": params
  }

  return new Promise((resolve, reject) => {
    axios(args)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        if (auto_err) {
          Message({
            message: '网络异常',
            type: 'error'
          })
        }

        reject(err)
      })
  })
}

// 封装跨域请求
export const myJsonp = (url, options) => {
  return new Promise((resolve, reject) => {
    jsonp(url, options, function (err, data) {
      if (err) {
        return reject(err)
      }

      return resolve(data)
    })
  })
}


