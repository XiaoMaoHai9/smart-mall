<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search show-action v-model='searchValue' placeholder="请输入搜索关键词" :autofocus='true' >
      <template #action>
        <div @click='goSearch(searchValue)'>搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click='clearHistory'/>
      </div>
      <div class="list">
        <div class="list-item" @click="goSearch(item)" v-for='item in history' :key='item'>{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchHistory, setSearchHistory, removeSearchHistory } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchValue: '', // 搜索框输入内容
      history: getSearchHistory() // 搜索历史
    }
  },
  methods: {
    // 点击搜索/点击历史tag -> 进行搜索
    goSearch (value) {
      // 如果输入内容为空，则返回
      if (!value) {
        return
      }
      // 获取该值在历史数组中的下标
      const index = this.history.indexOf(value)
      // 判断搜索历史中有无value
      if (index !== -1) {
        // 有value
        // 将value在历史中清除
        this.history.splice(index, 1)
        // 重新置顶存入历史
        this.history.unshift(value)
      } else {
        // 没有直接置顶存入
        this.history.unshift(value)
      }
      // 清除输入框内容
      this.searchValue = ''
      // 将更新的搜索历史存储到本地
      setSearchHistory(this.history)
      // 跳转到详情页面
      this.$router.push(`/searchlist?search=${value}`)
    },
    // 点击垃圾桶，清空搜索历史
    clearHistory () {
      this.history = []
      removeSearchHistory()
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
