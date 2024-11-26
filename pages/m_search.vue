<template>
  <div class="m-list-page-wrapper">
    <!-- 顶部筛选框 -->
    <div class="flex top-bar">
      <client-only>
        <!-- 区域 -->
        <van-dropdown-menu class="customized-dropdown-menu">
          <van-dropdown-item
            :title="departmentCityDropdownMenuTitle"
            class="department-city-dropdown-item"
            @open="departmentCitySearchBarVis = true"
            ref="item-department-city-dropdown"
          >
            <department-city-search-bar :visible="departmentCitySearchBarVis" :data-loader="departmentCityDataLoader" @select="departmentCityIndexBarSelectHandler" />
          </van-dropdown-item>
        </van-dropdown-menu>
        <!-- 价格 -->
        <van-dropdown-menu>
          <van-dropdown-item
            class="dropdown-slider"
            :title="$t('message.global.price')"
            ref="item-dropdown-price"
          >
            <range-slider :modelValue.sync="priceRange" :min-value="minPrice" :max-value="maxPrice" @change="priceRangeChangeHandler" />
            <van-button type="info" @click="toggleDropdownMenu('item-dropdown-price')" class="btn-i">{{ $t("message.global.CONFIRM") }}</van-button>
          </van-dropdown-item>
        </van-dropdown-menu>
        <!-- 面积 -->
        <van-dropdown-menu v-if="isSecondHand">
          <van-dropdown-item
            class="dropdown-slider"
            :title="$t('message.global.SURFACE')"
            ref="item-dropdown-surface"
          >
            <range-slider :modelValue.sync="surfaceRange" :min-value="minSurface" :max-value="maxSurface" @change="surfaceRangeChangeHandler" />
            <van-button type="info" @click="toggleDropdownMenu('item-dropdown-surface')" class="btn-i">{{ $t("message.global.CONFIRM") }}</van-button>
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
        <!-- Tpology 房型 -->
        <van-dropdown-menu class="customized-dropdown-menu" v-if="isNew">
          <van-dropdown-item v-model="selectedTypology" :options="typologyOptions" :title="$t('message.NEW_LIST.ALL_TYPOLOGY_LABEL')"
            @change="selectedTypologyChangeHandler"
          />
        </van-dropdown-menu>
        <!-- Class Level  -->
        <van-dropdown-menu class="customized-dropdown-menu" v-if="isSecondHand">
          <van-dropdown-item v-model="selectedClassLevel" :options="ClassLevelList" :title="$t('message.PAGE_SECOND_HAND.CLASS_LEVEL')"
            @change="selectedClassLevelChangeHandler"
          />
        </van-dropdown-menu>
      </client-only>
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
    <div class="list-wrapper" id="scroll-wrapper">
      <client-only>
        <search-result-list :data-loading="dataLoading" :search-mode="searchMode" :list="resultList" :active-point-id="activePointId" />
      </client-only>
      <van-skeleton title :row="6" v-show="dataLoading" />
    </div>
    <hr class="hr" />
  </div>
</template>

<script>
import rem from "~/common/rem.js";
import RangeSlider from '../components/mobile/rangeSlider.vue';
import { fmoney, searchCityGeolocation } from '../utils';
import { SearchMode } from '../common/config';
import JumpMap from '../components/jumpMap.vue';
import DepartmentCitySearchBar from '../components/mobile/departmentCitySearchBar.vue';
import SearchResultList from '../components/mobile/searchResultList.vue';
import { TypologyOptionConfig, LocationType } from '../common/config';
import {
  filterProgrammeListByConditions,
  filterSecondHandListByConditions,
  CompletionStatusOptionConfig,
  handleProgrames,
  doProgrameQuery,
  doSecondHandQuery,
  loadProgrameDepartmentCities,
  loadSecondHandDepartmentCities,
} from '../utils/search';

export default {
  name: "",
  middleware: "responsive",
  components: {
    RangeSlider,
    JumpMap,
    DepartmentCitySearchBar,
    SearchResultList,
  },
  head() {
    return generateHead(this.searchMode);
  },
  data() {
    const searchMode = this.$route.query.searchMode;
    return {
      searchMode,
      visible: false,
      activePointId: '',
      completionStatus: "",
      minPrice: 0, //价格
      maxPrice: 0, //最大价格
      priceRange: [0, 0],
      surfaceRange: [0, 1], //面积
      minSurface: 0, //最小面积
      maxSurface: 0, //最大面积
      page: 1, //页数
      dataLoading: false, //下拉刷新
      allProgramList: [], //新房
      filteredProgramList: [],
      allSecondhandList: [],
      filteredSecondHandList : [],
      typologyOptions: [], // 房型选择列表
      selectedTypology: null,
      selectedClassLevel: null,
      placeInfo: null,
      maxPage: 1, //新房的最大页数
      departmentCitySearchBarVis: false,
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
    resultList () {
      return this.isSecondHand ? this.filteredSecondHandList : this.filteredProgramList;
    },
    finished () {
      return this.isNew ? true : this.page >= this.maxPage;
    },
    departmentCityDropdownMenuTitle () {
      const { department_city, postal_code } = this.placeInfo ?? {};
      const text = department_city || postal_code || this.$t('message.PAGE_INDEX.SELECT_CITY');
      return text.length > 6 ? (text.substring(0, 6) + '..') : text;
    },
    mapPoints () {
      return this.filteredProgramList?.map((it) => {
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
    if (this.isSecondHand) {
      this.departmentCityDataLoader = loadSecondHandDepartmentCities;
      this.ClassLevelList = Object
        .entries(this.$t('message.PAGE_SECOND_HAND.CLASS_LEVEL_LIST'))
        .map(it => ({ value: it[0], text: it[1] }));
    } else {
      this.departmentCityDataLoader = loadProgrameDepartmentCities;
    }
  },
  mounted() {
    rem();
    if (process.client) this.queryList();
  },
  methods: {
    setInitialPlaceinfo () {
      const { searchMode, department_city, lat, lng, location_type, postal_code } = this.$route.query;
      this.searchMode = searchMode;
      this.placeInfo = {
        department_city,
        latitude: Number(lat) || null,
        longitude: Number(lng) || null,
        locationType: location_type,
        postal_code,
      };
    },
    departmentCityIndexBarSelectHandler (item) {
      this.toggleDropdownMenu('item-department-city-dropdown');
      let { departmentId, name, longitude, latitude, postal_code, locationType } = item;
      latitude = Number(latitude) || null, longitude = Number(longitude) || null;
      if ([LocationType.L2_AREA, LocationType.POSTAL_CODE].includes(locationType)) {
        this.placeInfo = { ...this.placeInfo, latitude, longitude, department_city: name, locationType, postal_code };
        this.queryList();
      } else {
        name = name || postal_code;
        const setRes = (latitude, longitude) => {
          this.placeInfo = { ...this.placeInfo, department_city: name, locationType, longitude, latitude };
          this.queryList();
        }
        if (latitude && longitude)
          setRes(latitude, longitude);
        else
          searchCityGeolocation(name, departmentId).then(({ latitude, longitude }) => setRes(latitude, longitude));
      }
    },
    priceRangeChangeHandler (range) {
      this.activePointId = '';
      if (this.isNew) {
        this.filteredProgramList =
          filterProgrammeListByConditions(this.allProgramList, range, [this.completionStatus], [this.selectedTypology]);
      } else if (this.isSecondHand) {
        this.filteredSecondHandList =
          filterSecondHandListByConditions(this.allSecondhandList, range, this.surfaceRange, [this.selectedClassLevel]);
      }
    },
    surfaceRangeChangeHandler (range) {
      this.activePointId = '';
      this.filteredSecondHandList =
        filterSecondHandListByConditions(this.allSecondhandList, this.priceRange, range, [this.selectedClassLevel]);
    },
    selectedTypologyChangeHandler (selectedTypology) {
      this.activePointId = '';
      this.filteredProgramList =
        filterProgrammeListByConditions(this.allProgramList, this.priceRange, [this.completionStatus], [selectedTypology]);
    },
    selectedClassLevelChangeHandler (classLevel) {
      this.activePointId = '';
      this.filteredSecondHandList =
        filterSecondHandListByConditions(this.allSecondhandList, this.priceRange, this.surfaceRange, [classLevel]);
    },
    completionStatusChangeHandler(status) {
      this.activePointId = '';
      this.filteredProgramList =
        filterProgrammeListByConditions(this.allProgramList, this.priceRange, [status], [this.selectedTypology]);
    },
    toggleDropdownMenu (key) {
      const el = this.$refs[key];
      if (el) el.toggle?.();
    },
    pointSelectHandler (id) {
      this.activePointId = id;
      const el = this.$el.querySelector('#scroll-wrapper')?.querySelector(`#item-${id}`);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    async queryList(initial = true) {
      let page = this.page;
      this.activePointId = '';
      if (initial) {
        page = 1;
        this.allProgramList = [];
        this.filteredProgramList = [];
        this.allSecondhandList = [];
        this.filteredSecondHandList = [];
      } else {
        page++;
      }
      this.dataLoading = true;
      const { place_id } = this.$route.query, { department_city, locationType, postal_code } = this.placeInfo;
      const params = { page, place_id, department_city, locationType, postal_code };
      try {
        const { searchSecondHandByCity, searchPlaceInfoById, searchProgramesByCity } = this.$api.article;
        if (this.isNew) {
          const { placeInfo, programes } = await doProgrameQuery(params, searchProgramesByCity, searchPlaceInfoById);
          if (placeInfo && place_id) this.placeInfo = { ...this.placeInfo, ...placeInfo };
          if (Array.isArray(programes))
            Object.assign(this, setProgrames(programes, this.TypologyOption));
        } else if (this.isSecondHand) {
          const { placeInfo, properties } = await doSecondHandQuery(params, searchSecondHandByCity, searchPlaceInfoById);
          if (place_id && placeInfo) this.placeInfo = { ...this.placeInfo, ...placeInfo };
          if (Array.isArray(properties)) Object.assign(this, setSecondHand(properties));
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.dataLoading = false;
      }
    }
  },
};

function setSecondHand (list) {
  let minPrice = 0, maxPrice = 0, minSurface = 0, maxSurface = 0;
  for (let { price, surface } of list) {
    price = price || 0, surface = surface || 0;
    minPrice = !minPrice ? price : Math.min(minPrice, price);
    maxPrice = !maxPrice ? price : Math.max(maxPrice, price);
    minSurface = !minSurface ? surface : Math.min(minSurface, surface);
    maxSurface = !maxSurface ? surface : Math.max(maxSurface, surface);
  }
  const priceRange = [minPrice, maxPrice], surfaceRange = [minSurface, maxSurface];
  return { allSecondhandList: list, filteredSecondHandList: list, minPrice, maxPrice, minSurface, maxSurface, priceRange, surfaceRange };
}

function setProgrames (programes, TypologyOption) {
  const { minPrice, maxPrice, typologyOptionKeys } = handleProgrames(programes, TypologyOption);
  return {
    minPrice, maxPrice, priceRange: [ minPrice, maxPrice ],
    typologyOptions: typologyOptionKeys
      .map(key => TypologyOption.find(it => it.value === key)).filter(Boolean),
    allProgramList: programes.slice(),
    filteredProgramList: programes.slice(),
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
  height: calc(100vh - .06rem);
}
.hr {
  border: none;
  height: 1px;
  background-color: #ececec;
}
.list-wrapper {
  flex: 1;
  overflow-y: auto;
}
.top-bar > div {
  width: 25%;
}
.map {
  height: 3.24rem;
  margin-bottom: .11rem;
}
.van-pull-refresh__track {
  margin-bottom: 0.25rem;
}
.van-popup {
  height: 1rem;
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
.department-city-dropdown-item .van-dropdown-item__content {
  height: 100%;
  max-height: unset;
  box-sizing: border-box;
  padding: 0 .02rem .03rem;
}
.m-list-page-wrapper .select .van-dropdown-menu .van-dropdown-menu__bar .van-dropdown-menu__title .van-ellipsis {
  font-size: .14rem;
}
</style>
