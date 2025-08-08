import { mount } from '@vue/test-utils'
import VideoIntro from '@/components/VideoIntro.vue'

describe('VideoIntro.vue', () => {
  it('renderiza quando mostrar é true', () => {
    const wrapper = mount(VideoIntro)
    expect(wrapper.find('.video-overlay').exists()).toBe(true)
  })

  it('fecha o vídeo ao clicar no botão e emite evento', async () => {
    const wrapper = mount(VideoIntro)
    const button = wrapper.find('button.fechar-btn')
    
    await button.trigger('click')

    // mostrar deve ser falso
    expect(wrapper.vm.mostrar).toBe(false)
    // evento emitido
    expect(wrapper.emitted('video-finalizado')).toBeTruthy()
  })

  it('fecha o vídeo ao disparar evento ended no vídeo', async () => {
    const wrapper = mount(VideoIntro)
    const video = wrapper.find('video')

    await video.trigger('ended')

    expect(wrapper.vm.mostrar).toBe(false)
    expect(wrapper.emitted('video-finalizado')).toBeTruthy()
  })
})
