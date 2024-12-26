<template>
  <div class="renting-list-page" :class="{ desktop: isDesktop, mobile: isMobile }" @click="hidePopup">
    <el-breadcrumb separator="/" v-if="isDesktop">
      <el-breadcrumb-item><a href="/pc_index">{{ $t("message.global.HOME") }}</a></el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('message.global.RENTING') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="content" :class="{ desktop: isDesktop, mobile: isMobile }">
      <search-bar
        v-if="isMobile"
        :location-search-text="placeInfo.department_city"
        @rentType="conditionChangeHandler('rentType', $event)"
        @availableDate="conditionChangeHandler('availableDate', $event)"
        @rentDuration="conditionChangeHandler('rentDuration', $event)"
        @priceRange="conditionChangeHandler('priceRange', $event)"
        @surfaceRange="conditionChangeHandler('surfaceRange', $event)"
        @location="locationSearchHandler"
        ref="searchBar"
      />
      <div class="content-map" :class="{ desktop: isDesktop, mobile: isMobile }">
        <div class="map-wrapper" :class="{ desktop: isDesktop, mobile: isMobile }">
          <template v-if="placeInfo && placeInfo.longitude && placeInfo.latitude">
            <client-only>
              <jump-map
                :latitude="placeInfo.latitude"
                :longitude="placeInfo.longitude"
                :init-zoom="11"
                :points="mapPoints"
                :active-point-id="activePointId"
                @pointSelect="pointSelectHandler"
              ></jump-map>
            </client-only>
          </template>
          <template v-else>
            <el-skeleton-item variant="rect" style="width: 240px; height: 240px;" />
          </template>
        </div>
      </div>
      <div class="content-list" :class="{ desktop: isDesktop, mobile: isMobile }">
        <p class="content-title bold" v-if="isDesktop">{{ $t("message.global.RENTING") }}</p>
        <search-bar
          v-if="isDesktop"
          :location-search-text="placeInfo.department_city"
          @rentType="conditionChangeHandler('rentType', $event)"
          @availableDate="conditionChangeHandler('availableDate', $event)"
          @rentDuration="conditionChangeHandler('rentDuration', $event)"
          @priceRange="conditionChangeHandler('priceRange', $event)"
          @surfaceRange="conditionChangeHandler('surfaceRange', $event)"
          @location="locationSearchHandler"
          ref="searchBar"
        />
        <template v-if="loading">
          <el-skeleton :rows="8" animated />
        </template>
        <template v-else>
          <scroll-list v-if="filteredList.length" :list="filteredList" :finished="true" :active-point-id="activePointId" @selectRow="selectRowHandler" />
          <el-empty v-else :description="$t('message.global.EMPTY')" :image-size="200"></el-empty>
        </template>
      </div>
    </section>
  </div>
</template>

<script lang="js">
import rem from "~/common/rem.js";
import { fmoney, searchCityGeolocation } from '../../utils';
import JumpMap from '../../components/jumpMap.vue';
import SearchBar from './searchBar.vue';
import ScrollList from './list.vue';
import { parseRentings, filterTableData } from './helper.js';

const PLACEINFO_SESSION_KEY = 'M_PLACEINFO';

export default {
  middleware: "responsive",
  components: {
    JumpMap,
    SearchBar,
    ScrollList,
  },
  data () {
    return {
      loading: false,
      placeInfo: {},
      minPrice: 0, maxPrice: 0,
      minSurface: 0, maxSurface: 0,
      allList: [],
      filteredList: [],
      conditions: {},
      activePointId: '',
    };
  },
  created () {
    this.fmoney = fmoney;
    this.setInitialParams();
  },
  mounted () {
    if (this.isMobile) rem();
    if (process.client) {
      if (this.isMobile) this.setInitialParams();
      this.queryList();
    }
  },
  computed: {
    isDesktop () {
      return this.$device.isDesktop;
    },
    isMobile () {
      return this.$device.isMobile;
    },
    mapPoints () {
      return this.filteredList.map((it) => {
        const { longitude, latitude, id } = it;
        return { id, longitude, latitude };
      });
    },
  },
  watch: {
    placeInfo (obj) {
      if (!this.isMobile) return;
      sessionStorage.setItem(PLACEINFO_SESSION_KEY, obj ? JSON.stringify(obj) : '');
    },
  },
  methods: {
    setInitialParams () {
      if (process.client && this.isMobile) {
        const cached = sessionStorage.getItem(PLACEINFO_SESSION_KEY);
        if (this.__fromDetailPage && cached) {
          const placeInfo = JSON.parse(cached);
          sessionStorage.removeItem(PLACEINFO_SESSION_KEY);
          return this.placeInfo = placeInfo;
        }
      }
      const { department_city, lat, lng, location_type, postal_code } = this.$route.query;
      this.placeInfo = {
        department_city,
        latitude: Number(lat) || null,
        longitude: Number(lng) || null,
        locationType: location_type,
        postal_code,
      };
    },
    resetParams () {
      Object.assign(this, {
        allList: [], filteredList: [],
        conditions: {}, activePointId: '',
        minPrice: 0, maxPrice: 0,
        minSurface: 0, maxSurface: 0,
      });
    },
    hidePopup() {
      this.priceSlideVis = false;
      this.surfaceSlideVis = false;
    },
    conditionChangeHandler (condition, val) {
      if (!this.__changeConditionEnabled) return;
      this.activePointId = '';
      this.conditions[condition] = val;
      this.filteredList = filterTableData(
        this.allList,
        this.conditions.rentType,
        this.conditions.availabledate,
        this.conditions.rentDuration,
        this.conditions.priceRange,
        this.conditions.surfaceRange
      );
    },
    selectRowHandler (item) {
      this.activePointId = item.id;
    },
    pointSelectHandler (id) {
      if (!this.isDesktop) return;
      this.activePointId = id;
      const el = this.$el.querySelector('#scroll-wrapper')?.querySelector(`#item-${id}`);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    locationSearchHandler ({ city, locationType, zip_code }) {
      if (!city) return;
      searchCityGeolocation(city)
        .then((location) => {
          const { latitude, longitude } = location || {};
          if (!latitude || !longitude) return;
          this.placeInfo = { ...this.placeInfo,
            department_city: city, locationType, postal_code: zip_code, latitude, longitude };
          this.queryList();
        });
    },
    async queryList () {
      const { place_id } = this.$route.query;
      const { department_city, postal_code } = this.placeInfo;
      if (!place_id && !department_city && !postal_code) return;
      this.loading = true;
      this.resetParams();
      this.__changeConditionEnabled = false;
      const res = await this.$api.article.searchRentings({ place_id, zip_code: postal_code, city: department_city });
      const { placeInfo, rentings } = res.data || {};
      if (placeInfo) this.placeInfo = { ...this.placeInfo, ...placeInfo };
      if (Array.isArray(rentings)) {
        const { priceRange, surfaceRange, ...params } = parseRentings(rentings);
        Object.assign(this, params);
        this.allList = this.filteredList = rentings;
        const searchBarRef = this.$refs.searchBar;
        if (searchBarRef) searchBarRef.setRanges({ priceRange, surfaceRange });
      }
      setTimeout(() => this.__changeConditionEnabled = true, 3000);
      this.loading = false;
    },
  },
  beforeRouteEnter(_, from, next) {
    let __fromDetailPage = undefined;
    if (from.path.includes(('detail')))
      __fromDetailPage = true;
    next(vm => vm.__fromDetailPage = __fromDetailPage);
  },
}
</script>

<style lang="scss" scoped>
.renting-list-page {
  &.desktop {
    margin: 0 32px;
  }
  &.mobile {
    margin: 0 .1rem;
  }
  .content {
    &.desktop {
      display: flex;
      column-gap: 16px;
      margin-top: 16px;
      height: calc(100vh - 90px);
    }
    &.mobile {
      width: 100%;
    }
    .content-map {
      &.desktop {
        width: 52%;
        height: 100%;
      }
      &.mobile {
        height: 3.24rem;
        margin: .08rem 0;
      }
      .map-wrapper {
        &.desktop {
          width: 100%;
          height: 100%;
        }
        &.mobile {
          width: 100%;
          height: 100%;
        }
      }
    }
    .content-list {
      &.desktop {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
