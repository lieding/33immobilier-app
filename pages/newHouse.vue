<template>
  <div class="m-list-page-wrapper">
    <!-- 顶部筛选框 -->
    <div :class="isNew ? 'select' : 'section'">
      <!-- 区域 -->
      <van-dropdown-menu class="customized-dropdown-menu">
        <van-dropdown-item
          :title="regionCityDropdownMenuTitle"
          class="region-city-dropdown-item"
          @open="regionCitySearchBarVis = true"
          ref="item-region-city-dropdown"
        >
          <client-only>
            <region-city-search-bar :visible="regionCitySearchBarVis" :data-loader="regionCityDataLoader" @select="regionCityIndexBarSelectHandler" />
          </client-only>
        </van-dropdown-item>
      </van-dropdown-menu>
      <!-- 价格 -->
      <van-dropdown-menu>
        <van-dropdown-item
          class="dropdown-slider"
          :title="$t('message.global.price')"
          ref="item2"
        >
          <range-slider :modelValue.sync="priceRange" :min-value="minPrice" :max-value="maxPrice" @change="priceRangeChangeHandler" />
          <van-button type="info" @click="toggleDropdownMenu('item2')" class="btn-i">{{ $t("message.global.CONFIRM") }}</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
      <!-- 面积 -->
      <van-dropdown-menu v-if="isSecondHand">
        <van-dropdown-item
          class="dropdown-slider"
          :title="$t('message.global.SURFACE')"
          ref="item5"
        >
          <div class="section">
            {{ $t("message.global.SURFACE") }} : {{ acreage[0] }}m² — {{ acreage[1] }}m²
          </div>
          <el-slider
            v-model="acreage"
            range
            :max="maxAcreage"
            :min="minAcreage"
            @change="onAcreage"
          ></el-slider>
          <van-button type="info" @click="toggleDropdownMenu('item5')" class="btn-i">
            {{ $t("message.global.CONFIRM") }}
          </van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
      <!-- 交房时间 -->
      <van-dropdown-menu v-if="isNew">
        <van-dropdown-item
          v-model="completionStatus"
          :options="CompletionStatusOption"
          :title="$t('message.global.completionDate')"
          @change="completionStatusChangeHandler"
        />
      </van-dropdown-menu>
      <!-- 房型 -->
      <van-dropdown-menu class="customized-dropdown-menu" v-if="isNew">
        <van-dropdown-item v-model="selectedTypology" :options="typologyOptions" :title="$t('message.NEW_LIST.ALL_TYPOLOGY_LABEL')"
          @change="selectedTypologyChangeHandler"
        />
      </van-dropdown-menu>
      <!-- 二手房居室 -->
      <van-dropdown-menu class="customized-dropdown-menu" v-if="isSecondHand">
        <van-dropdown-item
          v-model="livingRoomNum"
          :options="$t('message.index.option2')"
          :title="$t('message.global.habitable')"
          @change="onroomNum"
        />
      </van-dropdown-menu>
      <!-- 卧室 -->
      <van-dropdown-menu class="customized-dropdown-menu" v-if="isSecondHand">
        <van-dropdown-item
          v-model="bedRoomNum"
          :options="$t('message.index.option3')"
          :title="$t('message.global.bedroom')"
          @change="onroomNum"
        />
      </van-dropdown-menu>
    </div>
    <div class="map">
      <client-only>
        <template v-if="placeInfo && placeInfo.longitude && placeInfo.latitude">
          <jump-map
            :latitude="placeInfo.latitude"
            :longitude="placeInfo.longitude"
            :init-zoom="11"
            :points="mapPoints"
            :active-point-id="activePointId"
            @pointSelect="pointSelectHandler"
          ></jump-map>
        </template>
      </client-only>
    </div>
    <div class="sort-title" v-if="isSecondHand">
      <p class="second-hand">{{ $t("message.global.ordHouseapartment") }}</p>
      <div class="sorting">
        <el-popover placement="bottom" width="100" v-model="visible">
          <div class="rank">
            <p @click="OnRank(1), (visible = false)">
              {{ $t("message.global.lowToHigh") }}
            </p>
            <p @click="OnRank(2), (visible = false)">
              {{ $t("message.global.highToLow") }}
            </p>
          </div>
          <span slot="reference">
            <img src="~/assets/image/sorting.png" alt class="sortimage" />
            {{ $t("message.global.paixu") }}
            <img src="~/assets/image/src.png" alt />
          </span>
        </el-popover>
      </div>
    </div>
    <div class="list-wrapper">
      <van-list
        v-model="isLoading"
        :finished="finished"
        :finished-text="$t('message.global.noMore')"
        class="new-list"
      >
        <template v-if="isNew">
          <router-link
            :to="{ path: '/Details', query: { id: item.id } }"
            v-for="(item) in filteredNewProgrames"
            :key="item.id"
          >
            <li class="list-li" ref="programItem" :class="{ active: activePointId === item.id }">
              <div class="flex">
                <div class="img">
                  <van-image :src="item.images[0]" class="cover-image" />
                  <span class="year" v-if="item.deliveryQuarter">{{ item.deliveryQuarter }}</span>
                </div>
                <div class="text">
                  <p class="text_title">{{ item.estate_name }}</p>
                  <p class="sort">{{ item.zip_code }} / {{ item.city }}</p>
                  <p class="sort">
                    <van-tag v-for="it in item.translatedTypologies" :key="it" type="primary" size=""medium>{{ it }}</van-tag>
                  </p>
                  <p class="money">
                    {{ fmoney(item.availablePropertiesMinPrice) }}€ - {{ fmoney(item.availablePropertiesMaxPrice) }}€
                  </p>
                </div>
              </div>
            </li>
          </router-link>
        </template>
        <template v-else-if="isSecondHand">
          <router-link
          :to="{ path: '/ordDetails', query: { id: item.id } }"
          v-for="(item, index) in secondHousingList"
          :key="index"
        >
          <li class="list-li">
            <div class="flex">
              <div class="img">
                <img :src="item.showUrl" class="cover-image" />
                <span class="year">{{
                  item.houseOrApartment == 1
                    ? $t("message.global.apartments")
                    : $t("message.global.cottage")
                }}</span>
                <span class="num">{{
                  item.oneselfOrAgent == 1
                    ? $t("message.global.agent")
                    : $t("message.global.Personal")
                }}</span>
              </div>
              <div class="text">
                <p class="text_title">{{ item.title }}</p>
                <p class="sort">{{ item.bigProvince }}/{{ item.province }}</p>
                <p class="money">
                  {{ item.total }}{{ $t("message.global.euro") }}
                  <span class="unit">{{ item.unit }}€/{{ $t("message.global.square") }}</span>
                </p>
                <p class="font">
                  <span class="itemize">{{ item.roomsNum }}{{ $t("message.global.chamber") }}</span>
                  <span class="itemize">{{ item.bedroomNum }}{{ $t("message.global.crouch") }}</span>
                  <span class="itemize">{{ item.acreage }}{{ $t("message.global.square") }}</span>
                </p>
              </div>
            </div>
          </li>
        </router-link>
        </template>
        <hr class="hr" />
      </van-list>
    </div>
  </div>
</template>

<script>
import rem from "~/common/rem.js";
import RangeSlider from '../components/Mindex/rangeSlider.vue';
import { fmoney, searchCityGeolocation } from '../utils';
import { SearchMode } from '../common/config';
import JumpMap from '../components/jumpMap.vue';
import RegionCitySearchBar from '../components/Mindex/regionCitySearchBar.vue';
import { TypologyOptionConfig, loadProgramesByRegions, LocationType, loadProgrameRegionidCities, L1AREA_REGIONS, L2AREA_REGION } from '../common/config';
import { filterProgrammeListByConditions, CompletionStatusOptionConfig, handleProgrames } from '../utils/list';

export default {
  name: "",
  middleware: "responsive",
  components: {
    RangeSlider,
    JumpMap,
    RegionCitySearchBar,
  },
  head() {
    return generateHead(this.searchMode);
  },
  data() {
    return {
      visible: false,
      activePointId: '',
      completionStatus: "",
      minPrice: 0, //价格
      maxPrice: 0, //最大价格
      priceRange: [0, 0],
      acreage: [0, 1], //面积
      minAcreage: 0, //最小面积
      maxAcreage: 0, //最大面积
      page: 1, //页数
      isLoading: false, //下拉刷新
      newProgrames: [], //新房
      filteredNewProgrames: [],
      typologyOptions: [], // 房型选择列表
      selectedTypology: null,
      placeInfo: null,
      secondHousingList: [],
      maxPage: 1, //新房的最大页数
      bedRoomNum: "",
      livingRoomNum: "",
      regionCitySearchBarVis: false,
    };
  },
  watch: {
    $route() {
      this.searchMode = this.$route.query.searchMode;
    },
  },
  computed: {
    isNew () {
      return this.searchMode === SearchMode.NewPrograme;
    },
    isSecondHand () {
      return this.searchMode === SearchMode.SecondHand;
    },
    finished () {
      return this.isNew ? true : this.page >= this.maxPage;
    },
    regionCityDropdownMenuTitle () {
      let text;
      if (this.isNew) {
        text = this.placeInfo?.name ?? this.$t('message.PAGE_INDEX.SELECT_CITY');
      }
      return text?.slice(0, 4) ?? '';
    },
    mapPoints () {
      return this.filteredNewProgrames?.map((it) => {
        const { longitude, latitude, id } = it;
        // const content = translatedTypologies.join(',');
        return { id, longitude, latitude };
      }) ?? [];
    }
  },
  created() {
    this.fmoney = fmoney;
    this.setInitialPlaceinfo();
    this.CompletionStatusOption =
      CompletionStatusOptionConfig.map(({ key, I18NKey }) => ({ value:key, text: this.$t(`message.NEW_LIST.${I18NKey}`) }));
    this.TypologyOption = TypologyOptionConfig
      .map(({ incluedKey, I18NKey }) => ({ value: incluedKey, incluedKey, text: this.$t(`message.NEW_LIST.${I18NKey}`) }));
    this.regionCityDataLoader = loadProgrameRegionidCities;
  },
  mounted() {
    rem();
    if (process.client) this.queryList();
  },
  methods: {
    setInitialPlaceinfo () {
      const { searchMode, region_city, lat, lng, location_type } = this.$route.query;
      this.searchMode = searchMode;
      this.placeInfo = {
        name: region_city,
        latitude: Number(lat) || null,
        longitude: Number(lng) || null,
        locationType: location_type
      };
    },
    OnRank(val) {
    },
    onroomNum() {
    },
    //  面积
    onAcreage(value) {
    },
    regionCityIndexBarSelectHandler ({ locationType, ...params }) {
      this.toggleDropdownMenu('item-region-city-dropdown');
      if (locationType === LocationType.L2_AREA) {
        const { name, latitude, longitude } = params;
        this.placeInfo = { ...this.placeInfo, lat: Number(latitude) || null, lng: Number(longitude) || null, name, locationType };
        this.queryList();
      } else if (locationType === LocationType.LOCALITY) {
        const { name, regionId } = params;
        searchCityGeolocation(name, regionId)
          .then(({ latitude, longitude }) => Object.assign(this.placeInfo, { latitude, longitude }))
          .finally(() => {
            this.placeInfo = { ...this.placeInfo, name, locationType };
            this.queryList();
          });
      }
    },
    priceRangeChangeHandler (range) {
      this.activePointId = '';
      if (this.isNew) {
        this.filteredNewProgrames =
          filterProgrammeListByConditions(this.newProgrames, range, [this.completionStatus], [this.selectedTypology]);
      }
    },
    selectedTypologyChangeHandler (selectedTypology) {
      this.activePointId = '';
      this.filteredNewProgrames =
        filterProgrammeListByConditions(this.newProgrames, this.priceRange, [this.completionStatus], [selectedTypology]);
    },
    completionStatusChangeHandler(status) {
      this.activePointId = '';
      this.filteredNewProgrames =
        filterProgrammeListByConditions(this.newProgrames, this.priceRange, [status], [this.selectedTypology]);
    },
    toggleDropdownMenu (key) {
      const el = this.$refs[key];
      if (el) el.toggle?.();
    },
    pointSelectHandler (idx) {
      // const itemEls = this.isNew ? this.$refs.programItem : [];
      // if (!Array.isArray(itemEls)) return;
      // const el = itemEls[idx];
      // if (!el) return;
      // this.activePointId = idx;
      // el.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    async queryList(initial = true) {
      let page = this.page;
      const lang = this._i18n.locale;
      if (initial) {
        page = 1;
        this.secondHousingList = [];
        this.newProgrames = [];
        this.filteredNewProgrames = [];
      } else {
        page++;
      }
      let params = { page, lang };
      this.isLoading = true;
      if (this.isNew) {
        const { place_id } = this.$route.query, { name: region_city, locationType } = this.placeInfo;
        if (!place_id && region_city) {
          const regions = [];
          if (locationType === LocationType.L1_AREA) {
            const found = L1AREA_REGIONS[region_city];
            if (found) regions.push(...found);
          } else if (locationType === LocationType.L2_AREA) {
            const found = L2AREA_REGION[region_city];
            if (found) regions.push(found);
          }
          if (regions.length) {
            return loadProgramesByRegions(regions)
              .then(programes =>
                Object.assign(this, setProgrames(programes, this.TypologyOption))
              )
              .finally(() => this.isLoading = false)
          }
        }
        if (place_id && locationType === LocationType.L2_AREA) {
          const { placeInfo } = (await this.$api.article.searchPlaceInfoById({ place_id })).data ?? {};
          if (placeInfo) {
            this.placeInfo = placeInfo;
            const regionId = placeInfo.postal_code.substring(0, 2);
            await loadProgramesByRegions([regionId])
              .then(programes => Object.assign(this, setProgrames(programes, this.TypologyOption)))
          }
          return this.isLoading = false;
        }
        if (place_id) params = { ...params, place_id };
        else if (region_city) params = { ...params, city_name: region_city };
        this.$api.article.searchProgramesByCity(params).then(res => {
          const { placeInfo, programes } = res.data;
          if (placeInfo && place_id) this.placeInfo = placeInfo;
          if (Array.isArray(programes)) {
            Object.assign(this, setProgrames(programes, this.TypologyOption));
          }
          // this.maxPage = maxPage;
          this.page = params.page;
        })
          .catch(console.error)
          .finally(() => this.isLoading = false);
      } else if (this.isSecondHand) {
      }
    }
  },
};

function setProgrames (programes, TypologyOption) {
  const { minPrice, maxPrice, typologyOptionKeys } = handleProgrames(programes, TypologyOption);
  return {
    minPrice, maxPrice, priceRange: [ minPrice, maxPrice ],
    typologyOptions: typologyOptionKeys
      .map(key => TypologyOption.find(it => it.value === key)).filter(Boolean),
    newProgrames: programes.slice(),
    filteredNewProgrames: programes.slice(),
  }
}

function generateHead (searchMode) {
  if (searchMode === SearchMode.NewPrograme) {
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
  }
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
}
</script>

<style lang="scss" scoped>
.m-list-page-wrapper {
  display: flex;
  flex-direction: column;
  font-size: 16px;
}
.list-wrapper {
  flex: 1;
  overflow-y: auto;
}
.sortimage {
  position: relative;
  top: 0.02rem;
}
.rank {
  line-height: 0.3rem;
}
.select,
.section {
  display: flex;
}
.select > div {
  width: 25%;
}
.section > div {
  width: 20%;
}
.map {
  height: 3.24rem;
  margin-bottom: .11rem;
}
.unit {
  font-size: 0.12rem;
  color: rgba(172, 172, 172, 1);
  line-height: 0.17rem;
  padding-left: 0.1rem;
}
.van-pull-refresh__track {
  margin-bottom: 0.25rem;
}
.sort-title {
  margin: 0.12rem;
  overflow: hidden;
  .second-hand {
    font-size: 0.2rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.76);
    line-height: 0.28rem;
    float: left;
  }
  .sorting {
    width: 0.81rem;
    height: 0.32rem;
    background: rgba(233, 233, 233, 1);
    float: right;
    font-size: 0.13rem;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
    line-height: 0.32rem;
    text-align: center;
  }
}
.title {
  font-size: 0.2rem;
  font-weight: 600;
  line-height: 0.28rem;
}
.watch {
  font-size: 0.13rem;
  color: rgba(35, 76, 211, 1);
  line-height: 0.18rem;
  float: right;
}
.text_title {
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(80, 80, 80, 1);
  line-height: 0.18rem;
  text-shadow: 0px 0.02rem 0.03rem rgba(255, 255, 255, 0.5);
}
.sort {
  font-size: 0.13rem;
  font-weight: 600;
  color: rgba(168, 168, 168, 1);
  line-height: 0.18rem;
}
.itemize {
  width: 0.45rem;
  height: 0.18rem;
  background: rgba(191, 191, 191, 1);
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.16rem;
  padding: 0 0.05rem;
  margin-right: 0.06rem;
}
.money {
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(255, 94, 94, 1);
  line-height: 0.22rem;
}
.year {
  position: absolute;
  top: 0;
  right: 0;
  padding: .02rem .1rem;
  background: rgba(35, 76, 211, 1);
  border-radius: 0px 0px 0px 0.13rem;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}
.num {
  // width:0.38rem;
  height: 0.17rem;
  background: rgba(106, 192, 120, 1);
  border-radius: 1px;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
  position: absolute;
  padding: 0 0.15rem;
  top: 0.75rem;
  left: 0.05rem;
}
.cover-image {
  width: 1.44rem;
  height: 0.98rem;
}
.img {
  width: 1.44rem;
  height: 0.98rem;
  position: relative;
  margin-right: 0.11rem;
}
.image {
  width: 1.44rem;
  margin-right: 0.11rem;
}
.new-list {
  li > div {
    display: flex;
  }
}
.text p {
  padding-bottom: 0.04rem;
}
.hr {
  border: none;
  height: 1px;
  background-color: #ececec;
}
.list-img {
  width: 0.28rem;
  height: 0.28rem;
}
.list-li {
  padding: 0 0 6px 0.1rem;
  &.active {
    border: 2px solid var(--main-blue);
  }
}
.van-popup {
  height: 1rem;
}
.section {
  padding: 0.1rem 0.1rem 0 0.1rem;
}
.dropdown-slider {
  padding-bottom: 0.2rem;
}
.btn-i {
  float: right;
  width: 1.1rem;
  margin: 0.1rem 0.2rem;
  background: rgba(35, 77, 212, 1);
  border-radius: 0.06rem;
}
</style>
<style>
.van-popup {
  padding-top: 0.3rem;
}
.region-city-dropdown-item .van-dropdown-item__content {
  height: 100%;
  max-height: unset;
  box-sizing: border-box;
  padding: 0 .02rem .03rem;
}
.m-list-page-wrapper .select .van-dropdown-menu .van-dropdown-menu__bar .van-dropdown-menu__title .van-ellipsis {
  font-size: .14rem;
}
</style>
