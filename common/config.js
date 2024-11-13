import { fmoney } from '../utils';

export const TypologyOptionConfig = [
  { incluedKey: 'studio', I18NKey: 'TYPOLOGY_OPTION_LABEL_STUDIO' },
  { incluedKey: 't1', I18NKey: 'TYPOLOGY_OPTION_LABEL_T1' },
  { incluedKey: 't2', I18NKey: 'TYPOLOGY_OPTION_LABEL_T2' },
  { incluedKey: 't3', I18NKey: 'TYPOLOGY_OPTION_LABEL_T3' },
  { incluedKey: 't3 bis', I18NKey: 'TYPOLOGY_OPTION_LABEL_T3_BIS' },
  { incluedKey: 't4', I18NKey: 'TYPOLOGY_OPTION_LABEL_T4' },
  { incluedKey: 't5', I18NKey: 'TYPOLOGY_OPTION_LABEL_T5' },
  { incluedKey: 't6', I18NKey: 'TYPOLOGY_OPTION_LABEL_T6' },
  { incluedKey: 'maison t6', I18NKey: 'TYPOLOGY_OPTION_LABEL_MAISON_T6' },
  { incluedKey: 'maison individuelle', I18NKey: 'TYPOLOGY_OPTION_LABEL_MAISON_INDIVIDUELEL' },
  { incluedKey: 'maison', I18NKey: 'TYPOLOGY_OPTION_LABEL_MAISON' },
  { incluedKey: 'villa', I18NKey: 'TYPOLOGY_OPTION_LABEL_VILLA' },
  { incluedKey: 'duplex', I18NKey: 'TYPOLOGY_OPTION_LABEL_DUPLEX' },
  { incluedKey: 'triplex', I18NKey: 'TYPOLOGY_OPTION_LABEL_TRIPLEX' },
  { incluedKey: 'box', I18NKey: 'TYPOLOGY_OPTION_LABEL_BOX' },
  { incluedKey: 'parking', I18NKey: 'TYPOLOGY_OPTION_LABEL_PARKING' },
  { incluedKey: 'appartement', I18NKey: 'TYPOLOGY_OPTION_LABEL_APPARTEMENT' },
  { incluedKey: 'bureau', I18NKey: 'TYPOLOGY_OPTION_LABEL_BUREAU' },
  { incluedKey: 'commercial', I18NKey: 'TYPOLOGY_OPTION_LABEL_COMMERCIAL' },
  { incluedKey: 'chambre', I18NKey: 'TYPOLOGY_OPTION_LABEL_CHAMBRE' },
  { incluedKey: 'suite', I18NKey: 'TYPOLOGY_OPTION_LABEL_SUITE' },
  { incluedKey: 'unité vie', I18NKey: 'TYPOLOGY_OPTION_LABEL_SUITE' },
  { incluedKey: 'cellier', I18NKey: 'TYPOLOGY_OPTION_LABEL_CELLIER' },
];

export const SearchMode = {
  NewPrograme: 'NewPrograme',
  SecondHand: 'Secondhand',
  Renting: 'Renting',
};

export const CsvUrlConfig = {
  ProgramCityDistribution: 'https://raw.githubusercontent.com/mingzemicco/33immo-config/refs/heads/main/program-city-distribution.csv',
}

export const JsonConfig = {
  NationCodeFlag: 'https://gist.githubusercontent.com/devhammed/78cfbee0c36dfdaa4fce7e79c0d39208/raw/494967e8ae71c9fed70650b35dd96e9273fa3344/countries.json',
}

export function transformNewProgramPoints (parsed) {
  const { header, rows } = parsed ?? {};
  if (!header || !rows) return;
  return rows.map(({ city, count, latitude, longitude, region_id }) => {
    return {
      lat: latitude,
      lng: longitude,
      city,
      title: count?.toString() ?? '',
      groupCondition: region_id
    };
  });
}

export function extractProgramProperty (property) {

  const { typology, surface, number, prices } = property;
  const price = prices?.[0]?.price;
  return [
    {
      label: this.$t('message.NEW_LIST.ALL_TYPOLOGY_LABEL'),
      text: this.TypologyI18NConfig?.find(itt => typology?.toLowerCase().includes(itt.incluedKey))?.label ?? ''
    },
    {
      label: this.$t('message.global.SURFACE'),
      text: surface ? surface + 'm²' : ''
    },
    {
      label: this.$t('message.global.chamberNum'),
      text: number ?? ''
    },
    {
      label: this.$t('message.global.price'),
      text: price ? fmoney(price, 0) + '€' : '',
    }
  ]
}

export const PostApplicationMode = {
  PROGRAME_PROPERTY: 'PROGRAME_PROPERTY',
  SECOND_HAND: 'SECOND_HAND',
  JOIN: 'JOIN'
};
