<template>
  <div class="perfil-container">
    <div class="perfil-box">
      <div class="foto-perfil">
        <label for="fotoInput">
          <img :src="fotoPreview || defaultFoto" alt="Foto de perfil" class="imagem-usuario" />
          <input type="file" id="fotoInput" @change="carregarFoto" hidden />
        </label>
      </div>

      <h2>Editar Perfil</h2>

      <form @submit.prevent="salvarAlteracoes">
        <input type="text" v-model="nome" placeholder="Nome completo" required />
        <input type="email" v-model="email" placeholder="E-mail" required />

        <div class="campo-senha">
          <input :type="mostrarSenha1 ? 'text' : 'password'" v-model="senhaAnterior" placeholder="Senha anterior" />
          <span @mousedown="mostrarSenha1 = true" @mouseup="mostrarSenha1 = false" @mouseleave="mostrarSenha1 = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#333" viewBox="0 0 24 24">
              <path d="M12 5c-7.633 0-12 7-12 7s4.367 7 12 7 12-7 12-7-4.367-7-12-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 
                       5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 
                       3 3 3-1.346 3-3-1.346-3-3-3z"/>
            </svg>
          </span>
        </div>

        <div class="campo-senha">
          <input :type="mostrarSenha2 ? 'text' : 'password'" v-model="senha" placeholder="Nova senha" />
          <span @mousedown="mostrarSenha2 = true" @mouseup="mostrarSenha2 = false" @mouseleave="mostrarSenha2 = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#333" viewBox="0 0 24 24">
              <path d="M12 5c-7.633 0-12 7-12 7s4.367 7 12 7 12-7 12-7-4.367-7-12-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 
                       5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 
                       3 3 3-1.346 3-3-1.346-3-3-3z"/>
            </svg>
          </span>
        </div>

        <div class="campo-senha">
          <input :type="mostrarSenha3 ? 'text' : 'password'" v-model="confirmaSenha" placeholder="Confirmar senha" />
          <span @mousedown="mostrarSenha3 = true" @mouseup="mostrarSenha3 = false" @mouseleave="mostrarSenha3 = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#333" viewBox="0 0 24 24">
              <path d="M12 5c-7.633 0-12 7-12 7s4.367 7 12 7 12-7 12-7-4.367-7-12-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 
                       5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 
                       3 3 3-1.346 3-3-1.346-3-3-3z"/>
            </svg>
          </span>
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const nome = ref('Bryann Lucas Locatelli')
const email = ref('bryannlocatelli@gmail.com')
const senhaAnterior = ref('')
const senha = ref('')
const confirmaSenha = ref('')
const fotoPreview = ref(null)
const router = useRouter()

const mostrarSenha1 = ref(false)
const mostrarSenha2 = ref(false)
const mostrarSenha3 = ref(false)

const defaultFoto = '../src/assets/img/no-photo.png'

function carregarFoto(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      fotoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function salvarAlteracoes() {
  Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: 'Alterações do usuário concluídas.',
    confirmButtonColor: '#1b5c51'
  }).then(() => {
    router.push('/invest')
  })
}
</script>

<style scoped>
.perfil-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f2f2f2, #e0e0e0);
  position: relative;
}

.perfil-box {
  background-color: white;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
  position: relative;
  z-index: 1;
}

.foto-perfil {
  margin-bottom: 20px;
}

.imagem-usuario {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #1b5c51;
  cursor: pointer;
  transition: 0.3s;
}
.imagem-usuario:hover {
  opacity: 0.85;
}

h2 {
  color: #1b5c51;
  margin-bottom: 25px;
}

form input {
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.campo-senha {
  position: relative;
}

.campo-senha span {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
}

form button {
  width: 100%;
  padding: 12px;
  background-color: #1b5c51;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

form button:hover {
  background-color: #164a40;
}
</style>
