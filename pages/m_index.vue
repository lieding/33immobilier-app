<template>
  <div class="row">
    <client-only>
      <Header />
      <!-- logo图 -->
      <img src="~/assets/image/index.png" alt class="logo" />
      <!-- 搜索框 -->
      <div class="search-bar flex">
        <div class="flex mode-select">
          <van-dropdown-menu class="opn">
            <van-dropdown-item v-model="searchMode" :options="$t('message.index.SEARCH_MODE')" />
          </van-dropdown-menu>
        </div>
        <div class="flex input-bar">
          <img src="~/assets/image/Search Icon.png" class="search-icon" />
          <input
            v-model="searchInput"
            class="searchInput"
            type="serch"
            :placeholder="$t('message.global.Where')"
            @click="searchInputClickHandler"
          />
          <div class="suggestion-popup" :class="{ active: suggestionPopupActive }">
            <div v-for="it in searchSuggestions" :key="it.value" class="suggestion-item" @click="suggestionClickHandler(it)">{{ it.value }}</div>
          </div>
        </div>
      </div>
      <!-- 多分类 -->
      <ul class="icon-bar">
        <router-link :to="{ path: '/newhouse', query: { house: 'new' } }" tag="li">
          <img src="~/assets/image/newhouse.png" class="list_img" />
          <p>{{ $t("message.global.NewHouse") }}</p>
        </router-link>
        <!-- <router-link :to="{ path: '/newhouse', query: { house: 'second_hand' } }" tag="li">
          <img src="~/assets/image/ordhouse.png" class="list_img" />
          <p>{{ $t("message.global.second-hand") }}</p>
        </router-link> -->
        <router-link :to="{ path: '/rentHouse' }" tag="li">
          <img src="~/assets/image/house.png" class="list_img" />
          <p>{{ $t("message.global.tenement") }}</p>
        </router-link>
        <router-link :to="{ path: '/agentList' }" tag="li">
          <img src="~/assets/image/peoper.png" class="list_img" />
          <p>{{ $t("message.global.agent") }}</p>
        </router-link>
        <router-link :to="{ path: '/blogs' }" tag="li">
          <img src="~/assets/image/baidu.png" class="list_img" />
          <p>{{ $t("message.global.encyclopedia") }}</p>
        </router-link>
        <!-- <router-link :to="{ path: '/service' }" tag="li">
          <img src="~/assets/image/Copy.png" class="list_img" />
          <p>{{ $t("message.global.Saas") }}</p>
        </router-link> -->
      </ul>
      <ul class="articles">
        <router-link :to="{ path: '/instrument' }" tag="li">
          <img src="~/assets/image/blue.png" class="entry_img" />
          <p>{{ $t("message.global.capacity") }}</p>
        </router-link>
        <router-link :to="{ path: '/instrument' }" tag="li">
          <img src="~/assets/image/green.png" class="entry_img" />
          <p>{{ $t("message.global.purchase") }}</p>
        </router-link>
        <router-link :to="{ path: '/article', query: { id: 3 } }" tag="li">
          <img src="~/assets/image/red.png" class="entry_img" />
          <p>{{ $t("message.global.reductionWhat") }}</p>
        </router-link>
        <router-link :to="{ path: '/article', query: { id: 4 } }" tag="li">
          <img src="~/assets/image/Violet.png" class="entry_img" />
          <p>{{ $t("message.global.interest") }}</p>
        </router-link>
      </ul>
      <!-- 新房 -->
      <div class="newhouse">
        <div class="font width">
          <span class="title">{{ $t("message.global.Newbuilding") }}</span>
          <!-- <router-link
            :to="{ path: '/newhouse', query: { house: 'new' } }"
            class="watch"
          >{{ $t("message.global.SEE_ALL_PROGRAMES") }}</router-link> -->
        </div>
        <p class="detail">{{ $t("message.global.precedence") }}</p>
        <ul class="new-list">
          <router-link
            :to="{ path: '/Details', query: { zip_code: item.zip_code, name_id: item.name_id, estate_name: item.estate_name, city: item.city } }"
            v-for="(item, index) in homePageInfo.newHousings"
            :key="index"
            tag="li"
          >
            <div class="image-wrapper">
              <img :src="item.images[0]" class="image" />
              <span class="year">{{ item.deliveryQuarter }}</span>
            </div>
            <div class="right-section">
              <div class="title">{{ item.estate_name }}</div>
              <div class="info">{{ item.zip_code }} / {{ item.city }}</div>
              <div class="info">{{ item.availablePropertiesCount || item.propertiesCount }} {{ $t("message.PAGE_INDEX.PROPERTIES_LEFT") }}</div>
              <div class="price">
                {{ item.availablePropertiesMinPrice }}€
              </div>
            </div>
          </router-link>
        </ul>
      </div>
      <hr class="hr" />
      <!-- 专业房产顾问 -->
      <div class="newhouse">
        <div class="font width">
          <span class="title">{{ $t("message.global.property") }}</span>
          <router-link :to="{ path: '/agentList' }" tag="li" class="watch">
            {{
            $t("message.global.economics")
            }}
          </router-link>
        </div>
        <p class="detail" style=" margin-bottom:0.07rem;">
          {{ $t("message.global.CONSULTANT") }}&nbsp;&nbsp;&nbsp;{{
          $t("message.global.ZeroFee")
          }}&nbsp;&nbsp; {{ $t("message.global.bilingualism") }}
        </p>
        <van-swipe :loop="false" :width="180" :height="78" :show-indicators="false">
          <van-swipe-item v-for="(item, index) in brokerList" :key="index" class="swipe">
            <div class="swipe_pro">
              <img :src="item.brokerAvatar" class="swipe_img" />
              <p class="swipe_P">PRO</p>
            </div>
            <div class="swipe_text">
              <p class="swipe_title">{{ item.brokerName }}</p>
              <p class="swipe_sort">{{ item.brokerJob }}</p>
              <p class="swipe_tel">{{ item.brokerTelPhone }}</p>
            </div>
          </van-swipe-item>
        </van-swipe>
        <div class="swipe_image">
          <img src="~/assets/image/pcBroker.png" alt />
          <span style="margin-right: .1rem;">
            {{
            $t("message.global.middleman")
            }}
          </span>
          <span @click="goRouter('/dialog')" class="text_img">
            <img src="~/assets/image/pcPerson.png" alt style="margin-right: .05rem;" />
            {{ $t("message.global.jiaru") }}
          </span>
        </div>
      </div>
      <hr class="hr" />
      <!-- 我们的合作伙伴 -->
      <div class="newhouse">
        <div class="font width">
          <span class="title">{{ $t("message.global.ourFri") }}</span>
        </div>
        <p class="detail">{{ $t("message.global.pionner") }}</p>
        <p class="detail">{{ $t("message.global.Courtier") }}</p>
        <img src="~/assets/image/logo_promoteur.png" class="partner_image" />
      </div>
      <hr class="hr" />
      <!-- 底部 -->
      <Footer />
    </client-only>
  </div>
</template>

<script>
import rem from "~/common/rem.js";
import Header from "~/components/Mindex/header.vue";
import Footer from "~/components/Mindex/footer.vue";
import { gmapApiLoader } from '../common/gmapApiLoader';
import { SearchMode } from '../common/config';

export default {
  components: {
    Header,
    Footer
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
      homePageInfo: {},
      newHousings: [], //新房
      homesList: [], //二手房
      rentings: [], //租房
      brokerList: [], //经纪人
      system: [], //立即加入
      value: "Paris 1",
      show: false,
      searchMode: SearchMode.NewPrograme,
      searchInput: "",
      searchSuggestions: [],
      suggestionPopupActive: false,
    };
  },
  mounted() {
    if (!process.client) return;
    rem();
    this.queryIndexPageInfo();
    const lang = this._i18n.locale;
    gmapApiLoader(lang)
      ?.then(() => this.gmapAutocompleteService = new window.google.maps.places.AutocompleteService());
    this.__popupCanceEvListener = () => {
      this.suggestionPopupActive = false;
      window.removeEventListener('click', this.__popupCanceEvListener);
    }
  },
  watch: {
    searchInput (input) {
      if (input.length < 2) {
        this.searchSuggestions = [];
        this.suggestionPopupActive = false;
        return;
      }
      searchCities.call(this, input)
        .then(suggestions => {
          this.searchSuggestions = suggestions;
          this.suggestionPopupActive = true;
          window.addEventListener('click', this.__popupCanceEvListener, true);
        });
    },
  },
  methods: {
    goRouter(smt) {
      let list = {
        type: "经纪人",
        phone: this.system.phone
      };
      this.$router.push({
        path: smt,
        query: list
      });
    },
    suggestionClickHandler(suggestion) {
      const searchMode = this.searchMode;
      if (searchMode == SearchMode.NewPrograme) {
        const { place_id, place_text } = suggestion;
        if (!place_id || !place_text) return;
        this.$router.push({ path: "/newhouse", query: { searchMode, place_id, place_text } });
      } else if (searchMode == SearchMode.SecondHand) {
        this.$router.push({
          path: "/newhouse",
          query: { searchMode, searchInput: this.searchInput }
        });
      } else {
        this.$router.push({
          path: "/rentHouse",
          query: { searchMode, searchInput: this.searchInput }
        });
      }
    },
    searchInputClickHandler () {
      if (this.searchSuggestions?.length) {
        this.suggestionPopupActive = true;
        window.addEventListener('click', this.__popupCanceEvListener, true);
      }
    },
    async queryIndexPageInfo() {
      const res = await this.$api.article.getHomePageInfo();
      const getHomePageInfo = res.data;
      this.homePageInfo = getHomePageInfo;
      if (getHomePageInfo.system)
        this.systemInfo = getHomePageInfo.system;
    },
  }
};

/**
 * @param {string} input
*/
function searchCities (input) {
  const autocomplete = this.gmapAutocompleteService;
  if (!autocomplete) return Promise.resolve([]);
  return autocomplete.getPlacePredictions({
    input,
    componentRestrictions: {
      country: ['FRA'],
    },
    types: ["(cities)"],
  }).then(res => {
    const predictions = res.predictions;
    if (!Array.isArray(predictions)) return [];
    const list = predictions.map(({ structured_formatting, place_id }) => {
      const { main_text, secondary_text } = structured_formatting;
      return { value: main_text, place_id, place_text: main_text };
    });
    return list;
  });
}

</script>
<style lang="scss">
.trend_p {
  .el-input__inner {
    height: 0.3rem;
  }
}
</style>
<style scoped lang="scss">
.hr {
  border: none;
  height: 0.01rem;
  margin: 0.12rem 0;
  background-color: #ececec;
}
.font {
  font-size: 16px;
}
.logo {
  height: 1.89rem;
  width: 100%;
  margin-top: 0.06rem;
}
.title_hr {
  border: none;
  height: 0.01rem;
  background-color: #c2c2c2;
  margin: 0;
}
.search-bar {
  position: absolute;
  top: 2.15rem;
  margin: 0 0.18rem 0 0.18rem;
  width: 90%;
  height: 0.43rem;
  background: white;
  bottom: 0.2rem;
  z-index: 1;
  box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.11);
  .mode-select {
    padding-right: 0.15rem;
    background: white;
  }
  .input-bar {
    padding: 0.09rem 0;
    position: relative;
    .suggestion-popup {
      visibility: hidden;
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateY(105%);
      width: 100%;
      box-sizing: border-box;
      padding: .1rem .16rem .08rem;
      box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.11);
      min-height: .6rem;
      border-radius: 8px;
      background-color: #fff;
      &.active {
        visibility: visible;
      }
      .suggestion-item {
        margin-bottom: .12rem;
        color: #666;
      }
    }
  }
}
.swipe_text {
  padding: 0.05rem;
  max-width: 48%;
}
.width {
  width: 100%;
  margin-bottom: 0.2rem;
}
.flex {
  display: flex;
}
.opn {
  font-size: 0.13rem;
  width: 0.72rem;
  height: 0.43rem;
  ::v-deep {
    .van-dropdown-menu__bar {
      box-shadow: unset;
      background-color: transparent;
      height: 43px;
    }
  }
}
.van-ellipsis {
  color: rgba(38, 38, 38, 1);
}
.search-icon {
  width: 0.16rem;
  height: 0.16rem;
  padding: 0.03rem 0.15rem;
  border-left: 1px solid #8888;
}
.searchInput {
  border: none;
  width: 2rem;
  font-size: 0.13rem;
}
.icon-bar {
  font-size: 0.15rem;
  width: 100%;
  margin-top: 0.2rem;
  li {
    float: left;
    text-align: center;
    width: 33.33%;
    margin-bottom: 0.05rem;
  }
}
.list_img {
  width: 0.49rem;
  height: 0.5rem;
}
.articles {
  font-size: 0.12rem;
  height: 0.75rem;
  display: flex;
  width: 100%;
  li {
    text-align: center;
    width: 24%;
    position: relative;
  }
  p {
    position: absolute;
    bottom: 0.35rem;
    left: 0.13rem;
    font-size: 0.12rem;
    font-weight: 600;
    color: rgba(40, 40, 40, 0.76);
    line-height: 0.17rem;
  }
}
.entry_img {
  width: 1.04rem;
  height: 0.75rem;
}
.title {
  font-size: 0.2rem;
  font-weight: 600;
  line-height: 0.28rem;
  // padding: 0;
  color: rgba(0, 0, 0, 0.76);
}
.watch {
  font-size: 0.13rem;
  color: rgba(35, 76, 211, 1);
  line-height: 0.18rem;
  float: right;
  margin-top: 0.03rem;
}
.detail {
  font-size: 0.13rem;
  color: rgba(126, 126, 126, 0.76);
  line-height: 0.18rem;
}
.newhouse {
  margin: 0 0.12rem;
  font-size: 16px;
  padding-bottom: 0.1rem;
}
.info {
  font-size: 0.13rem;
  font-weight: 600;
  color: rgba(168, 168, 168, 1);
}
.itemize {
  /* width:0.45rem; */
  height: 0.18rem;
  background: rgba(191, 191, 191, 1);
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  margin-right: 0.06rem;
  padding: 0 0.1rem;
}
.city {
  background: rgba(106, 192, 120, 1);
  margin: 0 0.03rem;
  padding: 0 0.01rem;
}
.citynum {
  font-size: 0.09rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.13rem;
}
.swipe > first-child {
  width: 1.44rem;
}
.new-list {
  margin-top: 0.1rem;
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
      .year {
        position: absolute;
        top: 0;
        right: 0;
        padding: .03rem .03rem .02rem .1rem;
        background: rgba(35, 76, 211, 1);
        border-radius: 0px 0px 0px 13px;
        font-size: 0.12rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
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
.average {
  font-size: 0.12rem;
  color: rgba(172, 172, 172, 1);
  line-height: 0.17rem;
  margin-left: 0.07rem;
}
.van-swipe-item {
  // width:1.8rem !important;
  height: 0.78rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 2px rgba(191, 191, 191, 0.14);
  display: flex;
}
.swipe_pro {
  width: 50%;
}
.swipe_img {
  width: 0.51rem;
  height: 0.5rem;
  border-radius: 50px;
  position: absolute;
  left: 0.1rem;
}
.swipe_P {
  width: 17px;
  height: 9px;
  background: rgba(0, 101, 255, 1);
  border-radius: 1px;
  font-size: 5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 9px;
  position: absolute;
  text-align: center;
  top: 0.45rem;
  left: 0.28rem;
}
.swipe_title {
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.76);
  line-height: 0.16rem;
}
.swipe_sort {
  font-size: 0.11rem;
  color: rgba(131, 131, 131, 0.76);
  line-height: 0.16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 1.4rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.swipe_tel {
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(4, 51, 255, 0.76);
  line-height: 0.16rem;
}
.swipe_image {
  height: 0.66rem;
  box-sizing: border-box;
  padding-top: 0.06rem;
  width: 100%;
  position: relative;
  background: rgba(35, 76, 211, 1);
  img {
    width: 0.48rem;
    vertical-align: middle;
  }
  span {
    color: #ffffff;
    font-size: 0.18rem;
  }
  .text_img {
    // width:.8rem;
    height: 0.27rem;
    position: absolute;
    right: 0.08rem;
    top: 0.15rem;
    background: rgba(255, 255, 255, 1);
    // padding:.13rem;
    img {
      width: 0.12rem;
    }
    padding: 0.03rem 0.05rem;
    text-align: center;
    font-size: 12px;
    color: rgba(48, 52, 64, 1);
    line-height: 0.27rem;
  }
}
.partner_image {
  width: 3.52rem;
  height: 1.7rem;
  margin-top: 0.12rem;
}
.el-dropdown-menu {
  overflow: scroll;
  height: 2rem;
}
.el-dropdown {
  z-index: 2;
}
</style>
