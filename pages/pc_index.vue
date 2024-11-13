<template>
  <div id="index" :style="{ backgroundImage: backgroundImage }">
    <!-- 头 -->
    <headers :vas="true"></headers>
    <div class="character">{{ $t("message.global.Apartment") }}</div>
    <div class="centerSs main-section">
      <!-- 中 -->
      <div class="listSmall">
        <span
          :class="{ listSmallT: true, emphasis: searchMode === SearchMode.NewPrograme }"
          @click="toggleSearchMode(SearchMode.NewPrograme)"
        >{{ $t("message.global.NewHouse") }}</span>
        <span
          :class="{ listSmallT: true, emphasis: searchMode === SearchMode.SecondHand }"
          @click="toggleSearchMode(SearchMode.SecondHand)"
        >{{ $t("message.global.second-hand") }}</span>
      </div>
      <div class="city-search-wrapper">
        <el-autocomplete
          v-model="searchVal"
          :placeholder="$t('message.global.Where')"
          :trigger-on-focus="false"
          :fetch-suggestions="queryCity"
          @select="queryCityHandler"
        ></el-autocomplete>
        <el-button type="primary" icon="el-icon-search" class="search-button" :loading="loadingPointInfo" @click="searchBtnHandler">
          {{ $t("message.PAGE_INDEX.SELECT_CITY") }}
        </el-button>
      </div>
      <div class="cardLs">
        <div style="float:left;" @click="routerChange('/essaydetails', 3)">
          <img src="~/assets/image/searchHouse.png" alt />
          <span style="display:inline-block;padding-left:30px;">
            <p style="font-weight:600;">
              {{ $t("message.global.reductions") }}
            </p>
            <p style="margin-top:5px;font-size:16px;">
              {{ $t("message.global.enjoy") }}
            </p>
          </span>
        </div>
        <div style="float:right;" @click="routerChange('/sellers')">
          <img src="~/assets/image/houses.png" alt />
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
        </div>
        <p class="characterP">{{ $t("message.global.precedence") }}</p>
        <div class="newHoList">
          <div
            class="NewLi"
            @click="routerChange('/newDetails', { zip_code: item.zip_code, name_id: item.name_id, estate_name: item.estate_name, city: item.city })"
            v-for="(item, index) in homePageInfo.newHousings"
            :key="index"
            :class="[index == 3 ? 'marginRigh' : '']"
          >
            <span class="city">
              <span class="provinces">{{ item.zip_code }}</span>
              <span style="text-shadow:2px 2px 3px rgba(0,0,0,0.5);">{{
                item.city
              }}</span>
            </span>
            <span class="rightFlo">{{ item.deliveryQuarter }}</span>
            <img class="newHoImg" :src="item.images[0]" alt />
            <p class="newHoTit">{{ item.name }}</p>
            <p class="newHoPr">
              {{ item.availablePropertiesCount }} {{ $t("message.global.pieces") }}
            </p>
            <div class="tallylis">
              <span class="tally" v-for="(tags, i) in item.tags" :key="i">{{
                tags
              }}</span>
            </div>
            <div class="newPrice">
              {{ item.availablePropertiesMinPrice }} {{ $t("message.global.euro") }}
            </div>
          </div>
        </div>
      </div>
      <!-- 底-二手 -->
      <!-- <div class="secondHoB">
        <div class="secondTit">
          <span class="secondL">{{ $t("message.global.ordapartment") }}</span>
          <span class="secondR" @click="routerChange('/anyEs', false)">{{
            $t("message.global.AllNewHomes")
          }}</span>
        </div>
        <div class="newHoList">
          <div
            class="NewLi"
            v-for="(items, index) in homePageInfo.homesList"
            :key="index"
            :class="[index == 3 ? 'marginRigh' : '']"
          >
            <img
              class="newHoImg"
              @click="routerChange('/seconHandHous', items.id)"
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
      </div> -->
      <!-- 底-租房 -->
      <div class="rentingHoB">
        <div class="secondTit">
          <span class="secondL">{{ $t("message.global.handpick") }}</span>
          <span class="secondR" @click="routerChange('/rentHouseList', true)">{{ $t("message.global.Allhand") }}</span>
        </div>
        <div class="newHoList">
          <div
            @click="routerChange('/renting', items.id)"
            class="NewLi"
            v-for="(items, index) in homePageInfo.rentings"
            :key="index"
            :class="[index == 3 ? 'marginRigh' : '']"
          >
            <div>
              <span class="city">
                <span
                  class="provinces"
                  style="font-weight:600;font-size:11px;"
                >
                  {{ items.rentType ? $t("message.global.joint") : $t("message.global.grouping") }}
                </span>
              </span>
              <img class="newHoImg" :src="items.showUrl" alt />
              <p class="newHoTit">{{ items.title }}</p>
              <p class="newHoPr">{{ items.province }} {{ items.city }}</p>
              <div class="tallylis">
                <span class="tally">{{ items.source ? $t("message.global.Personal") : $t("message.global.Intermediary") }}</span>
                <span class="tally" v-if="!items.isSchools">{{ $t("message.global.jinxuexiao") }}</span>
              </div>
              <div class="newPrice">{{ items.total }} €</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="join-me">
      <div class="centerSs">
        <img class="join-img" :src="img.pcBroker" alt />
        <span class="join-text">{{ $t("message.global.JOIN_AND_BECOME_AGENT") }}</span>
        <span class="join-but" @click="openContactDialog">
          <img :src="img.pcPerson" alt />
          {{ $t("message.global.join") }}
        </span>
      </div>
    </div>
    <client-only>
      <!-- 房价走势 -->
      <trend-chart />
      <el-dialog :title="$t('message.PAGE_INDEX.SELECT_CITY')" :visible.sync="selectCityDialoVis" center width="75%">
        <leaflet-map :mobile="false" :points="newProgramePoints" :visible="selectCityDialoVis" :marker-grouped="true" @pointSelect="programeCityPointSelectHandler" />
      </el-dialog>
      <contact-dialog
        :visible="contactDialogVis"
        :titles="[]"
        :confirm-btn-loading="postjoinApplicationLoading"
        @close="contactDialogVis = false"
        @confirm="contactDialogConfirmHandler"
      />
    </client-only>
    <foots></foots>
  </div>
</template>

<script>
// 引入图片
import searchBtPn from "~/assets/image/searchBut.png";
import logoT from "~/assets/image/logoT.png";
import sellersT from "~/assets/image/sellers.png";
import backgroundI from "~/assets/image/backPc.png";
import rightCard from "~/assets/image/right.png";
import leftCard from "~/assets/image/left.png";
import pcBroker from "~/assets/image/pcBroker.png";
import pcPerson from "~/assets/image/pcPerson.png";
import pcss from "~/assets/image/logo_promoteur.png";
// 引入
import foots from "~/components/PcIndex/foot.vue";
import headers from "~/components/PcIndex/header.vue";
import { gmapApiLoader } from '../common/gmapApiLoader';
import TrendChart  from '../components/PcIndex/trendChart.vue';
import LeafletMap from '../components/leafletMap.vue';
import { parseRawCsv } from '../utils/csv';
import { CsvUrlConfig, transformNewProgramPoints, PostApplicationMode } from '../common/config';
import ContactDialog from '../components/PcIndex/ContactDialog.vue';

const SearchMode = { NewPrograme: 'NewPrograme', SecondHand: 'SecondHand' };

export default {
  name: "index",
  components: {
    foots,
    headers,
    TrendChart,
    LeafletMap,
    ContactDialog,
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
      contactDialogVis: false,
      selectCityDialoVis: false,
      postjoinApplicationLoading: false,
      loadingPointInfo: false,
      newProgramePoints: null,
      programInfoByCity: null,
      searchMode: SearchMode.NewPrograme, // 标记 选择租房买房
      searchVal: "", // 搜索绑定
      homePageInfo: {}, // 主页数据,
      gmapAutocompleteService: null,
    };
  },
  created () {
    this.SearchMode = SearchMode;
    this.img = {
      // 图片集合
      title: logoT,
      sellersT,
      backgroundI,
      searchBtPn,
      leftCard,
      rightCard,
      pcBroker,
      pcPerson,
      pcss
    };
    this.backgroundImage = `url("${backgroundI}")`;
  },
  mounted () {
    if (process.client) {
      this.queryIndexPageInfo(); // 获取主页信息
      let lang = this._i18n.locale;
      gmapApiLoader(lang)
        ?.then(() => this.gmapAutocompleteService = new window.google.maps.places.AutocompleteService());
    }
  },
  methods: {
    searchBtnHandler () {
      gmapApiLoader(lang)
        ?.then(() => this.gmapAutocompleteService = new window.google.maps.places.AutocompleteService());
      if (this.searchMode === SearchMode.NewPrograme) {
        if (this.newProgramePoints) return this.selectCityDialoVis = true;
        this.loadingPointInfo = true;
        fetch(CsvUrlConfig.ProgramCityDistribution)
          .then(res => res.text())
          .then(txt => parseRawCsv(txt, ','))
          .then(parsed => {
            this.newProgramePoints = transformNewProgramPoints(parsed);
            this.selectCityDialoVis = true;
          })
          .catch(console.error)
          .finally(() => this.loadingPointInfo = false);
      }
    },
    programeCityPointSelectHandler (point) {
      const { city: city_name, lat, lng } = point ?? {};
      if (!city_name) return;
      this.$router.push({ path: `/newList?city_name=${city_name}&lat=${lat}&lng=${lng}` });
    },
    openContactDialog() {
      this.contactDialogVis = true;
    },
    contactDialogConfirmHandler (contact) {
      this.postjoinApplicationLoading = true;
      const lang = this._i18n.locale;
      this.$api.article.postApplication({ mode: PostApplicationMode.JOIN, lang, contact })
        .then(() => {
          this.contactDialogVis = false;
          this.$notify({ title: 'Success', message: this.$t('message.global.APPLICATION_POSTED_SUCCESS'), type: 'success' });
        })
        .catch(console.error)
        .finally(() => this.postjoinApplicationLoading = false);
    },
    toggleSearchMode(val) {
      if (val == this.searchMode) return;
      this.searchMode = val;
    },
    async queryIndexPageInfo() {
      const res = await this.$api.article.getHomePageInfo();
      const homePageInfo = res.data;
      this.homePageInfo = homePageInfo;
    },
    routerChange(smt, flag = undefined) {
      const query = typeof flag === 'object' ? flag : { flag };
      this.$router.push({ path: smt, query });
    },
    queryCity(queryString, cb) {
      if (!queryString) return cb([]);
      const autocomplete = this.gmapAutocompleteService;
      if (!autocomplete) return cb([]);
      autocomplete.getPlacePredictions({
        input: queryString,
        componentRestrictions: {
          country: ['FRA'],
        },
        types: ["(cities)"],
      }).then(res => {
        const predictions = res.predictions;
        if (!Array.isArray(predictions)) return cb([]);
        const list = predictions.map(({ structured_formatting, place_id }) => {
          const { main_text, secondary_text } = structured_formatting;
          return { value: main_text, place_id, place_text: main_text };
        });
        cb(list);
      });
    },
    queryCityHandler (item) {
      const { place_text, place_id } = item;
      if (!place_text || !place_id) return;
      this.$router.push({ path: `/newList?place_text=${place_text}&place_id=${place_id}` });
    },
  },
};

</script>

<style lang="scss" scoped>
#index {
  text-align: left;
  background-repeat: no-repeat;
  background-size: 100% 767px;
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
  .main-section {
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
    .city-search-wrapper {
      display: flex;
      align-items: center;
      width: 1100px;
      padding: 32px 30px 22px;
      background-color: #212739;
      .el-autocomplete {
        flex: 1;
        vertical-align: middle;
        font-size: 22px;
      }
      .el-button {
        margin-left: 20px;
        height: 62px;
        background-color: #234cd3;
        font-size: 22px;
        border: unset;
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
  .join-me {
    background-color: #234cd3;
    height: 220px;
    width: 100%;
    padding: 35px 24px;
    box-sizing: border-box;
    .join-img {
      width: 118px;
      height: 136px;
      vertical-align: middle;
    }
    .join-text {
      color: #fff;
      font-size: 32px;
      vertical-align: middle;
      margin-left: 20px;
    }
    .join-but {
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
<style lang="scss">
.city-search-wrapper {
  .el-autocomplete {
    .el-input {
      input {
        height: 60px;
      }
    }
  }
}
</style>
