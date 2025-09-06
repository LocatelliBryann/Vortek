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
        <h1>Mercado de Criptomoedas</h1>

        <section class="criptoativos-tabela">
          <div class="table-header">
            <h2>Criptomoedas Disponíveis</h2>
            <input
              type="text"
              v-model="search"
              placeholder="Buscar criptoativo..."
              class="search-input"
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Cripto</th>
                <th>Preço Atual (USDT)</th>
                <th @click="toggleOrdenacao" class="sortable">
                  24h
                  <span v-if="ordenacao === 'asc'">🔼</span>
                  <span v-else-if="ordenacao === 'desc'">🔽</span>
                  <span v-else>↕️</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="moeda in moedasFiltradas" :key="moeda.symbol">
                <td>{{ moeda.symbol.replace('USDT', '') }}</td>
                <td>${{ parseFloat(moeda.lastPrice).toFixed(8) }}</td>
                <td :class="{'positive': parseFloat(moeda.priceChangePercent) >= 0, 'negative': parseFloat(moeda.priceChangePercent) < 0}">
                  <span v-if="parseFloat(moeda.priceChangePercent) >= 0">🔺</span>
                  <span v-else>🔻</span>
                  {{ parseFloat(moeda.priceChangePercent).toFixed(2) }}%
                </td>
              </tr>
              <tr v-if="moedasFiltradas.length === 0">
                <td colspan="3">Nenhum resultado encontrado.</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      menuOpen: false,
      moedas: [],
      moedasOriginais: [],
      search: '',
      ordenacao: 'default',
      intervalId: null 
    };
  },
  computed: {
    moedasFiltradas() {
      let lista = [...this.moedas];
      lista = lista.filter(m =>
        m.symbol.toLowerCase().includes('usdt') &&
        m.symbol.toLowerCase().includes(this.search.toLowerCase())
      );
      if (this.ordenacao === 'asc') {
        lista.sort((a, b) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent));
      } else if (this.ordenacao === 'desc') {
        lista.sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent));
      }
      return lista;
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
    toggleOrdenacao() {
      if (this.ordenacao === 'default') {
        this.ordenacao = 'asc';
      } else if (this.ordenacao === 'asc') {
        this.ordenacao = 'desc';
      } else {
        this.ordenacao = 'default';
        this.moedas = [...this.moedasOriginais];
      }
    },
    async buscarDadosMercado() {
      try {
        const response = await axios.get('https://vtk-test-api.d2tecnologia.net.br/api/mercado/');
        if (!response || !Array.isArray(response.data)) {
          throw new Error(response.data?.erro || 'Resposta inválida do backend');
        }

        const filtradas = response.data.filter(m =>
          m.symbol.endsWith('USDT') &&
          !isNaN(parseFloat(m.lastPrice)) &&
          parseFloat(m.lastPrice) >= 0.000001
        );
        this.moedas = [...filtradas];
        this.moedasOriginais = [...filtradas];
      } catch (error) {
        console.error('Erro ao buscar dados de mercado:', error);
        this.moedas = [];
        this.moedasOriginais = [];
      }
    }
  },
  mounted() {
    this.buscarDadosMercado();

    // Atualiza automaticamente a cada 2 segundos
    this.intervalId = setInterval(() => {
      this.buscarDadosMercado();
    }, 2000);
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  },
  setup() {
    const route = useRoute();
    watch(
      () => route.fullPath,
      (to) => {
        if (to === '/markets') {
        }
      }
    );
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.path === '/markets') {
        vm.buscarDadosMercado();
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === '/markets') {
      this.buscarDadosMercado();
    }
    next();
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
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
  text-align: center;
}

.criptoativos-tabela {
  margin-top: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 950px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.criptoativos-tabela h2 {
  margin: 0;
}
.search-input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 220px;
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
.sortable {
  cursor: pointer;
  user-select: none;
}

.positive {
  color: green;
  font-weight: bold;
}
.negative {
  color: red;
  font-weight: bold;
}
</style>
