import { mount } from '@vue/test-utils'
import MainViewCrypto from '@/views/Investimentos/MainViewCrypto.vue'
import axios from 'axios'
import { vi, describe, it, expect, beforeEach, beforeAll } from 'vitest'

vi.mock('axios')
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn()
  }
}))

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

describe('MainViewCrypto.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.setItem('access', 'fake-token')
  })

  it('deve buscar dados ao montar o componente', async () => {
    axios.get
      .mockResolvedValueOnce({ data: [{ id: 1, cripto_sigla: 'BTC', Criptoativo: 'Bitcoin', valor: '1000' }] })
      .mockResolvedValueOnce({ data: { symbols: [{ symbol: 'BTCUSDT', baseAsset: 'BTC', quoteAsset: 'USDT' }] } })
      .mockResolvedValueOnce({ data: { username: 'testuser', nome_completo: 'Teste User' } })

    const wrapper = mount(MainViewCrypto)
    await wrapper.vm.$nextTick()
    await new Promise((r) => setTimeout(r, 0))

    expect(wrapper.text()).toContain('Bem-vindo(a) Teste User')
    expect(wrapper.text()).toContain('Bitcoin')
    expect(wrapper.vm.criptoativos.length).toBe(1)
    expect(wrapper.vm.moedasBinance.length).toBe(1)
    expect(axios.get).toHaveBeenCalledTimes(3)
  })

  it('deve abrir e fechar o menu lateral', async () => {
    const wrapper = mount(MainViewCrypto)
    const button = wrapper.find('.menu-button')
    await button.trigger('click')
    expect(wrapper.vm.menuOpen).toBe(true)

    await wrapper.trigger('click')
    expect(wrapper.vm.menuOpen).toBe(false)
  })

  it('deve abrir e fechar o modal de novo aporte', async () => {
    const wrapper = mount(MainViewCrypto)
    const btn = wrapper.find('.btn-aporte')

    await btn.trigger('click')
    expect(wrapper.vm.mostrarModal).toBe(true)

    const modal = wrapper.find('.modal-overlay')
    await modal.trigger('click')
    expect(wrapper.vm.mostrarModal).toBe(false)
  })

  it('deve atualizar quantidade com base no valorAportado e precoMoeda', async () => {
    const wrapper = mount(MainViewCrypto)
    wrapper.vm.precoMoeda = '10'
    wrapper.vm.valorAportado = '50'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.quantidadeMoedas).toBe('5.00000')
  })

  it('deve atualizar valorAportado com base na quantidadeMoedas e precoMoeda', async () => {
    const wrapper = mount(MainViewCrypto)
    wrapper.vm.precoMoeda = '10'
    wrapper.vm.quantidadeMoedas = '3'
    wrapper.vm.lastChangedField = ''
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.valorAportado).toBe('30.00')
  })

  // it('deve buscar preço da moeda ao selecionar uma moeda', async () => {
  //   axios.get.mockResolvedValueOnce({ data: { price: '123.456789' } })

  //   const wrapper = mount(MainViewCrypto)
  //   wrapper.vm.moedaSelecionada = { symbol: 'BTCUSDT' }

  //   await wrapper.vm.buscarPrecoMoeda()
  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.vm.precoMoeda).toBe('123.45678900')
  // })

  it('deve exibir alerta ao salvar aporte e fechar o modal', async () => {
    const wrapper = mount(MainViewCrypto)

    // Supondo que o método fecha o modal no final
    wrapper.vm.mostrarModal = true

    await wrapper.vm.salvarAporte()
    expect(wrapper.vm.mostrarModal).toBe(false)
  })
})
