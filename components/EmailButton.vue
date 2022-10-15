<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template lang="pug">
button(
  type="submit",
  :disabled="disabled",
  class="hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
).w-full.mb-lg.rounded-9.bg-primary.text-center.pa-2.transition-shadow.shadow-none.cursor-pointer
  .text-white.font-medium {{ name }}
</template>

<style scoped></style>
