<template>
  <div @click="hides" class="anyEs">
    <div class="centerS seconBrok">
      <div class="headline">
        <span>{{ $t("message.global.home") }}</span> /
        <span>{{ $t("message.global.ordHouseapartment") }}</span>
      </div>
    </div>
    <div class="centerS" style="padding-bottom:5px;">
      <el-select
        class="secF"
        style="width:151px;"
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
      <div class="priceLabel">
        <span
          @click.stop="popUp1"
          style="display:inline-block;width:100%;height:100%;"
          >{{ $t("message.global.SURFACE") }}
          <img
            :src="img.pulldow"
            alt=""
            style="position: absolute;top: 50%; right: 20px;"
        /></span>
        <div class="slideKids" @click.stop="" v-show="popUpTs1">
          <el-slider v-model="valuess" :max="max" :min="min" range> </el-slider>
          <p style="overflow:hidden">
            <span style="float:left;">
              {{ valuess[0] }} {{ $t("message.global.square") }}</span
            >
            <span style="float:right;"
              >{{ valuess[1] }} {{ $t("message.global.square") }}</span
            >
          </p>
          <div class="butss" @click.stop="popUp1">
            {{ $t("message.global.CONFIRM") }}
          </div>
        </div>
      </div>
      <div class="priceLabel">
        <span
          @click.stop="popUpT1"
          style="display:inline-block;width:100%;height:100%;"
          >{{ $t("message.global.price") }}
          <img
            :src="img.pulldow"
            alt=""
            style="position: absolute;top: 50%; right: 20px;"
        /></span>
        <div class="slideKids" @click.stop="" v-show="popUpTs2">
          <el-slider v-model="values" :max="maxs" :min="mins" range>
          </el-slider>
          <p style="overflow:hidden;font-size:16px;">
            <span style="float:left;">{{ fmoney(values[0], 1) }}€</span>
            <span style="float:right;">{{ fmoney(values[1], 1) }}€</span>
          </p>
          <div class="butss" @click.stop="popUpT1">
            {{ $t("message.global.CONFIRM") }}
          </div>
        </div>
      </div>
      <el-select
        class="secF"
        style="width:151px;"
        v-model="val"
        :placeholder="$t('message.global.habitable')"
      >
        <el-option :value="0" :label="$t('message.global.allLan')">{{
          $t("message.global.allLan")
        }}</el-option>
        <el-option
          v-for="item in optionss"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        class="secF"
        style="width:151px;"
        v-model="vals"
        :placeholder="$t('message.global.bedroom')"
      >
        <el-option :value="0" :label="$t('message.global.allLan')">{{
          $t("message.global.allLan")
        }}</el-option>
        <el-option
          v-for="item in optionss"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-popover placement="bottom" width="130" trigger="click">
        <span
          @click="cli(2)"
          style="display:block;padding-top:5px;cursor: pointer;width:133px; text-align:center;border-bottom:1px solid #979797;"
          >{{ $t("message.global.allPriGtoD") }}</span
        >
        <span
          @click="cli(1)"
          style="display:block;padding-top:5px;cursor: pointer;width:133px;text-align:center;border-bottom:1px solid #979797;"
          >{{ $t("message.global.allPriDtoG") }}</span
        >
        <span
          @click="cli(4)"
          style="display:block;padding-top:5px;cursor: pointer;width:133px;text-align:center;border-bottom:1px solid #979797;"
          >{{ $t("message.global.onePriGtoD") }}</span
        >
        <span
          @click="cli(3)"
          style="display:block;padding-top:5px;cursor: pointer;width:133px;text-align:center;border-bottom:1px solid #979797;"
          >{{ $t("message.global.onePriDtoG") }}</span
        >
        <span
          @click="cli(6)"
          style="display:block;padding-top:5px;cursor: pointer;width:133px;text-align:center;border-bottom:1px solid #979797;"
          >{{ $t("message.global.pmPriGtoD") }}</span
        >
        <span
          @click="cli(5)"
          style="display:block;padding-top:5px;cursor: pointer;width:133px;text-align:center;border-bottom:1px solid #979797;"
          >{{ $t("message.global.pmPriDtoG") }}</span
        >
        <span
          slot="reference"
          style="float:right;line-height:34px;box-size:border-box;display:inline-block;width:131px;height:34px;background-color:#E9E9E9;vertical-align: middle"
        >
          <img
            style="margin-right:50px;margin-left:10px;vertical-align:middle;width:16px;height:16px;"
            src="~/assets/image/sort.png"
            alt=""
          />
          <span
            style="margin-right:5px;font-size:16px;vertical-align: middle"
            >{{ $t("message.global.price") }}</span
          >
          <img
            style="vertical-align:middle;width:10px;height:6px;"
            src="~/assets/image/goDown.png"
            alt=""
          />
        </span>
      </el-popover>
    </div>
    <div
      class="centerS"
      style="overflow:hidden;padding-bottom:10px;margin-bottom:10px;margin-top:10px;"
    >
      <iframe
        :src="baseurl"
        style="width:1200px;height:600px;"
        frameborder="0"
      ></iframe>
      <p style="font-size:26px;font-weight:600;margin-bottom: 10px;">
        {{ $t("message.global.ordHouseapartment") }}
      </p>
      <div
        v-for="(item, ind) in listIN"
        @click="routerGo(item.id)"
        style="overflow:hidden;border-bottom:1px solid #ccc;padding-bottom:5px;margin-bottom:10px;"
        :key="ind"
      >
        <div class="leftssa">
          <img :src="item.showUrl" alt="" />
          <img
            class="leftsa"
            v-show="item.isOpenVR"
            src="~/assets/image/VRlogo.gif"
            alt=""
          />
        </div>
        <div class="rightssa">
          <p style="font-size:12px;font-weight:600;">
            <span
              style="color:#fff;
                        display:inline-block;
                        margin-right:10px;
                        height:22px;width:91px;line-height:22px;text-align:center;background-color:#6AC078;"
            >
              {{
                item.oneselfOrAgent
                  ? $t("message.global.jinjirenfangyuan")
                  : $t("message.global.Personal")
              }}</span
            >
            <span
              style="color:#fff;display:inline-block;height:22px;width:91px;line-height:22px;text-align:center;background-color:#234CD3;"
            >
              {{
                item.houseOrApartment
                  ? $t("message.global.apartments")
                  : $t("message.global.cottage")
              }}</span
            >
          </p>
          <p style="margin-top:10px;font-size:16px;color:#000;">
            {{ item.title }}
          </p>
          <p style="margin-top:10px;">
            <img style="width:13px;height:15px;" :src="img.dingwei" alt="" />
            {{ item.bigProvince }}/{{ item.province }}
          </p>
          <p style="margin-top:10px;">
            <img :src="img.gongyu" alt="" /> {{ item.unit }}
            {{ $t("message.global.square€") }}
          </p>
          <p style="margin-top:20px;font-size:12px;">
            <span
              style="display:inline-block;padding:4px 18px;color:#000;margin-right:10px; background-color:#ccc;border-radius:3px;font-weight:600;"
              >{{ item.roomsNum }} {{ $t("message.global.P") }}</span
            >
            <span
              style="display:inline-block;padding:4px 18px;color:#000;margin-right:10px; background-color:#ccc;border-radius:3px;font-weight:600;"
              >{{ item.bedroomNum }} {{ $t("message.global.crouch") }}</span
            >
            <span
              style="display:inline-block;padding:4px 18px;color:#000;margin-right:10px; background-color:#ccc;border-radius:3px;font-weight:600;"
              >{{ item.acreage }} {{ $t("message.global.square") }}</span
            >
          </p>
        </div>
        <span style="float:right;font-size:28px;color:#FF5E5E;"
          >{{ item.total }}€
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import pulldow from "~/assets/image/pullDow.png";
import proVip from "~/assets/image/proVip.png";
import visitCard from "~/assets/image/visitCard.png";
import authentication from "~/assets/image/authentication.png";
import logoT from "~/assets/image/logoT.png";
import phone from "~/assets/image/phone.png";
import email from "~/assets/image/email.png";
import wxInd from "~/assets/image/wxInd.png";
import gongyu from "~/assets/image/gongyu.png";
import dingwei from "~/assets/image/dingwei.png";

import baseUrl from "~/api/base.js";

export default {
  name: "anyEs",
  middleware: "responsive",
  head() {
    return {
      title: "法国二手房_巴黎二手房出售买卖信息网-法国33找房",
      meta: [
        {
          name: "description",
          content:
            "法国33找房二手房频道为您查找真实优质的法国二手房信息,买房,卖房就上33找房-全法最专业的华人找房平台"
        },
        {
          name: "keywords",
          content:
            "法国,巴黎,二手房,法国二手房出售,法国二手房房源,法国二手房买卖,法国二手房交易,找房,买房投资,买房减税,LMNP减税,巴黎房价,achat et vente appartment maison,Paris et toute la France, ancien, LMNP,SCI"
        }
      ]
    };
  },
  data() {
    return {
      img: {
        title: logoT,
        authentication,
        proVip,
        visitCard,
        phone,
        email,
        wxInd,
        pulldow,
        gongyu,
        dingwei
      },
      options: [],
      optionss: [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
        { label: "5+", value: "5+" }
      ],
      quyuC: "",
      dif: "",
      flag: true,
      input1: "",
      cities: [],
      jjrList: [],
      cas: "",
      language: ["英文", "法文", "中文"],
      checkboxGroup4: ["上海"],
      page: 1,
      name: "",
      maxPage: "",
      values: ["", ""],
      valuess: ["", ""],
      max: 0,
      min: 0,
      mins: 0,
      maxs: 0,
      popUpTs1: false,
      popUpTs2: false,
      sorts: 0,
      value: "",
      val: "",
      vals: "",
      listIN: [],
      baseurl: baseUrl.sq
      // baseurl: 'http://192.168.3.84/latest'
    };
  },
  beforeDestroy() {
    if (process.client) {
      window.onscroll = function() {};
    }
  },
  watch: {
    quyuC() {
      this.getListERSLB();
    },
    val() {
      this.getListERSLB();
    },
    vals() {
      this.getListERSLB();
    },
    sorts() {
      this.getListERSLB();
    }
  },
  created() {
    const that = this;
    // sessionStorage.abc = 123
    this.baseurl = this.baseurl + "/map/homesMap";
    this.gets();
    this.getSearchESF();
    if (process.client) {
      window.onscroll = function() {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight == scrollHeight) {
          that.page++;
          // if(that.maxPage<=that.page){return}
          that.getListERSLBs();
        }
      };
    }
  },
  methods: {
    ccc() {
      this.valuess[1] = this.cas;
    },
    routerGo(flags) {
      this.$router.push({
        path: "/seconHandHous",
        query: {
          flag: flags
        }
      });
    },
    cli(val) {
      this.sorts = val;
    },
    popUp1() {
      this.popUpTs1 = !this.popUpTs1;
      this.popUpTs2 = false;
      if (!this.popUpTs1) {
        this.getListERSLB();
      }
    },
    hides() {
      this.popUpTs1 = false;
      this.popUpTs2 = false;
      //console.log(123)
    },
    // popUp2() {
    //     this.popUpTs1 = !this.popUpTs1;
    //     this.getListERSLB()
    // },
    popUpT1() {
      this.popUpTs2 = !this.popUpTs2;
      this.popUpTs1 = false;
      // //console.log(this.popUpTs2)
      if (!this.popUpTs2) {
        this.getListERSLB();
      }
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
    async getSearchESF() {
      const getSearchESFInfo = (await this.$api.article.getSearchESF()).data;
      //console.log(getSearchESFInfo)
      if (getSearchESFInfo.code == 0) {
        this.min = Number(getSearchESFInfo.date.minAcreage);
        this.max = Number(getSearchESFInfo.date.maxAcreage);
        this.valuess[0] = this.min;
        this.valuess[1] = this.max;
        this.mins = Number(getSearchESFInfo.date.minPrice);
        this.maxs = Number(getSearchESFInfo.date.maxPrice);
        this.values[0] = this.mins;
        this.values[1] = this.maxs;
        this.getListERSLB();
      }
    },
    // 获取新的省份
    async gets() {
      const getCityInfo = (await this.$api.article.getRegional()).data;
      if (getCityInfo.code == 0) {
        // this.somecity = getCityInfo.data.retract;
        // this.allcity = getCityInfo.data.spreads;
        this.cities = getCityInfo.data.spreads;
        //console.log(this.cities)
      }
      //console.log(getCityInfo)
    },
    async getListERSLB() {
      var as = {
        page: 1,
        pageSize: 10,
        province: this.quyuC,
        loweAcreage: this.valuess[0] ? this.valuess[0] : this.min,
        highestAcreage:
          this.valuess[1] == this.valuess[0] ? this.max : this.valuess[1],
        lowestHousePrice: this.values[0] ? this.values[0] : this.mins,
        highestHousePrice:
          this.values[1] == this.values[0] ? this.maxs : this.values[1],
        LivingRoomNum: this.vals,
        bedRoomNum: this.val,
        search: this.$route.query.val ? this.$route.query.val : "",
        sort: this.sorts
      };
      // this.$route.query.val = ''
      const getListERSLBInfo = (await this.$api.article.getListERSLB(as)).data;
      // //console.log(getListERSLBInfo.date,getListERSLBInfo.data,)
      if (getListERSLBInfo.code == 0) {
        this.listIN = getListERSLBInfo.data.homesList;
        //console.log(this.listIN)
        this.page = 1;
      }
    },
    async getListERSLBs() {
      var as = {
        page: this.page,
        pageSize: 10,
        province: this.quyuC,
        loweAcreage: this.valuess[0] ? this.valuess[0] : this.min,
        highestAcreage:
          this.valuess[1] == this.valuess[0] ? this.max : this.valuess[1],
        lowestHousePrice: this.values[0] ? this.values[0] : this.mins,
        highestHousePrice:
          this.values[1] == this.values[0] ? this.maxs : this.values[1],
        LivingRoomNum: this.vals,
        bedRoomNum: this.val,
        search: this.$route.query.val ? this.$route.query.val : "",
        sort: this.sorts
      };
      const getListERSLBInfo = (await this.$api.article.getListERSLB(as)).data;
      // //console.log(getListERSLBInfo.date,getListERSLBInfo.data,)
      if (getListERSLBInfo.code == 0) {
        getListERSLBInfo.data.homesList.forEach(item => {
          this.listIN.push(item);
        });
        //console.log(this.listIN)
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
    }
  }
};
</script>

<style lang="scss" scoped>
.seconBrok {
  .headline {
    padding-top: 10px;
    color: #000;
    font-size: 16px;
    span {
      cursor: pointer;
    }
  }
  .oductions {
    color: #000;
    font-size: 32px;
    font-weight: 700;
    padding: 16px;
    padding-bottom: 30px;
  }
  .selectSm {
    background-color: #f7f7f7;
    // height: 195px;
    font-size: 0;
    padding: 34px;
  }
}
.brokerS {
  height: 215px;
  box-sizing: border-box;
  padding-top: 50px;
  .left {
    width: 135px;
    height: 135px;
    float: left;
    border-radius: 68px;
  }
  .Val {
    float: left;
    margin-left: 30px;
  }
}
.colors {
  color: #000 !important;
}
.slideKids {
  position: absolute;
  top: 60px;
  left: -48%;
  width: 288px;
  height: 118px;
  background-color: #ccc;
  padding: 0 20px;
  background-color: #fff;
  box-sizing: border-box;
  padding-top: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}
.priceLabel {
  background-color: #e9e9e9;
  color: #2a2a2a;
  width: 151px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin-right: 3px;
  line-height: 34px;
  font-size: 18px;
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
    left: -48%;
    width: 288px;
    height: 118px;
    background-color: #ccc;
    padding: 0 30px;
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 10px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  }
  .slideKs {
    height: 220px;
  }
  .butss {
    // width:60px;
    padding: 0 10px;
    height: 32px;
    background-color: #234cd3;
    cursor: pointer;
    float: right;
    margin-right: 0px;
    color: #fff;
    border-radius: 3px;
  }
}
.leftssa {
  // display: inline-block;
  position: relative;
  float: left;
  img {
    width: 268px;
    height: 174px;
  }
  .leftsa {
    position: absolute;
    width: 108px;
    height: 86px;
    top: 50%;
    left: 50%;
    margin-top: -43px;
    margin-left: -54px;
  }
}
.rightssa {
  // display: inline-block;
  float: left;
  padding-left: 10px;
}
</style>
<style lang="scss">
.anyEs {
  .el-input__inner {
    height: 34px;
  }
}
.secF {
  margin-right: 3px;
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
</style>
