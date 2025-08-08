<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function fazerLogoff() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  router.push('/login')
}
</script>

<template>
  <div class="cabecalho"></div>
  <header>
    <div class="tudo">
      <img src="@/assets/img/LogoInvestimentos.png" alt="Logo Consultoria" class="logo" />
      <div class="menu">
        <ul>
          <li>
            <RouterLink to="/invest">Home</RouterLink>
          </li>
          <li class="logoff">
            <a href="#" @click.prevent="fazerLogoff">Logoff</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.logo {
  width: 200px;
  margin-bottom: 5px;
}

.tudo {
    display: flex;
    align-items: left;
    justify-content: left;
}

ul {
  display: flex;
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  color: rgb(230, 119, 16);
  text-transform: uppercase;
}

a {
  color: rgb(23, 23, 24);
  text-decoration: none;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  padding: 0;
}

a:hover {
  color: rgb(236, 109, 50);
}

header {
  background-color: rgb(28, 91, 82);
}
</style>