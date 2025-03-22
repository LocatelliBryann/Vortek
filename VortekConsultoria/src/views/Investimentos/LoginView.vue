<template>
  <div class="login-container" :class="{ 'fade-out': isTransitioning }">
    <div class="login-box">
      <img src="@/assets/img/LogoInvestimentos.png" alt="Logo Vortek" class="logo" />
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="usuario" placeholder="Usuário" required />
        <input type="password" v-model="senha" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: '',
      senha: '',
      isTransitioning: false
    };
  },
  methods: {
    login() {
      this.isTransitioning = true;
      setTimeout(() => {
        this.$router.push('/invest');
      }, 1000); // Tempo da animação antes da transição
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #f0f0f0;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2E756BFF;
  position: relative;
  overflow: hidden;
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
}

.fade-out {
  opacity: 0;
  transform: scale(1.1);
}

.login-container::before {
  content: "";
  position: absolute;
  width: 500px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -100px;
  left: -100px;
}

.login-container::after {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  bottom: -100px;
  right: -100px;
}

.login-box {
  background-color: white;
  padding: 60px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
  position: relative;
  z-index: 1;
  transition: transform 1s ease-in-out;
}

.fade-out .login-box {
  transform: scale(0.9);
}

.logo {
  width: 300px;
  margin-bottom: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

h2 {
  color: #1b5c51;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="password"] {
  margin-bottom: 30px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #1b5c51;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #164a40;
}
</style>
