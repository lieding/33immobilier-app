<template>
  <div class="rentHouseList">
    <headers :class="{ colors: flag }"></headers>
    <div class="centerS rentHouseTop">
      <div class="headline">
        <span>{{ $t("message.global.home") }}</span> /
        <span>{{ $t("message.global.handpick") }}</span>
      </div>
      <div class="footLine">
        <div class="inputSo">
          <el-input
            :placeholder="$t('message.global.plec')"
            v-model="input"
          ></el-input>
          <span @click="btn">{{ $t("message.global.seek") }}</span>
        </div>
        <div class="areaLis quyus">
          <span class="filename">{{ $t("message.global.area") }}</span>
          <div style="display:inline-block;width:800px;vertical-align: top;">
            <el-radio-group v-model="quyu" size="mini">
              <el-radio-button
                v-for="(item, i) in fileList1"
                :label="item"
                :key="i"
              ></el-radio-button>
            </el-radio-group>
            <div style="text-align:center;margin-top:10px;">
              <span
                @click="allCi"
                style="padding:4px 24px;display:inline-block;border:1px solid #214ED4;color:#214ED4;font-size:14px;cursor: pointer;"
              >
                {{
                  qbqy
                    ? $t("message.global.allquyu")
                    : $t("message.global.shouqi")
                }}
              </span>
            </div>
          </div>
        </div>
        <div class="areaLis">
          <span class="filename">{{ $t("message.global.school") }}</span>
          <div
            class="quyus"
            style="display:inline-block;width:800px;vertical-align: top;"
          >
            <el-radio-group v-model="schVal" size="mini">
              <el-radio-button
                v-for="(item, i) in fileList2"
                :label="item"
                :key="i"
              ></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="areaLis">
          <span class="filename">{{ $t("message.global.price") }}</span>
          <el-slider
            @change="chaxun"
            v-model="jiageV"
            range
            :min="min"
            :max="max"
          ></el-slider>
          <div style="display:inline-block;padding-left:20px;">
            <span>{{ jiageV[0] }}€ — {{ jiageV[1] }}€</span>
          </div>
        </div>
        <div class="areaLis zuhF">
          <span class="filename">{{ $t("message.global.tenancy") }}</span>
          <el-radio-group v-model="zulx" size="mini">
            <el-radio-button label>{{
              $t("message.global.allLan")
            }}</el-radio-button>
            <el-radio-button label="0">{{
              $t("message.global.entireTenancy")
            }}</el-radio-button>
            <el-radio-button label="1">{{
              $t("message.global.sublease")
            }}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="titleLine">
        <iframe
          :src="baseurl"
          style="width:1200px;height:400px;"
          frameborder="0"
        ></iframe>
        <span style="vertical-align: bottom;margin-right:10px;">
          {{ $t("message.global.MethodAllRent") }}
        </span>
        <el-popover placement="bottom" width="130" trigger="click">
          <span
            @click="cli(1)"
            style="display:block;padding-top:5px;cursor: pointer;width:133px; text-align:center;border-bottom:1px solid #979797;"
            >{{ $t("message.global.prisGdD") }}</span
          >
          <span
            @click="cli(2)"
            style="display:block;padding-top:5px;cursor: pointer;width:133px;text-align:center;border-bottom:1px solid #979797;"
            >{{ $t("message.global.prisDdG") }}</span
          >
          <!-- <el-button slot="reference">click 激活</el-button> -->
          <span
            slot="reference"
            style="line-height:34px;box-size:border-box;display:inline-block;width:131px;height:38px;background-color:#E9E9E9;vertical-align: middle"
          >
            <img
              style="margin-right:50px;margin-left:10px;vertical-align:middle;width:16px;height:16px;"
              :src="img.sort"
              alt
            />
            <span
              style="margin-right:5px;font-size:16px;vertical-align: middle"
              >{{ $t("message.global.price") }}</span
            >
            <img
              style="vertical-align:middle;width:10px;height:6px;"
              :src="img.goDown"
              alt
            />
          </span>
        </el-popover>
      </div>
      <div
        class="ListNo"
        @click="routerGo(item.id)"
        v-for="(item, inde) in ListNoLis"
        :key="inde"
      >
        <span style="position:relative;float: left;">
          <img class="img" :src="item.showUrl" alt />
          <img
            v-show="item.isOpenVR"
            style="position:absolute;width:268px;height:174px;top:0;left:0;"
            src="~/assets/image/VRlogo.gif"
            alt
          />
        </span>
        <div class="centerL">
          <span class="layX">
            {{
              item.rentType
                ? $t("message.global.grouping")
                : $t("message.global.entireTenancy")
            }}
          </span>
          <span class="layY">{{ item.title }}</span>
          <span class="layZ">{{ item.bigProvince }}/ {{ item.province }}</span>
          <div style="margin-top:10px;">
            <span
              style="padding:1px 3px;display:inline-block;background-color:#BFBFBFFF;margin-right:10px;"
            >
              {{
                item.source
                  ? $t("message.global.Personal")
                  : $t("message.global.Intermediary")
              }}
            </span>
            <span
              style="padding:1px 3px;display:inline-block;background-color:#BFBFBFFF;"
              v-show="!item.school"
              >{{ $t("message.global.jinxuexiao") }}</span
            >
          </div>
        </div>
        <div class="centerR">
          <span class="prise">{{ item.total }}€</span>
          <br />
          <!-- <span></span> -->
          <div class="economics">
            <img class="imgs" :src="item.contactUrl" alt />
            <span class="names">{{ item.contactName }}</span>
            <span class="card">
              <img :src="img.phone" alt />
              {{ item.contactPhone }}
            </span>
            <span class="card">
              <img :src="img.email" alt />
              {{ $t("message.global.mail") }}
            </span>
            <span class="card" v-show="item.contactWx">
              <img :src="img.wxInd" alt />
              {{ item.contactWx }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <foots></foots>
  </div>
</template>

<script>
import headers from "~/components/PcIndex/header.vue";
import foots from "~/components/PcIndex/foot.vue";
import titles from "~/assets/image/titles.jpg";
import goDown from "~/assets/image/goDown.png";
import sort from "~/assets/image/sort.png";
import phone from "~/assets/image/phone.png";
import email from "~/assets/image/email.png";
import wxInd from "~/assets/image/wxInd.png";
import vrVlog from "~/assets/image/VRlogo.gif";

import baseUrl from "~/api/base.js";

export default {
  name: "rentHouseList",
  middleware: "responsive",
  components: {
    headers,
    foots
  },
  head() {
    return {
      title: "法国租房_出租房源_法国租房就上法国33找房",
      meta: [
        {
          name: "description",
          content:
            "法国33找房租房频道为您查找真实优质的法国出租房源,包括法国整租、合租、公寓出租等信息,法国出租房东联系信息、经纪人信息、品牌公寓等信息。找法国租房房源,就上法国33找房"
        },
        {
          name: "keywords",
          content:
            "法国租房,法国出租房源,分租,合租,整租,买房出租,法国买房投资,法国学区房"
        }
      ]
    };
  },
  data() {
    return {
      flag: true,
      input: "",
      fileList: [],
      fileList1: "",
      fileList2: [],
      schVal: "Tout",
      quyu: "Tout sélectionner",
      zulx: "",
      jiageV: [0, 0],
      img: {
        goDown,
        sort,
        titles,
        phone,
        email,
        wxInd,
        vrVlog
      },
      min: 0,
      max: 0,
      page: 1,
      schoolId: "",
      sort: 0,
      ListNoLis: [],
      zulxs: "",
      baseurl: baseUrl.sq,
      allcity: "",
      somecity: "",
      qbqy: true
      // baseurl: 'http://192.168.3.84/latest'
    };
  },
  created() {
    this.baseurl = this.baseurl + "/map/rentMap";
    this.input = this.$route.query.val;
    this.getSearchEs();
    this.btn();
    var $that = this;
    //console.log($that)
    if (process.client) {
      window.onscroll = function() {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight == scrollHeight) {
          $that.page = $that.page + 1;
          if ($that.maxPage <= $that.page) {
            return;
          }
          $that.btns();
        }
      };
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.onscroll = function() {};
    }
    d;
  },
  watch: {
    quyu() {
      this.btn();
    },
    schVal() {
      this.btn();
    },
    sort() {
      this.btn();
    },
    zulx() {
      this.btn();
    }
    // jiageV() {

    //     setTimeout(()=> {
    //         this.btn()
    //     },1000)
    // }
  },
  methods: {
    allCi() {
      if (this.qbqy) {
        this.fileList1 = this.allcity;
        d;
      } else {
        this.fileList1 = this.somecity;
      }

      this.qbqy = !this.qbqy;
    },
    routerGo(flags) {
      this.$router.push({
        path: "/renting",
        query: {
          flag: flags
        }
      });
    },
    cli(val) {
      // this.sort?this.sort=1:this.sort=2;
      // // this.sort = 2
      // //console.log(this.sort)
      this.sort = val;
    },
    chaxun() {
      this.btn();
    },
    async getSearchEs(par) {
      const getSearchEsInfo = (await this.$api.article.getSearchEs(par)).data;
      if (getSearchEsInfo.code == 0) {
        this.fileList = getSearchEsInfo.date.schoolList;
        getSearchEsInfo.date.schoolList.forEach(item => {
          this.fileList2.push(item.schoolName);
        });
        this.min = Number(getSearchEsInfo.date.minPrice);
        this.max = Number(getSearchEsInfo.date.maxPrice);
        this.jiageV[0] = this.min;
        this.jiageV[1] = this.max;
        //console.log(this.min, this.max)
        //console.log(getSearchEsInfo);
      }
      const getCityInfo = (await this.$api.article.getRegional()).data;
      if (getCityInfo.code == 0) {
        this.somecity = getCityInfo.data.retract;
        this.allcity = getCityInfo.data.spreads;
        this.fileList1 = this.somecity;
      }
    },
    async btn() {
      //console.log(this.quyu, this.schVal, this.zulx,this.jiageV)
      this.fileList.forEach(item => {
        if (item.schoolName == this.schVal) {
          this.schoolId = item.id;
        }
      });
      //console.log(this.zulx)
      this.zulxs = this.zulx;

      const vr = {
        page: 1,
        pageSize: 10,
        province: this.quyu,
        schoolId: this.schoolId,
        rentType: this.zulxs,
        minPrice: this.jiageV[0],
        maxPrice: this.jiageV[1] != this.min ? this.jiageV[1] : this.max,
        search: this.input,
        sort: this.sort
      };
      //console.log(vr)
      // this.$route.query.val = ''
      // return
      const getRentingListInfo = (await this.$api.article.getRentingList(vr))
        .data;
      if (getRentingListInfo.code == 0) {
        this.ListNoLis = getRentingListInfo.data.rentingPoLists;
        //console.log(this.ListNoLis)
        this.page = 1;
      }
    },
    async btns() {
      //console.log(this.quyu, this.schVal, this.zulx,this.jiageV)
      this.fileList.forEach(item => {
        if (item.schoolName == this.schVal) {
          this.schoolId = item.id;
        }
      });
      const vr = {
        page: this.page,
        pageSize: 10,
        province: this.quyu,
        schoolId: this.schoolId,
        minPrice: this.jiageV[0],
        maxPrice: this.jiageV[1] != this.min ? this.jiageV[1] : this.max,
        rentType: this.zulx,
        search: this.input,
        sort: this.sort
      };
      //console.log(vr,123)
      // return
      const getRentingListInfo = (await this.$api.article.getRentingList(vr))
        .data;
      if (getRentingListInfo.code == 0) {
        getRentingListInfo.data.rentingPoLists.forEach(item => {
          this.ListNoLis.push(item);
        });
        //console.log(this.ListNoLis)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.colors {
  color: #000 !important;
}
.rentHouseList {
  .rentHouseTop {
    .headline {
      padding-top: 20px;
      padding-bottom: 10px;
      color: #000;
      font-size: 16px;
      span {
        cursor: pointer;
      }
    }
    .footLine {
      background-color: #f7f7f7;
      box-sizing: border-box;
      width: 1200px;
      padding: 24px;
      .inputSo {
        font-size: 0;
        span {
          display: inline-block;
          width: 86px;
          height: 36px;
          background-color: #4d6dda;
          vertical-align: top;
          cursor: pointer;
          font-size: 16px;
          color: #fff;
          text-align: center;
          line-height: 36px;
        }
      }
      .areaLis {
        margin-top: 10px;
        .filename {
          margin-right: 83px;
          font-size: 16px;
          color: #000;
          font-weight: 600;
        }
      }
    }
    .titleLine {
      font-size: 32px;
      color: #000;
      font-weight: 600;
      padding: 25px 0;
    }
    .ListNo {
      margin-top: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      .img {
        float: left;
        width: 268px;
        height: 174px;
      }
      .centerL {
        float: left;
        margin-left: 10px;
        width: 318px;
        .layX {
          display: inline-block;
          font-size: 12px;
          color: #fff;
          background-color: #6ac078;
          padding: 0 5px;
          height: 22px;
          text-align: center;
          line-height: 22px;
        }
        .layY {
          display: block;
          margin-top: 26px;
          font-size: 18px;
          color: #000;
          font-weight: 600;
          height: 48px;
          overflow: hidden;
          display: -webkit-box; //将对象作为弹性伸缩盒子模型显示;
          text-overflow: ellipsis; //溢出部分用省略号代替
          -webkit-line-clamp: 2; //设置文本显示两行
          white-space: normal;
          -webkit-box-orient: vertical;
        }
        .layZ {
          display: block;
          margin-top: 16px;
          font-size: 16px;
          color: #b5b5b5;
          font-weight: 400;
        }
      }
      .centerR {
        float: right;
        // width:450px;
        text-align: right;
        .prise {
          float: right;
          color: red;
          font-size: 28px;
          font-weight: 600;
        }
        .economics {
          float: right;
          margin-top: 80px;
          .imgs {
            width: 40px;
            margin-right: 10px;
            height: 39px;
            border-radius: 50%;
            vertical-align: middle;
          }
          .names {
            font-size: 18px;
            color: #000;
            vertical-align: middle;
            display: inline-block;
          }
          .card {
            margin-left: 10px;
            padding: 9px;
            display: inline-block;
            height: 32px;
            box-sizing: border-box;
            background-color: #f7f7f7;
            line-height: 0;
            font-size: 14px;
            color: #3f3f3f;
            vertical-align: middle;
            img {
              width: 13px;
              margin-right: 5px;
              // height: 13px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.quyus {
  .el-radio-button__inner {
    border: none !important;
    background-color: rgba(0, 0, 0, 0) !important;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #214ed4 !important;
  }
  .el-radio-button {
    width: 20%;
    // text-align: center;
  }
}
.zuhF {
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #214ed4 !important;
  }
  .el-radio-button__inner {
    border: none !important;
    background-color: rgba(0, 0, 0, 0) !important;
  }
}
.el-slider__bar {
  background-color: #214ed4 !important;
}
</style>
