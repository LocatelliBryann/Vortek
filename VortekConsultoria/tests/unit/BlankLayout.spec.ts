import { mount } from '@vue/test-utils'
import BlankLayout from '../../src/layouts/BlankLayout.vue'

describe('BlankLayout.vue', () => {
  it('monta corretamente', () => {
    const wrapper = mount(BlankLayout)
    expect(wrapper.exists()).toBe(true)
  })
})