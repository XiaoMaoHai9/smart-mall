import request from '@/utils/request'

// 此处用于存放所有获取商品相关的请求

// 获取搜索商品列表的数据
export const getProList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

// 获取商品详情
export const getGoodsDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取评论
export const getComData = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}

// 获取评论总数
export const getComTotal = (goodsId) => {
  return request.get('/comment/total', {
    params: {
      goodsId
    }
  })
}
