<template>
  <div>
    <div>목록 시작</div>
    <div v-for="item in postList" v-bind:key="item.postId">
      <span @click="onItemSelected(item.postId)">{{ item.postTitle }}</span>
    </div>
    <div>목록 끝</div>
  </div>
</template>

<script>
import BlogUseCase from "@/api/biz/blog/usecase/BlogUseCase.ts";
import { reactive, ref, inject, defineComponent, watch,  onMounted, onUpdated, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

// const emit = defineEmits(['item-selected']) // <script setup> 사용할 때는 이 방식으로

export default defineComponent({
  props: {
    tagId: {
      type: String, 
      default: ''
    }
  },  
  setup(props, { emit }) {
    // Router
    const route = useRoute()
    const router = useRouter();
    // Logger
    const debug = inject("debug");
    // store
    const store = useStore();
    // API
    const blogUseCase = new BlogUseCase(store);

    // Control Data
    let isUpdated = false;

    // Data
    let postList = ref([]);

    /** 선택된 태그 아이디 */ 
    const selectedTagId = ref('')
    watch( () => props.tagId, (newTagId, oldTagId) => {
      selectTagPosts(newTagId)
    })
  
    //  Custom Events
    /**
     * 포스트를 선택했을 때 이벤트를 발생시킨다. 
     */
    const onItemSelected = (postId) => {
      debugger 
      //store.commit('blog/setSelectedPostId', postId)
    };
    
    /**
     * 태그에 속한 포스트들을 가져온다. 
     * @param {string} tagId 태그 아이디
     */
    const selectTagPosts = (tagId) => {
      blogUseCase.selectTagPosts(store.state.blog.selectedBlogId, tagId )
        .then((response) => {
          debugger
          postList.value = response;
        })
        .catch((error) => {
          // 이것의 문제는 then()에서 오류가 발생해도 여기서 catch한다는 문제가 있음
          //router.push( { path: '/login'})
        });
    }
    // Lifecycle Hook
    onMounted( () => {
      debugger 
      if(props.tagId == '') return; 
      selectTagPosts(props.tagId)
    })
    onUpdated( () => {
    })
    onUnmounted( () => {
      debugger
      console.log('unmounted')
    })
        
    return {
      postList,
      onItemSelected,
    };
  },
});
</script>
