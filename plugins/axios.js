import Vue from "vue";
import axios from "../api/index";

export default ({ app }) => {
  Vue.prototype.$api = axios;
  app.$api = axios;
};
