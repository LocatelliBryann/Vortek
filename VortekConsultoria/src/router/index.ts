import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainView.vue'
import AboutView from '../views/AboutView.vue'
import ContateView from '../views/ContactView.vue'
import LoginView from '../views/Investimentos/LoginView.vue'
import MainViewCrypto from '../views/Investimentos/MainViewCrypto.vue'
import LogoffView from '../views/Investimentos/LogoffView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      component: () => import("@/layouts/FullLayoutMain.vue"),
      children: [
        {
          path: "/",
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
          path: "/login",
          name: "login",
          component: LoginView,
        },
        {
          path: "/invest",
          name: "invest",
          component: MainViewCrypto,
        },
        {
          path: "/logoff",
          name: "logoff",
          component: LogoffView,
        },
      ]
    },
  ],
})

export default router;
