<template>
  <div class="login-container">
    <div class="login-label">
      Login
    </div>
    <div><InputText  v-model="user.email" class="login-input" type="text" placeholder="Input your email." /></div>
    <br>
    <div><InputText  v-model="user.password" class="login-input" type="text" placeholder="Input your password." /></div>
    <br />
    <div class="login-button-div"> 
      <Button label="Login" @click="login"  class="p-button-raised" />
      &nbsp;
      <Button label="Cancel"   class="p-button-raised p-button-danger" />
    </div>
  </div>
</template>
<script>
// import
import { useRoute, useRouter } from "vue-router";
import LoginUseCase from "@/api/biz/login/usecase/LoginUseCase";
import { onMounted, ref, reactive, inject, defineComponent } from "vue";
import { useStore } from "vuex";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';


export default defineComponent({
  components : {
    InputText, 
    Button
  },
  setup() {
    const envs = { 
      commits: { 
        setLoginUser(store, val) {
          store.commit('setLoginUser', val)
        }
      },
      subs: {
      },
      push: { 
        goHome(router) {
          debugger
          router.push({ path: "/" }); // main
        }
      }
    }
    // Store
    const store = useStore();
    // Router
    const route = useRoute();
    const router = useRouter();

    // API
    let loginUseCase = new LoginUseCase(store);

    // Data
    const user = reactive({
      email: "",
      password: "",
    });

    // method
    const login = () => {
      //member.email = '444';
      console.log(user.email);
      if (!user.email) {
        alert("email empty");
        return;
      }
      if (!user.password) {
        alert("password empty");
        return;
      }
      loginUseCase
        .login(user)
        .then((response) => {
          // 사용자 정보 저장
          envs.commits.setLoginUser(store, response)
          envs.push.goHome(router);
        })
        .catch((error) => {
          /// 오류에 대한 공통 처리를 어떻게할지 방법을 찾아야 함
        });
    };

    return { 
      login,
      user
      }
  },
});
</script>
<style scoped>

</style>
