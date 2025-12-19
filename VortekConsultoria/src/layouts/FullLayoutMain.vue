<script>
export default { name: 'FullLayoutMain' }
</script>

<template>
  <v-app>
    <!-- HEADER FIXO -->
    <header class="site-header">
      <div class="tudo">
        <RouterLink to="/home" class="logo-link">
          <img src="@/assets/img/LogoConsultoriaWhite.png" alt="Logo Consultoria" class="logo" />
        </RouterLink>

        <nav class="menu">
          <ul>
            <li><RouterLink to="/home">Home</RouterLink></li>
            <li><RouterLink to="/about">Sobre Nós</RouterLink></li>
            <li><RouterLink to="/contate">Contato</RouterLink></li>
            <li><RouterLink to="/devproducoes" class="producoes-link">Produções</RouterLink></li>
            <li><RouterLink to="/auth/login" class="investimentos-link">Consultoria</RouterLink></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- CONTEÚDO DAS ROTAS -->
    <main class="app-content">
      <RouterView />
    </main>
  </v-app>
</template>

<style scoped>
.site-header{
  position: sticky; top: 0; z-index: 1000;
  background: rgba(9,7,3,.98);
  backdrop-filter: saturate(140%) blur(6px);
  border-bottom: 1px solid rgba(255,255,255,.08);
}

.tudo{ display:flex; align-items:center; justify-content:space-between; max-width:1200px; margin:0 auto; padding:10px 16px; }
.logo{ width: 350px; }
.logo-link{ display:flex; align-items:center; }

.menu ul{ display:flex; gap:18px; list-style:none; margin:0; padding:0; }
.menu li{ text-transform:uppercase; }
.menu a{ color:#f7f7f7; text-decoration:none; font-weight:600; }
.menu a:hover{ color:#ff9a3c; }

:deep(.investimentos-link:hover){ color:#1F7564FF !important; }
:deep(.producoes-link:hover){ color:rgb(185, 67, 185) !important; }

/* evita que o topo da página fique “colado” no header quando não usa v-main */
.app-content{ min-height: calc(100vh - 70px); }
@media (max-width: 768px){
  .menu ul{ gap:12px; }
  .logo{ width: 150px; }
}
</style>