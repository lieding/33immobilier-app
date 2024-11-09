<template>
  <div class="calculator">
    <!-- <headers :class="{colors:flag}"></headers> -->
    <div>
      <div class="loans">
        <div class="loansTop">{{ $t("message.global.calculation") }}</div>
        <div class="calculate">
          <div class="counter">
            <p>{{ $t("message.global.onnetincome") }}</p>
            <!-- monthlyRevenu -->
            <el-input
              class="inputs"
              type="number"
              v-model.number="capabilityForm.monthlyRevenu"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">€</i>
            </el-input>
            <p>{{ $t("message.global.payment") }}</p>
            <el-input
              class="inputs"
              type="number"
              v-model.number="capabilityForm.downPay"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">€</i>
            </el-input>
            <p>
              {{ $t("message.global.liability") }}
              {{ $t("message.global.Canfill") }}
            </p>
            <el-input
              @input="capabilityFormRateInutHandler"
              class="inputs"
              type="number"
              v-model.number="capabilityForm.debtRatio"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">%</i>
            </el-input>
            <div class="buttonInput" @click="doCalculate">
              {{ $t("message.global.calculate") }}
            </div>
          </div>
          <div class="rightSs" v-if="reckenList.length">
            <span style="font-size:20px;color:#000;font-weight:600;">{{
              $t("message.global.highest")
            }}</span>
            <span style="font-size:20px;color:#FF5E5E;">{{ monthlyHighestRepayAmt }}€</span>
            <div class="botS">
              <p>{{ $t("message.global.Youcanloan") }}</p>
              <div class="tabs">
                <table>
                  <tr>
                    <th>{{ $t("message.global.loanPeriod") }}</th>
                    <th>{{ $t("message.global.annual") }}</th>
                    <th>{{ $t("message.global.capacity") }}</th>
                  </tr>
                </table>
                <table v-for="(item, index) in reckenList" :key="index">
                  <tr>
                    <td>{{ item.year }} {{ $t("message.global.ans") }}</td>
                    <td>{{ item.retes }} %</td>
                    <td>{{ fmoney(item.money, 0) }}€</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="downSm" @click="routerGo">
          {{ $t("message.global.minimum") }}
        </div>
        <div class="loansTop">{{ $t("message.global.loancalculate") }}</div>
        <div class="calculate">
          <div class="counter couters" style="height:418px;">
            <p>{{ $t("message.global.Housing") }}</p>
            <el-input
              class="inputs1"
              type="number"
              v-model.number="repaymentForm.loan"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">€</i>
            </el-input>
            <p>{{ $t("message.global.payment") }}</p>
            <el-input
              class="inputs"
              type="number"
              v-model.number="repaymentForm.downPay"
              @input="repayFormDownPayInutHandler"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">€</i>
            </el-input>
            <p>{{ $t("message.global.particular") }}</p>
            <el-select
              v-model="repaymentForm.year"
              style="width:305px;"
              @change="repayFormYearChangeHandler"
            >
              <el-option
                v-for="item in prsLis"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <p>{{ $t("message.global.loaninterest") }}</p>
            <el-input
              class="inputs"
              type="number"
              v-model.number="repaymentForm.rate"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">%</i>
            </el-input>
            <div class="buttonInput" @click="calculateLoanRepayment">
              {{ $t("message.global.calculate") }}
            </div>
          </div>
          <div class="rightSs" v-if="loanRepaymentCalRes">
            <span style="font-size:20px;color:#000;font-weight:600;">{{ $t("message.global.repaymen") }}:</span>
            <span style="font-size:20px;color:#FF5E5E;">{{ fmoney(repayment, 2) }}€</span>
            <div id="calculator-loan-repayment-chart" style="width: 331px;height:252px;"></div>
            <div>
              <p style="padding-left:20px;">
                <span
                  style="width:16px;height:16px;display:inline-block;background-color:#7ECF34;border-radius:8px;vertical-align: middle;"
                ></span>
                {{ $t("message.global.payment") }} :
                <span style="color:#FF5E5E">{{ fmoney(loanRepaymentCalRes.A, 0) }} €</span>
              </p>
              <p style="margin-top:10px;padding-left:20px;">
                <span
                  style="width:16px;height:16px;display:inline-block;background-color:#1B9AFB;border-radius:8px;vertical-align: middle;"
                ></span>
                {{ $t("message.global.Interestamount") }} :
                <span style="color:#FF5E5E">{{ fmoney(loanRepaymentCalRes.L, 0) }} €</span>
              </p>
              <p style="margin-top:10px;padding-left:20px;">
                <span
                  style="width:16px;height:16px;display:inline-block;background-color:#F4A436;border-radius:8px;vertical-align: middle;"
                ></span>
                {{ $t("message.global.loans") }} :
                <span style="color:#FF5E5E">{{ fmoney(loanRepaymentCalRes.S, 0) }} €</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headers from "~/components/pcIndex/header.vue";
import foots from "~/components/pcIndex/foot.vue";
import { fmoney } from '../../utils';

const Rate = process.env['33IMMO_PROMOTE_RATE'];
const SevenRate = process.env['33IMMO_PROMOTE_SEVEN_RATE'];
const TenRate = process.env['33IMMO_PROMOTE_TEN_RATE'];
const FiftenRate = process.env['33IMMO_PROMOTE_FIFTEN_RATE'];
const TwentyRate = process.env['33IMMO_PROMOTE_TWENTY_RATE'];
const TwentyfiveRate = process.env['33IMMO_PROMOTE_TWENTYFIVE_RATE'];

export default {
  name: "calculator",
  components: {
    headers,
    foots
  },
  data() {
    return {
      reckenList: "",
      loanRepaymentCalRes: null,
      flag: true,
      inputs: "",
      inputs1: "",
      monthlyHighestRepayAmt: "",
      repayment: "",
      capabilityForm: { // About loan capability
        monthlyRevenu: 3000,
        debtRatio: 30,
        downPay: 0
      },
      repaymentForm: {
        loan: 300000,
        downPay: 0, // the amout of first time payment
        year: 25,
        rate: 0
      },
      prsLis: [],
      prsList: []
    };
  },
  mounted() {
    if (process.client) this.loadRate();
  },
  created () {
    this.fmoney = fmoney;
  },
  methods: {
    routerGo() {
      this.$router.push({
        path: "/concentUs"
      });
    },
    repayFormDownPayInutHandler() {
      if (this.repaymentForm.downPay > this.repaymentForm.loan) {
        this.repaymentForm.downPay = this.listrepaymentFormS.loan;
      }
    },
    capabilityFormRateInutHandler() {
      if (this.capabilityForm.debtRatio > 40) {
        this.capabilityForm.debtRatio = 40;
      }
    },
    repayFormYearChangeHandler() {
      this.repaymentForm.rate = this.prsList[this.repaymentForm.year];
    },
    doCalculate() {
      let { monthlyRevenu, debtRatio, downPay } = this.capabilityForm;
      monthlyRevenu = Number(monthlyRevenu), debtRatio = Number(debtRatio), downPay = Number(downPay);
      if (!monthlyRevenu || !downPay) return;
      const [ _, ...rates ] = this.prsList;
      const { reckenList, M } = loanInterface(monthlyRevenu, debtRatio, downPay, ...rates);
      this.reckenList = reckenList;
      this.monthlyHighestRepayAmt = M;
    },
    loadRate() {
      this.prsList = [Rate, SevenRate, TenRate, FiftenRate, TwentyRate, TwentyfiveRate].map(it => Number(it) ?? 0);
      this.repaymentForm.rate = this.prsList[this.repaymentForm.year];
    },
    calculateLoanRepayment() {
      let { loan, downPay, year, rate } = this.repaymentForm;
      loan = Number(loan), downPay = Number(downPay), year = Number(year), rate = Number(rate);
      if (!loan || !downPay || !rate) return;
      const loanRepaymentcalRes = creditInterface(loan, downPay, year, rate);
      this.loanRepaymentCalRes = loanRepaymentcalRes;
      this.repayment = loanRepaymentcalRes.M;
      setTimeout(() => drawRepaymentPieChart(this), 1000);
    }
  }
};

function drawRepaymentPieChart (compInst) {
  const { S, L, A, } = compInst.loanRepaymentCalRes;
  const dataPoints = [
    { y: Number(L), indexLabel: compInst.$t('message.global.Interestamount'), color: '#1B9AFB' },
    { y: Number(S), indexLabel: compInst.$t('message.global.loans'), color: '#F4A436' },
    { y: Number(A), indexLabel: compInst.$t('message.global.payment'), color: '#7ECF34' },
  ];
  const chart = new CanvasJS.Chart("calculator-loan-repayment-chart", {
		// title:{ text: "Gaming Consoles Sold in 2012" },
		data: [
      {
        type: "pie",
        // showInLegend: true,
        legendText: "{indexLabel}",
        dataPoints
      }
		]
	});
	chart.render();
}

/**
 * 贷款能力计算器
*/
function loanInterface(monthlyRevenu, rate, downPay, sevenRate, tenRate, fifteenRate, twentyRate, twentyFiveRate) {
  const resultMap = {};
  const M = topMonthlySupply(monthlyRevenu, rate);

  const sevenMoney = daiMoney(M, downPay, sevenRate, 7);
  const tenMoney = daiMoney(M, downPay, tenRate, 10);
  const fifteenMoney = daiMoney(M, downPay, fifteenRate, 15);
  const twentyMoney = daiMoney(M, downPay, twentyRate, 20);
  const twentyFiveMoney = daiMoney(M, downPay, twentyFiveRate, 25);

  resultMap.M = M; // 月最高还款金额
  const reckenList = [];
  let map = {};
  map.year = 7;
  map.retes = sevenRate;
  map.money = sevenMoney;
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
</script>

<style lang="scss" scoped>
.colors {
  color: #000 !important;
}
.headline {
  padding-top: 10px;
  color: #000;
  font-size: 16px;
  span {
    cursor: pointer;
  }
}
.loans {
  overflow: hidden;
  .loansTop {
    font-size: 32px;
    color: #000;
    font-weight: 700;
    padding-top: 18px;
  }
  .calculate {
    overflow: hidden;
    padding: 12px;
    box-sizing: border-box;
    .counter {
      width: 331px;
      float: left;
      height: 316px;
      box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.13);
      box-sizing: border-box;
      padding: 15px;
      p {
        margin: 10px 0;
        font-size: 14px;
        color: #2a2a2a;
      }
      .buttonInput {
        background-color: #234dd4;
        width: 110px;
        height: 40px;
        border-radius: 6px;
        float: right;
        color: #fff;
        font-size: 20px;
        line-height: 40px;
        text-align: center;
        margin: 20px;
        cursor: pointer;
      }
    }
    .rightSs {
      float: left;
      margin-left: 49px;
      .botS {
        margin-top: 14px;
        background-color: #f9f9f9;
        height: 197px;
        width: 331px;
        padding: 3px 8px;
        .tabs {
          table {
            width: 100%;
          }
          th {
            width: 33.3%;
            height: 17px;
            font-size: 12px;
            font-weight: 500;
            color: rgba(41, 41, 41, 1);
            line-height: 17px;
          }
          td {
            text-align: center;
            height: 20px;
            font-size: 14px;
            color: rgba(134, 134, 134, 1);
            line-height: 20px;
            width: 33.3%;
          }
          th,
          td {
            border: none !important;
          }
        }
      }
    }
  }
  .downSm {
    height: 57px;
    background-color: #839ff8;
    width: 750px;
    border-radius: 24px;
    font-size: 24px;
    color: #fff;
    line-height: 57px;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.calculator {
  .el-input__icon {
    color: #000;
  }
}
</style>
