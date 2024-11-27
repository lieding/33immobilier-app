<template>
  <div class="calculator LOAN_AMOUNT">
    <div class="title bold">{{ $t("message.global.LOAN_CAPABILITY_CALCULATION") }}</div>
    <div class="calculate">
      <div class="counter">
        <p>{{ $t("message.global.MONTH_NET_INCOME") }}</p>
        <el-input
          class="inputs"
          type="number"
          v-model.number="capabilityForm.monthlyRevenu"
          placeholder
        >
          <i slot="suffix" class="el-input__icon">€</i>
        </el-input>
        <p>{{ $t("message.global.DOWN_PAYMENT_AMOUNT") }}</p>
        <el-input
          class="inputs"
          type="number"
          v-model.number="capabilityForm.downPay"
          placeholder
        >
          <i slot="suffix" class="el-input__icon">€</i>
        </el-input>
        <p>
          {{ $t("message.global.DEBT_RATIO") }}
          {{ $t("message.global.DEBT_BURDEN") }}
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
        <el-row type="flex" justify="end">
          <div class="calcaulate-btn white" @click="doCalculate">
            {{ $t("message.global.CALCULATE") }}
          </div>
        </el-row>
      </div>
      <div class="right-part" v-if="reckenList.length">
        <span style="font-size:20px;color:#000;font-weight:600;">{{
          $t("message.global.MAXIMUM_MONTHLY_REPAYMENT_AMOUNT")
        }}</span>
        <span style="font-size:20px;color:#FF5E5E;">{{ monthlyHighestRepayAmt }}€</span>
        <div class="botS">
          <p>{{ $t("message.global.LOAN_AMOUNT_CALCULATION") }}</p>
          <div class="tabs">
            <table>
              <tr>
                <th>{{ $t("message.global.LOAN_PERIOD") }}</th>
                <th>{{ $t("message.global.ANNUAL_INTEREST_RATE") }}</th>
                <th>{{ $t("message.global.LOAN_CAPACITY") }}</th>
              </tr>
            </table>
            <table v-for="(item, index) in reckenList" :key="index">
              <tr>
                <td>{{ item.year }} {{ $t("message.global.YEAR") }}</td>
                <td>{{ item.retes }} %</td>
                <td>{{ fmoney(item.money, 0) }}€</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="title bold" style="margin-top: 16px;">{{ $t("message.global.CALCULATE_LOAN_REPAYMENT_AMT") }}</div>
    <div class="calculate">
      <div class="counter couters" style="height:418px;">
        <p>{{ $t("message.global.HOUSING_AMOUNT") }}</p>
        <el-input
          class="inputs1"
          type="number"
          v-model.number="repaymentForm.loan"
          placeholder
        >
          <i slot="suffix" class="el-input__icon">€</i>
        </el-input>
        <p>{{ $t("message.global.DOWN_PAYMENT_AMOUNT") }}</p>
        <el-input
          class="inputs"
          type="number"
          v-model.number="repaymentForm.downPay"
          @input="repayFormDownPayInutHandler"
          placeholder
        >
          <i slot="suffix" class="el-input__icon">€</i>
        </el-input>
        <p>{{ $t("message.global.LOAN_TERM") }}</p>
        <el-select
          v-model="repaymentForm.year"
          style="width:305px;"
          @change="repayFormYearChangeHandler"
        >
          <el-option
            v-for="item in interestRateConfig"
            :key="item.year"
            :label="item.year"
            :value="item.year"
          ></el-option>
        </el-select>
        <p>{{ $t("message.global.LOAN_INTEREST_RATE") }}</p>
        <el-input
          class="inputs"
          type="number"
          v-model.number="repaymentForm.rate"
          placeholder
        >
          <i slot="suffix" class="el-input__icon">%</i>
        </el-input>
        <el-row type="flex" justify="end">
          <div class="calcaulate-btn white" @click="calculateLoanRepayment">
            {{ $t("message.global.CALCULATE") }}
          </div>
        </el-row>
      </div>
      <div class="right-part" v-if="loanRepaymentCalRes">
        <span style="font-size:20px;color:#000;font-weight:600;">{{ $t("message.global.MONTHLY_REPAYMENT_AMOUNT") }}:</span>
        <span style="font-size:20px;color:#FF5E5E;">{{ fmoney(repayment, 2) }}€</span>
        <div id="calculator-loan-repayment-chart" style="width: 331px;height:252px;"></div>
        <div>
          <p style="padding-left:20px;" v-if="repaymentDownpayLabelVis">
            <span
              style="width:16px;height:16px;display:inline-block;background-color:#7ECF34;border-radius:8px;vertical-align: middle;"
            ></span>
            {{ $t("message.global.DOWN_PAYMENT_AMOUNT") }} :
            <span style="color:#FF5E5E">{{ fmoney(loanRepaymentCalRes.A, 0) }} €</span>
          </p>
          <p style="margin-top:10px;padding-left:20px;">
            <span
              style="width:16px;height:16px;display:inline-block;background-color:#1B9AFB;border-radius:8px;vertical-align: middle;"
            ></span>
            {{ $t("message.global.INTEREST_AMOUNT") }} :
            <span style="color:#FF5E5E">{{ fmoney(loanRepaymentCalRes.L, 0) }} €</span>
          </p>
          <p style="margin-top:10px;padding-left:20px;">
            <span
              style="width:16px;height:16px;display:inline-block;background-color:#F4A436;border-radius:8px;vertical-align: middle;"
            ></span>
            {{ $t("message.global.LOAN_AMOUNT") }} :
            <span style="color:#FF5E5E">{{ fmoney(loanRepaymentCalRes.S, 0) }} €</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fmoney } from '../../utils';
import { loadRate, creditInterface, loanInterface, loadRateConfig } from '../../utils/calculator';

export default {
  name: "calculator",
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
      interestRateConfig: [],
      interestRateList: []
    };
  },
  computed: {
    repaymentDownpayLabelVis () {
      return Number(this.loanRepaymentCalRes?.A) > 0;
    }
  },
  mounted() {
    if (process.client) this.loadRate();
  },
  created () {
    this.fmoney = fmoney;
  },
  methods: {
    repayFormDownPayInutHandler() {
      if (this.repaymentForm.downPay > this.repaymentForm.loan) {
        this.repaymentForm.downPay = this.repaymentForm.loan;
      }
    },
    capabilityFormRateInutHandler() {
      if (this.capabilityForm.debtRatio > 40) {
        this.capabilityForm.debtRatio = 40;
      }
    },
    repayFormYearChangeHandler() {
      const year = this.repaymentForm.year;
      this.repaymentForm.rate = this.interestRateConfig.find(it => it.year == year)?.rate ?? 0;
    },
    doCalculate() {
      let { monthlyRevenu, debtRatio, downPay } = this.capabilityForm;
      monthlyRevenu = Number(monthlyRevenu), debtRatio = Number(debtRatio), downPay = Number(downPay) || 0;
      if (!monthlyRevenu) return;
      const [ _, ...rates ] = this.interestRateList;
      const { reckenList, M } = loanInterface(monthlyRevenu, debtRatio, downPay, ...rates);
      this.reckenList = reckenList;
      this.monthlyHighestRepayAmt = M;
    },
    loadRate() {
      this.interestRateList = loadRate();
      this.interestRateConfig = Object.entries(loadRateConfig()).map(([year, rate]) => ({ year, rate }));
      const lastItem = this.interestRateConfig[this.interestRateConfig.length - 1];
      this.repaymentForm.year = lastItem.year;
      this.repaymentForm.rate = lastItem.rate;
    },
    calculateLoanRepayment() {
      let { loan, downPay, year, rate } = this.repaymentForm;
      loan = Number(loan), downPay = Number(downPay) || 0, year = Number(year), rate = Number(rate);
      if (!loan || !rate) return;
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
    { y: Number(L), indexLabel: compInst.$t('message.global.INTEREST_AMOUNT'), color: '#1B9AFB' },
    { y: Number(S), indexLabel: compInst.$t('message.global.LOAN_AMOUNT'), color: '#F4A436' },
  ];
  const downPay = Number(A) || 0;
  if (downPay > 0)
    dataPoints.push({ y: downPay, indexLabel: compInst.$t('message.global.DOWN_PAYMENT_AMOUNT'), color: '#7ECF34' });
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
.LOAN_AMOUNT {
  overflow: hidden;
  .title {
    font-size: 20px;
    margin-bottom: 8px;
  }
  .calculate {
    display: flex;
    padding: 12px;
    .counter {
      width: 331px;
      box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.13);
      padding: 16px;
      p {
        margin: 10px 0;
        font-size: 14px;
      }
      .calcaulate-btn {
        margin: 16px 16px 0 0;
        padding: 6px 16px;
        background-color: var(--main-blue);
        border-radius: 6px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .right-part {
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
  .minimum-lona-btn {
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
