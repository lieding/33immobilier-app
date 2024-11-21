import { TypologyOptionConfig } from '../common/config';

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


