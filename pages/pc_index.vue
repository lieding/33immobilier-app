<template>
  <div class="index-page">
    <div class="flex-column justify-center align-center top">
      <div class="bold white text-center banner">{{ $t("message.global.INDEX_BANNER") }}</div>
      <div class="city-search-wrapper">
        <client-only>
          <el-autocomplete
            v-model="searchVal"
            :placeholder="$t('message.global.INDEX_SEARCH_PLACEHOLDER')"
            :trigger-on-focus="false"
            :fetch-suggestions="queryCity"
            :debounce="1000"
            @select="locationAutocompleteSelectHandler"
          >
            <el-select v-model="searchMode" slot="prepend">
              <el-option :label="$t('message.global.NEW_PROGRAME')" :value="SearchMode.NewPrograme"></el-option>
              <el-option :label="$t('message.global.SECOND_HAND')" :value="SearchMode.SecondHand"></el-option>
              <el-option :label="$t('message.global.RENTING')" :value="SearchMode.Renting"></el-option>
            </el-select>
            <!-- <el-button slot="append" icon="el-icon-right" class="search-btn" circle></el-button> -->
          </el-autocomplete>
        </client-only>
      </div>
    </div>
    <div class="main-section">
      <div class="section-part section-title bold">{{ $t('message.global.Where') }}</div>
      <div class="section-part">
        <index-city-bar @select="moreProgramesClickHandler" />
      </div>
      <template v-if="programesGroupedByCities">
        <div class="section-part section-title bold">
          {{ $t('message.global.NEW_PROGRAME') }}
        </div>
        <div class="section-part min-mt city-selection flex">
          <div
            v-for="it in programesGroupedByCities" :key="it.city"
            class="item"
            :class="{ active: activeProgrameCityKey === it.city }"
            @click="activeProgrameCityKey = it.city"
          >
            {{ it.city }}
          </div>
        </div>
        <div class="section-part min-mt cards flex">
          <div v-for="item in selectedProgrames" :key="item.id" class="item" @click="handleProgrameClickHandler(item)">
            <img :src="item.image" />
            <div class="estate-name bold">{{ item.estate_name }}</div>
            <div class="zipcode-city">{{ item.zip_code }} / {{ item.city }}</div>
            <div class="price bold">{{ item.price }}</div>
          </div>
        </div>
        <div class="full-w flex justify-center" style="margin-top: 24px;">
          <div class="blue-button long" @click="moreProgramesClickHandler()">{{ $t('message.PAGE_INDEX.MORE') }}</div>
        </div>
      </template>
      <template v-if="secondHandGroupedByCities">
        <div class="section-part section-title bold">
          {{ $t('message.global.SECOND_HAND') }}
        </div>
        <div class="section-part min-mt city-selection flex">
          <div
            v-for="it in secondHandGroupedByCities" :key="it.city"
            class="item"
            :class="{ active: activeSecondhandCityKey === it.city }"
            @click="activeSecondhandCityKey = it.city"
          >
            {{ it.city }}
          </div>
        </div>
        <div class="section-part min-mt cards flex">
          <div v-for="item in selectedSecondHand" :key="item.id" class="item" @click="handleSecondHandClickHandler(item)">
            <img :src="item.image" />
            <div class="estate-name bold">{{ item.title }}</div>
            <div class="zipcode-city">{{ item.zip_code }} / {{ item.city }}</div>
            <div class="price bold">{{ item.price }}</div>
          </div>
        </div>
        <div class="full-w flex justify-center" style="margin-top: 24px;">
          <div class="blue-button long" @click="moreSecondHandClickHandler()">{{ $t('message.PAGE_INDEX.MORE') }}</div>
        </div>
      </template>
      <div class="section-part join-us">
        <div class="section-title bold">
          {{ $t('message.global.JOIN_US_TITLE') }}
        </div>
        <div class="subtitle">
          {{ $t('message.global.JOIN_US_SUBTITLE') }}
        </div>
        <div class="blue-button" @click="openContactDialog">
          {{ $t('message.global.CONTACT_US') }}
        </div>
      </div>
      <!-- 房价走势 -->
      <div class="section-part section-title bold">
        {{ $t('message.global.TREND_TITLE') }}
        <div class="sub">{{ $t('message.global.TREND_SUB_TITLE') }}</div>
      </div>
      <div class="section-part">
        <client-only>
          <trend-chart />
        </client-only>
      </div>
      <div class="section-part sell-rent-banner">
        <div class="section-title bold white">{{ $t('message.PAGE_INDEX.SELL_RENT_BANNER.TITLE') }}</div>
        <div class="white subtitle">{{ $t('message.PAGE_INDEX.SELL_RENT_BANNER.SUBTITLE') }}</div>
        <div class="contact-btn bold" @click="openContactDialog">{{ $t('message.global.CONTACT_US') }}</div>
        <img class="bg" src="/sell-rent-banner-bg.webp" alt />
      </div>
      <div class="section-part section-title bold">
        {{ $t('message.global.instrument') }}
      </div>
      <div class="section-part min-mt">
        <client-only>
          <calculator />
        </client-only>
      </div>
      <div class="section-part section-title bold">
        {{ $t('message.PAGE_INDEX.PARTNER_TITLE') }}
        <div class="sub">{{ $t('message.PAGE_INDEX.PARTNER_SUBTITLE_1') }}</div>
        <div class="sub">{{ $t('message.PAGE_INDEX.PARTNER_SUBTITLE_2') }}</div>
        <img src="/partner.png" style="width: 100%"/>
      </div>
    </div>
    <client-only>
      <contact-dialog
        :visible="contactDialogVis"
        :titles="[]"
        :confirm-btn-loading="postjoinApplicationLoading"
        @close="contactDialogVis = false"
        @confirm="contactDialogConfirmHandler"
      />
    </client-only>
  </div>
</template>

<script>
import { gmapApiLoader } from '../common/gmapApiLoader';
import TrendChart  from '../components/desktop/trendChart.vue';
import { PostApplicationMode } from '../common/config';
import ContactDialog from '../components/desktop/ContactDialog.vue';
import Calculator from '../components/desktop/calculator.vue';
import IndexCityBar from '../components/IndexCityBar.vue';
import { CityRegionGeolocation, loadIndexPageCityProgrames, SearchMode, loadIndexPageSecondHand } from '../common/config';
import { doLocationAutocomplete } from '../common/locationAutocomplete';
import { searchPostalCode } from '../utils/findPosalcode'
import { createPath } from '../utils'

export default {
  name: "index",
  components: {
    TrendChart,
    ContactDialog,
    Calculator,
    IndexCityBar,
  },
  middleware: "responsive",
  head() {
    return {
      title: "Micco immo, 法国第一华人找房平台",
      meta: [
        {
          name: "description",
          content:
            "法国Micco immo为您提供法国房产、房价、投资、减税、生活服务等信息。在法国,寻找新房、二手房、租房、服务就上法国Micco immo! 全法最专业的华人找房平台"
        },
        {
          name: "keywords",
          content:
            "法国找房平台,新房,二手房,租房,装修,保洁,服务,投资,减税,楼盘,法国购房,法国房产,法国租房,法国房地产网,个人急售二手房,Micco immo,PINEL,LMNP"
        }
      ]
    };
  },
  data() {
    return {
      contactDialogVis: false,
      postjoinApplicationLoading: false,
      searchMode: SearchMode.NewPrograme, // 标记 选择租房买房
      searchVal: "", // 搜索绑定
      gmapAutocompleteService: null,
      programesGroupedByCities: null,
      activeProgrameCityKey: null,
      secondHandGroupedByCities: null,
      activeSecondhandCityKey: null,
    };
  },
  computed: {
    selectedProgrames () {
      const arr = this.programesGroupedByCities, key = this.activeProgrameCityKey;
      return arr.find(it => it.city === key)?.items ?? [];
    },
    selectedSecondHand () {
      const arr = this.secondHandGroupedByCities, key = this.activeSecondhandCityKey;
      return arr.find(it => it.city === key)?.items ?? [];
    },
  },
  created () {
    this.SearchMode = SearchMode;
  },
  mounted () {
    if (process.client) {
      this.queryIndexPageInfo(); // 获取主页信息
      const lang = this._i18n.locale;
      gmapApiLoader(lang)
        .then(() => this.gmapAutocompleteService = new window.google.maps.places.AutocompleteService());
    }
  },
  methods: {
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
    queryIndexPageInfo() {
      loadIndexPageCityProgrames().then(res => {
        this.programesGroupedByCities = res;
        if (res.length)
          this.activeProgrameCityKey = res[0].city;
      });
      loadIndexPageSecondHand().then(res => {
        this.secondHandGroupedByCities = res;
        if (res.length)
          this.activeSecondhandCityKey = res[0].city;
      });
    },
    routerChange(path, flag = undefined) {
      const query = typeof flag === 'object' ? flag : { flag };
      this.$router.push({ path: createPath(path), query });
    },
    queryCity(queryString, cb) {
      const lang = this._i18n.locale;
      gmapApiLoader(lang)
        .then(() => {
          if (!this.gmapAutocompleteService)
            this.gmapAutocompleteService = new window.google.maps.places.AutocompleteService()
        });
      if (queryString?.length < 2) return cb([]);
      const autocomplete = this.gmapAutocompleteService;
      if (!autocomplete) return cb([]);
      if (isNaN(queryString))
        doLocationAutocomplete(autocomplete, queryString)
          .then(list => cb(list))
          .catch(() => cb([]));
      else {
        searchPostalCode(queryString).then(res => cb(Array.isArray(res) ? res : []));
      }
    },
    locationAutocompleteSelectHandler (item) {
      const { place_text, place_id, type: location_type, postal_code, latitude: lat, longitude: lng } = item;
      if ((!place_text && !place_id) || !location_type) return;
      const searchMode = this.searchMode;
      if (searchMode === SearchMode.Renting) {
        this.routerChange('/search_rentings', { department_city: place_text, place_id, location_type, postal_code, lat, lng });
      } else
        this.routerChange('/search', { searchMode, department_city: place_text, place_id, location_type, postal_code, lat, lng });
    },
    handleProgrameClickHandler (item) {
      this.routerChange('/new_detail', { zip_code: item.zip_code, name_id: item.name_id, estate_name: item.estate_name, city: item.city });
    },
    moreProgramesClickHandler (ev) {
      let { city_name, location_type = '' } = ev ?? {};
      city_name = city_name ?? this.activeProgrameCityKey;
      if (!city_name) return;
      const { lat, lng } = CityRegionGeolocation[city_name] ?? {};
      if (!lat || !lng) return;
      this.routerChange('/search', { department_city: city_name, lat, lng, location_type, searchMode: SearchMode.NewPrograme, });
    },
    handleSecondHandClickHandler (item) {
      this.routerChange('/second_hand_detail', { zip_code: item.zip_code, id: item.id, title: item.title });
    },
    moreSecondHandClickHandler (ev) {
      let { city_name, location_type = '' } = ev ?? {};
      city_name = city_name ?? this.activeSecondhandCityKey;
      if (!city_name) return;
      const { lat, lng } = CityRegionGeolocation[city_name] ?? {};
      if (!lat || !lng) return;
      this.routerChange('/search', { department_city: city_name, lat, lng, location_type, searchMode: SearchMode.SecondHand });
    }
  },
};

</script>

<style lang="scss" scoped>
.index-page {
  .top {
    background-image: url('/index-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 90% center;
    width: 100%;
    min-height: 340px;
    .banner {
      max-width: 80%;
      font-size: 47px;
      margin-bottom: 36px;
    }
    .city-search-wrapper {
      width: 60%;
      max-width: 600px;
      .el-autocomplete {
        width: 100%;
      }
      .search-btn {
        padding: 6px;
        color: #fff;
        background: var(--main-blue);
        margin: 0 6px;
      }
    }
  }
  .main-section {
    .section-part {
      max-width: 1200px;
      box-sizing: border-box;
      margin: 56px auto 0;
      &.min-mt {
        margin-top: 24px;
      }
    }
    .section-title {
      font-size: 36px;
      .sub {
        font-weight: initial;
        font-size: 16px;
        font-weight: 300;
      }
    }
  }
  .city-selection {
    column-gap: 6px;
    .item {
      flex: 1;
      padding: 6px 0 4px;
      color: #333;
      background: #eee;
      text-align: center;
      border-radius: 6px;
      cursor: pointer;
      &.active {
        color: var(--white-color);
        background: var(--main-blue);
      }
    }
  }
  .cards {
    column-gap: 6px;
    .item {
      flex: 1;
      > * {
        margin-bottom: 6px;
      }
      img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
      }
      .zipcode-city {
        font-size: 12px;
        font-weight: 300;
      }
      .price {
        color: #FE3F3F;
        font-size: 12px;
      }
    }
  }
  .join-us {
    padding: 36px 0 42px 36px;
    border-radius: 8px;
    background: linear-gradient(331deg, #FFE4DD 0%, #FFEAE7 23%, #DAF4F8 50%, #BBE5F4 100%);
    .subtitle {
      font-size: 18px;
      font-weight: 400;
      margin: 20px 0;
    }
  }
  .sell-rent-banner {
    padding: 128px 0 128px 48px;
    border-radius: 8px;
    position: relative;
    background: var(--main-blue);
    .bg {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 45%;
      max-height: 90%;
      object-fit: cover;
      object-position: center top;
    }
    .contact-btn {
      width: fit-content;
      background: #fff;
      border-radius: 6px;
      padding: 10px 28px;
    }
    .subtitle {
      margin: 36px 0 18px;
    }
  }
  .partner {
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  .blue-button {
    width: fit-content;
    color: var(--white-color);
    border-radius: 6px;
    border: 1px solid var(--main-blue);
    background: var(--main-blue);
    padding: 10px 28px;
    font-weight: bold;
    cursor: pointer;
    &.long {
      padding: 6px 48px;
    }
  }
}
</style>
<style lang="scss">
.city-search-wrapper {
  .el-autocomplete {
    .el-input {
      .el-input-group__prepend {
        border: unset;
        background: #fff;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        .el-select {
          margin: unset;
          width: 120px;
          color: #000;
          font-weight: bold;
          input {
            text-align: center;
            font-size: 13px;
          }
        }
      }
      input {
        height: 48px;
        border: unset;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
      }
      .el-input-group__append {
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        border: unset;
        background: #fff;
        padding: unset;
      }
    }
  }
}
</style>
