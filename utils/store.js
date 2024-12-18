import { fmoney, extractTranslatedProperty } from './index';
import { L2AREA_REGION } from '../common/config';

export const CSV_SPLIT_SIZE = 500;

export function getInstanceParams (rows) {
  let minPrice = 0, maxPrice = 0, minSurface = 0, maxSurface = 0;
  for (const { price, surface } of rows) {
    if (price) {
      if (!minPrice) minPrice = price;
      else minPrice = Math.min(minPrice, price);
      if (!maxPrice) maxPrice = price;
      else maxPrice = Math.max(maxPrice, price);
    }
    if (surface) {
      if (!minSurface) minSurface = surface;
      else minSurface = Math.min(minSurface, surface);
      if (!maxSurface) maxSurface = surface;
      else maxSurface = Math.max(maxSurface, surface);
    }
  }
  return {
    minPrice, maxPrice, minSurface, maxSurface,
    priceRange: [minPrice, maxPrice], surfaceRange: [minSurface, maxSurface],
    filterdData: rows.slice(),
  };
}

export function filterTableDataByConditions (allRows, categoryId, priceRange, surfaceRange) {
  let ret = allRows.slice();
  if (categoryId) {
    ret = ret.filter(it => it.category === categoryId);
  }
  const [ minPrice, maxPrice ] = priceRange;
  if (minPrice && maxPrice)
    ret = ret.filter(it => it.price >= minPrice && it.price <= maxPrice);
  const [ minSurface, maxSurface ] = surfaceRange;
  if (minSurface && maxSurface)
    ret = ret.filter(it => it.surface >= minSurface && it.surface <= maxSurface);
  return ret;
}

export function extractProperty (property) {
  const { price, title } = property;
  return [
    {
      label: this.$t('message.global.TITLE'),
      text: title
    },
    {
      label: this.$t('message.global.PRICE'),
      text: price ? fmoney(price) + '€' : '',
    }
  ];
}

export async function queryDetail (VueInst, department_id, id, lang) {
  const res = await VueInst.$api.article.getStoreDetail({ department_id, id, lang });
  const detail = res.data;
  if (!detail) return;
  const category = detail.category;
  detail.translatedCategory = category ?
  VueInst.$t('message.PAGE_STORE.CATEGORIES')[category] : '';
  const departmentId = detail.department_id;
  const departmentName = Object.entries(L2AREA_REGION).find(it => it[1] === departmentId)?.[0];
  detail.addressInfo = [`${departmentName}(${departmentId})`, detail.zip_code].filter(Boolean).join(' / ');
  detail.images = Array.isArray(detail.images) ? detail.images.filter(Boolean) : [];
  Object.assign(detail, extractTranslatedProperty(detail, ['title', 'revenu'], lang));
  VueInst.detail = detail;
  if (detail.missingTranslation) {
    VueInst.$api.article.translateStoreDetail({ department_id, id, lang })
      .then(res => {
        const data = res.data;
        if (data) {
          const translated = extractTranslatedProperty(data, ['title', 'revenu', 'description'], lang);
          VueInst.detail = { ...VueInst.detail, ...translated };
        }
      })
  }
}
