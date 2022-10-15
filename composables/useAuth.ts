import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const useAuth = () => {
  const authStore = useAuthStore()

  const { user } = storeToRefs(authStore)
  const { login, register, loginWithCode, logout } = authStore

  return {

    user,

    login,
    register,
    loginWithCode,
    logout
  }
}

export default useAuth
