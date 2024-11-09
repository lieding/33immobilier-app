/**
 * @param {string} text
 * @param {string} delimiter
*/
export function parseRawCsv (text, delimiter) {
  if (typeof text === 'string') {
    const [headerRow, ...rows] = text.split('\n').filter(Boolean);
    const ret = [];
    const header = headerRow.split(delimiter);
    for (const rowTxt of rows) {
      const split = rowTxt.split(delimiter);
      const obj = {};
      for (let i = 0; i < split.length;i++) {
        const val = split[i];
        obj[header[i]] = isNaN(val) ? val : Number(val);
      }
      ret.push(obj);
    }
    return { header, rows: ret }
  }
  return null;
}

export function parseLatestCitiesCsv (text, delimiter) {
  if (typeof text === 'string') {
    const [headerRow, ...rows] = text.split('\n').filter(Boolean);
    const header = headerRow.split(delimiter);
    const ret = {};
    let tmp = [], curKey = '';
    for (const rowTxt of rows) {
      if (rowTxt.startsWith('#')) {
        if (curKey) ret[curKey] = tmp;
        tmp = [];
        curKey = rowTxt.substring(1);
      } else {
        const split = rowTxt.split(delimiter);
        const obj = {};
        for (let i = 0; i < split.length;i++) {
          const val = split[i];
          obj[header[i]] = isNaN(val) ? val : Number(val);
        }
        tmp.push(obj);
      }
    }
    ret[curKey] = tmp;
    return { ...ret, header };
  }
  return null;
}
