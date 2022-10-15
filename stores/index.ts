import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', () => {
  const nuxtApp = useNuxtApp()

  const loginButtons = ref()
  const isModalOpen = ref(false)
  const modalText = ref({
    title: '',
    message: ''
  })

  const activeButtons = computed(() => Boolean(loginButtons.value))

  const getLoginButtons = async () => {
    try {
      const { buttons } = await nuxtApp.$api('/auth/login-buttons')

      loginButtons.value = buttons
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }

  const openModal = ({ title, message }) => {
    modalText.value = { title, message }
    isModalOpen.value = true
  }

  const closeModal = ({ title, message }) => {
    isModalOpen.value = false
  }

  return { loginButtons, activeButtons, getLoginButtons, isModalOpen, modalText, openModal, closeModal }
})
