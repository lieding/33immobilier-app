import axios from "~/common/http"; // 导入http中创建的axios实例

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
  setCache(key, res.data);
  return res;
}

const article = {
  // 获取首页数据
  getHomePageInfo() {
    const Path = '/homepage-index'
    const key = createKey(Path);
    return checkCache(key) ?? axios.get(Path).then(res => handleRes(res, key));
  },
  getInfoNewHous(params) {
    const Path = '/programme-detail';
    const key = createKey(Path, params);
    return checkCache(key) ?? axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  searchProgramesByCity (params) {
    const Path = '/search-programes-by-city';
    const key = createKey(Path, params);
    return checkCache(key) ?? axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  searchPlaceInfoById (params) {
    const Path = '/search-place-info-by-id';
    const key = createKey(Path, params);
    return checkCache(key) ?? axios.get(Path, { params }).then(res => handleRes(res, key));
  },
  postApplication (data) {
    return axios.post('/post-application', data);
  }
};

export default article;
