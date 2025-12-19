<template>
  <div class="perfil-container">
    <div class="perfil-box">
      <div class="foto-perfil">
        <label for="fotoInput">
          <img :src="fotoPreview || fotoUsuario || defaultFoto" alt="Foto de perfil" class="imagem-usuario" />
          <input type="file" id="fotoInput" @change="carregarFoto" hidden />
        </label>
      </div>

      <h2>Editar Perfil</h2>

      <form @submit.prevent="salvarAlteracoes">
        <input type="text" v-model="nome" placeholder="Nome completo" required />
        <input type="email" v-model="email" placeholder="E-mail" required />

        <div class="campo-senha">
          <input :type="mostrarSenha1 ? 'text' : 'password'" v-model="senhaAnterior" placeholder="Senha anterior" autocomplete="off" />
          <span @mousedown="mostrarSenha1 = true" @mouseup="mostrarSenha1 = false" @mouseleave="mostrarSenha1 = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#333" viewBox="0 0 24 24">
              <path d="M12 5c-7.633 0-12 7-12 7s4.367 7 12 7 12-7 12-7-4.367-7-12-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 
                       5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 
                       3 3 3-1.346 3-3-1.346-3-3-3z"/>
            </svg>
          </span>
        </div>

        <div class="campo-senha">
          <input :type="mostrarSenha2 ? 'text' : 'password'" v-model="senha" placeholder="Nova senha" autocomplete="off" />
          <span @mousedown="mostrarSenha2 = true" @mouseup="mostrarSenha2 = false" @mouseleave="mostrarSenha2 = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#333" viewBox="0 0 24 24">
              <path d="M12 5c-7.633 0-12 7-12 7s4.367 7 12 7 12-7 12-7-4.367-7-12-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 
                       5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 
                       3 3 3-1.346 3-3-1.346-3-3-3z"/>
            </svg>
          </span>
        </div>

        <div class="campo-senha">
          <input :type="mostrarSenha3 ? 'text' : 'password'" v-model="confirmaSenha" placeholder="Confirmar senha" autocomplete="off" />
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import axios from 'axios'
import defaultFoto from '@/assets/img/no-photo.png'

const router = useRouter()
const nome = ref('')
const email = ref('')
const fotoUsuario = ref(null)
const fotoPreview = ref(null)
const senhaAnterior = ref('')
const senha = ref('')
const confirmaSenha = ref('')

const mostrarSenha1 = ref(false)
const mostrarSenha2 = ref(false)
const mostrarSenha3 = ref(false)

onMounted(async () => {
  const token = localStorage.getItem('access')
  if (!token) return
  try {
    const { data } = await axios.get('http://api.vortek.inf.br/api/user/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    nome.value = data.nome_completo || ''
    email.value = data.email || ''
    fotoUsuario.value = data.foto_perfil ? (data.foto_perfil.startsWith('http') ? data.foto_perfil : `http://api.vortek.inf.br${data.foto_perfil}`) : null
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível carregar os dados do usuário.' })
  }
})

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

async function salvarAlteracoes() {
  const token = localStorage.getItem('access')
  if (!token) return

  // Validação de e-mail
  if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    Swal.fire({ icon: 'warning', title: 'Email inválido', text: 'Informe um e-mail válido.' })
    return
  }

  if (senha.value || confirmaSenha.value || senhaAnterior.value) {
    if (!senhaAnterior.value || !senha.value || !confirmaSenha.value) {
      Swal.fire({ icon: 'warning', title: 'Campos obrigatórios', text: 'Preencha todos os campos de senha.' })
      return
    }
    if (senha.value !== confirmaSenha.value) {
      Swal.fire({ icon: 'warning', title: 'Senhas diferentes', text: 'A nova senha e a confirmação devem ser iguais.' })
      return
    }
    try {
      await axios.post('http://api.vortek.inf.br/api/user/change_password/', {
        old_password: senhaAnterior.value,
        new_password: senha.value
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      Swal.fire({ icon: 'success', title: 'Senha alterada com sucesso!' })
      senhaAnterior.value = ''
      senha.value = ''
      confirmaSenha.value = ''
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Erro ao alterar senha', text: error.response?.data?.detail || 'Senha anterior incorreta.' })
      return
    }
  }

  try {
    const formData = new FormData()
    formData.append('nome_completo', nome.value)
    formData.append('email', email.value)
    if (fotoPreview.value) {
      const fileInput = document.getElementById('fotoInput')
      if (fileInput && fileInput.files.length > 0) {
        formData.append('foto_perfil', fileInput.files[0])
      }
    }

    await axios.put('http://api.vortek.inf.br/api/user/', formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    })

    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Alterações do usuário concluídas.',
      confirmButtonColor: '#1b5c51'
    }).then(() => {
      router.push('/invest')
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro ao salvar', text: error.response?.data?.detail || 'Erro ao salvar alterações.' })
  }
}
</script>


<style scoped>
.perfil-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f2f2f2, #e0e0e0);
  position: relative;
}

.perfil-box {
  background-color: white;
  padding: 50px 30px 35px 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.10);
  text-align: center;
  width: 100%;
  max-width: 410px;
  position: relative;
  z-index: 1;
}

.foto-perfil {
  margin-bottom: 22px;
}
.imagem-usuario {
  width: 112px;
  height: 112px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #1b5c51;
  cursor: pointer;
  transition: 0.2s;
  background: #ededed;
}
.imagem-usuario:hover {
  opacity: 0.85;
  border-color: #164a40;
}

h2 {
  color: #1b5c51;
  margin-bottom: 22px;
  font-size: 1.35rem;
}

form input {
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background: #fafafa;
}

.campo-senha {
  position: relative;
}

.campo-senha span {
  position: absolute;
  top: 50%;
  right: 13px;
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
  padding: 13px;
  background-color: #1b5c51;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 17px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: background .2s;
}
form button:hover {
  background-color: #164a40;
}
</style>