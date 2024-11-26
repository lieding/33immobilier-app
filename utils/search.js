import { TypologyOptionConfig, LocationType, L1AREA_REGIONS, L2AREA_REGION, loadProgramesByDepartment, CsvUrlConfig, loadSecondHandByDepartment } from '../common/config';
import { parseRawCsv } from './csv';

export const CompletionStatusKey = {
  SIX_MONTH: 'SIX_MONTH',
  SIX_TWELVE_MONTH: 'SIX_TWELVE_MONTH',
  ONE_TWO_YEAR: 'ONE_TWO_YEAR',
  MORE_THAN_TWO_YEAR: 'MORE_THAN_TWO_YEAR',
  DELIVERED: 'DELIVERED',
}

export const CompletionStatusOptionConfig = [
  { key: CompletionStatusKey.SIX_MONTH, I18NKey: 'COMPLETION_STATUS_OPTION_TO_SIX_MONTHS' },
  { key: CompletionStatusKey.SIX_TWELVE_MONTH, I18NKey: 'COMPLETION_STATUS_OPTION_SIX_TO_TWELVE_MONTHS' },
  { key: CompletionStatusKey.ONE_TWO_YEAR, I18NKey: 'COMPLETION_STATUS_OPTION_ONE_TO_TWO_YEARS' },
  { key: CompletionStatusKey.MORE_THAN_TWO_YEAR, I18NKey: 'COMPLETION_STATUS_OPTION_MORE_THAN_TWO_YEARS' },
  { key: CompletionStatusKey.DELIVERED, I18NKey: 'COMPLETION_STATUS_OPTION_DELIVERED' }
];

export function filterSecondHandListByConditions (list, priceRange, surfaceRange, selectedClassLevels) {
  let ret = list.slice();
  if (Array.isArray(priceRange)) {
    const [ min, max ] = priceRange;
    ret = ret.filter(it => it.price && (it.price >= min && it.price <= max ));
  }
  if (Array.isArray(surfaceRange)) {
    const [ min, max ] = surfaceRange;
    ret = ret.filter(it => it.surface && (it.surface >= min && it.surface <= max ));
  }
  selectedClassLevels = selectedClassLevels.filter(Boolean);
  if (selectedClassLevels.length) {
    ret = ret.filter(it => selectedClassLevels.includes(it.class_level?.repalceAll('-', '_')));
  }
  return ret;
}

export function filterProgrammeListByConditions (programes, priceRange, selectedCompletionStatusArr, selectedTypologies) {
  let ret = programes.slice();
  if (Array.isArray(priceRange)) {
    const [ min, max ] = priceRange;
    ret = ret.filter(({ availablePropertiesMinPrice: minP, availablePropertiesMaxPrice: maxP }) =>
      !(maxP < min) && !(minP > max)
    );
  }
  selectedCompletionStatusArr = selectedCompletionStatusArr.filter(Boolean);
  if (selectedCompletionStatusArr?.length) {
    ret = ret.filter(it => selectedCompletionStatusArr.includes(it.completionFlag));
  }
  selectedTypologies = selectedTypologies.filter(Boolean);
  if (selectedTypologies?.length) {
    ret = ret.filter(({ typologies }) => {
      typologies = typologies.map(it => it.toLowerCase());
      return typologies.some(it => selectedTypologies.some(itt => it.includes(itt)));
    });
  }
  return ret;
}

export function handleProgrames (programes, TypologyOption) {
  let minPrice = 0, maxPrice = 0, typologyOptionKeySet = new Set();
  const date = new Date(), curYear = date.getFullYear(),
    month = date.getMonth() + 1,
    quarter = Math.ceil(month / 3);
  for (const it of programes) {
    let { availablePropertiesMaxPrice: max, availablePropertiesMinPrice: min, typologies } = it;
    setCompletionStatusFlag(it, curYear, quarter);
    if (max > maxPrice) maxPrice = max;
    if (minPrice === 0) minPrice = min;
    else if (min < minPrice) minPrice = min;
    if (typeof typologies === 'string') typologies = typologies.split('|');
    if (Array.isArray(typologies)) {
      const translatedTypologies = [];
      for (let typology of typologies) {
        typology = typology.toLowerCase();
        const config = TypologyOptionConfig.find(config => typology.includes(config.incluedKey));
        if (config) {
          typologyOptionKeySet.add(config.incluedKey);
          translatedTypologies.push(TypologyOption.find(it => it.value === config.incluedKey)?.label);
        }
      }
      it.translatedTypologies = translatedTypologies.filter(Boolean);
    }
  }
  return { minPrice, maxPrice, typologyOptionKeys: Array.from(typologyOptionKeySet) };
}

function setCompletionStatusFlag (item, curYear, curQuarter) {
  if (item.delivered)
    return (item.completionFlag = CompletionStatusKey.DELIVERED);
  if (item.deliveryQuarter) {
    const [ year, quarter ] = item.deliveryQuarter?.split('T').map(it => Number(it)) ?? [];
    if (year < curYear) item.completionFlag = CompletionStatusKey.DELIVERED;
    else if (year === curYear) {
      if (quarter < curQuarter) item.completionFlag = CompletionStatusKey.DELIVERED;
      else item.completionFlag = CompletionStatusKey.SIX_MONTH;
    } else {
      if (year - curYear < 2) item.completionFlag = CompletionStatusKey.SIX_TWELVE_MONTH;
      else if (year - curYear > 3) item.completionFlag = CompletionStatusKey.MORE_THAN_TWO_YEAR;
      else item.completionFlag = CompletionStatusKey.ONE_TWO_YEAR;
    }
  }
}

/**
 * Loading new programe grouped by department id, each department data includes cities
 * each city has one or multiple postal codes
*/
export function loadProgrameDepartmentCities () {
  return fetch(CsvUrlConfig.ProgrameDepartmentCities)
    .then(res => res.text())
    .then(txt => parseRawCsv(txt, ',')?.rows)
    .then(rows => {
      return rows.map(row => {
        let cities = row.cities?.split('|');
        if (Array.isArray(cities)) {
          const splits = cities;
          cities = [];
          for (const split of splits) {
            if (split.includes('(') && split.includes(')')) {
              const idx = split.indexOf('('), idx1 = split.indexOf(')');
              const name = split.substring(0, idx), split1 = split.substring(idx + 1, idx1);
              const localities = split1.split('#').map(splitt => {
                let [ latitude, longitude, postal_code ] = splitt.split('$');
                latitude = Number(latitude) || null, longitude = Number(longitude) || null, postal_code = postal_code?.toString();
                return { latitude, longitude, postal_code };
              });
              cities.push({ name, localities });
            } else {
              cities.push({ name: split });
            }
          }
        } else {
          cities = [];
        }
        return { ...row, cities }
      });
    })
    .then(rows => {
      const info = [];
      for (const { department_id, department_name, cities, longitude, latitude } of rows) {
        const title = `${department_name}(${department_id})`
        info.push({ department_id, department_name, title, searchKey: title.toLowerCase(), isDepartment: true, longitude, latitude });
        for (const { name, localities } of cities) {
          const title = `${name}(${department_name},${department_id})`;
          const postcodes = Array.isArray(localities) ?
            localities.map(it => it.postal_code).filter(Boolean) : null;
          info.push({ department_id, name, title, searchKey: `${name} ${department_id}`.toLowerCase(), postcodes, localities });
        }
      }
      return info;
    })
    .catch((err) => { console.error(err); return []; })
}

/**
 * Loading second hand grouped by department id, each department data includes cities
 * each city has one or multiple postal codes
*/
export function loadSecondHandDepartmentCities () {
  return fetch(CsvUrlConfig.SecondHandDepartmentCities)
    .then(res => res.text())
    .then(txt => parseRawCsv(txt, ',')?.rows)
    .then(rows => {
      return rows.map(row => {
        let cities = row.cities?.split('|');
        if (Array.isArray(cities)) {
          const splits = cities;
          cities = [];
          for (const split of splits) {
            if (split.includes('(') && split.includes(')')) {
              const idx = split.indexOf('('), idx1 = split.indexOf(')');
              const name = split.substring(0, idx), split1 = split.substring(idx + 1, idx1);
              const localities = split1.split('#').map(splitt => {
                let [ latitude, longitude, postal_code ] = splitt.split('$');
                latitude = Number(latitude) || null, longitude = Number(longitude) || null, postal_code = postal_code?.toString();
                return { latitude, longitude, postal_code };
              });
              cities.push({ name, localities });
            } else {
              cities.push({ name: split });
            }
          }
        } else {
          cities = [];
        }
        return { ...row, cities }
      });
    })
    .then(rows => {
      const info = [];
      for (const { department_id, department_name, cities, longitude, latitude } of rows) {
        const title = `${department_name}(${department_id})`
        info.push({ department_id, department_name, title, searchKey: title.toLowerCase(), isDepartment: true, longitude, latitude });
        for (const { name, localities } of cities) {
          const title = `${name}(${department_name},${department_id})`;
          const postcodes = Array.isArray(localities) ?
            localities.map(it => it.postal_code).filter(Boolean) : null;
          info.push({ department_id, name, title, searchKey: `${name} ${department_id}`.toLowerCase(), postcodes, localities });
        }
      }
      return info;
    })
    .catch((err) => { console.error(err); return []; })
}

export function searchDepartmentCityPostcode (queryString, departmentCityInfo) {
  if (queryString?.length < 2) return [];
  const searchNormalTxt = isNaN(queryString);
  const lowered = queryString.toLowerCase();
  const ret = [];
  for (const it of departmentCityInfo) {
    const { department_id } = it;
    if (searchNormalTxt) {
      const valid = it.searchKey.startsWith(lowered) || department_id == lowered;
      if (valid) ret.push(it);
    } else {
      const { postcodes, localities, name } = it;
      if (postcodes?.some(it => it?.startsWith(lowered))) {
        ret.push({ ...it, localities: null });
        for (const { postal_code, latitude, longitude } of localities) {
          if (postal_code?.startsWith(queryString)) {
            const title = `${name}(${postal_code})`;
            ret.push({ department_id, title, latitude, longitude, postal_code, isPostalCode: true });
          }
        }
      }
    }
    if (ret.length > 26) return ret;
  }
  return ret;
}

/**
 * Do new programe search. It must be used with .call, .apply, .bind
 * @param {{
 *  place_id: string | null,
 *  department_city: string | null,
 *  locationType: string | null,
 *  postal_code: string | null,
 * }} obj
 * @param {Function} setProgrames
*/
export async function doProgrameQuery (obj, setProgrames) {
  const { place_id, department_city, locationType, postal_code, ...otherParams } = obj;
  const isPostalCode = locationType === LocationType.POSTAL_CODE && postal_code?.length > 1;
  if (!place_id && locationType && department_city) {
    const departments = [];
    if (locationType === LocationType.L1_AREA) {
      const found = L1AREA_REGIONS[department_city];
      if (found) departments.push(...found);
    } else if (locationType === LocationType.L2_AREA) {
      const found = L2AREA_REGION[department_city];
      if (found) departments.push(found);
    } else if (isPostalCode) {
      departments.push(postal_code.substring(0, 2));
    }
    return departments.length ? loadProgramesByDepartment(departments)
      .then(programes => {
        if (isPostalCode)
          programes = programes.filter(it => it.zip_code?.toString().startsWith(postal_code));
        Object.assign(this, setProgrames.call(this, programes, this.TypologyOption));
        return null;
      })
      .finally(() => this.dataLoading = false) : null;
  }
  if (place_id && locationType === LocationType.L2_AREA) {
    const { placeInfo } = (await this.$api.article.searchPlaceInfoById({ place_id })).data ?? {};
    if (placeInfo) {
      this.placeInfo = placeInfo;
      const regionId = placeInfo.postal_code.substring(0, 2);
      await loadProgramesByDepartment([regionId])
        .then(programes => Object.assign(this, setProgrames.call(this, programes, this.TypologyOption)))
    }
    return this.dataLoading = false;
  }
  const lang = this._i18n.locale;
  const params = { lang, ...otherParams };
  if (place_id)
    params.place_id = place_id;
  else if (department_city)
    params.city_name = department_city;
  const responseData = (await this.$api.article.searchProgramesByCity(params)).data;
  return responseData;
}

/**
 * Do second hand properties search. It must be used with .call, .apply, .bind
 * @param {{
 *  place_id: string | null,
 *  department_city: string | null,
 *  locationType: string | null,
 *  postal_code: string | null,
 * }} obj
 * @param {Function} setSecondHand
*/
export async function doSecondHandQuery (obj, setSecondHand) {
  const { place_id, department_city, locationType, postal_code, ...otherParams } = obj;
  const isPostalCode = locationType === LocationType.POSTAL_CODE && postal_code?.length > 1;
  if (!place_id && locationType) {
    const departments = [];
    if (locationType === LocationType.L1_AREA) {
      const found = L1AREA_REGIONS[department_city];
      if (found) departments.push(...found);
    } else if (locationType === LocationType.L2_AREA) {
      const found = L2AREA_REGION[department_city];
      if (found) departments.push(found);
    } else if (isPostalCode) {
      departments.push(postal_code.substring(0, 2));
    }
    return departments.length ? loadSecondHandByDepartment(departments)
      .then(properties => {
        if (isPostalCode)
          properties = properties.filter(it => it.zip_code?.toString().startsWith(postal_code));
        Object.assign(this, setSecondHand(properties));
        return null;
      })
      .finally(() => this.dataLoading = false) : null;
  }
  if (place_id && locationType === LocationType.L2_AREA) {
    const { placeInfo } = (await this.$api.article.searchPlaceInfoById({ place_id })).data ?? {};
    if (placeInfo) {
      this.placeInfo = placeInfo;
      const regionId = placeInfo.postal_code.substring(0, 2);
      await loadSecondHandByDepartment([regionId])
        .then(properties => Object.assign(this, setSecondHand(properties)))
    }
    return this.dataLoading = false;
  }
  let params = { ...otherParams };
  if (place_id)
    params.place_id = place_id;
  else if (locationType === LocationType.POSTAL_CODE && postal_code)
    params.postal_code = postal_code;
  else if (!locationType || locationType === LocationType.LOCALITY)
    params.city_name = department_city;
  const { placeInfo, properties } = (await this.$api.article.searchSecondHandByCity(params)).data;
  if (place_id && placeInfo)
    this.placeInfo = placeInfo;
  Object.assign(this, setSecondHand(properties));
}
