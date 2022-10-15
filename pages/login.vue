<script lang="ts" setup>
import { object, string } from 'yup'
import { configure } from 'vee-validate'
import useIndex from '@/composables/useIndex'
import useAuth from '@/composables/useAuth'

definePageMeta({
  middleware: 'unauthenticated'
})

const { loginButtons, activeButtons, getLoginButtons, openModal } = useIndex()
const { login } = useAuth()

const loading = ref(false)

onMounted(async () => {
  if (!activeButtons.value) {
    const { success } = await getLoginButtons()
    if (!success) {
      openModal({
        title: 'Error ❌',
        message: 'Failed to load login buttons'
      })
    }
  }
})

const goToAuthorize = async (url: string) => {
  await navigateTo(url, { external: true })
}

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true
})

const schema = object({
  email: string().required().email().label('Email Address'),
  password: string().required().min(6).label('Your Password')
})

const initialValues = { email: '', password: '' }

const handleSubmit = async (values, actions) => {
  if (!loading.value) {
    loading.value = true
    const { success } = await login(values)
    if (success) {
      await navigateTo('/')
    } else {
      openModal({
        title: 'Error ❌',
        message: 'Failed to login'
      })
    }
    loading.value = false
  }
}

</script>

<template lang="pug">
.flex.flex-auto.items-center.justify-center
  .rounded-rt-12.rounded-lb-12.shadow-2xl.bg-neutral-100.pa-3xl.w-full.max-w-md.relative
    .kt-loading.rounded-rt-12.rounded-lb-12.absolute.top-0.left-0.right-0.bottom-0.bg-neutral-100.opacity-50.z-10.flex.items-center.justify-center(v-if="loading")
      .i-line-md-loading-twotone-loop.w-20.h-20.text-primary
    VForm(
      :validation-schema="schema"
      :initial-values="initialValues"
      v-slot="{ meta: formMeta }"
      @submit="handleSubmit"
    )
      .text-xl.mb-lg.font-bold Login
      .mb-lg
        VTextInput(
          type="text"
          name="email"
          placeholder="Email"
          leftIcon="i-fluent-mail-16-filled"
        )
      .mb-lg
        VTextInput(
          type="password"
          name="password"
          placeholder="Password"
          leftIcon="i-fluent-key-16-filled"
        )

      EmailButton(
        :disabled="!formMeta.valid"
        :loading="loading"
        name="Login"
      )

    .text-md.mb-lg.text-center
      span.mr-xs Don't have an account?
      NuxtLink(
        to="/register"
        class="font-bold"
      ) Register

    transition(name="openLoginButtons")
      div.overflow-hidden(v-if="activeButtons")
        .relative.text-center.mb-lg(class="before:content-empty before:absolute before:top-50% before:left-0 before:w-40% before:h-0.06rem before:bg-primary after:content-empty after:absolute after:top-50% after:right-0 after:w-40% after:h-0.06rem after:bg-primary") OR

        LoginButton(
          v-for="loginButton in loginButtons"
          :name="loginButton.name"
          :icon="loginButton.icon"
          @click="goToAuthorize(loginButton.url)"
        )
</template>

<style scoped></style>
