import request from '@/utils/request'

// 此处用于存放所有支付相关的请求

// 获取默认的收货地址
export const getAddressList = () => {
  return request.get('/address/list')
}

// 提交订单
// mode：cart    ,remark   => obj { cartIds }
// mode：buyNow  ,remark   => obj { goodsId  goodsNum  goodsSkuId}
export const submitPay = (mode, remark, obj) => {
  return request.post('/checkout/submit', {
    mode, // cart buyNow
    remark, // 评论
    delivery: 10, // 10快递配送，20门店自提
    couponId: 0, // 优惠卷 ID 为0，则不使用优惠卷
    isUsePoints: 0, // 积分传0，不是用积分
    payType: 10, // 余额支付
    ...obj // 将传递过来的对象，动态转开
  })
}

// 添加地址
/* const res = await request.post('/address/add', {
    form: {
      name: 'aaa',
      phone: '15333333333',
      region: [{
        value: 782,
        label: '上海'
      },
      {
        value: 783,
        label: '上海市'
      },
      {
        value: 785,
        label: '徐汇区'
      }
      ],
      detail: '北京路1号楼8888室'
    }
  }) */
