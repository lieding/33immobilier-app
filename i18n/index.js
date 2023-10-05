import fr from "./lang/fr";
import zh from "./lang/zh";

export default {
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
