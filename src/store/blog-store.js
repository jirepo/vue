/** 블로그 모듈 store */
export default { 
  namespaced:true, 
  state: {
    /** 선택된 포스트 아이디  */
    selectedPostId: '',
    /** 선택된 블로그 아이디  */
    selectedBlogId: '',
    /** 선택된 태그 아이디 */
    selectedTagId: '',
    /** 선택된 블로그 이름 */
    selectedBlogName: '' ,
    viewClosed: false, 
    editPost: false, 
    /** 블로그 정보  */
    blogInfo: {
      blogId: '',
      postId: '', 
      blogName: '',
      tagId: '' 
    },
    /** 사용자의 블로그 */
    userBlogs: null,
    selectedPost: null,
    loginUserBlogs: null,
    editMode : null, 
  },
  getters: {
  },
  actions: {
  },
  mutations: {
    setEditMode(state, val) {
      state.editMode = val 
    },
    /** 사용자의 블로그정보를 설정한다. */
    setUserBlogs(state, blogs) {
      state.userBlogs = blogs; 
    },
    /** 블로그 정보를 설정한다.  */
    setBlogInfo(state, blogInfo) {
      debugger 
      state.blogInfo = blogInfo 
    },
    /**
     * 선택된 포스트 아이디를 설정한다. 
     * @param {object} state state 인스턴스 
     * @param {*} selectedPostId  선택된 블로그 아이이 
     */
    setSelectedPostId(state, selectedPostId) {
      state.selectedPostId = selectedPostId
    },
    unsetSelectedPostId(state, selectedPostId) {
      state.selectedPostId = null
    },
    /**
     * 선택된 블로그 아이디를 설정한다. 
     * @param {object} state state 인스턴스 
     * @param {*} selectedBlogId 선택된 블로그 아이디 
     */
    setSelectedBlogId(state, selectedBlogId) {
      // 아래와 같이 직접 state의 값을 변경하면 setSelectedblogId 이벤트가 두 번 발생함 
      //state.setSelectedTagId = ''   
      //state.setSelectedPostId = '' 
      state.selectedBlogId = selectedBlogId 
    },
    /**
     * 선택된 태그아이디를 설정한다. 
     * @param {object} state  State 인스턴스
     * @param {*} selectedTagId 선택된 태그 아이디 
     */
    setSelectedTagId(state, selectedTagId) {
      state.selectedTagId = selectedTagId 
    },
    unsetSelectedTagId(state, selectedTagId) {
      state.selectedTagId = selectedTagId 
    },
    setViewClosed(state, viewClosed) {
      state.viewClosed = viewClosed 
    },
    setEditPost(state, editPost) {
      state.editPost = editPost 
    },
    setSelectedPost(state, post) {
      state.selectedPost = post 
    },
    unsetSelectedPost(state, post) {
      state.selectedPost = null
    },
    setLoginUserBlogs(state, blogs) {
      state.loginUserBlogs = blogs 
    },
    /**
     * 선택된 블로그 이름을 설정한다. 
     * @param {string} state 
     * @param {string} selectedBlogName 
     */
    setSelectedBlogName(state, selectedBlogName) {
      state.selectedBlogName = selectedBlogName 
    }
  }
}