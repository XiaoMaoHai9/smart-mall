import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'

// 创建 axios实例，防止污染原始 axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000,
  headers: {
    platform: 'H5'
  }
})

// instance 自定义配置 请求/响应 - 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading，且禁止背景点击（类似节流处理，防止多次无效触发）
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })

  // 只要有 token，就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认 axios会多包装一层 data，在响应拦截器中去掉这层 data)

  const res = response.data
  if (res.status !== 200) {
    // 给点提示
    console.log(res)
    Toast(res.message)
    // 抛出一个错误的 Promise
    return Promise.reject(res.message)
  } else {
    // 获取成功响应，清除loading
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置完的实例
export default instance
