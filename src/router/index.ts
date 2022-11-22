import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/ShopView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
    beforeEnter(to, from, next) {
      if (store.state.userToken == null || store.state.userToken == '') {
        next();
      }else{
        next('home')
      }
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue'),
    beforeEnter(to, from, next) {
      if (store.state.userToken == null || store.state.userToken == '') {
        next();
      }else{
        next('home')
      }
    },  
  },
  //--------------Shops----------------
  {
    path: '/shop/products/:id',
    alias:'/shop/products',
    name: 'product',
    component: () => import('../views/pages/ProductView.vue'),
    beforeEnter(to, from, next) {
      if (to.params.id) {
        next();
      }else{
        next(from.fullPath)
      }
      
    },
  },
  {
    path: '/shopPage/:id/:name',
    component: () => import('../views/pages/ShopPageView.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
    beforeEnter(to, from, next) {
      if (store.state.userToken != null && store.state.userToken != '') {
        next()
      }else{
        next('/login')
      }
    },
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrderView.vue'),
    beforeEnter(to, from, next) {
      if (store.state.userToken == null || store.state.userToken == '') {
        next('home')
      }else{
        next();
      }
    },
  },
  {
    path: '/orders/:id',
    name: 'orderDetail',
    component: () => import('../views/pages/OrderDetailView.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckoutView.vue'),
  },
  {
    path: '/otp_confirm',
    name: 'otpConfirm',
    component: () => import('../views/auth/OtpInputView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
