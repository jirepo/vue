/** 블로그 모듈 store */
export default { 
  namespaced:true, 
  state: {
    loginUser: {},
    counter: 0
  },
  getters: {
  },
  mutations: {
    /** 로그인 사용자 정보를 설정한다.  */
    setLoginUser(state, user) {
      console.log("setLoginUser called")
      state.loginUser = user
    },
    setCounter(state, val) {
      state.counter = val 
    }
  },
  actions: { 
  }
}