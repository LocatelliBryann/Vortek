<template>
    <header>
        <div class="tudo">
            <ul class="menu">
          <li><RouterLink to="/home">Home</RouterLink></li>
          <li><RouterLink to="/about">Sobre</RouterLink></li>
          <li><RouterLink to="/contate">Contato</RouterLink></li>
        </ul>
        </div>

    </header>
    <Router-view />
</template>

<style scoped>
li {
  margin-left: 10px;
  color: #eef;
  margin-bottom: 15px;
  text-transform: uppercase;
}

a:-webkit-any-link {
  color: #eef;
  cursor: pointer;
  text-decoration: none;
}

 .menu {
    display: flex;
  }

  .tudo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>