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
