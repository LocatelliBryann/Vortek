import { mount } from '@vue/test-utils'
import App from '@/App.vue'

test('App.vue renderiza sem erros', () => {
  const wrapper = mount(App)
  expect(wrapper.exists()).toBe(true)
})