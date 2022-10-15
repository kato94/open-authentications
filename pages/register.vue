<script lang="ts" setup>
import { object, string, ref as yupRef } from 'yup'
import { configure } from 'vee-validate'
import useIndex from '@/composables/useIndex'
import useAuth from '@/composables/useAuth'

definePageMeta({
  middleware: 'unauthenticated'
})

const { loginButtons, activeButtons, getLoginButtons, openModal } = useIndex()
const { register } = useAuth()

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
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  country: string(),
  phone: string(),
  email: string().required('Email is required').email('Email is invalid'),
  password: string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .test('password', 'Password must contain have a Uppercase, lowercase letter and a number', (value) => {
      if (!value) { return false }
      const hasUppercase = /[A-Z]/.test(value)
      const hasLowercase = /[a-z]/.test(value)
      const hasNumber = /\d/.test(value)
      return hasUppercase && hasLowercase && hasNumber
    }),
  passwordConfirmation: string().required('Password confirmation is required').oneOf([yupRef('password')], 'Passwords must match')
})

const initialValues = {
  firstName: '',
  lastName: '',
  country: '',
  phone: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

const handleSubmit = async (values, actions) => {
  if (!loading.value) {
    loading.value = true
    const { success } = await register(values)
    if (success) {
      await navigateTo('/')
    } else {
      openModal({
        title: 'Error ❌',
        message: 'Failed to register'
      })
    }
    loading.value = false
  }
}

</script>

<template lang="pug">
.flex.flex-auto.items-center.justify-center
  .rounded-rt-12.rounded-lb-12.shadow-2xl.bg-neutral-100.pa-3xl.w-full.max-w-lg.relative
    .kt-loading.rounded-rt-12.rounded-lb-12.absolute.top-0.left-0.right-0.bottom-0.bg-neutral-100.opacity-50.z-10.flex.items-center.justify-center(v-if="loading")
      .i-line-md-loading-twotone-loop.w-20.h-20.text-primary
    VForm(
      :validation-schema="schema"
      :initial-values="initialValues"
      v-slot="{ meta: formMeta }"
      @submit="handleSubmit"
    )
      .text-xl.mb-lg.font-bold Register
      .columns-2.gap-4
        .mb-lg
          VTextInput(
            type="text"
            name="firstName"
            placeholder="First Name *"
            leftIcon="i-fluent-clipboard-bullet-list-ltr-16-filled"
          )
        .mb-lg
          VTextInput(
            type="text"
            name="lastName"
            placeholder="Last Name *"
            leftIcon="i-fluent-clipboard-bullet-list-rtl-16-filled"
          )
      .columns-2.gap-4
        .mb-lg
          VTextInput(
            type="text"
            name="country"
            placeholder="Country"
            leftIcon="i-fluent-weather-sunny-16-filled"
          )
        .mb-lg
          VTextInput(
            type="text"
            name="phone"
            placeholder="Phone"
            leftIcon="i-fluent-call-16-filled"
          )
      .mb-lg
        VTextInput(
          type="text"
          name="email"
          placeholder="Email *"
          leftIcon="i-fluent-mail-16-filled"
        )

      .mb-lg
        VTextInput(
          type="password"
          name="password"
          placeholder="Password *"
          leftIcon="i-fluent-key-16-filled"
        )
      .mb-lg
        VTextInput(
          type="password"
          name="passwordConfirmation"
          placeholder="Password Confirmation *"
          leftIcon="i-fluent-key-16-filled"
        )

      EmailButton(
        :disabled="!formMeta.valid"
        :loading="loading"
        name="Register"
      )

    .text-md.mb-lg.text-center
      span.mr-xs Already have an account?
      NuxtLink(
        to="/login"
        class="font-bold"
      ) Login

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
