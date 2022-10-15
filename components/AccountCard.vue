<script lang="ts" setup>
const props = defineProps<{
  account: AccountCard,
  accountName: string,
}>()

</script>

<template lang="pug">
div(class="w-full max-w-17rem bg-neutral-100 pa-lg rounded-lg shadow-2xl mb-lg mx-auto h-full hover:scale-105 transition-transform")
  .flex.flex-col.justify-center.h-full
    .text-xl.mb-lg.uppercase.font-medium {{ accountName }}
    img.mx-auto.rounded-full.w-full.mb-lg(v-if="account.image" :src="account.image", alt="Image", class="max-w-10rem")
    .text-lg {{ account.fullName }}
    .text-lg(v-if="account.username") @{{ account.username }}
    .text-md.opacity-90(v-if="account.bio") {{ account.bio }}
    .text-md.c-blue-700(v-if="account.country")
      | Country
      .i-line-md-moon-alt-to-sunny-outline-loop-transition.w-5.h-5.mx-2.inline-block.align-middle
      | {{ account.country }}
    .text-md.c-cyan-700(v-if="account.phone")
      | Phone
      .i-line-md-grid-3-filled.w-5.h-5.mx-2.inline-block.align-middle
      | {{ account.phone }}
    .text-md.c-orange-600(v-if="account.followers")
      | Followers
      .i-line-md-chevron-double-up.w-5.h-5.mx-2.inline-block.align-middle
      | {{ account.followers }}
</template>

<style scoped></style>
