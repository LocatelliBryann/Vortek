// tests/unit/main.spec.ts
import { vi, describe, it, expect } from 'vitest'
import * as vue from 'vue'
import * as pinia from 'pinia'
import * as routerModule from '@/router'

vi.mock('vue', () => {
  const actual = vi.importActual<typeof import('vue')>('vue')
  return {
    ...actual,
    createApp: vi.fn(() => {
      return {
        use: vi.fn().mockReturnThis(),
        mount: vi.fn(),
      }
    }),
  }
})

vi.mock('pinia', () => ({
  createPinia: vi.fn(() => 'piniaInstance'),
}))

vi.mock('@/router', () => ({
  default: 'routerInstance',
}))

describe('main.ts', () => {
  it('cria app, usa pinia e router e monta', async () => {
    // Importa o main.ts após configurar os mocks
    await import('@/main.ts')

    // Verifica se createApp foi chamado com o componente App
    expect(vue.createApp).toHaveBeenCalled()

    const app = (vue.createApp as any).mock.results[0].value
    expect(app.use).toHaveBeenCalledWith('piniaInstance')
    expect(app.use).toHaveBeenCalledWith('routerInstance')
    expect(app.mount).toHaveBeenCalledWith('#app')
  })
})
