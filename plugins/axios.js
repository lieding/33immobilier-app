import Vue from "vue";
import axios from "../api/index";

export default () => {
  Vue.prototype.$api = axios;
};
