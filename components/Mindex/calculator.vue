<template>
  <div>
    <!-- 贷款能力计算 -->
    <div class="section">
      <div class="section-title full-w text-center">{{ $t("message.global.LOAN_CAPABILITY_CALCULATION") }}</div>
      <div class="repay">
        <p class="field-label">{{ $t("message.global.onnetincome") }}</p>
        <van-cell-group>
          <van-field
            v-model.number="capabilityForm.monthlyRevenu"
            label="€"
            label-width=".15rem"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            type="number"
          />
        </van-cell-group>
        <p class="field-label">{{ $t("message.global.payment") }}</p>
        <van-cell-group>
          <van-field
            v-model.number="capabilityForm.downPay"
            label="€"
            label-width=".15rem"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            type="number"
          />
        </van-cell-group>
        <p class="field-label">
          {{ $t("message.global.DEBT_RATIO") }}
          {{ $t("message.global.DEBT_BURDEN") }}
        </p>
        <van-cell-group>
          <van-field
            v-model.number="capabilityForm.debtRatio"
            label="%"
            label-width=".15rem"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            type="number"
          />
        </van-cell-group>
      </div>
      <div class="btn flex">
        <van-button type="info" size="small" class="btn-i" @click="doCalculate">{{$t("message.global.calculate")}}</van-button>
      </div>
      <p class="monthly" v-if="monthlyCapableRepayment">
        {{ $t("message.global.MAXIMUM_MONTHLY_REPAYMENT_AMOUNT") }}
        <span class="money">{{ monthlyCapableRepayment }}€</span>
      </p>
      <div class="capability-result" v-if="monthlyCapableRepayment">
        <p class="capability-result-p">{{ $t("message.global.LOAN_AMOUNT_CALCULATION") }}</p>
        <table>
          <tr>
            <th>{{ $t("message.global.LOAN_PERIOD") }}</th>
            <th>{{ $t("message.global.ANNUAL_INTEREST_RATE") }}</th>
            <th>{{ $t("message.global.capacity") }}</th>
          </tr>
        </table>
        <table v-for="(item, index) in reckenList" :key="index">
          <tr>
            <td>{{ item.year }} {{ $t("message.global.ans") }}</td>
            <td>{{ item.retes }}%</td>
            <td>{{ item.money }}€</td>
          </tr>
        </table>
      </div>
    </div>
    <hr class="hr" />
    <!-- 还贷计算 -->
    <div class="section">
      <div class="section-title full-w text-center">{{ $t("message.global.loancalculate") }}</div>
      <div class="repay">
        <p class="field-label">{{ $t("message.global.Housing") }}</p>
        <van-cell-group>
          <van-field
            v-model.number="repaymentForm.loan"
            label="€"
            label-width=".15rem"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            type="number"
          />
        </van-cell-group>
        <p class="field-label">{{ $t("message.global.payment") }}</p>
        <van-cell-group>
          <van-field
            v-model.number="repaymentForm.downpay"
            @input="repayDownpayInputHandler"
            label="€"
            label-width=".15rem"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            type="number"
          />
        </van-cell-group>
        <p class="field-label">{{ $t("message.global.particular") }}</p>
        <el-select v-model.number="repaymentForm.year">
          <el-option v-for="item in interestRateConfig" :key="item.year" :label="item.year" :value="item.year"></el-option>
        </el-select>
        <p class="field-label">{{ $t("message.global.LOAN_INTEREST_RATE") }}</p>
        <van-cell-group>
          <van-field
            :readonly="true"
            v-model.number="repaymentForm.interesrate"
            label="%"
            label-width=".2rem"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            type="number"
          />
        </van-cell-group>
      </div>
      <div class="btn flex">
        <van-button type="info" size="small" class="btn-i" @click="calculateLoanRepayment">{{$t("message.global.calculate")}}</van-button>
      </div>
      <p class="monthly" v-if="M">
        {{ $t("message.global.MAXIMUM_MONTHLY_REPAYMENT_AMOUNT") }}
        <span class="money">{{ M }}€</span>
      </p>
      <div v-if="M" class="repay-result">
        <div class="chart-wrapper" id="calculator-loan-repayment-chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadRate, creditInterface, loanInterface, loadRateConfig } from '../../utils/calculator';

export default {
  data () {
    return {
      interestRateConfig: [],
      reckenList: [],
      capabilityForm: { // About loan capability
        monthlyRevenu: 3000,
        debtRatio: 30,
        downPay: 0
      },
      repaymentForm: {
        loan: 300000, //房屋金额
        downpay: 0, //首付金额
        year: 25, //贷款年限
        interesrate: 0, //贷款利率
      },
      monthlyCapableRepayment: 0, //月还款能力
      A: '',
      L: '',
      S: '',
      M: 0, //还贷计算月还款金额
    }
  },
  created () {
    if (process.client) {
      this.loadRate();
    }
  },
  watch: {
    'repaymentForm.year': {
      handler (val) {
        this.repaymentForm.interesrate = this.interestRateConfig.find(it => it.year == val)?.rate ?? 0;
      }
    }
  },
  methods: {
    loadRate() {
      this.interestRateList = loadRate();
      this.interestRateConfig = Object.entries(loadRateConfig()).map(([year, rate]) => ({ year, rate }));
      const lastItem = this.interestRateConfig[this.interestRateConfig.length - 1];
      this.repaymentForm.year = lastItem.year;
      this.repaymentForm.interesrate = lastItem.rate;
    },
    repayDownpayInputHandler() {
      if (this.repaymentForm.downpay > this.repaymentForm.loan) {
        this.repaymentForm.downpay = this.repaymentForm.loan;
      }
    },
    doCalculate() {
      let { monthlyRevenu, debtRatio, downPay } = this.capabilityForm;
      monthlyRevenu = Number(monthlyRevenu), debtRatio = Number(debtRatio), downPay = Number(downPay);
      if (!monthlyRevenu || !downPay) return;
      const [ _, ...rates ] = this.interestRateList;
      const { reckenList, M } = loanInterface(monthlyRevenu, debtRatio, downPay, ...rates);
      this.reckenList = reckenList;
      this.monthlyCapableRepayment = M;
    },
    calculateLoanRepayment() {
      let { loan, downpay, year, interesrate } = this.repaymentForm;
      loan = Number(loan), downpay = Number(downpay), year = Number(year), interesrate = Number(interesrate);
      if (!loan || !downpay || !interesrate) return;
      const loanRepaymentcalRes = creditInterface(loan, downpay, year, interesrate);
      Object.assign(this, loanRepaymentcalRes);
      setTimeout(() => drawRepaymentPieChart(this), 1000);
    }
  },
}

function drawRepaymentPieChart (compInst) {
  const { S, L, A, } = compInst;
  const dataPoints = [
    { y: Number(L), indexLabel: compInst.$t('message.global.INTEREST_AMOUNT'), color: '#1B9AFB' },
    { y: Number(S), indexLabel: compInst.$t('message.global.loans'), color: '#F4A436' },
    { y: Number(A), indexLabel: compInst.$t('message.global.payment'), color: '#7ECF34' },
  ];
  const chart = new CanvasJS.Chart("calculator-loan-repayment-chart", {
		data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{indexLabel}",
        dataPoints
      }
		]
	});
	chart.render();
}
</script>

<style lang="scss" scoped>
.hr {
  border: none;
  height: 1px;
  margin: 0.12rem 0;
  background-color: #ececec;
}
.section {
  margin: 0 0.12rem;
}
.repay {
  .field-label {
    height: 0.18rem;
    font-size: 0.13rem;
    color: rgba(42, 42, 42, 1);
    line-height: 0.18rem;
    padding: 0.12rem 0 0.09rem 0;
  }
  .van-cell-group {
    background: rgba(233, 233, 233, 1);
  }
  .van-cell {
    background: none;
    padding: .06rem .1rem;
  }
  .van-field__control {
    height: 0.2rem;
    font-size: 0.13rem;
    color: rgba(42, 42, 42, 1);
    line-height: 0.18rem;
  }
  .van-ellipsis {
    position: absolute;
    right: 2.5rem;
    top: -0.1rem;
    height: 0.18rem;
    font-size: 0.13rem;
    color: rgba(42, 42, 42, 1);
    line-height: 0.18rem;
  }
  .van-dropdown-menu {
    background: rgba(233, 233, 233, 1);
  }
  .van-dropdown-menu__title {
    left: 1.4rem;
  }
}
.section-title {
  font-size: 0.16rem;
  color: rgba(0, 0, 0, 0.76);
  margin-right: 0.1rem;
}
.btn {
  margin: 0.1rem 0;
  justify-content: flex-end;
  .btn-i {
    width: 1.1rem;
    background: var(--main-blue);
    border-radius: 0.06rem;
  }
}
.capability-result {
  background: rgba(249, 249, 249, 1);
  .capability-result-p {
    height: 0.25rem;
    font-size: 0.18rem;
    font-weight: 500;
    color: rgba(41, 41, 41, 1);
    line-height: 0.25rem;
    padding: 0.03rem 0 0.09rem 0.08rem;
  }
  table {
    width: 100%;
  }
  th {
    width: 33.3%;
    height: 0.17rem;
    font-size: 0.12rem;
    font-weight: 500;
    color: rgba(41, 41, 41, 1);
    line-height: 0.17rem;
  }
  td {
    text-align: center;
    height: 0.2rem;
    font-size: 0.14rem;
    color: rgba(134, 134, 134, 1);
    line-height: 0.2rem;
    width: 33.3%;
  }
}
.monthly {
  padding: 0.19rem 0.2rem 0.15rem 0.11rem;
  font-size: 0.17rem;
  color: rgba(0, 0, 0, 1);
  line-height: 0.24rem;
}
.repay-result {
  position: relative;
  .chart-wrapper {
    height: 1.55rem;
    background: rgba(249, 249, 249, 1);
  }
}
</style>
<style lang="scss">
.repay {
  .el-select:hover .el-input__inner {
    background: #e9e9e9;
    border: none;
  }
  .el-input__inner {
    background: #e9e9e9;
  }
  .el-input {
    position: relative;
    font-size: 14px;
    background: #e9e9e9;
    border: none;
    width: 3.5rem !important;
  }
}
</style>
