<template v-once>
  <input :value="value"   class='customLook'  v-on:change="onChange">
</template>

<script>
import Tagify from "@yaireo/tagify/dist/tagify.min.js";
import "@yaireo/tagify/dist/tagify.css";

export default {
  name: "TagifyBase",
  props: {
    mode: String,
    settings: Object,
    value: [String, Array],
    onChange: Function
  },
  watch: {
    value(newVal, oldVal) {
       // 동작하지 않는다. 확인해보아야 한다.
      this.tagify.loadOriginalValues(newVal)
    },
  },
  mounted() {
    this.tagify = new Tagify(this.$el, this.settings)
  }
};
</script>
<style>
.customLook { 
  --tag-bg: rgb(240,172,129);
  --tag-text-color: black;
  --tag-remove-btn-color: white; 
  --tag-hover: rgb(209,99,31);
}
</style>