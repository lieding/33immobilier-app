const fr = require("./lang/fr");
const zh = require("./lang/zh");

module.exports = {
  locales: [
    {
      code: "fr",
      iso: "fr-FR",
      name: "FR"
    },
    {
      code: "zh",
      iso: "zh-CN",
      name: "ZH"
    }
  ],
  defaultLocale: "zh",
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "lang",
    alwaysRedirect: false
  },
  vueI18n: {
    fallbackLocale: "zh",
    messages: { fr, zh }
  }
};
