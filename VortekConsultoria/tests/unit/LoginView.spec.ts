// tests/unit/LoginView.spec.ts
import { mount } from '@vue/test-utils'
import LoginView from '@/views/Investimentos/LoginView.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { vi } from 'vitest' // <- IMPORTANTE!

vi.mock('axios')
vi.mock('sweetalert2')

describe('LoginView.vue', () => {
  it('deve mostrar erro se email ou senha estiverem incorretos', async () => {
    const wrapper = mount(LoginView)

    await wrapper.find('input[type="email"]').setValue('teste@teste.com')
    await wrapper.find('input[type="password"]').setValue('senhaerrada')

    axios.post.mockRejectedValueOnce(new Error('Credenciais inválidas'))

    await wrapper.find('form').trigger('submit.prevent')

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Erro ao fazer login',
      text: 'Email ou senha incorretos.',
      confirmButtonText: 'OK'
    })
  })

  it('deve chamar o endpoint de login com os dados corretos', async () => {
    const wrapper = mount(LoginView)
    const mockResponse = { data: { access: 'abc', refresh: 'def' } }
    axios.post.mockResolvedValueOnce(mockResponse)

    await wrapper.find('input[type="email"]').setValue('teste@teste.com')
    await wrapper.find('input[type="password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')

    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/token/', {
      email: 'teste@teste.com',
      password: '123456'
    })
  })
})
