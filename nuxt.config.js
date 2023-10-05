import I18N from "./i18n";
const { resolve } = require('path')

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "33找房, 法国第一华人找房平台",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "法国33找房为您提供法国房产、房价、投资、减税、生活服务等信息。在法国,寻找新房、二手房、租房、服务就上法国33找房! 全法最专业的华人找房平台"
      },
      {
        name: "keywords",
        content:
          "法国找房平台,新房,二手房,租房,装修,保洁,服务,投资,减税,楼盘,法国购房,法国房产,法国租房,法国房地产网,个人急售二手房,33找房,PINEL,LMNP"
      },
      {
        name: "og:type",
        content: "website"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      { src: "https://cdn.jsdelivr.net/npm/qrcodejs2@0.0.2/qrcode.min.js" },
      { src: "https://accounts.google.com/gsi/client" },
      { src: "https://unpkg.com/blueimp-gallery@2.27.0/js/blueimp-gallery.js" }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/reset.css",
    "element-ui/lib/theme-chalk/index.css",
    "vant/lib/index.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/axios" },
    { src: "~/plugins/element-ui" },
    { src: "~/plugins/vant", ssr: false },
    { src: "~/plugins/vue-gallery.client.js", ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-152569500-1"
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [["nuxt-i18n", I18N], "@nuxtjs/sitemap", "@nuxtjs/device"],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias['~'] = resolve(__dirname, './');
    }
  },
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
    timing: false
  }
};
