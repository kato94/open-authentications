import { storeToRefs } from 'pinia'
import { useIndexStore } from '@/stores/index'

const useIndex = () => {
  const indexStore = useIndexStore()

  const { loginButtons, activeButtons, isModalOpen, modalText } = storeToRefs(indexStore)
  const { getLoginButtons, openModal, closeModal } = indexStore

  return {
    loginButtons,
    activeButtons,

    getLoginButtons,

    isModalOpen,
    modalText,
    openModal,
    closeModal
  }
}

export default useIndex
