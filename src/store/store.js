import { createStore } from 'vuex'
import blog from './blog-store.js'
import login from './login-store.js'


/** Vuex Store  */
export default createStore({
  state: {
    loginUser: null 
  },
  getters: {
  },
  mutations: {
    /** 로그인 사용자 정보를 설정한다.  */
    setLoginUser(state, user) {
      state.loginUser = user
    },
  },
  actions: { 
  },
  modules: {
    blog: blog , // 블로그  모듈 store 
  }
})
