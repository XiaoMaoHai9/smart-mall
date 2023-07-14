export default {
  // 此处编写的是 Vue组件实例的 配置项，通过一定语法，可以直接混入到组件内部
  // data methods computed 生命周期函数 ...
  // 注意点：
  // 1、 如果此处 和 组件内，提供了同名的 data 或 methods，则组件内优先级更高
  // 2、如果编写了生命生命周期函数，则mixins中的生命周期函数 和 页面的生命周期函数，会用数组管理，统一执行
  methods: {

    // 返回 true   => 无token被拦截
    // 返回 false  => 有token
    loginConfirm () { // 判断当前用户有无 token
      if (!this.$store.getters.token) {
        // console.log(this.$store.getters.token)
        // 无 token，进行弹窗确认
        this.$dialog.confirm({
          title: '温馨提示',
          message: '请先登录',
          confirmButtonText: '登录'
        }).then(() => {
          // on confirm
          // 登陆页面
          this.$router.replace({
            path: '/login',
            query: {
              // 携带登录成功返回的地址
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {})
        return true
      }
      return false
    }
  }
}
