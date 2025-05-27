import { mount } from '@vue/test-utils'
import PerfilView from '@/views/Investimentos/PerfilView.vue'
import { vi, describe, it, expect } from 'vitest'
import { nextTick } from 'vue'

// Mock do vue-router
const push = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push })
}))

// Mock do sweetalert2
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn().mockResolvedValue({ isConfirmed: true }) // Simula o .then
  }
}))

describe('PerfilView.vue', () => {
  it('deve mostrar preview ao carregar foto', async () => {
  const wrapper = mount(PerfilView)

  // Criação do arquivo simulado
  const file = new File(['dummy content'], 'foto.png', { type: 'image/png' })

  // Mock do FileReader
  const mockReader = {
    readAsDataURL: vi.fn(function () {
      this.onload?.({ target: { result: 'data:image/png;base64,preview' } })
    }),
    onload: null
  }
  vi.stubGlobal('FileReader', vi.fn(() => mockReader))

  // Simula evento de mudança no input
  const input = wrapper.find('#fotoInput')

  Object.defineProperty(input.element, 'files', {
    value: [file]
  })
  input.element.dispatchEvent(new Event('change'))
  await nextTick()

  expect(wrapper.vm.fotoPreview).toBe('data:image/png;base64,preview')
})

  it('deve exibir alerta de sucesso ao salvar alterações', async () => {
    const wrapper = mount(PerfilView)
    await wrapper.find('form').trigger('submit.prevent')

    const Swal = (await import('sweetalert2')).default
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Alterações do usuário concluídas.',
      confirmButtonColor: '#1b5c51'
    })
  })

  it('deve redirecionar após confirmar o alerta', async () => {
    const wrapper = mount(PerfilView)
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(push).toHaveBeenCalledWith('/invest')
  })
})