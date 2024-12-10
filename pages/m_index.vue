<template>
  <div>
    <div class="top-banner relative">
      <!-- logo图 -->
      <img src="/index-bg.png" alt class="logo" />
      <div class="banner bold absolute white full-w text-center">{{ $t("message.global.INDEX_BANNER") }}</div>
    </div>
    <!-- 搜索框 -->
    <client-only>
      <div class="search-bar flex absolute">
        <div class="flex mode-select">
          <van-dropdown-menu class="search-bar-menu-option">
            <van-dropdown-item v-model="searchMode" :options="$t('message.index.SEARCH_MODE')" />
          </van-dropdown-menu>
        </div>
        <div class="flex input-bar">
          <img src="/Search Icon.png" class="search-icon" />
          <input
            v-model="searchInput"
            class="search-input"
            type="serch"
            :placeholder="$t('message.global.Where')"
            @click="searchInputClickHandler"
          />
          <div class="suggestion-popup" :class="{ active: suggestionPopupActive }">
            <div v-for="it in searchSuggestions" :key="it.value" class="suggestion-item" @click="suggestionClickHandler(it)">{{ it.value }}</div>
          </div>
        </div>
      </div>
    </client-only>
    <div class="section">
      <div class="section-title" style="margin-bottom: .1rem;">{{ $t('message.global.Where') }}</div>
      <client-only>
        <index-city-bar :mobile="true" @select="moreProgramesClickHandler" />
      </client-only>
    </div>
    <!-- 新房 -->
    <div class="section">
      <div class="section-title">{{ $t('message.global.NEW_PROGRAME') }}</div>
      <div class="subtitle">{{ $t("message.global.PARTNERSHIP") }}</div>
      <template v-if="programesGroupedByCities">
        <div class="city-selection flex wrap">
          <div
            v-for="it in programesGroupedByCities"
            :key="it.city"
            class="item"
            :class="{ active: activeProgrameCityKey === it.city }"
            @click="activeProgrameCityKey = it.city"
          >
            {{ it.city }}
          </div>
        </div>
        <ul class="new-list">
          <li
            v-for="(item, index) in selectedProgrames"
            :key="index"
            @click="routerChange('/m_new_detail', { zip_code: item.zip_code, name_id: item.name_id, estate_name: item.estate_name, city: item.city })"
          >
            <div class="image-wrapper">
              <img :src="item.image" class="image" />
              <span v-if="item.deliveryQuarter" class="top-right-tag">{{ item.deliveryQuarter }}</span>
            </div>
            <div class="right-section">
              <div class="title">{{ item.estate_name }}</div>
              <div class="info">{{ item.zip_code }} / {{ item.city }}</div>
              <div class="info">{{ item.availablePropertiesCount || item.propertiesCount }} {{ $t("message.PAGE_INDEX.PROPERTIES_LEFT") }}</div>
              <div class="price">
                {{ fmoney(item.availablePropertiesMinPrice) }}€ - {{ fmoney(item.availablePropertiesMaxPrice) }}$
              </div>
            </div>
          </li>
        </ul>
        <div class="flex-center">
          <div class="more-btn white bold" @click="moreProgramesClickHandler()">{{ $t('message.PAGE_INDEX.MORE') }}</div>
        </div>
      </template>
    </div>
    <!-- 二手房 -->
    <div class="section">
      <div class="section-title">{{ $t('message.global.SECOND_HAND') }}</div>
      <template v-if="secondHandGroupedByCities">
        <div class="city-selection flex wrap">
          <div
            v-for="it in secondHandGroupedByCities"
            :key="it.city"
            class="item"
            :class="{ active: activeSecondhandCityKey === it.city }"
            @click="activeSecondhandCityKey = it.city"
          >
            {{ it.city }}
          </div>
        </div>
        <ul class="new-list">
          <li
            v-for="(item, index) in selectedSecondHand"
            :key="index"
            @click="routerChange('/m_second_hand_detail', { zip_code: item.zip_code, id: item.id, title: item.title, city: item.city })"
          >
            <div class="image-wrapper">
              <img :src="item.image" class="image" />
            </div>
            <div class="right-section">
              <div class="title">{{ item.title }}</div>
              <div class="info">{{ item.surface }}m² / {{ item.piece }}{{ $t('message.PAGE_SECOND_HAND.PIECE_CNT') }}</div>
              <div class="info">{{ item.zip_code }} / {{ item.city }}</div>
              <div class="price">{{ fmoney(item.price) }}€</div>
            </div>
          </li>
        </ul>
        <div class="flex-center">
          <div class="more-btn white bold" @click="moreSecondHandClickHandler()">{{ $t('message.PAGE_INDEX.MORE') }}</div>
        </div>
      </template>
    </div>
    <!-- 专业房产顾问 -->
    <div class="section">
      <div class="join-us-bar">
        <img src="/broker.png" alt />
        <span class="white bold" style="margin-right: .1rem;">
          {{ $t("message.global.JOIN_AND_BECOME_AGENT") }}
        </span>
        <span class="contact-btn inline-block" @click.stop="startContact">
          {{ $t("message.global.JOIN_IMMEDIATELY") }}
        </span>
      </div>
    </div>
    <div class="section">
      <div class="section-title">{{ $t('message.global.instrument') }}</div>
      <client-only>
        <calculator />
      </client-only>
    </div>
    <!-- 我们的合作伙伴 -->
    <div class="section partner">
      <div class="section-title">{{ $t("message.global.OUR_PARTNERS") }}</div>
      <div class="subtitle">{{ $t("message.global.PARTNERSHIP") }}</div>
      <div class="subtitle">{{ $t("message.global.PARTNSHIP_WITH_COURTIER") }}</div>
      <img src="/partner.png" />
    </div>
    <hr class="divider" />
    <client-only>
      <contact-popup
        :visible="contactPopupVis"
        :titles="[]"
        :confirm-btn-loading="contactBtnLoading"
        @close="contactPopupVis = false"
        @confirm="contactConfirmHandler"
      />
    </client-only>
  </div>
</template>

<script>
import rem from "~/common/rem.js";
import { Notify } from 'vant';
import { gmapApiLoader } from '../common/gmapApiLoader';
import ContactPopup from '../components/mobile/contactPopup.vue';
import Calculator from '../components/mobile/calculator.vue';
import { SearchMode, PostApplicationMode, loadIndexPageCityProgrames, CityRegionGeolocation, loadIndexPageSecondHand } from '../common/config';
import IndexCityBar from '../components/IndexCityBar.vue';
import { doLocationAutocomplete } from '../common/locationAutocomplete';
import { searchPostalCode } from '../utils/findPosalcode'
import { fmoney, createPath } from '../utils';

export default {
  components: {
    ContactPopup, Calculator, IndexCityBar,
  },
  middleware: "responsive",
  head() {
    return {
      title: "Micco immo, French Real Estate marketplace",
      meta: [
        {
          name: "description",
          content:
            "法国Micco找房为您提供法国房产、房价、投资、减税、生活服务等信息。在法国,寻找新房、二手房、租房、服务就上法国Micco找房! 全法最专业的华人找房平台, Micco immmo"
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
      homesList: [], //二手房
      searchMode: SearchMode.NewPrograme,
      searchInput: "",
      searchSuggestions: [],
      suggestionPopupActive: false,
      contactPopupVis: false,
      contactBtnLoading: false,
      programesGroupedByCities: null,
      activeProgrameCityKey: null,
      secondHandGroupedByCities: null,
      activeSecondhandCityKey: null,
    };
  },
  created () {
    this.fmoney = fmoney;
  },
  mounted() {
    if (!process.client) return;
    rem();
    this.queryIndexPageInfo();
    const lang = this._i18n.locale;
    gmapApiLoader(lang)
      .then(() => this.gmapAutocompleteService = new window.google.maps.places.AutocompleteService());
    this.__popupCanceEvListener = () => {
      this.suggestionPopupActive = false;
      window.removeEventListener('click', this.__popupCanceEvListener);
    }
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
  watch: {
    searchInput (input) {
      const lang = this._i18n.locale;
      gmapApiLoader(lang)
        .then(() => {
          if (!this.gmapAutocompleteService)
            this.gmapAutocompleteService = new window.google.maps.places.AutocompleteService()
        });
      if (input.length < 2) {
        this.searchSuggestions = [];
        this.suggestionPopupActive = false;
        return;
      }
      let promise;
      if (isNaN(input)) {
        if (this.gmapAutocompleteService)
          promise = doLocationAutocomplete(service, input);
      } else {
        promise = searchPostalCode(input);
      }
      promise?.then(suggestions => {
        if (!Array.isArray(suggestions)) return;
        this.searchSuggestions = suggestions;
        this.suggestionPopupActive = true;
        window.addEventListener('click', this.__popupCanceEvListener, true);
      });
    },
  },
  methods: {
    suggestionClickHandler(suggestion) {
      const searchMode = this.searchMode;
      const { place_id, place_text: department_city, type: location_type, postal_code, latitude: lat, longitude: lng } = suggestion;
      if (searchMode == SearchMode.NewPrograme) {
        if (!place_id && !place_text && !postal_code) return;
        const query = { searchMode, place_id, department_city, location_type, lat, lng, postal_code };
        this.routerChange("/m_search", query);
      } else if (searchMode == SearchMode.SecondHand) {
        const query = { searchMode, location_type, department_city, lat, lng, postal_code };
        this.routerChange("/m_search", query);
      } else {
      }
    },
    searchInputClickHandler () {
      if (this.searchSuggestions?.length) {
        this.suggestionPopupActive = true;
        window.addEventListener('click', this.__popupCanceEvListener, true);
      }
    },
    contactConfirmHandler (contact) {
      const lang = this._i18n.locale;
      this.contactBtnLoading = true;
      this.$api.article.postApplication({ mode: PostApplicationMode.JOIN, lang, contact })
        .then(() => {
          this.contactPopupVis = false;
          Notify({ type: 'success', message: this.$t('message.global.APPLICATION_POSTED_SUCCESS') });
        })
        .catch(console.error)
        .finally(() => this.contactBtnLoading = false);
    },
    queryIndexPageInfo() {
      loadIndexPageCityProgrames().then(res => {
        this.programesGroupedByCities = res?.slice(0, 5);
        if (res.length)
          this.activeProgrameCityKey = res[0].city;
      });
      loadIndexPageSecondHand().then(res => {
        this.secondHandGroupedByCities = res;
        if (res.length)
          this.activeSecondhandCityKey = res[0].city;
      });
    },
    startContact () {
      this.contactPopupVis = true;
    },
    moreProgramesClickHandler (ev) {
      let { city_name: department_city, location_type = '' } = ev ?? {};
      department_city = department_city ?? this.activeProgrameCityKey;
      if (!department_city) return;
      const { lat, lng } = CityRegionGeolocation[department_city] ?? {};
      if (!lat || !lng) return;
      this.routerChange('/m_search', { searchMode: SearchMode.NewPrograme, department_city, lat, lng, location_type });
    },
    moreSecondHandClickHandler (ev) {
      let { city_name: department_city, location_type = '' } = ev ?? {};
      department_city = department_city ?? this.activeSecondhandCityKey;
      if (!department_city) return;
      const { lat, lng } = CityRegionGeolocation[department_city] ?? {};
      if (!lat || !lng) return;
      this.routerChange('/m_search', { searchMode: SearchMode.SecondHand, department_city, lat, lng, location_type });
    },
    routerChange (path, query) {
      this.$router.push({ path: createPath(path), query });
    }
  }
};

</script>

<style lang="scss" scoped>
.divider {
  border: none;
  height: 0.01rem;
  margin: 0.12rem 0;
  background-color: #ececec;
}
.section {
  margin: .14rem 0.08rem .06rem;
  .section-title {
    font-size: 0.26rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.76);
    margin-top:40px;
  }
  .subtitle {
    font-size: 0.14rem;
    color: rgba(126, 126, 126, 0.76);
  }
}
.top-banner {
  .logo {
    height: 1.89rem;
    width: 100%;
  }
  .banner {
    font-size: 22px;
    top: .25rem;
    left: 0;
  }
}
.search-bar {
  top: 1.5rem;
  left: 5%;
  width: 90%;
  height: 0.43rem;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.11);
  .mode-select {
    padding-right: 0.1rem;
    .search-bar-menu-option {
      width: 0.72rem;
      ::v-deep {
        .van-dropdown-menu__bar {
          box-shadow: unset;
          background-color: transparent;
          height: .43rem;
          .van-dropdown-menu__item {
            .van-dropdown-menu__title {
              .van-ellipsis {
                font-size: .16rem;
              }
            }
          }
        }
      }
    }
  }
  .input-bar {
    padding: 0.09rem 0;
    position: relative;
    .search-icon {
      width: 0.16rem;
      height: 0.16rem;
      padding: 0.03rem 0.15rem;
      border-left: 1px solid #8888;
    }
    .search-input {
      border: none;
      width: 2rem;
      font-size: 0.13rem;
    }
    .suggestion-popup {
      visibility: hidden;
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateY(101%);
      transition: all .3s ease;
      width: 100%;
      box-sizing: border-box;
      padding: .1rem .16rem .08rem;
      box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.11);
      min-height: .6rem;
      border-radius: 8px;
      background: #fff;
      z-index: 2;
      &.active {
        visibility: visible;
      }
      .suggestion-item {
        margin-bottom: .16rem;
        color: #666;
        &:last-child {
          margin-bottom: unset;
        }
      }
    }
  }
}
.info {
  font-size: 0.13rem;
  font-weight: 600;
  color: rgba(168, 168, 168, 1);
}
.city {
  background: rgba(106, 192, 120, 1);
  margin: 0 0.03rem;
  padding: 0 0.01rem;
}
.new-list {
  margin: 0.1rem 0 .16rem;
  li {
    display: flex;
    padding-top: 0.11rem;
    .image-wrapper {
      height: 0.98rem;
      position: relative;
      margin-right: 0.11rem;
      .image {
        width: 1.44rem;
        height: 0.98rem;
      }
      .top-right-tag {
        position: absolute;
        top: 0;
        right: 0;
        padding: .03rem .03rem .02rem .1rem;
        background: var(--main-blue);
        border-radius: 0px 0px 0px 13px;
        font-size: 0.12rem;
        font-weight: 600;
        color: var(--white-color);
      }
    }
    .right-section {
      & > div {
        margin-bottom: .03rem;
      }
      .title {
        line-height: initial;
        font-size: 0.14rem;
        font-weight: 600;
        color: rgba(80, 80, 80, 1);
        text-shadow: 0px 2px 3px rgba(255, 255, 255, 0.5);
      }
      .price {
        font-size: 0.16rem;
        font-weight: 600;
        color: rgba(255, 94, 94, 1);
      }
    }
  }
}
.join-us-bar {
  background: var(--main-blue);
  img {
    width: 0.48rem;
    vertical-align: middle;
  }
  span {
    font-size: 0.18rem;
  }
  .contact-btn {
    background: #fff;
    padding: 0.03rem 0.1rem;
    font-size: .14rem;
    border-radius: 6px;
  }
}
.city-selection {
  column-gap: 6px;
  row-gap: 4px;
  margin-top: .1rem;
  .item {
    padding: .06rem .1rem .04rem;
    color: #333;
    background: #eee;
    border-radius: 4px;
    cursor: pointer;
    &.active {
      color: var(--white-color);
      background: var(--main-blue);
    }
  }
}
.partner {
  img {
    width: 3.52rem;
    height: 1.7rem;
    margin-top: 0.12rem;
  }
}
.more-btn {
  background: var(--main-blue);
  padding: .06rem .2rem;
  border-radius: 6px;
}
</style>
