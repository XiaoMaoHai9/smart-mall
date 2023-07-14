// 约定一个通用的键名
const INFO_KEY = 'smart_shopping_info'
const HISTORY_KEY = 'smart_search_history'

// 获取本地个人信息
export const getInfo = () => {
  const defaultInfo = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}

// 将个人信息存储到本地
export const setInfo = (userInfo) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(userInfo))
}

// 移除本地个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取本地搜索历史
export const getSearchHistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 将搜索历史存储到本地
export const setSearchHistory = (searchHistory) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory))
}

// 移除本地搜索历史
export const removeSearchHistory = () => {
  localStorage.removeItem(HISTORY_KEY)
}
