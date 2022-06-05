<template>
  <div class="blog-main-container">
    <div class="blog-main-table">
      <navi class="blog-main-navi">
        <blog-navi></blog-navi>
      </navi>
      <main class="blog-content">
        <component :is="currentComp"></component>
      </main>
      <aside class="blog-main-sidebar">
        <blog-side-bar></blog-side-bar>
      </aside>
    </div>
  </div>
</template>


<script>
import BlogNavi from "./BlogNavi.vue";
import BlogSideBar from "./BlogSideBar.vue";
import BlogUseCase from '@/api/biz/blog/usecase/BlogUseCase.ts'
import LoginUseCase from '@/api/biz/login/usecase/LoginUseCase.ts'

import { shallowRef, watch, ref,  reactive,  computed,  inject, onMounted, defineComponent,  defineAsyncComponent,} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    BlogNavi, BlogSideBar
  },
  setup() {

    // Environment
    const envs = {
      commits: {
        setBlogInfo(store, val) {
          console.log("commit/blog/setBlogInfo")
          store.commit('blog/setBlogInfo', val)
        },
        setSelectedBlogId(store, blogId) {
          store.commit('blog/setSelectedBlogId', blogId)
        }
      },
      subs: { 
        setSelectedTagId: 'blog/setSelectedTagId',
        setSelectedBlogId: 'blog/setSelectedBlogId',
        setSelectedPostId: 'blog/setSelectedPostId',
        setViewClosed: 'blog/setViewClosed',
        setEditPost: 'blog/setEditPost',
        setEditMode: 'blog/setEditMode'
      }

    }

    // Logger
    const debug = inject("debug");
    // Router 
    const route = useRoute()
    // Store
    const store = useStore();
    // API
    const blogUseCase = new BlogUseCase(store)
    const loginUseCase = new LoginUseCase(store) 

    // Variables
    const contentViewEnum = {
      EDIT: "EDIT", // 작성,수정
      LIST: "LIST", // 목록
      VIEW: "VIEW", // 조회 
    };

    /** 현재 컴포넌트 이름 */
    const curContentName = ref(contentViewEnum.LIST);
    /** 레이아웃의 중앙에 위치할 컴포넌트 */
    const currentComp = computed(() => {
      switch (curContentName.value) {
        case contentViewEnum.VIEW:
          // 조회 컴포넌트
          return defineAsyncComponent(() => import("./BlogView.vue"));
          break;
        case contentViewEnum.LIST:
          // 목록 컴포넌트
          return defineAsyncComponent(() => import("./BlogList.vue"));
          break;
        case contentViewEnum.EDIT:
           // 작성/수정 컴포넌트
          return defineAsyncComponent(() => import("./BlogEdit.vue"));
          break;
        default:
          /** 디폴트는 목록 컴포넌트로 설정한다. */
          return defineAsyncComponent(() => import("./BlogList.vue"));
          break;
      }
    });

    // Data
    /** 선택된 블로그 아이디  */
    const selectedBlogId = ref("")
    const isShowButton = ref(false)
    const selectedTagId = ref(null) 


    // Initialize 
    const onInit = () => {
       selectedBlogId.value = route.params.blogId // router의 파라미터 
       envs.commits.setSelectedBlogId(store, selectedBlogId.value) 
    }

    onInit()

    // Lifecycle Hooks 
    onMounted( () => {
      // 글작성 버튼을 표시할지 여부를 결정 
      loginUseCase
        .getLoginUser()
        .then( response => { 
           isShowButton.value = (response)? true: false; 
        })
        .catch(error => { 
            isShowButton.value = false; 
        })

      blogUseCase.selectBlog(selectedBlogId.value)
         .then( response => {
            debugger 
            console.log("selectBlog")
            envs.commits.setBlogInfo(store, response) 
         })
         .catch(error => {
         })
    })// mounted 



    // Event Handlers
    /** 조회 컴포넌트가 닫히면 목록 컴포넌트로 스위칭한다.  */
    const onViewClosed = () => {
      if(curContentName.value != contentViewEnum.LIST) {
         curContentName.value = contentViewEnum.LIST;
      }
    }



    // Subscribe
    store.subscribe( (mutation, state ) => {

      switch(mutation.type) {
        case envs.subs.setSelectedTagId:
          if(mutation.payload == '') { return }
          // List 컴포넌트가 아니면 List 컴포넌트로 스위칭한다. 아래는 순서 바꾸지 말 것 
          selectedTagId.value = mutation.payload  // 반응형 데이터를 먼저 수정하고 
          if(curContentName.value != contentViewEnum.LIST)  {
            curContentName.value = contentViewEnum.LIST; // 컴포넌트를 스위칭해야 props로 전달이 가능함 
          }
          break;
        case envs.subs.setSelectedBlogId:
          selectedBlogId.value = mutation.payload  // 반응형 데이터를 먼저 수정하고 
          if(curContentName.value != contentViewEnum.LIST)  {
            curContentName.value = contentViewEnum.LIST; // 컴포넌트를 스위칭해야 props로 전달이 가능함 
          }
          break; 
        case envs.subs.setSelectedPostId:
          if(!mutation.payload) return; 
          if(curContentName.value != contentViewEnum.VIEW) {
            curContentName.value = contentViewEnum.VIEW;
          }
          break;
        case envs.subs.setViewClosed: 
          if(curContentName.value != contentViewEnum.LIST)  {
            curContentName.value = contentViewEnum.LIST; // 컴포넌트를 스위칭해야 props로 전달이 가능함 
          }
          break;
        case envs.subs.setEditMode:
          if(curContentName.value != contentViewEnum.EDIT)  {
            curContentName.value = contentViewEnum.EDIT; // 컴포넌트를 스위칭해야 props로 전달이 가능함 
          }
          break; 
        case envs.subs.setEditPost:
          curContentName.value = contentViewEnum.EDIT; // 컴포넌트를 스위칭해야 props로 전달이 가능함 
          break;
        default:
            break;
      } // switch 
    })
    return {
      isShowButton,
      currentComp
    };
  },
})
</script>
<style scoped>

</style>