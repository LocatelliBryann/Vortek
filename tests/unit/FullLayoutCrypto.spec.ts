import { mount } from '@vue/test-utils'
import FullLayoutCrypto from '../../src/layouts/FullLayoutCrypto.vue'

describe('FullLayoutCrypto.vue', () => {
  it('monta corretamente', () => {
    const wrapper = mount(FullLayoutCrypto)
    expect(wrapper.exists()).toBe(true)
  })
})