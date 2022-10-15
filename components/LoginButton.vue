<script lang="ts" setup>
defineProps<{
  name: string,
  icon: string
}>()
</script>

<template lang="pug">
div(class="mb-lg rounded-9 b-1 b-primary text-center pa-2 relative cursor-pointer hover:bg-gray-200 transition-colors")
  .text-neutral-700.font-medium
    .inline-block.align-middle.w-5.h-5.mr-2(:class="`i-logos-${icon}`")
    | {{ name }}
</template>

<style lang="sass"></style>
