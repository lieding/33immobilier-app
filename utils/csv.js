function toMax (idx) {
  return idx < 0 ? 10000000: idx;
}

function split (txt, delimiter) {
  const SPLIT1 = ',"';
  const SPLIT2 = '",';
  if (txt.includes(SPLIT1)) {
    const ret = [];
    let remaining = txt;
    let idx = remaining.indexOf(delimiter), quoteIdx = toMax(remaining.indexOf(SPLIT1));
    while (idx >= 0) {
      if (idx < quoteIdx) {
        ret.push(remaining.substring(0, idx));
        remaining = remaining.substring(idx + 1);
        quoteIdx = toMax(remaining.indexOf(SPLIT1));
      } else {
        ret.push(remaining.substring(0, idx));
        remaining = remaining.substring(idx + 1);
        quoteIdx = toMax(remaining.indexOf(SPLIT2, quoteIdx + 2));
        ret.push(remaining.substring(1, quoteIdx));
        remaining = remaining.substring(quoteIdx + 2);
      }
      idx = remaining.indexOf(delimiter);
    }
    ret.push(remaining);
    return ret;
  } else
  return txt.split(delimiter);
}


/**
 * @param {string} text
 * @param {string} delimiter
*/
export function parseRawCsv (text, delimiter) {
  if (typeof text === 'string') {
    text = text.replaceAll('\r', '').replaceAll('""', '"');
    const [headerRow, ...rows] = text.split('\n').filter(Boolean);
    const ret = [];
    const header = headerRow.split(delimiter);
    for (const rowTxt of rows) {
      const splited = split(rowTxt, delimiter);
      const obj = {};
      for (let i = 0; i < splited.length;i++) {
        const val = splited[i];
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
    text = text.replaceAll('\r', '').replaceAll('""', '"');
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
        const splited = split(rowTxt, delimiter);
        const obj = {};
        for (let i = 0; i < splited.length;i++) {
          const val = splited[i];
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
