import { getInfo, setInfo } from '@/utils/storage'

export default ({
  name: 'user',
  namespaced: true,
  state: {
    // 获取本地存储的用户信息
    userInfo: getInfo()
  },
  getters: {
  },
  mutations: {
    // 将用户信息存储到本地
    setUserInfo (state, obj) {
      // 更新当前用户信息
      state.userInfo = obj
      // 更新本地用户信息
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      // 重置个人信息
      context.commit('setUserInfo', {})
      // 重置购物车信息
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  modules: {
  }
})
