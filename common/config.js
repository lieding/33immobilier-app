import { fmoney } from '../utils';
import { parseRawCsv } from '../utils/csv';


export const LocationType = {
  POSTAL_CODE: 'postal_code',
  LOCALITY: 'locality',
  L1_AREA: 'administrative_area_level_1',
  L2_AREA: 'administrative_area_level_2',
  L3_AREA: 'administrative_area_level_3'
}

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
  IndexPageCityProgrames: 'https://raw.githubusercontent.com/mingzemicco/33immo-config/refs/heads/main/index_city_programes.csv',
  ProgrameRegionidCities: 'https://raw.githubusercontent.com/mingzemicco/33immo-config/refs/heads/main/programe_region_id_cities.csv',
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

export const CityRegionGeolocation = {
  Paris: { lat: 48.8588897, lng: 2.320041 },
  'Rueil-Malmaison': { lat: 48.87778, lng: 2.1802832 },
  'Le Blanc-Mesnil': { lat: 48.9385489, lng: 2.4631476 },
  Nice: { lat: 43.7009358, lng: 7.2683912 },
  'Saint-Denis': { lat: 48.9355885, lng: 2.3397438 },
  Marseille: { lat: 43.2961743, lng: 5.3699525 },
  Strasbourg: { lat: 48.584614, lng: 7.7507127 },
  'Île-de-France': { lat: 48.8588897, lng: 2.320041 },
  Aubervilliers: { lat: 48.9146078, lng: 2.3821895 },
  Villejuif: { lat: 48.7921098, lng: 2.3633048 },
  Colombes: { lat: 48.922788, lng: 2.2543577 },
  'Saint-Ouen-sur-Seine': { lat: 48.911729, lng: 2.334267 }
}

export const L1AREA_REGIONS = {
  'Île-de-France': ['75', '91', '92', '93', '94', '95'],
}

export const L2AREA_REGION = {
  'Hauts-de-Seine': '92',
  Paris: '75',
  "Val-d'Oise": '95',
  'Val-de-Marne': '94',
  'Seine-Saint-Denis': '93',
  Essonne: '91',
  Yvelines: '78',
  'Seine-et-Marne': '77',
  Gard: '30',
  'Saône-et-Loire': '71',
  Loiret: '45',
  'Meurthe-et-Moselle': '54',
  'Hérault': '34',
  Orne: '61',
  Var: '83',
  'Bouches-du-Rhône': '13',
  'Alpes-Maritimes': '06',
  Morbihan: '56',
  'Loire-Atlantique': '44',
  Gironde: '33',
  'Charente-Maritime': '17',
  Charente: '16',
  'Rhône': '69',
  Nord: '59',
  'Haute-Savoie': '74',
  Calvados: '14',
  Savoie: '73',
  "Côte-d'Or": '21',
  Oise: '60',
  'Haute-Garonne': '31',
  'Pyrénées-Atlantiques': '64',
  'Eure-et-Loir': '28',
  'Maine-et-Loire': '49',
  'Pas-de-Calais': '62',
  'Seine-Maritime': '76',
  'Ille-et-Vilaine': '35',
  'Bas-Rhin': '67',
  Loire: '42',
  'Isère': '38',
  'Indre-et-Loire': '37',
  Ain: '01',
  'Vendée': '85',
  'Finistère': '29',
  'Puy-de-Dôme': '63',
  'Alpes-de-Haute-Provence': '04',
  Aude: '11',
  Landes: '40',
  Vaucluse: '84',
  Somme: '80',
  'Haut-Rhin': '68',
  'Ardèche': '07',
  "Côtes-d'Armor": '22',
  Eure: '27',
  Ariège: '09',
  Dordogne: '24',
  Sarthe: '72',
  'Lot-et-Garonne': '47',
  Mayenne: '53',
  Vienne: '86',
  Doubs: '25',
  Moselle: '57',
  Jura: '39',
  'Drôme': '26',
  Aube: '10',
  Manche: '50',
  Marne: '51',
  Aisne: '02',
  'Hautes-Alpes': '05',
  'Tarn-et-Garonne': '82',
  "Loir-et-Cher": '41',
  'Haute-Vienne': '87',
  'Deux-Sèvres': '79',
  Ardennes: '08',
  'Corrèze': '19',
  'Territoire de Belfort': '90',
  Aveyron: '12',
  'Hautes-Pyrénées': '65',
  Cher: '18',
  'Nièvre': '58',
  Tarn: '81',
  Allier: '03',
  Lot: '46',
  Yonne: '89'
};

export function loadProgramesByRegions (regions) {
  const promises = regions
    .map(region_id =>
      fetch(`https://raw.githubusercontent.com/mingzemicco/33immo-config/refs/heads/main/regions/${region_id}.csv`)
        .then(res => res.text())
        .then(txt => parseRawCsv(txt, ',')?.rows)
        .catch(() => null)
    );
  return Promise.all(promises).then(rowsList => rowsList.filter(Boolean).flat());
}

export function loadProgrameRegionidCities () {
  return fetch(CsvUrlConfig.ProgrameRegionidCities)
    .then(res => res.text())
    .then(txt => parseRawCsv(txt, ',')?.rows)
    .then(rows => rows.map(row => ({ ...row, cities: row.cities?.split('|') })))
    .catch((err) => { console.error(err); return []; })
}

export function loadIndexPageCityProgrames () {
  return fetch(CsvUrlConfig.IndexPageCityProgrames)
    .then(res => res.text())
    .then(text => {
      const { rows } = parseRawCsv(text, ',') ?? {};
      const ret = {};
      if (Array.isArray(rows)) {
        for (const row of rows) {
          let city = row.city;
          row.price = [fmoney(row.availablePropertiesMinPrice)+'€', fmoney(row.availablePropertiesMaxPrice)+'€'].join(' - ');
          if (city in ret) ret[city].push(row);
          else {
            const items = [row];
            ret[city] = items;
          }
        }
      }
      return Object.entries(ret).map(([city, items]) => ({ city, items }));
    })
    .catch(err => {
      console.error(err);
      return [];
    });
}
