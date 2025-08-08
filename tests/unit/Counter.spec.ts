import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../../src/stores/counter'

describe('counter store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inicializa com count 0', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(0)
  })

  it('doubleCount é o dobro de count', () => {
    const counter = useCounterStore()
    counter.count = 5
    expect(counter.doubleCount).toBe(10)
  })

  it('increment incrementa o count', () => {
    const counter = useCounterStore()
    counter.increment()
    expect(counter.count).toBe(1)
  })
})