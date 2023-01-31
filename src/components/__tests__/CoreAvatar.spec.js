import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CoreAvatar from '../CoreAvatar.vue'

import router from "@/router";

const mountOptions = {
  global: {
    plugins: [router],
  },
};

describe('CoreAvatar', () => {
  it('renders', () => {
    const wrapper = mount(CoreAvatar, {
      ...mountOptions,
      props: {
        user: {
          id: 1,
          firstName: 'Roman',
          lastName: 'Guivan',
          avatar: 'https://i.imgur.com/ABoomOd.png'
        }
      }
    })
    const img = wrapper.find('img')
    expect(img).toBeDefined()
    expect(img.attributes().src).toBe('https://i.imgur.com/ABoomOd.png')
    expect(img.element.title).toBe('Roman Guivan')
  })
})
