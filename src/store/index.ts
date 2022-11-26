import { createStore } from 'vuex'
import axios from 'axios';
import router from '@/router';
export default createStore({
  state: {
    activePage: '',
    userToken: localStorage.getItem('token'),
    api: 'http://hellolinkermail-001-site1.itempurl.com/api',
    server:'http://hellolinkermail-001-site1.itempurl.com/',
    imagePath: 'http://hellolinkermail-001-site1.itempurl.com/images/',
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    userInfo: {
      name: 'My Account',
      email: '',
      profile_photo_path: '',
      phone: '',
      activate: false,
      gender: '',
      id: '',
    },
    shopView: {
      shops: [],
      products: [],
      searchKey: '',
      isLoading: false,
    },
    productView: {
      lastSeen: ''
    },
    shopPage: {
      products: [],
    },
    navBar: {
      cartQty: 0
    }
  },
  getters: {
    isLogin(state) {
      return !!state.userToken
    },
    authHeader(state) {
      return {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + state.userToken,
          'Content-Type': 'multipart/form-data'
        }
      }
    },
    isActive(state) {
      if (state.userInfo.activate != true) {
        return false;
      } else {
        return true
      }
    }
  },
  mutations: {
  },
  actions: {
    getUserData({ state, getters }) {
      if (getters.isLogin) {
        axios.get(state.api + '/user', getters.authHeader).then(r => {
          state.userInfo = r.data;
        }).catch(err => {
          localStorage.removeItem('token'); console.log(err);
        })
      }
    },
    tokenStore({ state }, key) {
      state.userToken = key;
      localStorage.setItem('token', key);
    },
    getCartQty({ state, getters }) {
      axios.get(state.api + '/cart/total_qty', getters.authHeader).then(r => {
        state.navBar.cartQty = r.data;
      })
    },
  },
  modules: {
  }
})
