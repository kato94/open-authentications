import { $fetch } from 'ohmyfetch'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const { logout } = useAuthStore()

  const api = $fetch.create({
    baseURL: import.meta.env.VITE_API as string,

    async onResponseError ({ request, response, options }) {
      if (response.status === 401) {
        logout()
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
