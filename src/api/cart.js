import request from '@/utils/request'

// 此处用于存放所有购物车相关的请求

// 获取商品分类列表数据
// goodsSkuId => 商品规格id 因颜色，内存大小等规格参数而差异
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车商品总数量
export const getCartTocal = () => {
  return request.get('/cart/total')
}

// 获取购物车商品列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品数量
export const updateCount = ({ goodsId, goodsNum, goodsSkuId }) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const delGoods = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
