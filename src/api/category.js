import request from '@/utils/request'

// 此处用于存放所有商品分类相关的请求

// 获取商品分类列表数据
export const getCategoryList = () => {
  return request.get('/category/list')
}
