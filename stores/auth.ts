import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const nuxtApp = useNuxtApp()

  const user = ref<User>(null)
  const isConnected = ref(false)

  const getUser = async (token: string) => {
    try {
      const { user: newUser, access_token } = await nuxtApp.$api('/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser(newUser, access_token)
    } catch (error) {
      logout()
    }
  }

  const login = async ({ email, password }) => {
    try {
      const { user: newUser, access_token } = await nuxtApp.$api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      setUser(newUser, access_token)
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }

  const register = async (body) => {
    try {
      const { user: newUser, access_token } = await nuxtApp.$api('/auth/register', {
        method: 'POST',
        body: JSON.stringify(body)
      })

      setUser(newUser, access_token)
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }

  const loginWithCode = async (typeAuth: string, code: string) => {
    try {
      const { user: newUser, access_token } = await nuxtApp.$api('/auth/login-with-code', {
        method: 'POST',
        body: JSON.stringify({ typeAuth, code })
      })

      setUser(newUser, access_token)
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }

  const logout = async () => {
    setToken(null)
    isConnected.value = false
    await navigateTo('/login')
    user.value = null
  }

  const setUser = (newUser: User, access_token: string) => {
    setToken(access_token)

    user.value = newUser

    isConnected.value = true
  }

  const setToken = (token: string) => {
    const tokenCookie = useCookie('token', {
      path: '/',
      maxAge: 60 * 60 * 2
    })

    tokenCookie.value = token
  }

  return { getUser, setUser, user, isConnected, login, register, loginWithCode, logout }
})
