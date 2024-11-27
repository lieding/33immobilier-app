// export * as Validator from './validate';

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
 * @param {String} href
*/
export function aLink (href) {
  const aEl = document.createElement('a');
  aEl.target = '_blank';
  aEl.href = href;
  aEl.click();
}
