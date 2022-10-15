<script setup lang="ts"></script>

<template lang="pug">
NuxtLayout.min-h-screen.flex.flex-col.bg-neutral-200.text-dark-800
  NuxtPage
  ModalMessage
</template>

<style lang="sass">
.page-enter-active,
.page-leave-active
  transition: all 0.4s

.page-enter-from,
.page-leave-to
  opacity: 0
  filter: blur(1rem)
</style>
