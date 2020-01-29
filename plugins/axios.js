import Vue from "vue";
import axios from "~/api/index";

export default ({ app }, inject) => {
  // Vue.prototype.$api = axios;
  app.$api = axios;
  inject("api", axios);
};
