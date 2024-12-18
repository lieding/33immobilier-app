import { fmoney } from './index'

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
