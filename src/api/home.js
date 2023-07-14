import request from '@/utils/request'

// 此处用于存放所有的首页请求

// 获取首页数据
export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
