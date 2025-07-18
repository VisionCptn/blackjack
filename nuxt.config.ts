// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   app: {
    head: {
      // update Nuxt defaults
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
       script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-6RF6PMQEHC', defer: true },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6RF6PMQEHC');
          `,
          type: 'text/javascript',
        }
      ]
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/google-adsense',
      {
        id: 'ca-pub-7216237547913391', // replace "#" with "2112345678904791",
        onPageLoad: true, // this is required to be true for our ads to show in our 
        test: false // if we are using development env. the test variable will help us to show where your ads will appear
      }
    ],
    '@nuxt/ui'
  ],
  css: [
    '~/src/assets/main.css'
  ]
})
