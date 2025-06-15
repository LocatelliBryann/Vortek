import { mount } from '@vue/test-utils'
import MarketsViewCrypto from '@/views/Investimentos/MarketsViewCrypto.vue'
import axios from 'axios'
import { vi } from 'vitest'

vi.mock('axios')

describe('MarketsViewCrypto.vue', () => {
  // Cria um stub simples para router-link para evitar warnings no teste
  const globalConfig = {
    stubs: {
      'router-link': {
        template: '<a><slot /></a>'
      }
    }
  }

  it('deve buscar dados de mercado no mounted', async () => {
    const mockData = [
      { symbol: 'BTCUSDT', lastPrice: '50000.12345678', priceChangePercent: '1.23' },
      { symbol: 'ETHUSDT', lastPrice: '2500.87654321', priceChangePercent: '-0.78' }
    ]
    ;(axios.get as any).mockResolvedValueOnce({ data: mockData })

    const wrapper = mount(MarketsViewCrypto, globalConfig)

    // Espera o próximo tick para garantir que a chamada async terminou e dados foram setados
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick() // pode precisar de dois ticks em chamadas async

    expect(wrapper.vm.moedas.length).toBe(2)
    expect(wrapper.vm.moedas[0].symbol).toBe('BTCUSDT')
  })

  it('deve filtrar as moedas com base na busca', async () => {
    const wrapper = mount(MarketsViewCrypto, globalConfig)
    wrapper.vm.moedas = [
      { symbol: 'BTCUSDT', lastPrice: '50000', priceChangePercent: '1.5' },
      { symbol: 'ETHUSDT', lastPrice: '2500', priceChangePercent: '2.0' }
    ]
    wrapper.vm.search = 'eth'

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.moedasFiltradas.length).toBe(1)
    expect(wrapper.vm.moedasFiltradas[0].symbol).toBe('ETHUSDT')
  })

  it('deve alternar ordenação corretamente', async () => {
    const wrapper = mount(MarketsViewCrypto, globalConfig)
    wrapper.vm.moedas = [
      { symbol: 'BTCUSDT', lastPrice: '50000', priceChangePercent: '1.5' },
      { symbol: 'ETHUSDT', lastPrice: '2500', priceChangePercent: '2.0' }
    ]
    wrapper.vm.moedasOriginais = [...wrapper.vm.moedas]
    wrapper.vm.ordenacao = 'asc'

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.moedasFiltradas[0].symbol).toBe('BTCUSDT')

    wrapper.vm.toggleOrdenacao()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.ordenacao).toBe('desc')
  })
})
