// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   app: {
    head: {
      // update Nuxt defaults
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
       script: process.env.NODE_ENV === 'production' ? [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-6RF6PMQEHC', defer: true },
         { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7216237547913391', defer: true, crossorigin: "anonymous"},
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6RF6PMQEHC');
          `,
          type: 'text/javascript',
        }
      ] : []
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    ssr: {
      noExternal: ['vuetify'],
    },
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('amp-')
        }
      }
    }
  },
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    '~/src/assets/main.css'
  ]
})