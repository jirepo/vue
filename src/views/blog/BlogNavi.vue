<template>
  <div class="blog-nav">
    <div class="blog-nav-tag-title">Tag List</div>
    <hr>
    <div>
      <div class="blog-nav-tag-list"  @click="onTagSelected(item.tagId)" v-for="item in blogTags" v-bind:key="item.tagId">{{item.tagName}}</div>
    </div>
  </div>
</template>

<script>
import { inject, ref, reactive, onMounted,  defineComponent } from 'vue'
import BlogUseCase from '@/api/biz/blog/usecase/BlogUseCase.ts'
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";


/**
 * 블로그 태그 정보를 표시한다. 
 */
export default defineComponent({
  props: {
  },

  setup(props, { emit }) {
    
    // Environments
    const envs = {
      commits: {
        setSelectedTagId: (store, val) => {
          store.commit("blog/setSelectedTagId", val)
        },
      },
      subs: {
        setBlogInfo: "blog/setBlogInfo",
        setViewClosed: 'blog/setViewClosed',
      }
    }

    // Store
    const store = useStore();
    // Router
    const router = useRouter();
    const route = useRoute()
    // API
    const blogUseCase = new BlogUseCase(store) 

    // Data 
    const blogTags = ref([])

    // Initialize 
    const onInit = () => {
    }
    onInit(); 

   // Lifecycle Hooks
    onMounted( () => {
      fetchBlogTags()
    })

    // Methods 
    /** 블로그의 태그들을 불러온다.  */
    const fetchBlogTags = () => {
      // 브라우저에서 URL로 접근할 경우와 클릭해서 접근한 경우를 구분 
      let blogId = route.params.blogId  || store.state.blogInfo.blogId 
      blogUseCase.selectBlogTags(blogId)
          .then( response => {
               blogTags.value =  response
          })
          .catch(error => {
          })
    }//fetchBlogTags 


    // Event Handlers
    /**
     * 태그를 store에 저장한다. 
     * @param {string} blogId 블로그아이디 
     * @param {string} tagId 태그 아이디 
     */
    const onTagSelected = (tagId) => {
      envs.commits.setSelectedTagId(store, tagId) 
    }


    // Subscribe 
    store.subscribe( (mutation, state ) => {
      switch(mutation.type) {
        case envs.subs.setBlogInfo:
          if(mutation.payload == '') break; 
          fetchBlogTags()
          break;
        case envs.subs.setViewClosed: 
          fetchBlogTags()
          break; 
        default:
            break;
      }
    })

    return { 
      blogTags ,
      onTagSelected,
    }
  },
})
</script>
<style scoped>

</style>
