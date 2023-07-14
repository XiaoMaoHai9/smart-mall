import { getCartList, updateCount, delGoods } from '@/api/cart'
import { Toast } from 'vant'

export default ({
  name: 'carts',
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 计算选中的商品数量
    totalGoodsCount (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    // 计算购物车中商品数量
    checkedGoods (state) {
      return state.cartList.reduce((sum, item) => item.isChecked ? sum + item.goods_num : sum + 0, 0)
    },

    // 计算选中的商品总价
    totalPrice (state) {
      return state.cartList.reduce((sum, item) => item.isChecked ? sum + item.goods.goods_price_min * item.goods_num : sum + 0, 0).toFixed(2)
    },

    // 所有选中的商品信息
    totalCheckedGoods (state) {
      return state.cartList.filter(item => item.isChecked)
    },

    // 全选框
    allChecked (state, getters) {
      if (getters.totalGoodsCount === 0) {
        return false
      } else { return getters.totalGoodsCount === getters.checkedGoods }
    }
  },
  mutations: {
    // 将请求得到的数据存储到本地
    setCartList (state, newList) {
      state.cartList = newList
    },

    // 单选框点击
    toggleCheck (state, id) {
      state.cartList.forEach(item => {
        if (item.goods_id === id) {
          item.isChecked = !item.isChecked
        }
      })
    },

    // 全选购物车商品
    checkedAll (state, value) {
      state.cartList.forEach(item => { item.isChecked = value })
    },

    // 更新商品数量
    updateCount (state, obj) {
      const { goodsId, goodsNum } = obj
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    // 获取购物车商品列表
    async getCartList (context) {
      const { data } = await getCartList()
      // 后台数据中不包含，是否选中
      // 这里我们手动添加是否选中的属性
      data.list.forEach(element => {
        element.isChecked = true
      })
      context.commit('setCartList', data.list)
    },

    // 更新购物车商品数量
    async updateCount (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      // 先同步到本地
      context.commit('updateCount', { goodsId, goodsNum })
      // 再同步到后台
      await updateCount({ goodsId, goodsNum, goodsSkuId })
    },

    // 删除商品
    async delGoods (context) {
      const idArry = context.getters.totalCheckedGoods.map(item => item.id)
      const res = await delGoods(idArry)
      console.log(res)
      Toast.success('删除成功')
      // 删除成功后从新拉取数据
      context.dispatch('getCartList')
    }
  },
  modules: {
  }
})
