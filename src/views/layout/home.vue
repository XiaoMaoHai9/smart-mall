<template>
    <div class="home">
      <!-- 顶部导航条 -->
      <van-nav-bar title="推荐" />
      <!-- 搜索框 -->
      <van-search class="my-search" v-model="value" :disabled='true' shape="round" background="#fff" placeholder="请输入搜索关键词" @click="$router.push('/search')"/>
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa" >
          <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image" />
          </van-swipe-item>
      </van-swipe>
      <!-- 快捷导航 -->
      <van-grid square :column-num="5">
          <van-grid-item v-for="value in navList" :key="value.imgUrl" :icon="value.imgUrl" :text="value.text" />
      </van-grid>
      <!-- 主会场 -->
      <div class="main">
          <img src="@/assets/main.png" alt="">
      </div>
      <!-- 猜你喜欢 -->
      <div class="guess">
        <p class="guess-title">—— 猜你喜欢 ——</p>

        <div class="goods-list">
          <GoodsItem :item='item' v-for="item in proList" :key="item.goods_id"></GoodsItem>
        </div>
      </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'

export default {
  name: 'HomeIndex',
  data () {
    return {
      value: '',
      images: [
        'https://img01.yzcdn.cn/vant/apple-7.jpg',
        'https://img01.yzcdn.cn/vant/apple-6.jpg',
        'https://img01.yzcdn.cn/vant/apple-5.jpg'
      ],
      bannerList: [], // 轮播数据
      navList: [], // 导航数据
      proList: [] // 商品数据
    }
  },
  components: {
    GoodsItem
  },
  async created () {
    const res = await getHomeData()
    this.navList = res.data.pageData.items[3].data
    this.proList = res.data.pageData.items[6].data
  }
}
</script>

<style scoped>
.home{
    overflow: hidden;
}

/* 搜索框样式定制 */
.van-nav-bar,.van-search {
  position: fixed;
  width: 100%;
  /* top: 46px; */
  z-index: 999;
}
.van-search{
  margin-top: 45px;
}

.my-swipe{
  margin-top: 100px;
}

.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
}

.my-swipe .van-swipe-item img{
  height: 185px;
  width: 100%;
}

/* 主会场 */
.main img {
  display: block;
  width: 100%;
}

/* 猜你喜欢 */
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

/* 商品样式 */
.goods-list {
  background-color: #f6f6f6;
}
</style>
