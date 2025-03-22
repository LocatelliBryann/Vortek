<template>
  <transition name="fade">
    <div class="home-container" @click="handleClickOutside">
      <button class="menu-button" @click="toggleMenu">☰</button>
      <aside class="sidebar" v-show="menuOpen" ref="sidebar">
        <nav>
          <ul>
            <li><router-link to="/dev">Mercados</router-link></li>
            <li><router-link to="/invest">Portfólio</router-link></li>
            <li><router-link to="/dev">Simular</router-link></li>
            <li><router-link to="/dev">P2P</router-link></li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <h1>Bem-vindo(a) {username}</h1>
        <section class="cards">
          <div class="card">
            <img src="@/assets/img/aportes.png" alt="Aportes">
            Aportes: R$0.00
          </div>
          <div class="card">
            <img src="@/assets/img/saldo.png" alt="Saldo">
            Saldo: R$0.00
          </div>
          <div class="card">
            <img src="@/assets/img/lucro.png" alt="Lucro">
            Lucro: R$0.00
          </div>
          <div class="card">
            <img src="@/assets/img/percent.png" alt="Porcentagem Lucro">
            % Lucro: 0.00%
          </div>
        </section>
      </main>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu(event) {
      event.stopPropagation();
      this.menuOpen = !this.menuOpen;
    },
    handleClickOutside(event) {
      if (this.menuOpen && !this.$refs.sidebar.contains(event.target)) {
        this.menuOpen = false;
      }
    }
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
  flex-direction: column;
  height: 100vh;
  background-color: #2E756BFF;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1b5c51;
  padding: 15px 20px;
  color: white;
}

.logo {
  width: 150px;
}

.menu-button {
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.sidebar {
  position: absolute;
  top: 60px;
  left: 0;
  width: 250px;
  background-color: #14473D;
  padding: 20px;
  color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
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
  text-align: center;
}

.cards {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
  font-size: 18px;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.card img {
  width: 30px;
  height: 30px;
}
</style>
