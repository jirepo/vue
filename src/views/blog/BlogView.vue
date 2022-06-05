<template>


  <div class="blog-view-main">
    <article class="blog-view-content">
      <header class="blog-view-info-title">
        {{ model.postTitle }}
      </header>
      <div class="blog-view-info">
        <div class="blog-view-info-date">
           <span :data-date="model.updDt" v-date-format></span> Modified.
        </div>
        <div class="blog-view-info-button">
          <Button @click="onEditPost" label="수정" class="p-button-raised p-button-sm" />
        </div>
      </div>
      <hr>
      <toast-editor
        ref="refEditor"
        viewer
        height="auto"
        initialValue="xxx"
      ></toast-editor>
      <hr>
      <nav>
        <Button @click="onCloseView" label="목록으로" class="p-button-raised p-button-sm" />
      </nav>
    </article>
    <aside class="blog-view-sidebar">
      <div v-html="toc"></div>
    </aside>
  </div>

</template>


<script>
import ToastEditor from "@/components/framework/ToastEditor.vue";
import BlogUseCase from "@/api/biz/blog/usecase/BlogUseCase";
import { ref, reactive, inject, defineComponent, onMounted , onUpdated} from "vue";
import { useStore } from "vuex";
import Button from 'primevue/button';
//import BlogViewTagPost from './BlogViewTagPost.vue'

/**
 * 블로그 내용 조회 컴포넌트
 * @author Latte 
 */
export default defineComponent({
  props: {
     
  },
  components: {
    ToastEditor,
    Button
  },
  setup(props, { emit }) {

    const envs = { 
      commits: {
        setEditPost(store) {
          store.commit('blog/setEditPost', true) 
        },
        setViewClosed(store) {
          store.commit("blog/setViewClosed", true);
        },
        setSelectedPost(store, post) {
          store.commit('blog/setSelectedPost', post)
        },
        setSelectedPostId(store) {
          store.commit("blog/setSelectedPostId", null);
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
    }

    // Store
    const store = useStore();
    // Control
    const refEditor = ref(null);
    // API
    const blogUseCase = new BlogUseCase(store);

    // Data
    const selectedPostId  = ref('')
    /** 블로그 포스트 정보를 담고 있는 객체  */
    const model = reactive({});
    /** 작성일 */
    const dateaval = ref(1111111);
    /** 목차 */
    const toc = ref("")

    const onInit = () => { 
      selectedPostId.value = store.state.blog.selectedPostId
    }
    onInit(); 

    // Lifecycle Hook
    onMounted(() => {
      // 포스트를 가져온다. 
      blogUseCase
        .selectPost(selectedPostId.value)
        .then((response) => {
          debugger 
          refEditor.value.setMarkdown(response.content);
          model.postId = response.postId; 
          model.postTitle = response.postTitle;
          model.blogId = response.blogId;
          model.regDt = response.regDt;
          model.updDt = response.updDt;
          model.content = response.content;
          model.tagNames = response.tagNames; 
          //debug(model.post)  // 이렇게 하면 처음에는 에러 안나다가 나중에 에러가 발생 왜 나지?
          //debug(model.post.postTitle)
        })
        .catch((error) => {});
    });

    onUpdated( () => {
      // toastui-editor-contents
      // 내용이 변경되면 onUpdated()가 다시 호출되기 때문에 두번 실행되는 것을 막기 위해서 체크한다. 
      if(toc.value != "") { 
        return; 
      }
      // ToastUI Editor의 내용 클래스 
      let ele = document.querySelector(".toastui-editor-contents")
      let tocHtml = ""

      // Toc 마크업을 생성한다. 
      for (let i = 0; i < ele.children.length; i++) {
         let child = ele.children[i]
         let nodeId = child.dataset.nodeid 
         let inHtml  = child.innerHTML
         let space = "X" 

         //let tagName = ele.children[i].tagName
         //console.log(child.innerHTML)
         switch(child.tagName) {
           case "H1":
             space = ""
             break;
           case "H2":
             space = "&nbsp;&nbsp;"
             break;
           case "H3":
             space = "&nbsp;&nbsp;&nbsp;&nbsp;"
             break;
           case "H4":
             space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
             break;
           default:
             space = "x"
             break;
         }
        if(space != "x") {
          child.setAttribute("id", "nodeid" + nodeId)
          tocHtml += "<a href='#nodeid" + nodeId + "'>" +  space + inHtml + "<br>"
        } 
      } // for
      toc.value = tocHtml 
    })

    // Event Handler
    const onCloseView = () => {
      //emit("close-view");
      envs.commits.unsetSelectedPostId(store)
      envs.commits.unsetSelectedPost(store)
      envs.commits.setViewClosed(store) 
    };
    const onEditPost = () => {
      debugger
      //envs.commits.setSelectedPostId(store, model.postId);
      envs.commits.setSelectedPost(store, model); 
      envs.commits.setEditPost(store);
    }

    return { refEditor, onCloseView, model, onMounted, dateaval, toc, onEditPost };
  },
});
</script>
<style scoped>


</style>