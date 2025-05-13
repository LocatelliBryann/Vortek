<template>
  <transition name="fade">
    <div class="home-container" @click="handleClickOutside">
      <button class="menu-button" @click="toggleMenu">☰</button>
      <aside class="sidebar" v-show="menuOpen" ref="sidebar">
        <nav>
          <ul>
            <li><router-link to="/markets">Mercados</router-link></li>
            <li><router-link to="/invest">Portfólio</router-link></li>
            <li><router-link to="/dev">Simular</router-link></li>
            <li><router-link to="/dev">P2P</router-link></li>
            <li><router-link to="/perfil">Perfil</router-link></li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <h1>Bem-vindo(a) {{ nome_completo }}</h1>
        <section class="cards">
          <div class="card">
            <img src="@/assets/img/aportes.png" alt="Aportes"> Aportes: R$0.00
          </div>
          <div class="card">
            <img src="@/assets/img/saldo.png" alt="Saldo"> Saldo: R$0.00
          </div>
          <div class="card">
            <img src="@/assets/img/lucro.png" alt="Lucro"> Lucro: R$0.00
          </div>
          <div class="card">
            <img src="@/assets/img/percent.png" alt="Porcentagem Lucro"> % Lucro: 0.00%
          </div>
        </section>

        <button class="btn-aporte" @click="mostrarModal = true">Novo Aporte</button>

        <section class="criptoativos-tabela">
          <h2>Criptoativos Disponíveis</h2>
          <table>
            <thead>
              <tr>
                <!-- <th>Sigla</th> -->
                <th>Nome</th>
                <th>Saldo</th>
                <th>Preço Atual (USD)</th>
                <th>Quantidade</th>
                <th>Valor Aportado (R$)</th>
                <th>Lucro</th>
                <th>% Lucro</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cripto in criptoativos" :key="cripto.id">
                <td>{{ cripto.cripto_sigla }}</td>
                <td>{{ cripto.Criptoativo }}</td>
                <td>R$ {{ parseFloat(cripto.valor).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <div v-if="mostrarModal" class="modal-overlay" @click.self="mostrarModal = false">
          <div class="modal-content">
            <h2>Novo Aporte</h2>

            <label>Moeda</label>
            <select v-model="moedaSelecionada" @change="buscarPrecoMoeda">
              <option disabled value="">Selecione uma moeda</option>
              <option v-for="moeda in moedasBinance" :key="moeda.symbol" :value="moeda">
                <!-- <img :src="`https://cryptoicon-api.pages.dev/api/icon/${moeda.symbol.toLowerCase()}`" style="width: 16px; margin-right: 5px;"> -->
                {{ moeda.baseAsset }} - {{ moeda.symbol }}
              </option>
            </select>

            <label>Preço da moeda (R$)</label>
            <input type="text" v-model="precoMoeda" readonly>

            <label>Data do Aporte</label>
            <input type="date" v-model="dataAporte">

            <label>Valor Aportado</label>
            <input type="number" v-model="valorAportado" placeholder="R$ 0,00">

            <label>Quantidade de moedas</label>
            <input type="number" v-model="quantidadeMoedas" placeholder="0.00000">

            <button class="btn-salvar" @click="salvarAporte">Salvar</button>
          </div>
        </div>
      </main>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      menuOpen: false,
      mostrarModal: false,
      criptoativos: [],
      moedasBinance: [],
      moedaSelecionada: '',
      precoMoeda: '',
      dataAporte: '',
      valorAportado: '',
      quantidadeMoedas: '',
      lastChangedField: '',
      username: '',
      nome_completo: '',
    };
  },
  watch: {
    valorAportado(newValue) {
      if (this.lastChangedField === 'quantidade') return;
      if (!this.precoMoeda || parseFloat(this.precoMoeda) === 0) return;

      this.lastChangedField = 'valor';
      const valor = parseFloat(newValue);
      const preco = parseFloat(this.precoMoeda);

      if (!isNaN(valor) && !isNaN(preco)) {
        this.quantidadeMoedas = (valor / preco).toFixed(5);
      } else {
        this.quantidadeMoedas = '';
      }
    },
    quantidadeMoedas(newValue) {
      if (this.lastChangedField === 'valor') return;
      if (!this.precoMoeda || parseFloat(this.precoMoeda) === 0) return;

      this.lastChangedField = 'quantidade';
      const quantidade = parseFloat(newValue);
      const preco = parseFloat(this.precoMoeda);

      if (!isNaN(quantidade) && !isNaN(preco)) {
        this.valorAportado = (quantidade * preco).toFixed(2);
      } else {
        this.valorAportado = '';
      }
    }
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
    },
    async buscarCriptoativos() {
      try {
        const response = await axios.get('http://localhost:8000/api/criptoativos/');
        this.criptoativos = response.data;
      } catch (error) {
        console.error("Erro ao buscar criptoativos:", error);
      }
    },
    async buscarMoedasBinance() {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
        this.moedasBinance = response.data.symbols.filter(m => m.quoteAsset === 'USDT');
      } catch (error) {
        console.error("Erro ao buscar moedas da Binance:", error);
      }
    },
    async buscarPrecoMoeda() {
      if (!this.moedaSelecionada) return;
      try {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${this.moedaSelecionada.symbol}`);
        this.precoMoeda = parseFloat(response.data.price).toFixed(10);
      } catch (error) {
        console.error("Erro ao buscar preço da moeda:", error);
      }
    },
    salvarAporte() {
      Swal.fire({
        icon: 'success',
        title: 'Aporte salvo com sucesso!',
        showConfirmButton: false,
        timer: 2000
      });
      this.mostrarModal = false;
    }
  },
  mounted() {
  this.buscarCriptoativos();
  this.buscarMoedasBinance();
  const hoje = new Date().toISOString().split('T')[0];
  this.dataAporte = hoje;

  const token = localStorage.getItem("access");
  if (token) {
    axios.get("http://localhost:8000/api/user/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      this.username = response.data.username;
      this.nome_completo = response.data.nome_completo;
    })
    .catch(error => {
      console.error("Erro ao obter usuário:", error);
    });
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

.criptoativos-tabela {
  overflow-x: auto;
  margin-top: 40px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 950px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.criptoativos-tabela h2 {
  margin-bottom: 15px;
}
.criptoativos-tabela table {
  width: 100%;
  border-collapse: collapse;
}
.criptoativos-tabela th,
.criptoativos-tabela td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.criptoativos-tabela th {
  background-color: #f4f4f4;
}

.btn-aporte {
  margin-top: 30px;
  background-color: #1b5c51;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}
.btn-aporte:hover {
  background-color: #14473D;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: #1f1f1f;
  padding: 30px;
  border-radius: 10px;
  color: white;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-content input,
.modal-content select {
  padding: 10px;
  border-radius: 6px;
  border: none;
  width: 100%;
}

.btn-salvar {
  margin-top: 10px;
  background-color: #00c853;
  border: none;
  padding: 10px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>