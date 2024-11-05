<template>
  <div class="promoteList">
    <!-- <headers :class="{colors:flag}"></headers> -->
    <div>
      <div class="loans">
        <div class="loansTop">{{ $t("message.global.calculation") }}</div>
        <div class="calculate">
          <div class="counter">
            <p>{{ $t("message.global.onnetincome") }}</p>
            <!-- revenus -->
            <el-input
              class="inputs"
              type="Number"
              v-model="listP.revenus"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">€</i>
            </el-input>
            <p>{{ $t("message.global.payment") }}</p>
            <el-input
              class="inputs"
              type="Number"
              v-model="listP.apport"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">€</i>
            </el-input>
            <p>
              {{ $t("message.global.liability") }}
              {{ $t("message.global.Canfill") }}
            </p>
            <el-input
              @input="gbs"
              class="inputs"
              type="Number"
              v-model="listP.rate"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">%</i>
            </el-input>
            <div class="buttonInput" @click="Calculators">
              {{ $t("message.global.calculate") }}
            </div>
          </div>
          <div class="rightSs" v-if="reckenList.length">
            <span style="font-size:20px;color:#000;font-weight:600;">{{
              $t("message.global.highest")
            }}</span>
            <span style="font-size:20px;color:#FF5E5E;">{{ prise1 }}€</span>
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
              type="Number"
              v-model="listS.loan"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">€</i>
            </el-input>
            <p>{{ $t("message.global.payment") }}</p>
            <el-input
              class="inputs"
              type="Number"
              v-model="listS.apport"
              @input="gb"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">€</i>
            </el-input>
            <p>{{ $t("message.global.particular") }}</p>
            <!-- <el-input class="" type="Number" v-model="listS.year" placeholder="">
                                 <i slot="suffix" class="el-input__icon">{{$t("message.global.annual")}}</i>
            </el-input>-->
            <el-select
              v-model="listS.year"
              style="width:305px;"
              @change="changs"
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
              type="Number"
              v-model="listS.rate"
              placeholder
            >
              <i slot="suffix" class="el-input__icon">%</i>
            </el-input>

            <div class="buttonInput" @click="repayALoanJs">
              {{ $t("message.global.calculate") }}
            </div>
          </div>
          <div class="rightSs" v-if="repayALoanList">
            <span style="font-size:20px;color:#000;font-weight:600;"
              >{{ $t("message.global.repaymen") }}:</span
            >
            <span style="font-size:20px;color:#FF5E5E;"
              >{{ fmoney(prise2, 2) }}€</span
            >
            <div class="echarts" style="width: 331px;height:252px;"></div>
            <!-- {{repayALoanList.S }}{{repayALoanList.M}} -->
            <div>
              <p style="padding-left:20px;">
                <span
                  style="width:16px;height:16px;display:inline-block;background-color:#7ECF34;border-radius:8px;vertical-align: middle;"
                ></span>
                {{ $t("message.global.payment") }} :
                <span style="color:#FF5E5E"
                  >{{ fmoney(repayALoanList.A, 0) }} €</span
                >
              </p>
              <p style="margin-top:10px;padding-left:20px;">
                <span
                  style="width:16px;height:16px;display:inline-block;background-color:#1B9AFB;border-radius:8px;vertical-align: middle;"
                ></span>
                {{ $t("message.global.Interestamount") }} :
                <span style="color:#FF5E5E"
                  >{{ fmoney(repayALoanList.L, 0) }} €</span
                >
              </p>
              <p style="margin-top:10px;padding-left:20px;">
                <span
                  style="width:16px;height:16px;display:inline-block;background-color:#F4A436;border-radius:8px;vertical-align: middle;"
                ></span>
                {{ $t("message.global.loans") }} :
                <span style="color:#FF5E5E"
                  >{{ fmoney(repayALoanList.S, 0) }} €</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <foots/> -->
  </div>
</template>

<script>
import headers from "~/components/pcIndex/header.vue";
import foots from "~/components/pcIndex/foot.vue";
var echarts = require("echarts");
const Rate = process.env['33IMMO_PROMOTE_RATE'];
const SevenRate = process.env['33IMMO_PROMOTE_SEVEN_RATE'];
const TenRate = process.env['33IMMO_PROMOTE_TEN_RATE'];
const FiftenRate = process.env['33IMMO_PROMOTE_FIFTEN_RATE'];
const TwentyRate = process.env['33IMMO_PROMOTE_TWENTY_RATE'];
const TwentyfiveRate = process.env['33IMMO_PROMOTE_TWENTYFIVE_RATE'];
export default {
  name: "promoteList",
  components: {
    headers,
    foots
  },
  data() {
    return {
      reckenList: "",
      repayALoanList: "",
      flag: true,
      inputs: "",
      inputs1: "",
      prise1: "",
      prise2: "",
      listP: {
        revenus: 3000,
        rate: 30,
        apport: 0
      },
      listS: {
        loan: 300000,
        apport: 0,
        year: 25,
        rate: ""
      },
      prsLis: [],
      prsList: []
    };
  },
  mounted() {
    this.getRate();
  },
  methods: {
    routerGo() {
      this.$router.push({
        path: "/concentUs"
      });
    },
    gb() {
      ////console.log(this.listS.apport)
      if (this.listS.apport > this.listS.loan) {
        this.listS.apport = this.listS.loan;
      }
    },
    gbs() {
      if (this.listP.rate > 40) {
        this.listP.rate = 40;
      }
    },
    fmoney(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s
          .split(".")[0]
          .split("")
          .reverse(),
        r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? " " : "");
      }
      return (
        t
          .split("")
          .reverse()
          .join("") +
        "." +
        r
      );
    },
    changs() {
      ////console.log(this.listS.year)
      this.listS.rate = this.prsList[this.listS.year];
    },
    async Calculators() {
      const loanCapabilityInfo = (
        await this.$api.article.loanCapability(this.listP)
      ).data;
      if (loanCapabilityInfo.code == 0) {
        this.reckenList = loanCapabilityInfo.data.reckenList;
        this.prise1 = loanCapabilityInfo.data.M;
      }
    }, //getRate
    getRate() {
      this.prsList = [Rate, SevenRate, TenRate, FiftenRate, TwentyRate, TwentyfiveRate].map(it => Number(it) ?? 0);
      this.listS.rate = this.prsList[this.listS.year];
    },
    //repayALoanJs
    async repayALoanJs() {
      const repayALoanJsInfo = (
        await this.$api.article.repayALoanJs(this.listS)
      ).data;
      ////console.log(repayALoanJsInfo.data);
      if (repayALoanJsInfo.code == 0) {
        ////console.log(repayALoanJsInfo.data)
        this.repayALoanList = repayALoanJsInfo.data;
        this.prise2 = repayALoanJsInfo.data.M;
        setTimeout(() => {
          if (process.client) {
            var e1 = echarts.init(document.querySelector(".echarts"));
            ////console.log(e1)
            var option = {
              series: [
                {
                  name: "访问来源",
                  type: "pie",
                  radius: ["50%", "70%"],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: "center"
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: "30",
                        fontWeight: "bold"
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {
                      value: Number(this.repayALoanList.A),
                      name: this.$t("message.global.payment"),
                      itemStyle: { color: "#7ECF34" }
                    },
                    {
                      value: Number(this.repayALoanList.L),
                      name: this.$t("message.global.Interestamount"),
                      itemStyle: { color: "#1B9AFB" }
                    },
                    {
                      value: Number(this.repayALoanList.S),
                      name: this.$t("message.global.loans"),
                      itemStyle: { color: "#F4A436" }
                    }
                  ]
                }
              ]
            };
          }
          e1.setOption(option);
        }, 100);
      }
    }
  }
};
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
.promoteList {
  .el-input__icon {
    color: #000;
  }
}
</style>
