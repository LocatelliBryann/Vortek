<template>
  <div class="login-container" :class="{ 'fade-out': isTransitioning }">
    <div class="login-box">
      <img src="@/assets/img/LogoInvestimentos.png" alt="Logo Vortek" class="logo" />
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Usuário" required />
        <input type="password" v-model="senha" placeholder="Senha" required />
        <div class="forgot-password">
          <span @click="esqueciSenha" class="forgot-text">Esqueci minha senha</span>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      username: '',
      senha: '',
      isTransitioning: false
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/token/', {
          username: this.username,
          password: this.senha
        });

        const { access, refresh } = response.data;

        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);

        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

        this.isTransitioning = true;
        setTimeout(() => {
          this.$router.push('/invest');
        }, 1000);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao fazer login',
          text: 'Usuário ou senha incorretos.',
          confirmButtonText: 'OK'
        });
      }
    },
    esqueciSenha() {
      if (!this.username) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Você precisa informar o nome de usuário para redefinir a senha.',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Redefinição de senha',
          text: 'O link para redefinição foi enviado para o seu e-mail (simulado).',
          confirmButtonText: 'OK'
        });
      }
    }
  },
  mounted() {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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

.forgot-password {
  text-align: right;
}

.forgot-text {
  font-size: 12px;
  color: #28a745;
  cursor: pointer;
}

.forgot-text:hover {
  text-decoration: underline;
}
</style>
