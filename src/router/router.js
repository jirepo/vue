import { createWebHistory, createRouter } from 'vue-router';

/** VueRouter의 router  */
const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'root'
  },
  {
    path: '/home',  // 홈
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
  },
  {
    path: '/login',  // 로그인 
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    //redirect: '/blog/home', // 블로그 홈 
    //component: () => import('@/views/home/Home.vue'),
    component: () => import('@/views/blog/BlogHome.vue'),
    children: [
      // {
      //   path: 'home', // 블로그 홈
      //   component: () => import('@/views/blog/BlogHome.vue')
      // },
      {
        path: 'main/:blogId',  // 개별 블로그 메인
        component: () => import('@/views/blog/BlogMain.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});