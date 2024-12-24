
export const EquipmentConfig = {
  AIR_CONDITIONER: 'AIR_CONDITIONER',
  // BED: 'BED',
  // CHAIR: 'CHAIR',
  CLOSET: 'CLOSET',
  HEAT: 'HEAT',
  MICROWAVE: 'MICROWAVE',
  REFRIGERATOR: 'REFRIGERATOR',
  TELEVISION: 'TELEVISION',
  WASHER: 'WASHER',
  WIFI: 'WIFI'
}

export function getEquipmentPic (id, grey = false) {
  id = id.toLowerCase().replaceAll('_', '-');
  return `/renting-equipment/${id}${grey ? '-grey' : ''}.png`;
}
