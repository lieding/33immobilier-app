<template>
  <div class="newList" @click="hides">
    <headers
      style="position:fixed;top:0;left:0;right:0;background-color:#fff;z-index:1000;"
      :class="{ colors: true, clearfix: true }"
    ></headers>
    <div class="centerS rentHouseTop clearfix">
      <div class="lefts">
        <div class="headline" style="position:fixed;">
          <span>{{ $t("message.global.home") }}</span> /
          <span>{{ $t("message.global.homeList") }}</span>
        </div>
        <div class="iframes" style="height:82%;width:42%;">
          <template v-if="placeInfo && placeInfo.longitude && placeInfo.latitude">
            <jump-map
              :latitude="placeInfo.latitude"
              :longitude="placeInfo.longitude"
              :init-zoom="11"
            ></jump-map>
          </template>
        </div>
      </div>
      <div class="rights" style="padding-top:51px;">
        <p class="tit">{{ $t("message.global.method") }}</p>
        <div class="priceLabel" style="width:140px" @click.stop="togglePriceSlide">
          <span>
            <span style="font-size: 18px;">
              {{ $t("message.global.price") }}
            </span>
            <img
              :src="img.pulldow"
              alt=""
              style="position: absolute;top: 50%; right: 20px;"
            />
          </span>
          <div class="slideKids" v-show="priceSlideVis">
            <el-slider v-model="priceRange" :max="maxPrice" :min="minPrice" range>
            </el-slider>
            <p style="overflow:hidden">
              <span style="float:left;"> {{ fmoney(priceRange[0], 1) }} </span>
              <span style="float:right;">{{ fmoney(priceRange[1], 1) }}</span>
            </p>
            <div class="butss" @click.stop="togglePriceSlide">
              {{ $t("message.global.sure") }}
            </div>
          </div>
        </div>
        <el-select
          multiple
          class="secF"
          style="border-left: 1px solid #ccc;"
          v-model="completionStatusArr"
          :placeholder="$t('message.NEW_LIST.ALL_COMPLETION_STATUS')"
        >
          <el-option v-for="it in CompletionStatusOption" :key="it.value" :label="it.label" :value="it.value"></el-option>
        </el-select>
        <el-select
          multiple
          class="secF"
          style="border-left: 1px solid #ccc;"
          v-model="selectedTypologies"
          :placeholder="$t('message.NEW_LIST.ALL_TYPOLOGY_LABEL')"
        >
          <el-option v-for="it in typologyOptions" :key="it.value" :label="it.label" :value="it.value"></el-option>
        </el-select>
        <!-- Programe List -->
        <div v-for="(itemss, inde) in programList" :key="inde" @click="toDetail(itemss)" class="listNews">
          <img :src="itemss.images[0]" class="leftImg" alt="" />
          <div class="rightLisT">
            <p>
              <span class="tag oneNo">{{ itemss.taxArea }}</span>
              <span class="tag NOtwo">{{ itemss.deliveryQuarter }}</span>
            </p>
            <p class="RIghtTit">{{ itemss.estate_name }}</p>
            <p>
              <img :src="img.dingwei" alt="" />
              &nbsp;
              <span class="citiyes">{{ itemss.zip_code }}/{{ itemss.city }}</span>
            </p>
            <p>
              <img :src="img.homeS" alt="" />
              &nbsp;
              <span class="citiyes">
                {{ itemss.translatedTypologies.join(',') }}
              </span>
            </p>
            <p class="prisesInd">{{ itemss.availablePropertiesMinPrice }}€ - {{ itemss.availablePropertiesMaxPrice }}€</p>
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

import pulldow from "~/assets/image/pullDow.png";
import dingwei from "~/assets/image/dingwei.png";
import titles from "~/assets/image/titles.jpg";
import homeS from "~/assets/image/homeS.png";
import { fmoney, scrollListener } from '../utils';
import JumpMap from '../components/jumpMap.vue';
export default {
  name: "newList",
  middleware: "responsive",
  components: {
    headers,
    foots,
    JumpMap,
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
      placeInfo: null,
      priceRange: ["", ""],
      priceSlideVis: false,
      completionStatusArr: [],
      typologyOptions: [],
      selectedTypologies: [],
      maxPrice: 0,
      minPrice: 0,
      programList: [],
      page: 1,
      maxPage: 1,
      isLoading: false
    };
  },
  computed: {
    finished () {
      return this.page >= this.maxPage;
    }
  },
  created() {
    this.fmoney = fmoney;
    this.placeText = this.$route.query.place_text;
    this.img = { titles, dingwei, pulldow, homeS};
    this.CompletionStatusOption =
      CompletionStatusOptionConfig.map(({ key, I18NKey }) => ({ value:key, label: this.$t(`message.NEW_LIST.${I18NKey}`) }));
    this.TypologyOption = TypologyOptionConfig
      .map(({ incluedKey, I18NKey }) => ({ value: incluedKey, incluedKey, label: this.$t(`message.NEW_LIST.${I18NKey}`) }));
  },
  mounted () {
    this.getSearchNew();
    // this.__scrollCbk = () =>
    //   !this.finished && scrollListener(() => this.getListNew(this.page + 1));
    // window.addEventListener('scroll', this.__scrollCbk);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.__scrollCbk);
  },
  methods: {
    togglePriceSlide() {
      this.priceSlideVis = !this.priceSlideVis;
    },
    hides() {
      this.priceSlideVis = false;
    },
    toDetail(item) {
      this.$router.push({
        path: "/newDetails",
        query: {}
      });
    },
    async getSearchNew() {
      const { place_id } = this.$route.query;
      if (!place_id) return;
      const lang = this._i18n.locale;
      const responseData = (await this.$api.article.getProgramesByPlaceid({ place_id, lang })).data;
      const { placeInfo, programes } = responseData || {};
      if (placeInfo?.longitude && placeInfo?.latitude) {
        this.placeInfo = placeInfo;
      }
      if (Array.isArray(programes)) {
        const { minPrice, maxPrice, typologyOptionKeys } = handleProgrames(programes, this.TypologyOption);
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
        this.priceRange = [ minPrice, maxPrice ];
        this.typologyOptions = typologyOptionKeys
          .map(key => this.TypologyOption.find(it => it.value === key)).filter(Boolean);
        this.programList = programes;
      }
    },
  },
};

function handleProgrames (programes, TypologyOption) {
  let minPrice = 0, maxPrice = 0, typologyOptionKeySet = new Set();
  const date = new Date(), curYear = date.getFullYear(),
    month = date.getMonth() + 1,
    quarter = Math.ceil(month / 3);
  for (const it of programes) {
    const { availablePropertiesMaxPrice: max, availablePropertiesMinPrice: min, typologies } = it;
    setCompletionStatusFlag(it, curYear, quarter);
    if (max > maxPrice) maxPrice = max;
    if (minPrice === 0) minPrice = min;
    else if (min < minPrice) minPrice = min;
    if (Array.isArray(typologies)) {
      const translatedTypologies = [];
      for (let typology of typologies) {
        typology = typology.toLowerCase();
        const config = TypologyOptionConfig.find(config => typology.includes(config.incluedKey));
        if (config) {
          typologyOptionKeySet.add(config.incluedKey);
          translatedTypologies.push(TypologyOption.find(it => it.value === config.incluedKey)?.label);
        }
      }
      it.translatedTypologies = translatedTypologies.filter(Boolean);
    }
  }
  return { minPrice, maxPrice, typologyOptionKeys: Array.from(typologyOptionKeySet) };
}

function setCompletionStatusFlag (item, curYear, curQuarter) {
  if (item.delivered)
    return (item.completionFlag = CompletionStatusKey.DELIVERED);
  if (item.deliveryQuarter) {
    const [ year, quarter ] = item.deliveryQuarter?.split('T').map(it => Number(it)) ?? [];
    if (year < curYear) item.completionFlag = CompletionStatusKey.DELIVERED;
    else if (year === curYear) {
      if (quarter < curQuarter) item.completionFlag = CompletionStatusKey.DELIVERED;
      else item.completionFlag = CompletionStatusKey.SIX_MONTH;
    } else {
      if (year - curYear < 2) item.completionFlag = CompletionStatusKey.SIX_TWELVE_MONTH;
      else if (year - curYear > 3) item.completionFlag = CompletionStatusKey.MORE_THAN_TWO_YEAR;
      else item.completionFlag = CompletionStatusKey.ONE_TWO_YEAR;
    }
  }
}

const CompletionStatusKey = {
  SIX_MONTH: 'SIX_MONTH',
  SIX_TWELVE_MONTH: 'SIX_TWELVE_MONTH',
  ONE_TWO_YEAR: 'ONE_TWO_YEAR',
  MORE_THAN_TWO_YEAR: 'MORE_THAN_TWO_YEAR',
  DELIVERED: 'DELIVERED',
}

const CompletionStatusOptionConfig = [
  { key: CompletionStatusKey.SIX_MONTH, I18NKey: 'COMPLETION_STATUS_OPTION_TO_SIX_MONTHS' },
  { key: CompletionStatusKey.SIX_TWELVE_MONTH, I18NKey: 'COMPLETION_STATUS_OPTION_SIX_TO_TWELVE_MONTHS' },
  { key: CompletionStatusKey.ONE_TWO_YEAR, I18NKey: 'COMPLETION_STATUS_OPTION_ONE_TO_TWO_YEARS' },
  { key: CompletionStatusKey.MORE_THAN_TWO_YEAR, I18NKey: 'COMPLETION_STATUS_OPTION_MORE_THAN_TWO_YEARS' },
  { key: CompletionStatusKey.DELIVERED, I18NKey: 'COMPLETION_STATUS_OPTION_DELIVERED' }
];

// we filter the input if includes the key
const TypologyOptionConfig = [
  { incluedKey: 'studio', I18NKey: 'TYPOLOGY_OPTION_LABEL_STUDIO' },
  { incluedKey: 't1', I18NKey: 'TYPOLOGY_OPTION_LABEL_T1' },
  { incluedKey: 't2', I18NKey: 'TYPOLOGY_OPTION_LABEL_T2' },
  { incluedKey: 't3', I18NKey: 'TYPOLOGY_OPTION_LABEL_T3' },
  { incluedKey: 't3 bis', I18NKey: 'TYPOLOGY_OPTION_LABEL_T3_BIS' },
  { incluedKey: 't4', I18NKey: 'TYPOLOGY_OPTION_LABEL_T4' },
  { incluedKey: 't5', I18NKey: 'TYPOLOGY_OPTION_LABEL_T5' },
  { incluedKey: 't6', I18NKey: 'TYPOLOGY_OPTION_LABEL_T6' },
  { incluedKey: 'maison t6', I18NKey: 'TYPOLOGY_OPTION_LABEL_MAISON_T6' },
  { incluedKey: 'maison individuelle', I18NKey: 'TYPOLOGY_OPTION_LABEL_MAISON_INDIVIDUELEL' },
  { incluedKey: 'maison', I18NKey: 'TYPOLOGY_OPTION_LABEL_MAISON' },
  { incluedKey: 'villa', I18NKey: 'TYPOLOGY_OPTION_LABEL_VILLA' },
  { incluedKey: 'duplex', I18NKey: 'TYPOLOGY_OPTION_LABEL_DUPLEX' },
  { incluedKey: 'triplex', I18NKey: 'TYPOLOGY_OPTION_LABEL_TRIPLEX' },
  { incluedKey: 'box', I18NKey: 'TYPOLOGY_OPTION_LABEL_BOX' },
  { incluedKey: 'parking', I18NKey: 'TYPOLOGY_OPTION_LABEL_PARKING' },
  { incluedKey: 'appartement', I18NKey: 'TYPOLOGY_OPTION_LABEL_APPARTEMENT' },
  { incluedKey: 'bureau', I18NKey: 'TYPOLOGY_OPTION_LABEL_BUREAU' },
  { incluedKey: 'commercial', I18NKey: 'TYPOLOGY_OPTION_LABEL_COMMERCIAL' },
  { incluedKey: 'chambre', I18NKey: 'TYPOLOGY_OPTION_LABEL_CHAMBRE' },
  { incluedKey: 'suite', I18NKey: 'TYPOLOGY_OPTION_LABEL_SUITE' },
  { incluedKey: 'unité vie', I18NKey: 'TYPOLOGY_OPTION_LABEL_SUITE' },
  { incluedKey: 'cellier', I18NKey: 'TYPOLOGY_OPTION_LABEL_CELLIER' },
]
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
