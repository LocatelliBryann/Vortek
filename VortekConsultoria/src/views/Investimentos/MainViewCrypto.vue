<template>
  <transition name="fade">
    <div class="home-container" @click="handleClickOutside">
      <button class="menu-button" @click="toggleMenu">☰</button>
      <aside class="sidebar" v-show="menuOpen" ref="sidebar">
        <nav>
          <ul>
            <li><router-link to="/crypto/markets">Mercados</router-link></li>
            <li><router-link to="/crypto/invest">Portfólio</router-link></li>
            <li><router-link to="/crypto/dev">Simular</router-link></li>
            <li><router-link to="/crypto/dev">P2P</router-link></li>
            <li><router-link to="/crypto/perfil">Perfil</router-link></li>
          </ul>
        </nav>
      </aside>

      <main class="content">
        <h1>Bem-vindo(a) {{ nome_completo }}</h1>

        <section class="cards">
          <div class="card">
            <img src="@/assets/img/aportes.png" alt="Aportes" />
            Aportes: R$ {{ totalAportes.toFixed(2) }}
          </div>
          <div class="card">
            <img src="@/assets/img/saldo.png" alt="Saldo" />
            Saldo: R$ {{ totalSaldo.toFixed(2) }}
          </div>
          <div class="card">
            <img src="@/assets/img/lucro.png" alt="Lucro" />
            Lucro: R$ {{ totalLucro.toFixed(2) }}
          </div>
          <div class="card">
            <img src="@/assets/img/percent.png" alt="Porcentagem Lucro" />
            % Lucro: {{ totalPercentual.toFixed(2) }}%
          </div>
        </section>

        <button class="btn-aporte" @click="abrirModalNovoAporte">Novo Aporte</button>

        <section class="criptoativos-tabela">
          <h2>Criptoativos Adquiridos</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Saldo (R$)</th>
                <th>Preço Atual (R$)</th>
                <th>Quantidade</th>
                <th>Valor Aportado (R$)</th>
                <th>Lucro</th>
                <th>% Lucro</th>
                <th>Data do Aporte</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="criptoativos.length === 0">
                <td colspan="9">Nenhum aporte encontrado</td>
              </tr>
              <tr v-for="cripto in criptoativos" :key="cripto.id">
                <td>{{ cripto.sigla }}</td>
                <td>R$ {{ cripto.valorAtual.toFixed(2) }}</td>
                <td>R$ {{ cripto.preco.toFixed(2) }}</td>
                <td>{{ cripto.quantidade.toFixed(5) }}</td>
                <td>R$ {{ cripto.valorAportado.toFixed(2) }}</td>
                <td>R$ {{ cripto.lucro.toFixed(2) }}</td>
                <td>{{ cripto.percentual.toFixed(2) }}%</td>
                <td>{{ formatarData(cripto.dataAporte) }}</td>
                <td>
                  <button class="btn-deletar" title="Excluir aporte" @click="deletarAporte(cripto.id)">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <div v-if="mostrarModal" class="modal-overlay" @click.self="mostrarModal = false">
          <div class="modal-content">
            <h2>Novo Aporte</h2>
            <label>Moeda</label>
            <select v-model="moedaSelecionada" @change="buscarPrecoMoeda" :disabled="criptoativosBanco.length === 0">
              <option disabled value="">
                {{ criptoativosBanco.length === 0 ? 'Carregando moedas...' : 'Selecione uma moeda' }}
              </option>
              <option v-for="moeda in criptoativosBanco" :key="moeda.id" :value="moeda">
                {{ moeda.cripto_sigla }} - {{ moeda.Criptoativo }}
              </option>
            </select>
            <label>Preço da moeda (R$)</label>
            <input type="number" step="any" v-model="precoMoeda" @input="aoAlterarPrecoMoeda" placeholder="Preço em reais">
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      menuOpen: false,
      mostrarModal: false,
      criptoativos: [],
      criptoativosBanco: [],
      moedaSelecionada: "",
      precoMoeda: "",
      dataAporte: "",
      valorAportado: "",
      quantidadeMoedas: "",
      lastChangedField: "",
      nome_completo: "",
      totalAportes: 0,
      totalSaldo: 0,
      totalLucro: 0,
      totalPercentual: 0,
      intervalId: null,
      apiUser: "http://api.vortek.inf.br/api/user/",
      apiCriptoativos: "http://api.vortek.inf.br/api/criptoativos/",
      apiAportes: "http://api.vortek.inf.br/api/aportes/",
      apiPrecos: "http://api.vortek.inf.br/api/preco/",
    };
  },
  watch: {
    valorAportado(newValue) {
      if (this.lastChangedField === "quantidade") return;
      if (!this.precoMoeda || parseFloat(this.precoMoeda) === 0) return;
      this.lastChangedField = "valor";
      const valor = parseFloat(newValue);
      const preco = parseFloat(this.precoMoeda);
      this.quantidadeMoedas = (!isNaN(valor) && !isNaN(preco)) ? (valor / preco).toFixed(5) : "";
    },
    quantidadeMoedas(newValue) {
      if (this.lastChangedField === "valor") return;
      if (!this.precoMoeda || parseFloat(this.precoMoeda) === 0) return;
      this.lastChangedField = "quantidade";
      const quantidade = parseFloat(newValue);
      const preco = parseFloat(this.precoMoeda);
      this.valorAportado = (!isNaN(quantidade) && !isNaN(preco)) ? (quantidade * preco).toFixed(2) : "";
    },
  },
  methods: {
    abrirModalNovoAporte() {
      this.dataAporte = new Date().toISOString().split("T")[0];
      this.moedaSelecionada = "";
      this.precoMoeda = "";
      this.valorAportado = "";
      this.quantidadeMoedas = "";
      this.mostrarModal = true;
    },
    toggleMenu(event) {
      event.stopPropagation();
      this.menuOpen = !this.menuOpen;
    },
    handleClickOutside(event) {
      if (this.menuOpen && !this.$refs.sidebar.contains(event.target)) {
        this.menuOpen = false;
      }
    },
    async buscarUsuario() {
      const token = localStorage.getItem("access");
      if (!token) return;
      try {
        const response = await axios.get(this.apiUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.nome_completo = response.data.nome_completo;
      } catch (error) {
        console.error("Erro ao obter usuário:", error);
      }
    },
    async buscarCriptoativosBanco() {
      try {
        const response = await axios.get(this.apiCriptoativos);
        this.criptoativosBanco = response.data || [];
      } catch (error) {
        console.error("Erro ao buscar ativos do banco:", error);
        this.criptoativosBanco = [];
      }
    },
    async buscarPrecoMoeda() {
      if (!this.moedaSelecionada || !this.moedaSelecionada.cripto_sigla) {
        return;
      }
      try {
        const response = await axios.get(`http://api.vortek.inf.br/api/preco/${this.moedaSelecionada.cripto_sigla}/`);
        this.precoMoeda = parseFloat(response.data.preco).toFixed(10);
        this.lastChangedField = "";
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Preço não encontrado",
          text: "Não foi possível obter o preço do ativo em tempo real. Verifique se o ativo existe com par BRL."
        });
        this.precoMoeda = "";
      }
    },
    aoAlterarPrecoMoeda() {
      this.lastChangedField = "";
      if (this.valorAportado) {
        this.valorAportado = this.valorAportado;
      }
    },
    async salvarAporte() {
      const token = localStorage.getItem("access");
      if (!token || !this.moedaSelecionada) return;
      try {
        const payload = {
          criptoativo: this.moedaSelecionada.id,
          valor_aportado: parseFloat(this.valorAportado),
          quantidade: parseFloat(this.quantidadeMoedas),
          data_aporte: this.dataAporte,
        };
        await axios.post(this.apiAportes, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire({ icon: "success", title: "Aporte salvo!", timer: 2000 });
        this.mostrarModal = false;
        await this.buscarCriptoativos();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro ao salvar aporte",
          text: error.response?.data?.detail || "Verifique os dados ou tente novamente.",
        });
      }
    },
    async buscarCriptoativos() {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get(this.apiAportes, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const aportes = Array.isArray(response.data) ? response.data.filter(
          aporte => aporte.criptoativo && aporte.criptoativo.cripto_sigla
        ) : [];

        const promises = aportes.map(async (aporte) => {
          let precoAtual = 0;
          try {
            const precoResponse = await axios.get(
              `http://api.vortek.inf.br/api/preco/${aporte.criptoativo.cripto_sigla}/`
            );
            precoAtual = parseFloat(precoResponse.data.preco);
          } catch {
            precoAtual = parseFloat(aporte.criptoativo.valor);
          }

          const quantidade = parseFloat(aporte.quantidade);
          const valorAportado = parseFloat(aporte.valor_aportado);
          const valorAtual = quantidade * precoAtual;
          const lucro = valorAtual - valorAportado;
          const percentual = valorAportado > 0 ? (lucro / valorAportado) * 100 : 0;

          return {
            id: aporte.id,
            nome: aporte.criptoativo.Criptoativo,
            sigla: aporte.criptoativo.cripto_sigla,
            preco: precoAtual,
            quantidade,
            valorAportado,
            valorAtual,
            lucro,
            percentual,
            dataAporte: aporte.data_aporte,
          };
        });

        this.criptoativos = await Promise.all(promises);
        this.totalAportes = this.criptoativos.reduce((acc, c) => acc + c.valorAportado, 0);
        this.totalSaldo = this.criptoativos.reduce((acc, c) => acc + c.valorAtual, 0);
        this.totalLucro = this.totalSaldo - this.totalAportes;
        this.totalPercentual = this.totalAportes > 0 ? (this.totalLucro / this.totalAportes) * 100 : 0;
      } catch (error) {
        this.criptoativos = [];
        this.totalAportes = 0;
        this.totalSaldo = 0;
        this.totalLucro = 0;
        this.totalPercentual = 0;
        console.error("Erro ao buscar criptoativos:", error);
      }
    },
    async deletarAporte(id) {
      const confirma = await Swal.fire({
        icon: 'warning',
        title: 'Tem certeza?',
        text: 'Deseja realmente apagar este aporte?',
        showCancelButton: true,
        confirmButtonText: 'Sim, apagar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        customClass: {
          confirmButton: 'btn-swal-confirm',
          cancelButton: 'btn-swal-cancel'
        }
      });
      if (confirma.isConfirmed) {
        try {
          const token = localStorage.getItem("access");
          await axios.delete(`http://api.vortek.inf.br/api/aportes/${id}/`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.criptoativos = this.criptoativos.filter(a => a.id !== id);
          this.totalAportes = this.criptoativos.reduce((acc, c) => acc + c.valorAportado, 0);
          this.totalSaldo = this.criptoativos.reduce((acc, c) => acc + c.valorAtual, 0);
          this.totalLucro = this.totalSaldo - this.totalAportes;
          this.totalPercentual = this.totalAportes > 0 ? (this.totalLucro / this.totalAportes) * 100 : 0;
          Swal.fire({ icon: 'success', title: 'Aporte apagado!' });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Erro ao apagar aporte",
            text: err.response?.data?.detail || "Verifique sua conexão ou tente novamente."
          });
        }
      }
    },
    formatarData(dataISO) {
      if (!dataISO) return "";
      const [ano, mes, dia] = dataISO.split("-");
      return `${dia}/${mes}/${ano}`;
    },
  },
  async mounted() {
    await this.buscarUsuario();
    await this.buscarCriptoativosBanco();
    await this.buscarCriptoativos();

    this.intervalId = setInterval(() => {
      this.buscarCriptoativos();
    }, 2000);
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
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

.btn-deletar {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 20px;
  cursor: pointer;
  color: #e74c3c;
  transition: color 0.2s, transform 0.1s;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-deletar:hover {
  color: #2980ff;
  transform: scale(1.12);
}

.swal2-styled.btn-swal-confirm {
  background: #e74c3c !important;
  color: #fff !important;
  border-radius: 8px !important;
  font-weight: bold;
}
.swal2-styled.btn-swal-cancel {
  background: #bbb !important;
  color: #222 !important;
  border-radius: 8px !important;
}
</style>
