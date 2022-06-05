<template>
  <div ref="refEditor"></div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Editor from "@toast-ui/editor";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import env from "@/api/environment";

//import hljs from 'highlight.js';

import { ref, onMounted, onUnmounted, inject } from "vue";

/**
 * 이미지 업로드하고  Editor에 이미지 태그를 추가한다.
 * @param blogId 블로그아이디
 * @param blog blob 이미지
 * @param editor 에디터 참조
 * @param url 이미지 업로드 URL
 * @param ajax AJAX 함수
 */
const uploadImage = (blogId, blob, editor, url, ajax) => {
  let formData = new FormData();
  formData.append("uploadFile", blob);
  formData.append("blogId", blogId);

  // ajax test
  let options = {
    url: url + "/put-blog-image/", //"http://localhost/put-blog-image",
    method: "POST",
    isFileUpload: true,
    // 폼데이터로 업로드할 때에는 headers가 비어야 한다.
    headers: {
      //Accept: "application/json", // 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지
      //"Content-Type": "application/octet-stream", // 서버에 어떤 형식의 데이터를 보내는지 알려줌
    },
    body: formData,
  };
  ajax(options)
    .then((response) => {
      let imgPath = "![img](" + url + "/get-blog-image?blogId=" + blogId + "&fileName=" +   response.name +  ")";
      editor.replaceSelection(imgPath);
    })
    .catch((error) => {
      console.log(error);
    });
}; // uploadImage

export default {
  props: {
    /** 블로그아이디 */
    blogId: {
      type: String,
      default: "",
    },
    /** 에디터 높이 */
    height: {
      type: String,
      default: "auto",
    },
    /** 에디터 타입 */
    initialEditType: {
      type: String,
      default: "markdown",
    },
    /** 미리보기 스타일 */
    previewStyle: {
      type: String,
      default: "vertical",
    },
    /** 초기값 */
    initialValue: {
      type: String,
      default: "",
    },
    /** Viewer 모드  */
    viewer: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { attrs, slots, emit }) {
    const ajax = inject("ajax");
    const refEditor = ref(null); // template의 ref의 값과 동일한 변수 선언
    let editorObj = null;

    // Method
    /** 컨텐츠를 HTML로 반환한다. */
    const getHTML = () => {
      return editorObj.getHTML();
    };
    /** HTML 컨텐츠를 추가한다. */
    const setHTML = (html) => {
      editorObj.setHTML(html);
    };
    /** 컨텐츠를 마크다운으로 반환한다. */
    const getMarkdown = () => {
      return editorObj.getMarkdown();
    };
    /** 마크다운 형식으로 컨텐츠를 설정한다. */
    const setMarkdown = (markdown) => {
      editorObj.setMarkdown(markdown);
    };

    // Lifecycle Hook
    onUnmounted(() => {
      if (editorObj) {
        editorObj.destroy();
      }
    });
    onMounted(() => {
      if (props.viewer) {
        // Viewer로 동작
        editorObj = new Viewer({
          el: refEditor.value,
          initialValue: props.initialValue,
          plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
        });
      } else {
        // editor로 동작
        editorObj = new Editor({
          el: refEditor.value,
          height: props.height,
          initialEditType: props.initialEditType,
          previewStyle: props.previewStyle,
          initialValue: props.initialValue,
          plugins: [
            [codeSyntaxHighlight, { highlighter: Prism }],
            [colorSyntax],
          ],
          hooks: {
            // 클립보드 이미지 붙여넣기 hook 
            addImageBlobHook: (blob, callback) => {
              uploadImage(props.blogId, blob, editorObj, env.SERVER_URL, ajax); // 이미지 업로드
            },
          },
        });
      }
    });

    return {
      refEditor,
      getHTML,
      setHTML,
      setMarkdown,
      getMarkdown,
    };
  }, // setup()
}; //default
</script>
<style scoped>


.toastui-editor-contents h1 {
  font-size: 30px !important;
  background-color: red !important;
}

</style>