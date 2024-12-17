<template>
  <div class="new-list-page">
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
              clearable
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
              <div class="price-range-btn full-w pointer micco-select customized" @click="surfaceSlideVis = true" v-popover:surfacePopover>
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
                  <span style="float:left;"> {{ surfaceRange[0] }}</span>
                  <span style="float:right;">{{ surfaceRange[1] }}</span>
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
            <el-select
              v-model="selectedClassLevels"
              multiple
              clearable
              class="micco-select"
              :placeholder="$t('message.PAGE_SECOND_HAND.CLASS_LEVEL')"
            >
              <el-option v-for="it in ClassLevelList" :key="it.value" :label="it.label" :value="it.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="table-container">

        </div>
      </template>
    </section>
  </div>
</template>

<script lang="js">
import { fmoney } from '../utils';
import { JsonConfig, L2AREA_REGION, loadStoresGroupedByDepartmentId } from '../common/config';

export default {
  data () {
    return {
      dataLoading: false,
      departmentOptions: [],
      selectedDepartmentId: '',
      tableData: [],
      curPage: 0,
      curPart: 0,
      totalCnt: 0,
    }
  },
  mounted () {
    if (process.client) {
      this.loadConfig();
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
          this.totalCnt = this.departmentOptions.find(it => it.departmentId === '75')?.totalCnt || 0;
          return this.loadStoresGroupedByDepartmentId();
        });
    },
    loadStoresGroupedByDepartmentId(index) {
      this.dataLoading = true;
      return loadStoresGroupedByDepartmentId(this.selectedDepartmentId, index)
        .then(rows => {
          if (Array.isArray(rows))
            this.tableData = [ ...this.tableData, ...rows ];
        })
        .finally(() => this.dataLoading = false);
    },
  }
}
</script>
