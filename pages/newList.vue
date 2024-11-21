<template>
  <div class="new-list-page" @click="hides">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/pc_index">{{ $t("message.global.home") }}</a></el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t("message.global.homeList") }}</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="content flex">
      <div class="content-left full-h">
        <div class="map-wrapper full-w full-h">
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
          <p class="content-title bold">{{ $t("message.global.method") }}</p>
          <el-row :gutter="8">
            <!-- Price range slider -->
            <el-col :span="6">
              <div class="price-range-btn full-w pointer micco-select customized" @click="priceSlideVis = true" v-popover:popover>
                <span class="label">{{ $t("message.global.price") }}</span>
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
                <span style="float:left;"> {{ fmoney(priceRange[0], 1) }} </span>
                <span style="float:right;">{{ fmoney(priceRange[1], 1) }}</span>
              </p>
            </el-popover>
            <!-- Compleyion status select -->
            <el-col :span="6">
              <el-select
                v-model="completionStatusArr"
                multiple
                class="micco-select"
                :placeholder="$t('message.NEW_LIST.ALL_COMPLETION_STATUS')"
              >
                <el-option v-for="it in CompletionStatusOption" :key="it.value" :label="it.label" :value="it.value"></el-option>
              </el-select>
            </el-col>
            <!-- Typology select 房型选择 -->
            <el-col :span="6">
              <el-select
                v-model="selectedTypologies"
                multiple
                class="micco-select"
                :placeholder="$t('message.NEW_LIST.ALL_TYPOLOGY_LABEL')"
              >
                <el-option v-for="it in typologyOptions" :key="it.value" :label="it.label" :value="it.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <!-- Programe List -->
          <div class="list" id="scroll-wrapper">
            <div
              v-for="(itemss) in filteredProgramList"
              :key="itemss.id"
              :id="'item-' + itemss.id"
              class="list-item"
              :class="{ active: itemss.id === activePointId }"
              @click="selectItem(itemss)"
            >
              <el-image :src="getImage(itemss)" :lazy="true">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div class="right-list-item">
                <div v-if="itemss.deliveryQuarter">
                  <el-tag size="small" effect="dark">{{ itemss.deliveryQuarter }}</el-tag>
                </div>
                <div class="title">{{ itemss.estate_name }}</div>
                <div class="info-row">
                  <i class="el-icon-location-outline" />
                  <span class="info">{{ itemss.zip_code }} / {{ itemss.city }}</span>
                </div>
                <div class="info-row">
                  <i class="el-icon-house" />
                  <span class="info">
                    {{ itemss.translatedTypologies.join(',') }}
                  </span>
                </div>
                <div class="price-range">
                  {{ fmoney(itemss.availablePropertiesMinPrice) }}€ - {{ fmoney(itemss.availablePropertiesMaxPrice) }}€
                </div>
                <div class="link-btn">
                  <el-button icon="el-icon-position" circle @click="listItemClickhandler(itemss)"></el-button>
                </div>
              </div>
            </div>
            <el-alert v-show="finished" :title="$t('message.global.noMore')" type="info" center show-icon :closable="false" />
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import { fmoney, scrollListener } from '../utils';
import JumpMap from '../components/jumpMap.vue';
import { TypologyOptionConfig, LocationType, L1AREA_REGIONS, L2AREA_REGION, loadProgramesByRegions } from '../common/config';
import { filterProgrammeListByConditions, CompletionStatusOptionConfig, handleProgrames } from '../utils/list';

export default {
  name: "newList",
  middleware: "responsive",
  components: {
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
      activePointId: '',
      page: 1,
      maxPage: 1,
    };
  },
  computed: {
    finished () {
      return this.page >= this.maxPage;
    },
    mapPoints () {
      return this.filteredProgramList.map((it) => {
        const { longitude, latitude, id } = it;
        return { id, longitude, latitude };
      });
    }
  },
  watch: {
    completionStatusArr (statusArr) {
      this.activePointId = '';
      this.filteredProgramList =
        filterProgrammeListByConditions(this.allProgramList, this.priceRange, statusArr, this.selectedTypologies);
    },
    selectedTypologies (typologies) {
      this.activePointId = '';
      this.filteredProgramList =
        filterProgrammeListByConditions(this.allProgramList, this.priceRange, this.completionStatusArr, typologies);
    },
  },
  created() {
    this.fmoney = fmoney;
    this.setInitialParams();
    this.CompletionStatusOption =
      CompletionStatusOptionConfig.map(({ key, I18NKey }) => ({ value:key, label: this.$t(`message.NEW_LIST.${I18NKey}`) }));
    this.TypologyOption = TypologyOptionConfig
      .map(({ incluedKey, I18NKey }) => ({ value: incluedKey, incluedKey, label: this.$t(`message.NEW_LIST.${I18NKey}`) }));
  },
  mounted () {
    if (process.client) this.getSearchNew();
  },
  beforeDestroy () {
  },
  methods: {
    setInitialParams () {
      const { region_city, lat, lng, location_type } = this.$route.query;
      this.placeInfo = {
        region_city,
        latitude: Number(lat) || null,
        longitude: Number(lng) || null,
        locationType: location_type,
      };
    },
    getImage (item) {
      if (item.image) return item.image;
      if (Array.isArray(item.images) && item.images.length) return item.images[0];
      return null;
    },
    togglePriceSlide() {
      this.priceSlideVis = !this.priceSlideVis;
    },
    hides() {
      this.priceSlideVis = false;
    },
    selectItem(item) {
      this.activePointId = item.id;
    },
    priceSlideChangeHandler () {
      this.activePointId = '';
      clearTimeout(this.__priceRangeChangeTimeout);
      this.__priceRangeChangeTimeout = setTimeout(() => {
        this.filteredProgramList =
          filterProgrammeListByConditions(this.allProgramList, this.priceRange, this.completionStatusArr, this.selectedTypologies);
      }, 500);
    },
    pointSelectHandler (id) {
      this.activePointId = id;
      const el = this.$el.querySelector('#scroll-wrapper')?.querySelector(`#item-${id}`);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    async getSearchNew() {
      this.dataLoading = true;
      this.activePointId = '';
      const { place_id } = this.$route.query, { locationType, region_city } = this.placeInfo;
      if (!place_id && !region_city) return;
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
              Object.assign(this, setProgrames.call(this, programes))
            )
            .finally(() => this.dataLoading = false)
        }
      }
      if (place_id && locationType === LocationType.L2_AREA) {
        const { placeInfo } = (await this.$api.article.searchPlaceInfoById({ place_id })).data ?? {};
        if (placeInfo) {
          this.placeInfo = placeInfo;
          const regionId = placeInfo.postal_code.substring(0, 2);
          await loadProgramesByRegions([regionId])
            .then(programes => Object.assign(this, setProgrames.call(this, programes)))
        }
        return this.dataLoading = false;
      }
      const lang = this._i18n.locale;
      const responseData = (await this.$api.article.searchProgramesByCity({ place_id, lang, city_name: region_city })).data;
      const { placeInfo, programes } = responseData || {};
      if (placeInfo?.longitude && placeInfo?.latitude) {
        this.placeInfo = { ...this.placeInfo, ...placeInfo };
      }
      if (Array.isArray(programes)) {
        Object.assign(this, setProgrames.call(this, programes));
      }
      this.dataLoading = false;
    },
    listItemClickhandler ({ zip_code, name_id, city, estate_name }) {
      this.$router.push({ path: '/newDetails', query: { zip_code, name_id, city, estate_name } });
    }
  },
};

function setProgrames (programes) {
  programes = programes.filter(it => it.id.toString() !== 'Infinity');
  const { minPrice, maxPrice, typologyOptionKeys } = handleProgrames(programes, this.TypologyOption);
  return {
    maxPrice, minPrice,
    priceRange: [ minPrice, maxPrice ],
    typologyOptions: typologyOptionKeys.map(key => this.TypologyOption.find(it => it.value === key)).filter(Boolean),
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
  margin: 20px 32px;
  .content {
    column-gap: 16px;
    margin-top: 16px;
    height: 800px;
    max-height: 70vh;
  }
  .content-left {
    width: 42%;
  }
  .content-right {
    flex: 1;
    overflow: hidden;
    .content-title {
      font-size: 24px;
      margin: 0 0 16px;
    }
    .list {
      flex: 1;
      overflow-y: auto;
      .list-item {
        display: flex;
        align-items: center;
        margin: 5px 0;
        border-bottom: 1px solid #ccc;
        &.active {
          border: 3px solid var(--main-blue);
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
            .info {
              display: inline-block;
              padding: 1px 0 0 4px;
              font-size: 14px;
              color: #373737;
            }
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
