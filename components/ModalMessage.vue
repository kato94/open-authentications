<script lang="ts" setup>
import useIndex from '@/composables/useIndex'

const { isModalOpen, modalText, closeModal } = useIndex()

</script>

<template lang="pug">
Teleport(to="body")
  transition(name="fade")
    div(v-if="isModalOpen" class="background")
  transition(name="down")
    div(v-if="isModalOpen" class="modal")
      .bg-neutral-200.shadow-lg.rounded-lg.px-4.py-7.text-center.shadow-2xl.ma-sm
        .text-lg.mb-sm.font-medium {{ modalText.title }}
        .text-sm.mb-lg {{ modalText.message }}
        button(@click="closeModal" class="b-2 b-primary px-3xl py-1 rounded-3xl hover:bg-gray-200 transition-colors") OK
</template>

<style scoped lang="sass">
.background
  position: fixed
  z-index: 998
  top: 0
  left: 0%
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.5)

.modal
  position: fixed
  z-index: 999
  top: 40%
  left: 50%
  width: 100%
  max-width: 20rem
  transform: translate(-50%, -50%)

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.25s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0

.down-enter-active,
.down-leave-active
  transition: opacity 0.5s ease, margin-top 0.5s ease

.down-enter-from,
.down-leave-to
  opacity: 0
  margin-top: -1rem
</style>
