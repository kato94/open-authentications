<script lang="ts" setup>
import useAuth from '@/composables/useAuth'

definePageMeta({
  middleware: 'unauthenticated'
})

const route = useRoute()
const router = useRouter()
const typeAuth = route.params.typeAuth
const { loginWithCode } = useAuth()

onMounted(async () => {
  if (route.query.code) {
    const { success } = await loginWithCode(
      String(typeAuth),
      String(route.query.code)
    )
    if (success) {
      router.push('/')
    } else {
      router.push('/login')
    }
  } else {
    router.push('/login')
  }
})

</script>

<template lang="pug">
.flex.flex-auto.items-center.justify-center
  .rounded-rt-12.rounded-lb-12.shadow-2xl.bg-neutral-100.pa-3xl.w-full.max-w-sm

    .kt-loading.rounded-rt-12.rounded-lb-12.absolute.top-0.left-0.right-0.bottom-0.bg-neutral-100.opacity-50.z-10.flex.items-center.justify-center
      .i-line-md-loading-twotone-loop.w-20.h-20.text-primary

    .text-xl.mb-lg.font-bold Loading...
</template>

<style scoped></style>
