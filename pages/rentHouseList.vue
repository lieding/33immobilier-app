<template>
  <div class="rentHouseList">
    <headers :class="{ colors: flag }"></headers>
    <div class="centerS rent-house-top">
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
          <span @click="queryFirstPage">{{ $t("message.global.seek") }}</span>
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
            @change="queryFirstPage"
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
      <div class="iframe-wrapper">
        <iframe
          :src="iframeSrc"
          style="width:1200px;height:400px;"
          frameborder="0"
        />
      </div>
      <div class="list-title">
        <div class="title">
          {{ $t("message.global.MethodAllRent") }}
        </div>
        <el-popover placement="bottom" width="130" trigger="click">
          <div
            @click="sort = 1"
            class="rhl-price-sort-popup-text"
          >{{ $t("message.global.prisGdD") }}</div>
          <div
            @click="sort = 2"
            class="rhl-price-sort-popup-text"
          >{{ $t("message.global.prisDdG") }}</div>
          <div
            slot="reference"
            class="rhl-price-sort-popup-trigger"
          >
            <img :src="img.sort" style="width:16px;height:16px;" alt />
            <span>{{ $t("message.global.price") }}</span>
        </div>
        </el-popover>
      </div>
      <div
        class="ListNo"
        @click="routerGo(item.id)"
        v-for="(item, inde) in rentingItems"
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
          <div class="prise">{{ item.total }}€</div>
          <div class="economics">
            <img class="imgs" src="~/assets/image/avatar.svg" alt />
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
import headers from "~/components/pcindex/header.vue";
import foots from "~/components/pcindex/foot.vue";
import titles from "~/assets/image/titles.jpg";
import goDown from "~/assets/image/goDown.png";
import sort from "~/assets/image/sort.png";
import phone from "~/assets/image/phone.png";
import email from "~/assets/image/email.png";
import wxInd from "~/assets/image/wxInd.png";
import vrVlog from "~/assets/image/VRlogo.gif";

import BaseUrl from "~/api/base.js";
import { scrollListener } from '../utils';

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
    const input = this.$route.query.val;
    return {
      flag: true,
      input,
      fileList: [],
      fileList1: "",
      fileList2: [],
      schVal: "Tout",
      quyu: "Tout sélectionner",
      zulx: "",
      jiageV: [0, 0],
      min: 0,
      max: 0,
      page: 1,
      schoolId: "",
      sort: 0,
      rentingItems: [],
      zulxs: "",
      allcity: "",
      somecity: "",
      qbqy: true,
      maxPage: 1,
    };
  },
  watch: {
    quyu() {
      this.queryFirstPage();
    },
    schVal() {
      this.queryFirstPage();
    },
    sort() {
      this.queryFirstPage();
    },
    zulx() {
      this.queryFirstPage();
    }
  },
  computed: {
    finished () {
      return this.page >= this.maxPage;
    }
  },
  created() {
    this.img = {
      goDown,
      sort,
      titles,
      phone,
      email,
      wxInd,
      vrVlog
    };
    this.iframeSrc = BaseUrl.sq + "/map/rentMap";
    this.getSearchFilters();
    this.queryFirstPage();
  },
  mounted () {
    this.__scrollCbk = () => !this.finished && scrollListener(this.queryMore);
    window.addEventListener('scroll', this.__scrollCbk);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.__scrollCbk);
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
    async getSearchFilters() {
      const getSearchEsInfo = (await this.$api.article.getSearchEs()).data;
      if (getSearchEsInfo.code == 0) {
        this.fileList = getSearchEsInfo.date.schoolList;
        getSearchEsInfo.date.schoolList.forEach(item => {
          this.fileList2.push(item.schoolName);
        });
        this.min = Number(getSearchEsInfo.date.minPrice);
        this.max = Number(getSearchEsInfo.date.maxPrice);
        this.jiageV[0] = this.min;
        this.jiageV[1] = this.max;
      }
      const getCityInfo = (await this.$api.article.getRegional()).data;
      if (getCityInfo.code == 0) {
        this.somecity = getCityInfo.data.retract;
        this.allcity = getCityInfo.data.spreads;
        this.fileList1 = this.somecity;
      }
    },
    queryFirstPage () {
      this.queryList(1);
    },
    queryMore () {
      this.queryList(this.page + 1);
    },
    async queryList(page = 1) {
      this.fileList.forEach(item => {
        if (item.schoolName == this.schVal) {
          this.schoolId = item.id;
        }
      });
      this.zulxs = this.zulx;
      const params = {
        page,
        pageSize: 10,
        province: this.quyu,
        schoolId: this.schoolId,
        rentType: this.zulxs,
        minPrice: this.jiageV[0],
        maxPrice: this.jiageV[1] != this.min ? this.jiageV[1] : this.max,
        search: this.input,
        sort: this.sort
      };
      const { code, data: { rentingPoLists, maxPage } } = (await this.$api.article.getRentingList(params))
        .data;
      if (code !== 0) return;
      this.rentingItems = page === 1 ?
        rentingPoLists : [...this.rentingItems, ...rentingPoLists];
      this.maxPage = maxPage || 1;
      this.page = page;
    }
  }
};
</script>

<style lang="scss" scoped>
.colors {
  color: #000 !important;
}
.rentHouseList {
  .rent-house-top {
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
    .iframe-wrapper {
      padding: 25px 0;
    }
    .list-title {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      .title {
        margin-right: 10px;
        font-size: 32px;
        color: #000;
        font-weight: 600;
      }
    }
    .ListNo {
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
        width: 450px;
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
          margin-top: 8px;
          font-size: 18px;
          color: #000;
          font-weight: 600;
          height: 76px;
          overflow: hidden;
          display: -webkit-box; //将对象作为弹性伸缩盒子模型显示;
          text-overflow: ellipsis; //溢出部分用省略号代替
          -webkit-line-clamp: 3; //设置文本显示两行
          white-space: normal;
          -webkit-box-orient: vertical;
        }
        .layZ {
          display: block;
          margin-top: 8px;
          font-size: 16px;
          color: #b5b5b5;
          font-weight: 400;
        }
      }
      .centerR {
        text-align: right;
        display: flex;
        flex-direction: column;
        height: 174px;
        padding: 50px 0 10px;
        box-sizing: border-box;
        .prise {
          flex: 1;
          color: red;
          font-size: 28px;
          font-weight: 600;
        }
        .economics {
          flex: unset;
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
.rhl-price-sort-popup-text {
  padding-top: 5px;
  cursor: pointer;
  width: 133px;
  text-align: center;
  border-bottom: 1px solid #979797;
}
.rhl-price-sort-popup-trigger {
  display: flex;
  align-items: center;
  background-color:#E9E9E9;
  padding: 4px 8px;
  font-size: 16px;
  span {
    display: inline-block;
    margin-left: 30px;
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
