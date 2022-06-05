<template>
  <div> 
    <div class="blog-list-item-container" v-for="item in postList" v-bind:key="item.postId">
      <div class="blog-list-title"  @click="onItemSelected(item.postId)">
         {{ item.postTitle }}
      </div>
      <div class="blog-list-item-content">
      본 포스팅은 여기에 올라온 게시글을 바탕으로 작성되었습니다.파트와 카테고리 동일한 순서로 모든 내용을 소개하는 것이 아닌, 몰랐거나 새로운 내용 위주로 다시 정리하여 개인공부 목적으로 작성합니다.중간중간 개인 판단 하에 필요하다고 생각될 시, 기존 내용에 추가로 보충되
      </div>
      <div class="blog-list-item-tag">
        <Button label="Java" class="p-button-success p-button-rounded p-button-sm" />&nbsp;&nbsp;&nbsp;
        <Button label="Spring" class="p-button-success p-button-rounded p-button-sm" />&nbsp;&nbsp;&nbsp;
        <Button label="SpringBoot" class="p-button-success p-button-rounded p-button-sm" />
      </div>
      <div class="blog-list=item-date">
        2021년 7월 2일 0개의 댓글
      </div>
    </div>
  </div>
</template>

<script>
import BlogUseCase from "@/api/biz/blog/usecase/BlogUseCase.ts";
import { reactive, ref, inject, defineComponent, onMounted, onUpdated, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Button from 'primevue/button';

// const emit = defineEmits(['item-selected']) // <script setup> 사용할 때는 이 방식으로

export default defineComponent({
  components: {
    Button,

  },
  props: {
  },  
  setup(props, { emit }) {
    const envs = { 
      commits: { 
        setSelectedPostId(store, val) {
          store.commit('blog/setSelectedPostId', val)
        }
      },
      subs : {
        setBlogInfo: "blog/setBlogInfo",
        setSelectedTagId: "blog/setSelectedTagId",
        unsetSelectedTagId: "blog/unsetSelectedTagId"
      }
    }

    // Router
    const route = useRoute()
    const router = useRouter();
    // Logger
    const debug = inject("debug");
    // store
    const store = useStore();

    // API
    const blogUseCase = new BlogUseCase(store);

    // Data 
    let isUpdated = false;
    let postList = ref([]);
    const selectedBlogId = ref('')
    const selectedTagId = ref('')

    const onInit = () => {
      debugger 
      // Noting to do 
      selectedBlogId.value = route.params.blogId // router의 파라미터 
    }
    onInit(); 

    // Lifecycle Hooks
    onMounted( () => {
      debugger 
      selectBlogPosts(selectedBlogId.value) 
    })
    onUpdated( () => {
    })
    onUnmounted( () => {
      console.log('unmounted')
    })


    // Methods
    /**
     * 블로그의 포스트들을 가져온다. 
     */
    const selectBlogPosts = (blogId) => {
      blogUseCase
        .selectBlogPosts(blogId)
        .then((response) => {
          postList.value = response;
        })
        .catch((error) => {
          // 이것의 문제는 then()에서 오류가 발생해도 여기서 catch한다는 문제가 있음
          //router.push( { path: '/login'})
        });
    };
    /**
     * 태그에 속한 포스트들을 가져온다. 
     * @param {string} tagId 태그 아이디
     */
    const selectTagPosts = (tagId) => {
      blogUseCase.selectTagPosts(store.state.blog.selectedBlogId, tagId )
        .then((response) => {
          postList.value = response;
        })
        .catch((error) => {
          // 이것의 문제는 then()에서 오류가 발생해도 여기서 catch한다는 문제가 있음
          //router.push( { path: '/login'})
        });
    }

    //  Event Handlers 
    /**
     * 포스트를 선택했을 때 이벤트를 발생시킨다. 
     */
    const onItemSelected = (postId) => {
      debugger 
      envs.commits.setSelectedPostId(store, postId)
    };

    // Subscribe 
    store.subscribe( (mutation, state ) => {
      debugger 
      console.log(mutation.type)
      switch(mutation.type) {
        case envs.subs.setBlogInfo:
          selectBlogPosts(store.state.blog.blogInfo.blogId) 
          break;
        case envs.subs.setSelectedTagId: 
          if(mutation.payload) {
            selectTagPosts(mutation.payload)
          }
          break;
        case envs.subs.unsetSelectedTagId:
          selectBlogPosts(store.state.blog.blogInfo.blogId)
          break;
        defaut:
          break;
      }
    })

    return {
      postList,
      onItemSelected,
    };
  },
});
</script>


<style scoped>

</style>