import { LocationType } from './config';

const DefaultLocationAutocompleteTypes = [
  // LocationType.POSTAL_CODE,
  LocationType.LOCALITY,
  LocationType.L2_AREA,
  LocationType.L3_AREA,
];

export function doLocationAutocomplete (service, input) {
  return service.getPlacePredictions({
    input,
    componentRestrictions: { country: ['FRA'], },
    types: DefaultLocationAutocompleteTypes,
  }).then(res => {
    const predictions = res.predictions;
    if (!Array.isArray(predictions)) return cb([]);
    const list = predictions.map(({ structured_formatting, place_id, description, types }) => {
      const { main_text, secondary_text } = structured_formatting;
      const type = DefaultLocationAutocompleteTypes.find(type => types.includes(type));
      return type ? { value: description, place_id, place_text: main_text, type } : null;
    });
    return list.filter(Boolean);
  }).catch(err => {
    console.error(err);
    return [];
  });
}