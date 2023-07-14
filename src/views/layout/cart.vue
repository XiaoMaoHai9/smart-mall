<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />

    <!-- 有 token时 -->
    <div v-if="isToken && cartList.length > 0">
        <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all">共<i>{{totalGoodsCount}}</i>件商品</span>
        <span class="edit">
          <van-icon name="edit" @click="isDelMode = !isDelMode"/>
          编辑
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id" @click="toggleChecked(item.goods_id)">
          <van-checkbox :value="item.isChecked" ></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="">
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{item.goods.goods_name}}</span>
            <span class="bottom">
              <div class="price">¥ <span>{{item.goods.goods_price_min}}</span></div>
               <CountBox @input="(value) => updateCount(value,item.goods_id,item.goods_sku_id)" v-model="item.goods_num"></CountBox>
            </span>
          </div>
        </div>
      </div>

      <!-- 购物车底部 -->
      <div class="footer-fixed">
        <div  class="all-check">
          <van-checkbox  icon-size="18" :value="allChecked" @click='checkedAll'></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span>¥ <i class="totalPrice">{{totalPrice}}</i></span>
          </div>
          <div v-if="!isDelMode" class="goPay" :class="{disabled : checkedGoods === 0}" @click='settle'>结算({{checkedGoods}})</div>
          <div v-else class="delete" :class="{disabled : checkedGoods === 0}" @click='del'>删除</div>
        </div>
      </div>
    </div>

    <!-- 没有 token时 -->
    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的购物车是空的, 快去逛逛吧
      </div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapGetters, mapState } from 'vuex'
import { Toast } from 'vant'

export default {
  data () {
    return {
      isDelMode: false // 当前是否在编辑模式
    }
  },
  name: 'CartIndex',
  components: {
    CountBox
  },
  methods: {
    // 单个商品选中
    toggleChecked (id) {
      this.$store.commit('carts/toggleCheck', id)
    },

    // 商品全选
    checkedAll () {
      this.$store.commit('carts/checkedAll', !this.allChecked)
    },

    // 更新数量
    updateCount (goodsNum, goodsId, goodsSkuId) {
      this.$store.dispatch('carts/updateCount', { goodsId, goodsNum, goodsSkuId })
    },

    // 删除商品
    async del () {
      if (this.checkedGoods === 0) return
      await this.$store.dispatch('carts/delGoods')
      this.isDelMode = false
    },

    // 结算
    settle () {
      if (this.totalCheckedGoods.length > 0) {
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            obj: JSON.stringify({ cartIds: this.totalCheckedId })
          }
        })
      } else {
        Toast('您还没有选择宝贝哦')
      }
    }
  },
  computed: {
    // 动态映射 cart数据
    ...mapState('carts', ['cartList']),
    // 动态计算商品数量与总价
    ...mapGetters('carts', ['checkedGoods', 'totalGoodsCount', 'totalPrice', 'allChecked', 'totalCheckedGoods']),

    // 获取token
    isToken () {
      return this.$store.getters.token
    },

    // 获取所有选中商品的id字符串组合 => 'id,id,id'
    totalCheckedId () {
      return this.totalCheckedGoods.map(item => item.id).join(',')
    }
  },
  watch: {
    // 监视 当前是否在编辑模式
    isDelMode (value) {
      if (value) {
        // 是则去掉全选
        this.$store.commit('carts/checkedAll', false)
      } else { this.$store.commit('carts/checkedAll', true) }
    }
  },
  created () {
    // 判断当前有无用户登录
    if (this.isToken) {
      this.$store.dispatch('carts/getCartList')
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}

.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
