import extractorPug from '@unocss/extractor-pug'
import { extractorSplit } from '@unocss/core'

export default defineNuxtConfig({
  ssr: false,
  target: 'static',
  app: {
    head: {
      title: 'Authentications with Nuxt 3',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Authentications by Gerson Ruiz' },
        { hid: 'keywords', name: 'keywords', content: 'Authentications, Nuxt 3, Frontend, Front-end, Gerson Ruiz Portfolio, Gerson Ruiz' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt'
  ],
  css: [
    '@/assets/css/kt.css'
  ],
  unocss: {
    uno: true,
    icons: true,
    preflight: true,

    extractors: [
      extractorPug(),
      extractorSplit
    ],
    safelist: [
      'i-logos-github-icon',
      'i-logos-google-icon',
      'i-logos-linkedin-icon',
      'i-logos-facebook',
      'i-logos-twitter'
    ],

    theme: {
      colors: {
        primary: '#2e7d32'
      }
    }
  }
})
