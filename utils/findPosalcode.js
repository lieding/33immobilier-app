import { parseRawCsv } from './csv';
import { LocationType } from '../common/config';

function getRemote (departmentId) {
  return fetch(`https://raw.githubusercontent.com/mingzemicco/33immo-config/refs/heads/main/department_postcodes/${departmentId}.csv`)
    .then(res => res.text())
    .then(res => parseRawCsv(res, ',')?.rows)
    .then(rows => rows.map(row => ({
      ...row,
      postal_code: row.postal_code?.toString(),
      department_id:row.department_id?.toString()
    })
  ))
    .catch(() => null)
}

const departmentMap = {};

/**
 * Find by postal code
 * @param {string} postalCode
*/
export async function searchPostalCode (postalCode, size = 10) {
  if (postalCode?.length < 2) return null;
  const departmentId = postalCode.substring(0, 2);
  let rows = departmentMap[departmentId];
  if (!rows) {
    rows = await getRemote(departmentId);
    if (rows) departmentMap[departmentId] = rows;
  }
  if (!rows) return null;
  const ret = [];
  for (const it of rows) {
    const valid = it.postal_code?.startsWith(postalCode);
    if (valid) ret.push({ ...it, value: `${it.postal_code} ${it.locality}`, place_text: it.locality, type: LocationType.POSTAL_CODE });
    if (ret.length > size) return ret;
  }
  return ret;
}

