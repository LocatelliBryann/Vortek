import { mount } from '@vue/test-utils'
import FullLayoutMain from '../../src/layouts/FullLayoutMain.vue'

describe('FullLayoutMain.vue', () => {
  it('monta corretamente', () => {
    const wrapper = mount(FullLayoutMain)
    expect(wrapper.exists()).toBe(true)
  })
})