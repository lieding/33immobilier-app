<template>
  <div class="new-list-page" @click="hidePopup">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/pc_index">{{ $t("message.global.HOME") }}</a></el-breadcrumb-item>
      <el-breadcrumb-item>{{ curPageBreadCrumb }}</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="content flex">
      <div class="content-left full-h">
        <div class="map-wrapper full-w full-h">
          <template v-if="placeInfo && placeInfo.longitude && placeInfo.latitude">
            <client-only>
              <jump-map
                :latitude="placeInfo.latitude"
                :longitude="placeInfo.longitude"
                :init-zoom="11"
                :points="mapPoints"
                :active-point-id="activePointId"
                :boundary-placeid="boundaryPlaceid"
                @pointSelect="pointSelectHandler"
              ></jump-map>
            </client-only>
          </template>
          <template v-else>
            <el-skeleton-item variant="rect" style="width: 240px; height: 240px;" />
          </template>
        </div>
      </div>
      <div class="content-right flex-column">
        <template v-if="dataLoading">
          <el-skeleton :rows="12" />
        </template>
        <template v-else>
          <p class="content-title bold">{{ $t("message.global.ALL_FRANCE_NEW") }}</p>
          <el-row :gutter="8">
            <!-- region/city selection -->
            <el-col :span="6">
              <div class=" full-w pointer micco-select customized" @click="startLocationSearch">
                <span class="label">{{ locationSearchText || $t("message.global.REGION_CITY_SEARCHPLACEHOLDER") }}</span>
                <i class="el-icon-place" />
              </div>
            </el-col>
            <!-- Price range slider -->
            <el-col :span="6">
              <div class=" full-w pointer micco-select customized" @click="priceSlideVis = true" v-popover:popover>
                <span class="label">{{ $t("message.global.PRICE") }}</span>
                <i class="el-icon-arrow-down" />
              </div>
            </el-col>
            <el-popover
              ref="popover"
              width="220"
              trigger="click"
            >
              <el-slider v-model="priceRange" :max="maxPrice" :min="minPrice" range @input="priceSlideChangeHandler"></el-slider>
              <p style="overflow:hidden">
                <span style="float:left;"> {{ fmoney(priceRange[0]) }}€</span>
                <span style="float:right;">{{ fmoney(priceRange[1]) }}€</span>
              </p>
              <div>
                <el-button type="text" @click="priceRange = [minPrice, maxPrice]">{{ $t('message.global.RESET') }}</el-button>
              </div>
            </el-popover>
            <!-- Compleyion status select / Surface slide range -->
            <el-col :span="6">
              <template v-if="secondHandMode">
                <div class=" full-w pointer micco-select customized" @click="surfaceSlideVis = true" v-popover:surfacePopover>
                  <span class="label">{{ $t("message.global.SURFACE") }}</span>
                  <i class="el-icon-arrow-down" />
                </div>
                <el-popover
                  ref="surfacePopover"
                  width="220"
                  trigger="click"
                >
                  <el-slider v-model="surfaceRange" :min="minSurface" :max="maxSurface" range @input="surfaceSlideChangeHandler"></el-slider>
                  <p style="overflow:hidden">
                    <span style="float:left;"> {{ surfaceRange[0] }}m²</span>
                    <span style="float:right;">{{ surfaceRange[1] }}m²</span>
                  </p>
                  <div>
                  <el-button type="text" @click="surfaceRange = [minSurface, maxSurface]">{{ $t('message.global.RESET') }}</el-button>
                </div>
                </el-popover>
              </template>
              <template v-else>
                <el-select
                  v-model="completionStatusArr"
                  multiple
                  clearable
                  class="micco-select"
                  :placeholder="$t('message.NEW_LIST.ALL_COMPLETION_STATUS')"
                >
                  <el-option v-for="it in CompletionStatusOption" :key="it.value" :label="it.label" :value="it.value"></el-option>
                </el-select>
              </template>
            </el-col>
            <!-- Typology select 房型选择 / class select -->
            <el-col :span="6">
              <template v-if="secondHandMode">
                <el-select
                  v-model="selectedClassLevels"
                  multiple
                  clearable
                  class="micco-select"
                  :placeholder="$t('message.PAGE_SECOND_HAND.CLASS_LEVEL')"
                >
                  <el-option v-for="it in ClassLevelList" :key="it.value" :label="it.label" :value="it.value"></el-option>
                </el-select>
              </template>
              <template v-else>
                <el-select
                  v-model="selectedTypologies"
                  multiple
                  clearable
                  class="micco-select"
                  :placeholder="$t('message.NEW_LIST.ALL_TYPOLOGY_LABEL')"
                >
                  <el-option v-for="it in typologyOptions" :key="it.value" :label="it.label" :value="it.value"></el-option>
                </el-select>
              </template>
            </el-col>
          </el-row>
          <template v-if="secondHandMode">
            <second-hand-list v-if="filteredSecondHandList.length" :list="filteredSecondHandList" />
            <el-empty v-else :description="$t('message.global.EMPTY')" :image-size="200"></el-empty>
          </template>
          <!-- Programe List -->
          <template v-else>
            <new-programe-list v-if="filteredProgramList.length" :list="filteredProgramList" :active-point-id="activePointId" @selectPoint="selectPoint" />
            <el-empty v-else :description="$t('message.global.EMPTY')" :image-size="200"></el-empty>
          </template>
        </template>
      </div>
    </section>
    <client-only>
      <!-- Department / city / zipcode searach dialog -->
      <el-dialog :visible.sync="locationSearchDialogVis" :close-on-click-modal="false" :title="$t('message.global.Where')" width="80%">
        <el-input
          v-model="locationSearch"
          :placeholder="$t('message.global.REGION_CITY_SEARCHPLACEHOLDER')"
          prefix-icon="el-icon-search"
          @input="locationSearchInputHandler"
        ></el-input>
        <div v-if="locationOptions" class="location-options flex">
          <div
            v-for="it in locationOptions" :key="it.searchKey"
            class="location-option-item pointer"
            @click="locationSearchSelectHandler(it)"
          >{{ it.title }}</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="locationSearchDialogVis = false">{{ $t('message.global.CANCEL') }}</el-button>
        </span>
      </el-dialog>
    </client-only>
  </div>
</template>

<script>
import { fmoney, scrollListener } from '../utils';
import JumpMap from '../components/jumpMap.vue';
import NewProgrameList from '../components/desktop/newProgrameList.vue';
import SecondHandList from '../components/desktop/secondHandList.vue';
import { TypologyOptionConfig, LocationType } from '../common/config';
import { SearchMode } from '../common/config';
import {
  filterProgrammeListByConditions,
  filterSecondHandListByConditions,
  CompletionStatusOptionConfig,
  handleProgrames,
  doProgrameQuery,
  doSecondHandQuery,
  loadProgrameDepartmentCities,
  loadSecondHandDepartmentCities,
  searchDepartmentCityPostcode,
  createSearchPlaceidParams,
} from '../utils/search';
import { searchCityGeolocation } from '../utils';

export default {
  name: "newList",
  middleware: "responsive",
  components: {
    JumpMap, NewProgrameList, SecondHandList,
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
    const searchMode = this.$route.query?.searchMode;
    return {
      searchMode,
      boundaryPlaceid: '',
      locationSearch: '',
      locationSearchDialogVis: false,
      locationOptions: [],
      dataLoading: true,
      placeInfo: {},
      priceRange: [0, 0],
      minPrice: 0,
      maxPrice: 0,
      priceSlideVis: false,
      surfaceRange: [0, 0],
      surfaceSlideVis: false,
      minSurface: 0,
      maxSurface: 0,
      selectedClassLevels: [],
      completionStatusArr: [],
      typologyOptions: [],
      selectedTypologies: [],
      allProgramList: [],
      filteredProgramList: [],
      allSecondhandList: [],
      mapPoints: [],
      filteredSecondHandList : [],
      activePointId: '',
      page: 1,
      maxPage: 1,
    };
  },
  computed: {
    finished () {
      return this.page >= this.maxPage;
    },
    locationSearchText () {
      const { department_city, postal_code } = this.placeInfo ?? {};
      return department_city || postal_code;
    },
    secondHandMode () {
      return this.searchMode === SearchMode.SecondHand;
    },
    curPageBreadCrumb () {
      return this.secondHandMode ? this.$t('message.global.SECOND_HAND') : this.$t("message.global.NEW_PROGRAME_LIST");
    }
  },
  watch: {
    completionStatusArr (statusArr) {
      this.activePointId = '';
      this.filteredProgramList =
        filterProgrammeListByConditions(this.allProgramList, this.priceRange, statusArr, this.selectedTypologies);
      this.getMapPoints();
    },
    selectedTypologies (typologies) {
      this.activePointId = '';
      this.filteredProgramList =
        filterProgrammeListByConditions(this.allProgramList, this.priceRange, this.completionStatusArr, typologies);
      this.getMapPoints();
    },
    selectedClassLevels (levels) {
      this.activePointId = '';
      this.filteredSecondHandList =
        filterSecondHandListByConditions(this.allSecondhandList, this.priceRange, this.surfaceRange, levels);
    },
    '$route.query.searchMode' (searchMode) {
      if (!searchMode) return;
      this.searchMode = searchMode;
      this.setSearchModeConcerningConfig();
      this.resetAllData();
      this.$nextTick(() => {
        this.setInitialParams();
        this.doSearch();
      });
    }
  },
  created() {
    this.fmoney = fmoney;
    this.setInitialParams();
    this.setSearchModeConcerningConfig();
  },
  mounted () {
    if (process.client) {
      this.setInitialParams();
      this.doSearch();
    }
  },
  methods: {
    resetAllData () {
      Object.assign(this, {
        locationSearch: '', locationSearchDialogVis: false, locationOptions: [],
        dataLoading: true,
        placeInfo: {},
        priceSlideVis: false, minPrice: 0, maxPrice: 0, priceRange: [0, 0],
        surfaceSlideVis: false, minSurface: 0, maxSurface: 0, surfaceRange: [0, 0],
        allProgramList: [], filteredProgramList: [],
        allSecondhandList: [], filteredSecondHandList : [],
        activePointId: '', mapPoints: [],
      });
    },
    setSearchModeConcerningConfig () {
      this.CompletionStatusOption =
        CompletionStatusOptionConfig.map(({ key, I18NKey }) => ({ value:key, label: this.$t(`message.NEW_LIST.${I18NKey}`) }));
      this.TypologyOption = TypologyOptionConfig
        .map(({ incluedKey, I18NKey }) => ({ value: incluedKey, incluedKey, label: this.$t(`message.NEW_LIST.${I18NKey}`) }));
      if (this.secondHandMode) {
        this.ClassLevelList = Object.entries(this.$t('message.PAGE_SECOND_HAND.CLASS_LEVEL_LIST'))
          .map(it => ({ value: it[0], label: it[1] }));
      }
    },
    setInitialParams () {
      const { department_city, lat, lng, location_type, postal_code } = this.$route.query;
      this.placeInfo = {
        department_city,
        latitude: Number(lat) || null,
        longitude: Number(lng) || null,
        locationType: location_type,
        postal_code,
      };
    },
    locationSearchSelectHandler (item) {
      let { department_id, name, longitude, latitude, postal_code, isDepartment, isPostalCode } = item;
      latitude = Number(latitude) || null, longitude = Number(longitude) || null;
      if (isDepartment) {
        this.placeInfo = { ...this.placeInfo, latitude, longitude, department_city: item.department_name, locationType: LocationType.L2_AREA };
        this.doSearch();
      } else {
        name = name || postal_code;
        const locationType = isPostalCode ? LocationType.POSTAL_CODE : null;
        const setRes = (latitude, longitude) => {
          this.placeInfo = { ...this.placeInfo, department_city: name, locationType, latitude, longitude, postal_code };
          this.doSearch();
        }
        if (latitude && longitude)
          setRes(latitude, longitude);
        else
          searchCityGeolocation(name, department_id).then(({ latitude, longitude }) => setRes(latitude, longitude));
      }
      this.locationSearchDialogVis = false;
    },
    locationSearchInputHandler () {
      if (!this.departmentCityInfo) return [];
      if (!this.locationSearch || this.locationSearch.length < 2)
        return this.locationOptions = this.departmentCityInfo.slice(0, 27);
      this.locationOptions = searchDepartmentCityPostcode(this.locationSearch, this.departmentCityInfo);
    },
    togglePriceSlide() {
      this.priceSlideVis = !this.priceSlideVis;
    },
    hidePopup() {
      this.priceSlideVis = false;
      this.surfaceSlideVis = false;
    },
    startLocationSearch () {
      if (!this.departmentCityInfo) {
        if (this.secondHandMode) {
          loadSecondHandDepartmentCities().then(info => this.departmentCityInfo = info).catch(console.error);
        } else {
          loadProgrameDepartmentCities().then(info => this.departmentCityInfo = info).catch(console.error);
        }
      }
      this.locationSearch = '';
      this.locationSearchDialogVis = true;
      this.locationOptions = this.departmentCityInfo?.slice(0, 24) ?? [];
    },
    selectPoint(item) {
      this.activePointId = item.id;
    },
    priceSlideChangeHandler () {
      this.activePointId = '';
      clearTimeout(this.__priceRangeChangeTimeout);
      this.__priceRangeChangeTimeout = setTimeout(() => {
        if (this.secondHandMode) {
          this.filteredSecondHandList =
            filterSecondHandListByConditions(this.allSecondhandList, this.priceRange, this.surfaceRange, this.selectedClassLevels);
        } else {
          this.filteredProgramList =
            filterProgrammeListByConditions(this.allProgramList, this.priceRange, this.completionStatusArr, this.selectedTypologies);
          this.getMapPoints();
        }
      }, 500);
    },
    surfaceSlideChangeHandler () {
      this.activePointId = '';
      clearTimeout(this.__surfaceRangeChangeTimeout);
      this.__surfaceRangeChangeTimeout = setTimeout(() => {
        this.filteredSecondHandList =
          filterSecondHandListByConditions(this.allSecondhandList, this.priceRange, this.surfaceRange, this.selectedClassLevels);
      }, 500);
    },
    pointSelectHandler (id) {
      this.activePointId = id;
      const el = this.$el.querySelector('#scroll-wrapper')?.querySelector(`#item-${id}`);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    getMapPoints () {
      this.mapPoints = this.filteredProgramList.map((it) => {
        const { longitude, latitude, id } = it;
        return { id, longitude, latitude };
      });
    },
    doSearch() {
      this.dataLoading = true;
      this.allProgramList = [], this.filteredProgramList = [], this.allSecondhandList = [], this.filteredSecondHandList = [];
      this.activePointId = '', this.mapPoints = [];
      const { place_id } = this.$route.query, { locationType, department_city, postal_code } = this.placeInfo;
      if (!place_id && !department_city && !postal_code) return;
      const lang = this._i18n.locale;
      const params = { place_id, locationType, postal_code, department_city, lang };
      const { searchSecondHandByCity, searchPlaceInfoById, searchProgramesByCity, searchPlaceId } = this.$api.article;
      let promise;
      if (this.secondHandMode) {
        const searchIdParams = createSearchPlaceidParams(place_id, postal_code, locationType, department_city);
        if (searchIdParams) {
          if (params.place_id)
            this.boundaryPlaceid = params.place_id;
          else
            searchPlaceId(searchIdParams).then(res => this.boundaryPlaceid = res.data.place_id);
        }
        promise = doSecondHandQuery(params, searchSecondHandByCity, searchPlaceInfoById)
        .then(res => {
          const { placeInfo = null, properties } = res || {};
          if (place_id && placeInfo) this.placeInfo = { ...this.placeInfo, ...placeInfo };
          if (Array.isArray(properties)) Object.assign(this, setSecondHand(properties));
        });
      } else {
        promise = doProgrameQuery(params, searchProgramesByCity, searchPlaceInfoById)
        .then((res) => {
          const { placeInfo = null, programes } = res || {};
          if (place_id && placeInfo)
            this.placeInfo = { ...this.placeInfo, ...placeInfo };
          if (Array.isArray(programes)) {
            Object.assign(this, setProgrames(programes, this.TypologyOption));
            this.getMapPoints();
          }
        });
      }
      promise?.catch(console.error).finally(() => this.dataLoading = false);
    },
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
  return {
    allSecondhandList: list,
    filteredSecondHandList: list,
    minPrice, maxPrice, priceRange,
    minSurface, maxSurface, surfaceRange,
  };
}

function setProgrames (programes, TypologyOption) {
  programes = programes.filter(it => it.id.toString() !== 'Infinity');
  const { minPrice, maxPrice, typologyOptionKeys } = handleProgrames(programes, TypologyOption);
  const typologyOptions = typologyOptionKeys
    .map(key => TypologyOption.find(it => it.value === key)).filter(Boolean);
  const priceRange = [ minPrice, maxPrice ];
  return {
    maxPrice, minPrice, priceRange,
    typologyOptions,
    allProgramList: programes,
    filteredProgramList: programes.slice(),
  };
}

function shortenPrice (price) {
  if (price > 99999) {
    return (price / 100000).toFixed(1) + 'M';
  }
  return (price / 1000).toFixed(0) + 'K';
}

</script>

<style lang="scss" scoped>
.new-list-page {
  margin: 0 32px;
  .content {
    column-gap: 16px;
    margin-top: 16px;
    height: calc(100vh - 90px);
  }
  .content-left {
    width: 52%;
  }
  .content-right {
    flex: 1;
    overflow: hidden;
    .content-title {
      font-size: 24px;
      margin: 0 0 16px;
    }
  }
}
.location-options {
  flex-wrap: wrap;
  justify-content: flex-start;
  row-gap: 12px;
  column-gap: 4px;
  margin-top: 24px;
  .location-option-item {
    width: 32%;
    text-align: center;
    box-sizing: border-box;
    padding: 5px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
    &:hover {
      border-color: var(--main-blue);
      color: var(--main-blue);
    }
  }
}
</style>
<style lang="scss">
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
