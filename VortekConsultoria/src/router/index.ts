import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainView.vue'
import AboutView from '../views/AboutView.vue'
import ContateView from '../views/ContactView.vue'

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
  ],
})

export default router;
