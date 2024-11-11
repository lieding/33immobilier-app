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
              :points="mapPoints"
              :active-point-idx="activePointIdx"
              @pointSelect="pointSelectHandler"
            ></jump-map>
          </template>
          <template v-else>
            <el-skeleton-item variant="rect" style="width: 240px; height: 240px;" />
          </template>
        </div>
      </div>
      <div class="rights" style="padding-top:51px;">
        <template v-if="dataLoading">
          <el-skeleton :rows="12" />
        </template>
        <template v-else>
          <p class="tit">{{ $t("message.global.method") }}</p>
          <!-- Price range slider -->
          <div class="priceLabel" @click="priceSlideVis = true" v-popover:popover>
            <span style="font-size: 12px;">
              {{ $t("message.global.price") }}
            </span>
            <img
              :src="img.pulldow"
              alt=""
              style="position: absolute;top: 50%; right: 20px;"
            />
          </div>
          <el-popover
            ref="popover"
            placement="right"
            width="220"
            trigger="click"
          >
            <el-slider v-model="priceRange" :max="maxPrice" :min="minPrice" range @input="priceSlideChangeHandler"></el-slider>
            <p style="overflow:hidden">
              <span style="float:left;"> {{ fmoney(priceRange[0], 1) }} </span>
              <span style="float:right;">{{ fmoney(priceRange[1], 1) }}</span>
            </p>
          </el-popover>
          <!-- Compleyion status select -->
          <el-select
            multiple
            class="secF"
            style="border-left: 1px solid #ccc;"
            v-model="completionStatusArr"
            :placeholder="$t('message.NEW_LIST.ALL_COMPLETION_STATUS')"
          >
            <el-option v-for="it in CompletionStatusOption" :key="it.value" :label="it.label" :value="it.value"></el-option>
          </el-select>
          <!-- Typology select 房型选择 -->
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
          <div
            v-for="(itemss, index) in filteredProgramList"
            :key="index"
            class="list-item"
            :class="{ active: index === activePointIdx }"
            @click="selectItem(itemss, index)"
            ref="programItem"
          >
            <el-image :src="itemss.images[0]" :lazy="true">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div class="right-list-item">
              <div v-if="itemss.deliveryQuarter">
                <span class="tag">{{ itemss.deliveryQuarter }}</span>
              </div>
              <div class="title">{{ itemss.estate_name }}</div>
              <div class="info-row">
                <img :src="img.dingwei" alt="" />
                <span class="info">{{ itemss.zip_code }}/{{ itemss.city }}</span>
              </div>
              <div class="info-row">
                <img :src="img.homeS" alt="" />
                <span class="info">
                  {{ itemss.translatedTypologies.join(',') }}
                </span>
              </div>
              <div class="price-range">{{ itemss.availablePropertiesMinPrice }}€ - {{ itemss.availablePropertiesMaxPrice }}€</div>
              <div class="link-btn">
                <el-button icon="el-icon-position" circle @click="listItemClickhandler(itemss)"></el-button>
              </div>
            </div>
          </div>
          <p v-show="isLoading">Loading...</p>
          <p v-show="finished">{{ $t('message.global.noMore') }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import headers from "~/components/PcIndex/header.vue";
import foots from "~/components/PcIndex/foot.vue";

import pulldow from "~/assets/image/pullDow.png";
import dingwei from "~/assets/image/dingwei.png";
import titles from "~/assets/image/titles.jpg";
import homeS from "~/assets/image/homeS.png";
import { fmoney, scrollListener } from '../utils';
import JumpMap from '../components/jumpMap.vue';
import { TypologyOptionConfig } from '../common/config';
import { filterProgrammeListByConditions, CompletionStatusOptionConfig, handleProgrames } from '../utils/list';

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
      dataLoading: true,
      placeInfo: null,
      priceRange: [0, 0],
      priceSlideVis: false,
      completionStatusArr: [],
      typologyOptions: [],
      selectedTypologies: [],
      maxPrice: 0,
      minPrice: 0,
      allProgramList: [],
      filteredProgramList: [],
      activePointIdx: -1,
      page: 1,
      maxPage: 1,
      isLoading: false
    };
  },
  computed: {
    finished () {
      return this.page >= this.maxPage;
    },
    mapPoints () {
      return this.filteredProgramList.map((it, idx) => {
        const { longitude, latitude } = it;
        // const content = translatedTypologies.join(',');
        return { idx, longitude, latitude };
      });
    }
  },
  watch: {
    completionStatusArr (statusArr) {
      this.activePointIdx = -1;
      this.filteredProgramList =
        filterProgrammeListByConditions(this.allProgramList, this.priceRange, statusArr, this.selectedTypologies);
    },
    selectedTypologies (typologies) {
      this.activePointIdx = -1;
      this.filteredProgramList =
        filterProgrammeListByConditions(this.allProgramList, this.priceRange, this.completionStatusArr, typologies);
    },
  },
  created() {
    this.fmoney = fmoney;
    const { place_text, city_name, lat, lng } = this.$route.query;
    this.placeText = place_text || city_name;
    if (lat && lng)
      this.placeInfo = { name: city_name, latitude: Number(lat), longitude: Number(lng) };
    this.img = { titles, dingwei, pulldow, homeS};
    this.CompletionStatusOption =
      CompletionStatusOptionConfig.map(({ key, I18NKey }) => ({ value:key, label: this.$t(`message.NEW_LIST.${I18NKey}`) }));
    this.TypologyOption = TypologyOptionConfig
      .map(({ incluedKey, I18NKey }) => ({ value: incluedKey, incluedKey, label: this.$t(`message.NEW_LIST.${I18NKey}`) }));
  },
  mounted () {
    if (process.client) this.getSearchNew();
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
    selectItem(item, index) {
      this.activePointIdx = index;
    },
    priceSlideChangeHandler () {
      this.activePointIdx = -1;
      clearTimeout(this.__priceRangeChangeTimeout);
      this.__priceRangeChangeTimeout = setTimeout(() => {
        this.filteredProgramList =
          filterProgrammeListByConditions(this.allProgramList, this.priceRange, this.completionStatusArr, this.selectedTypologies);
      }, 500);
    },
    pointSelectHandler (idx) {
      const itemEls = this.$refs.programItem;
      if (!Array.isArray(itemEls)) return;
      const el = itemEls[idx];
      if (!el) return;
      this.activePointIdx = idx;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    async getSearchNew() {
      this.dataLoading = true;
      this.activePointIdx = -1;
      const { place_id, city_name } = this.$route.query;
      if (!place_id && !city_name) return;
      const lang = this._i18n.locale;
      const responseData = (await this.$api.article.searchProgramesByCity({ place_id, lang, city_name })).data;
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
        this.allProgramList = programes;
        this.filteredProgramList = programes.slice();
      }
      this.dataLoading = false;
    },
    listItemClickhandler ({ zip_code, name_id, city, estate_name }) {
      this.$router.push({ path: '/newDetails', query: { zip_code, name_id, city, estate_name } });
    }
  },
};

function shortenPrice (price) {
  if (price > 99999) {
    return (price / 100000).toFixed(1) + 'M';
  }
  return (price / 1000).toFixed(0) + 'K';
}

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
  .lefts, .rights {
    display: inline-block;
    width: 600px;
  }
  .lefts {
    height: 560px;
    position: relative;
  }
  .rights {
    float: right;
    box-sizing: border-box;
    overflow: hidden;
    .tit {
      font-size: 26px;
      color: #000;
      padding: 14px;
      font-weight: 600;
    }
    .list-item {
      display: flex;
      align-items: center;
      margin: 5px 0;
      border-bottom: 1px solid #ccc;
      &.active {
        border: 3px solid blue;
      }
      .el-image {
        flex: unset;
        width: 221px;
        height: 137px;
      }
      .right-list-item {
        flex: 1;
        margin-left: 5px;
        position: relative;
        div {
          margin-bottom: 6px;
        }
        .info-row {
          display: flex;
          align-items: center;
          img {
            width: 12px;
            margin-right: .6em;
          }
          .info {
            font-size: 14px;
            color: #373737;
          }
        }
        .tag {
          display: inline-block;
          font-size: 12px;
          color: #fff;
          padding: 2px;
          background-color: #234cd3;
        }
        .oneNo {
          background-color: #6ac078;
        }
        .title {
          color: #000;
          font-size: 16px;
          font-weight: 600;
        }
        .link-btn {
          position: absolute;
          z-index: 10;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          visibility: hidden;
        }
        .price-range {
          display: block;
          font-size: 16px;
          color: #ff5e5e;
          font-weight: bold;
        }
        &:hover {
          .link-btn {
            visibility: visible;
          }
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
      width: 140px;
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
      font-size: 12px;
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
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 30px;
  background: #f5f7fa;
  color: #909399;
}
</style>
