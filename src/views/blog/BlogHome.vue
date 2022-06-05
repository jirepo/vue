<template>
  <div>
      <header id="blog-header" class="blog-header">
        <div class="blog-header-left" >
          <div>
            <span @click="onBlogHomeClicked"  class="blog-header-home">&nbsp;&nbsp;Blog&nbsp;&nbsp;</span>
            <span @click="onUnsetTag()"  class="blog-header-name">&nbsp;&nbsp;&nbsp;{{blogInfo.blogName}}</span>
          </div>
        </div>
        <div class="blog-header-middle">&nbsp;</div>
        <div class="blog-header-right ">
         <div>
           <div class="blog-header-float-right" v-if="isUserNotLogined">&nbsp;&nbsp;Login</div>
           <div class="blog-header-float-right">
               <div class="blog-header-right-float" v-if="isUserLogined">
                  <div style="margin: 5px;" v-if="isBlogSelected">
                    <Button @click="onBlogEdit" label="&nbsp;&nbsp;글 작성&nbsp;&nbsp;" class="p-button-raised p-button-rounded p-button-sm" />
                  </div>
                  <div @click="onBlogSelected(item.blogId)" v-for="item in userBlogs.blogs" v-bind:key="item.blogId">{{ item.blogName }}</div>
               </div>
           </div>
           <div class="blog-header-right-float">
             <Button label="" icon="pi pi-search" iconPos="right" @click="toggle" class="p-button-text p-button-text" />
             <OverlayPanel ref="op">
               <div class="home-search-div">
                <table class="home-search-table">
                  <tr>
                    <td>검색어</td>
                    <td><InputText class="home-search-input" type="text"  /></td>
                  </tr>
                  <tr>
                    <td>포함할 단어</td>
                    <td><InputText class="home-search-input" type="text"  /></td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <Button label="Search" class="p-button-raised  p-button-sm" />
                    </td>
                  </tr>
                </table>
               </div>
            </OverlayPanel>
            </div>
         </div>
        </div>
      </header>
      <div><router-view></router-view></div>
  </div>
</template>
<script>
import { computed, ref, reactive, onMounted, defineComponent, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import BlogUseCase from "@/api/biz/blog/usecase/BlogUseCase.ts";
import LoginUseCase from "@/api/biz/login/usecase/LoginUseCase.ts";
import { useStore } from "vuex";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import OverlayPanel from 'primevue/overlaypanel';

/**
 * 블로그 홈 뷰이다.
 * - 로그인 사용자 정보를 표시한다.
 * - 로그인 사용자의 블로그 목록을 표시한다.
 * - 블로그 링크를 클릭하면 사용자의 블로그로 이동한다.
 */
export default defineComponent({
  components: {
    Button ,
    InputText,
    OverlayPanel
  },
  setup() {

    const envs = { 
      commits: { 
        setLoginUser: (store, user) => {
          store.commit("setLoginUser", user)
        },
        setEditMode: (store, val) => {
          store.commit("blog/setEditMode", val)
        },
        unsetSelectedTagId: (stroe) => {
          store.commit('blog/unsetSelectedTagId', null)
        },
        setSelectedBlogId: (store, blogId) => {
          store.commit('blog/setSelectedBlogId', blogId)
        }
      }, 
      subs: { 
       setBlogInfo: "blog/setBlogInfo",
       setSelectedBlogId: "blog/setSelectedBlogId", 
       setLoginUser: "setLoginUser"
      },
      push: {
        // 선택된 블로그로 이동 
        moveToBlog(router, blogId) {
          router.push({ path: "/blog/main/" + blogId });
        },
        // 블로그 홈으로 이동 
        moveToBlogHome(router) {
           router.push({ path: "/blog" });
        }
      }
    }

    // Router
    //const route = useRoute()
    const router = useRouter();
    // Logger
    const debug = inject("debug");
    // store
    const store = useStore();
    // API
    const blogUseCase = new BlogUseCase(store);
    const loginUseCase = new LoginUseCase(store);

    // Data
    const posts = reactive({});
    const userName = ref('')  // 로그인 사용자 이름 
    const userBlogs= reactive({}); // 로그인 사용자의 블로그들
    const blogInfo = reactive({  // 현재 블로그 
      blogId: "",
      blogName: ""
    })
    const isUserLogined = ref(false);  // 로그인 여부 
    const isUserNotLogined = ref(true);  
    const isBlogSelected = ref(false) // 블로그 선택 여부 

    const op = ref()  // op ref

   // Lifecycle Hook
    onMounted(() => {
      setUserInfo()
    }); // onMounted

    // Methods 
    
    const setUserInfo = () => {
      // store에 로그인 사용자 정보가 있는지 체크 
      if(loginUseCase.isLoginedStore()) {
        debugger 
        userName.value = store.state.loginUser.name; 
        isUserLogined.value = true 
        isUserNotLogined.value = false 
        userBlogs.blogs = store.state.loginUser.blogs 
      }else {
        loginUseCase
          .getLoginUser()
          .then(response => { 
            if(response) {
              envs.commits.setLoginUser(store, response);
              userName.value = store.state.loginUser.name; 
              isUserLogined.value = true 
              isUserNotLogined.value = false 
              userBlogs.blogs = store.state.loginUser.blogs 
            }
          })
          .catch(error => { 
          })
      }
    }
    // Event Handlers 
    const onUnsetTag = () => {
      envs.commits.unsetSelectedTagId(store);
    }
    /** 작성 컴포넌트로 스위칭한다.  */
    const onBlogEdit = () => {
      envs.commits.setEditMode(store, "EDIT") 
    }
    /** 블로그가 선택되었을 때 실행될 이벤트 핸들러이다. */
    const onBlogSelected = (blogId) => {
      debugger 
      isBlogSelected.value = true; 
      envs.push.moveToBlog(router, blogId)
    };
    const onBlogHomeClicked = () => {
      envs.push.moveToBlogHome(router) // router.push({ path: "/blog" });
    };
    const onClickPost = (blogId, postId) => {
      console.log("blogId:" + blogId);
      console.log("postId:" + postId);
    };
    const toggle = (event) => {
      op.value.toggle(event)
    }

    // Subscribe 
    store.subscribe( (mutation, state ) => {
      debugger 
      console.log(mutation.type)
      // 태그를 선택했을 때 
      switch(mutation.type) {
        case  envs.subs.setBlogInfo: 
          debugger 
          if(mutation.payload == '') break; 
          blogInfo.blogId = store.state.blog.blogInfo.blogId; 
          blogInfo.blogName = store.state.blog.blogInfo.blogName; 
          break;
        case envs.subs.setSelectedBlogId:
          isBlogSelected.value = true; 
          break; 
        case envs.subs.setLoginUser: 
          break;
        default:
            break;
      }
    })
    
    return {
      isUserLogined,
      isUserNotLogined,
      isBlogSelected,
      onBlogEdit,
      userName,
      userBlogs,
      blogInfo,
      onBlogSelected,
      onBlogHomeClicked,
      onClickPost,
      onUnsetTag,
      op,
      toggle
    };
  },
});
</script>

<style scoped>
</style>
