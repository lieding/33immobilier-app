<template>
  <div>
    <client-only>
      <Header :title="$t('message.global.instrument')" />
      <div class="offer">
        <P :class="isbtn ? 'P_btn' : 'P_onbtn'" @click="Onclick">
          {{ $t("message.global.LOAN_CAPABILITY_CALCULATION") }}
        </P>
        <p :class="isbtn ? 'P_onbtn' : 'P_btn'" @click="Onclick">
          {{ $t("message.global.Calculator") }}
        </p>
      </div>
      <!-- 贷款能力计算器 -->
      <div class="estates" v-if="isbtn">
        <span class="consultants">{{ $t("message.global.LOAN_CAPABILITY_CALCULATION") }}</span>
        <div class="repay">
          <p class="repay_p">{{ $t("message.global.onnetincome") }}</p>
          <van-cell-group>
            <van-field
              v-model="revenus"
              label="€"
              label-width=".15rem"
              :placeholder="$t('message.global.PLEASE_ENTER')"
              type="Number"
            />
          </van-cell-group>
          <p class="repay_p">{{ $t("message.global.payment") }}</p>
          <van-cell-group>
            <van-field
              v-model="apport"
              label="€"
              label-width=".15rem"
              :placeholder="$t('message.global.PLEASE_ENTER')"
              type="Number"
            />
          </van-cell-group>
          <p class="repay_p">
            {{ $t("message.global.DEBT_RATIO")
            }}{{ $t("message.global.DEBT_BURDEN") }}
          </p>
          <van-cell-group>
            <van-field
              v-model="rate"
              label="%"
              label-width=".2rem"
              :placeholder="$t('message.global.PLEASE_ENTER')"
              type="Number"
            />
          </van-cell-group>
        </div>
        <div class="btn">
          <van-button type="info" class="btn_i" @click="oncapacity">
            {{ $t("message.global.calculate") }}
          </van-button>
        </div>
        <p class="monthly" v-if="M">
          {{ $t("message.global.MAXIMUM_MONTHLY_REPAYMENT_AMOUNT") }}
          <span class="money">{{ M }}€</span>
        </p>
        <div class="loans" v-if="M">
          <p class="loans_p">{{ $t("message.global.LOAN_AMOUNT_CALCULATION") }}</p>
          <table>
            <tr>
              <th>{{ $t("message.global.LOAN_PERIOD") }}</th>
              <th>{{ $t("message.global.ANNUAL_INTEREST_RATE") }}</th>
              <th>{{ $t("message.global.amount") }}</th>
            </tr>
          </table>

          <table v-for="(item, index) in reckenList" :key="index">
            <tr>
              <td>{{ item.year }} {{ $t("message.global.ans") }}</td>
              <td>{{ item.retes }}%</td>
              <td>{{ item.money }} €</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 还款计算器 -->
      <div class="estates" v-else>
        <span class="consultants">{{
          $t("message.global.loancalculate")
        }}</span>
        <div class="repay">
          <p class="repay_p">{{ $t("message.global.Housing") }}</p>
          <van-cell-group>
            <van-field
              v-model="loan"
              label="€"
              label-width=".15rem"
              :placeholder="$t('message.global.PLEASE_ENTER')"
              type="Number"
            />
          </van-cell-group>
          <p class="repay_p">{{ $t("message.global.payment") }}</p>
          <van-cell-group>
            <van-field
              v-model="downapport"
              @input="Oninput"
              label="€"
              label-width=".15rem"
              :placeholder="$t('message.global.PLEASE_ENTER')"
              type="Number"
            />
          </van-cell-group>
          <p class="repay_p">{{ $t("message.global.LOAN_INTEREST_RATE") }}</p>
          <van-cell-group>
            <van-field
              label="%"
              label-width=".2rem"
              v-model="interesrate"
              :placeholder="$t('message.global.PLEASE_ENTER')"
              type="Number"
            />
          </van-cell-group>
          <p class="repay_p">{{ $t("message.global.particular") }}</p>
          <!-- <van-cell-group>
                <van-field v-model="year"  :placeholder='$t("message.global.PLEASE_ENTER")' type="Number"/>
          </van-cell-group>-->
          <el-select v-model="year">
            <el-option
              v-for="item in getRate"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <van-button type="info" class="btn_i" @click="onrepay">
            {{ $t("message.global.calculate") }}
          </van-button>
        </div>
        <p class="monthly" v-if="mothey">
          {{ $t("message.global.MAXIMUM_MONTHLY_REPAYMENT_AMOUNT") }}
          <span class="money">{{ mothey }}€</span>
        </p>
        <!-- echarts -->
        <div v-if="mothey" class="canvas">
          <div class="echart"></div>
          <div class="echart_p">
            <p>
              <span class="green"></span>
              {{ $t("message.global.payment") }} € {{ A }}
            </p>
            <p>
              <span class="blue"></span>
              {{ $t("message.global.INTEREST_AMOUNT") }} € {{ L }}
            </p>
            <p>
              <span class="orgin"></span>
              {{ $t("message.global.loans") }} € {{ S }}
            </p>
          </div>
        </div>
        <div class="loanse" @click="OnPush">
          {{ $t("message.global.minimum") }}
        </div>
      </div>
      <Footer />
    </client-only>
  </div>
</template>
<script>
import rem from "~/common/rem.js";
import Header from "~/components/Mindex/header.vue";
import Footer from "~/components/Mindex/footer.vue";

export default {
  name: "",
  middleware: "responsive",
  components: {
    Header,
    Footer
  },
  head() {
    return {
      title:
        "法国房贷计算器_法国购房工具_贷款能力_还贷能力_月供计算,33immobilier|33找房-法国第一华人找房平台",
      meta: [
        {
          name: "description",
          content:
            "33找房购房工具频道,为您提供法国在线买房贷款计算器,包括计算贷款额度,贷款能力,还贷计算器,计算月供。了解贷款能力,评估贷款状况,法国申请贷款就上法国33找房全程为您服务"
        },
        {
          name: "keywords",
          content:
            "贷款能力计算器,法国贷款,计算贷款额度,法国贷款能力,法国如何贷款,还贷计算器,月供计算器,了解贷款能力,评估贷款状况,法国申请贷款"
        }
      ]
    };
  },
  data() {
    return {
      isbtn: true,
      rate: "30", //负债率
      apport: "0", //首付金额
      revenus: "3000", //月净收入
      M: "", //月还款金额
      A: "", //首付
      L: "", //贷款利息
      S: "", //贷款手机金额
      mothey: "", //还贷计算月还款金额
      reckenList: [], //可贷款
      loan: "300000", //房屋金额
      downapport: "0", //首付金额
      year: "25", //贷款年限
      interesrate: "", //贷款利率
      getRate: [], //贷款利率
      getRateList: []
    };
  },
  watch: {
    year(val) {
      this.interesrate = this.getRateList[val];
    }
  },
  mounted() {
    rem();
    this.$api.article.getRate().then(res => {
      if (res.data.code == 0) {
        this.getRateList = res.data.data;
        this.getRate = Object.keys(res.data.data);
        //console.log(this.getRate);
        this.interesrate = res.data.data["25"];
      }
    });
  },
  methods: {
    OnPush() {
      this.$router.push("./content");
    },
    Oninput() {
      if (Number(this.downapport) > Number(this.loan)) {
        this.downapport = this.loan;
      }
    },
    Onclick() {
      this.isbtn = !this.isbtn;
      //console.log(this.isbtn);
    },
    oncapacity() {
      //获取月还款金额和可贷款
      let params = {
        revenus: this.revenus,
        rate: this.rate,
        apport: this.apport
      };
      this.$api.article.loanCapability(params).then(res => {
        this.M = res.data.data.M;
        this.reckenList = res.data.data.reckenList;
      });
    },
    onrepay() {
      // 获取还贷计算
      let params = {
        year: this.year,
        rate: this.interesrate,
        apport: this.downapport,
        loan: this.loan
      };
      this.$api.article.repayALoan(params).then(res => {
        if (res.data.code == 500) {
          alert(res.msg);
          this.mothey = "";
        } else {
          this.mothey = res.data.data.M;
          this.A = res.data.data.A;
          this.S = res.data.data.S;
          this.L = res.data.data.L;
          //console.log(this.A, this.L, this.S);
          this.echarts = [
            { value: Number(this.A), itemStyle: { color: "#7ECF34" } },
            { value: Number(this.L), itemStyle: { color: "#1B9AFB" } },
            { value: Number(this.S), itemStyle: { color: "#F4A436" } }
          ];
        }
      });

    }
  }
};
</script>
<style lang="scss" scoped>
.estates {
  padding-bottom: 0.3rem;
}
div {
  font-size: 16px;
}
.consultants {
  height: 0.28rem;
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.76);
  line-height: 0.28rem;
  margin-bottom: 0.09rem;
  margin-right: 0.1rem;
}
.btn {
  height: 0.5rem;
  margin: 0.1rem;
  .btn_i {
    float: right;
    width: 1.1rem;
    background: rgba(35, 77, 212, 1);
    border-radius: 0.06rem;
  }
}
th,
td {
  border: none !important;
}
.estates {
  margin: 0 0.12rem;
}
.offer {
  display: flex;
  padding: 0.13rem;
  p {
    width: 48%;
    height: 0.39rem;
    margin-right: 0.1rem;
    line-height: 0.39rem;
    text-align: center;
    border-radius: 0.05rem;
    color: #ffffff;
  }

  .P_onbtn {
    background: #c3c3c3;
    border: 1px solid #979797;
  }
  .P_btn {
    background: rgba(35, 77, 212, 1);
    border: 1px solid rgba(151, 151, 151, 1);
  }
}
.repay {
  .repay_p {
    height: 0.18rem;
    font-size: 0.13rem;
    color: rgba(42, 42, 42, 1);
    line-height: 0.18rem;
    padding: 0.12rem 0 0.09rem 0;
  }
  .van-cell-group {
    height: 0.37rem;
    background: rgba(233, 233, 233, 1);
  }
  .van-cell {
    background: none;
  }
  .van-field__control {
    height: 0.18rem;
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
    height: 0.37rem;
    background: rgba(233, 233, 233, 1);
  }
  .van-dropdown-menu__title {
    left: 1.4rem;
  }
}
.monthly {
  padding: 0.19rem 0.2rem 0.15rem 0.11rem;
  font-size: 0.17rem;
  color: rgba(0, 0, 0, 1);
  line-height: 0.24rem;
}
.money {
  padding-left: 0.2rem;
  font-weight: 500;
  color: rgba(255, 94, 94, 1);
}
.canvas {
  position: relative;
}

.echart {
  height: 1.55rem;
  background: rgba(249, 249, 249, 1);
  div {
    right: 0.8rem;
  }
}

.loans {
  margin-bottom: 0.4rem;
  //  height:1.97rem;
  background: rgba(249, 249, 249, 1);
  .loans_p {
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
.loanse {
  height: 0.4rem;
  background: rgba(131, 159, 248, 1);
  border-radius: 0.05rem;
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.4rem;
  text-align: center;
  margin: 0.3rem 0;
}
.echart_p {
  position: absolute;
  top: 0.5rem;
  right: 0;
  font-size: 0.14rem;
  font-weight: 500;
  color: rgba(119, 119, 119, 1);
  line-height: 0.2rem;
  .green {
    width: 0.12rem;
    height: 0.12rem;
    display: inline-block;
    border-radius: 50%;
    background: rgba(126, 207, 52, 1);
  }
  .blue {
    width: 0.12rem;
    height: 0.12rem;
    display: inline-block;
    border-radius: 50%;
    background: rgba(27, 154, 251, 1);
  }
  .orgin {
    width: 0.12rem;
    height: 0.12rem;
    display: inline-block;
    border-radius: 50%;
    background: rgba(244, 164, 54, 1);
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
    height: 0.37rem;
    background: #e9e9e9;
  }
  .el-input {
    position: relative;
    font-size: 14px;
    height: 0.37rem;
    background: #e9e9e9;
    border: none;
    width: 3.5rem !important;
  }
}
</style>
