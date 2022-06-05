<script>
import ToastEditor from "@/components/framework/ToastEditor.vue";
import Tags from "@/components/framework/Tagify.vue";
import BlogUseCase from "@/api/biz/blog/usecase/BlogUseCase";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref, reactive, inject, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    ToastEditor,
    Button,
    InputText,
    Tags
  },
  props: {},
  setup(props, { emit }) {
    const envs = { 
      commits: {
        setViewClosed(store) {
          store.commit("blog/setViewClosed", true);
        },
        unsetSelectedPostId(store) {
          store.commit("blog/unsetSelectedPostId", null);
        },
        unsetSelectedPost(store) {
          store.commit("blog/unsetSelectedPost", null);        
        }
      }, 
      subs: {
      },
      push: { 
      }
    }// envs 

    // Component
    const editor = ref(null);
    // Store
    const store = useStore();
    // API
    let blogUseCase = new BlogUseCase(store);
    // Data
    const selectedBlogId = ref("");
    const selectedPostId = ref("");
    const newTags = ref([])

    const post = reactive({
      postTitle: "",
      tagNames: "",
      content: "",
    });

    // Initialize 
    const onInit = () => { 
      selectedBlogId.value = store.state.blog.selectedBlogId;
      selectedPostId.value = store.state.blog.selectedPostId;
      post.postId = selectedPostId.value;
      post.blogId = selectedBlogId.value;
    }
    onInit()

    // Lifecycle Hook
    onMounted(() => {
      debugger 
      let selectedPost = store.state.blog.selectedPost;
      if (!selectedPost) {
        return;
      }
      post.postTitle = selectedPost.postTitle;
      post.tagNames = selectedPost.tagNames;
      editor.value.setMarkdown(selectedPost.content);
    });


    // Event Handlers
    /** 작성 내용을 저장한다. */
    const onSave = () => {
      debugger 
      if (post.postId) {
        updatePost();
      } else {
        insertPost();
      }
    }; // save
    const insertPost = () => {
      let content = editor.value.getMarkdown();
      post.content = content;
      newTags.value.forEach( (item, index) => {
        if(index > 0) {
          post.tagNames =  post.tagNames + "," + item.value
        }else {
          post.tagNames = item.value  
        }
      })
      blogUseCase
        .insertPost(post)
        .then((response) => {
          envs.commits.setViewClosed(store)
        })
        .catch((error) => {
          // NotLoginException은 여기서 처리해야 할 것 같은데
        });
    };
    const updatePost = () => {
      let content = editor.value.getMarkdown();
      post.content = content;
      newTags.value.forEach( (item, index) => {
        if(index > 0) {
          post.tagNames =  post.tagNames + "," + item.value
        }else {
          post.tagNames = item.value  
        }
      })
      alert(post.tagNames)
      blogUseCase
        .updatePost(post)
        .then((response) => {
          envs.commits.unsetSelectedPostId(store)
          envs.commits.unsetSelectedPost(store)
          envs.commits.setViewClosed(store)

        })
        .catch((error) => {
          // NotLoginException은 여기서 처리해야 할 것 같은데
        });
    };
    const onTagsChange = (e) => { 
      let arr = JSON.parse(e.target.value)
      newTags.value = arr
      //console.log(typeof newTags.value)
      // newTags.value.forEach( (item, index) => {
      //   console.log(item.value)
      // })
      
    }

    const onCloseView = () => {
      envs.commits.unsetSelectedPostId(store)
      envs.commits.unsetSelectedPost(store)
      envs.commits.setViewClosed(store)
    };

    return {
      editor,
      onSave,
      onCloseView,
      post,
      selectedBlogId,
      onTagsChange
    };
  },
});
</script>

<template>
  <div class="blog-edit-main">
    <div>
      <div class="blog-edit-main-item">
        <InputText type="text" placeholder="제목을 입력하세요" v-model="post.postTitle"  style="width:100%" />
      </div>
      <div class="blog-edit-main-item">
        <!-- <InputText type="text" placeholder="Tag를 입력하세요" v-model="post.tagNames"  style="width:100%"  /> -->
        <Tags :value="post.tagNames"   :onChange="onTagsChange" />
      </div>
    </div>
    <div class="blog-edit-main-item">
        <toast-editor
          ref="editor"
          height="auto"
          :blog-id="selectedBlogId"
          initialValue=""
        ></toast-editor>
    </div>
    <div class="blog-edit-main-item">
      <Button @click="onSave" label="등록하기" class="p-button-raised p-button-sm" />&nbsp;
      <Button @click="onCloseView" label="취소" class="p-button-raised p-button-sm" />
    </div>
  </div>
</template>