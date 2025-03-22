<template>
  <transition name="fade">
    <div class="home-container">
      <aside class="sidebar">
        <!-- <img src="@/assets/img/LogoInvestimentos.png" alt="Logo Vortek" class="logo" /> -->
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Carteira</li>
            <li>Relatórios</li>
            <li>Configurações</li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <header>
          <h1>Bem-vindo ao Painel</h1>
        </header>
        <section class="cards">
          <div class="card">Aportes: $0.00</div>
          <div class="card">Saldo: $0.00</div>
          <div class="card">Lucro: $0.00</div>
          <div class="card">% Lucro: 0.00%</div>
        </section>
      </main>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  mounted() {
    this.show = true;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.home-container {
  display: flex;
  height: 100vh;
  background-color: #2E756BFF;
}

.sidebar {
  width: 250px;
  background-color: #1b5c51;
  padding: 20px;
  color: white;
}

.logo {
  width: 200px;
  display: block;
  margin: 0 auto 20px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  padding: 10px 0;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
}

header h1 {
  color: #1b5c51;
}

.cards {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
  font-size: 18px;
}
</style>
