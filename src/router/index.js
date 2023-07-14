import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入
import HomeIndex from '@/views/layout/home'
import CategoryIndex from '@/views/layout/category'
import CartIndex from '@/views/layout/cart'
import UserIndex from '@/views/layout/user'
import store from '@/store'

// 引入页面路由组件
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Search = () => import('@/views/search/index')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')

Vue.use(VueRouter)

const router = new VueRouter({
  // 路由配置
  routes: [
    {
      path: '/',
      component: Layout,
      // 起始页重定向到/home
      redirect: '/home',
      children: [
        {
          name: 'home',
          path: '/home',
          component: HomeIndex
        },
        {
          name: 'category',
          path: '/category',
          component: CategoryIndex
        },
        {
          name: 'cart',
          path: '/cart',
          component: CartIndex
        },
        {
          name: 'user',
          path: '/user',
          component: UserIndex
        }
      ]
    },
    { name: 'login', path: '/login', component: Login },
    { name: 'search', path: '/search', component: Search },
    { name: 'searchlist', path: '/searchlist', component: SearchList },
    // name:'', 动态路由传参，路由参数中携带 id，确认将来是哪个商品，
    { path: '/prodetail/:id', component: ProDetail },
    { name: 'pay', path: '/pay', component: Pay },
    { name: 'myorder', path: '/myorder', component: MyOrder }

  ]
})

// 该数组，专门用来存储所有需访问权限的页面
const authUrls = ['/pay', '/myorder']

// 设置路由前置，拦截无token的用户
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }

  // 是权限页面，需要判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
