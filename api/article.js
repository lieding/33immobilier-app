import axios from "~/common/http"; // 导入http中创建的axios实例
import { getAccessToken } from '../utils/auth';

const cachedArr = [];

const CACHE_SIZE = 8;

/**
 * @param {string} key
*/
function checkCache (key) {
  const idx = cachedArr.findIndex(it => it.key === key);
  if (idx < 0) return null;
  const found = cachedArr.splice(idx, 1)[0];
  cachedArr.push(found);
  return Promise.resolve(found);
}

function setCache (key, val) {
  cachedArr.push({ key, val });
  if (cachedArr.length > CACHE_SIZE)
    cachedArr.shift()
}

function createKey (path, params) {
  return path + '?' + (new URLSearchParams(params || {})).toString();
}

function handleRes (res, key) {
  // setCache(key, res.data);
  return res;
}

function createHeaderWithAuth () {
  return {
    Authorization: `Bearer ${getAccessToken()}`,
  };
}

const article = {
  // 获取首页数据
  getHomePageInfo() {
    const Path = '/homepage-index'
    const key = createKey(Path);
    return axios.get(Path).then(res => handleRes(res, key));
  },
  getProgrameDetail(params) {
    const Path = '/programme-detail';
    const key = createKey(Path, params);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  getSecondHandDetail (params) {
    const Path = '/second-hand-detail';
    const key = createKey(Path, params);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  getStoreDetail (params) {
    const Path = '/store-detail';
    const key = createKey(Path, params);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  translateStoreDetail (params) {
    const Path = '/store-detail-translate';
    const key = createKey(Path, params);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  searchProgramesByCity (params) {
    const Path = '/search-programes-by-city';
    const key = createKey(Path, params);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  searchSecondHandByCity (params) {
    const Path = '/search-second-hand-by-city';
    const key = createKey(Path, params);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  searchPlaceInfoById (params) {
    const Path = '/search-place-info-by-id';
    const key = createKey(Path, params);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  searchPlaceId (params) {
    const Path = '/search-placeid';
    const key = createKey(Path, params);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  postApplication (data) {
    return axios.post('/post-application', data);
  },
  getRentPhotosPresignedUrls (data) {
    const headers = createHeaderWithAuth();
    return axios.post('/rent-photo-presigned-urls', data, { headers });
  },
  createNewRent (data) {
    const headers = createHeaderWithAuth();
    return axios.post('/create-new-rent', data, { headers });
  },
  getRentDetail (params) {
    const Path = '/rent-detail';
    const key = createKey(Path, params);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  searchRentsByUserId () {
    const Path = '/search-rents-by-userid';
    const key = createKey(Path);
    const headers = createHeaderWithAuth();
    return axios.get(Path, { headers }).then(res => handleRes(res, key));
  },
  searchRentings (params) {
    const Path = '/search-rentings';
    const key = createKey(Path);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  translateRentDetail (params) {
    const Path = '/rent-detail-translate';
    const key = createKey(Path, params);
    return axios.get(Path, { params }).then(res => handleRes(res, key));
  }
};

export default article;
