<script>
export default {

}
</script>

<template>
  <div class="cabecalho"></div>
  <header>
    <div class="tudo">
      <a href="/"><img src="@/assets/img/LogoConsultoriaWhite.png" alt="Logo Consultoria" class="logo" /></a>
      <div class="menu">

        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">Sobre Nós</RouterLink>
          </li>
          <li>
            <RouterLink to="/contate">Contato</RouterLink>
          </li>
          <li>
            <RouterLink to="/producoes">Produções</RouterLink>
          </li>
          <li>
            <RouterLink to="/login">Investimentos</RouterLink>
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
}

a:hover {
  color: rgb(236, 109, 50);
}

header {
  background-color: rgb(9, 7, 3);
}
</style>
