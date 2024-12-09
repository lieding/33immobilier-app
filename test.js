function creditInterface(loan, downPay, year, rate) {
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
  const C = loan;
  const A = downPay;
  const d = year;
  const i = MyMath.div(rate, 100, 6);

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

// console.log(loanInterface(4000, 50, 0, 5, 6, 7, 8, 9))
console.log(creditInterface(300000, 0, 20, 3.5))
