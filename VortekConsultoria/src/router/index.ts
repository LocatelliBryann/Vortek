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
          meta: { requiresAuth: true },
        },
        {
          path: "/dev",
          name: "dev",
          component: DevView,
          meta: { requiresAuth: true },
        },
        {
          path: "/perfil",
          name: "perfil",
          component: PerfilView,
          meta: { requiresAuth: true },
        },
        {
          path: "/markets",
          name: "Markets",
          component: MarketsViewCrypto,
          meta: { requiresAuth: true },
        },
      ]
    },
    {
      path: "/", 
      component: () => import("@/layouts/BlankLayout.vue"),
      children: [
        {
          path: "/login",
          name: "login",
          component: LoginView,
        },
      ]
    },
    // Redireciona qualquer rota desconhecida para login
    {
      path: "/:pathMatch(.*)*",
      redirect: "/login",
    },
  ],
})

// Navigation Guard para proteção de rotas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access');
  const isAuthenticated = !!token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Não autenticado e tentando acessar rota protegida
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    // Já autenticado e tentando acessar login
    next('/invest');
  } else {
    next();
  }
});

export default router;  