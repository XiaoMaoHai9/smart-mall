import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import carts from '@/store/modules/carts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    carts
  }
})
