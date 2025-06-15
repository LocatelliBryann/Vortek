import { describe, it, expect, vi } from 'vitest'
import router from '@/router'

// Mock parcial para vue-router
vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    // Aqui você pode sobrescrever métodos se quiser, ou deixar vazio para usar o real
  }
})

describe('Router', () => {
  it('deve existir e ter rotas', () => {
    expect(router).toBeDefined()
    expect(router.getRoutes().length).toBeGreaterThan(0)
  })
})
