
const Rate = process.env['IMMO_PROMOTE_RATE'];
const FiveRate = process.env['IMMO_PROMOTE_FIVE_RATE'];
const TenRate = process.env['IMMO_PROMOTE_TEN_RATE'];
const FiftenRate = process.env['IMMO_PROMOTE_FIFTEN_RATE'];
const TwentyRate = process.env['IMMO_PROMOTE_TWENTY_RATE'];
const TwentyfiveRate = process.env['IMMO_PROMOTE_TWENTYFIVE_RATE'];

export function loadRate () {
  const list = [Rate, FiveRate, TenRate, FiftenRate, TwentyRate, TwentyfiveRate].map(it => Number(it) ?? 0);
  console.log(list)
  return list;
}

export function loadRateConfig () {
  return {
    5: Number(FiveRate),
    10: Number(TenRate),
    15: Number(FiftenRate),
    20: Number(TwentyRate),
    25: Number(TwentyRate),
  }
}

/**
 * 贷款能力计算器
*/
export function loanInterface(monthlyRevenu, rate, downPay, fiveRate, tenRate, fifteenRate, twentyRate, twentyFiveRate) {
  const resultMap = {};
  const M = topMonthlySupply(monthlyRevenu, rate);

  const fiveMoney = daiMoney(M, downPay, fiveRate, 5);
  const tenMoney = daiMoney(M, downPay, tenRate, 10);
  const fifteenMoney = daiMoney(M, downPay, fifteenRate, 15);
  const twentyMoney = daiMoney(M, downPay, twentyRate, 20);
  const twentyFiveMoney = daiMoney(M, downPay, twentyFiveRate, 25);

  resultMap.M = M; // 月最高还款金额
  const reckenList = [];
  let map = {};
  map.year = 5;
  map.retes = fiveRate;
  map.money = fiveMoney;
  reckenList.push(map);

  map = {};
  map.year = 10;
  map.retes = tenRate;
  map.money = tenMoney;
  reckenList.push(map);

  map = {};
  map.year = 15;
  map.retes = fifteenRate;
  map.money = fifteenMoney;
  reckenList.push(map);

  map = {};
  map.year = 20;
  map.retes = twentyRate;
  map.money = twentyMoney;
  reckenList.push(map);

  map = {};
  map.year = 25;
  map.retes = twentyFiveRate;
  map.money = twentyFiveMoney;
  reckenList.push(map);

  resultMap.reckenList = reckenList;
  return resultMap;
}

/**
 * 贷款金额计算
*/
function daiMoney(M, downPay, rate, year) {
  rate = MyMath.div(rate, 100, 6);
  const A = downPay;

  /* A + M *(1- 1/(1+i/12)|12*t (次方)| ) * 12 / i */

  // 1- 1/(1+i/12)|12*t (次方)|

  // i/12
  const start1 = MyMath.div(rate, 12, 6);
  // (1+i/12)
  const start2 = MyMath.add(1, start1, 6);
  // 12*t (次方)
  const cifang = MyMath.mul(12, year, 6);
  // (1+i/12)|12*t (次方)|
  const start3 = Math.pow(start2, cifang);
  // 1/(1+i/12)|12*t
  const start4 = MyMath.div(1, start3, 6);
  // (1- 1/(1+i/12)|12*t (次方)| )
  const start5 = MyMath.sub(1, start4, 6);

  // M *(1- 1/(1+i/12)|12*t (次方)| ) * 12
  const start6 = MyMath.mul(M, start5, 6);
  const start7 = MyMath.mul(start6, 12, 6);
  // M *(1- 1/(1+i/12)|12*t (次方)| ) * 12 / i
  const start8 = MyMath.div(start7, rate, 6);
  const minMoney = MyMath.add(A, start8, 2);
  return Math.floor(minMoney);
}

/**
 * 最高月供计算
*/
function topMonthlySupply(monthlyRevenu, rate) {
  const R = monthlyRevenu;
  const T = rate;
  const start1 = MyMath.mul(R, T, 6);
  const M = MyMath.div(start1, 100, 2);
  return M;
}


/**
 * 还贷计算
*/
export function creditInterface(loan, downPay, year, rate) {
  const resultMap = {};

  const S = creditS(loan, downPay);
  const A = creditA(loan, downPay);
  const M = creditM(loan, downPay, year, rate);
  const L = creditL(M, S, year);
  // 贷款实际金额（蓝色）------S
  resultMap.S = S.toString();
  // 贷款利息(蓝色)-----L
  resultMap.L = L.toString();
  // 首付（绿色）-----A
  resultMap.A = A.toString();
  // 每月还款金额（）------M
  resultMap.M = M;

  return resultMap;
}

/**
 * 信用贷款计算
*/
function creditM(loan, downPay, year, rate) {
  let C = loan;
  let A = downPay;
  let d = year;
  let i = MyMath.div(rate, 100, 6);

  /* (C-A)*i/12 */
  let start1 = MyMath.sub(C, A, 6);
  let start2 = MyMath.mul(start1, i, 6);
  let start3 = MyMath.div(start2, 12, 6);

  /* 1-(1/((1+i/12) |d*12 次方|)) */

  let end1 = MyMath.div(i, 12, 6);
  let end2 = MyMath.add(1, end1, 6);

  /* 计算 d*12 */
  let cifang = Math.round(MyMath.mul(d, 12, 6));
  let zhi = Math.pow(end2, cifang);
  let end3 = Math.round(zhi);

  let end4 = MyMath.div(1, end3, 6);
  let end5 = MyMath.sub(1, end4, 6);

  const M = MyMath.div(start3, end5, 2);
  return M;
}

/**
 * 贷款利息计算
*/
function creditL(M, S, year) {
  const L1 = MyMath.mul(M, year, 6);
  const L2 = MyMath.mul(L1, 12, 6);
  const L3 = MyMath.sub(L2, S, 6);
  return L3;
}

/**
 * 贷款实际金额计算
*/
function creditS(loan, downPay) {
  let A = 0.00;
  A = downPay;
  const S = MyMath.sub(loan, A, 2);
  return S;
}

/**
 * 首付计算
*/
function creditA(loan, downPay) {
  return downPay;
}

const MyMath = {
  div (n1, n2, len) {
    return n1 / n2;
  },
  sub (n1, n2, len) {
    return n1 - n2;
  },
  mul (n1, n2, len) {
    return n1 * n2;
  },
  add (n1, n2, len) {
    return n1 + n2;
  }
}
