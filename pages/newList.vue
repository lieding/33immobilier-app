<template>
  <div class="newList" @click="hides">
    <headers
      style="position:fixed;top:0;left:0;right:0;background-color:#fff;z-index:1000;"
      :class="{ colors: flag, clearfix: true }"
    ></headers>
    <div class="centerS rentHouseTop clearfix">
      <div class="lefts">
        <div class="headline" style="position:fixed;">
          <span>{{ $t("message.global.home") }}</span> /
          <span>{{ $t("message.global.homeList") }}</span>
        </div>
        <iframe
          class="iframes"
          :src="iframeSrc"
          style="height:82%;width:42%;"
          frameborder="0"
        ></iframe>
      </div>
      <!-- <div></div> -->
      <div class="rights" style="z-index:-100;padding-top:51px;">
        <div
          style="position:fixed;width:606px;height:51px;top:104px;background-color:#fff;z-index:999;"
        ></div>
        <p class="tit">{{ $t("message.global.method") }}</p>
        <el-select
          class="secF"
          v-model="quyuC"
          :placeholder="$t('message.global.quyu')"
        >
          <el-option
            v-for="item in cities"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <div class="priceLabel" style="width:140px" @click.stop="popUp1">
          <span>
            <span style="font-size: 18px;">
              {{ $t("message.global.price") }}</span
            ><img
              :src="img.pulldow"
              alt=""
              style="    position: absolute;top: 50%; right: 20px;"
          /></span>
          <div class="slideKids" @click.stop="" v-show="popUpT1">
            <el-slider v-model="values" :max="max" :min="min" range>
            </el-slider>
            <p style="overflow:hidden">
              <span style="float:left;"> {{ fmoney(values[0], 1) }} </span>
              <span style="float:right;">{{ fmoney(values[1], 1) }}</span>
            </p>
            <div class="butss" @click.stop="popUp2">
              {{ $t("message.global.sure") }}
            </div>
          </div>
        </div>
        <el-select
          class="secF"
          style="border-left: 1px solid #ccc;"
          v-model="value2"
          :placeholder="$t('message.global.completionDate')"
        >
          <el-option value="6" :label="$t('message.global.allLan')">
            {{ $t("message.global.allLan") }}</el-option
          >
          <el-option value="5" :label="$t('message.global.Livré')">
            {{ $t("message.global.Livré") }}</el-option
          >
          <el-option value="1" :label="$t('message.global.zoomM')">
            {{ $t("message.global.zoomM") }}</el-option
          >
          <el-option value="2" :label="$t('message.global.sixM')">
            {{ $t("message.global.sixM") }}</el-option
          >
          <el-option value="3" :label="$t('message.global.oneY')">
            {{ $t("message.global.oneY") }}</el-option
          >
          <el-option value="4" :label="$t('message.global.twoY')">
            {{ $t("message.global.twoY") }}</el-option
          >
        </el-select>
        <div class="priceLabel" style="width:140px" @click.stop="popUps1">
          <span
            ><span style="font-size:18px;">{{
              $t("message.global.habitable")
            }}</span>
            <img
              :src="img.pulldow"
              alt=""
              style="position: absolute;top: 50%; right: 20px;"
          /></span>
          <div class="slideKids" @click.stop="" v-show="popUpT2">
            <el-slider v-model="values2" :max="maxs" :min="mins" range>
            </el-slider>
            <p style="overflow:hidden">
              <span style="float:left;"> {{ values2[0] }} </span>
              <span style="float:right;">{{ values2[1] }}</span>
            </p>
            <div class="butss" @click.stop="popUps2">
              {{ $t("message.global.sure") }}
            </div>
          </div>
        </div>
        <div v-for="(itemss, inde) in newInfoList" :key="inde" @click="routerGo(itemss.id)" class="listNews">
          <img :src="itemss.showUrl" class="leftImg" alt="" />
          <div class="rightLisT">
            <p>
              <span class="tag oneNo" v-show="itemss.taxCuts">
                {{ itemss.taxCuts }}
              </span>
              <span class="tag NOtwo" v-show="itemss.expressing">
                {{ itemss.expressing }}
              </span>
            </p>
            <p class="RIghtTit">{{ itemss.estate }}</p>
            <p>
              <img :src="img.dingwei" alt="" />&nbsp;<span class="citiyes">
                {{ itemss.province }}/{{ itemss.city }}</span
              >
            </p>
            <p>
              <img :src="img.homeS" alt="" />&nbsp;<span class="citiyes">
                {{ itemss.minHall }}-{{ itemss.maxHall }}
                {{ $t("message.global.P") }}</span
              >
            </p>
            <p class="prisesInd">{{ itemss.lowPrice }}€ - {{ itemss.maxPrice }}€</p>
            <p class="btnBottom">
              <span v-for="(itea, k) in itemss.tags" :key="k" class="tag">{{ itea }}</span>
            </p>
          </div>
        </div>
        <p v-show="isLoading">Loading...</p>
        <p v-show="finished">{{ $t('message.global.noMore') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import headers from "~/components/pcIndex/header.vue";
import foots from "~/components/pcIndex/foot.vue";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import pulldow from "~/assets/image/pullDow.png";
import dingwei from "~/assets/image/dingwei.png";
import titles from "~/assets/image/titles.jpg";
import homeS from "~/assets/image/homeS.png";
import BaseUrl from "~/api/base.js";
import { fmoney, scrollListener } from '../utils';
export default {
  name: "newList",
  middleware: "responsive",
  components: {
    headers,
    foots,
    Treeselect
  },
  head() {
    return {
      title: "法国新房_楼盘_买新房就上法国33找房网",
      meta: [
        {
          name: "description",
          content:
            "法国33找房新房频道为您查找真实优质的法国新开盘楼盘, 法国新房投资,PINEL减税,LMNP减税,法国33找房收录全法最新最全新房信息。"
        },
        {
          name: "keywords",
          content:
            "法国新房,法国买新房,法国楼盘,33找房,找房,买房投资,买房减税,PINEL减税,LMNP减税,Programme neuf,VEFA,Logement neuf,Promoteur immobilier"
        }
      ]
    };
  },
  data() {
    return {
      cities: "",
      options: [],
      flag: true,
      quyuC: "",
      values2: ["", ""],
      input: "",
      radio4: "",
      value: "",
      values: ["", ""],
      img: {
        titles,
        dingwei,
        pulldow,
        homeS
      },
      popUpT1: false,
      popUpT2: false,
      value2: "",
      marks: {
        0: this.min,
        100: this.max
      },
      marks2: {
        0: this.mins,
        100: this.maxs
      },
      max: 0,
      min: 0,
      mins: 0,
      maxs: 0,
      newInfoList: [],
      page: 1,
      maxPage: 1,
      isLoading: false
    };
  },
  watch: {
    quyuC() {
      this.getListNew();
    },
    value2() {
      if (this.value2 == 6) {
        this.value2 = "";
      }
      this.getListNew();
    }
  },
  computed: {
    finished () {
      return this.page >= this.maxPage;
    }
  },
  created() {
    this.iframeSrc = BaseUrl.sq + "/map/newMap";
    this.fmoney = fmoney;
    this.getsas();
    this.get();
    this.getSearchNew();
  },
  mounted () {
    this.__scrollCbk = () =>
      !this.finished && scrollListener(() => this.getListNew(this.page + 1));
    window.addEventListener('scroll', this.__scrollCbk);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.__scrollCbk);
  },
  methods: {
    popUp1() {
      this.popUpT1 = !this.popUpT1;
      this.popUpT2 = false;
    },
    popUp2() {
      this.popUpT1 = !this.popUpT1;
      this.getListNew();
    },
    hides() {
      this.popUpT2 = false;
      this.popUpT1 = false;
    },
    popUps1() {
      this.popUpT2 = !this.popUpT2;
      this.popUpT1 = false;
    },
    popUps2() {
      this.popUpT2 = !this.popUpT2;
      this.getListNew();
    },
    routerGo(flags) {
      this.$router.push({
        path: "/newDetails",
        query: {
          flag: flags
        }
      });
    },
    async get() {
      const getAddressInfo = (await this.$api.article.getAddress()).data;
      if (getAddressInfo.code == 0) {
        getAddressInfo.data.shift();
        this.options = getAddressInfo.data;
        this.options.forEach(item => {
          item.label = item.text;
          item.id = item.text;
          item.children.forEach(items => {
            items.label = items.text;
            items.id = items.text;
          });
        });
      }
    },
    async getSearchNew() {
      const getSearchNewInfo = (await this.$api.article.getSearchNew()).data;
      if (getSearchNewInfo.code == 0) {
        this.max = Number(getSearchNewInfo.date.maxPrice);
        this.min = Number(getSearchNewInfo.date.minPrice);
        this.maxs = Number(getSearchNewInfo.date.maxHall);
        this.mins = Number(getSearchNewInfo.date.minHall);
        this.values2[1] = this.maxs;
        this.values2[0] = this.mins;
        this.values[0] = this.min;
        this.values[1] = this.max;
      }
      this.getListNew();
    },
    async getListNew(page = 1) {
      this.isLoading = true;
      const params = {
        page,
        pageSize: 10,
        expressing: this.value2,
        lowPrice: this.values[0] ? this.values[0] : this.min - 1,
        maxPrice:
          this.values[1] != this.marks[0]
            ? this.values[1]
            : this.marks[100] + 1,
        province: this.quyuC,
        minHall: this.values2[0] ? this.values2[0] : this.marks2[0],
        maxHall:
          this.values2[1] != this.values2[0] ? this.values2[1] : this.maxs + 1,
        search: this.$route.query.val ? this.$route.query.val : ""
      };
      try {
        const getListNewInfo = (await this.$api.article.getListnew(params)).data;
        if (getListNewInfo.code == 0) {
          this.newInfoList = getListNewInfo.data.newHousingList;
          this.maxPage = getListNewInfo.data.maxPage;
          this.page = params.page;
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getsas() {
      const getCityInfo = (await this.$api.article.getRegionalNew()).data;
      if (getCityInfo.code == 0) {
        this.cities = getCityInfo.data.spreads;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
.iframes {
  position: fixed;
  top: 156px;
  right: 51%;
  // min-right:610px;
}
.colors {
  color: #000 !important;
}
.newList {
  // background-color:#e9e9e9;
  overflow: hidden;
  .rentHouseTop {
    // margin-top:100px;
    padding-top: 100px;
    // overflow: hidden;
    .headline {
      right: 50%;
      width: 42%;
      padding-top: 20px;
      padding-bottom: 10px;
      color: #000;
      font-size: 16px;
      span {
        cursor: pointer;
      }
    }
  }
  .lefts,
  .rights {
    display: inline-block;
    width: 600px;
  }
  .rights {
    overflow: hidden;
  }
  .lefts {
    height: 560px;
    position: relative;
  }
  .rights {
    float: right;
    box-sizing: border-box;
    .tit {
      font-size: 26px;
      color: #000;
      padding: 14px;
      font-weight: 600;
    }
    .listNews {
      display: flex;
      align-items: center;
      padding: 5px 0;
      border-bottom: 1px solid #ccc;
      .leftImg {
        flex: unset;
        width: 221px;
        max-height: 137px;
      }
      .rightLisT {
        flex: 1;
        margin-left: 5px;
        p {
          line-height: 1.5;
          img {
            width: 12px;
          }
          .citiyes {
            font-size: 14px;
            color: #373737;
            font-weight: bold;
          }
        }
        .tag {
          display: inline-block;
          font-size: 12px;
          color: #fff;
          padding: 0 2px;
        }
        .oneNo {
          background-color: #6ac078;
        }
        .NOtwo {
          background-color: #234cd3;
        }
        .RIghtTit {
          color: #000;
          font-size: 16px;
          font-weight: 600;
        }
        .btnBottom {
          .tag {
            background-color: #bbb;
            color: #000;
            font-size: 14px;
          }
        }
        .prisesInd {
          display: block;
          font-size: 16px;
          color: #ff5e5e;
          font-weight: bold;
        }
      }
      .rightImg {
        flex: unset;
        max-height: 74px;
      }
    }
    .priceLabel {
      margin-left: 0;
      border-right: 1px solic #ccc !important;
      background-color: #fff;
      position: relative;
      display: inline-block;
      width: 80px;
      // border:1px solid #ddd;
      background-color: #e9e9e9;
      vertical-align: top;
      line-height: 34px;
      height: 34px;
      text-align: center;
      cursor: pointer;
      img {
        width: 8px;
        height: 4px;
        vertical-align: middle;
      }
      .slideKids {
        position: absolute;
        top: 60px;
        left: -81%;
        width: 288px;
        height: 118px;
        background-color: #ccc;
        padding: 0 30px;
        background-color: #fff;
        box-sizing: border-box;
        padding-top: 10px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
      }
      .butss {
        width: 60px;
        height: 32px;
        background-color: #234cd3;
        cursor: pointer;
        float: right;
        margin-right: 0px;
        color: #fff;
        border-radius: 3px;
      }
    }
  }
}
</style>
<style lang="scss">
.newList {
  .secF {
    margin-right: 0 !important;
    vertical-align: top;
    border-right: 1px solid #ccc;
    .el-input__inner {
      text-align: center;
      font-size: 18px;
      border: 0px;
      background-color: #e9e9e9;
      vertical-align: bottom;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #2a2a2a !important;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #2a2a2a !important;
    }
    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
      color: #2a2a2a !important;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: #2a2a2a !important;
    }
  }

  .el-input__inner {
    height: 34px;
  }
  .el-input--prefix .el-input__inner {
    background-color: #e9e9e9;
    width: 140px;
  }
  .el-input {
    width: 140px !important;
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #2a2a2a !important;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #2a2a2a !important;
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #2a2a2a !important;
  }
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #2a2a2a !important;
  }
  .el-icon-date:before {
    font-size: 0;
  }
}
</style>
