<template>
  <header></header>
  <nav class="home-navi">
    <span @click="goHome"><i class="home-navi-icon fab fa-app-store-ios"></i></span>
    &nbsp;&nbsp;
    <span @click="goBlog"><strong>Blog</strong></span>
  </nav>
  <hr>
  <div>
    <router-view></router-view>
  </div>
  <footer class="home-footer">Latte. Since 2021.</footer>
</template>

<script>
import { inject , defineComponent} from 'vue'
import { useRoute, useRouter  } from 'vue-router'
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    // Router
    //const route = useRoute()
    const router = useRouter()
    // Logger
    const debug = inject("debug")
    // store
    const store = useStore();    

        // Event Handlers
    const goHome = () => {
      //location.reload()  // 이 방법으로 해야하나?????????  
      router.push( { path: '/'}) 
    }
    const goBlog = () => {
      //location.reload()  // 이 방법으로 해야하나?????????  
      router.push( { path: '/blog'}) 
    }

    // temporary settings
    //router.push( { path: '/blog/main/a'}) 
    return { 
      router,
      debug,
      goHome ,
      goBlog
    }
  },
})
</script>
<style scoped>

</style>
