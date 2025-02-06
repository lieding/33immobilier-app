<template>
  <div class="m-list-page-wrapper">
  <client-only>
    <!-- 顶部筛选框 -->
    <div class="flex top-bar">
      <client-only>
        <!-- 区域 -->
        <van-dropdown-menu class="customized-dropdown-menu">
          <van-dropdown-item v-model="selectedDepartmentId" :options="departmentOptions" :title="$t('message.global.REGION_CITY_SEARCHPLACEHOLDER')"
            @change="selectedDepartmentIdChangeHandler"
          />
        </van-dropdown-menu>
        <!-- 价格 -->
        <van-dropdown-menu>
          <van-dropdown-item
            class="dropdown-slider"
            :title="$t('message.global.PRICE')"
            ref="item-dropdown-price"
          >
            <range-slider :modelValue.sync="priceRange" :min-value="minPrice" :max-value="maxPrice" @change="filterTableData" metric-str="€" />
            <div class="flex justify-end dropdown-btns">
              <van-button type="info" class="btn-i" @click="toggleDropdownMenu('item-dropdown-price')">{{ $t("message.global.CONFIRM") }}</van-button>
              <van-button type="warning" class="btn-i" @click="resetPriceRange">{{ $t('message.global.RESET') }}</van-button>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
        <!-- 面积 -->
        <van-dropdown-menu>
          <van-dropdown-item
            class="dropdown-slider"
            :title="$t('message.global.SURFACE')"
            ref="item-dropdown-surface"
          >
            <range-slider :modelValue.sync="surfaceRange" :min-value="minSurface" :max-value="maxSurface" @change="filterTableData" metric-str="m²" />
            <div class="flex justify-end dropdown-btns">
              <van-button type="info" class="btn-i" @click="toggleDropdownMenu('item-dropdown-surface')">{{ $t("message.global.CONFIRM") }}</van-button>
              <van-button type="warning" class="btn-i" @click="resetSurfaceRange">{{ $t('message.global.RESET') }}</van-button>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
        <!-- Category -->
        <van-dropdown-menu class="customized-dropdown-menu">
          <van-dropdown-item v-model="selectedCategoryId" :options="categoryOptions" :title="$t('message.PAGE_STORE.CATEGORY')"
            @change="filterTableData"
          />
        </van-dropdown-menu>
      </client-only>
    </div>
    <div class="list-wrapper" id="scroll-wrapper">
      <client-only>
        <search-result-list
          :data-loading="dataLoading"
          :search-mode="SearchMode.Store"
          :list="resultList"
          :department-id="selectedDepartmentId"
        />
      </client-only>
      <van-skeleton title :row="6" v-show="dataLoading" />
    </div>
    <div class="pagination-container">
      <van-pagination
        v-model="curPage"
        :total-items="dataCnt"
        :items-per-page="pageSize"
        :prev-text="$t('message.global.PREV')"
        :next-text="$t('message.global.NEXT')"
      />
    </div>
    <hr class="hr" />
  </client-only>
  </div>
</template>

<script>
import rem from "~/common/rem.js";
import RangeSlider from '../components/mobile/rangeSlider.vue';
import { fmoney } from '../utils';
import { SearchMode } from '../common/config';
import SearchResultList from '../components/mobile/searchResultList.vue';
import { loadConfig, loadStores, filterTableDataByConditions, CSV_SPLIT_SIZE, getInstanceParams } from '../utils/store';

export default {
  name: "",
  middleware: "responsive",
  components: {
    RangeSlider,
    SearchResultList,
  },
  head() {
    return generateHead();
  },
  data() {
    return {
      dataLoading: false,
      departmentOptions: [],
      selectedDepartmentId: '',
      allTableData: [],
      filterdData: [],
      minPrice: 0, //价格
      maxPrice: 0, //最大价格
      priceRange: [0, 0],
      surfaceRange: [0, 0], //面积
      minSurface: 0, //最小面积
      maxSurface: 0, //最大面积
      selectedCategoryId: '',
      categoryOptions: [],
      pageSize: 20,
      curPage: 1,
      dataCnt: 0,
    };
  },
  created () {
    this.fmoney = fmoney;
    this.SearchMode = SearchMode;
    const categoryOptions = Object.entries(this.$t('message.PAGE_STORE.CATEGORIES'))
      .map(it => ({ value: it[0], text: it[1] }));
    categoryOptions.unshift({ value: '', text: this.$t('message.global.ALL_OPTIONS') });
    this.categoryOptions = categoryOptions;
  },
  mounted () {
    if (!process.client) return;
    rem();
    this.loadConfig();
  },
  computed: {
    resultList () {
      const start = (this.curPage - 1) * this.pageSize, end = this.curPage * this.pageSize;
      return this.filterdData.slice(start, end);
    }
  },
  methods: {
    loadConfig () {
      this.dataLoading = true;
      loadConfig().then(departmentOptions => {
        if (!departmentOptions.length) return;
        for (const it of departmentOptions)
          it.value = it.departmentId, it.text = it.departmentName;
        this.departmentOptions = departmentOptions;
        this.selectedDepartmentId = '75';
        this.selectedDepartmentIdChangeHandler('75');
      });
    },
    selectedDepartmentIdChangeHandler(departmentId) {
      const found = this.departmentOptions.find(it => it.departmentId === departmentId);
      if (!found) return;
      Object.assign(this, {
        selectedCategoryId: '',
        allTableData: [], filterdData: [],
        curPage: 1,
        dataCnt: 0,
        minPrice: 0, maxPrice: 0, priceRange: [0, 0],
        minSurface: 0, maxSurface: 0, surfaceRange: [0, 0],
      });
      this.dataCnt = found.totalCnt || 0;
      this.loadStoresGroupedByDepartmentId();
    },
    filterTableData() {
      if (!this._allReady) return;
      this.filterdData = [];
      this.curPage = 1;
      this.dataCnt = 0;
      const filtered =
        filterTableDataByConditions(this.allTableData, this.selectedCategoryId, this.priceRange, this.surfaceRange);
      this.filterdData = filtered;
      this.dataCnt = filtered.length;
    },
    resetPriceRange () {
      this.priceRange = [this.minPrice, this.maxPrice];
      this.priceRangeChangeHandler();
    },
    resetSurfaceRange () {
      this.surfaceRange = [this.minSurface, this.maxSurface];
      this.surfaceRangeChangeHandler();
    },
    toggleDropdownMenu (key) {
      const el = this.$refs[key];
      if (el) el.toggle?.();
    },
    loadStoresGroupedByDepartmentId() {
      this.dataLoading = true;
      const index = Math.floor(this.dataCnt / CSV_SPLIT_SIZE);
      const addRows = (rows) => {
        if (Array.isArray(rows))
          this.allTableData = [ ...this.allTableData, ...rows ];
      }
      // Load the first page
      const { promise, remainingPromise } = loadStores(this.selectedDepartmentId, index, addRows);
      promise.finally(() => {
        Object.assign(this, getInstanceParams(this.allTableData));
        this.dataLoading = false;
        if (!remainingPromise) setTimeout(() => this._allReady = true, 3000);
      });
      remainingPromise?.finally(() => {
        Object.assign(this, getInstanceParams(this.allTableData));
        setTimeout(() => this._allReady = true, 3000);
      });
    },
  },
};

function generateHead () {
  return {
    title: "法国商铺就上法国Micco immo网",
    meta: [
      { name: "description", content: "法国Micco immo商铺频道为您查找真实优质的法国商铺,法国Micco immo收录全法最新最全商铺信息。" },
      { name: "keywords", content: "法国商铺" }
    ]
  };
}
</script>

<style lang="scss" scoped>
.m-list-page-wrapper {
  display: flex;
  flex-direction: column;
}
.list-wrapper {
  // flex: 1;
  // overflow-y: auto;
}
.pagination-container {

}
.top-bar > div {
  width: 25%;
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
.dropdown-btns {
  margin: .2rem 0 .1rem;
  .btn-i {
    margin: 0 0.1rem;
    border-radius: 0.06rem;
  }
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
.van-pagination {
  .van-pagination__item {
    color: #333;
  }
  .van-pagination__item--active {
    background-color: var(--main-blue);
    color: #fff;
  }
}
</style>
