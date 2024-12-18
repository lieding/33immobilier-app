<template>
  <div class="search-store-page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/pc_index">{{ $t("message.global.HOME") }}</a></el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('message.global.STORE') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="content">
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
              class="micco-select"
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
            <div class="price-range-btn full-w pointer micco-select customized" @click="priceSlideVis = true" v-popover:popover>
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
            <div class="price-range-btn full-w pointer micco-select customized" @click="surfaceSlideVis = true" v-popover:surfacePopover>
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
                <span style="float:left;"> {{ surfaceRange[0] }}</span>
                <span style="float:right;">{{ surfaceRange[1] }}</span>
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
              class="micco-select"
              :placeholder="$t('message.PAGE_STORE.CATEGORY')"
            >
              <el-option v-for="it in categoryOptions" :key="it.value" :label="it.label" :value="it.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="table-container">
          <el-table :data="tableData" stripe style="width: 100%" @row-click="rowClickHandler">
            <el-table-column prop="zip_code">
              <template slot-scope="scope"><span>{{ scope.row.zip_code || '' }}</span></template>
            </el-table-column>
            <el-table-column prop="title" :label="$t('message.global.TITLE')" />
            <el-table-column :label="$t('message.global.PRICE')">
              <template slot-scope="scope"><span>{{ fmoney(scope.row.price) }}€</span></template>
            </el-table-column>
            <el-table-column :label="$t('message.global.SURFACE')">
              <template slot-scope="scope"><span>{{ scope.row.surface ? `${scope.row.surface}m²` : '' }}</span></template>
            </el-table-column>
            <el-table-column :label="$t('message.PAGE_STORE.CATEGORY')" prop="category" />
            <el-table-column :label="$t('message.global.ESTIMATED_MONTHLY_RENT')">
              <template slot-scope="scope"><span>{{ scope.row.rent ? `${scope.row.rent}€` : '' }}</span></template>
            </el-table-column>
          </el-table>
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
import { CSV_SPLIT_SIZE, getInstanceParams, filterTableDataByConditions } from '../utils/store';
import { JsonConfig, L2AREA_REGION, loadStoresGroupedByDepartmentId } from '../common/config';

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
      const configUrl = JsonConfig.StoreConfig;
      const departmentObj = {};
      for (const [name, id] of Object.entries(L2AREA_REGION)) {
        departmentObj[id] = name;
      }
      fetch(configUrl)
        .then(res => res.json())
        .then(config => {
          if (!config) return null;
          this.departmentOptions = Object.entries(config)
            .map(([departmentId, config]) =>
              ({ departmentId, totalCnt: config.total_count, departmentName: departmentObj[departmentId] })
            );
        })
        .then(() => {
          if (!this.departmentOptions.length) return;
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
      loadStoresGroupedByDepartmentId(this.selectedDepartmentId)
        .then(addRows)
        .then(() => Object.assign(this, getInstanceParams(this.allTableData)))
        .finally(() => this.dataLoading = false);
      if (!index) return setTimeout(() => this._allReady = true, 3000);
      // Load remaining pages
      const promise = loadStoresGroupedByDepartmentId(this.selectedDepartmentId, 1).then(addRows);
      for (let i = 2;i <= index; i++)
        promise.then(loadStoresGroupedByDepartmentId(this.selectedDepartmentId, i).then(addRows));
      promise.finally(() => {
        Object.assign(this, getInstanceParams(this.allTableData));
        setTimeout(() => this._allReady = true, 3000);
      });
    },
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
</style>
