import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CoreButton from '../CoreButton.vue'

import router from "@/router";

const mountOptions = {
  global: {
    plugins: [router],
  },
};

describe('CoreButton', () => {
  it('renders a link', () => {
    const wrapper = mount(CoreButton, {
      ...mountOptions,
      props: {
        link: true,
        to: 'path/key'
      }
    })
    const href = wrapper.find('a')
    expect(href).toBeDefined()
    expect(href.element.href).toContain('path/key')
  })
  it('renders a button', async () => {
    const wrapper = mount(CoreButton, {
      ...mountOptions,
      props: {}
    });
    const button = wrapper.find('button')
    expect(button).toBeDefined()
    button.element.click()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().click.length).toBe(1)
  })
})
