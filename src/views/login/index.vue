<template>
  <div class="login">
    <!-- 头部 - NavBar导航栏 -->
    <van-nav-bar title="用户登录" left-arrow @click-left="$router.back()"/>
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <!-- 主体 - 表单 -->
      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="inpPhone">
        </div>
        <div class="form-item">
          <input  class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model='inpPicCode'>
          <img alt="验证码" :src='picCodeObj.codeUrl' @click="getPicCode">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="6" placeholder="请输入短信验证码" type="text" v-model="inpMsgCode">
          <button @click="getMsgCode" :disabled="timer">
            {{nowSec === 60 ? '获取验证码' : nowSec + '秒后重新获取'}}
          </button>
        </div>
      </div>

      <!-- 主体 - 登录按钮 -->
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
// 导入服务器请求 api
import { getPicCode, sendMsgCode, login } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      picCodeObj: {
        codeUrl: '', // 图形验证码请求地址
        codeKey: '' // 图形验证码请求标示
      },
      inpPhone: '15333333333', // 用户输入的手机号
      inpPicCode: '', // 用户输入的图形验证码
      inpMsgCode: '246810', // 用户输入的短信验证码
      totalSec: 60, // 计时总时长
      nowSec: 60, // 倒计时，当前秒数
      timer: null // 计时器
    }
  },
  methods: {
    // 获取并更新图形验证码
    async getPicCode () {
      const res = await getPicCode()
      this.picCodeObj.codeUrl = res.data.base64
      this.picCodeObj.codeKey = res.data.key
    },
    // 输入内容校验
    chechInput () {
      if (!/^1[3-9]\d{9}$/.test(this.inpPhone)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.inpPicCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getMsgCode () {
      // 进行输入校验
      if (!this.chechInput()) return

      // 判断当前有无计时器 且 当前秒数是否归为
      if (!this.timer && this.nowSec === 60) {
        // 发送短信请求
        await sendMsgCode({
          captchaCode: this.inpPicCode,
          captchaKey: this.picCodeObj.codeKey,
          mobile: this.inpPhone
        })
        // 获取响应 - 发送成功弹窗
        this.$toast.success('发送成功！')
        // 开启定时器每秒刷新一次
        this.timer = setInterval(() => {
          this.nowSec--
          // 对记时结束进行判断
          if (this.nowSec <= 0) {
          // 清除计时器
            clearInterval(this.timer)
            // 重置定时器id
            this.timer = null
            // 秒数复位
            this.nowSec = this.totalSec
          }
        }, 1000)
      }
    },
    // 登录
    async login () {
      // 手机号、图片验证码验证
      if (!this.chechInput()) return

      // 短信验证码判断
      if (!/^\d{6}$/.test(this.inpMsgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }

      // 发送登录请求
      const res = await login({
        isParty: false,
        mobile: this.inpPhone,
        partyData: {},
        smsCode: this.inpMsgCode
      })
      this.$toast('登陆成功')

      // 将用户信息通过mutations存储到user状态中
      this.$store.commit('user/setUserInfo', res.data)

      // 进行判断，看地址栏有回跳地址
      // 1、有 => 说明是其他页面，拦截到登录来的，需要回跳
      // 2、没有 => 正常去跳转
      const url = this.$route.query.backUrl || '/'
      // replace跳转，覆盖当前页，不会新建页，可实现返回上一页
      this.$router.replace(url)
    }
  },

  // 页面构建完毕后更新图片验证码
  async created () {
    this.getPicCode()
  },
  // 页面跳转后， 清除正在进行的计时器
  destroyed () {
    // 跳转页面时，判断是否有未结束的计时器
    if (this.timer) {
      // 清除计时器
      clearInterval(this.timer)
      // 重置定时器id
      this.timer = null
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
