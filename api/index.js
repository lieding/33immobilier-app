import article from "~/api/article";
import BaseApi from './base'
import * as AccountApis  from './account';
// 其他模块的接口……

// 导出接口
export const BASE_API = BaseApi;

export default {
  article,
  AccountApis,
};
