import request from '@/utils/request'

// 此处用于存放所有的登录请求

// 1、获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2、获取短信验证码
export const sendMsgCode = (form) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form
  })
}

// 3、登录
export const login = (form) => {
  return request.post('/passport/login', {
    form
  })
}
