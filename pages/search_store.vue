<template>
  <div class="search-store-page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/pc_index">{{ $t("message.global.HOME") }}</a></el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('message.global.STORE') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="content desktop-placed-center">
      <template v-if="dataLoading">
        <el-skeleton :rows="12" />
      </template>
      <template v-else>
        <p class="content-title bold">{{ $t("message.global.STORE") }}</p>
        <el-row :gutter="8">
          <!-- department selection -->
          <el-col :span="6">
            <el-select
              v-model="selectedDepartmentId"
              class="full-w micco-select"
              :placeholder="$t('message.global.REGION_CITY_SEARCHPLACEHOLDER')"
            >
              <el-option
                v-for="it in departmentOptions"
                :key="it.departmentId"
                :label="it.departmentName"
                :value="it.departmentId"
              ></el-option>
            </el-select>
          </el-col>
          <!-- Price range slider -->
          <el-col :span="6">
            <div class="full-w pointer micco-select customized" @click="priceSlideVis = true" v-popover:popover>
              <span class="label">{{ $t("message.global.PRICE") }}</span>
              <i class="el-icon-arrow-down" />
            </div>
          </el-col>
          <el-popover
            ref="popover"
            width="220"
            trigger="click"
          >
            <el-slider v-model="priceRange" :max="maxPrice" :min="minPrice" range @input="filterTableData"></el-slider>
            <p style="overflow:hidden">
              <span style="float:left;"> {{ fmoney(priceRange[0]) }}€</span>
              <span style="float:right;">{{ fmoney(priceRange[1]) }}€</span>
            </p>
            <div>
              <el-button type="text" @click="priceRange = [minPrice, maxPrice]">{{ $t('message.global.RESET') }}</el-button>
            </div>
          </el-popover>
          <!-- Surface slide range -->
          <el-col :span="6">
            <div class="full-w pointer micco-select customized" @click="surfaceSlideVis = true" v-popover:surfacePopover>
              <span class="label">{{ $t("message.global.SURFACE") }}</span>
              <i class="el-icon-arrow-down" />
            </div>
            <el-popover
              ref="surfacePopover"
              width="220"
              trigger="click"
            >
              <el-slider v-model="surfaceRange" :min="minSurface" :max="maxSurface" range @input="filterTableData"></el-slider>
              <p style="overflow:hidden">
                <span style="float:left;"> {{ surfaceRange[0] }}m²</span>
                <span style="float:right;">{{ surfaceRange[1] }}m²</span>
              </p>
              <div>
                <el-button type="text" @click="surfaceRange = [minSurface, maxSurface]">{{ $t('message.global.RESET') }}</el-button>
              </div>
            </el-popover>
          </el-col>
          <!-- Category select -->
          <el-col :span="6">
            <el-select
              v-model="selectedCategoryId"
              clearable
              class="full-w micco-select"
              :placeholder="$t('message.PAGE_STORE.CATEGORY')"
            >
              <el-option v-for="it in categoryOptions" :key="it.value" :label="it.label" :value="it.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="table-container">
          <el-table :data="tableData" stripe style="width: 100%" @row-click="rowClickHandler">
            <el-table-column :width="120">
              <template slot-scope="scope">
                <img :src="getCategoryImg(scope.row)" class="category-img" />
              </template>
            </el-table-column>
            <el-table-column prop="title" :label="$t('message.global.TITLE')" />
            <el-table-column :label="$t('message.PAGE_STORE.CATEGORY')" prop="category" />
            <el-table-column prop="zip_code" :label="$t('message.global.POSTAL_CODE')" :width="160">
              <template slot-scope="scope"><span>{{ scope.row.zip_code || '' }}</span></template>
            </el-table-column>
            
            <el-table-column :label="$t('message.global.PRICE')" :width="160">
              <template slot-scope="scope"><span>{{ fmoney(scope.row.price) }}€</span></template>
            </el-table-column>
            <el-table-column :label="$t('message.global.SURFACE')" :width="160">
              <template slot-scope="scope"><span>{{ scope.row.surface ? `${scope.row.surface}m²` : '' }}</span></template>
            </el-table-column>
            <el-table-column :label="$t('message.global.ESTIMATED_MONTHLY_RENT')">
              <template slot-scope="scope"><span>{{ scope.row.rent ? `${scope.row.rent}€` : '' }}</span></template>
            </el-table-column>
          </el-table>

        </div>
        <div class="pagination-wrapper flex justify-center">
          <el-pagination
            layout="prev, pager, next" :total="dataCnt" :page-size="pageSize" :current-page.sync="curPage">
          </el-pagination>
        </div>
      </template>
    </section>
  </div>
</template>

<script lang="js">
import { fmoney, createPath } from '../utils';
import { CSV_SPLIT_SIZE, getInstanceParams, filterTableDataByConditions, loadStores, loadConfig } from '../utils/store';

export default {
  data () {
    return {
      dataLoading: false,
      departmentOptions: [],
      selectedDepartmentId: '',
      selectedCategoryId: '',
      allTableData: [],
      filterdData: [],
      pageSize: 50,
      curPage: 1,
      dataCnt: 0,
      minPrice: 0,
      maxPrice: 0,
      priceRange: [0, 0],
      minSurface: 0,
      maxSurface: 0,
      surfaceRange: [0, 0],
    }
  },
  created () {
    this.fmoney = fmoney;
    this.categoryOptions = Object.entries(this.$t('message.PAGE_STORE.CATEGORIES'))
      .map(it => ({ value: it[0], label: it[1] }));
  },
  mounted () {
    if (process.client) {
      this.loadConfig();
    }
  },
  watch : {
    selectedCategoryId () {
      this.filterTableData();
    },
    selectedDepartmentId(cur, old) {
      if (cur == old) return;
      const found = this.departmentOptions.find(it => it.departmentId === cur);
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
    }
  },
  computed: {
    tableData() {
      const start = (this.curPage - 1) * this.pageSize, end = this.curPage * this.pageSize;
      return this.filterdData.slice(start, end);
    }
  },
  methods: {
    loadConfig () {
      this.dataLoading = true;
      loadConfig().then(departmentOptions => {
        if (!departmentOptions.length) return;
        this.departmentOptions = departmentOptions;
        this.selectedDepartmentId = '75';
      });
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
    rowClickHandler (row) {
      const department_id = this.selectedDepartmentId;
      const { id, title } = row;
      if (!department_id || !id) return;
      this.$router.push({ path: createPath('/store_detail'), query: { department_id, id, title } });
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
    getCategoryImg (row) {
      const category = row.category?.replaceAll(' ', '');
      if (!category) return '';
      return `/${category}.png`;
    }
  }
}
</script>

<style lang="scss" scoped>
.search-store-page {
  margin: 0 32px;
  .content {
    margin-top: 16px;
    .content-title {
      font-size: 24px;
      margin: 0 0 16px;
    }
  }
}
.table-container {
  .category-img {
    max-height: 80px;
    border-radius: 8px;
  }
}
.pagination-wrapper {
  margin: 32px 0 38px;
}
</style>
