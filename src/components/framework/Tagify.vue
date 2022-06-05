<template>
   <Tags ref="myRef" 
       :settings="tagifyStuff.tagifySettings" 
       :suggestions="tagifyStuff.suggestions" 
       :value="value"   
       :onChange="onTagsChange"/>
</template>

<script>
import { defineComponent , ref,  reactive } from 'vue' 
import Tags from '@/components/framework/TagifyBase.vue' 


export default defineComponent({
  components: {
    Tags 
  },
  props: {
    value: [String, Array],
    onChange: Function
  },
  setup(props) {
    const myRef = ref(null)
    const tagifyStuff = reactive({ 
      //value: "a,b,c",   // 값을 설정하면 초기값이 된다.
      //value: props.value,   // 값을 설정하면 초기값이 된다.
      tagifySettings: {
        placeholder: "Tag를 입력하세요",
        readOnly: "readOnly",   // 읽기 전용, 작동하지 않음 
        //whitelist: ["Korea", "England", "Japan", "German", "America", "Aus"],
        // whitelist: [
        //   { value: "Korea(aaa@bbb.com)", nickname: "Korea", email: "aaa@bbb.com"},
        //   { value: "England(aac@bbb.com)", nickname: "England", email: "aac@bbb.com"}
        // ],
        userInput: true, // false이면 사용자 입력을 막는다
        dropdown: {
          // sorting은 지원하지 않음 
          //classname: "customLook",  // 작동하지 않음 
          //searchKeys: [ "nickname", "email"],  // whitelist에서 검색할 때 사용할 필드 
          maxItems: 5,   // 최대 추천 아이템 수 
          //position: "text",   // dropdown을 입력 텍스트에 가까이 표시
          //closeOnSelect : false,     // 추천을 선택한 후에도 dropdown을 유지하려면 false , true이면 닫힘 
          highlightFirst: true,
          enabled: 1  // 0이면 dropdown을 포커스가 갔을 때 즉시 활성화 , 1이면 타이핑을 했을 때 활성화 
        },
        callbacks: {
          add(e) {
             //console.log("tag added:", e.detail); // tag가 추가되거나 삭제되면 호출된다. 
          }
        }
      },
      suggestions: []
    })
    function updateValue(newValue){
      tagifyStuff.value = newValue
    }

    function onTagsChange(e) {
       console.log("tags changed:", e.target.value); // 태그가 추가되거나 삭제되면 호출된다. 
       if(props.onChange) {
         props.onChange(e)
       } 
    }

    return  {
      onTagsChange,
      myRef,
      tagifyStuff
    }

  },
})
</script>

