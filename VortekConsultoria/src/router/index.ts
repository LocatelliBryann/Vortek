import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainView.vue'
import AboutView from '../views/AboutView.vue'
import ContateView from '../views/ContactView.vue'
import LoginView from '../views/Investimentos/LoginView.vue'
import MainViewCrypto from '../views/Investimentos/MainViewCrypto.vue'
// import LogoffView from '../views/Investimentos/LogoffView.vue'
import DevView from '../views/DevPage.vue'
import PerfilView from '../views/Investimentos/PerfilView.vue'
import MarketsViewCrypto from '../views/Investimentos/MarketsViewCrypto.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      component: () => import("@/layouts/FullLayoutMain.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "/contate",
          name: "contate",
          component: ContateView,
        },
        {
          path: "/about",
          name: "about",
          component: AboutView,
        },
      ]
    },
    {
      path: "/crypto",
      component: () => import("@/layouts/FullLayoutCrypto.vue"),
      children: [
        
        {
          path: "/invest",
          name: "invest",
          component: MainViewCrypto,
        },
        {
          path: "/dev",
          name: "dev",
          component: DevView,
        },
        {
          path: "/perfil",
          name: "perfil",
          component: PerfilView,
        },
        {
          path: "/markets",
          name: "Markets",
          component: MarketsViewCrypto,
        },
      ]
    },
    {
      path:"/", 
      component: () => import("@/layouts/BlankLayout.vue"),
      children: [
        {
          path: "/login",
          name: "login",
          component: LoginView,
        },
        
      ]
    },
  ],
})

export default router;
