import request from '@/utils/request'

// 此处用于存放所有订单相关的请求

// 订单结算
// mode：cart       => obj { cartIds }
// mode：buyNow     => obj { goodsId  goodsNum  goodsSkuId}
export const getOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buyNow
      delivery: 10, // 10快递配送，20门店自提
      couponId: 0, // 优惠卷 ID 为0，则不使用优惠卷
      isUsePoints: 0, // 积分传0，不是用积分
      ...obj // 将传递过来的对象，动态转开
    }
  })
}

// 获取订单列表
export const getOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
