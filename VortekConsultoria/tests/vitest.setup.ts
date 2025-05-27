import { vi } from 'vitest'
import { config } from '@vue/test-utils'

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useRoute: () => ({ path: '/' }),
}))

config.global.stubs = {
  'router-link': {
    template: '<a><slot /></a>'
  }
}