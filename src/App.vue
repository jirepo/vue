<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script setup>
// import 
//import Login from '@/views/login/Login.vue';
import { onMounted, computed,  ref, inject } from "vue";
import { useStore } from "vuex";
const store = useStore();

const MIMEType = inject("MIMEType");

const ajax = inject("ajax");

const checked = ref(true)

</script>

<style>
</style>