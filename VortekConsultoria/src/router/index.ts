import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/MainView.vue'
import AboutView from '@/views/AboutView.vue'
import ContateView from '@/views/ContactView.vue'
import LoginView from '@/views/Investimentos/LoginView.vue'
import MainViewCrypto from '@/views/Investimentos/MainViewCrypto.vue'
import DevView from '@/views/DevPage.vue'
import PerfilView from '@/views/Investimentos/PerfilView.vue'
import MarketsViewCrypto from '@/views/Investimentos/MarketsViewCrypto.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // LAYOUT PRINCIPAL (cabeçalho)
    {
      path: '/',
      component: () => import('@/layouts/FullLayoutMain.vue'),
      children: [
        { path: '', name: 'home', component: HomeView, alias: '/home' }, // '/' e '/home'
        { path: 'about', name: 'about', component: AboutView },          // '/about'
        { path: 'contate', name: 'contate', component: ContateView },    // '/contate'
      ],
    },

    // LAYOUT CRYPTO
    {
      path: '/crypto',
      component: () => import('@/layouts/FullLayoutCrypto.vue'),
      children: [
        { path: 'invest', name: 'invest', component: MainViewCrypto, meta: { requiresAuth: true } },
        { path: 'dev', name: 'dev', component: DevView, meta: { requiresAuth: true } },
        { path: 'perfil', name: 'perfil', component: PerfilView, meta: { requiresAuth: true } },
        { path: 'markets', name: 'Markets', component: MarketsViewCrypto, meta: { requiresAuth: true } },
      ],
    },

    // LOGIN EM BLANK
    {
      path: '/auth',
      component: () => import('@/layouts/BlankLayout.vue'),
      children: [{ path: 'login', name: 'login', component: LoginView }],
    },

    // atalhos
    { path: '/login', redirect: '/auth/login' },
    { path: '/invest', redirect: '/crypto/invest' },

    // fallback
    { path: '/:pathMatch(.*)*', redirect: '/auth/login' },
  ],
})

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('access')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) next('/auth/login')
  else if ((to.path === '/auth/login' || to.path === '/login') && isAuthenticated) next('/crypto/invest')
  else next()
})

export default router