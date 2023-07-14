<template>
  <div>
    <router-view></router-view>
    <div class="empty-box"></div>
    <!-- 二级路由出口：二级组件展示位置 -->
    <van-tabbar active-color="#ee0a24" inactive-color="#000" route >
       <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
       <van-tabbar-item replace to="/category" icon="apps-o">分类页</van-tabbar-item>
       <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
       <van-tabbar-item replace to="/user" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style>
.empty-box{
  width: 100%;
  height: 50px;
}
</style>
