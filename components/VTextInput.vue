<script lang='ts' setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  leftIcon: {
    type: String,
    default: ''
  }
})
</script>

<template lang="pug">
div
  VField(:name='name', v-slot='{ field, meta, errors }')
    .flex.px-sm.py-xs.bg-white.rounded-1.shadow-1xl
      span(:class='leftIcon').w-7.h-7.inline-block.mr-2
      input.w-full.bg-transparent.outline-none(v-bind='field', :placeholder='placeholder', :type='type')
    div(class="min-h-1.5rem")
      transition(name='fade')
        div(v-show='meta.touched && errors.length > 0', class="pt-0.25rem").text-sm.font-medium.text-red
          VErrorMessage(
            :name='name',
            as='div'
          )
</template>

<style scoped lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: opacity, transform 0.5s ease

.fade-enter-from,
.fade-leave-to
  transform: translateY(-0.5rem)
  opacity: 0
</style>
