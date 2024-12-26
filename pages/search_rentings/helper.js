import { parseRawCsv } from '../../utils/csv';
import { LocationType } from '../../common/config';

export function loadCityZipcodeConfig () {
  return Promise.all([
    fetch('https://33immobilier.s3.eu-west-3.amazonaws.com/renting-city.csv')
      .then(res => res.text()).then(txt => parseRawCsv(txt, ',')?.rows),
    fetch('https://33immobilier.s3.eu-west-3.amazonaws.com/renting-zip_code.csv')
      .then(res => res.text()).then(txt => parseRawCsv(txt, ',')?.rows),
  ]).then(([ city, zip_code ]) => {
    if (Array.isArray(zip_code)) {
      for (const it of zip_code) {
        it.locationType = LocationType.POSTAL_CODE;
        it.label = `${it.zip_code}(${it.city})`;
        it.searchKey = it.zip_code.toString();
      }
    }
    if (Array.isArray(city)) {
      for (const it of city) {
        it.label = `${it.city}`;
        it.searchKey = it.city.toLowerCase();
      }
    }
    return [ ...city, ...zip_code ].filter(Boolean);
  });
}

/**
 * @param {{rentType: string, availableDate: string, rent_duration: number, pureRent: number, pureRentRange: number[] | undefined, surface: number, surfaceRange: number[] | undefined}[]} rentings
*/
export function parseRentings (rentings) {
  let minPrice = 0, maxPrice = 0, minSurface = 0, maxSurface = 0;
  for (const { pureRent, pureRentRange, surface, surfaceRange } of rentings) {
    const minP = pureRentRange?.[0] || pureRent;
    const maxP = pureRentRange?.[1] || pureRent;
    if (minP) {
      if (!minPrice) minPrice = minP;
      else minPrice = Math.min(minP, minPrice);
    }
    if (maxP) {
      if (!maxPrice) maxPrice = maxP;
      else maxPrice = Math.max(maxP, maxPrice);
    }
    const minS = surfaceRange?.[0] || surface;
    const maxS = surfaceRange?.[1] || surface;
    if (minS) {
      if (!minSurface) minSurface = minS;
      else minSurface = Math.min(minS, minSurface);
    }
    if (maxS) {
      if (!maxSurface) maxSurface = maxS;
      else maxSurface = Math.max(maxS, maxSurface);
    }
  }
  return {
    minPrice, maxPrice, priceRange: [minPrice, maxPrice],
    minSurface, maxSurface, surfaceRange: [minSurface, maxSurface],
  }
}

/**
 * @param {{rentType: string, availableDate: string, rent_duration: number, pureRent: number, pureRentRange: number[] | undefined, surface: number, surfaceRange: number[] | undefined}[]} rentings
 * @param {string} rentType
 * @param {string} availableDate
 * @param {number} rentDuration
 * @param {number[]} priceRange
 * @param {number[]} surfaceRange
*/
export function filterTableData (rentings, rentType, availableDate, rentDuration, priceRange, surfaceRange) {
  let ret = rentings.slice();
  if (rentType) {
    ret = ret.filter(it => it.rentType === rentType);
  }
  if (availableDate) {
    ret = ret.filter(it => it.availableDate < availableDate);
  }
  if (typeof rentDuration === 'number') {
    ret = ret.filter(it => it.rent_duration >= rentDuration);
  }
  const [ minPrice, maxPrice ] = priceRange || [];
  if (minPrice && maxPrice) {
    ret = ret.filter(it => {
      if (it.pureRentRange?.length > 1)
        return  it.pureRentRange[0] <= maxPrice || it.pureRentRange[0] >= minPrice;
      return it.pureRent >= minPrice && it.pureRent <= maxPrice;
    });
  }
  const [ minSurface, maxSurface ] = surfaceRange || [];
  if (minSurface && maxSurface) {
    ret = ret.filter(it => {
      if (it.surfaceRange?.length > 1)
        return  it.surfaceRange[0] <= maxSurface || it.surfaceRange[0] >= minSurface;
      return it.surface >= minSurface && it.surface <= maxSurface;
    });
  }
  return ret;
}
