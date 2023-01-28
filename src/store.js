import { defineStore } from 'pinia'
import { loadCurrentUser } from './data'

export const useUserStore = defineStore('user', {
    state: () => ({ user : null }),
    actions: {
      async init() {
        this.user = await loadCurrentUser()
      },
    },
})