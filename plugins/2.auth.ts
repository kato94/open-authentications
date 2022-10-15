import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { getUser } = useAuthStore()
  const tokenCookie = useCookie('token')

  if (tokenCookie.value) {
    await getUser(tokenCookie.value)
  }
})
