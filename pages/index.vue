<script lang="ts" setup>
import useAuth from '@/composables/useAuth'

definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()
</script>

<template lang="pug">
.flex.flex-1.relative
  div.m-auto.w-full.text-center
    button(
      @click="logout"
      class="absolute right-0 top-0 text-lg font-medium b-1 b-blue px-sm py-1 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
    ) Logout
    .text-2xl.mb-lg.font-medium Welcome
    .container.mx-auto.px-5.py-12
      .flex.flex-wrap.w-full.justify-center
        .w-full.mb-4.pa-lg.h-auto(v-for="(account, name) in user?.userAccounts" class="md:w-1/2 lg:w-1/4")
          AccountCard(
            :account="account"
            :accountName="name"
          )
</template>

<style scoped></style>
