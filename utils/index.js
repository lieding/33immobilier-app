
export function fmoney(s, n = 0) {
  n = n >= 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n);
  var l = s
      .split(".")[0]
      .split("")
      .reverse(),
    r = s.split(".")[1] || undefined;
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? " " : "");
  }
  t = t.split("").reverse().join("");
  return r ? [t, r].join('.') : t;
}

export function scrollListener (cbk) {
  if (!cbk) return;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  const scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  if (scrollTop + windowHeight >= scrollHeight) {
    cbk();
  }
};

async function queryLocation (kw) {
  const SearchAddressUrl = 'https://api-adresse.data.gouv.fr/search/';
  return fetch(`${SearchAddressUrl}?q=${kw}&type=municipality`)
    .then(res => res.json())
    .then(res => res.features?.map((ele) => ({
      ...ele?.properties,
      coordinates: ele?.geometry.coordinates,
    })))
    .then((items) => items.filter(it => typeof it === 'object'))
}

/**
 * Search city geolocation by its name and filter by the id of region it is located
 * @param {string} city the name of the city
 * @param {string} region_id like 92, 75
*/
export async function searchCityGeolocation (city, region_id) {
  const locations = await queryLocation(city);
  console.log(locations);
  if (!Array.isArray(locations)) return;
  for (const it of locations) {
    if (it.postcode?.startsWith(region_id) && it.coordinates?.length) {
      const [ longitude, latitude ] = it.coordinates.map(it => Number(it));
      return { ...it, latitude, longitude };
    }
  }
  return null;
}

/**
 * @param {Array} arr
*/
export function checkArrLenGreaterThan1 (arr) {
  return Array.isArray(arr) && arr.length > 1;
}

/**
 * @param {String} href
*/
export function aLink (href) {
  const aEl = document.createElement('a');
  aEl.target = '_blank';
  aEl.href = href;
  aEl.click();
}

export function createPath (path) {
  if (path.startsWith('/')) path = path.substring(1);
  const curPath = window.location.pathname;
  const split = curPath.split('/');
  split[split.length - 1] = path;
  return split.join('/');
}

/**
 * extract translated keys, like title_en
 * @param {object} obj
 * @param {string[]} keys
 * @param {string} lang
*/
export function extractTranslatedProperty (obj, keys, lang) {
  const ret = {};
  if (lang === 'zh') lang = 'cn_zh';
  for (const key of keys) {
    const val = obj[key + '_' + lang];
    if (val) ret[key] = val;
  }
  return ret;
}

/// city: "Paris"
// citycode: "75118"
// context: "75, Paris, Île-de-France"
// district: "Paris 18e Arrondissement" Attention, this value maybe Null
/// housenumber "113" Attention, this value maybe Null
// id: "75118_5122"
// importance: 0.74667
// label: "Avenue Junot 75018 Paris"
// name: "Avenue Junot"
// postcode: "75018"
// score: 0.2724245454545455
// street: "Avenue Junot"
// type: "street"  OR "housenumber" or "municipality"
// x: 651328.83
// y: 6865553.21
/**
 * @param {String} kw
 * @returns {}
*/
const SearchAddressUrl = 'https://api-adresse.data.gouv.fr/search/';
export function addressAutocompleteSearch (kw) {
  return fetch(`${SearchAddressUrl}?q=${kw}&limit=6&type=housenumber`)
    .then(res => res.json())
    .then(res => res.features?.map((ele) => {
      if (!ele) return;
      const { properties, geometry: { coordinates } } = ele;
      return { ...properties, latitude: coordinates[1], longitude: coordinates[0] };
    }))
    .then((items) => items?.filter(Boolean));
}

/**
 * @param {String} presignedUrl
 * @param {File} file
*/
export function upload2S3 (presignedUrl, file) {
  return fetch(presignedUrl, {
    method: "PUT",
    headers: { 'Content-Type': file.type },
    body: file
  });
}
