<template>
  <div id="index" :style="backs">
    <!-- 头 -->
    <headers :vas="true"></headers>
    <div class="character">{{ $t("message.global.Apartment") }}</div>
    <div class="centerSs indexCent">
      <!-- 中 -->
      <div class="listSmall">
        <span
          :class="{ listSmallT: true, emphasis: label == 1 ? true : false }"
          @click="theKey(1)"
          >{{ $t("message.global.NewHouse") }}</span
        >
        <span
          :class="{ listSmallT: true, emphasis: label == 2 ? true : false }"
          @click="theKey(2)"
          >{{ $t("message.global.second-hand") }}</span
        >
        <span
          :class="{ listSmallT: true, emphasis: label == 3 ? true : false }"
          @click="theKey(3)"
          >{{ $t("message.global.tenement") }}</span
        >
      </div>
      <div class="searchHou">
        <el-input
          v-model="searchVal"
          class="inputElem"
          :placeholder="$t('message.global.Where')"
        ></el-input>
        <span class="searchBtn" @click="searchVals">
          <img
            style="width:26px;height:26px;margin-right:6px;"
            src="@/assets/image/sousuo.png"
            alt
          />
          {{ $t("message.global.seek") }}
        </span>
      </div>
      <div class="cardLs">
        <div style="float:left;" @click="RoutingHop('/essaydetails', 3)">
          <img src="@/assets/image/searchHouse.png" alt />
          <span style="display:inline-block;padding-left:30px;">
            <p style="font-weight:600;">
              {{ $t("message.global.reductions") }}
            </p>
            <p style="margin-top:5px;font-size:16px;">
              {{ $t("message.global.enjoy") }}
            </p>
          </span>
        </div>
        <div style="float:right;" @click="RoutingHop('/sellers')">
          <img src="@/assets/image/houses.png" alt />
          <span style="display:inline-block;padding-left:30px;">
            <p style="font-weight:600;">{{ $t("message.global.want") }}</p>
            <p style="font-size:16px;margin-top:5px;">
              {{ $t("message.global.simpleness") }}
            </p>
          </span>
        </div>
      </div>
      <!-- 底-新房楼盘 -->
      <div class="newHoB">
        <div class="secondTit">
          <span class="secondL">{{ $t("message.global.Newbuilding") }}</span>
          <span class="secondR" @click="RoutingHop('/newList', false)">{{
            $t("message.global.examine")
          }}</span>
        </div>
        <p class="characterP">{{ $t("message.global.precedence") }}</p>
        <div class="newHoList">
          <div
            class="NewLi"
            @click="RoutingHop('/newDetails', item.id)"
            v-for="(item, index) in homePageIn.newHousings"
            :key="index"
            :class="[index == 3 ? 'marginRigh' : '']"
          >
            <span class="city">
              <span class="provinces">{{ item.province }}</span>
              <span style="text-shadow:2px 2px 3px rgba(0,0,0,0.5);">{{
                item.city
              }}</span>
            </span>
            <span class="rightFlo">{{ item.expressing }}</span>
            <img class="newHoImg" :src="item.showUrl" alt />
            <p class="newHoTit">{{ item.estate }}</p>
            <p class="newHoPr">
              {{ item.huXing }} {{ $t("message.global.pieces") }}
            </p>
            <div class="tallylis">
              <span class="tally" v-for="(tags, i) in item.tags" :key="i">{{
                tags
              }}</span>
            </div>
            <div class="newPrice">
              {{ item.lowPrice }} {{ $t("message.global.rise") }}
            </div>
          </div>
        </div>
      </div>
      <!-- 底-二手 -->
      <div class="secondHoB">
        <div class="secondTit">
          <span class="secondL">{{ $t("message.global.ordapartment") }}</span>
          <span class="secondR" @click="RoutingHop('/anyEs', false)">{{
            $t("message.global.AllNewHomes")
          }}</span>
        </div>
        <div class="newHoList">
          <div
            class="NewLi"
            v-for="(items, index) in homePageIn.homesList"
            :key="index"
            :class="[index == 3 ? 'marginRigh' : '']"
          >
            <img
              class="newHoImg"
              @click="RoutingHop('/seconHandHous', items.id)"
              :src="items.showUrl"
              alt
            />
            <p class="newHoTit">{{ items.title }}</p>
            <p class="newHoPr newHorPrs">
              {{ items.bigProvince }}&nbsp;{{ items.province }}
              <span>{{ items.total }}€ &nbsp;</span>
            </p>
            <div class="tallylis">
              <span class="tally" style="color:#505050;font-weight:600;"
                >{{ items.roomNum }} {{ $t("message.global.P") }}</span
              >
              <span class="tally" style="color:#505050;font-weight:600;"
                >{{ items.bedRoomNum }} {{ $t("message.global.crouch") }}</span
              >
              <span class="tally" style="color:#505050;font-weight:600;"
                >{{ items.acreage }}{{ $t("message.global.square") }}</span
              >
              <span class="priseRig"
                >{{ items.unit }} {{ $t("message.global.square€") }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 底-租房 -->
      <div class="rentingHoB">
        <div class="secondTit">
          <span class="secondL">{{ $t("message.global.handpick") }}</span>
          <span class="secondR" @click="RoutingHop('/rentHouseList', true)">{{
            $t("message.global.Allhand")
          }}</span>
        </div>
        <div class="newHoList">
          <div
            @click="RoutingHop('/renting', items.id)"
            class="NewLi"
            v-for="(items, index) in homePageIn.rentings"
            :key="index"
            :class="[index == 3 ? 'marginRigh' : '']"
          >
            <div>
              <span class="city">
                <span
                  class="provinces"
                  style="font-weight:600;font-size:11px;"
                  >{{
                    items.rentType
                      ? $t("message.global.joint")
                      : $t("message.global.grouping")
                  }}</span
                >
              </span>
              <img class="newHoImg" :src="items.showUrl" alt />
              <p class="newHoTit">{{ items.title }}</p>
              <p class="newHoPr">{{ items.province }} {{ items.city }}</p>
              <div class="tallylis">
                <span class="tally">{{
                  items.source
                    ? $t("message.global.Personal")
                    : $t("message.global.Intermediary")
                }}</span>
                <span class="tally" v-if="!items.isSchools">{{
                  $t("message.global.jinxuexiao")
                }}</span>
              </div>
              <div class="newPrice">{{ items.total }} €</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="agency">
      <div class="agencylis centerSs">
        <div class="agencyLisTit">
          <span class="secondL">{{ $t("message.global.property") }}</span>
          <span class="secondR" @click="RoutingHop('/broker', true)">{{
            $t("message.global.economics")
          }}</span>
        </div>
        <div class="titleLis">
          <span class="ListSty">{{ $t("message.global.counselor") }}</span>
          <span class="ListSty">{{ $t("message.global.ZeroFee") }}</span>
          <span class="ListSty">{{ $t("message.global.bilingualism") }}</span>
        </div>
        <div
          class="agencyLiCar"
          :class="[index == 2 ? 'marginR0' : '']"
          v-for="(item, index) in homePageIn.brokerList"
          :key="index"
        >
          <div class="leftCarA">
            <img :src="item.brokerAvatar" alt />
            <img class="proAgent" src="@/assets/image/proAgent.png" alt />
          </div>
          <div class="rightCarA">
            <p class="rightName">{{ item.brokerName }}</p>
            <p class="attestation">{{ item.brokerJob }}&nbsp;</p>
            <p class="NumberP">{{ item.brokerTelPhone }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="joinMe">
      <div class="centerSs">
        <img class="Joinimg" :src="img.pcBroker" alt />
        <span class="JoinTex">{{ $t("message.global.middleman") }}</span>
        <span class="JoinBut" @click="clickChange">
          <img :src="img.pcPerson" alt />
          {{ $t("message.global.join") }}
        </span>
      </div>
    </div>
    <div class="partner centerSs">
      <span>{{ $t("message.global.trust") }}</span>
      <p>{{ $t("message.global.pionner") }}</p>
      <p>{{ $t("message.global.Courtier") }}</p>
      <img style="margin-top: 20px;width:1200px;" :src="img.pcss" alt />
      <span>{{ $t("message.global.trend") }}</span>
      <p style="text-align:center;font-size:22px;color:#2B2B2B;">
        {{ $t("message.global.transaction") }}
      </p>
      <p style="text-align:center;font-size:22px;color:#2B2B2B;">
        {{ $t("message.global.Administration") }}
      </p>
      <p class="echartss" style="overflow:hidden">
        <el-select style="float:right;height:30px;" v-model="value" placeholder>
          <el-option
            v-for="item in returnList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </p>
      <div class="echart" style="width: 1100px;height:525px;"></div>
    </div>
    <foots></foots>
    <el-dialog
      :title="$t('message.global.join')"
      :visible.sync="dialogVisible"
      width="40%"
      center
    >
      <div>
        <!-- <img :src="lianxiPhone.qrCode" alt=""> contactPhone  -->
        <span style="font-size:20px;color:#000;"
          >{{ $t("message.global.contactPhone") }}:{{ lianxiPhone.phone }}</span
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入
import foots from "@/components/PcIndex/moduleT/foot.vue";
import headers from "@/components/PcIndex/moduleT/header.vue";
// 引入图片
import searchBtPn from "@/assets/image/searchBut.png";
import logoT from "@/assets/image/logoT.png";
import sellersT from "@/assets/image/sellers.png";
import backgroundI from "@/assets/image/backPc.png";
import rightCard from "@/assets/image/right.png";
import leftCard from "@/assets/image/left.png";
import pcBroker from "@/assets/image/pcBroker.png";
import pcPerson from "@/assets/image/pcPerson.png";
import pcss from "@/assets/image/logo_promoteur.png";
// 引入
import { async } from "q";
var echarts = require("echarts");
export default {
  name: "index",
  components: {
    foots,
    headers
  },
  middleware: "responsive",
  head() {
    return {
      title: "33找房, 法国第一华人找房平台",
      meta: [
        {
          name: "description",
          content:
            "法国33找房为您提供法国房产、房价、投资、减税、生活服务等信息。在法国,寻找新房、二手房、租房、服务就上法国33找房! 全法最专业的华人找房平台"
        },
        {
          name: "keywords",
          content:
            "法国找房平台,新房,二手房,租房,装修,保洁,服务,投资,减税,楼盘,法国购房,法国房产,法国租房,法国房地产网,个人急售二手房,33找房,PINEL,LMNP"
        }
      ]
    };
  },
  data() {
    return {
      dialogVisible: false,
      lianxiPhone: "",
      returnList: [],
      homeTrendList: [],
      img: {
        // 图片集合
        title: logoT,
        sellersT: sellersT,
        backgroundI: backgroundI,
        searchBtPn: searchBtPn,
        leftCard: leftCard,
        rightCard: rightCard,
        pcBroker: pcBroker,
        pcPerson: pcPerson,
        pcss: pcss
      },
      value: "Paris 1",
      backs: {
        //  背景
        background: "url(" + backgroundI + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 767px"
      },
      label: 1, // 标记 选择租房买房
      searchVal: "", // 搜索绑定
      index: 1, // 绑定
      homePageIn: [] // 主页数据
    };
  },
  watch: {
    value(val) {
      this.ByRegion();
    }
  },
  methods: {
    searchVals() {
      // //console.log(this.label, this.searchVal)
      let urls = "";
      switch (this.label) {
        case 1:
          urls = "/newList";
          //console.log(urls)
          break;
        case 2:
          urls = "/anyEs";
          //console.log(urls)
          break;
        case 3:
          urls = "/rentHouseList";
        //console.log(urls)
      }
      this.$router.push({
        path: urls,
        query: {
          val: this.searchVal
        }
      });
    },
    clickChange() {
      this.dialogVisible = true;
    },
    theKey(val) {
      if (val == this.label) return;
      //console.log(1);
      this.label = val;
    },
    async get() {
      const getHomePageInfo = (await this.$api.article.getHomePageInfo()).data;
      //console.log(getHomePageInfo)
      if (getHomePageInfo.code == 0) {
        this.homePageIn = getHomePageInfo.data;
        this.lianxiPhone = getHomePageInfo.data.system;
      }
      //console.log(this.homePageIn)
    },
    RoutingHop(smt, flag) {
      this.$router.push({
        path: smt,
        query: {
          flag: flag
        }
      });
    },
    ByRegion() {
      let params = { homeTrendRegion: this.value };
      let createTime = [];
      let homeTrendPrice = [];
      this.$api.article.getTrendByRegion(params).then(res => {
        this.homeTrendList = res.data.data.homeTrendList;
        res.data.data.homeTrendList.map(function(item) {
          createTime.push(item.homeTrendQuarter);
          homeTrendPrice.push(item.homeTrendPrice);
        });
        this.$nextTick(function() {
          //console.log(document.querySelector(".echart"));
          var myChart = echarts.init(document.querySelector(".echart"));
          setTimeout(() => {
            myChart.setOption({
              xAxis: {
                type: "category",
                data: createTime
              },
              yAxis: {
                type: "value",
                name: "  € / m² "
              },
              dataZoom: [
                {
                  show: true,
                  startValue: 0,
                  end: 100,
                  handleIcon:
                    "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                  handleSize: "80%",
                  handleStyle: {
                    color: "#fff",
                    shadowBlur: 3,
                    shadowColor: "rgba(0, 0, 0, 0.6)",
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                  }
                }
              ],
              grid: {
                left: "3%",
                right: "3%",
                containLabel: true
              },
              series: [
                {
                  label: {
                    normal: {
                      show: true,
                      position: "top"
                    }
                  },
                  data: homeTrendPrice,
                  type: "line"
                }
              ]
            });
          }, 300);
          this.$forceUpdate();
        });
      });
      //console.log(homeTrendPrice,createTime)
    }
  },
  mounted() {
    this.$api.article.trendRegion().then(res => {
      this.returnList = res.data.data.returnList;
      //console.log(this.returnList);
    });
    this.ByRegion();
    this.get(); // 获取主页信息
  }
};
</script>

<style lang="less" scoped>
#index {
  text-align: left;
  //  中
  .character {
    text-align: center;
    color: #fff;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    height: 160px;
    line-height: 98px;
    margin-top: 100px;
    font-size: 80px;
  }
  .indexCent {
    // padding-top:167px;
    .listSmall {
      margin-top: 28px;
      background-color: #212739;
      display: inline-block;
      height: 55px;
      .listSmallT {
        display: inline-block;
        background-color: #5b5b5b;
        font-size: 24px;
        color: #fff;
        padding: 0 20px;
        line-height: 55px;
        cursor: pointer;
      }
      .emphasis {
        background-color: #212739;
      }
    }
    .searchHou {
      box-sizing: border-box;
      width: 1100px;
      height: 139px;
      background-color: #212739;
      padding-top: 45px;
      padding-left: 70px;
      .inputElem {
        box-sizing: border-box;
        width: 745px;
        height: 62px;
        vertical-align: middle;
        font-size: 22px;
      }
      .searchBtn {
        box-sizing: border-box;
        margin-left: 20px;
        display: inline-block;
        width: 186px;
        height: 62px;
        background-color: #234cd3;
        line-height: 62px;
        cursor: pointer;
        text-align: center;
        font-size: 22px;
        vertical-align: top;
        color: #fff;
        img {
          vertical-align: middle;
        }
        // vertical-align: middle;
      }
    }
    .cardLs {
      height: 187px;
      margin-top: 95px;
      div {
        box-sizing: border-box;
        padding-top: 49px;
        padding-left: 35px;
        background-color: #234dd4;
        width: 536px;
        height: 187px;
        img {
          vertical-align: top;
          width: 90px;
        }
        span {
          color: #fff;
          font-size: 28px;
        }
        p {
          width: 369px;
          height: 56px;
          line-height: 1;
        }
      }
    }
    // 底-新房楼盘
    .newHoB,
    .secondHoB,
    .rentingHoB {
      padding-top: 40px;
      .secondTit {
        overflow: hidden;
        .secondL {
          color: #000;
          font-size: 36px;
          font-weight: 700;
          float: left;
        }
        .secondR {
          color: #234cd3;
          font-size: 20px;
          cursor: pointer;
          float: right;
        }
      }
      .characterP {
        margin-top: 18px;
        font-size: 20px;
        color: #a3a3a3;
      }
      .newHoList {
        margin-top: 31px;
        .marginRigh {
          margin-right: 0 !important;
        }
        .NewLi {
          display: inline-block;
          margin-right: 41px;
          box-sizing: border-box;
          position: relative;
          box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          width: 244px;
          height: 241px;
          .marginRigh {
            margin-right: 0 !important;
          }
          .city {
            position: absolute;
            color: #fff;
            top: 110px;
            left: 5px;
            .provinces {
              display: inline-block;
              padding: 2px 3px;
              background-color: #6ac078;
              border-radius: 3px;
            }
          }
          .rightFlo {
            right: 0px;
            top: 0px;
            background-color: #234cd3;
            color: #fff;
            font-size: 12px;
            line-height: 27px;
            position: absolute;
            display: inline-block;
            height: 27px;
            padding: 0 13px;
            border-radius: 0px 0px 0px 18px;
          }
          .newHoImg {
            width: 244px;
            height: 140px;
            // padding-left:3px;
          }
          .newHoTit {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            padding-left: 8px;
            font-size: 18px;
            line-height: 18px;
            margin-top: 3px;
          }
          .newHoPr {
            padding-left: 8px;
            font-size: 12px;
            line-height: 18px;
            margin-top: 3px;
            span {
              color: #ff5e5e;
              float: right;
              font-size: 16px;
              font-weight: 600;
            }
          }
          .newHorPrs {
            margin: 10px 0;
          }
          .tallylis {
            margin-top: 3px;
            padding-left: 6px;
            padding-right: 6px;
            .tally {
              margin-left: 3px;
              display: inline-block;
              background-color: #bfbfbf;
              font-size: 11px;
              height: 22px;
              line-height: 22px;
              color: #fff;
              padding: 0 6px;
            }
            .priseRig {
              font-size: 12px;
              float: right;
              color: #acacac;
              vertical-align: middle;
              line-height: 22px;
            }
          }
          .newPrice {
            font-size: 16px;
            color: #ff5e5e;
            text-align: right;
            padding-right: 5px;
            font-weight: 700;
            margin-top: 5px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  .agency {
    margin-top: 41px;
    background-color: #f6f8fc;
    width: 100%;
    height: 379px;
    box-sizing: border-box;
    .agencylis {
      .agencyLisTit {
        overflow: hidden;
        line-height: 36px;
        padding-top: 36px;
        .secondL {
          float: left;
          font-size: 36px;
          vertical-align: middle;
          color: #000;
          font-weight: 700;
        }
        .secondR {
          float: right;
          font-size: 20px;
          color: #234cd3;
          vertical-align: middle;
          cursor: pointer;
        }
      }
      .titleLis {
        overflow: hidden;
        padding-top: 18px;
        padding-bottom: 28px;
        .ListSty {
          float: left;
          color: #a3a3a3;
          font-size: 20px;
          margin-right: 48px;
        }
      }
      .marginR0 {
        margin-right: 0 !important;
      }
      .agencyLiCar {
        background-color: #fff;
        width: 317px;
        height: 156px;
        box-sizing: border-box;
        padding: 24px 15px;
        display: inline-block;
        margin-right: 73px;
        .leftCarA {
          float: left;
          position: relative;
          // width: 20%;
          img {
            width: 103px;
            height: 103px;
            border-radius: 50%;
          }
          .proAgent {
            position: absolute;
            width: 35px;
            height: 19px;
            bottom: -7px;
            left: 50%;
            margin-left: -18px;
            border-radius: 0;
          }
        }
        .rightCarA {
          float: right;
          width: 56%;
          height: 100%;
          .rightName {
            color: #000000;
            font-size: 18px;
          }
          .attestation {
            margin-top: 20px;
            font-size: 14px;
            color: #838383;
            height: 38px;
            overflow: hidden;
            display: -webkit-box; //将对象作为弹性伸缩盒子模型显示;
            text-overflow: ellipsis; //溢出部分用省略号代替
            -webkit-line-clamp: 2; //设置文本显示两行
            white-space: normal;
            -webkit-box-orient: vertical;
          }
          .NumberP {
            margin-top: 4px;
            color: #0433ff;
            font-size: 16px;
          }
        }
      }
    }
  }
  .joinMe {
    background-color: #234cd3;
    height: 220px;
    width: 100%;
    padding: 35px 24px;
    box-sizing: border-box;
    .Joinimg {
      width: 118px;
      height: 136px;
      vertical-align: middle;
    }
    .JoinTex {
      color: #fff;
      font-size: 32px;
      vertical-align: middle;
      margin-left: 20px;
    }
    .JoinBut {
      cursor: pointer;
      margin-top: 46px;
      float: right;
      font-size: 20px;
      background-color: #fff;
      text-align: center;
      width: 196px;
      height: 46px;
      vertical-align: middle;
      padding: 9px;
      color: #303440;
      box-sizing: border-box;
      img {
        width: 15px;
        height: 15px;
        vertical-align: middle;
      }
    }
  }
  .partner {
    span {
      padding-top: 40px;
      color: #000;
      font-size: 36px;
      font-weight: 700;
      display: inline-block;
      padding-bottom: 20px;
    }
    p {
      font-weight: 400;
      font-size: 20px;
      color: #a3a3a3;
    }
  }
}
</style>
<style lang="less">
.echartss {
  .el-input--suffix .el-input__inner {
    height: 30px;
  }
}
</style>
